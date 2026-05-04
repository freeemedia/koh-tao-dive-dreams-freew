const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Database setup
const dbPath = path.join(__dirname, 'bookings.db');
const db = new Database(dbPath);

// Create table if not exists
db.exec(`CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  course_title TEXT,
  preferred_date TEXT,
  experience_level TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TEXT
)`);

// Routes
app.get('/api/bookings', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM bookings ORDER BY created_at DESC');
    const rows = stmt.all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/bookings', (req, res) => {
  const { id, name, email, phone, course_title, preferred_date, experience_level, message, status, created_at } = req.body;
  try {
    const stmt = db.prepare(`INSERT INTO bookings (id, name, email, phone, course_title, preferred_date, experience_level, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    stmt.run(id, name, email, phone, course_title, preferred_date, experience_level, message, status || 'pending', created_at);
    res.json({ id: id, message: 'Booking created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/bookings/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log('PUT /api/bookings/:id/status', id, status);
  try {
    const stmt = db.prepare('UPDATE bookings SET status = ? WHERE id = ?');
    const result = stmt.run(status, id);
    console.log('Update result:', result);
    if (result.changes > 0) {
      res.json({ message: 'Status updated' });
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (err) {
    console.error('Status update error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  try {
    const stmt = db.prepare('DELETE FROM bookings WHERE id = ?');
    const result = stmt.run(id);
    if (result.changes > 0) {
      res.json({ message: 'Booking deleted' });
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Catch-all handler: send back index.html for client-side routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});