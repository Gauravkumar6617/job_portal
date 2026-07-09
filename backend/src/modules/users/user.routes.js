import express from "express";
import { registerLimiter ,loginLimiter} from "./user.validation.js";
import { userRegister } from "./user.controller.js";

const router = express.Router();

router.post("/register", registerLimiter, userRegister);
router.post("/login", loginLimiter, userLogin);

export default router;
