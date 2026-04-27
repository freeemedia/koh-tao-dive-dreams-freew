// Minimal Express server to serve /api/bookings
const express = require('express');
const bodyParser = require('body-parser');
const bookingsApi = require('./api/bookings.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Wrap the bookingsApi handler for Express
app.all('/api/bookings', (req, res) => {
  // Patch req.body for POST (Express uses req.body, Vercel/Netlify use req.body or req.query)
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
