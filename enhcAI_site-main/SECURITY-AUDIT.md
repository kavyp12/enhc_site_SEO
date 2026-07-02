# Security Audit — enhc site

Date: 2026-07-01

## TL;DR on the "crypto miner" warning

**The codebase is clean.** No crypto-miner code exists in your source, in the
compiled bundle that ships to browsers (`.next`), in `public/`, in npm install
scripts, or in the dependency lockfile. Spline (the usual false-positive trigger,
a remote-WASM 3D loader) was present but **dead code** and has been removed.

Because the code is clean, a "crypto miner" flag on the **live** site almost
always means one of:

1. **The server/hosting was compromised** and a miner was injected into the
   served HTML or is running as a process on the box. This is the most common
   cause when the source is clean. **← most likely.**
2. A **false positive** from a browser anti-miner extension / antivirus.
3. The **build on the server was tampered with** after deploy.

See "Server-side checklist" below to find and remove it on the server.

---

## Findings & fixes

### CRITICAL — Admin password shipped to browsers (FIXED in code)
`src/app/analytic/page.tsx` hard-coded `password === 'Enhc@123'` in a client
component, so the password was downloadable in the JS bundle by anyone. That is
the **same** `ADMIN_PASSWORD` that guards all customer PII (names, emails,
phones, messages, project briefs) via `/api/admin/*`.
- Fixed: the page now verifies through a new server endpoint
  `POST /api/admin/verify`; the password no longer appears in client code.
- **You must still rotate the password** (see below) — it has already been
  public in your live bundle.

### CRITICAL — Live credentials in `.env.local` (ACTION REQUIRED — rotate)
`.env.local` holds real secrets: MongoDB URI (with user/pass), ImageKit private
key, and the admin password. The file is correctly git-ignored (not in repo
history), **but** if the server was compromised these were readable there.
Rotate all of them — see "Credential rotation".

### HIGH — Weak admin password + brute-forceable admin API (FIXED / ACTION)
- `Enhc@123` is weak and guessable. **Rotate to a strong value.**
- Admin API had no rate limiting. Fixed: added per-IP rate limits and
  constant-time password comparison (`src/lib/adminAuth.ts`).

### MEDIUM — No abuse protection on public forms (FIXED)
- `/api/contact` and `/api/project-enquiry` had no rate limiting; the contact
  route also lacked email validation and input length limits. Fixed: added
  per-IP rate limiting (5/min), email validation, type checks (rejects NoSQL
  operator objects), and length caps.

### MEDIUM — No security headers / CSP (FIXED)
- Added a global Content-Security-Policy + security headers in `next.config.ts`.
  The CSP whitelists only the origins the site uses (self, Google Analytics,
  Google Fonts, image CDNs). An injected miner script cannot load, and
  `connect-src` blocks it from reaching a mining pool. This is defense-in-depth
  against exactly the reported problem.
- **Requires a redeploy / dev-server restart to take effect** (Next.js does not
  hot-reload `next.config.ts`).

### LOW — Dead code removed
- `src/app/components/LostOrb.tsx` (unused Spline remote-WASM loader) — removed.
- `src/lib/supabase.ts` (unused, referenced a missing `SUPABASE_URL`) — removed.
- `@splinetool/*`, `three`, `@supabase/supabase-js` are now unused dependencies.
  Optional cleanup: `npm uninstall @splinetool/react-spline @types/three three @supabase/supabase-js`.

---

## Credential rotation (do this now)

1. **Admin password** — set a new strong value in your production environment
   (host dashboard env vars) and in local `.env.local`:
   `ADMIN_PASSWORD="<a long random string, e.g. 24+ chars>"`
2. **MongoDB** — in MongoDB Atlas, rotate the DB user's password (or create a
   new user and delete the old one), then update `MONGODB_URI`. Also restrict
   Atlas Network Access to your server's IP instead of `0.0.0.0/0` if it is open.
3. **ImageKit** — regenerate the private API key in the ImageKit dashboard and
   update `Imagekit_Private_key`.
4. Never commit `.env.local` (already git-ignored). Store production secrets in
   your host's env settings, not in files on the server where possible.

---

## Server-side checklist (find the actual miner on the live box)

Run these on the server where the site is deployed:

- **Check served HTML for injected scripts:**
  `curl -s https://www.enhc.tech | grep -iE 'coinhive|cryptonight|xmrig|miner|wasm|<script[^>]+src=\"https?://(?!www\.googletagmanager\.com|www\.google-analytics\.com)'`
  Anything unexpected = injection.
- **Check for miner processes / high CPU:** `top` / `htop`; look for `xmrig`,
  `kdevtmpfsi`, `kinsing`, random-named high-CPU processes.
- **Check cron for persistence:** `crontab -l`, `ls -la /etc/cron.*`,
  `cat /etc/crontab`.
- **Diff deployed files vs a clean build** from this repo. If any file under the
  deployed `.next` or served root differs from a fresh `npm ci && npm run build`,
  the server copy was tampered with — redeploy from a clean build.
- **Rotate all server access** (SSH keys, hosting-panel/FTP passwords) — a weak
  one is the usual entry point.
- Redeploy from a clean checkout after rotating credentials.

If `curl` of the live HTML is clean and only some visitors see the warning, it is
likely a browser extension / AV false positive rather than a real miner.
