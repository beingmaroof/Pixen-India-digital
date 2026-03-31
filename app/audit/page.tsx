"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer } from '@/components';
import { DarkPageWrapper } from '@/components/DarkUI';
import { supabase } from '@/lib/supabase';

/* ───────────────────────── types ───────────────────────── */
interface FormData {
  // Step 1
  name: string;
  email: string;
  phone: string;
  // Step 2
  businessType: string;
  revenue: string;
  channels: string[];
  // Step 3
  goals: string[];
  customGoal: string;
  budget: string;
  timeline: string;
}

const INITIAL: FormData = {
  name: '', email: '', phone: '',
  businessType: '', revenue: '', channels: [],
  goals: [], customGoal: '', budget: '', timeline: '',
};

const TOTAL_STEPS = 4;

/* ───────────────────── step config ─────────────────────── */
const BUSINESS_TYPES = ['E-Commerce', 'SaaS / Software', 'Local Business', 'Agency / Freelancer', 'D2C Brand', 'B2B Company', 'Healthcare / Clinic', 'Real Estate', 'Education / EdTech', 'Other'];
const REVENUE_RANGES = ['< ₹1L/month', '₹1L – ₹5L/month', '₹5L – ₹20L/month', '₹20L – ₹1Cr/month', '₹1Cr+/month', 'Pre-revenue / Startup'];
const CHANNELS = ['Google Ads', 'Meta Ads (FB/IG)', 'SEO / Organic', 'Content Marketing', 'YouTube', 'Influencer Marketing', 'Email Marketing', 'WhatsApp Marketing', 'None yet'];
const GOALS_LIST = ['Generate more leads', 'Increase revenue / ROAS', 'Reduce cost per acquisition', 'Improve brand awareness', 'Launch a new product', 'Enter a new market', 'Scale existing campaigns', 'Build organic presence'];
const BUDGET_RANGES = ['₹30K – ₹1L/month', '₹1L – ₹3L/month', '₹3L – ₹5L/month', '₹5L – ₹10L/month', '₹10L+/month', 'Not sure yet'];
const TIMELINES = ['ASAP — I need results yesterday', 'Within 30 days', 'Next 2–3 months', 'Planning for next quarter', 'Just exploring'];

/* ─────────────────── small helpers ─────────────────────── */
function StepDot({ index, current }: { index: number; current: number }) {
  const done = index < current;
  const active = index === current;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
        done ? 'bg-gradient-to-br from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/30' :
        active ? 'bg-gradient-to-br from-purple-600 to-blue-500 text-white ring-4 ring-purple-500/20 shadow-lg shadow-purple-500/30' :
        'bg-white/10 text-white/30'
      }`}>
        {done ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
        ) : index + 1}
      </div>
      <span className={`text-[10px] font-semibold tracking-wide ${active ? 'text-purple-400' : done ? 'text-white/60' : 'text-white/20'}`}>
        {['Details', 'Business', 'Goals', 'Schedule'][index]}
      </span>
    </div>
  );
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {[0, 1, 2, 3].map((i) => (
        <React.Fragment key={i}>
          <StepDot index={i} current={step} />
          {i < 3 && (
            <div className="h-px w-10 sm:w-16 mx-1 mt-[-12px]">
              <div className={`h-full transition-all duration-500 ${i < step ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-white/10'}`} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function CheckboxChip({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button type="button" onClick={onChange}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 text-left ${
        checked
          ? 'border-purple-500/60 bg-purple-500/15 text-purple-300'
          : 'border-white/10 bg-white/5 text-white/50 hover:border-white/25 hover:text-white/70'
      }`}>
      <span className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${checked ? 'border-purple-400 bg-purple-500' : 'border-white/20 bg-transparent'}`}>
        {checked && <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
      </span>
      {label}
    </button>
  );
}

const inputClass = "w-full bg-[#02030A] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-white/20 outline-none";
const labelClass = "block text-sm font-semibold text-white/60 mb-2 uppercase tracking-wider";
const selectClass = `${inputClass} cursor-pointer`;

/* ─────────────────────── main page ─────────────────────── */
export default function AuditPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* helpers */
  const set = (field: keyof FormData, value: any) => setForm(f => ({ ...f, [field]: value }));
  const toggleArr = (field: 'channels' | 'goals', val: string) => {
    setForm(f => {
      const arr = f[field] as string[];
      return { ...f, [field]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] };
    });
  };

  /* validation per step */
  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!form.name.trim()) e.name = 'Name is required';
      if (!form.email.trim()) e.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
      if (!form.phone.trim()) e.phone = 'Phone is required';
      else if (!/^\+?[\d\s\-]{8,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    }
    if (step === 1) {
      if (!form.businessType) e.businessType = 'Please select your business type';
      if (!form.revenue) e.revenue = 'Please select a revenue range';
      if (form.channels.length === 0) e.channels = 'Select at least one channel';
    }
    if (step === 2) {
      if (form.goals.length === 0) e.goals = 'Select at least one goal';
      if (!form.budget) e.budget = 'Please select a budget range';
      if (!form.timeline) e.timeline = 'Please select a timeline';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const saveLead = async () => {
    // Wrap in a 10-second timeout so a slow/failed DB call never blocks the user
    const savePromise = supabase.from('leads').insert([{
      name: form.name,
      email: form.email,
      phone: form.phone,
      business_type: form.businessType,
      revenue_range: form.revenue,
      current_channels: form.channels,
      goals: form.goals.concat(form.customGoal ? [form.customGoal] : []),
      budget_range: form.budget,
      timeline: form.timeline,
      source: 'audit_form',
      created_at: new Date().toISOString(),
    }]);
    const timeout = new Promise<void>((resolve) => setTimeout(resolve, 10000));
    try {
      await Promise.race([savePromise, timeout]);
    } catch (err) {
      // Silently continue — user still sees the scheduling page
      console.error('Lead save error:', err);
    }
  };

  const handleNext = async () => {
    if (!validate()) return;
    if (step === 2) {
      setSubmitting(true);
      try {
        await saveLead();
      } finally {
        // Always advance — never leave user stuck on submitting state
        setSubmitting(false);
        setSubmitted(true);
        setStep(3);
      }
      return; // step already set above
    }
    setStep(s => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const handleBack = () => { setErrors({}); setStep(s => Math.max(s - 1, 0)); };

  /* ────────── render ────────── */
  return (
    <DarkPageWrapper>
      <PremiumNavbar />

      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }} />
      </div>

      <main className="relative z-10 min-h-screen flex items-center justify-center pt-24 pb-20 px-6">
        <div className="w-full max-w-2xl">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold tracking-[0.15em] uppercase mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Free Growth Audit
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Let&apos;s Build Your{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Growth Strategy</span>
            </h1>
            <p className="text-white/50 mt-3 max-w-lg mx-auto text-sm leading-relaxed">
              Tell us about your business. We&apos;ll prepare a personalised audit and schedule a strategy call with your dedicated account manager.
            </p>
          </div>

          {/* Progress */}
          <ProgressBar step={step} />

          {/* Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10 shadow-2xl">

            {/* ─── STEP 0: User Details ─── */}
            {step === 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Your Details</h2>
                <p className="text-white/40 text-sm mb-8">We&apos;ll use this to prepare your personalised audit and send you the report.</p>
                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input value={form.name} onChange={e => set('name', e.target.value)} className={inputClass} placeholder="e.g. Arjun Kumar" />
                    {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className={inputClass} placeholder="you@company.com" />
                    {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number *</label>
                    <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className={inputClass} placeholder="+91 98765 43210" />
                    {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 1: Business Info ─── */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-1">About Your Business</h2>
                <p className="text-white/40 text-sm mb-8">This helps us tailor the audit to your exact industry and situation.</p>
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Business Type *</label>
                    <select value={form.businessType} onChange={e => set('businessType', e.target.value)} className={selectClass}>
                      <option value="" className="bg-gray-900">Select your business type</option>
                      {BUSINESS_TYPES.map(t => <option key={t} value={t} className="bg-gray-900">{t}</option>)}
                    </select>
                    {errors.businessType && <p className="mt-1.5 text-xs text-red-400">{errors.businessType}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Monthly Revenue *</label>
                    <select value={form.revenue} onChange={e => set('revenue', e.target.value)} className={selectClass}>
                      <option value="" className="bg-gray-900">Select current revenue range</option>
                      {REVENUE_RANGES.map(r => <option key={r} value={r} className="bg-gray-900">{r}</option>)}
                    </select>
                    {errors.revenue && <p className="mt-1.5 text-xs text-red-400">{errors.revenue}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Current Marketing Channels *</label>
                    <p className="text-white/30 text-xs mb-3">Select all that apply</p>
                    <div className="flex flex-wrap gap-2">
                      {CHANNELS.map(c => (
                        <CheckboxChip key={c} label={c} checked={form.channels.includes(c)} onChange={() => toggleArr('channels', c)} />
                      ))}
                    </div>
                    {errors.channels && <p className="mt-2 text-xs text-red-400">{errors.channels}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 2: Goals & Budget ─── */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Goals & Budget</h2>
                <p className="text-white/40 text-sm mb-8">Help us understand what success looks like for you.</p>
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Primary Goals *</label>
                    <p className="text-white/30 text-xs mb-3">Select all that apply</p>
                    <div className="flex flex-wrap gap-2">
                      {GOALS_LIST.map(g => (
                        <CheckboxChip key={g} label={g} checked={form.goals.includes(g)} onChange={() => toggleArr('goals', g)} />
                      ))}
                    </div>
                    {errors.goals && <p className="mt-2 text-xs text-red-400">{errors.goals}</p>}
                    <div className="mt-3">
                      <input value={form.customGoal} onChange={e => set('customGoal', e.target.value)}
                        className={inputClass} placeholder="Or describe a custom goal (optional)" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Monthly Marketing Budget *</label>
                    <select value={form.budget} onChange={e => set('budget', e.target.value)} className={selectClass}>
                      <option value="" className="bg-gray-900">Select your budget range</option>
                      {BUDGET_RANGES.map(b => <option key={b} value={b} className="bg-gray-900">{b}</option>)}
                    </select>
                    {errors.budget && <p className="mt-1.5 text-xs text-red-400">{errors.budget}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Timeline to Start *</label>
                    <select value={form.timeline} onChange={e => set('timeline', e.target.value)} className={selectClass}>
                      <option value="" className="bg-gray-900">When do you want to start?</option>
                      {TIMELINES.map(t => <option key={t} value={t} className="bg-gray-900">{t}</option>)}
                    </select>
                    {errors.timeline && <p className="mt-1.5 text-xs text-red-400">{errors.timeline}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 3: Schedule ─── */}
            {step === 3 && (
              <div className="text-center">
                {/* Success checkmark */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #A855F7, #3B82F6)' }}>
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">You&apos;re All Set, {form.name.split(' ')[0]}!</h2>
                <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md mx-auto">
                  Your information has been received. Our team will review your details and come prepared for a focused strategy session.
                  <br /><br />
                  Click below to schedule your <span className="text-purple-300 font-semibold">Free 30-Min Strategy Call</span> with us:
                </p>

                {/* Meeting CTA */}
                <a
                  href="https://meet.google.com/sin-fcbk-sft"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-base relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-1 mb-6"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <svg className="w-5 h-5 relative flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 15.5v-7l6 3.5-6 3.5z" />
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16z" clipRule="evenodd" />
                  </svg>
                  <span className="relative">Schedule Strategy Call on Google Meet</span>
                  <svg className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                {/* Info cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                  {[
                    { icon: '⏱', title: '30 Minutes', sub: 'Strategy deep dive' },
                    { icon: '🎯', title: 'Personalised', sub: 'Based on your answers' },
                    { icon: '🚀', title: 'Actionable', sub: 'Growth roadmap in hand' },
                  ].map((c, i) => (
                    <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                      <div className="text-2xl mb-1">{c.icon}</div>
                      <p className="text-white font-semibold text-sm">{c.title}</p>
                      <p className="text-white/40 text-xs mt-0.5">{c.sub}</p>
                    </div>
                  ))}
                </div>

                <p className="text-white/30 text-xs mt-8">
                  We&apos;ll also send a confirmation to <span className="text-white/50">{form.email}</span>
                </p>

                <button onClick={() => router.push('/')}
                  className="mt-4 text-white/40 hover:text-white/70 text-sm transition-colors underline underline-offset-2">
                  Return to homepage
                </button>
              </div>
            )}

            {/* Navigation buttons */}
            {step < 3 && (
              <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/10">
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  className="px-6 py-3 rounded-xl font-semibold text-white/50 border border-white/10 hover:bg-white/5 hover:text-white transition-all disabled:opacity-0 disabled:pointer-events-none"
                >
                  ← Back
                </button>
                <div className="text-xs text-white/30 font-medium">Step {step + 1} of 3</div>
                <button
                  onClick={handleNext}
                  disabled={submitting}
                  className="group relative px-8 py-3 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-60"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center gap-2">
                    {submitting && <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />}
                    {step === 2 ? (submitting ? 'Submitting…' : 'View Schedule →') : 'Continue →'}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Trust line */}
          <div className="mt-6 flex justify-center gap-6 text-xs text-white/25 font-medium">
            {['🔒 100% Confidential', '✅ No Spam', '⚡ Response within 24hrs'].map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </DarkPageWrapper>
  );
}
