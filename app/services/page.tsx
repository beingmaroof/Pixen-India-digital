"use client";

import React from 'react';
import { Navbar, Footer, Section, Container, Badge, ServiceCard, Button } from '@/components';
import { useRouter } from 'next/navigation';

export default function ServicesPage() {
  const router = useRouter();

  const services = [
    {
      title: 'Growth Systems & Revenue Scaling',
      problem: 'Are you burning cash on ads that generate clicks but no qualified leads or sales?',
      solution: 'We deploy omni-channel paid strategies (Meta, Google, YouTube) backed by rigorous funnel optimization to ensure every dollar spent returns maximum ROI.',
      outcome: 'Predictable pipeline of qualified prospects, slashed acquisition costs, and exponential revenue growth.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: 'Content That Converts',
      problem: 'Your creatives aren\'t hooking viewers or convincing them why your brand is the clear choice?',
      solution: 'From high-retention video editing to scroll-stopping visual design, we architect content that tells a compelling story and drives immediate action.',
      outcome: 'Higher ad engagement, stronger brand identity, and a massive drop in CPA through superior creative performance.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
    {
      title: 'Engaged Audiences & Authority',
      problem: 'Struggling to build a loyal community or command authority in a crowded market?',
      solution: 'Complete social media strategy, personal branding PR, and authentic influencer collaborations designed to make your brand the undisputed market leader.',
      outcome: 'Cult-like brand loyalty, massive audience expansion, and authority that makes selling effortless.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Digital Architecture & Strategy',
      problem: 'Do you have traffic but an underperforming website and a lack of clear strategic direction?',
      solution: 'We run deep conversion rate optimization (CRO) audits, rebuild broken user journeys, and provide high-level business consultancy to map your exact scaling path.',
      outcome: 'A website that converts traffic at 2x-3x the industry average, and absolute clarity on your next exponential growth milestone.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        
        <Section padding="xl" bgColor="gray" container={false}>
          <Container size="xl">
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <Badge variant="primary">How We Scale Brands</Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight text-balance">
                End-to-End Growth{' '}
                <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                  Solutions
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                We don&apos;t sell generic marketing services. We install proven growth systems
                tailored to rapidly multiply your revenue and brand authority.
              </p>
            </div>
          </Container>
        </Section>

        <Section id="services" padding="xl" bgColor="white" container={false}>
          <Container size="xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  problem={service.problem}
                  solution={service.solution}
                  outcome={service.outcome}
                  icon={service.icon}
                  ctaText="Get Free Audit"
                />
              ))}
            </div>
          </Container>
        </Section>

        <Section padding="xl" bgColor="primary" container={false}>
          <Container size="xl">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="px-4 py-1.5 text-sm uppercase tracking-wide font-bold">
                Limited Availability
              </Badge>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">
                Ready to Dominate Your Market?
              </h2>
              <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                Book a free funnel analysis to discover exactly what&apos;s holding you back from exponential growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => router.push('/contact')}
                  className="shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Schedule Free Analysis
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
