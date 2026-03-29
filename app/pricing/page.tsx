"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer, CalendlyEmbed } from '@/components';
import { DarkPageWrapper, DarkHero, DarkSection, DarkCard, DarkBadge, DarkGradientBtn, DarkCTABanner, FadeIn, DarkSectionHeader, DarkCheckItem } from '@/components/DarkUI';
import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    price: '₹49,999',
    period: '/month',
    description: 'Perfect for small businesses starting their digital journey',
    features: ['Social Media Management (2 platforms)', '8 Posts per month', 'Basic Google Ads Campaign', 'Monthly Performance Report', 'Email Support', 'Dedicated Account Manager'],
    popular: false,
  },
  {
    name: 'Growth',
    price: '₹99,999',
    period: '/month',
    description: 'Ideal for growing businesses ready to scale rapidly',
    features: ['Everything in Starter +', 'Social Media Management (4 platforms)', '16 Posts per month + Reels', 'Google + Meta Ads Management', 'SEO Optimization', 'Bi-weekly Strategy Calls', 'Advanced Analytics Dashboard', 'Priority Support'],
    popular: true,
  },
  {
    name: 'Premium',
    price: '₹1,99,999',
    period: '/month',
    description: 'Complete digital transformation for established brands',
    features: ['Everything in Growth +', 'Unlimited Social Media Platforms', 'Daily Content Creation', 'Influencer Marketing Campaign', 'Complete Website Optimization', 'Weekly Strategy Sessions', 'Custom CRM Integration', '24/7 Priority Support', 'Quarterly Business Reviews'],
    popular: false,
  },
];

const faqs = [
  { q: 'Can I customize my package?', a: 'Absolutely! All our packages are fully customizable. We understand every business is unique and tailor our services to meet your specific needs.' },
  { q: 'Is there a long-term contract?', a: 'We offer both monthly and annual contracts. Annual plans come with a 15% discount. We believe in delivering results that make you want to stay.' },
  { q: 'What if I need to upgrade later?', a: 'You can upgrade or downgrade your plan at any time. We make it easy to scale your marketing efforts dynamically as your business grows.' },
  { q: "Do you offer a money-back guarantee?", a: "Yes! We offer a strict 30-day satisfaction guarantee. If you're not completely happy with our services, we'll completely refund your first month." },
];

export default function PricingPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const handlePurchase = (planName: string) => {
    const targetUrl = `/payment?plan=${encodeURIComponent(planName.toLowerCase())}`;
    if (isAuthenticated) router.push(targetUrl);
    else router.push(`/login?redirect=${encodeURIComponent(targetUrl)}`);
  };

  return (
    <DarkPageWrapper>
      <PremiumNavbar />
      <DarkHero
        eyebrow="Transparent Pricing"
        title="Choose Your Growth"
        gradientTitle="Plan"
        subtitle="Flexible, contract-free pricing packages designed specifically to scale with your business. No hidden fees, just pure results."
      />

      {/* Plans */}
      <DarkSection>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className={`relative flex flex-col h-full rounded-2xl p-8 border transition-all duration-300 ${plan.popular
                ? 'border-purple-500/50 bg-gradient-to-b from-purple-950/80 to-blue-950/40 shadow-2xl shadow-purple-900/40 scale-105'
                : 'border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/30'}`}>

                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex justify-center">
                    <span className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-500 to-amber-400 text-black text-xs font-bold uppercase tracking-wide px-4 py-1.5 rounded-full shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-black/40 animate-pulse" />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Top glow for featured */}
                {plan.popular && <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-purple-500/0 via-purple-400 to-purple-500/0" />}

                {/* Header */}
                <div className={`text-center mb-8 pb-6 border-b ${plan.popular ? 'border-purple-500/30' : 'border-white/10'}`}>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className={`text-sm mb-5 ${plan.popular ? 'text-purple-200/70' : 'text-white/40'}`}>{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-4xl font-extrabold tracking-tight ${plan.popular ? 'bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent' : 'text-white'}`}>{plan.price}</span>
                    <span className="text-white/40 text-sm">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.popular ? 'bg-purple-500/30' : 'bg-white/10'}`}>
                        <svg className={`w-2.5 h-2.5 ${plan.popular ? 'text-purple-300' : 'text-white/50'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-white/50'}`}>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <DarkGradientBtn onClick={() => handlePurchase(plan.name)} className="w-full">
                  {plan.name === 'Premium' ? 'Contact Us' : `Get ${plan.name}`}
                </DarkGradientBtn>
              </div>
            </FadeIn>
          ))}
        </div>
      </DarkSection>

      {/* FAQ */}
      <DarkSection subtle>
        <DarkSectionHeader eyebrow="FAQ" title="Frequently Asked" gradientTitle="Questions" subtitle="Everything you need to know about pricing and billing." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-purple-500/30 transition-all duration-300">
                <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center mb-4">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-white mb-2">{faq.q}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </DarkSection>

      <DarkCTABanner
        title="Ready to dominate your market?"
        subtitle="Join 50+ successful clients who've turned their digital presence into a revenue-generating machine."
        ctaLabel="Schedule Free Consultation"
        onCtaClick={() => setIsCalendlyOpen(true)}
      />

      <Footer />
      <CalendlyEmbed isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </DarkPageWrapper>
  );
}
