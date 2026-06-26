import express from "express";
import app from "./app.js";
import { env } from "./config/env.js";
import { pool } from "./config/db.js";


const startServer = async () => {
  try {
    // 1. Test Supabase connection before booting the web server
    await pool.query('SELECT NOW()');
    console.log(' Connected to Supabase Database successfully.');

    // 2. TODO: Add Redis connection test here later

    // 3. Start listening on the port validated by Zod
    app.listen(env.PORT, () => {
      console.log(` Server running in [${env.NODE_ENV}] mode on port ${env.PORT}`);
    });

  } catch (error) {
    console.error(' Failed to start application:', error.message);
    process.exit(1);
  }
};

startServer();