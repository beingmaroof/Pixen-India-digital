"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Footer, Button, Container, Section, Card, Badge } from '@/components';
import SlotCounter from '@/components/SlotCounter';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
console.log("test change");
// GA helper
const track = (event: string, params?: Record<string, string>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event, params ?? {});
  }
};

// Animated number counter
function AnimatedNumber({ target, prefix = '', suffix = '', duration = 2000 }: {
  target: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
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
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <div ref={ref} className="font-extrabold">
      {prefix}{count}{suffix}
    </div>
  );
}

// FAQ item
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-900 text-base">{q}</span>
        <span className={`flex-shrink-0 w-5 h-5 text-primary-600 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 bg-white text-gray-600 leading-relaxed text-sm animate-fade-in">
          {a}
        </div>
      )}
    </div>
  );
}

const faqs = [
  {
    q: "What does a 'Free Growth Audit' actually include?",
    a: "We analyze your current digital presence — ad accounts, landing pages, funnel structure, competitor positioning, and SEO. You get a detailed PDF report with specific, actionable recommendations, not a sales pitch. No strings attached.",
  },
  {
    q: "What's the minimum budget to work with Pixen India?",
    a: "We work with brands across all stages. Our consulting starts from ₹50,000/month. Ad budget depends on your goals, typically ₹30,000–₹5,00,000/month. We help you decide the right number during the audit call.",
  },
  {
    q: "How quickly can I expect results?",
    a: "Most clients see measurable improvements in lead volume and CPL within the first 30–45 days. Full ROI typically compounds over 60–90 days as we optimize based on live data. We set realistic expectations upfront.",
  },
  {
    q: "Do you guarantee results?",
    a: "We guarantee our process — data-driven research, structured A/B testing, and continuous optimization. While no ethical agency guarantees specific numbers (markets change), our track record speaks: 340% avg. lead growth, 4.2x ROAS achieved for e-commerce clients.",
  },
  {
    q: "Do you work with businesses outside Delhi/India?",
    a: "Yes, 100%. We serve clients pan-India and many international brands targeting the Indian market. All communication is handled remotely via WhatsApp, Zoom, and Slack.",
  },
  {
    q: "How do you pick which 5 brands to onboard each month?",
    a: "We evaluate based on growth potential, budget fit, and our ability to drive real impact. We prioritize brands we can genuinely move the needle for — not just brands with the biggest budgets.",
  },
];

const caseStudies = [
  {
    slug: 'b2b-saas-lead-growth',
    industry: 'B2B SaaS',
    title: '340% Lead Growth in 90 Days',
    metric: '+340%',
    metricLabel: 'Lead Volume',
    color: 'primary',
    summary: 'Rebuilt the entire inbound funnel, launched multi-channel paid campaigns, and implemented a lead nurturing system that tripled qualified pipeline.',
  },
  {
    slug: 'ecommerce-roas-optimization',
    industry: 'E-Commerce',
    title: '4.2x ROAS — From Burning Cash to Profit',
    metric: '4.2×',
    metricLabel: 'Return on Ad Spend',
    color: 'accent',
    summary: 'Restructured a heavily leaking Meta and Google Ads account. Rebuilt creative strategy, audience segmentation, and retargeting funnels.',
  },
  {
    slug: 'local-business-cpa-reduction',
    industry: 'Local Business',
    title: 'CPA Slashed by 45% in 60 Days',
    metric: '-45%',
    metricLabel: 'Cost Per Acquisition',
    color: 'primary',
    summary: 'Audited ad creatives, built lookalike audiences from CRM data, and optimized landing pages for mobile — cutting acquisition cost nearly in half.',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Free Growth Audit',
    desc: 'We analyze your funnel, ads, competitors, and opportunities. You get a detailed roadmap in 48 hours — zero fluff.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Custom Growth Strategy',
    desc: 'We build a channel-specific 90-day growth plan — paid media, content, SEO, CRO — with clear KPIs and revenue targets.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Execute & Scale',
    desc: 'We launch, test, and iterate rapidly. Weekly calls, transparent reporting, and a dedicated team focused on one goal: your revenue.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className="min-h-screen">

        {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
        <Section padding="xl" bgColor="gray" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50 z-0" />
          <div style={{ zIndex: 0 }} className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
            <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8">
            {/* Urgency Badge with live slot counter */}
            <div className="animate-slide-up flex justify-center" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <Badge variant="primary" size="md">
                <SlotCounter variant="badge" />
              </Badge>
            </div>

            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight text-balance animate-slide-up"
              style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              We Build Revenue-Generating Growth Systems,{" "}
              <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                Not Just Marketing Campaigns
              </span>
            </h1>

            <p
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-slide-up"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
              Transform your digital presence from a cost center into a predictable revenue engine.
              We audit your funnels, scale your traffic, and optimize for conversions.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up"
              style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
            >
              <Button
                variant="primary"
                size="lg"
                rightIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }
                onClick={() => {
                  track('cta_click', { location: 'hero', label: 'get_free_audit' });
                  router.push('/contact');
                }}
                className="shadow-xl"
              >
                Get Free Growth Audit
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  track('cta_click', { location: 'hero', label: 'see_results' });
                  document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="shadow-md"
              >
                See Client Results
              </Button>
            </div>

            {/* Proof avatars row */}
            <div
              className="flex items-center justify-center gap-3 animate-slide-up"
              style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
            >
              <div className="flex -space-x-2">
                {['AK', 'PM', 'RS', 'VG', 'SN'].map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    style={{
                      background: i % 2 === 0
                        ? 'linear-gradient(135deg,#2563eb,#1d4ed8)'
                        : 'linear-gradient(135deg,#dc2626,#b91c1c)',
                    }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">50+ brands</span> already growing with Pixen
              </p>
            </div>
          </div>
        </Section>

        {/* ═══════════════════════════ TRUST BAR ═══════════════════════════════ */}
        <section className="bg-gray-900 py-10 border-y border-gray-800">
          <Container size="xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { target: 50, suffix: '+', label: 'Brands Scaled' },
                { target: 340, suffix: '%', label: 'Avg. Lead Growth' },
                { target: 4, suffix: '.2×', label: 'Average ROAS' },
                { target: 2, prefix: '₹', suffix: 'Cr+', label: 'Revenue Generated' },
              ].map((stat, i) => (
                <div key={i} className="text-white">
                  <div className="text-3xl md:text-4xl font-extrabold text-primary-400">
                    <AnimatedNumber target={stat.target} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-gray-400 mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ═══════════════════════════ CASE STUDIES ═══════════════════════════ */}
        <Section id="case-studies" padding="xl" bgColor="white" container={false}>
          <Container size="xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="secondary">Measurable Outcomes</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-4 mb-4">
                We Don&apos;t Guess. We Deliver ROI.
              </h2>
              <p className="text-lg text-gray-600">
                Data-driven marketing that turns attention into predictable cash flow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies.map((cs) => (
                <Card key={cs.slug} hover variant="elevated" className={`border-t-4 ${cs.color === 'accent' ? 'border-t-accent-500' : 'border-t-primary-500'}`}>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-full ${cs.color === 'accent' ? 'bg-accent-100 text-accent-700' : 'bg-primary-100 text-primary-700'}`}>
                        {cs.industry}
                      </span>
                    </div>
                    <div className={`text-5xl font-extrabold ${cs.color === 'accent' ? 'text-accent-600' : 'text-primary-600'}`}>
                      {cs.metric}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{cs.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{cs.summary}</p>
                    <Link
                      href={`/case-studies/${cs.slug}`}
                      className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${cs.color === 'accent' ? 'text-accent-600 hover:text-accent-700' : 'text-primary-600 hover:text-primary-700'}`}
                      onClick={() => track('case_study_click', { slug: cs.slug })}
                    >
                      Read Full Case Study
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* ═══════════════════════════ HOW IT WORKS ═══════════════════════════ */}
        <Section id="process" padding="xl" bgColor="gray" container={false}>
          <Container size="xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="primary">Our Process</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-4 mb-4">
                From Audit to Revenue in 3 Steps
              </h2>
              <p className="text-lg text-gray-600">
                No hand-wavy strategies. A clear, repeatable system that drives results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200" />

              {processSteps.map((step, i) => (
                <div key={i} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 w-20 h-20 bg-white border-2 border-primary-200 rounded-2xl flex items-center justify-center shadow-lg text-primary-600 mb-6">
                    {step.icon}
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary-600 text-white rounded-full text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-2">Step {step.number}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  track('cta_click', { location: 'process', label: 'start_audit' });
                  router.push('/contact');
                }}
              >
                Start With a Free Audit
              </Button>
            </div>
          </Container>
        </Section>

        {/* ═══════════════════════════ SERVICES ═══════════════════════════════ */}
        <Section id="services" padding="xl" bgColor="white" container={false}>
          <Container size="xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="primary">The Growth Engine</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-4 mb-4">
                Our Core Pillars for Scaling Brands
              </h2>
              <p className="text-lg text-gray-600">
                We only focus on the levers that actively multiply revenue. No fluff metrics. Just outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {[
                {
                  color: 'primary',
                  title: 'Growth Systems & Revenue Scaling',
                  desc: 'Predictable lead generation and performance advertising designed to maximize your ROI. We construct profitable funnels that scale.',
                  points: ['Paid Ads (Meta, Google, YouTube)', 'Lead Gen & Funnel Optimization', 'Data-Driven Analytics'],
                  icon: (
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ),
                },
                {
                  color: 'accent',
                  title: 'Content That Converts',
                  desc: 'Scroll-stopping creatives and video assets engineered to capture attention, build trust, and lower customer acquisition costs.',
                  points: ['Strategic Content Creation', 'High-Retention Video Editing', 'Creative Design & Brand Identity'],
                  icon: (
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  ),
                },
                {
                  color: 'primary',
                  title: 'Engaged Audiences & Authority',
                  desc: 'We turn followers into fanbases and brands into undisputed industry authorities through strategic social presence.',
                  points: ['Social Media Strategy & Management', 'Performance Influencer Collaborations', 'Personal Branding & PR'],
                  icon: (
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                },
                {
                  color: 'accent',
                  title: 'Digital Architecture & Strategy',
                  desc: 'We lay out the exact blueprint to scale your operations rapidly by fixing website leaks and defining clear growth roadmaps.',
                  points: ['Website Audit & CRO', 'Business Consultancy & Market Advisory', 'Campaign Planning & Execution'],
                  icon: (
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
              ].map((service, i) => (
                <Card key={i} hover className="p-8">
                  <div className={`w-14 h-14 bg-gradient-to-br ${service.color === 'primary' ? 'from-primary-500 to-primary-600' : 'from-accent-500 to-accent-600'} rounded-xl flex items-center justify-center mb-6 shadow-md`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.desc}</p>
                  <ul className="space-y-2 mb-6 text-sm text-gray-700 font-medium">
                    {service.points.map((point, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <svg className={`w-4 h-4 ${service.color === 'primary' ? 'text-primary-500' : 'text-accent-500'} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" fullWidth onClick={() => router.push('/services')}>
                    Learn More
                  </Button>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* ═══════════════════════════ TESTIMONIALS ═══════════════════════════ */}
        <Section id="testimonials" padding="xl" bgColor="gray" container={false}>
          <Container size="xl">
            <div className="text-center mb-16">
              <Badge variant="secondary">Partner Success</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-4 mb-4">
                We&apos;re the Growth Engine Behind Industry Leaders
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  initials: 'AK', name: 'Amit Kumar', role: 'Director, Innovate Corp', bg: 'from-primary-500 to-primary-600',
                  quote: 'Pixen didn\'t just run ads — they rebuilt our entire funnel. Customer acquisition cost plummeted by 40% while conversions doubled in 60 days.',
                  metric: '-40% CAC',
                },
                {
                  initials: 'PM', name: 'Priya Mehta', role: 'Founder, StyleHub', bg: 'from-accent-500 to-accent-600',
                  quote: 'Their content strategy is brilliant. They understood our brand voice immediately and created visuals that actually convert. The ROI has been incredible.',
                  metric: '3× Revenue',
                },
                {
                  initials: 'RS', name: 'Rajesh Sharma', role: 'CEO, TechStart Solutions', bg: 'from-gray-700 to-gray-900',
                  quote: 'We were struggling to scale our inbound pipeline. Pixen audited our site, fixed our funnels, and increased lead volume by 340% in under 90 days.',
                  metric: '+340% Leads',
                },
              ].map((t, i) => (
                <Card key={i} hover variant="elevated" className="bg-white border border-gray-100 p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                      {t.metric}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">
                    &quot;{t.quote}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${t.bg} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{t.name}</div>
                      <div className="text-sm text-gray-500">{t.role}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* ═══════════════════════════ MID-PAGE CTA ════════════════════════════ */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-14">
          <Container size="lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-primary-200 font-semibold text-sm uppercase tracking-wide mb-2">
                  Limited Availability
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Ready to turn traffic into revenue?
                </h3>
                <div className="mt-2">
                  <SlotCounter variant="banner" className="text-primary-200 justify-start" />
                </div>
              </div>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  track('cta_click', { location: 'mid_page', label: 'book_call' });
                  window.open('https://calendly.com/pixenindia/free-consultation', '_blank');
                }}
                className="flex-shrink-0 shadow-xl"
              >
                Book a Free 30‑Min Call
              </Button>
            </div>
          </Container>
        </section>

        {/* ═══════════════════════════ FAQ ═════════════════════════════════════ */}
        <Section id="faq" padding="xl" bgColor="white" container={false}>
          <Container size="lg">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary">Common Questions</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">
                Everything You Need to Know
              </h2>
            </div>
            <div className="space-y-3 max-w-3xl mx-auto">
              {faqs.map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </Container>
        </Section>

        {/* ═══════════════════════════ FINAL CTA ════════════════════════════════ */}
        <Section id="contact" padding="xl" bgColor="primary" container={false}>
          <Container size="xl">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Badge variant="secondary" className="px-4 py-1.5 text-sm uppercase tracking-wide font-bold">
                Limited Availability
              </Badge>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
                Stop Leaking Revenue. <br className="hidden md:block" />Get Your Free Growth Audit.
              </h2>

              <p className="text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed">
                We only take on <span className="font-bold text-white">5 new brands per month</span> to guarantee premium focus.{' '}
                <SlotCounter variant="inline" className="text-white" />
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
                <Button
                  variant="secondary"
                  size="lg"
                  rightIcon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  }
                  onClick={() => {
                    track('cta_click', { location: 'final_cta', label: 'claim_audit' });
                    router.push('/contact');
                  }}
                  className="shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 px-8 py-4 text-lg font-bold"
                >
                  Claim My Free Growth Audit
                </Button>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-6 justify-center items-center text-sm font-semibold text-primary-200">
                {['100% Free Funnel Analysis', 'No Sales Pressure', 'Actionable Roadmap in 48hrs'].map((point, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Footer />
      </main>
    </>
  );
}
