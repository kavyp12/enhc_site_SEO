// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import type { ContactDocument } from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, source, message, newsletter } = body

    // Validate required fields
    if (!name || !email || !source || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Insert data into MongoDB
    const db = await getDb()
    const contact: ContactDocument = {
      name,
      email,
      phone: phone || null,
      source,
      message,
      newsletter: newsletter || false,
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