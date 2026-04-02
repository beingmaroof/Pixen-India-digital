"use client";

import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      setIsLight(true);
      document.documentElement.classList.add('light-theme');
    }
  }, []);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    if (next) {
      document.documentElement.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  };

  if (!mounted) return <div className="w-10 h-10 ml-2" />; // Spacer during SSR

  return (
    <button 
      onClick={toggle} 
      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors ml-2 md:ml-4 flex-shrink-0" 
      aria-label="Toggle Theme"
    >
      {isLight ? (
        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 3.365a1 1 0 011.415 0l.707.707a1 1 0 01-1.415 1.415l-.707-.707a1 1 0 010-1.415zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-3.364 4.95a1 1 0 000-1.414l-.707-.707a1 1 0 00-1.415 1.414l.707.707a1 1 0 001.414 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.22-3.364a1 1 0 00-1.415 0l-.707.707a1 1 0 001.415 1.414l.707-.707a1 1 0 000-1.414zM2 10a1 1 0 011-1h1a1 1 0 010 2H3a1 1 0 01-1-1zm3.364-4.95a1 1 0 010-1.414l.707-.707a1 1 0 011.415 1.414l-.707.707a1 1 0 01-1.415 0zM10 4a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd"/></svg>
      ) : (
        <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
      )}
    </button>
  );
}
