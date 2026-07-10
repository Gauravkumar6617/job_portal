import { pool } from "../../config/db.js";

class UserRepository {
async createUser(name, email, phone, passwordHash) {
  const result = await pool.query(
    `INSERT INTO users (name, email, phone, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING user_id, name, email, phone, role, is_verified, created_at`,
    [name, email, phone, passwordHash]
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

async getUserByPhone(phone) {
  const result = await pool.query(
    `SELECT user_id, name, email, phone, role, password_hash, 
            is_verified, is_deleted, refresh_token, created_at
     FROM users
     WHERE phone = $1
     AND is_deleted = FALSE`,
    [phone]
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
  async markUserVerified(userId){
    const result = await pool.query(
      `UPDATE users
       SET is_verified = TRUE,
           updated_at = NOW()
       WHERE user_id = $1
       RETURNING user_id, name, email, role, is_verified`,
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