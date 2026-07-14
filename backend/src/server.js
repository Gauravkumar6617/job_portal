import express from "express";
import app from "./app.js";
import { env } from "./config/env.js";
import { pool } from "./config/db.js";
import { createServer } from "http";
import { initSocket } from "./config/socket.js";
// server.js
const startServer = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('✅ Connected to Neon Database successfully.');
  } catch (error) {
    console.warn('⚠️ Database connection failed — continuing anyway:', error.message);
    // don't process.exit(1) — let server start
  }
  const httpServer = createServer(app);
  initSocket(httpServer);


  httpServer.listen(env.PORT, () => {
    console.log(`✅ Server running in [${env.NODE_ENV}] mode on port ${env.PORT}`);
  });
};
startServer();