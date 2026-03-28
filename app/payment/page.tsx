"use client";

import React, { useState } from 'react';
import { Navbar, Footer, Section, Container, Button, Badge } from '@/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Mock processing delay
    setTimeout(() => {
      setIsProcessing(false);
      alert("Payment successful! Welcome to the Growth Plan.");
      router.push('/dashboard');
    }, 2500);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <Container size="lg">
          <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Order Summary */}
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
                <Badge variant="primary" className="mb-4">Selected Plan</Badge>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Growth Plan</h2>
                <p className="text-gray-600 mb-6">Complete digital transformation and scaling for established brands.</p>
                
                <div className="flex items-end gap-2 mb-8">
                  <span className="text-4xl font-extrabold text-gray-900">₹50,000</span>
                  <span className="text-gray-500 font-medium mb-1">/month</span>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900">What's included:</h3>
                  <ul className="space-y-3">
                    {[
                      'Comprehensive Account Audit',
                      'Dedicated Strategy Architect',
                      'Custom Funnel Design',
                      'Meta & Google Ads Management',
                      'Weekly Performance Reporting',
                      '24/7 Priority Support'
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Trust badges */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 flex flex-col items-center justify-center text-center space-y-4">
                <div className="flex -space-x-3">
                  <div className="w-auto px-4 py-2 bg-gray-100 rounded-full font-bold text-gray-700 text-xs border border-white">SSL Secured</div>
                  <div className="w-auto px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-bold text-xs border border-white flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z"/></svg>
                    256-bit Encryption
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Your payment information is strictly secured and never stored on our servers.
                </p>
              </div>
            </div>

            {/* Right Column: Checkout Form */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary-600 to-accent-500"></div>
                
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Details</h2>
                  <p className="text-gray-500 text-sm">Fill out the information below to start your growth journey.</p>
                </div>

                <form onSubmit={handlePayment} className="space-y-6">
                  {/* Contact Info */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2">1. Contact Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">First Name</label>
                        <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none" placeholder="John" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Last Name</label>
                        <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none" placeholder="Doe" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                      <input type="email" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none" placeholder="john@company.com" />
                    </div>
                  </div>

                  {/* Payment Info (Mock Stripe UI) */}
                  <div className="space-y-4 pt-4">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2 flex items-center justify-between">
                      2. Payment Method
                      <div className="flex gap-1">
                        <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-[8px] text-white font-bold italic">VISA</div>
                        <div className="w-8 h-5 bg-orange-500 rounded flex items-center justify-center text-[8px] text-white font-bold italic shadow-inner">MC</div>
                      </div>
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Card Information</label>
                        <div className="relative">
                          <input type="text" required maxLength={19} className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none font-mono text-sm" placeholder="4242 4242 4242 4242" />
                          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Expiry Date</label>
                          <input type="text" required maxLength={5} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none font-mono text-sm" placeholder="MM/YY" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">CVC</label>
                          <input type="text" required maxLength={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none font-mono text-sm" placeholder="123" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Cardholder Name</label>
                        <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none uppercase text-sm" placeholder="JOHN DOE" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button 
                      type="submit" 
                      disabled={isProcessing}
                      className="w-full bg-gray-900 text-white font-bold text-lg py-4 px-6 rounded-xl hover:bg-primary-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 disabled:bg-gray-400 disabled:transform-none disabled:shadow-none"
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing Securely...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Pay ₹50,000 & Start Growth
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-4">
                      By clicking this button, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </form>

              </div>
            </div>

          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
