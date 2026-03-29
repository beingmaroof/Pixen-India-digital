"use client";

import React from 'react';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer, ContactForm } from '@/components';
import { DarkPageWrapper, DarkHero, DarkSection, DarkCTABanner, FadeIn } from '@/components/DarkUI';

const contactItems = [
  { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Email Us', value: 'Pixenindiadigital@gmail.com', href: 'mailto:Pixenindiadigital@gmail.com', color: 'purple' },
  { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Call Us', value: '+91 78277 17445', href: 'tel:+917827717445', color: 'blue' },
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'Visit Us', value: 'B/459, Gali no.6, Khadda Colony, Jaitpur, South Delhi 110044', href: undefined, color: 'purple' },
];

export default function ContactPage() {
  return (
    <DarkPageWrapper>
      <PremiumNavbar />
      <DarkHero
        eyebrow="Get In Touch"
        title="Let's Grow Your"
        gradientTitle="Business Together"
        subtitle="Ready to transform your digital presence? Fill out the form below and we'll get back to you within 24 hours."
      />

      <DarkSection>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Contact info sidebar */}
          <FadeIn className="lg:col-span-1 space-y-5">
            <h3 className="text-xl font-bold text-white mb-2">Contact Information</h3>
            <p className="text-white/40 text-sm mb-6">Have questions? We&apos;re here to help you achieve your business goals.</p>

            {contactItems.map((item, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4 hover:border-purple-500/30 transition-all duration-300">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color === 'purple' ? 'bg-purple-500/15' : 'bg-blue-500/15'}`}>
                  <svg className={`w-5 h-5 ${item.color === 'purple' ? 'text-purple-400' : 'text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-white/40 text-xs font-semibold uppercase tracking-wide mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-white/80 text-sm hover:text-purple-300 transition-colors">{item.value}</a>
                  ) : (
                    <p className="text-white/80 text-sm">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* WhatsApp */}
            <a href="https://wa.me/917827717445" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border border-green-500/30 bg-green-500/5 p-4 hover:border-green-400/50 hover:bg-green-500/10 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-green-500/15 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <div>
                <p className="text-green-400/70 text-xs font-semibold uppercase tracking-wide mb-1">WhatsApp</p>
                <p className="text-green-300 text-sm font-medium">+91 78277 17445</p>
              </div>
            </a>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wide mb-2">Working Hours</p>
              <p className="text-white/60 text-sm">Mon–Fri: 9:00 AM – 6:00 PM IST</p>
              <p className="text-white/60 text-sm">Sat: 10:00 AM – 2:00 PM IST</p>
            </div>
          </FadeIn>

          {/* Contact form */}
          <FadeIn delay={0.15} className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </DarkSection>

      <DarkCTABanner
        title="Prefer to talk directly?"
        subtitle="Schedule a free 30-minute strategy call with our team."
        ctaLabel="Book Your Free Call"
        onCtaClick={() => window.open('https://calendly.com/pixenindia/free-consultation', '_blank')}
      />

      <Footer />
    </DarkPageWrapper>
  );
}
