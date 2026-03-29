

"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Button from './Button';
import CalendlyEmbed from './CalendlyEmbed';
import AvatarMenu from './AvatarMenu';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
  ];

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <nav
      className="fixed w-full top-0 z-50 transition-all duration-300 animate-slide-down border-b border-purple-100/60"
      style={{
        backgroundImage: 'url(/banner.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container-custom relative z-10">
        <div className="flex justify-between items-center py-4">

          <Link href="/" className="group flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Pixen India Logo"
              width={40}
              height={40}
              priority
              className="w-10 h-10 object-contain transform group-hover:scale-110 transition-all duration-300 drop-shadow-lg"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
                Pixen India Digital
              </h1>
              <p className="text-xs text-gray-500 -mt-1 font-medium">Digital Growth Agency</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-all duration-200 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded ${
                    isActive ? 'text-primary-700' : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-600 to-primary-400 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0'
                    } group-hover:w-full`}
                  ></span>
                </Link>
              );
            })}

            {isMounted ? (
              loading ? (
                <div className="flex items-center gap-4 opacity-70">
                  <div className="w-16 h-4 bg-white/10 rounded animate-pulse" />
                  <div className="w-32 h-9 bg-white/10 rounded-full animate-pulse" />
                </div>
              ) : isAuthenticated ? (
                <div className="flex items-center gap-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsCalendlyOpen(true)}
                    className="shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  >
                    Book Consultation
                  </Button>
                  <AvatarMenu />
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login">
                    <span className="text-gray-700 hover:text-primary-600 font-semibold transition-colors">
                      Sign In
                    </span>
                  </Link>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsCalendlyOpen(true)}
                    className="shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  >
                    Book Consultation
                  </Button>
                </div>
              )
            ) : (
              <div className="flex items-center gap-3 opacity-0 pointer-events-none">
                <Button variant="primary" size="sm">Book Consultation</Button>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100/60 rounded-lg transition-all duration-200 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-6 border-t border-white/20 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-white/90 hover:text-white font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${
                      isActive ? 'text-white bg-white/15' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {isMounted && loading && (
                <div className="flex flex-col gap-4 py-3 px-4 animate-pulse">
                  <div className="w-full h-12 bg-white/10 rounded-full" />
                  <div className="w-full h-12 bg-white/10 rounded-full" />
                </div>
              )}
              {isMounted && !loading && isAuthenticated && (
                <>
                  <div className="flex items-center gap-4 py-3 px-4">
                    <AvatarMenu />
                    <span className="text-white font-medium">My Account</span>
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsCalendlyOpen(true);
                    }}
                    className="shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Book Consultation
                  </Button>
                </>
              )}
              {isMounted && !loading && !isAuthenticated && (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white/90 hover:text-white font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                  >
                    Sign In
                  </Link>
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsCalendlyOpen(true);
                    }}
                    className="shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Book Consultation
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <CalendlyEmbed isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </nav>
  );
}
