import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nesveyhcxbgdhlndfbaz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lc3ZleWhjeGJnZGhsbmRmYmF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwNTE0OTEsImV4cCI6MjA1MDYyNzQ5MX0.ZZe746ASE_7ui58PW8KxJKqUegCNhKdewGVhJZzx968';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
