import React from 'react';
import { Navbar, Footer } from '@/components';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-32 pb-20 font-sans selection:bg-primary-200">
        <div className="container-custom max-w-4xl mx-auto">
          
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 md:p-12 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full blur-[100px] -mr-32 -mt-32 opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500 rounded-full blur-[100px] -ml-32 -mb-32 opacity-30"></div>
              
              <div className="relative z-10">
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">{title}</h1>
                <p className="text-gray-300 text-sm font-medium tracking-wide uppercase">
                  Last Updated: {lastUpdated}
                </p>
              </div>
            </div>

            {/* Prose Content */}
            <div className="p-8 md:p-12">
              <div className="prose prose-lg prose-gray max-w-none 
                prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-gray-100
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
                prose-li:text-gray-600 prose-li:marker:text-primary-500
                prose-a:text-primary-600 prose-a:font-semibold hover:prose-a:text-primary-700
                prose-strong:text-gray-900 prose-strong:font-bold">
                {children}
              </div>
            </div>
            
            {/* Contact Footer */}
            <div className="bg-gray-50 p-8 md:p-12 border-t border-gray-100 text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Have Questions?</h3>
              <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                If you have any questions or require further clarification about our {title.toLowerCase()}, please don't hesitate to reach out to our legal team.
              </p>
              <a 
                href="mailto:Pixenindiadigital@gmail.com" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-900 font-bold rounded-xl shadow-sm hover:shadow-md hover:border-primary-300 hover:text-primary-700 transition-all text-sm"
              >
                <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Compliance Team
              </a>
            </div>
          </div>
          
        </div>
      </main>
      <Footer />
    </>
  );
}
