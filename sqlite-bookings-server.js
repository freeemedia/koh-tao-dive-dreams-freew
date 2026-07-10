// SQLite setup and bookings API for local development
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./bookings.sqlite');

app.use(cors());
app.use(bodyParser.json());

// Create bookings table if not exists
const createTable = `CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  item_type TEXT,
  course_title TEXT,
  preferred_date TEXT,
  experience_level TEXT,
  addons TEXT,
  addons_json TEXT,
  addons_total REAL,
  subtotal_amount REAL,
  total_payable_now REAL,
  internal_notes TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);`;
db.run(createTable);

// Get all bookings
app.get('/api/sqlite-bookings', (req, res) => {
  db.all('SELECT * FROM books ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a booking
app.post('/api/sqlite-bookings', (req, res) => {
  const b = req.body;
  const stmt = db.prepare(`INSERT INTO books (name, email, phone, item_type, course_title, preferred_date, experience_level, addons, addons_json, addons_total, subtotal_amount, total_payable_now, internal_notes, message, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  stmt.run(b.name, b.email, b.phone, b.item_type, b.course_title, b.preferred_date, b.experience_level, b.addons, b.addons_json, b.addons_total, b.subtotal_amount, b.total_payable_now, b.internal_notes, b.message, b.status || 'pending', function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// Update a booking
app.patch('/api/sqlite-bookings/:id', (req, res) => {
  const id = req.params.id;
  const fields = req.body;
  const keys = Object.keys(fields);
  if (!keys.length) return res.status(400).json({ error: 'No fields to update' });
  const setClause = keys.map(k => `${k} = ?`).join(', ');
  const values = keys.map(k => fields[k]);
  values.push(id);
  db.run(`UPDATE books SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, values, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

// Delete a booking
app.delete('/api/sqlite-bookings/:id', (req, res) => {
  db.run('DELETE FROM books WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`SQLite Bookings API running on port ${PORT}`);
});
