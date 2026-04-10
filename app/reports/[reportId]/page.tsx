"use client";

import React, { useEffect, useMemo, useState } from 'react';
import PremiumNavbar from '@/components/PremiumNavbar';
import { Footer } from '@/components';
import {
  DarkBadge,
  DarkCTABanner,
  DarkGradientBtn,
  DarkPageWrapper,
  DarkSection,
  FadeIn,
} from '@/components/DarkUI';

interface ReportPageProps {
  params: {
    reportId: string;
  };
}

interface AuditSlot {
  id: string;
  startsAt: string;
  timezone: string;
  label: string;
  booked: boolean;
}

export default function AuditReportPage({ params }: ReportPageProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [reportData, setReportData] = useState<any>(null);
  const [slots, setSlots] = useState<AuditSlot[]>([]);

  const booking = useMemo(() => {
    return (reportData?.bookings || []).find((item: any) => item.booking_status === 'confirmed') || null;
  }, [reportData]);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [reportRes, slotRes] = await Promise.all([
        fetch(`/api/reports/${params.reportId}`, { cache: 'no-store' }),
        fetch('/api/audit/bookings', { cache: 'no-store' }),
      ]);

      if (!reportRes.ok) {
        throw new Error('Unable to load this audit report.');
      }

      const reportJson = await reportRes.json();
      const slotJson = slotRes.ok ? await slotRes.json() : { slots: [] };

      setReportData(reportJson);
      setSlots((slotJson.slots || []).filter((slot: AuditSlot) => !slot.booked));
      if ((slotJson.slots || []).length > 0) {
        const firstAvailable = (slotJson.slots || []).find((slot: AuditSlot) => !slot.booked);
        if (firstAvailable) setSelectedSlot(firstAvailable.startsAt);
      }
    } catch (fetchError: any) {
      setError(fetchError?.message || 'Unable to load the report.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [params.reportId]);

  const handleBooking = async () => {
    if (!reportData?.lead?.id || !selectedSlot) return;

    setSaving(true);
    setError('');
    try {
      const response = await fetch('/api/audit/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: reportData.lead.id,
          name: reportData.lead.name,
          email: reportData.lead.email,
          phone: reportData.lead.phone,
          startsAt: selectedSlot,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Calcutta',
        }),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || 'Unable to book this slot.');
      }

      await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: reportData.lead.email,
          phone: reportData.lead.phone,
          name: reportData.lead.name,
          type: 'audit_booking_confirmation',
          bookingStartsAt: selectedSlot,
        }),
      }).catch(() => {});

      await loadData();
    } catch (bookingError: any) {
      setError(bookingError?.message || 'Unable to confirm your booking.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!booking?.id) return;
    setSaving(true);
    setError('');
    try {
      const response = await fetch(`/api/audit/bookings/${booking.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'cancel',
          leadId: reportData.lead.id,
          reason: 'Cancelled from report page',
        }),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || 'Unable to cancel this booking.');
      }

      await loadData();
    } catch (cancelError: any) {
      setError(cancelError?.message || 'Unable to cancel your booking.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DarkPageWrapper>
        <PremiumNavbar />
        <div className="min-h-screen flex items-center justify-center pt-24">
          <div className="w-12 h-12 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
        </div>
      </DarkPageWrapper>
    );
  }

  if (error && !reportData) {
    return (
      <DarkPageWrapper>
        <PremiumNavbar />
        <main className="min-h-screen flex items-center justify-center px-6 pt-24">
          <div className="max-w-lg text-center rounded-3xl border border-white/10 bg-white/5 p-10">
            <h1 className="text-2xl font-bold text-white mb-3">Audit report unavailable</h1>
            <p className="text-white/50 mb-6">{error}</p>
            <DarkGradientBtn onClick={loadData}>Try Again</DarkGradientBtn>
          </div>
        </main>
      </DarkPageWrapper>
    );
  }

  const report = reportData?.report;
  const lead = reportData?.lead;

  return (
    <DarkPageWrapper>
      <PremiumNavbar />

      <main className="pt-28 pb-20">
        <DarkSection className="pt-10">
          <div className="max-w-5xl mx-auto space-y-10">
            <FadeIn>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <DarkBadge>Growth Audit Ready</DarkBadge>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mt-5 mb-3">
                      Your growth audit for <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{lead?.business_type || lead?.businessType || 'your business'}</span>
                    </h1>
                    <p className="text-white/50 max-w-2xl leading-relaxed">
                      {report?.summary}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:w-[280px]">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-widest text-white/30 mb-2">Lead Score</p>
                      <p className="text-3xl font-bold text-white">{report?.workflow?.score}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-widest text-white/30 mb-2">Priority</p>
                      <p className="text-2xl font-bold capitalize text-white">{report?.workflow?.priorityLabel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {(report?.scoreCards || []).map((card: any) => (
                  <div key={card.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-widest text-white/30 mb-2">{card.label}</p>
                    <p className="text-3xl font-bold text-white mb-3">{card.score}</p>
                    <p className="text-sm text-white/50 leading-relaxed">{card.insight}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <FadeIn delay={0.1} className="lg:col-span-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
                  <h2 className="text-2xl font-bold text-white mb-6">Top audit findings</h2>
                  <div className="space-y-4">
                    {(report?.findings || []).map((finding: any) => (
                      <div key={finding.title} className="rounded-2xl border border-white/10 bg-[#050815] p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                            finding.severity === 'high'
                              ? 'bg-red-500/15 text-red-300'
                              : finding.severity === 'medium'
                              ? 'bg-amber-500/15 text-amber-300'
                              : 'bg-blue-500/15 text-blue-300'
                          }`}>
                            {finding.severity} priority
                          </span>
                          <h3 className="text-lg font-bold text-white">{finding.title}</h3>
                        </div>
                        <p className="text-white/55 mb-3 leading-relaxed">{finding.detail}</p>
                        <p className="text-sm text-purple-300">{finding.recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.15} className="lg:col-span-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sticky top-28">
                  <h2 className="text-2xl font-bold text-white mb-3">Book your strategy call</h2>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    {report?.bookingMessage}
                  </p>

                  {booking ? (
                    <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5 mb-5">
                      <p className="text-xs uppercase tracking-widest text-green-300 mb-2">Call confirmed</p>
                      <p className="text-lg font-bold text-white mb-2">
                        {new Date(booking.starts_at).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </p>
                      <p className="text-sm text-white/60 mb-4">
                        We will use {booking.timezone || 'your saved timezone'} for the invite.
                      </p>
                      <button
                        onClick={handleCancelBooking}
                        disabled={saving}
                        className="w-full rounded-xl border border-red-500/30 bg-red-500/10 py-3 text-sm font-semibold text-red-300 hover:bg-red-500/15 transition-all"
                      >
                        {saving ? 'Updating...' : 'Cancel booking'}
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2 mb-5">
                        {slots.slice(0, 6).map((slot) => (
                          <button
                            type="button"
                            key={slot.id}
                            onClick={() => setSelectedSlot(slot.startsAt)}
                            className={`w-full text-left rounded-2xl border px-4 py-3 transition-all ${
                              selectedSlot === slot.startsAt
                                ? 'border-purple-500/50 bg-purple-500/10 text-white'
                                : 'border-white/10 bg-[#050815] text-white/60 hover:border-white/20 hover:text-white'
                            }`}
                          >
                            <div className="font-semibold">{slot.label}</div>
                            <div className="text-xs uppercase tracking-widest mt-1 text-white/30">{slot.timezone}</div>
                          </button>
                        ))}
                      </div>
                      <DarkGradientBtn onClick={handleBooking} className="w-full" size="lg">
                        {saving ? 'Confirming...' : 'Confirm Strategy Call'}
                      </DarkGradientBtn>
                    </>
                  )}

                  {error && (
                    <p className="mt-4 text-sm text-red-300">{error}</p>
                  )}
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Recommended action plan</h2>
                    <p className="text-white/50">Recommended offer: <span className="text-white/80 font-semibold">{report?.recommendedOffer}</span></p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(report?.actionPlan || []).map((item: string, index: number) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-[#050815] p-5">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold flex items-center justify-center mb-4">
                        {index + 1}
                      </div>
                      <p className="text-white/70 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </DarkSection>

        <DarkCTABanner
          title="Need a faster walkthrough?"
          subtitle="Skip the back and forth and message us directly on WhatsApp with your report in hand."
          ctaLabel="Chat on WhatsApp"
          onCtaClick={() => {
            window.location.href = `https://wa.me/917827717445?text=${encodeURIComponent(`Hi Pixen team, I reviewed my audit report (${params.reportId}) and want to discuss the next steps.`)}`;
          }}
        />
      </main>

      <Footer />
    </DarkPageWrapper>
  );
}
