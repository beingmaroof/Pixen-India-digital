"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer } from '@/components';
import { DarkPageWrapper } from '@/components/DarkUI';
import AuthInput from '@/components/AuthInput';
import SocialLogin from '@/components/SocialLogin';
import { signUp, signInWithGoogle, signInWithFacebook } from '@/lib/auth';
import toast from 'react-hot-toast';
import { trackEvent } from '@/lib/analytics';

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const prefillEmail = searchParams.get('email') || '';

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: prefillEmail, password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calcStrength = (pw: string) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[a-z]/.test(pw)) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^a-zA-Z0-9]/.test(pw)) s++;
    return s;
  };

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Please enter a valid email';
    if (!formData.password || formData.password.length < 8) e.password = 'Password must be at least 8 characters';
    else if (passwordStrength < 3) e.password = 'Password is too weak — add uppercase, numbers, or symbols';
    if (formData.password !== formData.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const result = await signUp(formData.email, formData.password, formData.name);
      if (result.error) {
        setErrors({ submit: result.error.message || 'Failed to create account.' });
        toast.error(result.error.message || 'Failed to create account.');
      } else {
        trackEvent('signup_completed', { method: 'email' });
        toast.success("Welcome to Pixen Digital!");
        router.push(redirectTo === '/dashboard' ? '/dashboard?success=true' : redirectTo);
      }
    } catch (err: any) { 
      setErrors({ submit: err.message || 'Failed to create account.' }); 
      toast.error(err.message || 'An unexpected error occurred.');
    }
    finally { setLoading(false); }
  };

  const strengthColor = passwordStrength <= 2 ? '#EF4444' : passwordStrength <= 3 ? '#F59E0B' : '#22C55E';
  const strengthLabel = passwordStrength <= 2 ? 'Weak' : passwordStrength <= 3 ? 'Medium' : 'Strong';

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #A855F7, #3B82F6)' }}>
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white">Create Account</h1>
        <p className="text-white/50 mt-2">Join Pixen Digital and start growing</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="text-sm text-red-300">{errors.submit}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput id="name" type="text" label="Full Name" placeholder="John Doe"
            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name} autoComplete="name" />
          <AuthInput id="email" type="email" label="Email Address" placeholder="you@example.com"
            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email} autoComplete="email" />

          <div>
            <AuthInput id="password" type="password" label="Password" placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => { setFormData({ ...formData, password: e.target.value }); setPasswordStrength(calcStrength(e.target.value)); }}
              error={errors.password} showPasswordToggle autoComplete="new-password" />
            {formData.password && (
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white/40">Strength:</span>
                  <span style={{ color: strengthColor }} className="font-semibold">{strengthLabel}</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(l => (
                    <div key={l} className="h-1 flex-1 rounded-full transition-all duration-300"
                      style={{ background: l <= passwordStrength ? strengthColor : 'rgba(255,255,255,0.1)' }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <AuthInput id="confirmPassword" type="password" label="Confirm Password" placeholder="Confirm your password"
            value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            error={errors.confirmPassword} showPasswordToggle autoComplete="new-password" />

          <p className="text-xs text-white/30 leading-relaxed">
            By creating an account, you agree to our{' '}
            <Link href="/terms-of-service" className="text-purple-400 hover:text-purple-300">Terms of Service</Link> and{' '}
            <Link href="/privacy-policy" className="text-purple-400 hover:text-purple-300">Privacy Policy</Link>
          </p>

          <button type="submit" disabled={loading}
            className="w-full relative py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-60">
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
            <span className="relative flex items-center justify-center gap-2">
              {loading && <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />}
              {loading ? 'Creating Account…' : 'Create Account'}
            </span>
          </button>
        </form>

        <div className="mt-6">
          <SocialLogin
            onGoogleLogin={async () => { setLoading(true); try { await signInWithGoogle(redirectTo); } catch (e: any) { setErrors({ submit: e.message }); toast.error(e.message); } finally { setLoading(false); } }}
            onFacebookLogin={async () => { setLoading(true); try { await signInWithFacebook(redirectTo); } catch (e: any) { setErrors({ submit: e.message }); toast.error(e.message); } finally { setLoading(false); } }}
            loading={loading}
          />
        </div>

        <p className="mt-6 text-center text-white/40 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-purple-400 hover:text-purple-300 transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  return (
    <DarkPageWrapper>
      <PremiumNavbar />
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-8" style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }} />
      </div>

      <main className="relative z-10 min-h-screen flex items-center justify-center pt-24 pb-16 px-6">
        <button
          onClick={() => router.back()}
          className="absolute top-28 left-6 md:left-12 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all backdrop-blur-md hover:scale-105 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>

        <Suspense fallback={<div className="w-16 h-16 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />}>
          <SignupForm />
        </Suspense>
      </main>
      <Footer />
    </DarkPageWrapper>
  );
}
