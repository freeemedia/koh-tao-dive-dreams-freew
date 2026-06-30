import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

const ensureDataFile = () => {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(BOOKINGS_FILE)) fs.writeFileSync(BOOKINGS_FILE, '[]');
};

export default async function handler(req, res) {
  ensureDataFile();

  try {
    if (req.method === 'GET') {
      const raw = fs.readFileSync(BOOKINGS_FILE, 'utf8');
      const items = JSON.parse(raw || '[]');
      res.status(200).json(items);
      return;
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      const id = nanoid();
      const now = new Date().toISOString();
      const record = { id, created_at: now, status: 'pending', ...body };

      const raw = fs.readFileSync(BOOKINGS_FILE, 'utf8');
      const items = JSON.parse(raw || '[]');
      items.unshift(record);
      fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(items, null, 2));

      res.status(201).json(record);
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('bookings error', err);
    res.status(500).json({ error: err.message || 'Internal error' });
  }
}
