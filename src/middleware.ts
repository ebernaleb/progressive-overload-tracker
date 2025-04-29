import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of protected routes that require authentication
const protectedRoutes = ['/dashboard'];

// List of auth routes that should redirect to dashboard if user is already logged in
const authRoutes = ['/login', '/register'];

// Define paths to exclude from middleware processing
const excludedPaths = [
  '/_next',
  '/api',
  '/static',
  '/images',
  '/favicon.ico',
];

export async function middleware(req: NextRequest) {
  try {
    // Skip middleware for excluded paths
    if (excludedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
      return NextResponse.next();
    }

    // Initialize response
    const res = NextResponse.next();

    // Create supabase client
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            const cookie = req.cookies.get(name)?.value;
            if (process.env.NODE_ENV === 'development') {
              console.log(`[Middleware] Retrieved cookie: ${name}`, cookie ? "exists" : "null");
            }
            return cookie;
          },
          set(name: string, value: string, options: any) {
            if (process.env.NODE_ENV === 'development') {
              console.log(`[Middleware] Setting cookie: ${name}`);
            }
            res.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options: any) {
            if (process.env.NODE_ENV === 'development') {
              console.log(`[Middleware] Removing cookie: ${name}`);
            }
            res.cookies.set({
              name,
              value: '',
              ...options,
            });
          },
        },
      }
    );

    // Refresh session if it exists
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Middleware] Session check:`, session ? `User: ${session.user.email}` : "No session");
      if (error) console.error('[Middleware] Session error:', error.message);
    }

    const requestUrl = new URL(req.url);
    const path = requestUrl.pathname;

    // Handle protected routes
    if (protectedRoutes.includes(path)) {
      if (!session) {
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Middleware] Redirecting from ${path} to /login (no session)`);
        }
        // Store the attempted URL to redirect back after login
        const redirectUrl = new URL('/login', requestUrl.origin);
        redirectUrl.searchParams.set('redirectTo', path);
        return NextResponse.redirect(redirectUrl);
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Middleware] Authenticated access to ${path}`);
        }
      }
    }

    // Handle auth routes (login/register)
    if (authRoutes.includes(path)) {
      if (session) {
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Middleware] Redirecting from ${path} to /dashboard (authenticated user)`);
        }
        // If user is already logged in, redirect to dashboard
        const redirectUrl = new URL('/dashboard', requestUrl.origin);
        return NextResponse.redirect(redirectUrl);
      }
    }

    // Set auth state header for client components
    if (session) {
      res.headers.set('x-middleware-auth', 'authenticated');
    }

    return res;
  } catch (error) {
    console.error('[Middleware] Error:', error);
    // Return next response as fallback
    return NextResponse.next();
  }
}

// Configure paths that trigger the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 