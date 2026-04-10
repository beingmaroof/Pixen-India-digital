"use client";

import React, { useEffect } from 'react';
import AdminCRM from '@/components/AdminCRM';
import PremiumNavbar from '@/components/PremiumNavbar';
import { DarkPageWrapper } from '@/components/DarkUI';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && userData && userData.role !== 'admin') {
      router.replace('/dashboard');
    }
  }, [userData, loading, router]);

  if (!userData || userData.role !== 'admin') {
    return (
      <DarkPageWrapper>
        <div className="min-h-screen flex items-center justify-center text-white/50">
          Restricted Access. Verifying privileges...
        </div>
      </DarkPageWrapper>
    );
  }

  return (
    <DarkPageWrapper>
      <PremiumNavbar />
      <main className="min-h-screen px-6 pt-28 pb-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400 mb-2">Admin CRM</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Lead Operations Dashboard</h1>
            <p className="mt-3 max-w-2xl text-white/45">
              Manage audit leads, bookings, follow-up deadlines, and internal notes from one place.
            </p>
          </div>

          <AdminCRM />
        </div>
      </main>
    </DarkPageWrapper>
  );
}
