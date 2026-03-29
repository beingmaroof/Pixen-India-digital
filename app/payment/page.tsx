"use client";

import React, { useState, useEffect } from 'react';
import { Footer } from '@/components';
import PremiumNavbar from '@/components/PremiumNavbar';
import { DarkPageWrapper, FadeIn } from '@/components/DarkUI';
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
      <DarkPageWrapper>
        <PremiumNavbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
        <Footer />
      </DarkPageWrapper>
    );
  }

  const selectedPlan = PLAN_DETAILS[planId];
  const displayName = userData?.display_name || user?.email?.split('@')[0] || 'User';
  const userEmail = userData?.email || user?.email || '';

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error('Failed to load payment gateway. Please try again.');
        setIsProcessing(false);
        return;
      }

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
        theme: { color: '#A855F7' }, // Purple-500 to match dark theme
        handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
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

          if (user) {
            await updateUserData(user.id, {
              active_plan: selectedPlan.name,
              plan_status: 'active',
            });
            await savePayment(user.id, selectedPlan.name, selectedPlan.amount, 'completed');
            if (refreshUserData) await refreshUserData();
          }

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
    <DarkPageWrapper>
      <PremiumNavbar />
      <main className="min-h-screen pt-32 pb-16 relative z-10">
        <div className="container-custom max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-white/40 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <span>/</span>
            <span className="text-white">Checkout</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">

            {/* Left: Order Summary */}
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
              <FadeIn delay={0.1}>
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 md:p-10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
                  
                  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-6">
                    Selected Plan
                  </span>
                  <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">{selectedPlan.name}</h2>
                  <p className="text-white/50 text-sm mb-8 leading-relaxed">{selectedPlan.desc}</p>

                  <div className="flex items-end gap-2 mb-8">
                    <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">{selectedPlan.price}</span>
                    <span className="text-white/40 font-bold mb-1 tracking-wider uppercase">/mo</span>
                  </div>

                  <div className="space-y-4 pt-8 border-t border-white/10 relative z-10">
                    <h3 className="font-bold text-white text-sm uppercase tracking-wider">What's included:</h3>
                    <ul className="space-y-4">
                      {selectedPlan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/70 font-medium tracking-wide">
                          <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>

              {/* Trust Badges */}
              <FadeIn delay={0.2}>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
                  <div className="flex flex-wrap gap-3 justify-center mb-4">
                    {['🔒 SSL Secured', '256-bit Encrypted', '30-Day Guarantee'].map(badge => (
                      <span key={badge} className="text-xs font-bold uppercase tracking-wider text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full">{badge}</span>
                    ))}
                  </div>
                  <p className="text-xs text-white/40 text-center leading-relaxed max-w-xs mx-auto">
                    Payments processed securely via Razorpay. Your data is encrypted and never stored on our servers.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-white/40 hover:text-white transition-colors group">
                  <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Change Plan
                </Link>
              </FadeIn>
            </div>

            {/* Right: Payment Form */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <FadeIn>
                <div className="rounded-3xl border border-white/10 bg-[#050815]/80 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
                  {/* Top accent bar */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"></div>
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

                  <div className="p-8 md:p-12 relative z-10">
                    <div className="mb-10 block">
                      <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Secure Checkout</h2>
                      <p className="text-white/40 text-sm font-medium">You're one step away from accelerating your growth</p>
                    </div>

                    {/* User info summary */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-8 flex items-center gap-5">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/20 text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-grow">
                        <p className="font-bold text-white truncate text-lg">{displayName}</p>
                        <p className="text-sm font-medium text-white/50 truncate tracking-wide">{userEmail}</p>
                      </div>
                      <span className="hidden sm:inline-flex bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0 uppercase tracking-wider items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                        Verified
                      </span>
                    </div>

                    {/* Order summary line */}
                    <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-6 mb-10 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-white text-lg">{selectedPlan.name}</p>
                        <p className="text-xs font-medium text-purple-300/60 mt-1 uppercase tracking-wider">Monthly subscription · Cancel anytime</p>
                      </div>
                      <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 tracking-tight">{selectedPlan.price}</p>
                    </div>

                    <form onSubmit={handlePayment}>
                      {/* What you get after payment */}
                      <div className="space-y-4 mb-10">
                        {[
                          { icon: '⚡', text: 'Instant plan activation upon payment' },
                          { icon: '📩', text: 'Confirmation email sent immediately' },
                          { icon: '📞', text: 'Onboarding call scheduled within 24 hours' },
                        ].map((item) => (
                          <div key={item.text} className="flex items-center gap-4 text-sm font-medium text-white/70">
                            <span className="text-lg bg-white/5 w-8 h-8 rounded-full flex items-center justify-center border border-white/10">{item.icon}</span>
                            {item.text}
                          </div>
                        ))}
                      </div>

                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg py-4 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
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

                      <div className="mt-8 text-center text-xs text-white/40 space-y-3 leading-relaxed max-w-sm mx-auto">
                        <p>
                          By clicking "Pay via Razorpay", you explicitly agree to our{' '}
                          <Link href="/terms" className="text-white/60 font-medium hover:text-white transition-colors underline decoration-white/30 underline-offset-2">Terms & Conditions</Link>,{' '}
                          <Link href="/privacy-policy" className="text-white/60 font-medium hover:text-white transition-colors underline decoration-white/30 underline-offset-2">Privacy Policy</Link>, and our{' '}
                          <Link href="/refund-policy" className="text-white/60 font-medium hover:text-white transition-colors underline decoration-white/30 underline-offset-2">Strictly No Refund Policy</Link>.
                        </p>
                        <p className="text-white/30">
                          All services are delivered digitally. <Link href="/shipping-policy" className="hover:text-white transition-colors underline decoration-white/20 underline-offset-2">No physical products will be shipped.</Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </DarkPageWrapper>
  );
}
