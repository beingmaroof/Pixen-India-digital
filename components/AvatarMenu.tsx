"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

export default function AvatarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, userData } = useAuth();

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
    await supabase.auth.signOut();
    setIsOpen(false);
    // Hard window reload to clear completely before redirecting or use router.push('/login') + refresh
    window.location.href = '/login';
  };

  if (!user) return null;

  const initials = userData?.display_name 
    ? userData.display_name.charAt(0).toUpperCase() 
    : user.email?.charAt(0).toUpperCase() || 'U';

  const avatarUrl = userData?.photo_url || null;

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 text-white flex items-center justify-center font-bold overflow-hidden shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transform hover:scale-105 transition-all"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {avatarUrl ? (
          <Image src={avatarUrl} alt="Avatar" width={40} height={40} className="object-cover" />
        ) : (
          initials
        )}
      </button>

      {/* Dropdown Menu */}
      <div 
        className={`absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 transition-all duration-200 origin-top-right ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="px-4 py-2 border-b border-gray-50 mb-1">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {userData?.display_name || user.email?.split('@')[0]}
          </p>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </div>
        
        <Link 
          href="/dashboard"
          onClick={() => setIsOpen(false)}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          Dashboard
        </Link>
        <Link 
          href="/profile"
          onClick={() => setIsOpen(false)}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          Profile
        </Link>
        
        <div className="border-t border-gray-100 mt-1 mb-1"></div>
        
        <button 
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Logout
        </button>
      </div>
    </div>
  );
}
