// app/api/project-enquiry/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import type { ProjectEnquiryInsert, ProjectEnquiryDocument } from '@/lib/mongodb'
import ImageKit from 'imagekit'
import { rateLimit, getClientIp } from '@/lib/adminAuth'

// Helper to get ImageKit instance lazily to avoid build errors when keys are not defined
let imagekitInstance: ImageKit | null = null

function getImageKit() {
  if (!imagekitInstance) {
    const publicKey = process.env.Imagekit_Public_key
    const privateKey = process.env.Imagekit_Private_key
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT

    if (!publicKey || !privateKey || !urlEndpoint) {
      throw new Error('ImageKit configuration is missing')
    }

    imagekitInstance = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint
    })
  }
  return imagekitInstance
}

export async function POST(request: NextRequest) {
  try {
    // Limit abuse of the file-upload endpoint (ImageKit storage costs money):
    // 5 submissions per minute per IP.
    const ip = getClientIp(request)
    const limit = rateLimit(`project-enquiry:${ip}`, 5, 60_000)
    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again in a minute.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
      )
    }

    // Validate environment variables
    if (!process.env.MONGODB_URI) {
      console.error('Missing MongoDB configuration')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    if (!process.env.Imagekit_Public_key || !process.env.Imagekit_Private_key || !process.env.IMAGEKIT_URL_ENDPOINT) {
      console.error('Missing ImageKit configuration')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    
    // Extract all form fields
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const company = formData.get('company') as string
    const launchDate = formData.get('launchDate') as string
    const budgetMin = formData.get('budgetMin') as string
    const budgetMax = formData.get('budgetMax') as string
    const service = formData.get('service') as string
    const projectSummary = formData.get('projectSummary') as string
    const newsletter = formData.get('newsletter') === 'true'
    const projectBrief = formData.get('projectBrief') as File | null

    // Validate required fields
    if (!name || !email || !company || !launchDate || !budgetMin || !budgetMax || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate that either projectSummary or projectBrief is provided
    if (!projectSummary.trim() && (!projectBrief || projectBrief.size === 0)) {
      return NextResponse.json(
        { error: 'Please provide either a project summary or upload a brief' },
        { status: 400 }
      )
    }

    // Validate budget values
    const budgetMinNum = parseInt(budgetMin)
    const budgetMaxNum = parseInt(budgetMax)
    
    if (isNaN(budgetMinNum) || isNaN(budgetMaxNum) || budgetMinNum < 0 || budgetMaxNum < 0) {
      return NextResponse.json(
        { error: 'Invalid budget values' },
        { status: 400 }
      )
    }

    if (budgetMinNum > budgetMaxNum) {
      return NextResponse.json(
        { error: 'Minimum budget cannot be greater than maximum budget' },
        { status: 400 }
      )
    }

    let briefUrl: string | null = null
    
    // Handle file upload if present
    if (projectBrief && projectBrief.size > 0) {
      try {
        // Validate file size (10MB limit)
        const maxSize = 10 * 1024 * 1024 // 10MB in bytes
        if (projectBrief.size > maxSize) {
          return NextResponse.json(
            { error: 'File size must be less than 10MB' },
            { status: 400 }
          )
        }

        // Validate file type
        const allowedTypes = [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/msword'
        ]
        
        if (!allowedTypes.includes(projectBrief.type)) {
          return NextResponse.json(
            { error: 'Only PDF and Word documents are allowed' },
            { status: 400 }
          )
        }

        // Convert file to buffer
        const fileBuffer = Buffer.from(await projectBrief.arrayBuffer())
        
        // Generate unique filename
        const timestamp = Date.now()
        const sanitizedCompany = company.replace(/[^a-zA-Z0-9]/g, '_')
        const fileExtension = projectBrief.name.split('.').pop() || 'pdf'
        const fileName = `project-briefs/${sanitizedCompany}_${timestamp}.${fileExtension}`
        
        // Upload file to ImageKit
        const uploadResponse = await getImageKit().upload({
          file: fileBuffer,
          fileName: fileName,
          folder: '/project-briefs/',
          tags: ['project-brief', company.toLowerCase().replace(/\s+/g, '-'), email.split('@')[0]]
        })

        briefUrl = uploadResponse.url
      } catch (uploadError) {
        console.error('ImageKit upload error:', uploadError)
        return NextResponse.json(
          { error: 'Failed to upload project brief. Please try again.' },
          { status: 500 }
        )
      }
    }

    // Prepare data for insertion
    const insertData: ProjectEnquiryInsert = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      company: company.trim(),
      launch_date: launchDate,
      budget_min: budgetMinNum,
      budget_max: budgetMaxNum,
      service,
      project_summary: projectSummary.trim() || null,
      project_brief_url: briefUrl,
      newsletter
    }

    // Insert data into MongoDB
    const db = await getDb()
    const document: ProjectEnquiryDocument = {
      ...insertData,
      created_at: new Date(),
    }

    const result = await db.collection<ProjectEnquiryDocument>('project_enquiries').insertOne(document)

    if (!result.acknowledged) {
      if (briefUrl) {
        console.log('File uploaded to ImageKit but database insert failed. Manual cleanup may be needed for:', briefUrl)
      }
      return NextResponse.json(
        { error: 'Failed to submit project enquiry. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Project enquiry submitted successfully! We\'ll get back to you soon.',
        data: { _id: result.insertedId, ...document }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}