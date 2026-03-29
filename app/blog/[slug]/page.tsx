import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock data
const blogPosts = [
  {
    id: 1,
    title: 'The Ultimate Guide to Performance Marketing in 2024',
    slug: 'ultimate-guide-performance-marketing',
    content: `Performance marketing is no longer just about generating clicks; it's about engineering a predictable revenue engine. In this comprehensive guide, we explore the fundamental shifts in how high-growth brands are approaching customer acquisition today.
    
    ## The Shift From Clicks to Conversions
    
    For years, brands focused on vanity metrics. Today, the most successful companies are obsessing over Customer Acquisition Cost (CAC) and Lifetime Value (LTV).
    
    ## Building a Data-Driven Foundation
    
    Before spending a single dollar on ads, you need a robust tracking infrastructure. This means proper pixel implementation, conversion API setups, and clear attribution models.
    
    ## The Role of Creative in Performance
    
    Your creative is your targeting. We'll discuss how direct-response copywriting combined with thumb-stopping visuals is the ultimate lever for lowering ad costs.`,
    date: 'March 28, 2024',
    author: 'Pixen Team',
    category: 'Marketing',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Why Your Business Needs a High-Converting Digital Pipeline',
    slug: 'high-converting-digital-pipeline',
    content: `A website that just "looks good" is a liability. Your digital presence needs to be an active participant in your sales process. Here's why you need to transition from a static brochure to a high-converting digital pipeline.
    
    ## The Anatomy of a Pipeline
    
    A digital pipeline systematically moves a stranger to a paying client. It involves clear messaging, strategic friction, and automated follow-ups.
    
    ## Removing Friction
    
    Every extra click decreases conversion rates. We explore how to streamline your User Experience (UX) to guide prospects straight to the conversion event.
    
    ## The Power of Qualification
    
    Not all leads are created equal. Discover how to use dynamic forms to disqualify bad fits and fast-track your best prospects.`,
    date: 'March 20, 2024',
    author: 'Pixen Team',
    category: 'Growth',
    readTime: '4 min read'
  },
  {
    id: 3,
    title: 'Content That Converts: Moving Beyond Vanity Metrics',
    slug: 'content-that-converts',
    content: `If your content isn't generating revenue, it's just a hobby. Here is our framework for creating content that actively drives sales and builds unshakeable authority.
    
    ## Educational vs. Entertaining
    
    While entertainment gets reach, education gets revenue. We break down the exact balance you need to strike.
    
    ## The Problem-Solution Matrix
    
    Every piece of content must map to a specific problem your target audience is facing, positioning your service as the ultimate solution.
    
    ## Call to Action Engineering
    
    "Link in bio" doesn't cut it anymore. Learn how to craft compelling CTAs that create genuine urgency and desire.`,
    date: 'March 15, 2024',
    author: 'Pixen Team',
    category: 'Content Strategy',
    readTime: '6 min read'
  }
];

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: `${post.title} | Pixen India Digital`,
    description: post.content.substring(0, 160) + '...',
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Simple Markdown-like renderer for the content
  const renderContent = (text: string) => {
    return text.split('\\n\\n').map((paragraph, index) => {
      if (paragraph.trim().startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            {paragraph.replace('## ', '').trim()}
          </h2>
        );
      }
      return (
        <p key={index} className="text-gray-600 leading-relaxed mb-6 text-lg">
          {paragraph.trim()}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="container-custom max-w-4xl">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors mb-10 group"
        >
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>
        
        <article>
          <header className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <span className="px-4 py-1.5 bg-primary-50 text-primary-700 text-sm font-bold tracking-wider uppercase rounded-full">
                {post.category}
              </span>
              <span className="text-gray-500 font-medium">{post.date}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
              <span className="text-gray-500 font-medium">{post.readTime}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl mr-4 shadow-md">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-gray-900">{post.author}</p>
                <p className="text-gray-500 text-sm">Content Team</p>
              </div>
            </div>
          </header>
          
          <div className="w-full h-px bg-gray-100 mb-12"></div>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            {renderContent(post.content)}
          </div>
          
          <div className="mt-16 pt-10 border-t border-gray-100">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to scale your digital presence?</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Stop leaving money on the table. Partner with Pixen India Digital to build a predictable revenue engine.
              </p>
              <Link href="/contact" className="inline-block px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                Book a Free Strategy Session
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
