"use client";

import React from 'react';
import { Navbar, Footer, Section, Container, Badge, Button } from '@/components';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function PricingPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handlePurchase = (planName: string) => {
    const targetUrl = `/payment?plan=${encodeURIComponent(planName.toLowerCase())}`;
    if (isAuthenticated) {
      router.push(targetUrl);
    } else {
      router.push(`/login?redirect=${encodeURIComponent(targetUrl)}`);
    }
  };

  const plans = [
    {
      name: 'Starter',
      price: '₹49,999',
      period: '/month',
      description: 'Perfect for small businesses starting their digital journey',
      features: [
        'Social Media Management (2 platforms)',
        '8 Posts per month',
        'Basic Google Ads Campaign',
        'Monthly Performance Report',
        'Email Support',
        'Dedicated Account Manager',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Growth',
      price: '₹99,999',
      period: '/month',
      description: 'Ideal for growing businesses ready to scale rapidly',
      features: [
        'Everything in Starter +',
        'Social Media Management (4 platforms)',
        '16 Posts per month + Reels',
        'Google + Meta Ads Management',
        'SEO Optimization',
        'Bi-weekly Strategy Calls',
        'Advanced Analytics Dashboard',
        'Priority Support',
      ],
      cta: 'Most Popular',
      popular: true,
    },
    {
      name: 'Premium',
      price: '₹1,99,999',
      period: '/month',
      description: 'Complete digital transformation for established brands',
      features: [
        'Everything in Growth +',
        'Unlimited Social Media Platforms',
        'Daily Content Creation',
        'Influencer Marketing Campaign',
        'Complete Website Optimization',
        'Weekly Strategy Sessions',
        'Custom CRM Integration',
        '24/7 Priority Support',
        'Quarterly Business Reviews',
      ],
      cta: 'Contact Us',
      popular: false,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-transparent">
        
        <Section padding="xl" bgColor="gray" container={false} className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100 animate-gradient z-0 opacity-70"></div>
          <div style={{ zIndex: -1 }} className="absolute inset-0 pointer-events-none">
            <img src="/backgrounds/wave.svg" alt="" aria-hidden="true" className="absolute left-0 top-0 w-full opacity-60" />
            <img src="/backgrounds/grid-pattern.svg" alt="" aria-hidden="true" className="absolute right-0 bottom-0 w-1/3 opacity-20" />
          </div>
          <Container size="xl" className="relative z-10">
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <div className="animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                <Badge variant="primary" size="md">Transparent Pricing</Badge>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight text-balance animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                Choose Your Growth{' '}
                <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                  Plan
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                Flexible, contract-free pricing packages designed specifically to scale with your business. 
                No hidden fees, just pure results.
              </p>
            </div>
          </Container>
        </Section>

        <Section padding="xl" bgColor="white" container={false} className="relative z-20 -mt-10 bg-transparent">
          <Container size="xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative rounded-[2rem] p-8 lg:p-10 transition-all duration-300 hover-lift shadow-glow-hover flex flex-col ${
                    plan.popular
                      ? 'bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-2xl ring-4 ring-primary-500/30 scale-105 z-10'
                      : 'bg-white text-gray-900 shadow-xl border border-gray-100 mt-4 lg:mt-0 lg:scale-95'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-100 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className={`text-center mb-8 border-b pb-8 ${plan.popular ? 'border-primary-400/30' : 'border-gray-200'}`}>
                    <h3 className="text-2xl font-bold mb-3">{plan.name}</h3>
                    <p className={`text-sm mb-6 min-h-[40px] ${plan.popular ? 'text-primary-100' : 'text-gray-500'}`}>
                      {plan.description}
                    </p>
                    <div className="mb-2">
                      <span className="text-4xl lg:text-5xl font-extrabold tracking-tight">{plan.price}</span>
                      <span className={`text-sm font-medium ml-2 ${plan.popular ? 'text-primary-200' : 'text-gray-500'}`}>
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            plan.popular ? 'text-primary-200' : 'text-primary-500'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className={`text-sm font-medium ${plan.popular ? 'text-white' : 'text-gray-700'}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 mt-auto">
                    <Button
                      variant={plan.popular ? 'secondary' : 'primary'}
                      fullWidth
                      size="lg"
                      onClick={() => handlePurchase(plan.name)}
                      className={plan.popular ? 'text-primary-700 hover:text-primary-800 shadow-xl' : 'shadow-md'}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Section padding="xl" bgColor="gray" container={false} className="border-t border-gray-100">
          <Container size="xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="secondary" className="mb-4">FAQ</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about the product and billing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                {
                  q: 'Can I customize my package?',
                  a: 'Absolutely! All our packages are fully customizable. We understand every business is unique and we tailor our services to meet your specific needs.',
                },
                {
                  q: 'Is there a long-term contract?',
                  a: 'We offer both monthly and annual contracts. Annual plans come with a 15% discount. We believe in delivering results that make you want to stay.',
                },
                {
                  q: 'What if I need to upgrade later?',
                  a: 'You can upgrade or downgrade your plan at any time. We make it easy to scale your marketing efforts dynamically as your business grows.',
                },
                {
                  q: 'Do you offer a money-back guarantee?',
                  a: 'Yes! We offer a strict 30-day satisfaction guarantee. If you\'re not completely happy with our services, we\'ll completely refund your first month.',
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-glow-hover transition-all duration-300">
                  <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl mb-3 text-gray-900">{faq.q}</h4>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Section padding="xl" bgColor="primary" container={false} className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
          <Container size="xl" className="relative z-10">
            <div className="bg-white rounded-3xl p-12 md:p-20 text-center max-w-5xl mx-auto shadow-2xl border border-white/20 hover-lift transition-all duration-300">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Ready to dominate your market?
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Join 50+ successful clients who&apos;ve turned their digital presence into a measurable revenue-generating machine.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => router.push('/contact')}
                  className="shadow-xl"
                  rightIcon={
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  }
                >
                  Schedule Free Consultation
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => router.push('/case-studies')}
                >
                  View Case Studies
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
