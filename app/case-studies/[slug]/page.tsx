import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar, Footer, Badge, Section, Container } from '@/components';

// ─── Case Study Data ────────────────────────────────────────────────────────

interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  client: string;
  duration: string;
  challenge: string;
  solution: string[];
  results: { metric: string; value: string; color: string }[];
  testimonial: { quote: string; author: string; role: string; initials: string };
  services: string[];
}

const caseStudies: Record<string, CaseStudy> = {
  'b2b-saas-lead-growth': {
    slug: 'b2b-saas-lead-growth',
    title: '340% Lead Volume Growth in 90 Days',
    industry: 'B2B SaaS',
    client: 'TechStart Solutions',
    duration: '90 days',
    challenge:
      'TechStart Solutions was burning ₹1.5L/month on Google and LinkedIn ads with near-zero qualified lead attribution. Their landing pages had a 78% bounce rate and no CRO strategy. They had tried 2 agencies before us — both gave reports, neither moved needle.',
    solution: [
      'Complete funnel audit: identified 6 major drop-off points from ad click to demo booking',
      'Rebuilt all 3 landing pages with conversion-first copy and mobile-optimized layouts (bounce rate dropped to 34%)',
      'Restructured Google Ads campaigns into tighter ad groups with exact-match intent keywords',
      'Built a 5-step LinkedIn outbound sequence targeting Decision Makers in target verticals',
      'Implemented lead scoring in CRM to route SQL directly to sales — eliminating 60% of unqualified calls',
      'Launched Meta Retargeting for warm audiences (page visitors, video watchers)',
    ],
    results: [
      { metric: 'Lead Volume Growth', value: '+340%', color: 'text-primary-600' },
      { metric: 'Bounce Rate Reduction', value: '-57%', color: 'text-green-600' },
      { metric: 'Cost Per Lead', value: '-42%', color: 'text-blue-600' },
      { metric: 'Demo-to-Close Rate', value: '+28%', color: 'text-accent-600' },
    ],
    testimonial: {
      quote: "We were struggling to scale our inbound pipeline. Pixen came in, audited our site, fixed our funnels, and increased our lead volume by 340%. I wish we'd found them earlier.",
      author: 'Rajesh Sharma',
      role: 'CEO, TechStart Solutions',
      initials: 'RS',
    },
    services: ['Google Ads', 'Landing Page CRO', 'LinkedIn Outbound', 'Meta Retargeting', 'CRM Integration'],
  },

  'ecommerce-roas-optimization': {
    slug: 'ecommerce-roas-optimization',
    title: '4.2× ROAS — From Burning Cash to Profitable Scale',
    industry: 'E-Commerce / D2C',
    client: 'StyleHub (Fashion D2C)',
    duration: '60 days',
    challenge:
      'StyleHub was spending ₹3L/month on Meta Ads achieving 1.1× ROAS — effectively losing money. Their creative strategy was static (same 3 images since launch), their audience targeting was broad, and retargeting campaigns were absent entirely.',
    solution: [
      'Conducted a full Meta Ads audit identifying 11 structural issues in campaign architecture',
      'Rebuilt campaigns with a 3-tier funnel (Awareness → Consideration → Conversion) with dedicated budgets per stage',
      'Launched a creative testing framework: 12 ad variations per month, winning creatives scaled within 72 hours',
      'Built dynamic product catalog ads for retargeting abandoned cart users (7-day, 14-day windows)',
      'Implemented Advantage+ Shopping campaigns for bottom-of-funnel high-ROAS audiences',
      'Set up proper UTM tracking and attribution model — ROAS visibility improved dramatically',
    ],
    results: [
      { metric: 'Return on Ad Spend', value: '4.2×', color: 'text-accent-600' },
      { metric: 'Revenue Growth', value: '+280%', color: 'text-primary-600' },
      { metric: 'Ad Spend Efficiency', value: '+310%', color: 'text-green-600' },
      { metric: 'Cart Abandonment Recovery', value: '+65%', color: 'text-blue-600' },
    ],
    testimonial: {
      quote: "Their content strategy is brilliant. They understood our brand voice immediately and created visuals that actually convert. The ROI has been incredible — 4.2× ROAS in under 2 months.",
      author: 'Priya Mehta',
      role: 'Founder, StyleHub',
      initials: 'PM',
    },
    services: ['Meta Ads', 'Creative Strategy', 'Catalog Ads', 'Retargeting', 'Analytics & Attribution'],
  },

  'local-business-cpa-reduction': {
    slug: 'local-business-cpa-reduction',
    title: 'CPA Slashed by 45% — Local Business Growth at Scale',
    industry: 'Local Business / Services',
    client: 'Innovate Corp (Professional Services)',
    duration: '60 days',
    challenge:
      'Innovate Corp was running disconnected Google and Meta campaigns with no unified strategy. Their CPA was ₹4,200 per lead — far too high for their ₹8,000 average deal value. Mobile traffic was 74% of visitors but conversion rate was 0.4% on mobile (desktop was 2.1%).',
    solution: [
      'Identified mobile UX as the #1 issue — rebuilt landing page mobile-first (load time reduced from 6.2s to 1.8s)',
      'Built lookalike audiences from their existing customer CRM data (1,200 past clients)',
      'Launched geo-targeted Google Ads for high-intent local searches with call extensions',
      'Created video ad creatives (15s, testimonial-style) which outperformed static images by 3.8×',
      'Implemented automated lead follow-up via WhatsApp (response time dropped from 6 hrs to < 5 min)',
      'A/B tested 8 headline variants — winning headline increased CTR by 44%',
    ],
    results: [
      { metric: 'Cost Per Acquisition', value: '-45%', color: 'text-primary-600' },
      { metric: 'Mobile Conversion Rate', value: '+380%', color: 'text-green-600' },
      { metric: 'Page Load Speed', value: '1.8s', color: 'text-blue-600' },
      { metric: 'Lead Response Time', value: '< 5 min', color: 'text-accent-600' },
    ],
    testimonial: {
      quote: "Pixen didn't just run ads — they rebuilt our entire funnel. Customer acquisition cost plummeted by 45% while our lead quality improved dramatically. Every rupee we invest now has a clear return.",
      author: 'Amit Kumar',
      role: 'Director, Innovate Corp',
      initials: 'AK',
    },
    services: ['Google Ads', 'Mobile CRO', 'CRM Data Audiences', 'Video Creatives', 'WhatsApp Automation'],
  },
};

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cs = caseStudies[params.slug];
  if (!cs) return { title: 'Case Study Not Found' };
  return {
    title: cs.title,
    description: `${cs.industry} case study — ${cs.results[0].value} ${cs.results[0].metric} in ${cs.duration}. How Pixen India Digital achieved this result.`,
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = caseStudies[params.slug];
  if (!cs) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen">

        {/* Hero */}
        <Section padding="xl" bgColor="gray" container={false}>
          <Container size="lg">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Link href="/case-studies" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  All Case Studies
                </Link>
                <span className="text-gray-300">|</span>
                <Badge variant="secondary">{cs.industry}</Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {cs.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8">
                <span className="flex items-center gap-1.5 font-medium">
                  <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {cs.client}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {cs.duration} engagement
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cs.services.map((s) => (
                  <span key={s} className="text-xs font-semibold bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Results */}
        <section className="bg-gray-900 py-12">
          <Container size="lg">
            <p className="text-primary-300 font-bold uppercase tracking-widest text-xs mb-6">Key Results</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {cs.results.map((r, i) => (
                <div key={i} className="text-center">
                  <div className={`text-4xl font-extrabold ${r.color} mb-1`}>{r.value}</div>
                  <div className="text-sm text-gray-400 font-medium">{r.metric}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Content */}
        <Section padding="xl" bgColor="white" container={false}>
          <Container size="lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">

                {/* Challenge */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600 text-sm font-bold">!</span>
                    The Challenge
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{cs.challenge}</p>
                </div>

                {/* Solution */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-sm">✓</span>
                    What We Did
                  </h2>
                  <ul className="space-y-4">
                    {cs.solution.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-gray-600 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Testimonial */}
                <div className="bg-primary-50 border border-primary-100 rounded-2xl p-8">
                  <svg className="w-8 h-8 text-primary-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                  <p className="text-gray-700 italic text-lg leading-relaxed mb-6">{cs.testimonial.quote}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-bold">
                      {cs.testimonial.initials}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{cs.testimonial.author}</div>
                      <div className="text-sm text-gray-500">{cs.testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
                  <h3 className="font-bold text-gray-900 mb-4">Want similar results?</h3>
                  <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                    We&apos;ll audit your current setup and show you exactly where you&apos;re leaving money on the table.
                  </p>
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center py-3 px-6 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Get Free Growth Audit
                  </Link>
                  <div className="mt-4 text-center">
                    <a
                      href="https://wa.me/917827717445"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-green-600 font-semibold hover:text-green-700 flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      Or chat on WhatsApp
                    </a>
                  </div>
                  <div className="mt-5 pt-5 border-t border-gray-200 space-y-2">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-3">Services Used</p>
                    {cs.services.map((s) => (
                      <div key={s} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-3.5 h-3.5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
        <Footer />
      </main>
    </>
  );
}
