import userRepository from "./user.repository.js";
import { comparePassword, hashedPassword } from "../../utils/bcrypt.js";
import { generateAccessToken,generateRefreshToken } from "../../utils/jwt.js";
import { hashToken } from "../../utils/jwt.js";

export const registerUser = async (data) => {
  const { name, email, password, role } = data;
  const isUserExist = await userRepository.getUserByEmail(email);
  if (isUserExist) {
    throw new Error("User already exists", 409);
  }
  const passwordHash = await hashedPassword(password, 10);
  const newUser = await userRepository.createUser(
    name,
    email,
    passwordHash,
    role,
  );
  return newUser;
};

export const loginUser = async (data) => {  
const { email, password } = data;
const user = await userRepository.getUserByEmail(email);
if (!user) {
  throw new Error("User not found", 404);
}
const isPasswordMatch = await comparePassword(password, user.password);
if (!isPasswordMatch) {
  throw new Error("Invalid email or password", 401);
}

const accessToken = generateAccessToken(user);
const refreshToken = generateRefreshToken(user);

const tokenHash = await hashToken(refreshToken);

await userRepository.saveRefreshToken(user.user_id, tokenHash);

return {
  accessToken,
  refreshToken,
  user,

};




}