"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer } from '@/components';
import { DarkPageWrapper } from '@/components/DarkUI';
import AuthInput from '@/components/AuthInput';
import SocialLogin from '@/components/SocialLogin';
import { signIn, signInWithGoogle, signInWithFacebook } from '@/lib/auth';

// Map Supabase error codes/messages to user-friendly text
function friendlyAuthError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes('invalid login credentials') || m.includes('invalid credentials')) {
    return 'Invalid email or password. Please check and try again.';
  }
  if (m.includes('email not confirmed')) {
    return 'Please verify your email address before logging in. Check your inbox.';
  }
  if (m.includes('too many requests') || m.includes('rate limit')) {
    return 'Too many attempts. Please wait a moment and try again.';
  }
  if (m.includes('user not found') || m.includes('no user')) {
    return 'No account found with this email. Please sign up first.';
  }
  return msg || 'Failed to sign in. Please check your credentials.';
}

export default function LoginPage() {
  const router = useRouter();

  let redirectTo = '/dashboard';
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    redirectTo = params.get('redirect') || '/dashboard';
  }

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [rememberMe, setRememberMe] = useState(false);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const result = await signIn(formData.email, formData.password);
      if (result.error) {
        setErrors({ submit: friendlyAuthError(result.error.message || '') });
        setLoading(false);
      } else {
        router.push(redirectTo);
      }
    } catch (error: any) {
      setErrors({ submit: friendlyAuthError(error.message || '') });
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle(redirectTo);
      if (result.error) { setErrors({ submit: result.error.message || 'Failed to sign in with Google' }); setLoading(false); }
    } catch (error: any) { setErrors({ submit: error.message || 'Failed to sign in with Google' }); setLoading(false); }
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithFacebook(redirectTo);
      if (result.error) { setErrors({ submit: result.error.message || 'Failed to sign in with Facebook' }); setLoading(false); }
    } catch (error: any) { setErrors({ submit: error.message || 'Failed to sign in with Facebook' }); setLoading(false); }
  };

  return (
    <DarkPageWrapper>
      <PremiumNavbar />

      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Static ambient orb — purple */}
        <div
          className="absolute -top-40 left-1/3 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)' }}
        />
        {/* Static ambient orb — blue */}
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }}
        />
        {/* Breathing animated orb — center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(168,85,247,0.10) 40%, transparent 70%)',
            animation: 'breathe 6s ease-in-out infinite',
          }}
        />
        {/* Small pulsing orb */}
        <div
          className="absolute top-[30%] right-[20%] w-[200px] h-[200px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)',
            animation: 'breathe 8s ease-in-out infinite reverse',
            animationDelay: '-3s',
          }}
        />
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          50% { transform: translate(-50%, -50%) scale(1.18); opacity: 1; }
        }
      `}</style>

      <main className="relative z-10 min-h-screen flex items-center justify-center pt-20 pb-16 px-6">
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
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-300">{errors.submit}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <AuthInput id="email" type="email" label="Email Address" placeholder="you@example.com"
                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email} autoComplete="email" />
              <AuthInput id="password" type="password" label="Password" placeholder="Enter your password"
                value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password} showPasswordToggle autoComplete="current-password" />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500/30" />
                  <span className="text-sm text-white/50">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" disabled={loading}
                className="w-full relative py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-60">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : null}
                  {loading ? 'Signing In…' : 'Sign In'}
                </span>
              </button>
            </form>

            <div className="mt-6">
              <SocialLogin onGoogleLogin={handleGoogleLogin} onFacebookLogin={handleFacebookLogin} loading={loading} />
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
            {[{ icon: 'M17 11V7a5 5 0 00-10 0v4M9 11h6a2 2 0 012 2v7a2 2 0 01-2 2H9a2 2 0 01-2-2v-7a2 2 0 012-2z', label: 'Secure' }, { icon: 'M13 10V3L4 14h7v7l9-11h-7z', label: 'Fast Access' }, { icon: 'M5 13l4 4L19 7', label: 'Verified' }].map((b, i) => (
              <div key={i} className="flex flex-col items-center gap-1 text-white/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={b.icon} />
                </svg>
                <span className="text-xs">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </DarkPageWrapper>
  );
}
