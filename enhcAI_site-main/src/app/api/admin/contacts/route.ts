// src/app/api/admin/contacts/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import type { ContactDocument } from '@/lib/mongodb'
import { verifyAdminPassword, rateLimit, getClientIp } from '@/lib/adminAuth'

export async function GET(request: NextRequest) {
  try {
    // Throttle brute-force attempts against the admin password.
    const ip = getClientIp(request)
    const limit = rateLimit(`admin-contacts:${ip}`, 20, 60_000)
    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please slow down.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
      )
    }

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Admin password not configured' },
        { status: 500 }
      )
    }

    // Constant-time comparison to avoid timing side-channels.
    if (!verifyAdminPassword(request.headers.get('x-admin-password'))) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid admin password' },
        { status: 401 }
      )
    }

    const db = await getDb()
    const contacts = await db
      .collection<ContactDocument>('contacts')
      .find({})
      .sort({ created_at: -1 })
      .toArray()

    // Map _id to id for frontend compatibility
    const formattedContacts = contacts.map(c => ({
      ...c,
      id: c._id?.toString(),
    }))

    return NextResponse.json(
      { contacts: formattedContacts },
      { status: 200 }
    )
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}