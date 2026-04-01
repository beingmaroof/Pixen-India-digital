"use client";

import React, { useState, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer } from '@/components';
import { DarkPageWrapper } from '@/components/DarkUI';
import AuthInput from '@/components/AuthInput';
import SocialLogin from '@/components/SocialLogin';
import { signIn, signInWithGoogle, signInWithFacebook } from '@/lib/auth';
import toast from 'react-hot-toast';
import { trackEvent } from '@/lib/analytics';

// ─── Check email existence + provider via secure server-side API ──────────────
async function checkEmailProvider(email: string): Promise<{ exists: boolean; provider: 'google' | 'email' | 'other' | null }> {
  try {
    const res = await fetch('/api/check-email-provider', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.toLowerCase().trim() }),
    });
    if (!res.ok) return { exists: false, provider: null };
    return await res.json();
  } catch {
    return { exists: false, provider: null };
  }
}

// ─── Inner login form (needs useSearchParams — must be in a Suspense boundary) ─
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';
  const prefillEmail = searchParams.get('email') || '';

  const [loading, setLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);
  const [formData, setFormData] = useState({ email: prefillEmail, password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [rememberMe, setRememberMe] = useState(false);
  // 'general' | 'wrong_password' | 'no_account' | 'google_account'
  const [errorType, setErrorType] = useState<string>('general');

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setLoading(false);
        setIsSocialLoading(false);
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrors({});
    setErrorType('general');

    try {
      // Step 1: Attempt the actual sign-in
      const result = await signIn(formData.email, formData.password);

      if (result.error) {
        const msg = result.error.message || '';
        const isInvalidCredentials =
          msg.toLowerCase().includes('invalid login credentials') ||
          msg.toLowerCase().includes('invalid credentials');

        if (isInvalidCredentials) {
          // Step 2: Use server API to detect if email exists + which provider
          const { exists, provider } = await checkEmailProvider(formData.email);

          if (!exists) {
            // Email is completely unknown to our auth system
            setErrors({ submit: `No account found for "${formData.email}". Would you like to create one?` });
            setErrorType('no_account');
          } else if (provider === 'google') {
            setErrors({ submit: 'This account was created using Google Sign-In. Please use the "Continue with Google" button below.' });
            setErrorType('google_account');
            toast.error('Please use Google Sign-In');
          } else {
            setErrors({ submit: 'Incorrect password. Please try again or reset your password.' });
            setErrorType('wrong_password');
            toast.error('Incorrect password');
          }
          setLoading(false);
          return;
        } else if (msg.toLowerCase().includes('email not confirmed')) {
          setErrors({ submit: 'Please verify your email address before logging in. Check your inbox for a confirmation email.' });
          setErrorType('general');
          toast.error('Email not confirmed');
        } else if (msg.toLowerCase().includes('too many requests') || msg.toLowerCase().includes('rate limit')) {
          setErrors({ submit: 'Too many login attempts. Please wait a moment and try again.' });
          setErrorType('general');
          toast.error('Too many attempts. Please try later.');
        } else {
          setErrors({ submit: msg || 'Sign in failed. Please check your credentials.' });
          setErrorType('general');
          toast.error(msg || 'Sign in failed');
        }
        setLoading(false);
      } else {
        // Success
        trackEvent('login_success', { method: 'email' });
        toast.success('Welcome back to Pixen Digital!');
        router.push(redirectTo);
      }
    } catch (error: any) {
      setErrors({ submit: error.message || 'Something went wrong. Please try again.' });
      setErrorType('general');
      toast.error(error.message || 'An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSocialLoading(true);
    try {
      const result = await signInWithGoogle(redirectTo);
      if (result.error) {
        setErrors({ submit: result.error.message || 'Failed to sign in with Google' });
        toast.error(result.error.message || 'Failed to sign in with Google');
        setIsSocialLoading(false);
      } else {
        trackEvent('login_success', { method: 'google' });
      }
    } catch (error: any) {
      setErrors({ submit: error.message || 'Failed to sign in with Google' });
      toast.error(error.message || 'Failed to sign in with Google');
      setIsSocialLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setIsSocialLoading(true);
    try {
      const result = await signInWithFacebook(redirectTo);
      if (result.error) {
        setErrors({ submit: result.error.message || 'Failed to sign in with Facebook' });
        toast.error(result.error.message || 'Failed to sign in with Facebook');
        setIsSocialLoading(false);
      } else {
        trackEvent('login_success', { method: 'facebook' });
      }
    } catch (error: any) {
      setErrors({ submit: error.message || 'Failed to sign in with Facebook' });
      toast.error(error.message || 'Failed to sign in with Facebook');
      setIsSocialLoading(false);
    }
  };

  // Error banner colour + icon based on error type
  const errorStyle = errorType === 'no_account'
    ? { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-300', icon: 'text-amber-400' }
    : errorType === 'google_account'
    ? { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-300', icon: 'text-blue-400' }
    : { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-300', icon: 'text-red-400' };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #A855F7, #3B82F6)' }}>
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
        <p className="text-white/50 mt-2">Sign in to your Pixen Digital account</p>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

        {/* Error banner */}
        {errors.submit && (
          <div className={`mb-6 p-4 rounded-xl border flex flex-col gap-3 ${errorStyle.bg} ${errorStyle.border}`}>
            <div className="flex items-start gap-3">
              <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${errorStyle.icon}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className={`text-sm ${errorStyle.text}`}>{errors.submit}</p>
            </div>

            {/* Context-aware action buttons */}
            {errorType === 'no_account' && (
              <Link
                href={`/signup?email=${encodeURIComponent(formData.email)}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-200 text-sm font-semibold hover:bg-amber-500/30 transition-colors self-start"
              >
                Create Account →
              </Link>
            )}

            {errorType === 'wrong_password' && (
              <Link
                href={`/forgot-password?email=${encodeURIComponent(formData.email)}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Reset your password →
              </Link>
            )}

            {errorType === 'google_account' && (
              <p className="text-xs text-blue-400/70">
                Tip: You can always use &quot;Continue with Google&quot; below — no password needed.
              </p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthInput
            id="email"
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            autoComplete="email"
          />
          <AuthInput
            id="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
            showPasswordToggle
            autoComplete="current-password"
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500/30"
              />
              <span className="text-sm text-white/50">Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading || isSocialLoading}
            className="w-full relative py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-60"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
            <span className="relative flex items-center justify-center gap-2">
              {loading ? <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : null}
              {loading ? 'Signing In…' : 'Sign In'}
            </span>
          </button>
        </form>

        <div className="mt-6">
          <SocialLogin
            onGoogleLogin={handleGoogleLogin}
            onFacebookLogin={handleFacebookLogin}
            loading={loading || isSocialLoading}
          />
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/40 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold text-purple-400 hover:text-purple-300 transition-colors">Sign up</Link>
          </p>
        </div>
      </div>

      {/* Trust badges */}
      <div className="mt-6 flex justify-center gap-8 text-center">
        {[
          { icon: 'M17 11V7a5 5 0 00-10 0v4M9 11h6a2 2 0 012 2v7a2 2 0 01-2 2H9a2 2 0 01-2-2v-7a2 2 0 012-2z', label: 'Secure' },
          { icon: 'M13 10V3L4 14h7v7l9-11h-7z', label: 'Fast Access' },
          { icon: 'M5 13l4 4L19 7', label: 'Verified' },
        ].map((b, i) => (
          <div key={i} className="flex flex-col items-center gap-1 text-white/30">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={b.icon} />
            </svg>
            <span className="text-xs">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page wrapper with Suspense (required for useSearchParams) ─────────────────
export default function LoginPage() {
  const router = useRouter();

  return (
    <DarkPageWrapper>
      <PremiumNavbar />

      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(168,85,247,0.10) 40%, transparent 70%)',
            animation: 'breathe 6s ease-in-out infinite',
          }} />
        <div className="absolute top-[30%] right-[20%] w-[200px] h-[200px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)',
            animation: 'breathe 8s ease-in-out infinite reverse',
            animationDelay: '-3s',
          }} />
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          50% { transform: translate(-50%, -50%) scale(1.18); opacity: 1; }
        }
      `}</style>

      <main className="relative z-10 min-h-screen flex items-center justify-center pt-20 pb-16 px-6">
        <button
          onClick={() => router.back()}
          className="absolute top-28 left-6 md:left-12 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all backdrop-blur-md hover:scale-105 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>

        <Suspense fallback={
          <div className="w-16 h-16 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
        }>
          <LoginForm />
        </Suspense>
      </main>
      <Footer />
    </DarkPageWrapper>
  );
}
