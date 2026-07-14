import { Server } from "socket.io";
import { verifyAccessToken } from "../utils/jwt.js";
import { logger } from "./logger.js";

let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Authenticate every socket connection with JWT
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication required"));
    }
    try {
      const decoded = verifyAccessToken(token);
      socket.user = decoded;
      next();
    } catch (error) {
      return next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.user.sub;
    logger.info(` Socket connected: ${userId}`);

    socket.join(userId);

    socket.on("disconnect", () => {
      logger.error(`❌ Socket disconnected: ${userId}`);
    });
  });

  console.log(" Socket.io initialized");
  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};