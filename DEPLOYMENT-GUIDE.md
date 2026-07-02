# enhc.tech — Server Deployment Guide

**Server:** `ssh root@147.93.107.170` (Ubuntu, nginx 1.24.0)
**Why it's 502 right now:** nginx is up and proxying to a backend port, but nothing
is running on that port — the app folder on the server is empty. Once the Next.js
app is running on port 3000, the 502 disappears.

**Confirmed working locally (D:\enhcAI_site-seo\enhcAI_site-main):**
- Build passes, all 29 pages render
- Contact form → saves to MongoDB
- Start-a-Project form → saves to MongoDB + uploads file to ImageKit
- Admin panel (/allinfo) reads data with password `Enhc@123`

---

## How the pieces fit (nginx vs PM2 — you need BOTH)

They do different jobs, they don't replace each other:

- **PM2** = keeps your Next.js app *running* 24/7 on port 3000. Restarts it if it
  crashes, starts it again after a reboot. It does NOT know about your domain or SSL.
- **nginx** = the public *front door* on ports 80/443. It owns your domain name and the
  HTTPS certificate, and forwards every visitor request to the app on port 3000.
- **The app** itself = Next.js, listening only on `localhost:3000` (not public).

Flow: `visitor → Cloudflare DNS → nginx (443, SSL) → app on localhost:3000 (run by PM2)`

nginx is already installed on your server (it's what shows the 502). So you keep nginx and
just add PM2 + the app behind it.

## Cloudflare — is it perfect? YES, leave it as-is

Your DNS for the main site is correct:
- `enhc.tech`, `www.enhc.tech`, `analytics.enhc.tech` → **147.93.107.170**, **DNS only (grey cloud)** ✅
- `api/careerguide/p.enhc.tech` → 16.170.208.59 (a different server — not this project, ignore)

"DNS only" (grey cloud) is the right setting here — traffic goes straight to your server and
Let's Encrypt SSL works without any extra config. **Do not change anything in Cloudflare.**
(Optional, later: flipping the main records to "Proxied"/orange adds CDN + DDoS protection,
but then you'd set SSL mode to "Full (strict)". Not needed to go live — skip it for now.)

---

## STEP 0 — SSH into the server
```bash
ssh root@147.93.107.170
```

## STEP 1 — Look at the current state (don't change anything yet)
```bash
node -v 2>/dev/null || echo "no node"
pm2 -v 2>/dev/null || echo "no pm2"
nginx -v
grep -rE "server_name|proxy_pass" /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ 2>/dev/null
```
In the last command's output, find the block for `enhc.tech` / `www.enhc.tech` and note
its `proxy_pass` line — it's almost certainly `http://localhost:3000` or `http://127.0.0.1:3000`.
**That port (3000) is where the app must run.** The steps below assume 3000.

## STEP 2 — Install Node 22 LTS
The MongoDB driver needs Node ≥ 20.19. Installing Node 22 LTS is the safe choice.
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs git
node -v   # expect v22.x
```

## STEP 3 — Get the code (from YOUR public repo — no login needed)
```bash
cd ~
rm -rf enhcAI_site-main enhcAI_site-seo enhc_site_SEO    # clear any leftovers
git clone https://github.com/kavyp12/enhc_site_SEO.git
cd enhc_site_SEO/enhcAI_site-main
```

## STEP 4 — Create the environment file (THIS is what was missing)
```bash
nano .env.local
```
Paste exactly this, then save (Ctrl+O, Enter, Ctrl+X):
```
MONGODB_URI="mongodb+srv://kavypatel255:0hCGk2Gikd95hLgV@career-guide-database.zhgpo.mongodb.net/career-guide?retryWrites=true&w=majority"
Imagekit_Public_key="public_f/mA6SuznuykRSwTCjcc9sRWuow="
Imagekit_Private_key="private_bypkTDrnMfVIKLm0t25CIjC3rQg="
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/f7avk3onx/"
ADMIN_PASSWORD="Enhc@123"
NEXT_PUBLIC_SITE_URL="https://www.enhc.tech"
```
> Note: the variable is `MONGODB_URI` (not MONGO_URI). The app writes to a database
> called `enhc_website` on this cluster — separate from your career-guide data.

## STEP 5 — Allow the server's IP in MongoDB Atlas
In MongoDB Atlas → **Network Access** → **Add IP Address** → add `147.93.107.170`
(or `0.0.0.0/0` to allow from anywhere). If this isn't done, forms will fail to save.

## STEP 6 — Install dependencies and build
```bash
npm install
npm run build
```

## STEP 7 — Run it with PM2 (keeps it alive + restarts on reboot)
```bash
npm install -g pm2
pm2 start npm --name enhc -- start
pm2 save
pm2 startup        # then run the exact command it prints back to you
```
This runs `next start` on port 3000.
*(If STEP 1 showed a different port, e.g. 3001, start with: `PORT=3001 pm2 start npm --name enhc -- start`)*

## STEP 8 — Check the app is answering on the server
```bash
curl -I http://localhost:3000
```
Expect `HTTP/1.1 200 OK`. If you get 200 here, the 502 is essentially solved.

## STEP 9 — Point nginx at the app (and reload)
First reload and test:
```bash
nginx -t && systemctl reload nginx
```
Open **https://www.enhc.tech** — it should load now.

**If it still 502s**, your nginx block isn't proxying to 3000. Open the config:
```bash
nano /etc/nginx/sites-available/enhc.tech     # filename may differ — use the one from STEP 1
```
Make sure the HTTPS server block contains a location like this (keep your existing
`ssl_certificate` lines):
```nginx
server {
    listen 443 ssl;
    server_name enhc.tech www.enhc.tech analytics.enhc.tech analytic.enhc.tech;

    # ... keep your existing ssl_certificate / ssl_certificate_key lines ...

    client_max_body_size 15M;     # allow project-brief uploads (10MB files)

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# redirect http -> https
server {
    listen 80;
    server_name enhc.tech www.enhc.tech analytics.enhc.tech analytic.enhc.tech;
    return 301 https://$host$request_uri;
}
```
Then:
```bash
nginx -t && systemctl reload nginx
```

## STEP 10 — (Only if HTTPS gives a certificate error) issue SSL
If https loads but with a cert warning (it currently 502s *with* TLS, so certs likely
already exist), issue/renew with:
```bash
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d enhc.tech -d www.enhc.tech -d analytics.enhc.tech
```

---

## Final checks (the "is it really live" checklist)
1. https://www.enhc.tech loads (no 502)
2. Open the Contact page, submit a test → success message
3. Open Start-a-Project, submit with a PDF → success message
4. Open https://www.enhc.tech/allinfo, enter `Enhc@123` → see the two test entries
5. Delete those test entries (or just leave them)

## Updating the site later
```bash
cd ~/enhcAI_site-seo/enhcAI_site-main
git pull
npm install
npm run build
pm2 restart enhc
```

## Handy PM2 commands
```bash
pm2 logs enhc      # live logs (use this if a form errors)
pm2 status         # is it running?
pm2 restart enhc   # restart after changes
```
