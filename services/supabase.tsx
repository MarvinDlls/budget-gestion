import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://haobsxauusygchvklrsu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhb2JzeGF1dXN5Z2NodmtscnN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0Mzc5NzgsImV4cCI6MjA1NzAxMzk3OH0.wn2EDXK0nvIV7lCFHE-gcdSf8BgJzsP0D_8LbN8We50'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})