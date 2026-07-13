import jwt from "jsonwebtoken";
import { verifyAccessToken } from "../utils/jwt.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
