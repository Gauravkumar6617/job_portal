import express from "express";
import { registerUser } from "./user.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { successResponse } from "../../utils/response.js";

export const userRegister = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json(successResponse(user, "User registered successfully"));
});
