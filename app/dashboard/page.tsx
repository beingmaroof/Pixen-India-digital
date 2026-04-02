"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { DarkPageWrapper } from '@/components/DarkUI';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
  const { isAuthenticated, user, userData } = useAuth();
  const router = useRouter();

  // Wrap the inner dashboard content in another component so we can use useSearchParams safely in Suspense
  return (
    <Suspense fallback={
      <DarkPageWrapper>
        <PremiumNavbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="w-12 h-12 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
        </div>
      </DarkPageWrapper>
    }>
      <DashboardContent isAuthenticated={isAuthenticated} user={user} userData={userData} router={router} />
    </Suspense>
  );
}

function WelcomeModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-[#0a0a0f] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Glow */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/30 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/40 transform scale-110">
            <span className="text-4xl">🚀</span>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2">Welcome to Pixen!</h2>
          <p className="text-white/50 mb-8 text-sm">You are now officially part of our growth ecosystem.</p>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8 text-left">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Setup Progress</span>
              <span className="text-xs text-white/40">Step 1 of 3 Complete</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-white/10 rounded-full mb-5 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 w-1/3 rounded-full" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/50">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                Create Account
              </div>
              <div className="flex items-center gap-3 text-sm text-white border border-white/10 bg-white/5 px-3 py-2 rounded-xl">
                <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center shrink-0">2</div>
                Complete Profile
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center shrink-0">3</div>
                Book Action Plan Call
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { onClose(); router.push('/profile'); }}
              className="w-full relative py-3.5 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
              <span className="relative flex items-center justify-center gap-2">
                Continue Setup &rarr;
              </span>
            </button>
            <button onClick={onClose} className="text-sm font-semibold text-white/40 hover:text-white transition-colors py-2">
              Explore Dashboard instead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardContent({ isAuthenticated, user, userData, router }: any) {
  const searchParams = useSearchParams();
  const showWelcome = searchParams.get('success') === 'true';
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [latestLead, setLatestLead] = useState<any>(null);

  useEffect(() => {
    if (showWelcome) {
      setIsWelcomeModalOpen(true);
      window.history.replaceState({}, '', '/dashboard');
    }
  }, [showWelcome]);

  useEffect(() => {
    if (user?.email) {
      supabase.from('leads').select('*').eq('email', user.email).order('created_at', { ascending: false }).limit(1)
        .then(({ data }) => {
          if (data && data.length > 0) setLatestLead(data[0]);
        });
    }
  }, [user]);

  if (!isAuthenticated) {
    return (
      <DarkPageWrapper>
        <PremiumNavbar />
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)' }} />
        </div>
        <main className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-lg w-full text-center">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #A855F7, #3B82F6)' }}>
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">Your Growth Hub Awaits</h1>
            <p className="text-white/40 mb-8 leading-relaxed">Sign in to access your personalised dashboard, track your audit progress, and connect with the Pixen team.</p>
            <div className="grid grid-cols-3 gap-3 mb-8 p-5 rounded-2xl border border-white/10 bg-white/5">
              {[{ value: '+340%', label: 'Lead Growth' }, { value: '4.2×', label: 'Avg. ROAS' }, { value: '-45%', label: 'CPA Drop' }].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{s.value}</div>
                  <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => router.push('/login')}
                className="flex-1 relative py-3.5 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                <span className="relative">Sign In to Dashboard</span>
              </button>
              <button onClick={() => router.push('/signup')}
                className="flex-1 py-3.5 rounded-xl font-bold text-white/70 border border-white/20 hover:bg-white/10 hover:text-white transition-all">
                Create Free Account
              </button>
            </div>
            <p className="text-xs text-white/30 mt-5">🔒 Secure login · No credit card required</p>
          </div>
        </main>
        <Footer />
      </DarkPageWrapper>
    );
  }

  const displayName = userData?.display_name || user?.email?.split('@')[0] || 'User';
  const activePlan = userData?.active_plan || null;
  const isPlanActive = userData?.plan_status === 'active';
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const quickLinks = [
    { title: 'Account Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', href: '/profile' },
    { title: 'Upgrade Plan', icon: 'M13 10V3L4 14h7v7l9-11h-7z', href: '/pricing' },
    { title: 'Support Tickets', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', href: '/support' },
  ];

  const steps = [
    { title: 'Complete Business Profile', desc: 'Add your company details, target audience, and current links so we can prepare your audit.', action: 'Go to Profile', href: '/profile', status: 'current' },
    { title: 'Book Kickoff Strategy Call', desc: 'Schedule a 30-min deep dive with your dedicated account manager to align on KPIs.', action: 'Open Calendar', isModal: true, status: 'upcoming' },
    { title: 'Share Access & Assets', desc: 'Send us your logo files, brand guidelines, and ad account access via WhatsApp.', action: 'Send via WhatsApp', href: 'https://wa.me/917827717445', status: 'upcoming' },
  ];

  return (
    <DarkPageWrapper>
      <PremiumNavbar />
      <main className="relative z-10 min-h-screen pt-28 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <p className="text-xs font-bold text-purple-400 tracking-widest uppercase mb-1">{today}</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">Welcome back, {displayName}</h1>
              <p className="text-white/40 mt-2 text-sm">Your growth ecosystem is active. Complete your setup below to kickstart your first campaign.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => router.push('/support')}
                className="px-5 py-2.5 rounded-xl border border-white/15 text-white/60 text-sm font-semibold hover:bg-white/5 hover:text-white transition-all">
                Get Help
              </button>
              <button onClick={() => router.push('/audit')}
                className="relative px-5 py-2.5 rounded-xl font-semibold text-white text-sm overflow-hidden hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-2">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                <svg className="w-4 h-4 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span className="relative">Book Call</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main (span 2) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Plan card */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-7 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)' }} />
                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-bold text-white">Current Plan</h2>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isPlanActive ? 'bg-green-500/15 text-green-400' : 'bg-amber-500/15 text-amber-400'}`}>
                        {isPlanActive ? '● Active' : 'Pending Setup'}
                      </span>
                    </div>
                    {activePlan ? (
                      <p className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{activePlan}</p>
                    ) : <p className="text-white/40 font-medium">No active subscription found</p>}
                  </div>
                  <button onClick={() => router.push(!activePlan || !isPlanActive ? '/pricing' : '/profile')}
                    className="relative px-5 py-2.5 rounded-xl font-bold text-white text-sm overflow-hidden hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-2">
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                    <span className="relative">{!activePlan || !isPlanActive ? 'Upgrade Plan' : 'Manage Billing'}</span>
                  </button>
                </div>
              </div>

              {/* Onboarding steps */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
                <h3 className="text-lg font-bold text-white mb-1">Setup & Onboarding</h3>
                <p className="text-sm text-white/40 mb-8">Your dedicated team is waiting. Let&apos;s get moving.</p>
                <div className="relative pl-4">
                  <div className="absolute top-0 bottom-6 left-[15px] w-px bg-white/10 rounded-full" />
                  <div className="space-y-8">
                    {steps.map((step, idx) => (
                      <div key={idx} className="relative flex gap-5">
                        <div className="relative z-10 flex-shrink-0 mt-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step.status === 'current' ? 'bg-gradient-to-br from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/30' : 'bg-white/10 text-white/30'}`}>
                            {idx + 1}
                          </div>
                        </div>
                        <div className={`flex-1 ${step.status === 'upcoming' ? 'opacity-50' : ''}`}>
                          <h4 className="text-base font-bold text-white mb-1">{step.title}</h4>
                          <p className="text-sm text-white/40 leading-relaxed mb-3 max-w-lg">{step.desc}</p>
                          {step.isModal ? (
                            <button onClick={() => router.push('/audit')}
                              className={`text-sm font-semibold rounded-lg px-4 py-2 transition-all ${step.status === 'current' ? 'bg-white/10 text-white hover:bg-white/15' : 'bg-white/5 text-white/40'}`}>
                              {step.action}
                            </button>
                          ) : (
                            <Link href={step.href || '#'} target={step.href?.startsWith('http') ? '_blank' : '_self'}>
                              <span className={`inline-block text-sm font-semibold rounded-lg px-4 py-2 cursor-pointer transition-all ${step.status === 'current' ? 'bg-white/10 text-white hover:bg-white/15' : 'bg-white/5 text-white/40'}`}>
                                {step.action}
                              </span>
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Campaign widget (live tracking) */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-7 relative overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-white">Your Growth Audit Progress</h3>
                  <span className="text-xs text-white/40 flex items-center gap-1">
                    <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                    Last updated {latestLead ? new Date(latestLead.created_at).toLocaleDateString() : 'Today'}
                  </span>
                </div>
                
                {latestLead ? (
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 ring-4 ring-purple-500/10">
                      <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Audit Received</h4>
                    <p className="text-sm text-white/50 text-center max-w-sm mb-6">Our strategists are currently reviewing your details for <span className="font-semibold text-white/70">{latestLead.business_type}</span>. We will assign a specialist shortly.</p>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 bg-white/10 rounded border border-white/5 text-xs text-white/60">Status: {latestLead.status || 'In Queue'}</span>
                       <span className="px-3 py-1 bg-white/10 rounded border border-white/5 text-xs text-white/60">Priority: {latestLead.priority || 'Standard'}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 opacity-60">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">No Audit Found</h3>
                    <p className="text-sm text-white/40 max-w-sm text-center">It looks like you haven't requested a growth audit yet. Get started to ignite your pipeline.</p>
                    <button onClick={() => router.push('/audit')} className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg text-xs font-bold text-white hover:opacity-90">
                       Request Audit Now
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Support team card */}
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-purple-950/60 to-blue-950/40 p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-purple-500/0 via-purple-400 to-purple-500/0" />
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl bg-white/10">👋</div>
                <h3 className="text-white font-bold text-lg">Pixen Support Team</h3>
                <span className="inline-block mt-1 mb-4 text-green-400 text-xs font-bold uppercase tracking-wide bg-green-400/10 px-3 py-1 rounded-full">● Online Now</span>
                <p className="text-white/40 text-sm mb-5 leading-relaxed">Have a question? Reach out directly on WhatsApp.</p>
                <a href="https://wa.me/917827717445" target="_blank" rel="noopener noreferrer" className="block">
                  <button className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                    Chat on WhatsApp
                  </button>
                </a>
              </div>

              {/* Quick links */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">Quick Links</h3>
                <div className="space-y-1">
                  {quickLinks.map((link, i) => (
                    <Link key={i} href={link.href} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/8 text-white/40 flex items-center justify-center group-hover:bg-purple-500/15 group-hover:text-purple-400 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} /></svg>
                        </div>
                        <span className="text-sm font-semibold text-white/60 group-hover:text-white transition-colors">{link.title}</span>
                      </div>
                      <svg className="w-4 h-4 text-white/20 group-hover:text-white/50 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {isWelcomeModalOpen && <WelcomeModal onClose={() => setIsWelcomeModalOpen(false)} />}
      <Footer />
    </DarkPageWrapper>
  );
}
