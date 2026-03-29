"use client";

import React, { useRef } from 'react';
import { useInView } from 'framer-motion';

// ─── Shared dark UI primitives for all inner pages ───────────────────────────

export function DarkPageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #050815 0%, #02030A 100%)' }}>
      {children}
    </div>
  );
}

export function DarkHero({
  eyebrow,
  title,
  gradientTitle,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  gradientTitle: string;
  subtitle?: string;
}) {
  return (
    <div className="relative overflow-hidden pt-28 pb-20 px-6 text-center">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)' }} />
        <div className="absolute -bottom-20 right-1/4 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto space-y-6">
        <DarkBadge>{eyebrow}</DarkBadge>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
          {title}{' '}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {gradientTitle}
          </span>
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

export function DarkBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold tracking-[0.15em] uppercase">
      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
      {children}
    </div>
  );
}

export function DarkSection({
  children,
  className = '',
  subtle = false,
}: {
  children: React.ReactNode;
  className?: string;
  subtle?: boolean;
}) {
  return (
    <section
      className={`py-20 px-6 ${className}`}
      style={subtle ? { background: 'rgba(168, 85, 247, 0.03)' } : undefined}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

export function DarkCard({
  children,
  className = '',
  featured = false,
}: {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <div className={`relative rounded-2xl p-8 border border-purple-500/40 bg-gradient-to-b from-purple-950/80 to-blue-950/40 backdrop-blur-sm hover:border-purple-400/60 transition-all duration-300 ${className}`}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-purple-500/0 via-purple-400 to-purple-500/0" />
        {children}
      </div>
    );
  }
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-purple-500/30 hover:bg-white/[0.08] transition-all duration-300 group ${className}`}>
      {children}
    </div>
  );
}

export function DarkCTABanner({
  title,
  subtitle,
  ctaLabel,
  onCtaClick,
}: {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  onCtaClick: () => void;
}) {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/15 to-purple-900/30" />
      <div className="absolute inset-0 border-y border-white/5" />
      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
        {subtitle && <p className="text-white/50 max-w-xl mx-auto">{subtitle}</p>}
        <button
          onClick={onCtaClick}
          className="group relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-1"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative">{ctaLabel}</span>
        </button>
      </div>
    </section>
  );
}

export function DarkGradientBtn({
  children,
  onClick,
  className = '',
  size = 'md',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const pad = size === 'lg' ? 'px-8 py-4 text-base' : size === 'sm' ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-sm';
  return (
    <button
      onClick={onClick}
      className={`group relative rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 ${pad} ${className}`}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
      <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="relative flex items-center gap-2 justify-center">{children}</span>
    </button>
  );
}

export function DarkOutlineBtn({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-full font-semibold text-white/70 border border-white/20 hover:bg-white/10 hover:text-white hover:border-white/40 transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

export function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export function DarkInput({
  id, label, type = 'text', placeholder, value, onChange, error, required
}: {
  id: string; label: string; type?: string; placeholder?: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string; required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-white/60 mb-1.5">{label}{required && <span className="text-red-400 ml-1">*</span>}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange as any}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all duration-200 text-sm"
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function DarkTextarea({
  id, label, placeholder, value, onChange, rows = 4, error
}: {
  id: string; label: string; placeholder?: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number; error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-white/60 mb-1.5">{label}</label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all duration-200 text-sm resize-none"
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function DarkSectionHeader({
  eyebrow, title, gradientTitle, subtitle, centered = true
}: {
  eyebrow?: string; title: string; gradientTitle?: string;
  subtitle?: string; centered?: boolean;
}) {
  return (
    <div className={`mb-14 ${centered ? 'text-center' : ''}`}>
      {eyebrow && <div className={`mb-4 ${centered ? 'flex justify-center' : ''}`}><DarkBadge>{eyebrow}</DarkBadge></div>}
      <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
        {title}{' '}
        {gradientTitle && (
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {gradientTitle}
          </span>
        )}
      </h2>
      {subtitle && <p className={`mt-4 text-white/50 max-w-2xl leading-relaxed ${centered ? 'mx-auto' : ''}`}>{subtitle}</p>}
    </div>
  );
}

export function DarkCheckItem({ text, color = 'purple' }: { text: string; color?: 'purple' | 'blue' }) {
  return (
    <li className="flex items-start gap-3">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${color === 'purple' ? 'bg-purple-500/20' : 'bg-blue-500/20'}`}>
        <svg className={`w-3 h-3 ${color === 'purple' ? 'text-purple-400' : 'text-blue-400'}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
      <span className="text-white/60 text-sm leading-relaxed">{text}</span>
    </li>
  );
}
