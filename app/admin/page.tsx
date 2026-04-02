"use client";

import React, { useEffect, useState } from 'react';
import PremiumNavbar from '@/components/PremiumNavbar';
import { supabase } from '@/lib/supabase';
import { trackEvent } from '@/lib/analytics';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { user, userData, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Role-based security check
    if (!loading && userData && userData.role !== 'admin') {
      router.replace('/dashboard');
    }
  }, [userData, loading, router]);

  useEffect(() => {
    if (userData?.role === 'admin') fetchLeads();
  }, [userData]);

  const fetchLeads = async () => {
    setLoading(true);
    const { data: contactsData } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    const { data: leadsData } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    
    // Merge or separate them depending on structure.
    const merged = [
      ...(contactsData || []).map(c => ({ ...c, type: 'contact' })),
      ...(leadsData || []).map(l => ({ ...l, type: 'audit' }))
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    setLeads(merged);
    setLoading(false);
  };

  const filteredLeads = leads.filter(l => {
    if (filter === 'all') return true;
    return l.status === filter;
  });

  if (!userData || userData.role !== 'admin') {
    return <div className="min-h-screen flex items-center justify-center text-white/50">Restricted Access. Verifying privileges...</div>;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <PremiumNavbar />
      <div className="max-w-7xl mx-auto space-y-8 mt-12">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-3">
             <select value={filter} onChange={e => setFilter(e.target.value)} className="bg-[#02030A] border border-white/10 text-white text-sm rounded-lg px-4 py-2">
               <option value="all">All Statuses</option>
               <option value="new">New</option>
               <option value="audit_ready">Audit Ready</option>
               <option value="in_progress">In Progress</option>
               <option value="completed">Completed</option>
             </select>
             <button onClick={fetchLeads} className="px-4 py-2 bg-purple-600 rounded">Refresh</button>
          </div>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-white/10 rounded w-full" />
            <div className="h-40 bg-white/10 rounded w-full" />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
            <table className="w-full text-left text-sm text-white/70">
              <thead className="bg-white/10 text-xs uppercase text-white/50">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Name / Source</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Details</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {leads.map((l, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">{new Date(l.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{l.name}</div>
                      <div className="text-xs text-purple-400 capitalize">{l.type} - {l.source}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>{l.email}</div>
                      <div>{l.phone}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {l.business_type || l.businessType} - {l.budget_range || l.budget}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold">
                      <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-300">
                        {l.status || 'new'}
                      </span>
                    </td>
                    <td className="px-6 py-4">...</td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr><td colSpan={6} className="px-6 py-4 text-center">No leads found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
