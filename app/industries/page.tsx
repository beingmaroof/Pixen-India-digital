import Link from 'next/link';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer } from '@/components';
import LinkCtaBanner from '@/components/LinkCtaBanner';
import {
  DarkBadge,
  DarkPageWrapper,
  DarkSection,
  FadeIn,
} from '@/components/DarkUI';
import RoiCalculator from '@/components/RoiCalculator';
import { getManagedIndustryPages } from '@/lib/content-service';

export const metadata = {
  title: 'Industry Growth Playbooks | Pixen India Digital',
  description:
    'Explore focused growth playbooks for SaaS, ecommerce, local business, healthcare, and real estate brands.',
};

export default async function IndustriesPage() {
  const industries = await getManagedIndustryPages();

  return (
    <DarkPageWrapper>
      <PremiumNavbar />

      <main className="pt-28 pb-20">
        <DarkSection className="pt-8">
          <div className="mx-auto max-w-6xl">
            <FadeIn className="mb-14 max-w-3xl">
              <DarkBadge>Industry Landing Pages</DarkBadge>
              <h1 className="mt-5 text-4xl font-bold text-white md:text-6xl">
                Growth systems designed around how each market actually converts
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-white/50">
                Different industries leak revenue in different places. These focused playbooks help
                visitors self-identify faster, see relevant proof, and move into the right audit flow.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {industries.map((industry, index) => (
                <FadeIn key={industry.id} delay={index * 0.06}>
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="group flex h-full flex-col rounded-[28px] border border-white/10 bg-white/5 p-7 transition-all duration-300 hover:border-purple-500/35 hover:bg-white/[0.07]"
                  >
                    <div className="mb-5 inline-flex w-fit items-center rounded-full border border-purple-500/25 bg-purple-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
                      {industry.industry}
                    </div>
                    <h2 className="text-2xl font-bold text-white">{industry.heroTitle}</h2>
                    <p className="mt-4 text-sm leading-relaxed text-white/50">{industry.heroSubtitle}</p>

                    <div className="mt-6 rounded-2xl border border-white/10 bg-[#050815] p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/30">Typical bottleneck</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">{industry.pain}</p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {industry.proof.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/65"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-6 text-sm font-semibold text-purple-300 transition-colors group-hover:text-purple-200">
                      Open playbook
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </DarkSection>

        <DarkSection className="pt-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-2xl">
              <DarkBadge>Budget Confidence</DarkBadge>
              <h2 className="mt-5 text-3xl font-bold text-white md:text-5xl">
                Use the ROI calculator before you commit to the audit
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/50">
                This gives visitors a faster way to quantify the opportunity and qualify themselves
                before they book time with the team.
              </p>
            </div>

            <RoiCalculator />
          </div>
        </DarkSection>

        <LinkCtaBanner
          title="Need a playbook tailored to your market?"
          subtitle="Book a growth audit and we will show you the leaks, priorities, and first 90-day opportunities specific to your business model."
          ctaLabel="Book Industry Audit"
          href="/audit"
        />
      </main>

      <Footer />
    </DarkPageWrapper>
  );
}
