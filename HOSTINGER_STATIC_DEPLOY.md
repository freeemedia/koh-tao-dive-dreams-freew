# Hostinger Static Deploy (No Node Runtime)

Use this mode when you want the website to be plain static files in `public_html`.

## 1. Build static output

Run from repo root:

```bash
npm install
npm run build:static
```

This produces `dist/` and writes `dist/.htaccess` for SPA routing.

## 2. Publish to Hostinger public_html

Upload the contents of `dist/` to `public_html/`.

If you're using this repo directly on the server path, you can sync locally:

```bash
npm run deploy:static:local
```

## 3. Disable Node app for the website

In hPanel Node.js app settings, stop/disable the app that serves `www.divinginasia.com`.

The domain should now be served by static files in `public_html`.

## 4. Keep dynamic APIs external

This frontend expects API requests to go to your external API base via `VITE_API_BASE_URL` at build time.

Before building, set:

```bash
VITE_API_BASE_URL=https://YOUR_API_DOMAIN_OR_VERCEL_URL
```

Then run `npm run build:static` again.

## 5. Verify

- `/` returns your homepage
- a deep route like `/specialty/deep-diver` loads (SPA fallback works)
- booking/contact/admin actions that rely on APIs still work via external API base
