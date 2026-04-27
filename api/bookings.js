const dbPath = '/home/u983007073/tmp/bookings.db';
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(dbPath);

module.exports = (req, res) => {
  if (req.method === 'GET') {
    if (req.query?.inspect === 'tables') {
      const inspectDb = new sqlite3.Database(dbPath, (openErr) => {
        if (openErr) {
          return res.status(500).json({ error: openErr.message, dbPath });
        }

        inspectDb.all(
          "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name",
          [],
          (qErr, rows) => {
            inspectDb.close();

            if (qErr) {
              return res.status(500).json({ error: qErr.message, dbPath });
            }

            return res.status(200).json({
              connected: true,
              dbPath,
              tables: rows.map((row) => row.name),
            });
          }
        );
      });

      return;
    }

    db.all('SELECT * FROM bookings', [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ bookings: rows });
    });
  } else if (req.method === 'POST') {
    const { id, status, comments, ...rest } = req.body || {};
    if (!id) {
      // CREATE new booking
      // Accepts all fields in rest
      const fields = Object.keys(rest);
      const values = Object.values(rest);
      if (fields.length === 0) {
        return res.status(400).json({ error: 'No booking data provided' });
      }
      const placeholders = fields.map(() => '?').join(', ');
      const sql = `INSERT INTO bookings (${fields.join(', ')}) VALUES (${placeholders})`;
      db.run(sql, values, function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        db.get('SELECT * FROM bookings WHERE id = ?', [this.lastID], (err2, row) => {
          if (err2) {
            return res.status(500).json({ error: err2.message });
          }
          res.status(201).json(row);
        });
      });
      return;
    }
    // UPDATE booking by id (existing logic)
    const updateFields = [];
    const updateValues = [];
    if (status !== undefined) {
      updateFields.push('status = ?');
      updateValues.push(status);
    }
    if (comments !== undefined) {
      updateFields.push('comments = ?');
      updateValues.push(comments);
    }
    for (const key in rest) {
      updateFields.push(`${key} = ?`);
      updateValues.push(rest[key]);
    }
    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    updateValues.push(id);
    const updateSql = `UPDATE bookings SET ${updateFields.join(', ')} WHERE id = ?`;
    db.run(updateSql, updateValues, function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
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