# Deploying to Hostinger

This project is set up to run the public site on Hostinger with a static Vite build and API endpoints served through the Hostinger-side backend/proxy layer.

The repository root is the public Vite app. The separate `admin/` folder is its own Next.js app and should stay deployed separately from the public site.

## Quick steps

1. Commit and push your changes to the repository.
2. Build the frontend locally:

```bash
npm run build
```

1. Upload the contents of `dist/` to Hostinger's public web root, typically `public_html/`.
1. Keep the SPA fallback rules in the Hostinger web root `.htaccess` so client-side routes resolve to `index.html`.
1. Add the environment variables in Hostinger's environment/configuration for the public site and backend:

- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY (server-side only)
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_API_BASE_URL (optional; leave empty to use same-origin)
- VITE_ADMIN_EMAILS (optional)
- DROPBOX_ACCESS_TOKEN (required for Dropbox-backed gallery sections)
- BOOKING_CALENDAR_TOKEN (optional; protects /api/bookings/calendar when set)

If you are using Hostinger shared hosting, the static frontend can be hosted there, but the Node/Express backend in `server.cjs` needs a VPS or another Node-capable runtime. The Hostinger `api/index.php` proxy expects a backend listening on `127.0.0.1:3001`.

Security note: do NOT expose `SUPABASE_SERVICE_ROLE_KEY` in client builds — only set it in server-side environment configuration.
Never create or use `VITE_SUPABASE_SERVICE_ROLE_KEY`; any `VITE_` variable is bundled into the client.

## Local testing

- Run backend + frontend concurrently (single-port dev):

```bash
npm run dev:single
```

- Or run the Vite preview build locally:

```bash
npm run preview
```

## Deploy from CLI

- To build the frontend for Hostinger:

```bash
npm run build
```

## Notes

- `divinginasia.com/public_html/.htaccess` is already configured for SPA routing on Hostinger.
- `divinginasia.com/public_html/api/index.php` is a proxy layer that expects the Node backend to be reachable on port `3001`.
- Keep `admin/` deployed separately from the public site.

## Hostinger Node.js settings (important)

If you deploy the Node backend with Hostinger Node.js hosting, use the working server inside `divinginasia.com/nodejs`.

- Application root: `divinginasia.com/nodejs`
- Startup file: `server.cjs`
- Node version: `20+` (or at least `18+`)
- App port: `3001`

Do not point Hostinger to the repository root `server.cjs` (it currently contains broken code and fails at startup).

Quick local check before deployment:

```bash
cd divinginasia.com/nodejs
node server.cjs
```

If you see `Server running on port 3001`, the backend entrypoint is valid.
