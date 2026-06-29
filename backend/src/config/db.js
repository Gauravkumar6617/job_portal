import { env } from "./env.js";
import pkg from "pg";

const { Pool } = pkg;

// create pool instance
export const pool = new Pool({
  connectionString: env.DATABASE_URL,

  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,

  ssl: env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// helper query function (optional but good)
export const query = (text, params) => {
  return pool.query(text, params);
};
