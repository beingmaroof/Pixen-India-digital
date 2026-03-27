"use client";

import React from 'react';
import Card from './Card';
import Button from './Button';
import { useRouter } from 'next/navigation';

interface ServiceCardProps {
  title: string;
  problem: string;
  solution: string;
  outcome: string;
  icon: React.ReactNode;
  ctaText?: string;
  onCtaClick?: () => void;
}

export default function ServiceCard({
  title,
  problem,
  solution,
  outcome,
  icon,
  ctaText = 'Learn More',
  onCtaClick,
}: ServiceCardProps) {
  const router = useRouter();

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      router.push('/contact');
    }
  };

  return (
    <Card hover variant="elevated" className="h-full flex flex-col">
      
      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
        <div className="text-white">{icon}</div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>

      <div className="space-y-4 flex-grow">
        
        <div>
          <h4 className="text-sm font-semibold text-accent-600 uppercase tracking-wide mb-2">
            The Problem
          </h4>
          <p className="text-gray-700 leading-relaxed">{problem}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">
            Our Solution
          </h4>
          <p className="text-gray-700 leading-relaxed">{solution}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-2">
            The Outcome
          </h4>
          <p className="text-gray-700 leading-relaxed">{outcome}</p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <Button 
          variant="primary" 
          fullWidth
          onClick={handleCtaClick}
          className="shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
        >
          {ctaText}
        </Button>
      </div>
    </Card>
  );
}
