"use client";

import React, { useState } from 'react';
import { Footer } from '@/components';
import PremiumNavbar from '@/components/PremiumNavbar';
import { DarkPageWrapper, DarkHero, DarkSection, FadeIn } from '@/components/DarkUI';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    problem: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.problem) return;
    
    setStatus('submitting');
    
    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetch('/api/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: formData.email,
            name: formData.name,
            type: 'support_confirmation',
          }),
        }).catch(() => {});
        toast.success('Message sent! We\'ll get back to you within 24 hours.');
        setStatus('success');
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Something went wrong.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Network error. Please try again.');
      setStatus('error');
    }
  };

  const fieldCls = "w-full bg-[#02030A] border border-white/10 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-white/20";
  const labelCls = "block text-sm font-bold text-white/60 mb-2 uppercase tracking-wide";

  return (
    <DarkPageWrapper>
      <PremiumNavbar />
      
      <main className="min-h-screen">
        <DarkHero
          eyebrow="Help & Support"
          title="How can we"
          gradientTitle="help you?"
          subtitle="Whether you have a question about our services or need technical assistance, our executive team is here to support you."
        />

        <DarkSection>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Direct Contact Options */}
            <div className="lg:col-span-1 space-y-10">
              <FadeIn delay={0.1}>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Contact Information</h3>
                  <p className="text-white/40 leading-relaxed">
                    Our support team typically responds within 2-4 hours during business days.
                  </p>
                </div>
              </FadeIn>

              <div className="space-y-6">
                <FadeIn delay={0.2}>
                  <div className="flex items-start space-x-5 group p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                    <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                      <svg className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1 tracking-wide">Email Support</h4>
                      <a href="mailto:Pixenindiadigital@gmail.com" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                        Pixenindiadigital@gmail.com
                      </a>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="flex items-start space-x-5 group p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                    <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                      <svg className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1 tracking-wide">Phone Support</h4>
                      <a href="tel:+917827717445" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                        +91 78277 17445
                      </a>
                      <p className="text-white/30 text-xs mt-1 uppercase tracking-wider font-semibold">Available 9 AM - 6 PM IST</p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* Support Form */}
            <div className="lg:col-span-2">
              <FadeIn delay={0.2}>
                <div className="rounded-3xl border border-white/10 bg-[#050815]/80 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-8 sm:p-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
                  
                  <div className="relative z-10">
                    <h3 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Send us a message</h3>
                    <p className="text-white/40 mb-10 font-medium">Fill out the form below and our technical team will get back to you shortly.</p>
                    
                    {status === 'success' ? (
                      <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-10 text-center animate-fade-in backdrop-blur-sm">
                        <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-3">Message Sent Successfully!</h4>
                        <p className="text-white/60 mb-8 leading-relaxed max-w-sm mx-auto">We&apos;ve received your request and our support engineers are already reviewing your case.</p>
                        <button 
                          onClick={() => { setStatus('idle'); setFormData({ name: '', email: '', phone: '', problem: '' }); }} 
                          className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors"
                        >
                          Send another message
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="name" className={labelCls}>Full Name *</label>
                            <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className={fieldCls} placeholder="John Doe" />
                          </div>
                          <div>
                            <label htmlFor="email" className={labelCls}>Email Address *</label>
                            <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={fieldCls} placeholder="john@company.com" />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="phone" className={labelCls}>Phone Number</label>
                          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={fieldCls} placeholder="+91 98765 43210" />
                        </div>

                        <div>
                          <label htmlFor="problem" className={labelCls}>Describe Your Problem *</label>
                          <textarea id="problem" name="problem" required rows={6} value={formData.problem} onChange={handleChange} className={`${fieldCls} resize-none`} placeholder="Please provide details about the issue you are facing..." />
                        </div>

                        {status === 'error' && (
                          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300 text-sm font-medium">
                            {errorMessage}
                          </div>
                        )}

                        <button 
                          type="submit" 
                          disabled={status === 'submitting'}
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg py-4 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 mt-4"
                        >
                          {status === 'submitting' ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Sending...
                            </>
                          ) : 'Submit Support Request'}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </DarkSection>
      </main>
      <Footer />
    </DarkPageWrapper>
  );
}
