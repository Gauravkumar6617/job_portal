import express from "express";
import { registerLimiter } from "./user.validation.js";
import { userRegister } from "./user.controller.js";

const router = express.Router();

router.post("/register", registerLimiter, userRegister);
export default router;
