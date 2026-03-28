"use client";

import React, { useState } from 'react';
import { Navbar, Footer, Section, Container, Badge, Button } from '@/components';
import Link from 'next/link';

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

  const fieldCls = "w-full px-4 py-3.5 border border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400 text-base";

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        
        <Section padding="xl" bgColor="gray" container={false}>
          <Container size="xl">
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <Badge variant="primary">Help & Support</Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight text-balance">
                How can we{' '}
                <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                  help you?
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                Whether you have a question about our services or need technical assistance,
                our team is here to support you.
              </p>
            </div>
          </Container>
        </Section>

        <Section padding="xl" bgColor="white" container={false}>
          <Container size="xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Direct Contact Options */}
              <div className="lg:col-span-1 space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h3>
                  <p className="text-gray-600 mb-6">
                    Our support team typically responds within 2-4 hours during business days.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email Support</h4>
                      <a href="mailto:Pixenindiadigital@gmail.com" className="text-primary-600 hover:text-primary-700 hover:underline">
                        Pixenindiadigital@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Phone Support</h4>
                      <a href="tel:+917827717445" className="text-gray-600 hover:text-primary-600 transition-colors">
                        +91 78277 17445
                      </a>
                      <p className="text-gray-500 text-sm mt-1">Available 9 AM - 6 PM IST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h3>
                  <p className="text-gray-600 mb-8">Fill out the form below and we will get back to you shortly.</p>
                  
                  {status === 'success' ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-fade-in-up">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h4>
                      <p className="text-gray-600 mb-6">We've received your request and will respond within 24 hours.</p>
                      <Button onClick={() => { setStatus('idle'); setFormData({ name: '', email: '', phone: '', problem: '' }); }} variant="outline">
                        Send another message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                          <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className={fieldCls} placeholder="John Doe" />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                          <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={fieldCls} placeholder="john@company.com" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={fieldCls} placeholder="+91 98765 43210" />
                      </div>

                      <div>
                        <label htmlFor="problem" className="block text-sm font-semibold text-gray-700 mb-2">Describe Your Problem *</label>
                        <textarea id="problem" name="problem" required rows={5} value={formData.problem} onChange={handleChange} className={`${fieldCls} resize-none`} placeholder="Please provide details about the issue you are facing..." />
                      </div>

                      {status === 'error' && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
                          {errorMessage}
                        </div>
                      )}

                      <Button 
                        type="submit" 
                        size="lg" 
                        fullWidth 
                        disabled={status === 'submitting'}
                        className="shadow-xl hover:shadow-2xl transition-all font-bold"
                      >
                        {status === 'submitting' ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
