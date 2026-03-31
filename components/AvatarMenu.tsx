"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

export default function AvatarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, userData, loading } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setIsOpen(false);

    // Fallback: force hard redirect after 4 seconds if Supabase hangs
    const fallbackTimer = setTimeout(() => {
      window.location.href = '/login';
    }, 4000);

    try {
      await supabase.auth.signOut();
      clearTimeout(fallbackTimer);
    } catch (error) {
      console.error('Logout error:', error);
      clearTimeout(fallbackTimer);
    } finally {
      // Always hard-navigate to ensure session is cleared from UI
      window.location.href = '/login';
    }
  };

  if (!user) return null;

  // Show display_name if set, otherwise fallback to email prefix
  const displayName = userData?.display_name || user.email?.split('@')[0] || 'User';
  const initials = displayName.charAt(0).toUpperCase();
  const avatarUrl = userData?.photo_url || null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoggingOut}
        className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white flex items-center justify-center font-bold overflow-hidden shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 transform hover:scale-105 transition-all disabled:opacity-70"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {isLoggingOut ? (
          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : avatarUrl ? (
          <Image src={avatarUrl} alt="Avatar" width={40} height={40} className="object-cover" />
        ) : (
          initials
        )}
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-3 w-52 bg-black/70 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] py-2 z-50 transition-all duration-200 origin-top-right ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="px-4 py-2 border-b border-white/10 mb-1">
          <p className="text-sm font-semibold text-white truncate">{displayName}</p>
          <p className="text-xs text-white/50 truncate">{user.email}</p>
        </div>

        <Link
          href="/dashboard"
          onClick={() => setIsOpen(false)}
          className="flex items-center px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-purple-400 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          Dashboard
        </Link>
        <Link
          href="/profile"
          onClick={() => setIsOpen(false)}
          className="flex items-center px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-purple-400 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          Profile
        </Link>

        <div className="border-t border-white/10 mt-1 mb-1" />

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"
        >
          {isLoggingOut ? (
            <>
              <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Logging out…
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              Logout
            </>
          )}
        </button>
      </div>
    </div>
  );
}
