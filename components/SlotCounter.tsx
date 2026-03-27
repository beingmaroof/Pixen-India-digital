'use client';

import { useEffect, useState } from 'react';

interface SlotData {
  total: number;
  used: number;
  remaining: number;
}

interface SlotCounterProps {
  variant?: 'badge' | 'inline' | 'banner';
  className?: string;
}

export default function SlotCounter({ variant = 'badge', className = '' }: SlotCounterProps) {
  const [slots, setSlots] = useState<SlotData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await fetch('/api/slots', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setSlots(data);
        } else {
          setSlots({ total: 5, used: 2, remaining: 3 });
        }
      } catch {
        setSlots({ total: 5, used: 2, remaining: 3 });
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
    // Refresh every 60 seconds
    const interval = setInterval(fetchSlots, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <span className={`inline-block h-4 w-28 rounded bg-gray-200 animate-pulse ${className}`} />
    );
  }

  const remaining = slots?.remaining ?? 3;
  const total = slots?.total ?? 5;
  const urgencyColor =
    remaining <= 1 ? 'text-red-600' : remaining <= 2 ? 'text-orange-600' : 'text-amber-600';

  if (variant === 'inline') {
    return (
      <span className={`font-bold ${urgencyColor} ${className}`}>
        {remaining} of {total} spots left
      </span>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`flex items-center justify-center gap-2 text-sm font-semibold ${className}`}>
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>
        <span className={urgencyColor}>
          Only {remaining} audit spot{remaining !== 1 ? 's' : ''} remaining this month
        </span>
      </div>
    );
  }

  // Default: badge
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
      </span>
      <span className="font-semibold">
        {remaining === 0 ? 'All spots full' : `${remaining} spots left this month`}
      </span>
    </span>
  );
}
