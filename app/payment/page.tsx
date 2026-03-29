"use client";

import React, { useState, useEffect } from 'react';
import { Navbar, Footer, Container, Badge } from '@/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { updateUserData, savePayment } from '@/lib/auth';
import toast from 'react-hot-toast';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PLAN_DETAILS: Record<string, {
  name: string;
  price: string;
  amount: string;
  numericAmount: number;
  desc: string;
  features: string[];
}> = {
  starter: {
    name: 'Starter Plan',
    price: '₹49,999',
    amount: '49,999',
    numericAmount: 4999900,
    desc: 'Perfect for small businesses starting their digital journey',
    features: [
      'Social Media Management (2 platforms)',
      '8 Posts per month',
      'Basic Google Ads Campaign',
      'Monthly Performance Report',
      'Email Support',
      'Dedicated Account Manager',
    ],
  },
  growth: {
    name: 'Growth Plan',
    price: '₹99,999',
    amount: '99,999',
    numericAmount: 9999900,
    desc: 'Ideal for growing businesses ready to scale rapidly',
    features: [
      'Everything in Starter +',
      'Social Media Management (4 platforms)',
      '16 Posts/month + Reels',
      'Google + Meta Ads Management',
      'SEO Optimization',
      'Bi-weekly Strategy Calls',
      'Advanced Analytics Dashboard',
      'Priority Support',
    ],
  },
  premium: {
    name: 'Premium Plan',
    price: '₹1,99,999',
    amount: '1,99,999',
    numericAmount: 19999900,
    desc: 'Complete digital transformation for established brands',
    features: [
      'Everything in Growth +',
      'Unlimited Social Media Platforms',
      'Daily Content Creation',
      'Influencer Marketing Campaign',
      'Complete Website Optimization',
      'Weekly Strategy Sessions',
      'Custom CRM Integration',
      '24/7 Priority Support',
    ],
  },
};

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function PaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { user, userData, isAuthenticated, loading, refreshUserData } = useAuth();
  const [planId, setPlanId] = useState('growth');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const plan = searchParams.get('plan')?.toLowerCase() || 'growth';
    if (PLAN_DETAILS[plan]) setPlanId(plan);
    if (!loading && !isAuthenticated) {
      router.push(`/login?redirect=/payment?plan=${plan}`);
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const selectedPlan = PLAN_DETAILS[planId];
  const displayName = userData?.display_name || user?.email?.split('@')[0] || 'User';
  const userEmail = userData?.email || user?.email || '';

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // 1. Load Razorpay script
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error('Failed to load payment gateway. Please try again.');
        setIsProcessing(false);
        return;
      }

      // 2. Create Razorpay order via backend
      const orderRes = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId, userId: user?.id, email: userEmail }),
      });

      if (!orderRes.ok) {
        const err = await orderRes.json();
        toast.error(err.error || 'Could not create payment order.');
        setIsProcessing(false);
        return;
      }

      const { orderId, amount, currency, keyId } = await orderRes.json();

      // 3. Open Razorpay checkout
      const rzpOptions = {
        key: keyId,
        amount,
        currency,
        name: 'Pixen India Digital',
        description: selectedPlan.name,
        order_id: orderId,
        prefill: {
          name: displayName,
          email: userEmail,
        },
        theme: { color: '#4F46E5' },
        handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          // 4. Verify payment signature
          const verifyRes = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });

          const { verified } = await verifyRes.json();
          if (!verified) {
            toast.error('Payment verification failed. Please contact support.');
            setIsProcessing(false);
            return;
          }

          // 5. Update user plan in DB
          if (user) {
            await updateUserData(user.id, {
              active_plan: selectedPlan.name,
              plan_status: 'active',
            });
            await savePayment(user.id, selectedPlan.name, selectedPlan.amount, 'completed');
            if (refreshUserData) await refreshUserData();
          }

          // 6. Send confirmation email
          await fetch('/api/send-confirmation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: userEmail,
              name: displayName,
              planName: selectedPlan.name,
              planPrice: `${selectedPlan.price}/month`,
              type: 'payment_confirmation',
            }),
          });

          toast.success(`🎉 ${selectedPlan.name} activated! Check your email for next steps.`);
          setIsProcessing(false);
          setTimeout(() => router.push('/dashboard'), 1500);
        },
        modal: {
          ondismiss: () => {
            toast('Payment cancelled.', { icon: 'ℹ️' });
            setIsProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(rzpOptions);
      rzp.open();
    } catch (err: any) {
      console.error('Payment error:', err);
      toast.error('Something went wrong. Please try again or contact support.');
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <Container size="lg">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/pricing" className="hover:text-primary-600 transition-colors">Pricing</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left: Order Summary */}
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
                <Badge variant="primary" className="mb-4">Selected Plan</Badge>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedPlan.name}</h2>
                <p className="text-gray-500 text-sm mb-6">{selectedPlan.desc}</p>

                <div className="flex items-end gap-2 mb-8">
                  <span className="text-4xl font-extrabold text-gray-900">{selectedPlan.price}</span>
                  <span className="text-gray-500 font-medium mb-1">/month</span>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900 text-sm">What&apos;s included:</h3>
                  <ul className="space-y-3">
                    {selectedPlan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="flex flex-wrap gap-2 justify-center mb-3">
                  {['🔒 SSL Secured', '256-bit Encrypted', '30-Day Guarantee'].map(badge => (
                    <span key={badge} className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">{badge}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Payments processed securely via Razorpay. Your data is never stored on our servers.
                </p>
              </div>

              <Link href="/pricing" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Change Plan
              </Link>
            </div>

            {/* Right: Payment Form */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                {/* Top accent bar */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary-600 to-accent-500"></div>

                <div className="p-8 md:p-10">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Secure Checkout</h2>
                    <p className="text-gray-500 text-sm">You&apos;re one step away from accelerating your growth</p>
                  </div>

                  {/* User info summary */}
                  <div className="bg-primary-50 rounded-2xl p-5 mb-8 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{displayName}</p>
                      <p className="text-sm text-gray-500 truncate">{userEmail}</p>
                    </div>
                    <span className="ml-auto bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0">Verified ✓</span>
                  </div>

                  {/* Order summary line */}
                  <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 mb-8 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{selectedPlan.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Monthly subscription · Cancel anytime</p>
                    </div>
                    <p className="text-xl font-extrabold text-gray-900">{selectedPlan.price}</p>
                  </div>

                  <form onSubmit={handlePayment}>
                    {/* What you get after payment */}
                    <div className="space-y-3 mb-8">
                      {[
                        { icon: '⚡', text: 'Instant plan activation upon payment' },
                        { icon: '📩', text: 'Confirmation email sent immediately' },
                        { icon: '📞', text: 'Onboarding call scheduled within 24 hours' },
                      ].map((item) => (
                        <div key={item.text} className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="text-base">{item.icon}</span>
                          {item.text}
                        </div>
                      ))}
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold text-lg py-4 px-6 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center gap-3 disabled:opacity-60 disabled:transform-none disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Opening Razorpay...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Pay {selectedPlan.price} via Razorpay
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-4">
                      By clicking, you agree to our{' '}
                      <Link href="/terms-of-service" className="underline hover:text-gray-600">Terms of Service</Link>
                      {' '}and{' '}
                      <Link href="/privacy-policy" className="underline hover:text-gray-600">Privacy Policy</Link>.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
