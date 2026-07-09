import { pool } from "../../config/db.js";

class UserRepository {
  async createUser(name, email, passwordHash, role) {
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       RETURNING user_id, name, email, role, is_verified, created_at, updated_at`,
      [name, email, passwordHash, role]
    );

    return result.rows[0];
  }

  async getUserByEmail(email) {
    const result = await pool.query(
      `SELECT *
       FROM users
       WHERE email = $1
       AND is_deleted = FALSE`,
      [email]
    );

    return result.rows[0];
  }

  async getUserById(userId) {
    const result = await pool.query(
      `SELECT *
       FROM users
       WHERE user_id = $1
       AND is_deleted = FALSE`,
      [userId]
    );

    return result.rows[0];
  }

  async saveRefreshToken(userId, refreshToken) {
    const result = await pool.query(
      `UPDATE users
       SET refresh_token = $1,
           updated_at = NOW()
       WHERE user_id = $2
       RETURNING user_id, name, email, role, refresh_token`,
      [refreshToken, userId]
    );

    return result.rows[0];
  }

  async findRefreshToken(refreshToken) {
    const result = await pool.query(
      `SELECT *
       FROM users
       WHERE refresh_token = $1
       AND is_deleted = FALSE
       LIMIT 1`,
      [refreshToken]
    );

    return result.rows[0];
  }

  async deleteRefreshToken(refreshToken) {
    const result = await pool.query(
      `UPDATE users
       SET refresh_token = NULL,
           updated_at = NOW()
       WHERE refresh_token = $1
       RETURNING user_id, name, email, role`,
      [refreshToken]
    );

    return result.rows[0];
  }

  async deleteAllRefreshTokens(userId) {
    const result = await pool.query(
      `UPDATE users
       SET refresh_token = NULL,
           updated_at = NOW()
       WHERE user_id = $1
       RETURNING user_id, name, email, role`,
      [userId]
    );

    return result.rows[0];
  }
}

export default new UserRepository();