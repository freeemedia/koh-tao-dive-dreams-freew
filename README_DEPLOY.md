# Deploying Static Frontend (Hostinger)

This project is deployed as a static frontend.

## Build locally

```bash
npm install
npm run build
```

Build output is generated in `dist/`.

## Upload to Hostinger

1. Open Hostinger File Manager.
2. Go to the site root (`public_html`).
3. Remove old static assets from previous deploys.
4. Upload all files from `dist/` into `public_html`.

## SPA routing

Set rewrite/fallback so unknown routes resolve to `index.html`.

Without this, direct refresh on routes like `/contact` or `/book-now` returns 404.

## Cache

After upload:

1. Purge Hostinger cache/CDN (if enabled).
2. Hard-refresh browser cache.

## Optional Vercel usage

`vercel.json` is kept in static SPA mode only. It is optional and not required for Hostinger deployment.
