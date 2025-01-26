import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pwxqffsasywnojdzxxmv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3eHFmZnNhc3l3bm9qZHp4eG12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NDQ0ODAsImV4cCI6MjA1MzIyMDQ4MH0.EIga48OyxDVUxIG7worYaqvYRzJGZVQwQmetVp-EXFk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})