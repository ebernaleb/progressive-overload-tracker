import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  console.log(`[Auth Callback] Processing callback, code exists: ${!!code}`);

  if (code) {
    try {
      const cookieStore = cookies();
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
      
      console.log(`[Auth Callback] Exchanging code for session`);
      
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('[Auth Callback] Error exchanging code for session:', error.message);
      } else {
        console.log(`[Auth Callback] Session exchange successful for user: ${data.user?.email}`);
      }
    } catch (error) {
      console.error('[Auth Callback] Error exchanging code for session:', error);
    }
  } else {
    console.log('[Auth Callback] No code parameter found in URL');
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
} 