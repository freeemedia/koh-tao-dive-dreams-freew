const dbPath = process.env.SQLITE_PATH || './bookings.db';
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(dbPath);

module.exports = (req, res) => {
  if (req.method === 'GET') {
    db.all('SELECT * FROM bookings', [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ bookings: rows });
    });
  } else if (req.method === 'POST') {
    // Update booking by id. Accepts id and any fields to update (status, comments, etc)
    const { id, status, comments, ...rest } = req.body || {};
    if (!id) {
      return res.status(400).json({ error: 'Missing booking id' });
    }
    // Build dynamic SET clause
    const fields = [];
    const values = [];
    if (status !== undefined) {
      fields.push('status = ?');
      values.push(status);
    }
    if (comments !== undefined) {
      fields.push('comments = ?');
      values.push(comments);
    }
    // Allow updating any other fields sent in rest
    for (const key in rest) {
      fields.push(`${key} = ?`);
      values.push(rest[key]);
    }
    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    values.push(id);
    const sql = `UPDATE bookings SET ${fields.join(', ')} WHERE id = ?`;
    db.run(sql, values, function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      // Return updated booking
      db.get('SELECT * FROM bookings WHERE id = ?', [id], (err2, row) => {
        if (err2) {
          return res.status(500).json({ error: err2.message });
        }
        res.status(200).json(row);
      });
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};