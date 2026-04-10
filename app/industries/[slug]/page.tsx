import Link from 'next/link';
import { notFound } from 'next/navigation';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer } from '@/components';
import LinkCtaBanner from '@/components/LinkCtaBanner';
import {
  DarkBadge,
  DarkPageWrapper,
  DarkSection,
  FadeIn,
} from '@/components/DarkUI';
import { getManagedCaseStudies, getManagedIndustryPages } from '@/lib/content-service';

function matchCaseStudies(industry: string, slug: string, studies: Awaited<ReturnType<typeof getManagedCaseStudies>>) {
  const normalizedIndustry = industry.toLowerCase();
  const normalizedSlug = slug.replace(/-/g, ' ');

  const matches = studies.filter((study) => {
    const value = `${study.industry} ${study.title} ${study.summary}`.toLowerCase();
    return value.includes(normalizedIndustry) || value.includes(normalizedSlug);
  });

  if (matches.length > 0) {
    return matches.slice(0, 2);
  }

  return studies.filter((study) => study.featured).slice(0, 2);
}

export async function generateStaticParams() {
  const industries = await getManagedIndustryPages();
  return industries.map((industry) => ({
    slug: industry.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const industries = await getManagedIndustryPages();
  const industry = industries.find((item) => item.slug === params.slug);

  if (!industry) {
    return { title: 'Industry Page Not Found | Pixen India Digital' };
  }

  return {
    title: `${industry.industry} Growth Playbook | Pixen India Digital`,
    description: industry.heroSubtitle,
  };
}

export default async function IndustryPage({ params }: { params: { slug: string } }) {
  const [industries, caseStudies] = await Promise.all([
    getManagedIndustryPages(),
    getManagedCaseStudies(),
  ]);

  const industry = industries.find((item) => item.slug === params.slug);
  if (!industry) {
    notFound();
  }

  const relatedStudies = matchCaseStudies(industry.industry, industry.slug, caseStudies);

  return (
    <DarkPageWrapper>
      <PremiumNavbar />

      <main className="pt-28 pb-20">
        <DarkSection className="pt-8">
          <div className="mx-auto max-w-6xl">
            <FadeIn className="max-w-4xl">
              <Link
                href="/industries"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/55 transition-colors hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to industries
              </Link>
              <div className="mt-6 inline-flex w-fit items-center rounded-full border border-purple-500/25 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
                {industry.industry}
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">
                {industry.heroTitle}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/50">
                {industry.heroSubtitle}
              </p>
            </FadeIn>

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <FadeIn className="lg:col-span-2">
                <div className="rounded-[32px] border border-white/10 bg-white/5 p-7 md:p-8">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-red-200">What usually breaks</p>
                      <p className="mt-3 text-sm leading-relaxed text-white/70">{industry.pain}</p>
                    </div>
                    <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-blue-200">What we fix</p>
                      <p className="mt-3 text-sm leading-relaxed text-white/70">{industry.solution}</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Expected outcome</p>
                      <p className="mt-3 text-sm leading-relaxed text-white/70">{industry.promise}</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/30">What the audit will focus on</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {industry.proof.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-[#050815] px-4 py-2 text-sm font-semibold text-white/70"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {[
                      {
                        title: 'Diagnose',
                        description: 'We review your pages, offer, traffic quality, and qualification flow.',
                      },
                      {
                        title: 'Prioritize',
                        description: 'You get the fixes that matter most for better pipeline and lower wasted spend.',
                      },
                      {
                        title: 'Book',
                        description: 'We turn the audit into a strategy call with a concrete next-step roadmap.',
                      },
                    ].map((item, index) => (
                      <div key={item.title} className="rounded-2xl border border-white/10 bg-[#050815] p-5">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-sm font-bold text-white">
                          {index + 1}
                        </div>
                        <h2 className="text-lg font-bold text-white">{item.title}</h2>
                        <p className="mt-2 text-sm leading-relaxed text-white/50">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.05}>
                <div className="sticky top-28 rounded-[32px] border border-white/10 bg-gradient-to-b from-[#111827] to-[#050815] p-7">
                  <DarkBadge>Next Step</DarkBadge>
                  <h2 className="mt-5 text-2xl font-bold text-white">Turn this playbook into a live audit</h2>
                  <p className="mt-4 text-sm leading-relaxed text-white/50">
                    We will score your current setup, generate a report page, and let you book a strategy
                    call against real availability.
                  </p>
                  <div className="mt-6 space-y-3">
                    <Link
                      href={`/audit?industry=${industry.slug}`}
                      className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 px-5 py-3 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-purple-500/25"
                    >
                      {industry.ctaLabel}
                    </Link>
                    <Link
                      href="/tools/roi-calculator"
                      className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/75 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white"
                    >
                      Run ROI Calculator
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </DarkSection>

        <DarkSection className="pt-4">
          <div className="mx-auto max-w-6xl">
            <FadeIn className="mb-10 max-w-3xl">
              <DarkBadge>Relevant Proof</DarkBadge>
              <h2 className="mt-5 text-3xl font-bold text-white md:text-5xl">
                Similar growth work we have already delivered
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {relatedStudies.map((study, index) => (
                <FadeIn key={study.id} delay={index * 0.08}>
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-7">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
                          {study.industry}
                        </p>
                        <h3 className="mt-3 text-2xl font-bold text-white">{study.title}</h3>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/60">
                        {study.duration}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-white/50">{study.summary}</p>
                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {study.results.slice(0, 3).map((result) => (
                        <div key={result.metric} className="rounded-2xl border border-white/10 bg-[#050815] p-4 text-center">
                          <p className="text-2xl font-bold text-white">{result.value}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-white/35">
                            {result.metric}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-white">{study.clientName}</p>
                        <p className="text-xs text-white/35">{study.testimonialAuthor || study.testimonialRole || 'Pixen case study'}</p>
                      </div>
                      <Link
                        href={`/case-studies/${study.slug}`}
                        className="text-sm font-semibold text-purple-300 transition-colors hover:text-purple-200"
                      >
                        View case study
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </DarkSection>

        <LinkCtaBanner
          title={`Need a ${industry.industry} growth plan with real priorities?`}
          subtitle="Request the audit, review your branded report, and choose a live slot when you are ready to talk through next steps."
          ctaLabel={industry.ctaLabel}
          href={`/audit?industry=${industry.slug}`}
        />
      </main>

      <Footer />
    </DarkPageWrapper>
  );
}
