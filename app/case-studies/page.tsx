"use client";

import React from 'react';
import { Navbar, Footer, Section, Container, Badge, Card, Button } from '@/components';
import { useRouter } from 'next/navigation';

interface CaseStudy {
  id: number;
  clientName: string;
  industry: string;
  problem: string;
  strategy: string;
  results: Array<{ metric: string; value: string }>;
  testimonial?: string;
}

export default function CaseStudiesPage() {
  const router = useRouter();

  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      clientName: 'TechStart Solutions',
      industry: 'Technology',
      problem: 'Low online visibility and inconsistent lead generation despite having a quality product.',
      strategy: 'Implemented comprehensive SEO strategy, Google Ads campaigns, and content marketing focused on long-tail keywords.',
      results: [
        { metric: 'Lead Increase', value: '300%' },
        { metric: 'Organic Traffic', value: '+450%' },
        { metric: 'Conversion Rate', value: '12.5%' },
      ],
      testimonial: 'Pixen India Digital transformed our online presence. We saw a 300% increase in qualified leads within just 3 months.',
    },
    {
      id: 2,
      clientName: 'StyleHub Fashion',
      industry: 'E-commerce',
      problem: 'High cart abandonment rate and low customer retention in competitive fashion market.',
      strategy: 'Redesigned UX funnel, implemented retargeting campaigns, and created loyalty program with influencer partnerships.',
      results: [
        { metric: 'Revenue Growth', value: '250%' },
        { metric: 'Cart Abandonment', value: '-45%' },
        { metric: 'Customer LTV', value: '+180%' },
      ],
      testimonial: 'The ROI we achieved with Pixen has been incredible. They are true growth partners.',
    },
    {
      id: 3,
      clientName: 'HealthPlus Clinic',
      industry: 'Healthcare',
      problem: 'Struggling to attract new patients and establish trust in local market.',
      strategy: 'Local SEO optimization, Google My Business management, patient testimonial videos, and educational content series.',
      results: [
        { metric: 'New Patients', value: '+200%' },
        { metric: 'Local Rankings', value: 'Top 3' },
        { metric: 'Appointment Rate', value: '85%' },
      ],
    },
    {
      id: 4,
      clientName: 'EduTech Academy',
      industry: 'Education',
      problem: 'Low course enrollment and high cost per acquisition from existing marketing channels.',
      strategy: 'Multi-channel approach combining Facebook Ads, email automation, webinar funnels, and affiliate partnerships.',
      results: [
        { metric: 'Enrollments', value: '+400%' },
        { metric: 'CPA Reduction', value: '-60%' },
        { metric: 'ROI', value: '450%' },
      ],
    },
    {
      id: 5,
      clientName: 'GreenLeaf Organics',
      industry: 'Food & Beverage',
      problem: 'Limited brand awareness and difficulty reaching health-conscious consumers.',
      strategy: 'Instagram-first strategy with micro-influencer collaborations, user-generated content, and shoppable posts.',
      results: [
        { metric: 'Instagram Followers', value: '+15K' },
        { metric: 'Online Sales', value: '+320%' },
        { metric: 'Engagement Rate', value: '8.2%' },
      ],
    },
    {
      id: 6,
      clientName: 'PropTech Realty',
      industry: 'Real Estate',
      problem: 'Outdated digital presence and inability to generate qualified property inquiries.',
      strategy: 'Complete website redesign, virtual tour integration, targeted LinkedIn campaigns, and automated lead nurturing.',
      results: [
        { metric: 'Qualified Leads', value: '+280%' },
        { metric: 'Website Traffic', value: '+500%' },
        { metric: 'Sales Cycle', value: '-35%' },
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        
        <Section padding="xl" bgColor="gray" container={false}>
          <Container size="xl">
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <Badge variant="secondary">Case Studies</Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight text-balance">
                Real Results for{' '}
                <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                  Real Businesses
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                See how we&apos;ve helped businesses across industries achieve measurable growth 
                and transform their digital presence.
              </p>
            </div>
          </Container>
        </Section>

        <Section padding="xl" bgColor="white" container={false}>
          <Container size="xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudies.map((study) => (
                <Card key={study.id} hover variant="elevated" className="flex flex-col">
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{study.clientName}</h3>
                      <Badge variant="primary">{study.industry}</Badge>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-accent-600 uppercase tracking-wide mb-2">
                      The Challenge
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{study.problem}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">
                      Our Strategy
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{study.strategy}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    {study.results.map((result, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-1">
                          {result.value}
                        </div>
                        <div className="text-xs text-gray-600">{result.metric}</div>
                      </div>
                    ))}
                  </div>

                  {study.testimonial && (
                    <div className="mb-6 p-4 border-l-4 border-primary-500 italic text-gray-700">
                      &quot;{study.testimonial}&quot;
                    </div>
                  )}

                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <Button 
                      variant="primary" 
                      fullWidth
                      onClick={() => router.push('/contact')}
                      className="shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                      View Full Case Study
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        <Section padding="xl" bgColor="primary" container={false}>
          <Container size="xl">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Want Results Like These?
              </h2>
              <p className="text-xl text-primary-100">
                Let&apos;s create your success story together. Book a free consultation today.
              </p>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => router.push('/contact')}
                className="shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Schedule Your Free Strategy Call
              </Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
