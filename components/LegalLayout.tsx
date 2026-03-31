"use client";

import React from 'react';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer } from '@/components';
import { DarkPageWrapper, FadeIn } from '@/components/DarkUI';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <DarkPageWrapper>
      <PremiumNavbar />
      <main className="relative z-10 min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          
          <FadeIn>
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="p-8 md:p-12 text-center text-white relative overflow-hidden border-b border-white/10 bg-[#02030A]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full blur-[100px] -mr-32 -mt-32 opacity-10"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] -ml-32 -mb-32 opacity-10"></div>
                
                <div className="relative z-10">
                  <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-white">{title}</h1>
                  <p className="text-white/40 text-sm font-semibold tracking-widest uppercase">
                    Last Updated: {lastUpdated}
                  </p>
                </div>
              </div>

              {/* Prose Content */}
              <div className="p-8 md:p-12 bg-white/[0.02]">
                <div className="prose prose-lg prose-invert max-w-none 
                  prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-white/10
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-white/60 prose-p:leading-relaxed prose-p:mb-6
                  prose-li:text-white/60 prose-li:marker:text-purple-500
                  prose-a:text-purple-400 prose-a:font-semibold hover:prose-a:text-purple-300
                  prose-strong:text-white prose-strong:font-bold">
                  {children}
                </div>
              </div>
              
              {/* Contact Footer */}
              <div className="bg-[#02030A] p-8 md:p-12 border-t border-white/10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white mb-2">Have Questions?</h3>
                  <p className="text-white/40 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
                    If you have any questions or require further clarification about our {title.toLowerCase()}, please don&apos;t hesitate to reach out to our legal team.
                  </p>
                  <a 
                    href="mailto:Pixenindiadigital@gmail.com" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 hover:border-purple-500/50 transition-all text-sm group"
                  >
                    <svg className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Compliance Team
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
          
        </div>
      </main>
      <Footer />
    </DarkPageWrapper>
  );
}
