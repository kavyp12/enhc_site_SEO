// src/app/api/admin/contacts/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import type { ContactDocument } from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    // Check for admin password in header
    const adminPassword = request.headers.get('x-admin-password')
    const correctPassword = process.env.ADMIN_PASSWORD
    
    if (!correctPassword) {
      return NextResponse.json(
        { error: 'Admin password not configured' },
        { status: 500 }
      )
    }
    
    if (!adminPassword || adminPassword !== correctPassword) {
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