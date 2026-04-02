"use client";

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { trackEvent } from '@/lib/analytics';
import Link from 'next/link';
import { useLeadStore } from '@/store/leadStore';

// Honeypot locally stored
const INITIAL_HONEYPOT = '';

/* ───────────────────── constants ─────────────────────── */
const BUSINESS_TYPES = [
  'E-Commerce / D2C Brand', 
  'Tech Startup / SaaS', 
  'Service Business (CA, Doctor, Consultant etc.)', 
  'Local Business / Restaurant / Salon', 
  'Agency / Freelancer', 
  'Enterprise (200+ employees)', 
  'Other'
];

const BUDGET_RANGES = [
  'Below ₹50,000 / month', 
  '₹50,000 – ₹1,00,000 / month', 
  '₹1,00,000 – ₹3,00,000 / month', 
  '₹3,00,000 – ₹5,00,000 / month', 
  'Above ₹5,00,000 / month'
];

const TOTAL_STEPS = 4;

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
        {['Details', 'Business', 'Message', 'Done'][index]}
      </span>
    </div>
  );
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10 w-full">
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

const inputClass = "w-full bg-[#02030A] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-white/20 outline-none";
const labelClass = "block text-sm font-semibold text-white/60 mb-2 uppercase tracking-wider";
const selectClass = `${inputClass} cursor-pointer`;

export default function ContactForm() {
  const [step, setStep] = useState(0);
  const formState = useLeadStore();
  const [honeypot, setHoneypot] = useState(INITIAL_HONEYPOT);

  const form = { ...formState, website_url: honeypot };
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  /* helpers */
  const set = (field: string, value: any) => {
    if (field === 'website_url') setHoneypot(value);
    else formState.updateField(field as any, value);
  };

  /* validation per step */
  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Full name required (min 2 chars)';
      if (!form.email.trim()) e.email = 'Email required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address';
      if (form.phone.trim()) {
        const cleaned = form.phone.replace(/\s+/g, '').replace(/^\+91/, '');
        if (!/^[6-9]\d{9}$/.test(cleaned)) e.phone = 'Invalid 10-digit mobile number';
      }
    }
    if (step === 1) {
      if (!form.businessType) e.businessType = 'Please select your business type';
      if (!form.budget) e.budget = 'Please select your budget range';
    }
    if (step === 2) {
      if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Please describe your request (min 10 chars)';
    }
    setErrors(e);

    // Auto-scroll to first error
    if (Object.keys(e).length > 0) {
      setTimeout(() => {
        const firstErrorField = Object.keys(e)[0];
        const element = document.getElementsByName(firstErrorField)[0] as HTMLElement;
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
      }, 50);
    }

    return Object.keys(e).length === 0;
  };

  const handleBack = () => { setErrors({}); setStep(s => Math.max(s - 1, 0)); };

  const handleNext = async () => {
    if (!validate()) return;
    if (step === 2) {
      setSubmitting(true);
      trackEvent('form_submit_attempt');
      
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...form,
            source: 'contact_form',
            utm_source: new URLSearchParams(window.location.search).get('utm_source') || '',
            utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || '',
            utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || '',
          }),
        });
  
        if (response.ok) {
          trackEvent('lead_conversion', { value: form.budget });
          toast.success('Your request has been submitted');
          // Fire confirmation email
          fetch('/api/send-confirmation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: form.email,
              phone: form.phone,
              name: form.name,
              type: 'contact_confirmation',
            }),
          }).catch(() => {});
          formState.resetForm();
          setStep(3); // Go to success
        } else {
          const err = await response.json().catch(() => ({}));
          const errMsg = err?.error || 'Something went wrong';
          setSubmitError(errMsg);
          toast.error(errMsg);
        }
      } catch {
        setSubmitError('Network error. Please try again.');
        toast.error('Network error. Please try again.');
      } finally {
        setSubmitting(false);
      }
      return;
    }
    setStep(s => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  return (
    <div className="w-full flex-1">
      {/* Progress */}
      <ProgressBar step={step} />

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10 shadow-2xl">
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          {/* Anti-spam honeypot */}
          <input 
            type="text" name="website_url" value={form.website_url || ''} 
            onChange={e => set('website_url', e.target.value)} 
            style={{ display: 'none' }} tabIndex={-1} autoComplete="off" 
          />

          {/* ─── STEP 0: Contact Info ─── */}
          {step === 0 && (
            <div className="animate-fade-in-up">
              <h2 className="text-xl font-bold text-white mb-1">Your Details</h2>
              <p className="text-white/40 text-sm mb-8">We&apos;ll use this to get back to you.</p>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input name="name" value={form.name} onChange={e => set('name', e.target.value)} className={inputClass} placeholder="e.g. Arjun Kumar" autoFocus />
                  {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <label className={labelClass}>Business Email *</label>
                  <input name="email" type="email" value={form.email} onChange={e => set('email', e.target.value)} className={inputClass} placeholder="rahul@yourbusiness.com" />
                  {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                </div>
                <div>
                  <label className={labelClass}>WhatsApp Number</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-medium">+91</span>
                    <input name="phone" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className={`${inputClass} pl-12`} placeholder="98765 43210" />
                  </div>
                  {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 1: Business Info ─── */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <h2 className="text-xl font-bold text-white mb-1">About Your Business</h2>
              <p className="text-white/40 text-sm mb-8">This helps us understand your needs.</p>
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>Business Type *</label>
                  <select name="businessType" value={form.businessType} onChange={e => set('businessType', e.target.value)} className={selectClass} autoFocus>
                    <option value="" className="bg-gray-900">Select your business type</option>
                    {BUSINESS_TYPES.map(t => <option key={t} value={t} className="bg-gray-900">{t}</option>)}
                  </select>
                  {errors.businessType && <p className="mt-1.5 text-xs text-red-400">{errors.businessType}</p>}
                </div>
                <div>
                  <label className={labelClass}>Monthly Marketing Budget *</label>
                  <select name="budget" value={form.budget} onChange={e => set('budget', e.target.value)} className={selectClass}>
                    <option value="" className="bg-gray-900">Select your budget range</option>
                    {BUDGET_RANGES.map(b => <option key={b} value={b} className="bg-gray-900">{b}</option>)}
                  </select>
                  {errors.budget && <p className="mt-1.5 text-xs text-red-400">{errors.budget}</p>}
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white/70">
                  <span className="font-semibold text-purple-400">Why we ask:</span> Budget helps us recommend the right growth strategy for your stage. 
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 2: Goals / Message ─── */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <h2 className="text-xl font-bold text-white mb-1">How can we help?</h2>
              <p className="text-white/40 text-sm mb-8">Describe your goals or what you&apos;re looking to achieve.</p>
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>Your Message / Challenge *</label>
                  <textarea
                    name="message"
                    value={form.message} onChange={e => set('message', e.target.value)} rows={5}
                    className={`${inputClass} resize-none`} autoFocus
                    placeholder="We get traffic but very few leads convert. Looking to scale..."
                  />
                  {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
                  <p className="mt-1.5 text-xs text-white/30">{form.message.length} characters (minimum 10 required)</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-sm text-purple-300 flex gap-3">
                  <span className="text-lg">💡</span>
                  <span>The more specific you are, the better our recommendations will be.</span>
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 3: Success ─── */}
          {step === 3 && (
            <div className="text-center animate-fade-in-up">
              {/* Animated success ring */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 opacity-20 animate-ping" />
                <div className="relative w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-400">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">Message Sent, {form.name.split(' ')[0]}! 🎉</h2>
              <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
                We review every request personally and will reply to <strong className="text-white">{form.email}</strong> within <span className="text-purple-300 font-semibold">24 hours</span>.
              </p>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/917827717445?text=Hi%20Pixen%20India!%20I%20just%20submitted%20a%20contact%20request%20for%20${encodeURIComponent(form.name)}.%20Looking%20forward%20to%20connecting!`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-green-900 bg-green-400 text-base relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/30 hover:-translate-y-1 mb-6"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400" />
                <svg className="w-6 h-6 relative flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="relative">Chat directly on WhatsApp</span>
              </a>

              <div className="flex flex-col gap-3">
                <Link href="/case-studies" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/5 text-white/80 font-semibold hover:bg-white/10 transition-all border border-white/10 hover:border-white/20">
                  Explore Client Results
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
                <button type="button" onClick={() => { setStep(0); setHoneypot(INITIAL_HONEYPOT); }} className="text-white/30 hover:text-white/70 text-sm transition-colors mt-2">
                  Submit another request
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 3 && (
            <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/10">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0}
                className="px-6 py-3 rounded-xl font-semibold text-white/50 border border-white/10 hover:bg-white/5 hover:text-white transition-all disabled:opacity-0 disabled:pointer-events-none"
              >
                ← Back
              </button>
              <div className="text-xs text-white/30 font-medium">Step {step + 1} of 3</div>
              <button
                type="submit"
                disabled={submitting}
                className="group relative px-8 py-3 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-60"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  {submitting && <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />}
                  {step === 2 ? (submitting ? 'Sending...' : 'Send Message →') : 'Continue →'}
                </span>
              </button>
            </div>
          )}
          
          {submitError && step < 3 && (
            <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
              <p className="text-red-400 font-semibold">{submitError}</p>
            </div>
          )}
        </form>
      </div>

      <div className="mt-6 flex justify-center gap-6 text-xs text-white/25 font-medium">
        {['🔒 100% Secure', '⚡ Quick Response', '✅ No Spam'].map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
