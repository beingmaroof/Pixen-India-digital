import Link from 'next/link';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer } from '@/components';
import { DarkHero, DarkPageWrapper, DarkSection, FadeIn } from '@/components/DarkUI';
import { getManagedBlogPosts } from '@/lib/content-service';

export const metadata = {
  title: 'Blog - Pixen India Digital | Digital Growth Insights',
  description:
    'Insights, strategies, and guides on digital growth, marketing, and revenue generation from Pixen India Digital.',
};

function formatPublishedAt(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function BlogPage() {
  const posts = await getManagedBlogPosts();
  const [featuredPost, ...otherPosts] = posts;

  return (
    <DarkPageWrapper>
      <PremiumNavbar />

      <DarkHero
        eyebrow="Managed Content"
        title="Digital Growth"
        gradientTitle="Insights"
        subtitle="Fresh proof, better positioning, and tactical playbooks that can now be updated from managed content instead of code edits."
      />

      <DarkSection className="pt-0">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_420px]">
          {featuredPost && (
            <FadeIn>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group flex h-full flex-col rounded-[32px] border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-purple-500/35 hover:bg-white/[0.07]"
              >
                <div className="mb-5 inline-flex w-fit items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
                  Featured Article
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/35">
                  <span>{featuredPost.category}</span>
                  <span>{formatPublishedAt(featuredPost.publishedAt)}</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl">{featuredPost.title}</h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/55">{featuredPost.excerpt}</p>
                <div className="mt-auto pt-8 text-sm font-semibold text-purple-300 transition-colors group-hover:text-purple-200">
                  Read article
                </div>
              </Link>
            </FadeIn>
          )}

          <FadeIn delay={0.05}>
            <div className="rounded-[32px] border border-white/10 bg-[#050815] p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Why this matters</p>
              <h2 className="mt-4 text-2xl font-bold text-white">Your proof engine is now easier to keep fresh</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/50">
                These posts are now sourced from the managed content layer with seed fallbacks, so new proof and
                authority assets can be published without touching the page code.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  'Use articles to pre-qualify traffic before audit submission.',
                  'Pair each article with a specific proof angle or funnel lesson.',
                  'Route high-intent readers into the ROI calculator or audit flow.',
                ].map((point) => (
                  <div key={point} className="flex gap-3 text-sm text-white/60">
                    <span className="mt-1 h-2 w-2 rounded-full bg-purple-400" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </DarkSection>

      <DarkSection className="pt-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {otherPosts.map((post, index) => (
            <FadeIn key={post.id} delay={index * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-[28px] border border-white/10 bg-white/5 p-7 transition-all duration-300 hover:border-purple-500/35 hover:bg-white/[0.07]"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/35">
                  <span>{post.category}</span>
                  <span>{formatPublishedAt(post.publishedAt)}</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="mt-5 text-2xl font-bold text-white">{post.title}</h2>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-white/50">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-sm font-semibold text-white/80">{post.author}</span>
                  <span className="text-sm font-semibold text-purple-300 transition-colors group-hover:text-purple-200">
                    Open article
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </DarkSection>

      <Footer />
    </DarkPageWrapper>
  );
}
