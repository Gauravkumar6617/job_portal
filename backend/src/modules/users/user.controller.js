import { registerUser, loginUser, verifyUserOtp } from "./user.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { successResponse } from "../../utils/response.js";

export const userRegister = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body); // ← result not user
  successResponse(res, result, "User registered successfully", 201);
});
export const otpVerify = asyncHandler(async (req, res) => {
  const result = await verifyUserOtp(req.body);
  successResponse(res, result, "OTP verified successfully", 200);
});
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

export const userLogout = asyncHandler(async (req, res) => {
  const result = await logoutUser(req.user.sub);
  res.clearCookie("refreshToken");
  successResponse(res, result, "Logged out successfully", 200);
});
