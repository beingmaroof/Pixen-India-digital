"use client";

import React, { useState, useEffect, useRef } from 'react';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer } from '@/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';

const ScrollStorySection = dynamic(() => import('@/components/ScrollStorySection'), {
  loading: () => (
    <div className="h-screen flex flex-col items-center justify-center w-full" style={{ background: '#02030A' }}>
      <div className="w-12 h-12 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin mb-4" />
      <div className="text-purple-400/50 text-xs tracking-widest uppercase font-semibold">Loading Experience</div>
    </div>
  )
});

// GA helper
const track = (event: string, params?: Record<string, string>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event, params ?? {});
  }
};

// Animated counter
function AnimatedNumber({ target, prefix = '', suffix = '', duration = 2000 }: {
  target: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return <div ref={ref} className="font-extrabold">{prefix}{count}{suffix}</div>;
}

// Fade-in wrapper
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Glass card
function GlassCard({ children, className = '', hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 ${hover ? 'hover:border-purple-500/30 hover:bg-white/[0.08] transition-all duration-300 group' : ''} ${className}`}>
      {children}
    </div>
  );
}

// Gradient badge
function GlowBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold tracking-[0.15em] uppercase">
      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
      {children}
    </div>
  );
}

// FAQ
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? 'border-purple-500/40 bg-purple-500/5' : 'border-white/10 bg-white/[0.03]'}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
        aria-expanded={open}
      >
        <span className="font-semibold text-white/90 text-base">{q}</span>
        <span className={`flex-shrink-0 w-5 h-5 text-purple-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-60' : 'max-h-0'}`}>
        <div className="px-6 pb-5 text-white/50 leading-relaxed text-sm">{a}</div>
      </div>
    </div>
  );
}

const faqs = [
  { q: "What does a 'Free Growth Audit' actually include?", a: "We analyze your current digital presence — ad accounts, landing pages, funnel structure, competitor positioning, and SEO. You get a detailed PDF report with specific, actionable recommendations, not a sales pitch. No strings attached." },
  { q: "What's the minimum budget to work with Pixen India?", a: "We work with brands across all stages. Our consulting starts from ₹50,000/month. Ad budget depends on your goals, typically ₹30,000–₹5,00,000/month. We help you decide the right number during the audit call." },
  { q: "How quickly can I expect results?", a: "Most clients see measurable improvements in lead volume and CPL within the first 30–45 days. Full ROI typically compounds over 60–90 days as we optimize based on live data. We set realistic expectations upfront." },
  { q: "Do you guarantee results?", a: "We guarantee our process — data-driven research, structured A/B testing, and continuous optimization. No ethical agency guarantees specific numbers, but our track record speaks: 340% avg. lead growth, 4.2x ROAS achieved for e-commerce clients." },
  { q: "Do you work with businesses outside Delhi/India?", a: "Yes, 100%. We serve clients pan-India and many international brands targeting the Indian market. All communication is handled remotely via WhatsApp, Zoom, and Slack." },
  { q: "How do you pick which 5 brands to onboard each month?", a: "We evaluate based on growth potential, budget fit, and our ability to drive real impact. We prioritize brands we can genuinely move the needle for — not just brands with the biggest budgets." },
];

const services = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    label: 'Growth Systems',
    title: 'Revenue Scaling',
    desc: 'Predictable lead generation and performance advertising designed to maximize your ROI.',
    points: ['Paid Ads (Meta, Google, YouTube)', 'Lead Gen & Funnel Optimization', 'Data-Driven Analytics'],
    color: 'purple',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    label: 'Creative',
    title: 'Content That Converts',
    desc: 'Scroll-stopping creatives and video assets engineered to capture attention and lower CAC.',
    points: ['Strategic Content Creation', 'High-Retention Video Editing', 'Creative Design & Brand Identity'],
    color: 'blue',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    label: 'Authority',
    title: 'Engaged Audiences',
    desc: 'We turn followers into fanbases and brands into undisputed industry authorities.',
    points: ['Social Media Strategy', 'Performance Influencer Collaborations', 'Personal Branding & PR'],
    color: 'purple',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Strategy',
    title: 'Digital Architecture',
    desc: 'The exact blueprint to scale your operations rapidly by fixing website leaks and defining growth roadmaps.',
    points: ['Website Audit & CRO', 'Business Consultancy', 'Campaign Planning & Execution'],
    color: 'blue',
  },
];

const caseStudies = [
  { slug: 'b2b-saas-lead-growth', industry: 'B2B SaaS', title: '340% Lead Growth in 90 Days', metric: '+340%', metricLabel: 'Lead Volume', summary: 'Rebuilt entire inbound funnel, launched multi-channel paid campaigns, implemented lead nurturing system that tripled qualified pipeline.' },
  { slug: 'ecommerce-roas-optimization', industry: 'E-Commerce', title: '4.2x ROAS — From Burning Cash to Profit', metric: '4.2×', metricLabel: 'Return on Ad Spend', summary: 'Restructured a heavily leaking Meta and Google Ads account. Rebuilt creative strategy, audience segmentation, and retargeting funnels.' },
  { slug: 'local-business-cpa-reduction', industry: 'Local Business', title: 'CPA Slashed by 45% in 60 Days', metric: '-45%', metricLabel: 'Cost Per Acquisition', summary: 'Audited ad creatives, built lookalike audiences from CRM data, and optimized landing pages for mobile.' },
];

const testimonials = [
  { initials: 'AK', name: 'Amit Kumar', role: 'Director, Innovate Corp', quote: "Pixen didn't just run ads — they rebuilt our entire funnel. Customer acquisition cost plummeted by 40% while conversions doubled in 60 days.", metric: '-40% CAC', color: 'from-purple-600 to-purple-800' },
  { initials: 'PM', name: 'Priya Mehta', role: 'Founder, StyleHub', quote: "Their content strategy is brilliant. They understood our brand voice immediately and created visuals that actually convert. The ROI has been incredible.", metric: '3× Revenue', color: 'from-blue-600 to-blue-800' },
  { initials: 'RS', name: 'Rajesh Sharma', role: 'CEO, TechStart Solutions', quote: "We were struggling to scale our inbound pipeline. Pixen audited our site, fixed our funnels, and increased lead volume by 340% in under 90 days.", metric: '+340% Leads', color: 'from-purple-700 to-blue-700' },
];

export default function Home() {
  const router = useRouter();

  const openAudit = () => {
    track('cta_click', { label: 'get_free_audit' });
    router.push('/audit');
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #050815 0%, #02030A 100%)' }}>
      <PremiumNavbar />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section id="overview" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated ambient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Primary purple orb */}
          <div className="orb-drift absolute -top-40 left-[18%] w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.22) 0%, transparent 70%)', transform: 'translateZ(0)', willChange: 'transform, opacity' }} />
          {/* Blue orb */}
          <div className="orb-drift-slow absolute -bottom-60 right-[10%] w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)', transform: 'translateZ(0)', willChange: 'transform, opacity' }} />
          {/* Accent cyan micro-orb */}
          <div className="orb-drift absolute top-1/3 right-[30%] w-[300px] h-[300px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,214,255,0.06) 0%, transparent 70%)', animationDuration: '12s', animationDelay: '-4s', transform: 'translateZ(0)', willChange: 'transform, opacity' }} />
          {/* Grid pattern */}
          <div className="absolute inset-0"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
          {/* Subtle horizontal glow line */}
          <div className="absolute top-[38%] left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.15) 30%, rgba(59,130,246,0.1) 70%, transparent)' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <FadeIn delay={0.05}>
              <GlowBadge>Performance-Driven Growth Systems</GlowBadge>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.04] tracking-tight">
                <span className="block text-white">We Build</span>
                <span className="block text-shimmer" style={{ animationDelay: '0.5s' }}>
                  Revenue-Generating
                </span>
                <span className="block text-white">Growth Systems</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
                Not just marketing campaigns. We architect the systems, funnels,
                and AI-powered automations that turn traffic into predictable revenue.
              </p>
            </FadeIn>

            <FadeIn delay={0.42}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* Primary CTA with orbit rings */}
                <div className="relative group">
                  {/* Orbit ring 1 */}
                  <div
                    className="orbit-ring absolute inset-[-18px] rounded-full border border-purple-500/20 pointer-events-none"
                    style={{ borderStyle: 'dashed' }}
                  />
                  {/* Orbit ring 2 */}
                  <div
                    className="orbit-ring-reverse absolute inset-[-32px] rounded-full border border-blue-500/10 pointer-events-none"
                    style={{ borderStyle: 'dashed' }}
                  />
                  <button
                    onClick={openAudit}
                    className="cta-shimmer group relative px-9 py-4 rounded-full font-bold text-white text-base overflow-hidden transition-all duration-300 glow-pulse hover:-translate-y-1"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative flex items-center gap-2">
                      Get Free Growth Audit
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </div>
                <button
                  onClick={() => document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 rounded-full font-semibold text-white/70 border border-white/15 hover:bg-white/5 hover:text-white hover:border-white/30 transition-all duration-300"
                >
                  See Client Results
                </button>
              </div>
            </FadeIn>

            {/* Social proof */}
            <FadeIn delay={0.55}>
              <div className="flex items-center justify-center gap-3 pt-2">
                <div className="flex -space-x-2">
                  {['AK', 'PM', 'RS', 'VG', 'SN'].map((ini, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: i % 2 === 0 ? 'linear-gradient(135deg,#A855F7,#7C3AED)' : 'linear-gradient(135deg,#3B82F6,#1D4ED8)' }}>
                      {ini}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-white/40">
                  <span className="text-white/80 font-semibold">50+ brands</span> already growing with Pixen
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] text-white/25 tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white/30" />
          </div>
        </div>
      </section>

      {/* ─── LIVE STATS TICKER ───────────────────────────────────── */}
      <div className="relative overflow-hidden py-3 border-y border-white/5" style={{ background: 'rgba(168,85,247,0.03)' }}>
        <div className="flex items-center ticker-track gap-0">
          {/* Duplicate for seamless loop */}
          {[
            '⚡ 50+ Brands Scaled', '📈 340% Avg Lead Growth', '💰 ₹2Cr+ Revenue Generated',
            '🎯 4.2× Average ROAS', '🤖 AI-Powered Funnels', '-45% Avg CPL Reduction',
            '⚡ 50+ Brands Scaled', '📈 340% Avg Lead Growth', '💰 ₹2Cr+ Revenue Generated',
            '🎯 4.2× Average ROAS', '🤖 AI-Powered Funnels', '-45% Avg CPL Reduction',
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-2 flex-shrink-0 pr-12">
              <span className="text-xs font-medium text-white/35 tracking-wide">{item}</span>
              <span className="text-purple-600/40 text-xs">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── SCROLL STORY ─────────────────────────────────────── */}
      <ScrollStorySection onAuditClick={openAudit} />

      {/* ─── TRUST BAR ────────────────────────────────────────── */}
      <section className="border-y border-white/5" style={{ background: 'rgba(168, 85, 247, 0.04)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { target: 50, suffix: '+', label: 'Brands Scaled' },
              { target: 340, suffix: '%', label: 'Avg. Lead Growth' },
              { target: 4, suffix: '.2×', label: 'Average ROAS' },
              { target: 2, prefix: '₹', suffix: 'Cr+', label: 'Revenue Generated' },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div>
                  <div className="text-3xl md:text-4xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    <AnimatedNumber target={stat.target} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-white/40 mt-1.5 font-medium">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────────────── */}
      <section id="services" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <GlowBadge>The Growth Engine</GlowBadge>
            <h2 className="mt-5 text-4xl md:text-5xl font-bold text-white">Our Core Pillars for<br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Scaling Brands</span>
            </h2>
            <p className="mt-4 text-white/40 max-w-xl mx-auto">Only the levers that actively multiply revenue. No fluff metrics. Just outcomes.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((svc, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <GlassCard>
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white ${svc.color === 'purple' ? 'bg-gradient-to-br from-purple-600 to-purple-800' : 'bg-gradient-to-br from-blue-600 to-blue-800'}`}>
                    {svc.icon}
                  </div>
                  <div className="text-xs font-semibold tracking-widest uppercase text-purple-400 mb-1">{svc.label}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{svc.title}</h3>
                  <p className="text-white/50 leading-relaxed mb-6 text-sm">{svc.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {svc.points.map((pt, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm text-white/60">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${svc.color === 'purple' ? 'bg-purple-500/20' : 'bg-blue-500/20'}`}>
                          <svg className={`w-2.5 h-2.5 ${svc.color === 'purple' ? 'text-purple-400' : 'text-blue-400'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => router.push('/services')}
                    className="text-sm font-semibold text-white/60 hover:text-white flex items-center gap-2 group transition-colors"
                  >
                    Learn More
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CASE STUDIES ─────────────────────────────────────── */}
      <section id="case-studies" className="py-28 px-6" style={{ background: 'rgba(168, 85, 247, 0.03)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <GlowBadge>Measurable Outcomes</GlowBadge>
            <h2 className="mt-5 text-4xl md:text-5xl font-bold text-white">
              We Don&apos;t Guess.<br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">We Deliver ROI.</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <GlassCard className="flex flex-col h-full relative overflow-hidden">
                  {/* Top glow line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-purple-500/0 via-purple-500/60 to-purple-500/0" />
                  <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-purple-500/30 bg-purple-500/10 text-purple-300 mb-4 w-fit">
                    {cs.industry}
                  </div>
                  <div className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    {cs.metric}
                  </div>
                  <div className="text-xs text-white/40 font-medium uppercase tracking-widest mb-3">{cs.metricLabel}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{cs.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-6 flex-1">{cs.summary}</p>
                  <Link
                    href={`/case-studies/${cs.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors group"
                  >
                    Read Full Case Study
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────── */}
      <section id="process" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <GlowBadge>Our Process</GlowBadge>
            <h2 className="mt-5 text-4xl md:text-5xl font-bold text-white">From Audit to Revenue<br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">in 3 Steps</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line — aligned to center of w-20 (80px) icon = top-10 */}
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-purple-500/0 via-purple-500/40 to-purple-500/0" />
            {[
              { num: '01', title: 'Free Growth Audit', desc: 'We analyze your funnel, ads, competitors, and opportunities. You get a detailed roadmap in 48 hours — zero fluff.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg> },
              { num: '02', title: 'Custom Growth Strategy', desc: 'We build a channel-specific 90-day growth plan — paid media, content, SEO, CRO — with clear KPIs and revenue targets.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> },
              { num: '03', title: 'Execute & Scale', desc: 'We launch, test, and iterate rapidly. Weekly calls, transparent reporting, and a dedicated team focused on one goal: your revenue.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center text-white mb-6 border border-white/10 bg-white/5">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/10" />
                    <span className="relative">{step.icon}</span>
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-full text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">Step {step.num}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/40 leading-relaxed text-sm">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="text-center mt-12">
            <button
              onClick={openAudit}
              className="group relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-1"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative">Start With a Free Audit</span>
            </button>
          </FadeIn>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
      <section id="testimonials" className="py-28 px-6" style={{ background: 'rgba(59, 130, 246, 0.03)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <GlowBadge>Partner Success</GlowBadge>
            <h2 className="mt-5 text-4xl md:text-5xl font-bold text-white">
              We&apos;re the Growth Engine<br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Behind Industry Leaders</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <GlassCard className="flex flex-col h-full">
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-xs font-bold text-purple-400 bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 rounded-full">
                      {t.metric}
                    </span>
                  </div>
                  <p className="text-white/60 italic leading-relaxed mb-6 flex-1 text-sm">&quot;{t.quote}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{t.name}</div>
                      <div className="text-xs text-white/40">{t.role}</div>
                    </div>
                  </div>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MID CTA BANNER ───────────────────────────────────── */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-blue-900/20 to-purple-900/40" />
        <div className="absolute inset-0 border-y border-white/10" />
        <div className="relative max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-purple-400 mb-2">Limited Availability — 5 Spots Left</p>
            <h3 className="text-2xl md:text-3xl font-bold text-white">Ready to turn traffic into revenue?</h3>
          </div>
          <button
            onClick={openAudit}
            className="flex-shrink-0 group relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-1"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative">Book a Free 30‑Min Call</span>
          </button>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <section id="faq" className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-12">
            <GlowBadge>Common Questions</GlowBadge>
            <h2 className="mt-5 text-4xl md:text-5xl font-bold text-white">
              Everything You<br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Need to Know</span>
            </h2>
          </FadeIn>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <FAQItem q={item.q} a={item.a} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────── */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/30 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(ellipse, #A855F7 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <FadeIn>
            <GlowBadge>Limited Availability</GlowBadge>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Stop Leaking Revenue.<br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Get Your Free Growth Audit.
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              We only take on <span className="text-white font-semibold">5 new brands per month</span> to guarantee premium focus and maximum results.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openAudit}
                className="group relative px-10 py-5 rounded-full font-bold text-white text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-1"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">
                  Claim My Free Growth Audit
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm font-medium text-white/40">
              {['100% Free Funnel Analysis', 'No Sales Pressure', 'Actionable Roadmap in 48hrs'].map((pt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {pt}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
