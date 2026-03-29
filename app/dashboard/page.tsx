"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar, Footer, CalendlyEmbed } from '@/components';
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
  const { isAuthenticated, user, userData } = useAuth();
  const router = useRouter();
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          {/* Logo/Brand Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">Your Growth Hub Awaits</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Sign in to access your personalised dashboard, track your audit progress, and connect with the Pixen India team.
          </p>

          {/* Stats preview */}
          <div className="grid grid-cols-3 gap-4 mb-8 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
            {[
              { value: '+340%', label: 'Lead Growth' },
              { value: '4.2×', label: 'Avg. ROAS' },
              { value: '-45%', label: 'CPA Drop' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">{s.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push('/login')}
              className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              Sign In to Dashboard
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="flex-1 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-3.5 rounded-xl font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              Create Free Account
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-6">🔒 Secure login · No credit card required</p>
        </div>
      </div>
    );
  }

  const displayName = userData?.display_name || user?.email?.split('@')[0] || 'User';
  const activePlan = userData?.active_plan || null;
  const isPlanActive = userData?.plan_status === 'active';

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F9FB] pt-28 pb-16 font-sans selection:bg-primary-200">
        <div className="container-custom">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 animate-slide-up">
            <div>
              <p className="text-sm font-bold text-primary-600 tracking-wider uppercase mb-1">{today}</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Welcome back, {displayName}
              </h1>
              <p className="text-gray-500 mt-2 text-sm max-w-lg">
                Your growth ecosystem is active. Complete your setup below to kickstart your first campaign.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => router.push('/support')}
                className="flex-1 md:flex-none px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl shadow-sm hover:border-gray-300 hover:shadow transition-all text-sm"
              >
                Get Help
              </button>
              <button
                onClick={() => setIsCalendlyOpen(true)}
                className="flex-1 md:flex-none px-5 py-2.5 bg-gray-900 hover:bg-black text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Call
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Main Content Column (Span 2) */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              
              {/* Active Plan Bento Card */}
              <div className="relative overflow-hidden bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-gray-900">Current Plan</h2>
                      {isPlanActive ? (
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                          Active
                        </span>
                      ) : (
                        <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">
                          Pending Setup
                        </span>
                      )}
                    </div>
                    {activePlan ? (
                      <p className="text-3xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                        {activePlan}
                      </p>
                    ) : (
                      <p className="text-gray-500 font-medium">No active subscription found</p>
                    )}
                  </div>
                  
                  {!activePlan || !isPlanActive ? (
                    <button
                      onClick={() => router.push('/pricing')}
                      className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      Upgrade Plan
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push('/profile')}
                      className="text-sm font-semibold text-gray-600 hover:text-primary-600 bg-gray-50 hover:bg-primary-50 px-5 py-2.5 rounded-xl transition-colors"
                    >
                      Manage Billing
                    </button>
                  )}
                </div>
              </div>

              {/* Seamless Timeline Onboarding */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 pb-10">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900">Setup & Onboarding</h3>
                  <p className="text-sm text-gray-500 mt-1">Your dedicated team is waiting. Let's get moving.</p>
                </div>
                
                <div className="relative pl-4 md:pl-0">
                  {/* Vertical Line for mobile/desktop connecting the dots */}
                  <div className="absolute top-2 bottom-6 left-[21px] md:left-[23px] w-0.5 bg-gray-100 rounded-full"></div>
                  
                  <div className="space-y-8">
                    {[
                      {
                        title: 'Complete Business Profile',
                        desc: 'Add your company details, target audience, and current links so we can prepare your audit.',
                        action: 'Go to Profile',
                        href: '/profile',
                        status: 'current' // current, upcoming, done
                      },
                      {
                        title: 'Book Kickoff Strategy Call',
                        desc: 'Schedule a 30-min deep dive with your dedicated account manager to align on KPIs.',
                        action: 'Open Calendar',
                        isActionModal: true,
                        status: 'upcoming'
                      },
                      {
                        title: 'Share Access & Assets',
                        desc: 'Send us your logo files, brand guidelines, and ad account access via our secure WhatsApp channel.',
                        action: 'Send via WhatsApp',
                        href: 'https://wa.me/917827717445',
                        status: 'upcoming'
                      }
                    ].map((step, idx) => (
                      <div key={idx} className="relative flex gap-5 group">
                        {/* Timeline Dot */}
                        <div className="relative z-10 flex-shrink-0 mt-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                            step.status === 'done' ? 'bg-green-500 text-white ring-4 ring-green-50' :
                            step.status === 'current' ? 'bg-primary-600 text-white ring-4 ring-primary-50 shadow-md' :
                            'bg-gray-100 text-gray-400 border-2 border-white'
                          }`}>
                            {step.status === 'done' ? '✓' : idx + 1}
                          </div>
                        </div>
                        
                        <div className={`flex-1 ${step.status === 'upcoming' ? 'opacity-60' : ''}`}>
                          <h4 className={`text-base font-bold mb-1 ${step.status === 'current' ? 'text-gray-900' : 'text-gray-700'}`}>
                            {step.title}
                          </h4>
                          <p className="text-sm text-gray-500 leading-relaxed mb-4 max-w-lg">
                            {step.desc}
                          </p>
                          
                          {step.isActionModal ? (
                            <button
                              onClick={() => setIsCalendlyOpen(true)}
                              className={`text-sm font-semibold rounded-lg px-4 py-2 transition-all ${
                                step.status === 'current' ? 'bg-gray-900 text-white hover:bg-black shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {step.action}
                            </button>
                          ) : (
                            <Link href={step.href || '#'} target={step.href?.startsWith('http') ? '_blank' : '_self'}>
                              <button
                                className={`text-sm font-semibold rounded-lg px-4 py-2 transition-all ${
                                  step.status === 'current' ? 'bg-gray-900 text-white hover:bg-black shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                {step.action}
                              </button>
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Data Syncing Preview Widget */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-20 flex flex-col items-center justify-center transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary-600 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Awaiting Ad Data Connection</h3>
                  <p className="text-sm text-gray-500 mt-1 max-w-sm text-center">Your performance metrics will appear here once we connect your Meta and Google Ad accounts.</p>
                </div>
                
                {/* Blurred mockup background */}
                <div className="opacity-40 filter blur-[2px] pointer-events-none">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Campaign Performance</h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">Total Spends</div>
                      <div className="text-2xl font-bold text-gray-900">₹14,500</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">Cost per Lead</div>
                      <div className="text-2xl font-bold text-gray-900">₹240</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">Total Leads</div>
                      <div className="text-2xl font-bold text-green-600">64</div>
                    </div>
                  </div>
                  <div className="w-full h-32 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center">
                    <div className="w-full h-full p-4 flex items-end gap-2">
                      <div className="bg-blue-200 w-1/6 h-1/3 rounded-t-md"></div>
                      <div className="bg-blue-300 w-1/6 h-2/3 rounded-t-md"></div>
                      <div className="bg-blue-400 w-1/6 h-1/2 rounded-t-md"></div>
                      <div className="bg-blue-500 w-1/6 h-3/4 rounded-t-md"></div>
                      <div className="bg-blue-600 w-1/6 h-full rounded-t-md"></div>
                      <div className="bg-blue-600 w-1/6 h-5/6 rounded-t-md"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Side Column (Span 1) */}
            <div className="space-y-6 lg:space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              
              {/* Account Manager Card */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-1 relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                <div className="bg-gray-900 rounded-[22px] p-6 relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 p-1 block mb-4">
                    <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center text-2xl">
                      👋
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-lg">Pixen Support Team</h3>
                  <p className="text-green-400 text-xs font-bold uppercase tracking-wider mb-5 bg-green-400/10 px-3 py-1 rounded-full mt-2">
                    Online Now
                  </p>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    Have a question or need to send us files? Reach out to us directly on WhatsApp.
                  </p>
                  <a href="https://wa.me/917827717445" target="_blank" rel="noopener noreferrer" className="w-full">
                    <button className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-[0_0_15px_rgba(37,211,102,0.3)]">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      Chat on WhatsApp
                    </button>
                  </a>
                </div>
              </div>

              {/* Quick Links Menu */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Quick Links</h3>
                <div className="space-y-1">
                  {[
                    { title: 'Account Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', href: '/profile' },
                    { title: 'Upgrade Plan', icon: 'M13 10V3L4 14h7v7l9-11h-7z', href: '/pricing' },
                    { title: 'Support Tickets', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', href: '/support' },
                  ].map((link, idx) => (
                    <Link key={idx} href={link.href} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{link.title}</span>
                      </div>
                      <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-900 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
      
      <CalendlyEmbed isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
      
      <Footer />
    </>
  );
}
