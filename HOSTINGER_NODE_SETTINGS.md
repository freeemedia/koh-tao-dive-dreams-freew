# Hostinger Node.js Settings

Use these values in hPanel Node.js app setup.

- Framework: Other
- Node.js version: 20.x (or latest available LTS)
- Application root: divinginasia.com/nodejs
- Application startup file: server.cjs
- Application URL: https://www.divinginasia.com

## Build And Start

- Install command: npm install
- Build command: npm run build
- Output directory: dist
- Start command: npm run start

## Environment Variables

Paste values from one of these files:

- .env.hostinger (WordPress-first fallback mode)
- .env.hostinger.mysql (MySQL-first mode)
- .env.hostinger.starter (template)

## After saving env vars

1. Restart the Node.js app in hPanel.
2. Open /api/health and confirm JSON response.
3. Submit a test booking and verify in WordPress bookings endpoint.
