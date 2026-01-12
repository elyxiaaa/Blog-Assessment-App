import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hhavsvvnzofiwibdgpya.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoYXZzdnZuem9maXdpYmRncHlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwMjkxNTksImV4cCI6MjA4MzYwNTE1OX0.NcAgudPZfl21V7CmeFcVQCazbk7A11T_KLOYePGe7J4'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)