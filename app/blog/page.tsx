import React from 'react';
import Link from 'next/link';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer } from '@/components';
import { DarkPageWrapper, DarkHero, DarkSection, FadeIn } from '@/components/DarkUI';

export const metadata = {
  title: 'Blog - Pixen India Digital | Digital Growth Insights',
  description: 'Insights, strategies, and guides on digital growth, marketing, and revenue generation from the experts at Pixen India Digital.',
};

const blogPosts = [
  {
    id: 1,
    title: 'The Ultimate Guide to Performance Marketing in 2024',
    slug: 'ultimate-guide-performance-marketing',
    excerpt: 'Discover how to maximize your ROI with data-driven performance marketing strategies tailored for ambitious brands.',
    date: 'March 28, 2024',
    author: 'Pixen Team',
    category: 'Marketing',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Why Your Business Needs a High-Converting Digital Pipeline',
    slug: 'high-converting-digital-pipeline',
    excerpt: 'Stop leaking leads. Learn how to build an automated ecosystem that turns raw attention into highly qualified appointments.',
    date: 'March 20, 2024',
    author: 'Pixen Team',
    category: 'Growth',
    readTime: '4 min read'
  },
  {
    id: 3,
    title: 'Content That Converts: Moving Beyond Vanity Metrics',
    slug: 'content-that-converts',
    excerpt: 'Likes and shares don\'t pay the bills. Here\'s how to create content engineered specifically to generate sales and authority.',
    date: 'March 15, 2024',
    author: 'Pixen Team',
    category: 'Content Strategy',
    readTime: '6 min read'
  }
];

export default function BlogPage() {
  return (
    <DarkPageWrapper>
      <PremiumNavbar />
      <DarkHero
        eyebrow="Insights & Strategies"
        title="Digital Growth"
        gradientTitle="Insights"
        subtitle="Expert strategies, tactical guides, and industry trends to help you scale your revenue and build unshakeable brand authority."
      />

      <DarkSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="group block h-full">
              <FadeIn delay={i * 0.1} className="h-full">
                <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 h-full flex flex-col transform group-hover:-translate-y-1">
                  
                  {/* Image/Abstract Header */}
                  <div className="h-48 bg-white/5 p-6 flex items-end relative overflow-hidden border-b border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-[40px] -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/20 rounded-full blur-[40px] -ml-12 -mb-12 transition-transform duration-700 group-hover:scale-150" />
                    
                    <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-bold tracking-wider uppercase rounded-full shadow-sm z-10 relative">
                      {post.category}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center text-xs font-semibold text-white/40 uppercase tracking-widest mb-4 space-x-3">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h2>
                    
                    <p className="text-white/50 mb-6 leading-relaxed flex-grow line-clamp-3 text-sm">
                      {post.excerpt}
                    </p>
                    
                    {/* Footer */}
                    <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                      <span className="text-sm font-semibold text-white/80">{post.author}</span>
                      <span className="text-purple-400 font-semibold text-sm flex items-center group-hover:text-purple-300">
                        Read Article
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </FadeIn>
            </Link>
          ))}
        </div>
      </DarkSection>
      <Footer />
    </DarkPageWrapper>
  );
}
