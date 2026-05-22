# Lembongan Static Frontend

This repository is now running in static frontend mode.

The app is built with Vite + React + TypeScript and deployed as static assets.

## Local development

Requirements:

- Node.js 20+
- npm 10+

Commands:

```sh
npm install
npm run dev
```

Build command:

```sh
npm run build
```

The production files are generated in the `dist` directory.

## Deployment (Hostinger static)

1. Run `npm run build`.
2. Upload the contents of `dist` to the web root on Hostinger.
3. Configure SPA fallback so non-file routes resolve to `index.html`.
4. Purge any CDN/cache layer after upload.

## Notes

- This mode does not depend on the local Node server for development.
- `vercel.json` is configured for static SPA behavior only.
