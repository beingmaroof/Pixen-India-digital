import Link from 'next/link';
import { notFound } from 'next/navigation';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer } from '@/components';
import LinkCtaBanner from '@/components/LinkCtaBanner';
import { DarkBadge, DarkPageWrapper, DarkSection } from '@/components/DarkUI';
import { getManagedBlogPosts } from '@/lib/content-service';

function formatPublishedAt(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export async function generateStaticParams() {
  const posts = await getManagedBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const posts = await getManagedBlogPosts();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | Pixen India Digital',
    };
  }

  return {
    title: `${post.title} | Pixen India Digital`,
    description: post.excerpt,
  };
}

function renderContent(content: string) {
  return content.split('\n\n').map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={index} className="mt-10 text-2xl font-bold text-white md:text-3xl">
          {trimmed.replace('## ', '')}
        </h2>
      );
    }

    return (
      <p key={index} className="text-base leading-relaxed text-white/65">
        {trimmed}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const posts = await getManagedBlogPosts();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <DarkPageWrapper>
      <PremiumNavbar />

      <main className="pt-28 pb-20">
        <DarkSection className="pt-8">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/55 transition-colors hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to blog
            </Link>

            <article className="mt-8 rounded-[32px] border border-white/10 bg-white/5 p-8 md:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <DarkBadge>{post.category}</DarkBadge>
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/35">
                  {formatPublishedAt(post.publishedAt)}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/35">
                  {post.readTime}
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">{post.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/55">{post.excerpt}</p>

              <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-500 text-lg font-bold text-white">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{post.author}</p>
                  <p className="text-sm text-white/40">Pixen content desk</p>
                </div>
              </div>

              <div className="mt-10 space-y-5">{renderContent(post.content)}</div>
            </article>
          </div>
        </DarkSection>

        <LinkCtaBanner
          title="Want this applied to your own funnel?"
          subtitle="Request an audit and we will show you the exact conversion leaks, opportunity areas, and next priorities for your business."
          ctaLabel="Get Your Growth Audit"
          href="/audit"
        />
      </main>

      <Footer />
    </DarkPageWrapper>
  );
}
