import { createClient } from "@supabase/supabase-js";

// Your Supabase configuration
const supabaseUrl = "https://riwshlulhyngqesrzrsd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpd3NobHVsaHluZ3Flc3J6cnNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MzkwOTMsImV4cCI6MjA1NDExNTA5M30.Lvdx88VOOnpp3E18rHhjel7T9YKdxYV9ofKKmWxokC8";

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;