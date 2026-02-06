import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zccwhncdrpivxsjvmnhy.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjY3dobmNkcnBpdnhzanZtbmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MTc5NjgsImV4cCI6MjA4NDk5Mzk2OH0.16iqhkoN5qrVFMSjPXmh5xRoUyUAR2Su3YtNGAx0E84";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
