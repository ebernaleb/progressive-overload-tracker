// src/lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database.types';

export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Re-export these for convenience
export type { User, Session } from '@supabase/supabase-js';
