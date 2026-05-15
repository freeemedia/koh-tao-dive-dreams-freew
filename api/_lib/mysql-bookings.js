import mysql from 'mysql2/promise';

let pool;
let schemaReadyPromise;

function clean(value) {
  return String(value || '').trim();
}

function normalizeEnvValue(value, expectedKey) {
  let next = clean(value);
  if (!next) return '';

  // Some hosting dashboards accidentally get values pasted as KEY=value.
  const expectedPrefix = `${expectedKey}=`;
  if (next.startsWith(expectedPrefix)) {
    next = next.slice(expectedPrefix.length).trim();
  }

  const genericAssignmentMatch = next.match(/^[A-Z][A-Z0-9_]*=(.*)$/);
  if (genericAssignmentMatch && typeof genericAssignmentMatch[1] === 'string') {
    next = genericAssignmentMatch[1].trim();
  }

  if (
    (next.startsWith('"') && next.endsWith('"')) ||
    (next.startsWith("'") && next.endsWith("'"))
  ) {
    next = next.slice(1, -1).trim();
  }

  return next;
}

function getEnv(...keys) {
  for (const key of keys) {
    const value = normalizeEnvValue(process.env[key], key);
    if (value) return value;
  }
  return '';
}

function getTableName() {
  const table = getEnv('MYSQL_BOOKINGS_TABLE', 'HOSTINGER_BOOKINGS_TABLE', 'BOOKINGS_TABLE') || 'bookings';
  if (!/^[A-Za-z0-9_]+$/.test(table)) {
    throw new Error('Invalid MYSQL_BOOKINGS_TABLE value');
  }
  return table;
}

function getMysqlConfig() {
  const host = getEnv('MYSQL_HOST', 'HOSTINGER_DB_HOST', 'DB_HOST');
  const user = getEnv('MYSQL_USER', 'HOSTINGER_DB_USER', 'DB_USER');
  const password = getEnv('MYSQL_PASSWORD', 'MYSQL_PASS', 'HOSTINGER_DB_PASSWORD', 'DB_PASS');
  const database = getEnv('MYSQL_DATABASE', 'HOSTINGER_DB_NAME', 'DB_NAME');
  const portRaw = getEnv('MYSQL_PORT', 'HOSTINGER_DB_PORT', 'DB_PORT') || '3306';
  const port = Number.parseInt(portRaw, 10);

  if (!host || !user || !database || !Number.isFinite(port)) {
    throw new Error('Missing MySQL config. Required: host, user, database, port');
  }

  return {
    host,
    user,
    password,
    database,
    port,
    ssl: getEnv('MYSQL_SSL', 'HOSTINGER_DB_SSL').toLowerCase() === 'true' ? { rejectUnauthorized: false } : undefined,
  };
}

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      ...getMysqlConfig(),
      waitForConnections: true,
      connectionLimit: 8,
      queueLimit: 0,
      timezone: 'Z',
    });
  }
  return pool;
}

const FIELD_MAP = [
  'id',
  'name',
  'email',
  'phone',
  'accommodation',
  'item_type',
  'course_title',
  'preferred_date',
  'experience_level',
  'payment_choice',
  'message',
  'status',
  'internal_notes',
  'bank_transfer_details',
  'total_amount',
  'deposit_amount',
  'due_amount',
  'created_at',
  'updated_at',
];

const BOOKING_COLUMN_DEFINITIONS = {
  id: 'VARCHAR(64) NOT NULL',
  name: 'VARCHAR(255) NULL',
  email: 'VARCHAR(255) NULL',
  phone: 'VARCHAR(80) NULL',
  accommodation: 'VARCHAR(255) NULL',
  item_type: 'VARCHAR(120) NULL',
  course_title: 'VARCHAR(255) NULL',
  preferred_date: 'DATE NULL',
  experience_level: 'VARCHAR(120) NULL',
  payment_choice: 'VARCHAR(120) NULL',
  message: 'TEXT NULL',
  status: 'VARCHAR(80) NULL',
  internal_notes: 'TEXT NULL',
  bank_transfer_details: 'TEXT NULL',
  total_amount: 'DECIMAL(10,2) NULL',
  deposit_amount: 'DECIMAL(10,2) NULL',
  due_amount: 'DECIMAL(10,2) NULL',
  created_at: 'DATETIME NULL',
  updated_at: 'DATETIME NULL',
};

async function ensureMySqlBookingsSchema() {
  if (!schemaReadyPromise) {
    schemaReadyPromise = (async () => {
      const table = getTableName();
      const connection = getPool();

      await connection.query(`
        CREATE TABLE IF NOT EXISTS \`${table}\` (
          id VARCHAR(64) NOT NULL,
          name VARCHAR(255) NULL,
          email VARCHAR(255) NULL,
          phone VARCHAR(80) NULL,
          accommodation VARCHAR(255) NULL,
          item_type VARCHAR(120) NULL,
          course_title VARCHAR(255) NULL,
          preferred_date DATE NULL,
          experience_level VARCHAR(120) NULL,
          payment_choice VARCHAR(120) NULL,
          message TEXT NULL,
          status VARCHAR(80) NULL,
          internal_notes TEXT NULL,
          bank_transfer_details TEXT NULL,
          total_amount DECIMAL(10,2) NULL,
          deposit_amount DECIMAL(10,2) NULL,
          due_amount DECIMAL(10,2) NULL,
          created_at DATETIME NULL,
          updated_at DATETIME NULL,
          PRIMARY KEY (id),
          KEY idx_created_at (created_at),
          KEY idx_email (email),
          KEY idx_status (status)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

      const [existingColumns] = await connection.query(`SHOW COLUMNS FROM \`${table}\``);
      const existingColumnNames = new Set(
        Array.isArray(existingColumns)
          ? existingColumns.map((column) => String(column.Field || ''))
          : []
      );

      for (const [columnName, definition] of Object.entries(BOOKING_COLUMN_DEFINITIONS)) {
        if (existingColumnNames.has(columnName)) continue;
        await connection.query(`ALTER TABLE \`${table}\` ADD COLUMN \`${columnName}\` ${definition}`);
      }
    })().catch((error) => {
      schemaReadyPromise = undefined;
      throw error;
    });
  }

  return schemaReadyPromise;
}

function mapPayload(payload = {}, { includeDates = false } = {}) {
  const out = {};
  for (const key of FIELD_MAP) {
    if (!includeDates && (key === 'created_at' || key === 'updated_at')) continue;
    if (Object.prototype.hasOwnProperty.call(payload, key)) {
      out[key] = payload[key];
    }
  }
  return out;
}

function normalizeRow(row) {
  return {
    ...row,
    internal_notes: row?.internal_notes || row?.message || '',
    message: row?.message || row?.internal_notes || '',
  };
}

export async function listMySqlBookings() {
  const table = getTableName();
  await ensureMySqlBookingsSchema();
  const [rows] = await getPool().query(`SELECT * FROM \`${table}\` ORDER BY created_at DESC`);
  return Array.isArray(rows) ? rows.map(normalizeRow) : [];
}

export async function insertMySqlBooking(payload) {
  const table = getTableName();
  await ensureMySqlBookingsSchema();
  const data = mapPayload(payload);

  if (!data.id) {
    throw new Error('Booking payload must include id');
  }

  if (!data.created_at) data.created_at = new Date();
  data.updated_at = new Date();

  const keys = Object.keys(data);
  if (keys.length === 0) {
    throw new Error('No booking fields to insert');
  }

  const placeholders = keys.map(() => '?').join(', ');
  const columns = keys.map((key) => `\`${key}\``).join(', ');
  const values = keys.map((key) => data[key]);

  await getPool().query(
    `INSERT INTO \`${table}\` (${columns}) VALUES (${placeholders})`,
    values,
  );

  return getMySqlBookingById(data.id);
}

export async function getMySqlBookingById(id) {
  const table = getTableName();
  await ensureMySqlBookingsSchema();
  const [rows] = await getPool().query(`SELECT * FROM \`${table}\` WHERE id = ? LIMIT 1`, [String(id)]);
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error('Booking not found');
  }
  return normalizeRow(rows[0]);
}

export async function updateMySqlBookingById(id, updates) {
  const table = getTableName();
  await ensureMySqlBookingsSchema();
  const data = mapPayload(updates);
  delete data.id;
  data.updated_at = new Date();

  const keys = Object.keys(data);
  if (keys.length === 0) {
    throw new Error('No valid fields to update');
  }

  const setClause = keys.map((key) => `\`${key}\` = ?`).join(', ');
  const values = keys.map((key) => data[key]);

  const [result] = await getPool().query(
    `UPDATE \`${table}\` SET ${setClause} WHERE id = ?`,
    [...values, String(id)],
  );

  if (!result) {
    throw new Error('Booking update failed');
  }

  // MySQL can report 0 affected rows when the row exists but values are unchanged.
  if (result.affectedRows === 0) {
    try {
      return getMySqlBookingById(id);
    } catch {
      throw new Error('Booking not found for update');
    }
  }

  return getMySqlBookingById(id);
}

export async function deleteMySqlBookingById(id) {
  const table = getTableName();
  await ensureMySqlBookingsSchema();
  const [result] = await getPool().query(`DELETE FROM \`${table}\` WHERE id = ?`, [String(id)]);
  if (!result || result.affectedRows === 0) {
    throw new Error('Booking not found for delete');
  }
  return { deleted: String(id) };
}

export async function upsertMySqlBooking(payload) {
  const table = getTableName();
  await ensureMySqlBookingsSchema();
  const data = mapPayload(payload, { includeDates: true });
  if (!data.id) throw new Error('id is required for upsert');

  if (!data.created_at) data.created_at = new Date();
  data.updated_at = new Date();

  const keys = Object.keys(data);
  const columns = keys.map((key) => `\`${key}\``).join(', ');
  const placeholders = keys.map(() => '?').join(', ');
  const updates = keys
    .filter((key) => key !== 'id' && key !== 'created_at')
    .map((key) => `\`${key}\` = VALUES(\`${key}\`)`)
    .join(', ');

  await getPool().query(
    `INSERT INTO \`${table}\` (${columns}) VALUES (${placeholders}) ON DUPLICATE KEY UPDATE ${updates}`,
    keys.map((key) => data[key]),
  );
}

export async function ensureMySqlBookingsTable() {
  await ensureMySqlBookingsSchema();
}
