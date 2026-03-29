"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer } from '@/components';
import { DarkPageWrapper } from '@/components/DarkUI';
import AuthInput from '@/components/AuthInput';
import { resetPassword } from '@/lib/auth';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{[k: string]: string}>({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) { setErrors({ email: 'Please enter a valid email' }); return; }
    setErrors({});
    setLoading(true);
    try {
      const result = await resetPassword(email);
      if (result.error) setErrors({ submit: result.error.message || 'Failed to send reset email.' });
      else setSuccess(true);
    } catch (err: any) { setErrors({ submit: err.message || 'Failed to send reset email.' }); }
    finally { setLoading(false); }
  };

  return (
    <DarkPageWrapper>
      <PremiumNavbar />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)' }} />
      </div>

      <main className="relative z-10 min-h-screen flex items-center justify-center pt-20 pb-16 px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #A855F7, #3B82F6)' }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white">Forgot Password?</h1>
            <p className="text-white/50 mt-2">Enter your email to receive reset instructions</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
            {success ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-500/15 flex items-center justify-center">
                  <svg className="w-7 h-7 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Check your inbox!</h3>
                <p className="text-white/50 text-sm mb-5">Reset instructions sent to <span className="text-purple-300">{email}</span></p>
                <button onClick={() => router.push('/login')}
                  className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                  ← Back to Sign In
                </button>
              </div>
            ) : (
              <>
                {errors.submit && (
                  <div className="mb-5 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <p className="text-sm text-red-300">{errors.submit}</p>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <AuthInput id="email" type="email" label="Email Address" placeholder="you@example.com"
                    value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} autoComplete="email" />
                  <button type="submit" disabled={loading}
                    className="w-full relative py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-60">
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                    <span className="relative flex items-center justify-center gap-2">
                      {loading && <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />}
                      {loading ? 'Sending…' : 'Send Reset Link'}
                    </span>
                  </button>
                </form>
                <div className="mt-5 text-center">
                  <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Sign In
                  </Link>
                </div>
              </>
            )}
          </div>

          <div className="mt-5 text-center">
            <p className="text-white/30 text-sm">
              Need help?{' '}
              <Link href="/support" className="text-purple-400 hover:text-purple-300">Contact support</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </DarkPageWrapper>
  );
}
