"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer } from '@/components';
import { DarkPageWrapper } from '@/components/DarkUI';
import AuthInput from '@/components/AuthInput';
import { resetPassword } from '@/lib/auth';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{[k: string]: string}>({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) { 
      setErrors({ email: 'Please enter a valid email' }); 
      return; 
    }
    setErrors({});
    setLoading(true);
    
    try {
      // Fire the request but intentionally ignore the error result 
      // to prevent email enumeration (whether it exists, is Google auth, etc.)
      await resetPassword(email);
      
      // Artificial delay to prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSuccess(true);
      toast.success("Reset logic processed successfully!");
    } catch (err: any) {
      console.error("Password reset error:", err);
      // Even on hard network error, we pretend it succeeded unless we absolutely must show a generic failure
      setSuccess(true);
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <DarkPageWrapper>
      <PremiumNavbar />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)' }} />
      </div>

      <main className="relative z-10 min-h-screen flex items-center justify-center pt-20 pb-16 px-6">
        <button
          onClick={() => router.back()}
          className="absolute top-28 left-6 md:left-12 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all backdrop-blur-md hover:scale-105 active:scale-95 disabled:opacity-50"
          disabled={loading}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>

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

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
            {success ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-green-500/15 flex items-center justify-center border border-green-500/30">
                  <svg className="w-7 h-7 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Request Received</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  If an account exists with <span className="text-purple-300 font-semibold">{email}</span>, a reset link has been sent. Please check your inbox and spam folder.
                </p>
                <button onClick={() => router.push('/login')}
                  className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors">
                  Return to Sign In
                </button>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <AuthInput id="email" type="email" label="Email Address" placeholder="you@example.com"
                    value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} autoComplete="email" disabled={loading} />
                  
                  <button type="submit" disabled={loading}
                    className="w-full relative py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-60 disabled:cursor-not-allowed group">
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center justify-center gap-2">
                      {loading && (
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      )}
                      {loading ? 'Processing…' : 'Send Reset Link'}
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

          <div className="mt-6 text-center">
            <p className="text-white/40 text-sm">
              Need help resetting?{' '}
              <Link href="/support" className="text-purple-400 hover:text-purple-300 font-medium">Contact support</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </DarkPageWrapper>
  );
}

