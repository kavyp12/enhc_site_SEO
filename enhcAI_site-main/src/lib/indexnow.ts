// src/lib/indexnow.ts
// IndexNow submission helper.
//
// IndexNow instantly notifies participating search engines (Bing, Yandex,
// Seznam, Naver) that a URL was added, updated or deleted. Bing's index also
// powers Microsoft Copilot and ChatGPT web search, so this is the fastest way
// to get new/changed content in front of those AI answer engines.
//
// IMPORTANT: Google does NOT participate in IndexNow. For Google, rely on
// Search Console + sitemap crawling (Google also removed its sitemap-ping
// endpoint in 2023). See scripts/indexnow-submit.mjs for CLI usage.
import { SITE_URL } from '@/lib/seo';

// The key is intentionally public — it is published at
// https://<host>/<key>.txt so the engines can verify domain ownership.
// Override per-environment with INDEXNOW_KEY (must match the public .txt file).
export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY || 'c4fb1da1b23b1e54abf31ddc88c606ef';

export const INDEXNOW_KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

// A single generic endpoint fans the submission out to every participating
// engine, so there is no need to POST each one individually.
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

export type IndexNowResult = {
  ok: boolean;
  status: number;
  submitted: number;
  body?: string;
};

/**
 * Submit URLs (all on SITE_URL's host) to IndexNow. Off-host and malformed
 * URLs are dropped; duplicates are de-duped. IndexNow accepts up to 10,000
 * URLs per request.
 */
export async function submitToIndexNow(urls: string[]): Promise<IndexNowResult> {
  const host = new URL(SITE_URL).host;
  const urlList = Array.from(new Set(urls)).filter((u) => {
    try {
      return new URL(u).host === host;
    } catch {
      return false;
    }
  });

  if (urlList.length === 0) {
    return { ok: false, status: 0, submitted: 0, body: 'no valid URLs' };
  }

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList,
    }),
  });

  const body = await res.text().catch(() => '');
  // 200 = accepted, 202 = accepted/queued. Both are success.
  return { ok: res.status === 200 || res.status === 202, status: res.status, submitted: urlList.length, body };
}
