import userRepository from "./user.repository.js";
import { comparePassword, hashedPassword } from "../../utils/bcrypt.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import { hashToken, verifyRefreshToken } from "../../utils/jwt.js";
import {
  generateOtp,
  saveOtp,
  getOtp,
  delOtp,
  verifyOtp,
} from "../../utils/otp.js";
import { env } from "../../config/env.js";
import { sendWhatsappOtp } from "../../utils/twilio.js";
import { sendWelcomeEmail } from "../../utils/email.js";
export const registerUser = async (data) => {
  const { name, email, password, phone } = data;
  // to check is email already exist or not
  const isUserEmailExist = await userRepository.getUserByEmail(email);
  if (isUserEmailExist) {
    throw new Error("User already exists", 409);
  }
  // to check is phone number exists or not
  const isUserPhoneExist = await userRepository.getUserByPhone(phone);
  if (isUserPhoneExist) {
    throw new Error("User already exists", 409);
  }
  //  to hash th password
  const passwordHash = await hashedPassword(password, 10);
  //  to create unverified user
  const newUser = await userRepository.createUser(
    name,
    email,
    phone,
    passwordHash,
  );
  // to generate otp and pass it to save otp  to function
  const otp = generateOtp();
  await saveOtp(phone, otp);

  //  if production then send otp
  if (env.NODE_ENV === "production") {
    await sendWhatsappOtp(phone, otp);
  } else {
    console.log(`[DEV] OTP for ${phone}: ${otp}`);
  }

  return {
    message:
      env.NODE_ENV === "development"
        ? "DEV MODE: Use master OTP 123456 or check terminal for OTP"
        : "OTP sent via WhatsApp. Valid for 10 minutes.",
    user_id: newUser.user_id,
  };
};

export const verifyUserOtp = async ({ phone, otp }) => {
  const user = await userRepository.getUserByPhone(phone);
  if (!user) {
    throw new Error("User not found");
  }

  if (user.is_verified) {
    throw new Error("User already verified");
  }

  const storedOtp = await getOtp(phone);
  if (!storedOtp) {
    throw new Error("OTP expired or not found. Please request a new one.");
  }

  const isOtpValid = verifyOtp(storedOtp, otp);
  if (!isOtpValid) {
    throw new Error("Invalid OTP");
  }

  const verifiedUser = await userRepository.markUserVerified(user.user_id);
  await delOtp(phone);
  await sendWelcomeEmail(verifiedUser.name, verifiedUser.email);

  return {
    message: "Phone verified successfully. You can now log in.",
    user_id: verifiedUser.user_id,
  };
};

export const resendOtp = async (data) => {
  const { phone } = data;
  const user = await userRepository.getUserByPhone(phone);
  try {
    if (!user) {
      throw new Error("User not found", 404);
    }
    if (user.is_verified) {
      throw new Error("User already verified", 400);
    }
    const otp = generateOtp();
    await saveOtp(phone, otp);
    if (env.NODE_ENV === "production") {
      await sendWhatsappOtp(phone, otp);
    } else {
      console.log(`[DEV] OTP for ${phone}: ${otp}`);
    }
    return { message: "OTP resent via WhatsApp." };
  } catch (error) {
    console.log(error);
    throw new Error(error.message, error.statusCode);
  }
};

export const loginUser = async ({ phone, password }) => {
  // 1. Find user
  const user = await userRepository.getUserByPhone(phone);

  // 2. Timing attack prevention
  const dummyHash =
    "$2b$10$invalidhashxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  const isPasswordMatch = await comparePassword(
    password,
    user ? user.password_hash : dummyHash,
  );

  // 3. Same error for both wrong phone and wrong password
  if (!user || !isPasswordMatch) {
    throw new Error("Invalid phone or password");
  }

  // 4. Block unverified
  if (!user.is_verified) {
    throw new Error("Please verify your WhatsApp number before logging in");
  }

  // 5. Generate tokens — consistent variable names
  const accessToken = generateAccessToken({
    sub: user.user_id,
    phone: user.phone,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    sub: user.user_id,
  });

  // 6. Hash refresh token → save to DB
  const tokenHash = hashToken(refreshToken); // ← refreshToken not createRefreshToken
  await userRepository.saveRefreshToken(user.user_id, tokenHash);

  // 7. Return only safe fields — never expose password_hash
  return {
    accessToken,
    refreshToken,
    user: {
      user_id: user.user_id,
      name: user.name,
      phone: user.phone,
      role: user.role,
      is_verified: user.is_verified,
    },
  };
};

export const logoutUser = async (userId) => {
  await userRepository.saveRefreshToken(userId, null);
  return { message: "Logged out successfully" };
};

export const refreshgenerateAccessToken = async (refreshToken) => {
  if (!refreshToken) throw new Error("Refresh token not found");

  // 1. Verify signature first
  verifyRefreshToken(refreshToken);

  // 2. Hash → check DB
  const tokenHash = hashToken(refreshToken);
  const user = await userRepository.findRefreshToken(tokenHash);
  if (!user) throw new Error("Invalid refresh token");
  console.log("User found for refresh token:", user);

  // 3. Issue new accessToken
  const accessToken = generateAccessToken({
    sub: user.user_id,
    phone: user.phone,
    role: user.role,
  });

  return { accessToken };
};
// GET /api/v1/users/profile
// Header: Authorization: Bearer <accessToken>
//               │
//               ▼
// authenticate middleware
// → verifyAccessToken(token)
// → decodes { sub, phone, role }
// → attaches to req.user
//               │
//               ▼
// profileController
// → calls getUserProfile(req.user.sub)
//               │
//               ▼
// DB query by user_id
// → returns user details
