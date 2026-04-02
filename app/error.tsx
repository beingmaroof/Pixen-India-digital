'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Optionally log this error to Sentry or internal analytics
    console.error('Segment Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex items-center justify-center p-6 text-center bg-black/20 backdrop-blur-md rounded-2xl border border-white/5 m-4">
      <div className="max-w-md w-full space-y-4">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-red-500/10 border border-red-500/20">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
        <p className="text-white/50 text-sm">{error.message || 'An unexpected error occurred in this section while loading data.'}</p>
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 hover:shadow-lg hover:shadow-purple-500/30 text-white rounded-xl transition-all font-medium"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all font-medium border border-white/10"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
