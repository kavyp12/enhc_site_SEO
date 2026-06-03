// src/lib/mongodb.ts
import { MongoClient, Db } from 'mongodb'

const uri = process.env.MONGODB_URI!

if (!uri) {
  throw new Error('Please add MONGODB_URI to your .env.local file')
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable to preserve the MongoClient
  // across hot module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise!
} else {
  // In production, create a new MongoClient
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export async function getDb(): Promise<Db> {
  const mongoClient = await clientPromise
  return mongoClient.db('enhc_website')
}

export default clientPromise

// Types matching the original Supabase schema
export interface ContactDocument {
  _id?: string
  name: string
  email: string
  phone?: string | null
  source: string
  message: string
  newsletter: boolean
  created_at: Date
}

export interface ProjectEnquiryDocument {
  _id?: string
  name: string
  email: string
  company: string
  launch_date: string
  budget_min: number
  budget_max: number
  service: string
  project_summary?: string | null
  project_brief_url?: string | null
  newsletter: boolean
  created_at: Date
}

// Keep the old type name for backwards compatibility with existing imports
export type ProjectEnquiryInsert = Omit<ProjectEnquiryDocument, '_id' | 'created_at'>
