"use client";

import React, { useState } from 'react';
import CalendlyEmbed from './CalendlyEmbed';
import toast from 'react-hot-toast';

interface FormData {
  // Step 1
  name: string;
  email: string;
  phone: string;
  // Step 2
  businessType: string;
  budget: string;
  // Step 3
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  businessType?: string;
  budget?: string;
  message?: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

// GA tracking helper
const trackEvent = (name: string, params?: Record<string, string>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, params);
  }
};

const STEPS = [
  { title: 'Your Info', subtitle: 'Tell us who you are' },
  { title: 'Your Business', subtitle: 'Help us understand your needs' },
  { title: 'Your Goals', subtitle: 'What do you want to achieve?' },
];

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '',
    businessType: '', budget: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [submitError, setSubmitError] = useState('');

  const validateStep = (s: number): boolean => {
    const newErrors: FormErrors = {};

    if (s === 1) {
      if (!formData.name.trim() || formData.name.trim().length < 2)
        newErrors.name = 'Please enter your full name (min 2 chars)';
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = 'Please enter a valid email address';
      if (formData.phone.trim()) {
        const cleaned = formData.phone.replace(/\s+/g, '').replace(/^\+91/, '');
        if (!/^[6-9]\d{9}$/.test(cleaned))
          newErrors.phone = 'Enter a valid 10-digit Indian mobile number';
      }
    }

    if (s === 2) {
      if (!formData.businessType) newErrors.businessType = 'Please select your business type';
      if (!formData.budget) newErrors.budget = 'Please select your monthly budget';
    }

    if (s === 3) {
      if (!formData.message.trim() || formData.message.trim().length < 10)
        newErrors.message = 'Please describe your goals (min 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleNext = () => {
    if (!validateStep(step)) return;
    trackEvent('form_step_complete', { step: `step_${step}` });
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep(s => s - 1);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setSubmitStatus('submitting');
    trackEvent('form_submit_attempt');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'contact_form',
          utm_source: new URLSearchParams(window.location.search).get('utm_source') || '',
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || '',
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || '',
        }),
      });

      if (response.ok) {
        trackEvent('lead_conversion', { value: formData.budget });
        toast.success('Your request has been submitted');
        // Fire confirmation email (non-blocking)
        fetch('/api/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: formData.email,
            name: formData.name,
            type: 'contact_confirmation',
          }),
        }).catch(() => {}); // swallow errors — non-critical
        setSubmitStatus('success');
      } else {
        const err = await response.json().catch(() => ({}));
        const errMsg = err?.error || 'Something went wrong';
        setSubmitError(errMsg);
        toast.error(errMsg);
        setSubmitStatus('error');
      }
    } catch {
      setSubmitError('Network error. Please try again.');
      toast.error('Network error. Please try again.');
      setSubmitStatus('error');
    }
  };

  // --- Success State ---
  if (submitStatus === 'success') {
    return (
      <>
      <div className="w-full max-w-2xl mx-auto text-center py-12 px-8 bg-white rounded-2xl shadow-lg border border-green-100">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">You&apos;re In! 🎉</h3>
        <p className="text-lg text-gray-700 mb-2">
          Hi <span className="font-semibold text-primary-600">{formData.name}</span>, your audit request was received.
        </p>
        <p className="text-gray-600 mb-6">
          We review every application personally. Expect a response within <span className="font-bold">24 hours</span> — usually faster.
        </p>
        <div className="bg-primary-50 rounded-xl p-5 mb-6 text-left space-y-2">
          <p className="text-sm font-bold text-primary-700 uppercase tracking-wide mb-3">While You Wait</p>
          <a
            href="https://wa.me/917827717445?text=Hi%20Pixen%20India!%20I%20just%20submitted%20an%20audit%20request."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-green-700 font-semibold hover:text-green-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Chat directly on WhatsApp
          </a>
          <button
            onClick={() => setIsCalendlyOpen(true)}
            className="w-full flex items-center gap-3 text-primary-700 font-semibold hover:text-primary-800 transition-colors bg-transparent border-0 cursor-pointer"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book your strategy call immediately
          </button>
        </div>
        <button
          onClick={() => { setSubmitStatus('idle'); setStep(1); setFormData({ name: '', email: '', phone: '', businessType: '', budget: '', message: '' }); }}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Submit another request
        </button>
      </div>
      <CalendlyEmbed isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
      </>
    );
  }

  const fieldCls = (err?: string) =>
    `w-full px-4 py-3.5 border ${err ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'} rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400 text-base`;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="relative flex items-center justify-between mb-3">
          {STEPS.map((s, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                step > i + 1 ? 'bg-green-500 text-white' :
                step === i + 1 ? 'bg-primary-600 text-white shadow-lg scale-110' :
                'bg-gray-100 text-gray-400'
              }`}>
                {step > i + 1 ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : i + 1}
              </div>
              <span className={`mt-1.5 text-xs font-medium hidden sm:block ${step === i + 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                {s.title}
              </span>
            </div>
          ))}
          {/* Connecting lines */}
          <div className="absolute left-0 right-0 flex items-center pointer-events-none -z-10" style={{ paddingLeft: '16.5%', paddingRight: '16.5%', top: '18px' }}>
            <div className="flex-1 h-0.5 bg-gray-100 relative">
              <div className="absolute inset-0 bg-primary-500 transition-all duration-500" style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }} />
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-base font-semibold text-gray-900">{STEPS[step - 1].subtitle}</p>
          <p className="text-xs text-gray-400 mt-0.5">Step {step} of {STEPS.length}</p>
        </div>
      </div>

      <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>

        {/* STEP 1: Contact Info */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in-up">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                className={fieldCls(errors.name)} placeholder="Rahul Sharma" autoFocus />
              {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Business Email *</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                className={fieldCls(errors.email)} placeholder="rahul@yourbusiness.com" />
              {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                WhatsApp Number <span className="text-gray-400 font-normal">(recommended for faster response)</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">+91</span>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                  className={`${fieldCls(errors.phone)} pl-12`} placeholder="98765 43210" />
              </div>
              {errors.phone && <p className="mt-1.5 text-sm text-red-600">{errors.phone}</p>}
            </div>
          </div>
        )}

        {/* STEP 2: Business Info */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in-up">
            <div>
              <label htmlFor="businessType" className="block text-sm font-semibold text-gray-700 mb-2">Business Type *</label>
              <select id="businessType" name="businessType" value={formData.businessType} onChange={handleChange}
                className={fieldCls(errors.businessType)} autoFocus>
                <option value="">Select your business type</option>
                <option value="ecommerce">E-Commerce / D2C Brand</option>
                <option value="startup">Tech Startup / SaaS</option>
                <option value="smb">Service Business (CA, Doctor, Consultant etc.)</option>
                <option value="local">Local Business / Restaurant / Salon</option>
                <option value="agency">Agency / Freelancer</option>
                <option value="enterprise">Enterprise (200+ employees)</option>
                <option value="other">Other</option>
              </select>
              {errors.businessType && <p className="mt-1.5 text-sm text-red-600">{errors.businessType}</p>}
            </div>
            <div>
              <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">Monthly Marketing Budget *</label>
              <select id="budget" name="budget" value={formData.budget} onChange={handleChange}
                className={fieldCls(errors.budget)}>
                <option value="">Select your budget range</option>
                <option value="below-50k">Below ₹50,000 / month</option>
                <option value="50k-1L">₹50,000 – ₹1,00,000 / month</option>
                <option value="1L-3L">₹1,00,000 – ₹3,00,000 / month</option>
                <option value="3L-5L">₹3,00,000 – ₹5,00,000 / month</option>
                <option value="above-5L">Above ₹5,00,000 / month</option>
              </select>
              {errors.budget && <p className="mt-1.5 text-sm text-red-600">{errors.budget}</p>}
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
              <span className="font-semibold">Why we ask:</span> Budget helps us recommend the right growth strategy for your stage. We work with businesses across all budget ranges.
            </div>
          </div>
        )}

        {/* STEP 3: Goals */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in-up">
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                Biggest Growth Challenge / Goal *
              </label>
              <textarea
                id="message" name="message" value={formData.message} onChange={handleChange} rows={6}
                className={`${fieldCls(errors.message)} resize-none`} autoFocus
                placeholder="Example: We get traffic but very few leads convert. We want to scale from ₹50L to ₹1Cr/month revenue in 6 months through Meta ads and SEO..."
              />
              {errors.message && <p className="mt-1.5 text-sm text-red-600">{errors.message}</p>}
              <p className="mt-1.5 text-xs text-gray-400">{formData.message.length} characters (minimum 10 required)</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-sm text-amber-800 flex gap-3">
              <span className="text-lg">💡</span>
              <span>The more specific you are, the better our audit recommendations will be for your business.</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 py-3.5 px-6 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              ← Back
            </button>
          )}
          <button
            type="submit"
            disabled={submitStatus === 'submitting'}
            className={`flex-1 py-3.5 px-6 font-bold rounded-xl text-white transition-all duration-300 flex items-center justify-center gap-2
              ${submitStatus === 'submitting'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0'
              }`}
          >
            {submitStatus === 'submitting' ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </>
            ) : step === 3 ? (
              <>
                Get My Free Growth Audit
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            ) : (
              <>
                Continue →
              </>
            )}
          </button>
        </div>

        {submitStatus === 'error' && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p className="text-red-800 font-semibold">{submitError}</p>
            <p className="text-red-600 text-sm mt-1">
              Or email us at{' '}
              <a href="mailto:Pixenindiadigital@gmail.com" className="underline font-medium">
                Pixenindiadigital@gmail.com
              </a>
            </p>
          </div>
        )}

        <p className="mt-4 text-center text-xs text-gray-400">
          🔒 Your information is 100% secure and never shared with third parties.
        </p>
      </form>
    </div>
  );
}
