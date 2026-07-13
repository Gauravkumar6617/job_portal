import express from "express";
import {
  registerLimiter,
  loginLimiter,
  OtpLimiter,
  VerifyLimit,
} from "./user.validation.js";
import {
  userRegister,
  userLogin,
  otpVerify,
  otpResend,
  userLogout,
  refreshAccessTokenController,
} from "./user.controller.js";
import { authenticate } from "../../middleware/validate.js";

const router = express.Router();

router.post("/register", registerLimiter, userRegister);
router.post("/verify-otp", OtpLimiter, otpVerify);
router.post("/login", loginLimiter, userLogin);
router.post("/resend-otp", VerifyLimit, otpResend);
router.post("/logout", authenticate, userLogout);
router.post("/refresh-token", refreshAccessTokenController);

export default router;
