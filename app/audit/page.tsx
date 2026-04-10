"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PremiumNavbar from '@/components/PremiumNavbar';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/Footer'));
import { DarkPageWrapper } from '@/components/DarkUI';

/* ───────────────────────── types ───────────────────────── */
interface FormData {
  // Step 1
  name: string;
  email: string;
  phone: string;
  website: string;
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
  name: '', email: '', phone: '', website: '',
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
  const [submissionError, setSubmissionError] = useState('');

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
    const savePromise = fetch('/api/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Audit request timed out.')), 10000));
    const response = await Promise.race([savePromise, timeout]);
    const json = await response.json();
      
    if (!response.ok) {
      throw new Error(json.error || 'Unable to generate your audit.');
    }
    return json;
      // Silently continue — user still sees the scheduling page
  };

  const handleNext = async () => {
    if (!validate()) return;
    if (step === 2) {
      setSubmitting(true);
      setSubmissionError('');
      try {
        const audit = await saveLead();
        fetch('/api/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: form.email,
            phone: form.phone,
            name: form.name,
            type: 'audit_report_ready',
            reportUrl: audit.reportUrl,
          }),
        }).catch(() => {});
        router.push(audit.reportUrl || `/reports/${audit.reportId}`);
        return;
      } catch (error: any) {
        setSubmissionError(error?.message || 'Unable to generate your audit.');
      } finally {
        // Always advance — never leave user stuck on submitting state
        setSubmitting(false);
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
        <button
          onClick={() => router.back()}
          className="absolute top-28 left-6 md:left-12 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all backdrop-blur-md hover:scale-105 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>

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
                  <div>
                    <label className={labelClass}>Website URL</label>
                    <input value={form.website} onChange={e => set('website', e.target.value)} className={inputClass} placeholder="https://yourwebsite.com" />
                    <p className="mt-1.5 text-xs text-white/30">Optional, but it helps us tailor the audit and report.</p>
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

            {/* ─── STEP 3: Confirmation ─── */}
            {step === 3 && (
              <div className="text-center">
                {/* Animated success ring */}
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 opacity-20 animate-ping" />
                  <div className="relative w-24 h-24 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #A855F7, #3B82F6)' }}>
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">
                  You&apos;re All Set, {form.name.split(' ')[0]}! 🎉
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                  Your growth audit request has been received. Our strategist will review your details and reach out within <span className="text-purple-300 font-semibold">24 hours</span>.
                </p>

                {/* WhatsApp CTA — primary action */}
                <a
                  href={`https://wa.me/917827717445?text=Hi%20Pixen%20India!%20I%20just%20submitted%20a%20growth%20audit%20request%20for%20${encodeURIComponent(form.name)}%20(${encodeURIComponent(form.email)}).%20Looking%20forward%20to%20connecting!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-base relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/30 hover:-translate-y-1 mb-4"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-500" />
                  <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* WhatsApp icon */}
                  <svg className="w-6 h-6 relative flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="relative">Chat with Us on WhatsApp</span>
                </a>

                <p className="text-white/25 text-xs mb-8">Fastest way to connect with our team</p>

                {/* What happens next — timeline */}
                <div className="text-left rounded-2xl border border-white/10 bg-white/5 p-6 mb-6">
                  <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-5">What Happens Next</p>
                  <div className="space-y-5">
                    {[
                      { step: '1', time: 'Within 24 hours', title: 'Team Reviews Your Details', desc: 'Our strategist studies your business, goals, and current marketing setup.' },
                      { step: '2', time: 'Day 2', title: 'Strategy Call Scheduled', desc: 'We reach out via WhatsApp or email to confirm a convenient time slot.' },
                      { step: '3', time: 'Day 3–5', title: 'Free Growth Audit Delivered', desc: 'You get a personalised audit report with actionable recommendations.' },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                          {item.step}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-white font-semibold text-sm">{item.title}</p>
                            <span className="text-[10px] text-purple-400 font-medium bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">{item.time}</span>
                          </div>
                          <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-white/30 text-xs mb-4">
                  Confirmation details sent to <span className="text-white/50">{form.email}</span>
                </p>

                <button onClick={() => router.push('/')}
                  className="text-white/40 hover:text-white/70 text-sm transition-colors underline underline-offset-2">
                  Return to homepage
                </button>
              </div>
            )}

            {submissionError && step < 3 && (
              <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {submissionError}
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
