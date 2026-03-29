import React from 'react';
import Link from 'next/link';
import { Navbar, Footer } from '@/components';

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
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            Digital Growth Insights
          </h1>
          <p className="text-xl text-gray-600">
            Expert strategies, tactical guides, and industry trends to help you scale your revenue and build unshakeable brand authority.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="group block h-full">
              <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-primary-100 to-purple-50 p-6 flex items-end relative overflow-hidden">
                  {/* Abstract background elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-200/50 rounded-full blur-3xl -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-150"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-200/50 rounded-full blur-2xl -ml-12 -mb-12 transition-transform duration-500 group-hover:scale-150"></div>
                  
                  <span className="inline-block px-4 py-1.5 bg-white/90 backdrop-blur-sm text-primary-700 text-xs font-bold tracking-wider uppercase rounded-full shadow-sm z-10 relative">
                    {post.category}
                  </span>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center text-sm font-medium text-gray-500 mb-4 space-x-4">
                    <span>{post.date}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                    <span className="text-sm font-semibold text-gray-900">{post.author}</span>
                    <span className="text-primary-600 font-medium text-sm flex items-center group-hover:underline">
                      Read Article
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
