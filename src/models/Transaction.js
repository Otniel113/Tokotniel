import { pool } from '../config/db.js';

class Transaction {
  static async create({ invoice_number, email, transaction_type, description, total_amount, service_code = null }) {
    const [result] = await pool.execute(
      'INSERT INTO transactions (invoice_number, email, transaction_type, description, total_amount, service_code) VALUES (?, ?, ?, ?, ?, ?)',
      [invoice_number, email, transaction_type, description, total_amount, service_code]
    );
    return result;
  }
}

export default Transaction;
