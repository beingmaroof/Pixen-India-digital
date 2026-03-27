"use client";

import React from 'react';

interface FloatingSocialIconsProps {
  instagramUrl: string;
  whatsappUrl: string;
}

export default function FloatingSocialIcons({ instagramUrl, whatsappUrl }: FloatingSocialIconsProps) {
  return (
    <>
      {/* Instagram Icon - Left Side (Premium SaaS Style) */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed left-8 bottom-6 z-50 group hidden lg:block"
        style={{
          animation: 'float-premium 4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        }}
        aria-label="Follow us on Instagram"
      >
        <div className="relative">
          {/* Glow Effect Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
          
          {/* Main Icon Container */}
          <div className="relative w-16 h-16 bg-white/95 backdrop-blur-sm rounded-full shadow-2xl border border-gray-200/50 flex items-center justify-center cursor-pointer transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] group-hover:scale-110 group-active:scale-95 overflow-hidden">
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Instagram Icon SVG */}
            <svg 
              className="w-9 h-9 text-gray-900 transition-transform duration-500 group-hover:scale-110 relative z-10" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            
            {/* Ripple Effect Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"></div>
          </div>
          
          {/* Premium Tooltip Label */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none translate-y-2 group-hover:translate-y-0">
            <div className="bg-gray-900/95 backdrop-blur-md text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-2xl whitespace-nowrap border border-gray-800">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                Follow us on Instagram
              </span>
            </div>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
              <div className="border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-900/95"></div>
            </div>
          </div>
        </div>
      </a>

      {/* WhatsApp Icon - Right Side (Premium SaaS Style) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-8 bottom-6 z-50 group hidden lg:block"
        style={{
          animation: 'float-premium 4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        }}
        aria-label="Chat on WhatsApp"
      >
        <div className="relative">
          {/* Glow Effect Background */}
          <div className="absolute inset-0 bg-gradient-to-l from-green-600 to-green-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
          
          {/* Main Icon Container */}
          <div className="relative w-16 h-16 bg-white/95 backdrop-blur-sm rounded-full shadow-2xl border border-gray-200/50 flex items-center justify-center cursor-pointer transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] group-hover:scale-110 group-active:scale-95 overflow-hidden">
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* WhatsApp Icon SVG */}
            <svg 
              className="w-9 h-9 text-gray-900 transition-transform duration-500 group-hover:scale-110 relative z-10" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            
            {/* Ripple Effect Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-green-500/30 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"></div>
          </div>
          
          {/* Premium Tooltip Label */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none translate-y-2 group-hover:translate-y-0">
            <div className="bg-gray-900/95 backdrop-blur-md text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-2xl whitespace-nowrap border border-gray-800">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                Chat on WhatsApp
              </span>
            </div>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
              <div className="border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-900/95"></div>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}
