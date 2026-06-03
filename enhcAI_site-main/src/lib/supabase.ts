// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  source: string
  message: string
  newsletter: boolean
}

export interface ProjectEnquiryData {
  id?: string
  name: string
  email: string
  company: string
  launch_date: string
  budget_min: number
  budget_max: number
  service: string
  project_summary?: string
  project_brief_url?: string
  newsletter: boolean
  created_at?: string
}

// Database interface that matches the actual table structure
export interface ProjectEnquiryInsert {
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
}