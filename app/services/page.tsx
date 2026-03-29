"use client";

import React, { useState } from 'react';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer, CalendlyEmbed } from '@/components';
import { DarkPageWrapper, DarkHero, DarkSection, DarkCard, DarkBadge, DarkGradientBtn, DarkCTABanner, FadeIn, DarkSectionHeader, DarkCheckItem } from '@/components/DarkUI';

const services = [
  {
    title: 'Growth Systems & Revenue Scaling',
    problem: 'Are you burning cash on ads that generate clicks but no qualified leads or sales?',
    solution: 'We deploy omni-channel paid strategies (Meta, Google, YouTube) backed by rigorous funnel optimization to ensure every penny spent returns maximum ROI.',
    outcome: 'Predictable pipeline of qualified prospects, slashed acquisition costs, and exponential revenue growth.',
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    color: 'purple',
    points: ['Meta, Google & YouTube Ads', 'Funnel Engineering & CRO', 'Revenue Attribution Tracking'],
  },
  {
    title: 'Content That Converts',
    problem: "Your creatives aren't hooking viewers or convincing them why your brand is the clear choice?",
    solution: 'From high-retention video editing to scroll-stopping visual design, we architect content that tells a compelling story and drives immediate action.',
    outcome: 'Higher ad engagement, stronger brand identity, and a massive drop in CPA through superior creative performance.',
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
    color: 'blue',
    points: ['Strategic Content Creation', 'High-Retention Video Editing', 'Brand Identity Design'],
  },
  {
    title: 'Engaged Audiences & Authority',
    problem: 'Struggling to build a loyal community or command authority in a crowded market?',
    solution: 'Complete social media strategy, personal branding PR, and authentic influencer collaborations designed to make your brand the undisputed market leader.',
    outcome: 'Cult-like brand loyalty, massive audience expansion, and authority that makes selling effortless.',
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    color: 'purple',
    points: ['Social Media Strategy & Management', 'Performance Influencer Collaborations', 'Personal Branding & PR'],
  },
  {
    title: 'Digital Architecture & Strategy',
    problem: 'Do you have traffic but an underperforming website and a lack of clear strategic direction?',
    solution: 'We run deep CRO audits, rebuild broken user journeys, and provide high-level business consultancy to map your exact scaling path.',
    outcome: 'A website that converts traffic at 2x–3x the industry average, and absolute clarity on your next exponential growth milestone.',
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    color: 'blue',
    points: ['Website Audit & CRO', 'Business Consultancy', 'Campaign Planning & Execution'],
  },
];

export default function ServicesPage() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <DarkPageWrapper>
      <PremiumNavbar />
      <DarkHero
        eyebrow="How We Scale Brands"
        title="End-to-End Growth"
        gradientTitle="Solutions"
        subtitle="We don't sell generic marketing services. We install proven growth systems tailored to rapidly multiply your revenue and brand authority."
      />

      <DarkSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((svc, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <DarkCard className="flex flex-col h-full">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white ${svc.color === 'purple' ? 'bg-gradient-to-br from-purple-600 to-purple-800' : 'bg-gradient-to-br from-blue-600 to-blue-800'}`}>
                  {svc.icon}
                </div>
                <div className={`text-xs font-semibold tracking-widest uppercase mb-1 ${svc.color === 'purple' ? 'text-purple-400' : 'text-blue-400'}`}>Service</div>
                <h3 className="text-xl font-bold text-white mb-4">{svc.title}</h3>

                <div className="space-y-3 mb-5 flex-1">
                  <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3">
                    <p className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-1">The Problem</p>
                    <p className="text-white/50 text-sm leading-relaxed">{svc.problem}</p>
                  </div>
                  <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-3">
                    <p className="text-xs font-semibold text-purple-400 uppercase tracking-wide mb-1">Our Solution</p>
                    <p className="text-white/50 text-sm leading-relaxed">{svc.solution}</p>
                  </div>
                  <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3">
                    <p className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-1">Expected Outcome</p>
                    <p className="text-white/50 text-sm leading-relaxed">{svc.outcome}</p>
                  </div>
                </div>

                <ul className="space-y-2 mb-5">
                  {svc.points.map((pt, j) => <DarkCheckItem key={j} text={pt} color={svc.color as 'purple' | 'blue'} />)}
                </ul>

                <DarkGradientBtn onClick={() => setIsCalendlyOpen(true)} className="w-full justify-center">
                  Get Free Audit
                </DarkGradientBtn>
              </DarkCard>
            </FadeIn>
          ))}
        </div>
      </DarkSection>

      <DarkCTABanner
        title="Ready to Dominate Your Market?"
        subtitle="Book a free funnel analysis to discover exactly what's holding you back from exponential growth."
        ctaLabel="Schedule Free Analysis"
        onCtaClick={() => setIsCalendlyOpen(true)}
      />

      <Footer />
      <CalendlyEmbed isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </DarkPageWrapper>
  );
}
