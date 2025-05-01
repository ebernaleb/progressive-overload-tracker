'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/custom-toast';
import { useRouter, usePathname } from 'next/navigation';
import { supabase, User, Session } from '@/lib/supabase';

// Add a debug helper
const debug = (message: string, ...data: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[AuthContext] ${message}`, ...data);
  }
};

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isLoading: boolean; // Alias for loading to maintain compatibility
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshToken: () => Promise<void>; // Add refresh token function
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isLoading: true,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
  refreshToken: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();

  debug('AuthProvider initialized, pathname:', pathname);

  // Session initialization and management
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      debug('Initializing auth...');
      try {
        // Check for existing session - uses cookies with client component client
        const { data: { session: existingSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (mounted) {
          if (sessionError) {
            console.error('Error getting session:', sessionError.message);
            setLoading(false);
            debug('Session error:', sessionError.message);
            return;
          }

          if (existingSession) {
            debug('Found existing session:', existingSession.user.email);
            setSession(existingSession);
            setUser(existingSession.user);
          } else {
            debug('No existing session found');
          }
          setLoading(false);
        }

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, newSession) => {
            debug(`Auth state change: ${event}`, newSession ? `User: ${newSession.user.email}` : 'No session');
            if (mounted) {
              if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                setSession(newSession);
                setUser(newSession?.user ?? null);
                router.refresh(); // Refresh the router to update UI
                
                // Handle redirect after sign in
                const redirectPath = sessionStorage.getItem('redirectAfterLogin');
                if (redirectPath) {
                  debug(`Redirecting to stored path: ${redirectPath}`);
                  sessionStorage.removeItem('redirectAfterLogin');
                  router.push(redirectPath);
                } else {
                  debug('No stored redirect path, user will stay on current page or be redirected by route protection');
                }
              } else if (event === 'SIGNED_OUT') {
                debug('User signed out, clearing session and user state');
                setSession(null);
                setUser(null);
                router.refresh(); // Refresh the router to update UI
                router.push('/');
              }
            }
          }
        );

        return () => {
          debug('Auth cleanup - unsubscribing from auth changes');
          mounted = false;
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error initializing auth:', error);
        debug('Error initializing auth:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();
  }, [router]);

  // Route protection
  useEffect(() => {
    if (loading) {
      debug('Route protection skipped - still loading');
      return;
    }

    const protectedRoutes = ['/dashboard'];
    const authRoutes = ['/login', '/register'];
    
    debug(`Route protection check - pathname: ${pathname}, user: ${user ? user.email : 'null'}`);
    
    if (protectedRoutes.includes(pathname)) {
      if (!user) {
        debug(`Protected route ${pathname} - no user, redirecting to login`);
        sessionStorage.setItem('redirectAfterLogin', pathname);
        router.push('/login');
      } else {
        debug(`Protected route ${pathname} - user authenticated, allowing access`);
      }
    } else if (authRoutes.includes(pathname) && user) {
      debug(`Auth route ${pathname} - user already logged in, redirecting to dashboard`);
      const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/dashboard';
      sessionStorage.removeItem('redirectAfterLogin');
      router.push(redirectPath);
    }
  }, [pathname, user, loading, router]);

  const signIn = async (email: string, password: string) => {
    debug(`Attempting sign in for: ${email}`);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        debug('Sign in error:', error.message);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      debug('Sign in successful', data.user?.email);
      toast({
        title: "Success!",
        description: "You have been logged in.",
      });

      return { error: null };
    } catch (error: any) {
      debug('Unexpected sign in error:', error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return { error };
    }
  };

  const signUp = async (email: string, password: string) => {
    debug(`Attempting sign up for: ${email}`);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        debug('Sign up error:', error.message);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      debug('Sign up successful', data.user?.email);
      toast({
        title: "Success!",
        description: "Please check your email to verify your account.",
      });

      return { error: null };
    } catch (error: any) {
      debug('Unexpected sign up error:', error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return { error };
    }
  };

  const signOut = async () => {
    debug('Attempting to sign out');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      debug('Sign out successful');
      sessionStorage.removeItem('redirectAfterLogin');
      router.push('/');
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully.',
      });
    } catch (error: any) {
      console.error('Error signing out:', error);
      debug('Error signing out:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to sign out.',
        variant: 'destructive',
      });
    }
  };

  const refreshToken = async () => {
    debug('Manually refreshing token');
    try {
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        debug('Error refreshing token manually:', error.message);
        console.error('Error refreshing token:', error);
        return;
      }
      
      if (data.session) {
        debug('Token refreshed successfully');
        setSession(data.session);
        setUser(data.session.user);
        return;
      } else {
        debug('No session returned from refresh');
      }
    } catch (error) {
      console.error('Unexpected error refreshing token:', error);
      debug('Unexpected error refreshing token:', error);
    }
  };

  const value = {
    user,
    session,
    loading,
    isLoading: loading, // Add alias for compatibility with auth-layout.tsx
    signIn,
    signUp,
    signOut,
    refreshToken,
  };

  debug(`Auth context value - user: ${user?.email || 'null'}, loading: ${loading}`);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 