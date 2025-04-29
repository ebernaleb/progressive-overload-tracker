'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-provider';

// Debug helper
const debug = (message: string, ...data: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[ProtectedRoute] ${message}`, ...data);
  }
};

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, loading } = useAuth();

  debug(`Component rendered - user: ${user?.email || 'null'}, loading: ${loading}`);

  useEffect(() => {
    // Wait until auth state has loaded
    if (loading) {
      debug('Auth state still loading, deferring protection logic');
      return;
    }

    if (!user) {
      debug('No authenticated user, redirecting to login');
      const currentPath = window.location.pathname;
      sessionStorage.setItem('redirectAfterLogin', currentPath);
      router.push('/login');
    } else {
      debug(`Authenticated access by ${user.email}`);
    }
  }, [user, loading, router]);

  // Don't render children while loading or when not authenticated
  if (loading) {
    debug('Rendering loading state');
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    debug('Not rendering protected content (no user)');
    return null;
  }

  debug('Rendering protected content');
  return <>{children}</>;
} 