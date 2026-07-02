// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import type { ContactDocument } from '@/lib/mongodb'
import { rateLimit, getClientIp } from '@/lib/adminAuth'

// Reject non-string inputs (blocks NoSQL operator objects like {$gt:''}) and
// enforce sane length caps so a single request cannot store a huge document.
function asString(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (trimmed.length === 0 || trimmed.length > max) return null
  return trimmed
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    // Limit spam / DB flooding: 5 submissions per minute per IP.
    const ip = getClientIp(request)
    const limit = rateLimit(`contact:${ip}`, 5, 60_000)
    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again in a minute.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
      )
    }

    const body = await request.json()
    const { newsletter } = body

    // Validate and bound each field.
    const name = asString(body.name, 200)
    const email = asString(body.email, 320)
    const source = asString(body.source, 200)
    const message = asString(body.message, 5000)
    const phone = body.phone == null ? null : asString(body.phone, 50)

    if (!name || !email || !source || !message) {
      return NextResponse.json(
        { error: 'Missing or invalid required fields' },
        { status: 400 }
      )
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Insert data into MongoDB
    const db = await getDb()
    const contact: ContactDocument = {
      name,
      email: email.toLowerCase(),
      phone: phone || null,
      source,
      message,
      newsletter: newsletter === true,
      created_at: new Date(),
    }

    const result = await db.collection<ContactDocument>('contacts').insertOne(contact)

    if (!result.acknowledged) {
      return NextResponse.json(
        { error: 'Failed to submit contact form' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Contact form submitted successfully', data: { _id: result.insertedId, ...contact } },
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