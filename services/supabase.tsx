import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aklbwkzgaczhdduhvilk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrbGJ3a3pnYWN6aGRkdWh2aWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNDIzODUsImV4cCI6MjA1NTkxODM4NX0.Y5NtaET0NA0BzX2_6UAQZt9zOP7Js-h-zuO8xSMab7s'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})