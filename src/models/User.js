import { pool } from '../config/db.js';

class User {
  static async create({ email, first_name, last_name, password }) {
    const [result] = await pool.execute(
      'INSERT INTO users (email, first_name, last_name, password) VALUES (?, ?, ?, ?)',
      [email, first_name, last_name, password]
    );
    return result;
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async updateBalance(email, amount) {
    const [result] = await pool.execute(
      'UPDATE users SET balance = balance + ? WHERE email = ?',
      [amount, email]
    );
    return result;
  }
}

export default User;
