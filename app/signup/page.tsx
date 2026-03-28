

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar, Footer } from '@/components';
import AuthInput from '@/components/AuthInput';
import AuthButton from '@/components/AuthButton';
import SocialLogin from '@/components/SocialLogin';
import { signUp, signInWithGoogle, signInWithFacebook } from '@/lib/auth';

export default function SignupPage() {
  const router = useRouter();

  // Read redirect destination from URL safely
  let redirectTo = '/dashboard';
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    redirectTo = params.get('redirect') || '/dashboard';
  }

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength < 3) {
      newErrors.password = 'Password is too weak';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await signUp(formData.email, formData.password, formData.name);
      if (result.error) {
        setErrors({
          submit: result.error.message || 'Failed to create account. Please try again.'
        });
      } else {
        router.push(redirectTo); 
      }
    } catch (error: any) {
      setErrors({
        submit: error.message || 'Failed to create account. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await signInWithGoogle(redirectTo);
    } catch (error: any) {
      setErrors({
        submit: error.message || 'Failed to sign up with Google'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignup = async () => {
    setLoading(true);
    try {
      await signInWithFacebook(redirectTo);
    } catch (error: any) {
      setErrors({
        submit: error.message || 'Failed to sign up with Facebook'
      });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-accent-50">
        
        <div className="pt-20 md:pt-32 pb-12">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Create Your Account
              </h1>
              <p className="text-lg text-gray-600">
                Join Pixen India Digital and start growing your business
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
                  <p className="text-gray-600 mt-2">Create your account in minutes</p>
                </div>

                {errors.submit && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm text-red-800">{errors.submit}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <AuthInput
                    id="name"
                    type="text"
                    label="Full Name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={errors.name}
                    autoComplete="name"
                  />

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

                  <div className="space-y-2">
                    <AuthInput
                      id="password"
                      type="password"
                      label="Password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData({ ...formData, password: value });
                        setPasswordStrength(calculatePasswordStrength(value));
                      }}
                      error={errors.password}
                      showPasswordToggle
                      autoComplete="new-password"
                    />

                    {formData.password && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Password strength:</span>
                          <span className={`font-semibold ${
                            passwordStrength <= 2 ? 'text-red-600' : 
                            passwordStrength <= 3 ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {getPasswordStrengthLabel()}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                level <= passwordStrength 
                                  ? getPasswordStrengthColor() 
                                  : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <AuthInput
                    id="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    error={errors.confirmPassword}
                    showPasswordToggle
                    autoComplete="new-password"
                  />

                  <div className="text-xs text-gray-600 leading-relaxed">
                    By creating an account, you agree to our{' '}
                    <Link href="/terms-of-service" className="text-primary-600 hover:text-primary-700 font-semibold underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy-policy" className="text-primary-600 hover:text-primary-700 font-semibold underline">
                      Privacy Policy
                    </Link>
                  </div>

                  <AuthButton type="submit" loading={loading}>
                    Create Account
                  </AuthButton>
                </form>

                <div className="mt-6">
                  <SocialLogin
                    onGoogleLogin={handleGoogleSignup}
                    onFacebookLogin={handleFacebookSignup}
                    loading={loading}
                  />
                </div>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link 
                      href="/login"
                      className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-accent-600">✓</div>
                  <div className="text-xs text-gray-600 mt-1">Free Setup</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent-600">📊</div>
                  <div className="text-xs text-gray-600 mt-1">Analytics</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent-600">💬</div>
                  <div className="text-xs text-gray-600 mt-1">24/7 Support</div>
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
