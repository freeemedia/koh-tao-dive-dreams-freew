// POST /api/cms/create { file, content }
app.post('/api/cms/create', checkToken, (req, res) => {
  const { file, content } = req.body;
  if (!file || !file.endsWith('.html')) return res.status(400).json({ error: 'Invalid file name' });
  const filePath = path.join(__dirname, 'public', file);
  if (!filePath.startsWith(path.join(__dirname, 'public'))) return res.status(403).json({ error: 'Forbidden' });
  if (fs.existsSync(filePath)) return res.status(409).json({ error: 'File already exists' });
  fs.writeFile(filePath, content || '', 'utf8', err => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
});
// Minimal Express server for /api/bookings (SQLite only, no Supabase/Stripe)
const express = require('express');
const bodyParser = require('body-parser');
const bookingsApi = require('./api/bookings.cjs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve /api/bookings
app.all('/api/bookings', (req, res) => {
  if (req.method === 'POST' && !req.body) {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try { req.body = JSON.parse(data); } catch {}
      bookingsApi(req, res);
    });
  } else {
    bookingsApi(req, res);
  }
});


// --- CMS ADMIN PANEL ENDPOINTS ---
const fs = require('fs');
const crypto = require('crypto');

// --- CMS endpoints are now public, no password or token required ---
// Dummy middleware for compatibility (does nothing)
function checkToken(req, res, next) { next(); }

// GET /api/cms/files
app.get('/api/cms/files', checkToken, (req, res) => {
  const publicDir = path.join(__dirname, 'public');
  fs.readdir(publicDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to list files' });
    const htmlFiles = files.filter(f => f.endsWith('.html'));
    res.json(htmlFiles);
  });
});

// GET /api/cms/file?file=...
app.get('/api/cms/file', checkToken, (req, res) => {
  const file = req.query.file;
  if (!file) return res.status(400).json({ error: 'No file specified' });
  const filePath = path.join(__dirname, 'public', file);
  if (!filePath.startsWith(path.join(__dirname, 'public'))) return res.status(403).json({ error: 'Forbidden' });
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(404).json({ error: 'File not found' });
    res.json({ content: data });
  });
});

// POST /api/cms/save { file, content }
app.post('/api/cms/save', checkToken, (req, res) => {
  const { file, content } = req.body;
  if (!file) return res.status(400).json({ error: 'No file specified' });
  const filePath = path.join(__dirname, 'public', file);
  if (!filePath.startsWith(path.join(__dirname, 'public'))) return res.status(403).json({ error: 'Forbidden' });
  fs.writeFile(filePath, content, 'utf8', err => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Minimal bookings API running at http://localhost:${PORT}`);
});
