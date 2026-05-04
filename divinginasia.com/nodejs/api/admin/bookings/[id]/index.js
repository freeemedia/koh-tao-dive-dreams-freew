import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

const readBookings = () => JSON.parse(fs.readFileSync(BOOKINGS_FILE, 'utf8') || '[]');
const writeBookings = (items) => fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(items, null, 2));

export default async function handler(req, res) {
  try {
    if (!fs.existsSync(BOOKINGS_FILE)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      fs.writeFileSync(BOOKINGS_FILE, '[]');
    }

    const { id } = req.query || {};
    if (!id) return res.status(400).json({ error: 'Missing id' });

    const items = readBookings();
    const idx = items.findIndex((b) => b.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });

    if (req.method === 'PATCH') {
      const updates = req.body || {};
      items[idx] = { ...items[idx], ...updates, updated_at: new Date().toISOString() };
      writeBookings(items);
      return res.status(200).json(items[idx]);
    }

    if (req.method === 'DELETE') {
      items.splice(idx, 1);
      writeBookings(items);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('bookings/[id] error', err);
    res.status(500).json({ error: err.message || 'Internal error' });
  }
}
