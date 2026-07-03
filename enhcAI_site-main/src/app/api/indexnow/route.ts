// src/app/api/indexnow/route.ts
// On-demand IndexNow submission endpoint, protected by a shared secret so only
// you (or a deploy hook) can trigger it.
//
//   POST /api/indexnow
//   header: x-indexnow-secret: <INDEXNOW_SUBMIT_SECRET>   (or ?secret=...)
//   body:   { "urls": ["https://enhc.tech/blogs/8", ...] }
//
// Set INDEXNOW_SUBMIT_SECRET in the environment to enable it.
import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { submitToIndexNow, INDEXNOW_KEY } from '@/lib/indexnow';

/** Constant-time string compare so the secret check can't be timing-probed. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export const runtime = 'nodejs';
// Never cache — this is an action endpoint.
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const secret = process.env.INDEXNOW_SUBMIT_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: 'INDEXNOW_SUBMIT_SECRET is not configured on the server.' },
      { status: 503 },
    );
  }

  const provided =
    request.headers.get('x-indexnow-secret') ||
    new URL(request.url).searchParams.get('secret') ||
    '';
  if (!safeEqual(provided, secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let urls: string[] = [];
  try {
    const body = await request.json();
    urls = Array.isArray(body?.urls) ? body.urls : [];
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (urls.length === 0) {
    return NextResponse.json({ error: 'Provide a non-empty "urls" array.' }, { status: 400 });
  }

  const result = await submitToIndexNow(urls);
  return NextResponse.json(
    { key: INDEXNOW_KEY, ...result },
    { status: result.ok ? 200 : 502 },
  );
}
