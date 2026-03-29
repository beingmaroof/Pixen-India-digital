"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer } from '@/components';
import { DarkPageWrapper, DarkHero, DarkSection, DarkCard, DarkGradientBtn, DarkCTABanner, FadeIn, DarkSectionHeader, DarkCheckItem } from '@/components/DarkUI';

const values = [
  { title: 'Transparency', description: 'Open communication and honest reporting. No hidden agendas, ever.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>, color: 'purple' },
  { title: 'Results', description: 'We measure success by your business growth, not likes or followers.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>, color: 'blue' },
  { title: 'Innovation', description: 'Always learning, testing, and implementing cutting-edge strategies.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, color: 'purple' },
  { title: 'Partnership', description: 'We work as an extension of your team, fully invested in your success.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, color: 'blue' },
];

const stats = [
  { value: '50+', label: 'Happy Clients' },
  { value: '150+', label: 'Leads Generated Monthly' },
  { value: '8–12%', label: 'Average Conversion Rate' },
  { value: '5+', label: 'Years Experience' },
];

export default function AboutPage() {
  const router = useRouter();

  return (
    <DarkPageWrapper>
      <PremiumNavbar />
      <DarkHero
        eyebrow="About Us"
        title="Your Partner in"
        gradientTitle="Digital Growth"
        subtitle="We're not just an agency — we're your growth partners. Together, we'll turn attention into revenue and brands into authority."
      />

      {/* Mission */}
      <DarkSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-white/50 mb-5 leading-relaxed">
              At Pixen India Digital, we believe every business deserves a strong digital presence that drives real results.
              Our mission is to empower businesses with data-driven marketing strategies, creative excellence, and transparent partnerships.
            </p>
            <p className="text-white/50 mb-8 leading-relaxed">
              We don&apos;t focus on vanity metrics — we focus on what truly matters: leads, sales, and long-term brand growth.
              Our performance-driven approach ensures that every rupee you invest delivers measurable returns.
            </p>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1">{s.value}</div>
                  <div className="text-white/50 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/60 to-blue-950/40 p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-purple-500/0 via-purple-400 to-purple-500/0" />
              <h3 className="text-xl font-bold text-white mb-6">Why Choose Us?</h3>
              <ul className="space-y-3">
                {['Revenue-focused, not vanity metrics', 'Data-driven decision making', 'Transparent reporting & communication', 'Custom strategies, not templates', 'Dedicated growth team', 'Proven track record across industries'].map((item, i) => (
                  <DarkCheckItem key={i} text={item} color={i % 2 === 0 ? 'purple' : 'blue'} />
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </DarkSection>

      {/* Values */}
      <DarkSection subtle>
        <DarkSectionHeader eyebrow="Core Values" title="The Principles That" gradientTitle="Guide Us" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="text-center rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-purple-500/30 transition-all duration-300">
                <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 text-white ${v.color === 'purple' ? 'bg-gradient-to-br from-purple-600 to-purple-800' : 'bg-gradient-to-br from-blue-600 to-blue-800'}`}>
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{v.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </DarkSection>

      <DarkCTABanner
        title="Let's Grow Together"
        subtitle="Ready to transform your digital presence? Join our growing list of successful clients."
        ctaLabel="Get in Touch"
        onCtaClick={() => router.push('/contact')}
      />

      <Footer />
    </DarkPageWrapper>
  );
}
