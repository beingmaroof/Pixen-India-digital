import 'server-only';

import { AuditRequestPayload, generateAuditReport } from '@/lib/audit-report';
import { buildLeadWorkflow } from '@/lib/lead-workflow';
import { supabaseAdmin } from '@/lib/supabase-admin';

export interface AuditLeadRecord {
  id: string;
  report_id: string;
  report_url: string;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  business_type?: string;
  businessType?: string;
  revenue_range?: string;
  current_channels?: string[];
  goals?: string[];
  budget_range?: string;
  timeline?: string;
  source?: string;
  stage?: string;
  audit_status?: string;
  lead_score?: number;
  lead_temperature?: string;
  follow_up_sequence?: string;
  next_follow_up_at?: string;
  booked_slot_at?: string | null;
  audit_report?: ReturnType<typeof generateAuditReport>;
  created_at?: string;
  crm_notes?: string | null;
}

export interface AuditBookingPayload {
  leadId: string;
  name: string;
  email: string;
  phone?: string;
  startsAt: string;
  timezone: string;
  userId?: string | null;
}

export interface AuditBookingRecord {
  id: string;
  lead_id: string;
  name: string;
  email: string;
  phone?: string;
  timezone: string;
  starts_at: string;
  ends_at?: string | null;
  booking_status: string;
  created_at?: string;
  updated_at?: string;
}

function normalizeGoals(goals?: string[], customGoal?: string) {
  return [...(goals || []), ...(customGoal ? [customGoal] : [])].filter(Boolean);
}

export async function createAuditLead(payload: AuditRequestPayload) {
  const reportId = crypto.randomUUID();
  const report = generateAuditReport(payload);
  const workflow = buildLeadWorkflow({
    source: 'audit_form',
    businessType: payload.businessType,
    revenue: payload.revenue,
    budget: payload.budget,
    goals: normalizeGoals(payload.goals, payload.customGoal),
    channels: payload.channels,
    timeline: payload.timeline,
    website: payload.website,
    message: normalizeGoals(payload.goals, payload.customGoal).join(' '),
  });

  const insertPayload = {
    name: payload.name,
    email: payload.email.toLowerCase().trim(),
    phone: payload.phone,
    website: payload.website,
    business_type: payload.businessType,
    revenue_range: payload.revenue,
    current_channels: payload.channels || [],
    goals: normalizeGoals(payload.goals, payload.customGoal),
    budget_range: payload.budget,
    timeline: payload.timeline,
    source: 'audit_form',
    stage: 'audit_ready',
    status: 'audit_ready',
    audit_status: 'ready',
    report_id: reportId,
    report_url: `/reports/${reportId}`,
    lead_score: workflow.score,
    lead_temperature: workflow.temperature,
    follow_up_sequence: workflow.followUpSequence,
    next_follow_up_at: workflow.nextFollowUpAt,
    audit_report: report,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabaseAdmin
    .from('leads')
    .insert(insertPayload)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return {
    lead: data as AuditLeadRecord,
    report,
  };
}

export async function getLeadByReportId(reportId: string) {
  const { data, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .eq('report_id', reportId)
    .single();

  if (error || !data) {
    return null;
  }

  return data as AuditLeadRecord;
}

export async function getLatestLeadByEmail(email: string) {
  const { data, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .eq('email', email.toLowerCase().trim())
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as AuditLeadRecord;
}

export async function listLeadNotes(leadId: string) {
  const { data } = await supabaseAdmin
    .from('lead_notes')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });

  return data || [];
}

export async function listAuditBookingsForLead(leadId: string) {
  const { data } = await supabaseAdmin
    .from('audit_bookings')
    .select('*')
    .eq('lead_id', leadId)
    .order('starts_at', { ascending: true });

  return (data || []) as AuditBookingRecord[];
}

export async function listRecentLeads() {
  const { data, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    throw error;
  }

  return (data || []) as AuditLeadRecord[];
}

export async function updateLeadRecord(
  leadId: string,
  updates: Record<string, unknown>
) {
  const payload = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabaseAdmin
    .from('leads')
    .update(payload)
    .eq('id', leadId)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data as AuditLeadRecord;
}

export async function addLeadNote(leadId: string, authorId: string, authorName: string, note: string) {
  const { data, error } = await supabaseAdmin
    .from('lead_notes')
    .insert({
      lead_id: leadId,
      author_id: authorId,
      author_name: authorName,
      note,
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function createAuditBooking(payload: AuditBookingPayload) {
  const startsAt = new Date(payload.startsAt);
  const endsAt = new Date(startsAt.getTime() + 30 * 60 * 1000);

  const { data: existing } = await supabaseAdmin
    .from('audit_bookings')
    .select('id')
    .eq('starts_at', startsAt.toISOString())
    .neq('booking_status', 'cancelled');

  if ((existing || []).length > 0) {
    throw new Error('This slot has already been booked.');
  }

  const { data, error } = await supabaseAdmin
    .from('audit_bookings')
    .insert({
      lead_id: payload.leadId,
      user_id: payload.userId,
      name: payload.name,
      email: payload.email.toLowerCase().trim(),
      phone: payload.phone,
      timezone: payload.timezone,
      starts_at: startsAt.toISOString(),
      ends_at: endsAt.toISOString(),
      booking_status: 'confirmed',
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  await updateLeadRecord(payload.leadId, {
    stage: 'call_booked',
    status: 'call_booked',
    audit_status: 'booked',
    booked_slot_at: startsAt.toISOString(),
    last_contacted_at: new Date().toISOString(),
  });

  return data as AuditBookingRecord;
}

export async function updateAuditBooking(
  bookingId: string,
  updates: Record<string, unknown>,
  leadId?: string
) {
  const { data, error } = await supabaseAdmin
    .from('audit_bookings')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookingId)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  if (leadId && updates.booking_status === 'cancelled') {
    await updateLeadRecord(leadId, {
      stage: 'follow_up_due',
      status: 'follow_up_due',
      audit_status: 'ready',
      booked_slot_at: null,
    });
  }

  return data as AuditBookingRecord;
}
