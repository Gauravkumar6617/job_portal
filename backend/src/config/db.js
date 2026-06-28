import { env } from "./env.js";
import pkg from "pg";

// open connection
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: env.DATABASE_URL,

  //  max number of pool
  max: 20,
  // after inacvtive of 30 sec of a 1 pool deactive it
  idleTimeoutMillis: 30000,
  // set timeout after 2 sec of req
  connectionTimeoutMillis: 2000,

  ssl: env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export const query = (text, params) => {
  // pool.query automatically handles connecting and releasing under the hood!
  return pool.query(text, params);
};
