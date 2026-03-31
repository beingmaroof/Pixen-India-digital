"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import AvatarMenu from './AvatarMenu';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { href: '/#overview', label: 'Overview' },
  { href: '/services', label: 'Services' },
  { href: '/#scroll-story', label: 'Growth' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/pricing', label: 'Pricing' },
];

export default function PremiumNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleGetAudit = () => {
    setMobileOpen(false);
    router.push('/audit');
  };

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/60 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/40'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Pixen India Logo"
                  width={40}
                  height={40}
                  priority
                  className="w-10 h-10 object-contain transform group-hover:scale-110 transition-all duration-300 drop-shadow-xl"
                />
              </div>
              <span className="text-white font-bold text-xl tracking-tight hidden sm:block">
                Pixen India <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">Digital</span>
              </span>
            </Link>

            {/* Center nav links — desktop */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && !link.href.startsWith('/#') && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors duration-200 relative group ${
                      isActive ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {link.label}
                    <span className={`absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </Link>
                );
              })}
            </div>

            {/* Right CTA */}
            <div className="hidden md:flex items-center gap-4 min-w-[150px] justify-end">
              {isMounted ? (
                loading ? (
                  <div className="flex items-center gap-4 opacity-70">
                    <div className="w-16 h-4 bg-white/10 rounded animate-pulse" />
                    <div className="w-32 h-9 bg-white/10 rounded-full animate-pulse" />
                  </div>
                ) : isAuthenticated ? (
                  <>
                    <button
                      onClick={handleGetAudit}
                      className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                    >
                      Free Audit
                    </button>
                    <AvatarMenu />
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                      Sign In
                    </Link>
                    <button
                      onClick={handleGetAudit}
                      className="relative px-5 py-2 rounded-full text-sm font-semibold text-white overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 transition-opacity duration-300" />
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative">Get Free Audit</span>
                    </button>
                  </>
                )
              ) : null}
            </div>

            {/* Hamburger — mobile */}
            <button
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setMobileOpen(false)} />
        <div className={`absolute inset-y-0 right-0 w-full max-w-xs bg-gradient-to-b from-gray-950 to-black border-l border-white/10 p-8 flex flex-col gap-8 transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="mt-12 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-white/70 hover:text-white font-medium text-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-4">
            {isMounted && loading && (
                <div className="w-full h-12 bg-white/10 rounded-full animate-pulse" />
            )}
            {isMounted && !loading && !isAuthenticated && (
              <Link href="/login" onClick={() => setMobileOpen(false)} className="text-center text-white/60 hover:text-white transition-colors font-medium py-2">
                Sign In
              </Link>
            )}
            {isMounted && !loading && isAuthenticated && <AvatarMenu />}
            <button
              onClick={handleGetAudit}
              className="w-full py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            >
              Get Free Audit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
