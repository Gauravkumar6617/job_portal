import { env } from "./env.js";
import pkg from "pg";

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: { rejectUnauthorized: false }, // always on — Neon requires SSL
});

pool.on("connect", () => {
  console.log("✅ Neon PostgreSQL connected");
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL error:", err.message);
});

export const query = (text, params) => pool.query(text, params);