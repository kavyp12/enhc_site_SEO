// src/lib/adminAuth.ts
// Shared server-side helpers for admin authentication and basic abuse protection.
// NOTE: the rate limiter is in-memory. It works for a single long-running Node
// process (e.g. `next start` on a VPS). On serverless/multi-instance hosting it
// is best-effort only — move to a shared store (Redis/Upstash) there.
import { timingSafeEqual } from 'crypto'

/**
 * Constant-time comparison of the provided admin password against ADMIN_PASSWORD.
 * Returns false if the env var is missing or the value does not match.
 */
export function verifyAdminPassword(provided: string | null | undefined): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  if (!provided) return false

  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  // timingSafeEqual throws on length mismatch, so guard first. The length check
  // itself is not secret (password length is not sensitive here).
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

type Bucket = { count: number; resetAt: number }
const buckets = new Map<string, Bucket>()

/**
 * Fixed-window rate limiter. Returns whether the request is allowed and, if not,
 * how many seconds until the window resets.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; retryAfter: number } {
  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, retryAfter: 0 }
  }

  bucket.count += 1
  if (bucket.count > limit) {
    return { allowed: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) }
  }
  return { allowed: true, retryAfter: 0 }
}

// Opportunistic cleanup so the Map does not grow unbounded over long uptimes.
function sweep() {
  const now = Date.now()
  for (const [key, bucket] of buckets) {
    if (now >= bucket.resetAt) buckets.delete(key)
  }
}
// setInterval keeps the timer from holding the process open where supported.
const timer = setInterval(sweep, 10 * 60 * 1000)
if (typeof timer.unref === 'function') timer.unref()

/**
 * Best-effort client IP from proxy headers (works behind Nginx/Cloudflare/Vercel).
 */
export function getClientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'unknown'
}
