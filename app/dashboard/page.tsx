"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar, Footer } from '@/components';
import { useAuth } from '@/contexts/AuthContext';

const checklistItems = [
  {
    id: 1,
    done: false,
    emoji: '👤',
    title: 'Complete Your Profile',
    desc: 'Add your business name, logo, and contact info so our team can prepare for your audit.',
    action: 'Go to Profile',
    href: '/profile',
    color: 'primary',
  },
  {
    id: 2,
    done: false,
    emoji: '📞',
    title: 'Book Your Strategy Call',
    desc: 'Schedule a free 30-minute deep-dive call. We\'ll review your goals and present a tailored growth roadmap.',
    action: 'Book Now',
    href: 'https://calendly.com/pixenindia/free-consultation',
    external: true,
    color: 'accent',
  },
  {
    id: 3,
    done: false,
    emoji: '📤',
    title: 'Share Your Brand Assets',
    desc: 'Send us your brand kit, current ad account access, and competitors via WhatsApp so we can start the audit immediately.',
    action: 'Send on WhatsApp',
    href: 'https://wa.me/917827717445?text=Hi%20Pixen!%20I%20want%20to%20share%20my%20brand%20assets%20for%20the%20audit.',
    external: true,
    color: 'green',
  },
];

const quickStats = [
  { label: 'Avg. Lead Growth', value: '+340%', color: 'text-primary-600', bg: 'bg-primary-50' },
  { label: 'Avg. ROAS', value: '4.2×', color: 'text-accent-600', bg: 'bg-accent-50' },
  { label: 'CPA Reduction', value: '-45%', color: 'text-green-600', bg: 'bg-green-50' },
];

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <p className="text-gray-600 mb-4">Please sign in to access your dashboard.</p>
          <button
            onClick={() => router.push('/login')}
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">

            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 mb-8 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome to Your Growth Hub 🚀</h1>
                  <p className="text-primary-100 text-sm leading-relaxed max-w-lg">
                    Complete the 3 steps below to get started. Our team typically begins audits within 24 hours of receiving your assets.
                  </p>
                </div>
                <div className="hidden md:flex flex-col items-end gap-1">
                  {quickStats.map((s) => (
                    <span key={s.label} className="text-xs font-semibold text-primary-200">
                      {s.value} {s.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Onboarding Checklist */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Getting Started Checklist</h2>
                <p className="text-sm text-gray-500 mt-0.5">Complete these steps to activate your growth audit</p>
              </div>
              <div className="divide-y divide-gray-50">
                {checklistItems.map((item, i) => (
                  <div key={item.id} className="px-6 py-5 flex items-start gap-5 hover:bg-gray-50 transition-colors">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl ${
                      item.color === 'accent' ? 'bg-accent-100' :
                      item.color === 'green' ? 'bg-green-100' : 'bg-primary-100'
                    }`}>
                      {item.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Step {i + 1}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-3">{item.desc}</p>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
                            item.color === 'accent' ? 'text-accent-600 hover:text-accent-700' :
                            item.color === 'green' ? 'text-green-600 hover:text-green-700' :
                            'text-primary-600 hover:text-primary-700'
                          }`}
                        >
                          {item.action}
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                        >
                          {item.action}
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {quickStats.map((s) => (
                <div key={s.label} className={`${s.bg} rounded-xl p-5 border border-gray-100`}>
                  <div className={`text-3xl font-extrabold ${s.color} mb-1`}>{s.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{s.label}</div>
                  <div className="text-xs text-gray-400 mt-1">Avg. across all clients</div>
                </div>
              ))}
            </div>

            {/* Support */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-1">Need Help?</h3>
              <p className="text-sm text-gray-500 mb-4">Our team is available Mon–Fri, 9am–6pm IST.</p>
              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/917827717445" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 bg-green-50 hover:bg-green-100 px-4 py-2 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp Support
                </a>
                <a href="mailto:Pixenindiadigital@gmail.com"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 bg-primary-50 hover:bg-primary-100 px-4 py-2 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Us
                </a>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
