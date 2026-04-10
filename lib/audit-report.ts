import { buildLeadWorkflow, LeadWorkflowResult } from '@/lib/lead-workflow';

export interface AuditRequestPayload {
  leadId?: string;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  businessType: string;
  revenue?: string;
  channels?: string[];
  goals?: string[];
  customGoal?: string;
  budget?: string;
  timeline?: string;
}

export interface AuditScoreCard {
  label: string;
  score: number;
  insight: string;
}

export interface AuditFinding {
  severity: 'high' | 'medium' | 'low';
  title: string;
  detail: string;
  recommendation: string;
}

export interface AuditReport {
  workflow: LeadWorkflowResult;
  headline: string;
  summary: string;
  recommendedOffer: string;
  scoreCards: AuditScoreCard[];
  findings: AuditFinding[];
  actionPlan: string[];
  bookingMessage: string;
}

function estimateScore(base: number, modifier: number) {
  return Math.max(35, Math.min(92, base + modifier));
}

export function generateAuditReport(input: AuditRequestPayload): AuditReport {
  const workflow = buildLeadWorkflow({
    source: 'audit_form',
    businessType: input.businessType,
    revenue: input.revenue,
    budget: input.budget,
    message: [input.website, ...(input.goals || []), input.customGoal || ''].filter(Boolean).join(' '),
    goals: input.goals,
    channels: input.channels,
    timeline: input.timeline,
    website: input.website,
  });

  const goalText = input.goals?.slice(0, 2).join(', ') || 'qualified lead generation';
  const hasWebsite = Boolean(input.website);
  const hasPaidChannels = (input.channels || []).some((channel) =>
    ['google', 'meta', 'youtube', 'ads'].some((term) => channel.toLowerCase().includes(term))
  );
  const performanceModifier = workflow.temperature === 'hot' ? 12 : workflow.temperature === 'warm' ? 4 : -4;

  const scoreCards: AuditScoreCard[] = [
    {
      label: 'Offer Positioning',
      score: estimateScore(62, performanceModifier),
      insight: `Your offer can be sharpened around ${goalText} so the value is obvious within the first screen.`,
    },
    {
      label: 'Conversion Readiness',
      score: estimateScore(hasWebsite ? 58 : 44, performanceModifier),
      insight: hasWebsite
        ? 'Your website can become a stronger booking asset with clearer intent paths and proof near the CTA.'
        : 'You need a stronger landing experience before scaling traffic into paid acquisition.',
    },
    {
      label: 'Traffic Efficiency',
      score: estimateScore(hasPaidChannels ? 56 : 47, performanceModifier),
      insight: hasPaidChannels
        ? 'Existing paid channels suggest immediate optimization upside in targeting, creative, and funnel structure.'
        : 'Before spending more on ads, tighten the measurement and conversion foundations.',
    },
    {
      label: 'Tracking Confidence',
      score: estimateScore(51, performanceModifier),
      insight: 'Better attribution, lead stage tracking, and follow-up automation will make scaling much safer.',
    },
  ];

  const findings: AuditFinding[] = [
    {
      severity: 'high',
      title: 'Lead capture likely ends too early',
      detail:
        'Most growing brands lose momentum after the first form submission because there is no structured path from interest to booked conversation.',
      recommendation:
        'Use a single audit funnel that ends with a booked slot, automatic confirmation, and follow-up reminders.',
    },
    {
      severity: 'high',
      title: 'Proof needs to support the CTA earlier',
      detail:
        'Visitors usually need stronger proof before committing to an audit or paid engagement, especially for performance services.',
      recommendation:
        'Bring case study metrics, client wins, and offer-specific testimonials closer to each primary CTA.',
    },
    {
      severity: 'medium',
      title: 'Growth messaging should map to a narrower buyer journey',
      detail:
        'Broad growth language sounds premium, but qualified buyers convert better when the message matches their business model and urgency.',
      recommendation:
        'Create vertical-specific landing pages for SaaS, ecommerce, local services, healthcare, and real estate.',
    },
    {
      severity: 'medium',
      title: 'Follow-up speed is a revenue lever',
      detail:
        'High-intent leads cool off quickly when the first reply is delayed or generic.',
      recommendation:
        'Classify leads into hot, warm, and cold sequences and set next follow-up times automatically.',
    },
  ];

  const actionPlan = [
    'Tighten the hero and offer around one measurable transformation for your highest-value buyer segment.',
    'Map every CTA to a tracked audit -> booking -> follow-up path so no lead is left unworked.',
    'Pair each offer page with a relevant case study, stronger testimonial proof, and a clear next-step CTA.',
    'Stand up a lightweight CRM rhythm with ownership, stage updates, and next follow-up deadlines.',
  ];

  return {
    workflow,
    headline: `${input.businessType} growth opportunities are strongest in conversion flow, proof, and follow-up speed.`,
    summary: `Based on the details you shared, your next growth unlock is building a tighter system around ${goalText}. The goal is not just to get more traffic, but to move qualified prospects from first touch to booked conversation with less drop-off.`,
    recommendedOffer:
      workflow.temperature === 'hot'
        ? 'Priority Funnel Sprint + Performance Channel Optimization'
        : workflow.temperature === 'warm'
        ? 'Audit-Led Funnel Optimization Sprint'
        : 'Messaging, Proof, and Conversion Foundation Build',
    scoreCards,
    findings,
    actionPlan,
    bookingMessage:
      workflow.temperature === 'hot'
        ? 'You are a strong fit for a strategy call. Book a slot now so we can review your funnel together.'
        : 'Book a strategy call to walk through the report and prioritize the fastest wins for your business.',
  };
}
