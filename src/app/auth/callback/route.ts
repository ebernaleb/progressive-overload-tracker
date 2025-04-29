import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Auth Callback] Processing callback, code exists: ${!!code}`);
  }

  if (code) {
    try {
      const supabase = createRouteHandlerClient({ cookies });
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Auth Callback] Exchanging code for session`);
      }
      
      await supabase.auth.exchangeCodeForSession(code);
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Auth Callback] Session exchange complete, redirecting to dashboard`);
      }
    } catch (error) {
      console.error('[Auth Callback] Error exchanging code for session:', error);
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
} 