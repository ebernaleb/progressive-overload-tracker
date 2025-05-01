import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  console.log('[API] Refresh token endpoint called');
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  
  // Attempt to refresh the session
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error) {
    console.error('[API] Error getting session:', error.message);
    return NextResponse.json({ error: error.message }, { status: 401 })
  }
  
  if (!session) {
    console.log('[API] No session found during refresh attempt');
    return NextResponse.json({ error: 'No session to refresh' }, { status: 401 })
  }
  
  try {
    console.log('[API] Session found, attempting to refresh for user:', session.user.email);
    
    // Refresh the session
    const { data, error } = await supabase.auth.refreshSession()
    
    if (error) {
      console.error('[API] Error refreshing session:', error.message);
      return NextResponse.json({ error: error.message }, { status: 401 })
    }
    
    console.log('[API] Session refreshed successfully for user:', data.user?.email);
    
    // Send back a response with the refreshed session
    return NextResponse.json({ 
      message: 'Session refreshed successfully',
      user: data.user,
      session: data.session,
      success: true 
    })
  } catch (err) {
    console.error('[API] Error refreshing session:', err)
    return NextResponse.json({ error: 'Failed to refresh session' }, { status: 500 })
  }
} 