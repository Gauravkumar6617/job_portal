import express from "express";
import { registerLimiter ,loginLimiter,OtpLimiter,VerifyLimit} from "./user.validation.js";
import { userRegister,userLogin,otpVerify ,otpResend} from "./user.controller.js";

const router = express.Router();

router.post("/register", registerLimiter, userRegister);
router.post("/verify-otp",OtpLimiter, otpVerify);
router.post("/login", loginLimiter, userLogin);
router.post("/resend-otp",VerifyLimit, otpResend);

export default router;
