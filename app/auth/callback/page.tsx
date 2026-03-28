"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Suspense } from 'react';

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const next = searchParams.get('next') ?? '/dashboard';
      const errorParam = searchParams.get('error');

      if (errorParam) {
        router.replace(`/login?error=${encodeURIComponent(errorParam)}`);
        return;
      }

      if (code) {
        // PKCE flow: exchange the code using the browser client
        // (browser has access to the PKCE verifier stored in localStorage)
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
          router.replace(next);
          return;
        }
        console.error('Code exchange error:', error.message);
      }

      // Fallback: check if we already have a valid session
      // (handles implicit flow where token lands in hash fragment)
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const next = searchParams.get('next') ?? '/dashboard';
        router.replace(next);
        return;
      }

      // Nothing worked — redirect to login with error
      router.replace('/login?error=Could+not+authenticate');
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 text-lg font-medium">Signing you in…</p>
        <p className="text-gray-400 text-sm mt-2">Please wait a moment</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CallbackHandler />
    </Suspense>
  );
}
