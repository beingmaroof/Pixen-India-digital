"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer } from '@/components';
import { DarkPageWrapper, DarkHero, DarkSection, DarkGradientBtn, DarkCTABanner, FadeIn, DarkSectionHeader, DarkBadge } from '@/components/DarkUI';

const caseStudies = [
  { id: 1, clientName: 'TechStart Solutions', industry: 'Technology', problem: 'Low online visibility and inconsistent lead generation despite having a quality product.', strategy: 'Implemented comprehensive SEO strategy, Google Ads campaigns, and content marketing focused on long-tail keywords.', results: [{ metric: 'Lead Increase', value: '300%' }, { metric: 'Organic Traffic', value: '+450%' }, { metric: 'Conversion Rate', value: '12.5%' }], testimonial: 'Pixen India Digital transformed our online presence. We saw a 300% increase in qualified leads within just 3 months.' },
  { id: 2, clientName: 'StyleHub Fashion', industry: 'E-commerce', problem: 'High cart abandonment rate and low customer retention in competitive fashion market.', strategy: 'Redesigned UX funnel, implemented retargeting campaigns, and created loyalty program with influencer partnerships.', results: [{ metric: 'Revenue Growth', value: '250%' }, { metric: 'Cart Abandonment', value: '-45%' }, { metric: 'Customer LTV', value: '+180%' }], testimonial: 'The ROI we achieved with Pixen has been incredible. They are true growth partners.' },
  { id: 3, clientName: 'HealthPlus Clinic', industry: 'Healthcare', problem: 'Struggling to attract new patients and establish trust in local market.', strategy: 'Local SEO, Google My Business management, patient testimonial videos, and educational content series.', results: [{ metric: 'New Patients', value: '+200%' }, { metric: 'Local Rankings', value: 'Top 3' }, { metric: 'Appointment Rate', value: '85%' }] },
  { id: 4, clientName: 'EduTech Academy', industry: 'Education', problem: 'Low course enrollment and high cost per acquisition from existing marketing channels.', strategy: 'Multi-channel approach combining Facebook Ads, email automation, webinar funnels, and affiliate partnerships.', results: [{ metric: 'Enrollments', value: '+400%' }, { metric: 'CPA Reduction', value: '-60%' }, { metric: 'ROI', value: '450%' }] },
  { id: 5, clientName: 'GreenLeaf Organics', industry: 'Food & Beverage', problem: 'Limited brand awareness and difficulty reaching health-conscious consumers.', strategy: 'Instagram-first strategy with micro-influencer collaborations, user-generated content, and shoppable posts.', results: [{ metric: 'Instagram Followers', value: '+15K' }, { metric: 'Online Sales', value: '+320%' }, { metric: 'Engagement Rate', value: '8.2%' }] },
  { id: 6, clientName: 'PropTech Realty', industry: 'Real Estate', problem: 'Outdated digital presence and inability to generate qualified property inquiries.', strategy: 'Complete website redesign, virtual tour integration, targeted LinkedIn campaigns, and automated lead nurturing.', results: [{ metric: 'Qualified Leads', value: '+280%' }, { metric: 'Website Traffic', value: '+500%' }, { metric: 'Sales Cycle', value: '-35%' }] },
];

const industryColors: Record<string, string> = {
  Technology: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  'E-commerce': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  Healthcare: 'text-green-400 bg-green-500/10 border-green-500/20',
  Education: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  'Food & Beverage': 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  'Real Estate': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
};

export default function CaseStudiesPage() {
  const router = useRouter();

  return (
    <DarkPageWrapper>
      <PremiumNavbar />
      <DarkHero
        eyebrow="Case Studies"
        title="Real Results for"
        gradientTitle="Real Businesses"
        subtitle="See how we've helped businesses across industries achieve measurable growth and transform their digital presence."
      />

      <DarkSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((study, i) => (
            <FadeIn key={study.id} delay={i * 0.08}>
              <div className="flex flex-col h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-7 hover:border-purple-500/30 transition-all duration-300 group">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <h3 className="text-xl font-bold text-white">{study.clientName}</h3>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${industryColors[study.industry] || 'text-white/50 bg-white/5 border-white/10'}`}>
                    {study.industry}
                  </span>
                </div>

                {/* Challenge */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-1">The Challenge</p>
                  <p className="text-white/50 text-sm leading-relaxed">{study.problem}</p>
                </div>

                {/* Strategy */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-purple-400 uppercase tracking-wide mb-1">Our Strategy</p>
                  <p className="text-white/50 text-sm leading-relaxed">{study.strategy}</p>
                </div>

                {/* Results */}
                <div className="grid grid-cols-3 gap-2 mb-5 rounded-xl bg-white/[0.04] border border-white/8 p-4">
                  {study.results.map((r, j) => (
                    <div key={j} className="text-center">
                      <div className="text-xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{r.value}</div>
                      <div className="text-xs text-white/40 mt-1 leading-tight">{r.metric}</div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                {study.testimonial && (
                  <div className="mb-5 pl-4 border-l-2 border-purple-500/40">
                    <p className="text-white/40 text-sm italic leading-relaxed">&ldquo;{study.testimonial}&rdquo;</p>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-auto pt-4 border-t border-white/10">
                  <DarkGradientBtn onClick={() => router.push('/audit')} className="w-full">
                    Get Similar Results
                  </DarkGradientBtn>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </DarkSection>

      <DarkCTABanner
        title="Want Results Like These?"
        subtitle="Let&apos;s create your success story together. Book a free strategy session today."
        ctaLabel="Book Your Free Strategy Call"
        onCtaClick={() => router.push('/audit')}
      />

      <Footer />
    </DarkPageWrapper>
  );
}
