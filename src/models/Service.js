import { pool } from '../config/db.js';

class Service {
  static async findAll() {
    const [rows] = await pool.query(
      'SELECT service_code, service_name, service_icon, service_tariff FROM services'
    );
    return rows;
  }
}

export default Service;
