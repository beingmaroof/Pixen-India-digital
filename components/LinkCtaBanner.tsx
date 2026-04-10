"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { DarkCTABanner } from '@/components/DarkUI';

interface LinkCtaBannerProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  href: string;
}

export default function LinkCtaBanner({ title, subtitle, ctaLabel, href }: LinkCtaBannerProps) {
  const router = useRouter();

  return (
    <DarkCTABanner
      title={title}
      subtitle={subtitle}
      ctaLabel={ctaLabel}
      onCtaClick={() => router.push(href)}
    />
  );
}
