# Deploying to Hostinger + Vercel (recommended split)

| Layer | Host | What runs |
|-------|------|-----------|
| **Frontend** | Hostinger Node.js | `hostinger-server.cjs` serves `dist/` (Vite SPA) |
| **Backend** | Vercel | Serverless routes in repo root `api/` |

The frontend calls Vercel using **`VITE_API_BASE_URL`** (baked in at build time). `src/main.tsx` rewrites all `fetch('/api/...')` to that origin.

---

## 1. Vercel (API only)

Use a Vercel project for **this repo root** (not `divinginasia.com/nodejs`; use root `api/` only).

1. Connect the Git repo in Vercel.
2. **Project Settings → General**
   - Framework Preset: **Other**
   - Root Directory: `.` (repository root)
   - Build Command: leave empty or `echo "api-only"`
   - Output Directory: `public` (or any folder; only `/api/*` matters)
   - Install Command: `npm install`
3. **Environment Variables** — copy everything you already use (Supabase, Resend, `ADMIN_*`, `BOOKING_*`, etc.). These are **server-only** on Vercel (no `VITE_` prefix unless the client also needs them).
4. Deploy and note the URL, e.g. `https://your-project.vercel.app` or a custom domain like `https://api.divinginasia.com`.

Test:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://YOUR_VERCEL_URL/api/bookings
```

---

## 2. Hostinger Node.js (frontend only)

**Application root:** repository root (where `package.json` and `hostinger-server.cjs` live)

| Setting | Value |
|---------|--------|
| Startup file | `hostinger-server.cjs` |
| Node version | 20+ |
| Build command | `npm install && npm run build:hostinger` |

**Environment variables on Hostinger (build + runtime):**

| Variable | When | Example |
|----------|------|---------|
| `VITE_API_BASE_URL` | **Build** (required for split) | `https://your-project.vercel.app` |
| `VITE_SUPABASE_URL` | Build | (if using Supabase in UI) |
| `VITE_SUPABASE_ANON_KEY` | Build | public anon key only |
| `VITE_ADMIN_EMAILS` | Build | optional |
| `PORT` | Runtime | usually set by Hostinger |

Do **not** put `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, or other secrets on Hostinger unless you run server code there — they belong on **Vercel only**.

**Start command:** `npm run start:hostinger` (or `node hostinger-server.cjs`)

Local smoke test:

```bash
export VITE_API_BASE_URL=https://YOUR_VERCEL_URL
npm run build:hostinger
npm run start:hostinger
# open http://localhost:3000
```

---

## Legacy: static `public_html` + local Node API

The older setup (upload `dist/` to `public_html/` and proxy `/api` to `127.0.0.1:3001`) is still in `divinginasia.com/public_html/`. Prefer the split above instead of `divinginasia.com/nodejs/server.cjs` for production API.

The repository root is the public Vite app. The separate `admin/` folder is its own Next.js app and should stay deployed separately from the public site.
