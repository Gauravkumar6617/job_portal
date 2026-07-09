import express from "express";
import { registerUser ,loginUser } from "./user.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { successResponse } from "../../utils/response.js";

export const userRegister = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json(successResponse(user, "User registered successfully"));
});

export const userLogin = asyncHandler(async (req, res) => {
  const user = await loginUser(req.body);
  res.status(200).json(successResponse(user, "User logged in successfully"));
});