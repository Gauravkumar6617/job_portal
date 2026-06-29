import { pool } from "../../config/db.js";

class UserRepository {
  async createUser(name, email, password, role) {
    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role ,created_at, updated_ats ",
      [name, email, password, role],
    );
    return result.rows[0];
  }

  async getUserByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  }

  async getUserById(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  }
}

export default new UserRepository();
