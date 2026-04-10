import Link from 'next/link';
import { notFound } from 'next/navigation';
import LinkCtaBanner from '@/components/LinkCtaBanner';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer } from '@/components';
import {
  DarkBadge,
  DarkPageWrapper,
  DarkSection,
} from '@/components/DarkUI';
import { getManagedCaseStudies } from '@/lib/content-service';
import { seedCaseStudies } from '@/lib/content-seed';

export async function generateStaticParams() {
  try {
    const caseStudies = await getManagedCaseStudies();
    if (caseStudies && caseStudies.length > 0) {
      return caseStudies.map((study) => ({ slug: study.slug }));
    }
  } catch {
    // fall through to seed
  }
  // Always guarantee seed slugs are statically generated
  return seedCaseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const caseStudies = await getManagedCaseStudies();
  const study = caseStudies.find((item) => item.slug === params.slug);

  if (!study) {
    return { title: 'Case Study Not Found | Pixen India Digital' };
  }

  return {
    title: `${study.title} | Pixen India Digital`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudies = await getManagedCaseStudies();
  const study = caseStudies.find((item) => item.slug === params.slug);

  if (!study) {
    notFound();
  }

  return (
    <DarkPageWrapper>
      <PremiumNavbar />

      <main className="pt-28 pb-20">
        <DarkSection className="pt-8">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/55 transition-colors hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to case studies
            </Link>

            <article className="mt-8 rounded-[32px] border border-white/10 bg-white/5 p-8 md:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <DarkBadge>{study.industry}</DarkBadge>
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/35">
                  {study.duration}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/35">
                  {study.clientName}
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">{study.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/55">{study.summary}</p>

              <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
                {study.results.map((result) => (
                  <div key={result.metric} className="rounded-2xl border border-white/10 bg-[#050815] p-5">
                    <p className="text-3xl font-bold text-white">{result.value}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.15em] text-white/35">{result.metric}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-red-200">The challenge</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">{study.problem}</p>
                </div>
                <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-blue-200">What changed</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">{study.strategy}</p>
                </div>
              </div>

              <div className="mt-10 rounded-2xl border border-white/10 bg-[#050815] p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/30">Services used</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {study.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {study.testimonial && (
                <div className="mt-10 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-6">
                  <p className="text-sm italic leading-relaxed text-white/75">&ldquo;{study.testimonial}&rdquo;</p>
                  <div className="mt-4">
                    <p className="font-semibold text-white">{study.testimonialAuthor || study.clientName}</p>
                    <p className="text-sm text-white/40">{study.testimonialRole || study.industry}</p>
                  </div>
                </div>
              )}
            </article>
          </div>
        </DarkSection>

        <LinkCtaBanner
          title="Want a similar outcome in your funnel?"
          subtitle="Book the audit and we will map where your conversions are leaking, what to fix first, and how to turn the next 90 days into measurable pipeline growth."
          ctaLabel="Get Your Growth Audit"
          href="/audit"
        />
      </main>

      <Footer />
    </DarkPageWrapper>
  );
}
