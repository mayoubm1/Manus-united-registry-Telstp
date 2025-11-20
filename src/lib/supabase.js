import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vrfyjirddfdnwuffzqhb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZnlqaXJkZGZkbnd1ZmZ6cWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDYwNjMsImV4cCI6MjA3NTQ4MjA2M30.glgJwI2yIqUFG8ZtWJk2esxGdXw6nFp5eQ8aANbRAvE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const auth = supabase.auth

export const dbHelpers = {
  async getCourses() {
    return supabase.from('courses').select('*')
  },
  async getStudentProgress(userId) {
    return supabase.from('student_progress').select('*').eq('user_id', userId)
  }
}

