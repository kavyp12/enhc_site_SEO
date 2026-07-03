#!/usr/bin/env node
// Submit this site's URLs to IndexNow (Bing / Yandex / Seznam / Naver — NOT
// Google). Run it after you publish new or changed content.
//
// Usage:
//   node scripts/indexnow-submit.mjs
//       -> submits every URL in the live sitemap
//   node scripts/indexnow-submit.mjs https://enhc.tech/blogs/8 https://enhc.tech/blogs/9
//       -> submits only the URLs you pass
//   npm run indexnow
//
// Env:
//   SITE_URL       (default https://enhc.tech)
//   INDEXNOW_KEY   (default matches public/<key>.txt)

const SITE_URL = (process.env.SITE_URL || 'https://enhc.tech').replace(/\/$/, '');
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'c4fb1da1b23b1e54abf31ddc88c606ef';
const HOST = new URL(SITE_URL).host;
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function urlsFromSitemap() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`Failed to fetch sitemap: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function main() {
  const args = process.argv.slice(2).filter(Boolean);
  const urls = args.length ? args : await urlsFromSitemap();
  const urlList = [...new Set(urls)].filter((u) => {
    try {
      return new URL(u).host === HOST;
    } catch {
      return false;
    }
  });

  if (!urlList.length) {
    console.error('No valid URLs to submit.');
    process.exit(1);
  }

  console.log(`Submitting ${urlList.length} URL(s) to IndexNow for ${HOST} ...`);
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  const body = await res.text().catch(() => '');
  console.log(`IndexNow responded: HTTP ${res.status} ${res.statusText}`);
  if (body) console.log(body);
  // 200 = accepted, 202 = accepted/queued.
  process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
