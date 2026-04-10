import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer } from '@/components';
import { DarkBadge, DarkPageWrapper, DarkSection } from '@/components/DarkUI';
import LinkCtaBanner from '@/components/LinkCtaBanner';
import RoiCalculator from '@/components/RoiCalculator';

export const metadata = {
  title: 'ROI Calculator | Pixen India Digital',
  description:
    'Estimate how much revenue your funnel could unlock with better conversion, qualification, and follow-up systems.',
};

export default function RoiCalculatorPage() {
  return (
    <DarkPageWrapper>
      <PremiumNavbar />

      <main className="pt-28 pb-20">
        <DarkSection className="pt-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-3xl">
              <DarkBadge>Interactive Lead Magnet</DarkBadge>
              <h1 className="mt-5 text-4xl font-bold text-white md:text-6xl">
                Calculate the revenue upside hiding inside your current funnel
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-white/50">
                This tool gives your team a fast business case for improving conversion paths,
                follow-up speed, and lead quality before you spend more on traffic.
              </p>
            </div>

            <RoiCalculator />
          </div>
        </DarkSection>

        <LinkCtaBanner
          title="Ready to validate the upside with a real audit?"
          subtitle="We will turn your estimate into a prioritized growth plan with concrete fixes, channel recommendations, and a booking-ready action list."
          ctaLabel="Get Your Growth Audit"
          href="/audit"
        />
      </main>

      <Footer />
    </DarkPageWrapper>
  );
}
