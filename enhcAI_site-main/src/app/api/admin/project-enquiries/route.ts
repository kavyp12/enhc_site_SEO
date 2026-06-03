// src/app/api/admin/project-enquiries/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import type { ProjectEnquiryDocument } from '@/lib/mongodb'

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
    const enquiries = await db
      .collection<ProjectEnquiryDocument>('project_enquiries')
      .find({})
      .sort({ created_at: -1 })
      .toArray()

    // Map _id to id for frontend compatibility
    const formattedEnquiries = enquiries.map(e => ({
      ...e,
      id: e._id?.toString(),
    }))

    return NextResponse.json(
      { enquiries: formattedEnquiries },
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