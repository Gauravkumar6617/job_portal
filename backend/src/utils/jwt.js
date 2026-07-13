import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import crypto from "crypto"
const TOKEN_OPTIONS={
  audience : 'gaurav',
  issuer : 'myslefGaurav'
}

const ACCESS_TOKEN_EXPIRES_IN = "15m"; // 15 minutes
const REFRESH_TOKEN_EXPIRES_IN = "7d"; // 7 days

const generateAccessToken = (payload) => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    ...TOKEN_OPTIONS,
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    ...TOKEN_OPTIONS,
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
};
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_ACCESS_SECRET);
  } catch (error) {
    throw new Error("Invalid access token");
  }
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

// decode without verifying the signature, useful for extracting payload without validating
export const decodeToken = (token) => {
  return jwt.decode(token);
};


//  to hash refresh toekn as it long lived and from dump leak attacker can use
export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
