import Link from 'next/link';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer } from '@/components';
import LinkCtaBanner from '@/components/LinkCtaBanner';
import {
  DarkHero,
  DarkPageWrapper,
  DarkSection,
  FadeIn,
} from '@/components/DarkUI';
import { getManagedCaseStudies } from '@/lib/content-service';

export default async function CaseStudiesPage() {
  const caseStudies = await getManagedCaseStudies();

  return (
    <DarkPageWrapper>
      <PremiumNavbar />
      <DarkHero
        eyebrow="Managed Proof"
        title="Real Results for"
        gradientTitle="Real Businesses"
        subtitle="These case studies now come from the managed proof layer, so your strongest sales stories can stay current without page rewrites."
      />

      <DarkSection>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {caseStudies.map((study, index) => (
            <FadeIn key={study.id} delay={index * 0.06}>
              <article className="flex h-full flex-col rounded-[28px] border border-white/10 bg-white/5 p-7 transition-all duration-300 hover:border-purple-500/35 hover:bg-white/[0.07]">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
                      {study.industry}
                    </p>
                    <h2 className="mt-3 text-2xl font-bold text-white">{study.title}</h2>
                  </div>
                  <span className="rounded-full border border-white/10 bg-[#050815] px-3 py-1 text-xs font-semibold text-white/60">
                    {study.duration}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-white/50">{study.summary}</p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {study.results.slice(0, 3).map((result) => (
                    <div key={result.metric} className="rounded-2xl border border-white/10 bg-[#050815] p-4 text-center">
                      <p className="text-2xl font-bold text-white">{result.value}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/35">
                        {result.metric}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-[#050815] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/30">The challenge</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{study.problem}</p>
                </div>

                <div className="mt-auto pt-6">
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 transition-colors hover:text-purple-200"
                  >
                    Read full case study
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </DarkSection>

      <LinkCtaBanner
        title="Want similar proof for your own brand?"
        subtitle="Request a growth audit and we will show you the leak points, priority fixes, and likely upside inside your existing funnel."
        ctaLabel="Get Your Growth Audit"
        href="/audit"
      />

      <Footer />
    </DarkPageWrapper>
  );
}
