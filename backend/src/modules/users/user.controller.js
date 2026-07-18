import {
  registerUser,
  loginUser,
  verifyUserOtp,
  logoutUser,
  refreshgenerateAccessToken,getUserProfile
} from "./user.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { successResponse } from "../../utils/response.js";
import { logger } from "../../config/logger.js";


// user register controller using registerUser service and send otp
export const userRegister = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body); // ← result not user
  successResponse(res, result, "User registered successfully", 201);
});

// otp verify that we send 
export const otpVerify = asyncHandler(async (req, res) => {
  const result = await verifyUserOtp(req.body);
  successResponse(res, result, "OTP verified successfully", 200);
});

// otp resend 
export const otpResend = asyncHandler(async (req, res) => {
  const result = await resendOtp(req.body);
  successResponse(res, result, "OTP resent successfully", 200);
});

export const userLogin = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken, user } = await loginUser(req.body);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  successResponse(res, { accessToken, user }, "Logged in successfully", 200);
});


export const userProfile =asyncHandler(async(req ,res)=>{

  try {
    const result = await getUserProfile(req.user.sub)
    successResponse(res, result, "Profile fetch successfully", 200);
    
  } catch (error) {
    logger.error(error.message)
    console.log(error,"error while getting user profile")
    
  }
});

export const userLogout = asyncHandler(async (req, res) => {
  const result = await logoutUser(req.user.sub);
  res.clearCookie("refreshToken");
  successResponse(res, result, "Logged out successfully", 200);
});

export const refreshAccessTokenController = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not found" });
  }

  try {
    const { accessToken, newRefreshToken } =
      await refreshgenerateAccessToken(refreshToken);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    successResponse(
      res,
      { accessToken },
      "Access token refreshed successfully",
      200,
    );
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});
