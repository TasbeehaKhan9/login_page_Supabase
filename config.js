
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = "https://ddmarjvauymcqhjrvwdt.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkbWFyanZhdXltY3FoanJ2d2R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MTI3OTUsImV4cCI6MjA4MDE4ODc5NX0.TypSBFWXOZXt7-INznyZZPrwV44OKybTWGnZ7hfDCl4"
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase