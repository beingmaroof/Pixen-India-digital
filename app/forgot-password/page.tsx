

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar, Footer } from '@/components';
import AuthInput from '@/components/AuthInput';
import AuthButton from '@/components/AuthButton';
import { resetPassword } from '@/lib/auth';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await resetPassword(email);
      if (result.error) {
        setErrors({
          submit: result.error.message || 'Failed to send reset email. Please try again.'
        });
      } else {
        setSuccess(true);
      }
    } catch (error: any) {
      setErrors({
        submit: error.message || 'Failed to send reset email. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
        
        <div className="pt-20 md:pt-32 pb-12">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Reset Your Password
              </h1>
              <p className="text-lg text-gray-600">
                No worries - we&apos;ll send you reset instructions
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Forgot Password?</h2>
                  <p className="text-gray-600 mt-2">Enter your email to reset your password</p>
                </div>

                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 11-16 0 8 8 0 0116 0zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-green-800">Check your email!</p>
                        <p className="text-sm text-green-700 mt-1">
                          We&apos;ve sent password reset instructions to <strong>{email}</strong>
                        </p>
                        <button
                          onClick={() => router.push('/login')}
                          className="mt-3 text-sm font-semibold text-green-700 hover:text-green-800 underline"
                        >
                          Return to Sign In
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {!success && errors.submit && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm text-red-800">{errors.submit}</p>
                    </div>
                  </div>
                )}

                {!success && (
                  <>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <AuthInput
                        id="email"
                        type="email"
                        label="Email Address"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                        autoComplete="email"
                      />

                      <AuthButton type="submit" loading={loading}>
                        Send Reset Link
                      </AuthButton>
                    </form>

                    <div className="mt-6 text-center">
                      <Link 
                        href="/login"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Sign In
                      </Link>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-8 text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Need help?{' '}
                  <Link href="/support" className="font-semibold text-primary-600 hover:text-primary-700 underline">
                    Contact Support
                  </Link>
                </p>
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 11-16 0 8 8 0 0116 0zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Secure
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Encrypted
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
