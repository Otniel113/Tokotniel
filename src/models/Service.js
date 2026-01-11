import { pool } from '../config/db.js';

class Service {
  static async findAll() {
    const [rows] = await pool.query(
      'SELECT service_code, service_name, service_icon, service_tariff FROM services'
    );
    return rows;
  }

  static async findByCode(service_code) {
    const [rows] = await pool.execute(
      'SELECT service_code, service_name, service_icon, service_tariff FROM services WHERE service_code = ?',
      [service_code]
    );
    return rows[0];
  }
}

export default Service;
