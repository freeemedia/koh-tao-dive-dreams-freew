// /api/bookings.js (for Vercel)
import { Client } from 'pg';

export default async function handler(req, res) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL, // Set this in Vercel env vars
  });
  await client.connect();

  if (req.method === 'GET') {
    try {
      const { rows } = await client.query('SELECT * FROM bookings');
      res.status(200).json({ bookings: rows });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === 'POST') {
    const { id, status, comments, ...rest } = req.body || {};
    if (!id) {
      // CREATE new booking
      const fields = Object.keys(rest);
      const values = Object.values(rest);
      if (fields.length === 0) {
        res.status(400).json({ error: 'No booking data provided' });
        await client.end();
        return;
      }
      const placeholders = fields.map((_, i) => `$${i + 1}`).join(', ');
      const sql = `INSERT INTO bookings (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
      try {
        const result = await client.query(sql, values);
        res.status(201).json(result.rows[0]);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      await client.end();
      return;
    }
    // UPDATE booking by id
    const updateFields = [];
    const updateValues = [];
    let idx = 1;
    if (status !== undefined) {
      updateFields.push(`status = $${idx++}`);
      updateValues.push(status);
    }
    if (comments !== undefined) {
      updateFields.push(`comments = $${idx++}`);
      updateValues.push(comments);
    }
    for (const key in rest) {
      updateFields.push(`${key} = $${idx++}`);
      updateValues.push(rest[key]);
    }
    if (updateFields.length === 0) {
      res.status(400).json({ error: 'No fields to update' });
      await client.end();
      return;
    }
    updateValues.push(id);
    const updateSql = `UPDATE bookings SET ${updateFields.join(', ')} WHERE id = $${idx} RETURNING *`;
    try {
      const result = await client.query(updateSql, updateValues);
      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    await client.end();
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    await client.end();
  }
}