'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="bg-[#0A0A0A] text-white">
        <div className="min-h-screen flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-amber-500 bg-clip-text text-transparent">Critical System Error</h2>
            <p className="text-white/50">The application encountered an unrecoverable failure. We have been notified of this issue.</p>
            <div className="pt-6">
              <button
                onClick={() => reset()}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-semibold transition"
              >
                Attempt Recovery
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
