"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';

const stageOptions = ['new', 'qualified', 'audit_requested', 'audit_in_review', 'audit_ready', 'call_booked', 'follow_up_due', 'won', 'lost'];
const auditStatusOptions = ['submitted', 'in_review', 'ready', 'booked'];

export default function AdminCRM() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [leads, setLeads] = useState<any[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string>('');
  const [newNote, setNewNote] = useState('');

  const selectedLead = useMemo(
    () => leads.find((lead) => lead.id === selectedLeadId) || leads[0] || null,
    [leads, selectedLeadId]
  );

  const filteredLeads = useMemo(() => {
    if (filter === 'all') return leads;
    return leads.filter((lead) => lead.stage === filter || lead.audit_status === filter || lead.status === filter);
  }, [filter, leads]);

  const getToken = async () => {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || '';
  };

  const fetchLeads = async () => {
    setLoading(true);
    setError('');
    try {
      const token = await getToken();
      const response = await fetch('/api/admin/leads', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || 'Unable to load leads.');
      }

      setLeads(json.leads || []);
      if (!selectedLeadId && json.leads?.[0]?.id) {
        setSelectedLeadId(json.leads[0].id);
      }
    } catch (fetchError: any) {
      setError(fetchError?.message || 'Unable to load leads.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const patchLead = async (updates: Record<string, unknown>) => {
    if (!selectedLead) return;
    setSaving(true);
    setError('');
    try {
      const token = await getToken();
      const response = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          leadId: selectedLead.id,
          updates,
        }),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || 'Unable to update lead.');
      }

      await fetchLeads();
    } catch (patchError: any) {
      setError(patchError?.message || 'Unable to update lead.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddNote = async () => {
    if (!selectedLead || !newNote.trim()) return;
    setSaving(true);
    setError('');
    try {
      const token = await getToken();
      const response = await fetch('/api/admin/lead-notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          leadId: selectedLead.id,
          note: newNote,
        }),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || 'Unable to add note.');
      }

      setNewNote('');
      await fetchLeads();
    } catch (noteError: any) {
      setError(noteError?.message || 'Unable to add note.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[380px_minmax(0,1fr)] gap-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl font-bold text-white">Lead Queue</h2>
            <p className="text-sm text-white/40">Prioritize by stage, score, and follow-up urgency.</p>
          </div>
          <button
            onClick={fetchLeads}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 hover:bg-white/5 hover:text-white transition-all"
          >
            Refresh
          </button>
        </div>

        <div className="mb-4">
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#050815] px-4 py-3 text-sm text-white outline-none"
          >
            <option value="all">All leads</option>
            {stageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            {auditStatusOptions.map((option) => (
              <option key={`audit-${option}`} value={option}>
                audit: {option}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-24 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-3 max-h-[760px] overflow-y-auto pr-1">
            {filteredLeads.map((lead) => (
              <button
                type="button"
                key={lead.id}
                onClick={() => setSelectedLeadId(lead.id)}
                className={`w-full rounded-2xl border p-4 text-left transition-all ${
                  selectedLead?.id === lead.id
                    ? 'border-purple-500/40 bg-purple-500/10'
                    : 'border-white/10 bg-[#050815] hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="font-bold text-white">{lead.name}</div>
                    <div className="text-xs text-white/35">{lead.email}</div>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                    lead.lead_temperature === 'hot'
                      ? 'bg-red-500/15 text-red-300'
                      : lead.lead_temperature === 'warm'
                      ? 'bg-amber-500/15 text-amber-300'
                      : 'bg-blue-500/15 text-blue-300'
                  }`}>
                    {lead.lead_temperature || 'new'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-wider">
                  <span className="rounded-full bg-white/10 px-2 py-1 text-white/55">{lead.stage || lead.status || 'new'}</span>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-white/55">{lead.audit_status || 'submitted'}</span>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-white/55">score {lead.lead_score || 0}</span>
                </div>
                <p className="mt-3 text-sm text-white/45 line-clamp-2">
                  {lead.message || lead.crm_notes || 'No message captured yet.'}
                </p>
              </button>
            ))}

            {!filteredLeads.length && (
              <div className="rounded-2xl border border-white/10 bg-[#050815] px-4 py-10 text-center text-sm text-white/40">
                No leads found for this filter.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7">
        {!selectedLead ? (
          <div className="flex min-h-[320px] items-center justify-center text-white/40">
            Select a lead to manage its stage, booking, and follow-up.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-white">{selectedLead.name}</h2>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white/60">
                    {selectedLead.source || 'lead'}
                  </span>
                </div>
                <p className="text-white/45">{selectedLead.email}</p>
                <p className="text-white/35 text-sm mt-1">{selectedLead.phone || 'No phone provided'}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 min-w-[240px]">
                <div className="rounded-2xl border border-white/10 bg-[#050815] px-4 py-3">
                  <p className="text-xs uppercase tracking-wider text-white/30 mb-1">Lead Score</p>
                  <p className="text-2xl font-bold text-white">{selectedLead.lead_score || 0}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#050815] px-4 py-3">
                  <p className="text-xs uppercase tracking-wider text-white/30 mb-1">Next Follow-up</p>
                  <p className="text-sm font-semibold text-white">
                    {selectedLead.next_follow_up_at
                      ? new Date(selectedLead.next_follow_up_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
                      : 'Not set'}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-[#050815] p-5">
                <label className="block text-xs uppercase tracking-wider text-white/35 mb-2">Stage</label>
                <select
                  value={selectedLead.stage || 'new'}
                  onChange={(event) => patchLead({ stage: event.target.value, status: event.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none"
                >
                  {stageOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#050815] p-5">
                <label className="block text-xs uppercase tracking-wider text-white/35 mb-2">Audit Status</label>
                <select
                  value={selectedLead.audit_status || 'submitted'}
                  onChange={(event) => patchLead({ audit_status: event.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none"
                >
                  {auditStatusOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#050815] p-5">
                <label className="block text-xs uppercase tracking-wider text-white/35 mb-2">Owner</label>
                <input
                  defaultValue={selectedLead.owner_name || ''}
                  onBlur={(event) => patchLead({ owner_name: event.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none"
                  placeholder="Assign owner"
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#050815] p-5">
                <label className="block text-xs uppercase tracking-wider text-white/35 mb-2">Next Follow-up</label>
                <input
                  type="datetime-local"
                  defaultValue={selectedLead.next_follow_up_at ? new Date(selectedLead.next_follow_up_at).toISOString().slice(0, 16) : ''}
                  onBlur={(event) => patchLead({ next_follow_up_at: event.target.value ? new Date(event.target.value).toISOString() : null })}
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#050815] p-5">
              <div className="flex items-center justify-between gap-3 mb-3">
                <h3 className="text-lg font-bold text-white">Lead Details</h3>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 hover:bg-white/5 hover:text-white transition-all"
                  >
                    Email
                  </a>
                  <a
                    href={`https://wa.me/${String(selectedLead.phone || '').replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-300 hover:bg-green-500/15 transition-all"
                  >
                    WhatsApp
                  </a>
                  {selectedLead.report_url && (
                    <a
                      href={selectedLead.report_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-300 hover:bg-purple-500/15 transition-all"
                    >
                      Report
                    </a>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/30 uppercase tracking-wider text-xs mb-1">Business</p>
                  <p className="text-white/70">{selectedLead.business_type || selectedLead.businessType || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-white/30 uppercase tracking-wider text-xs mb-1">Budget</p>
                  <p className="text-white/70">{selectedLead.budget_range || selectedLead.budget || 'Not provided'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-white/30 uppercase tracking-wider text-xs mb-1">Message / Notes</p>
                  <textarea
                    defaultValue={selectedLead.crm_notes || selectedLead.message || ''}
                    onBlur={(event) => patchLead({ crm_notes: event.target.value })}
                    className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#050815] p-5">
              <h3 className="text-lg font-bold text-white mb-3">CRM Notes</h3>
              <div className="space-y-3 mb-4">
                {(selectedLead.notes || []).map((note: any) => (
                  <div key={note.id} className="rounded-2xl border border-white/10 bg-black px-4 py-3">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-sm font-semibold text-white">{note.author_name || 'Admin'}</span>
                      <span className="text-xs text-white/35">
                        {new Date(note.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed">{note.note}</p>
                  </div>
                ))}

                {!(selectedLead.notes || []).length && (
                  <div className="rounded-2xl border border-dashed border-white/10 px-4 py-5 text-sm text-white/35">
                    No notes yet. Add context for the next follow-up or sales handoff.
                  </div>
                )}
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <textarea
                  value={newNote}
                  onChange={(event) => setNewNote(event.target.value)}
                  className="min-h-[110px] flex-1 rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none"
                  placeholder="Add a note about qualification, objections, or next follow-up."
                />
                <button
                  onClick={handleAddNote}
                  disabled={saving || !newNote.trim()}
                  className="rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Add Note'}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
