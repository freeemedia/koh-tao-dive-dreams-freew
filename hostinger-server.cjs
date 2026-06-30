/**
 * Hostinger Node.js entrypoint — serves the Vite production build only.
 * API calls go to Vercel via VITE_API_BASE_URL (see README_DEPLOY.md).
 */
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const distDir = path.join(__dirname, 'dist');
const indexHtml = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtml)) {
  console.error('[hostinger-server] dist/index.html not found. Run: npm run build');
  process.exit(1);
}

app.use(
  express.static(distDir, {
    index: false,
    maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
  }),
);

// SPA fallback (do not catch /api — those are on Vercel)
app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(indexHtml);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[hostinger-server] Frontend ready on port ${PORT}`);
  const apiBase = (process.env.VITE_API_BASE_URL || '').trim();
  if (apiBase) {
    console.log(`[hostinger-server] API base (build-time): ${apiBase}`);
  } else {
    console.warn('[hostinger-server] VITE_API_BASE_URL was not set at build time; /api calls use same origin.');
  }
});
