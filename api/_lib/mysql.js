// api/_lib/mysql.js
// Shared MySQL connection pool for Vercel serverless functions.
// Uses mysql2/promise with a persistent pool (reused across warm invocations).

import mysql from 'mysql2/promise';

let pool;

export function getDb() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
    });
  }
  return pool;
}

// Run once per cold-start to ensure the bookings table exists.
let tableReady = false;

export async function ensureBookingsTable() {
  if (tableReady) return;
  const db = getDb();
  await db.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id VARCHAR(64) NOT NULL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(50),
      accommodation VARCHAR(255),
      preferred_date VARCHAR(50),
      experience_level VARCHAR(100),
      payment_choice VARCHAR(50),
      message TEXT,
      internal_notes TEXT,
      bank_transfer_details TEXT,
      status VARCHAR(50) DEFAULT 'pending',
      course_title VARCHAR(255),
      total_amount DECIMAL(10,2),
      deposit_amount DECIMAL(10,2),
      due_amount DECIMAL(10,2),
      wp_booking_id INT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  tableReady = true;
}
