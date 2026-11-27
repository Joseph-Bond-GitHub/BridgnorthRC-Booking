# Deploying to the Plesk server

Production layout: nginx serves the React build as static files from `public/`, and
hands `/api/*` to Passenger, which boots Express via `app.js` → `dist/server.js`.

## One-time setup (first deploy only)

1. In Plesk: *domain > Node.js > Enable Node.js*.
2. Application root: `/httpdocs` · Document root: `/httpdocs/public` · Startup file: `app.js`.
3. Environment variables (these replace the local `server/.env`):
   - `DATABASE_URL` = production database connection string
   - `NODE_ENV` = `production`
4. Click **NPM install**, then **Restart App**.

## Every deployment (after updating code)

1. **Rebuild both halves** — always immediately before uploading, or you deploy stale code:

   ```bash
   cd server && npm run build   # emits server/dist/
   cd ../web && npm run build   # emits web/dist/
   ```

2. **Upload** via SFTP or Plesk's File Manager into `/httpdocs/`, overwriting:

   | From (local repo) | To (server) |
   |---|---|
   | `server/app.js` | `/httpdocs/app.js` |
   | `server/package.json`, `server/package-lock.json` | `/httpdocs/` |
   | contents of `server/dist/` | `/httpdocs/dist/` |
   | contents of `web/dist/` | `/httpdocs/public/` |

   **Never upload:** `node_modules/` (Plesk installs it) or `.env` (Plesk environment
   variables replace it — an uploaded `.env` would *override* them).

3. Click **NPM install** in Plesk — only when `package.json`/lockfile changed.
4. Click **Restart App**.
5. **Smoke test:** open `https://<domain>/api/health` — expect `{"dbTime": "..."}` —
   and load the homepage. This verifies both the app boot and the database connection.

## Gotchas

- `dist/` is gitignored, so git never carries it to the server; the build step in (1) is
  what produces it. Skipping it silently redeploys old code.
- Once client-side routing is added, deep links (e.g. `/bookings`) will 404 because no
  static file exists. Fix then with an nginx rewrite of unknown paths to `/index.html`
  (Plesk > domain > Apache & nginx settings > Additional nginx directives).
