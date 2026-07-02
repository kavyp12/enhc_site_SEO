// src/app/api/admin/verify/route.ts
// Server-side password verification so client pages never embed the password.
import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminPassword, rateLimit, getClientIp } from '@/lib/adminAuth'

export async function POST(request: NextRequest) {
  try {
    // Throttle brute-force attempts: 10 tries per minute per IP.
    const ip = getClientIp(request)
    const { allowed, retryAfter } = rateLimit(`admin-verify:${ip}`, 10, 60_000)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many attempts. Please wait and try again.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      )
    }

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Admin password not configured' }, { status: 500 })
    }

    const password = request.headers.get('x-admin-password')
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
