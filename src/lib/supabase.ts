// src/lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database.types';

// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://btsppimfdrmwilauqmoh.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c3BwaW1mZHJtd2lsYXVxbW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4ODM0MTYsImV4cCI6MjA2MTQ1OTQxNn0.JcbM6HDFobC9GBSJmyEVf1bbAHOA1EFOK0zd8j39k-4';

// Create Supabase client with proper cookie persistence
export const supabase = createBrowserClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      detectSessionInUrl: true,
      autoRefreshToken: true
    }
  }
);

// Re-export these for convenience
export type { User, Session } from '@supabase/supabase-js';
