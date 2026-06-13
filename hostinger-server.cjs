/**
 * Hostinger Node.js entrypoint — serves the Vite production build.
 * Proxies /api/* to Vercel so same-origin booking calls work even without VITE_API_BASE_URL.
 */
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const distDir = path.join(__dirname, 'dist');
const indexHtml = path.join(distDir, 'index.html');
const API_PROXY_TARGET = (process.env.API_PROXY_TARGET || process.env.VITE_API_BASE_URL || 'https://api.divinginasia.com')
  .trim()
  .replace(/\/+$/, '');

if (!fs.existsSync(indexHtml)) {
  console.error('[hostinger-server] dist/index.html not found. Run: npm run build');
  process.exit(1);
}

app.use(express.json({ limit: '2mb' }));

app.use('/api', async (req, res) => {
  const url = `${API_PROXY_TARGET}${req.originalUrl}`;

  try {
    const headers = {
      Accept: req.headers.accept || '*/*',
    };
    if (req.headers['content-type']) {
      headers['Content-Type'] = req.headers['content-type'];
    }

    const init = {
      method: req.method,
      headers,
    };

    if (!['GET', 'HEAD'].includes(req.method)) {
      init.body = req.body && Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : undefined;
    }

    const upstream = await fetch(url, init);
    const body = await upstream.text();

    res.status(upstream.status);
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(body);
  } catch (error) {
    console.error('[hostinger-server] API proxy error:', error);
    res.status(502).json({
      error: 'API proxy failed',
      details: error instanceof Error ? error.message : String(error),
      target: API_PROXY_TARGET,
    });
  }
});

app.use(
  express.static(distDir, {
    index: false,
    maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
  }),
);

app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(indexHtml);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[hostinger-server] Frontend ready on port ${PORT}`);
  console.log(`[hostinger-server] Proxying /api/* -> ${API_PROXY_TARGET}`);
});
