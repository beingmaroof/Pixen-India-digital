export type LeadTemperature = 'hot' | 'warm' | 'cold';
export type AuditStatus = 'submitted' | 'in_review' | 'ready' | 'booked';
export type LeadStage =
  | 'new'
  | 'qualified'
  | 'audit_requested'
  | 'audit_in_review'
  | 'audit_ready'
  | 'call_booked'
  | 'follow_up_due'
  | 'won'
  | 'lost';

export interface LeadWorkflowInput {
  source?: string;
  businessType?: string;
  revenue?: string;
  budget?: string;
  message?: string;
  goals?: string[];
  channels?: string[];
  timeline?: string;
  website?: string;
}

export interface LeadWorkflowResult {
  score: number;
  temperature: LeadTemperature;
  stage: LeadStage;
  auditStatus: AuditStatus;
  priorityLabel: 'high' | 'medium' | 'low';
  nextFollowUpAt: string;
  followUpSequence: 'accelerated' | 'standard' | 'nurture';
}

const highIntentBusinessTypes = [
  'E-Commerce',
  'E-Commerce / D2C Brand',
  'D2C Brand',
  'SaaS / Software',
  'Tech Startup / SaaS',
  'B2B Company',
  'Healthcare / Clinic',
  'Real Estate',
];

const fastTimelines = ['asap', 'within 30 days', 'results yesterday'];
const highValueRevenueBands = ['20l', '1cr'];
const highBudgetBands = ['3l', '5l', 'above', '10l'];
const lowBudgetBands = ['below', '50,000'];

export function scoreLead(input: LeadWorkflowInput): number {
  let score = 45;
  const businessType = (input.businessType || '').toLowerCase();
  const revenue = (input.revenue || '').toLowerCase();
  const budget = (input.budget || '').toLowerCase();
  const timeline = (input.timeline || '').toLowerCase();
  const message = (input.message || '').toLowerCase();
  const goalsCount = input.goals?.length || 0;
  const channelsCount = input.channels?.length || 0;

  if (highIntentBusinessTypes.some((type) => businessType.includes(type.toLowerCase()))) {
    score += 12;
  }

  if (highValueRevenueBands.some((band) => revenue.includes(band))) {
    score += 18;
  }

  if (highBudgetBands.some((band) => budget.includes(band))) {
    score += 18;
  }

  if (lowBudgetBands.some((band) => budget.includes(band))) {
    score -= 10;
  }

  if (fastTimelines.some((term) => timeline.includes(term))) {
    score += 8;
  }

  if (input.website) {
    score += 4;
  }

  if (goalsCount >= 3) {
    score += 8;
  } else if (goalsCount === 2) {
    score += 5;
  }

  if (channelsCount >= 3) {
    score += 4;
  }

  if (message.length > 80) {
    score += 8;
  } else if (message.length > 30) {
    score += 4;
  }

  if (message.includes('scale') || message.includes('roas') || message.includes('pipeline')) {
    score += 6;
  }

  return Math.max(10, Math.min(100, score));
}

export function getLeadTemperature(score: number): LeadTemperature {
  if (score >= 78) return 'hot';
  if (score >= 56) return 'warm';
  return 'cold';
}

export function getPriorityLabel(score: number): 'high' | 'medium' | 'low' {
  if (score >= 78) return 'high';
  if (score >= 56) return 'medium';
  return 'low';
}

export function getFollowUpSequence(score: number): 'accelerated' | 'standard' | 'nurture' {
  if (score >= 78) return 'accelerated';
  if (score >= 56) return 'standard';
  return 'nurture';
}

export function getNextFollowUpAt(score: number, now = new Date()): string {
  const hoursToAdd = score >= 78 ? 2 : score >= 56 ? 24 : 72;
  return new Date(now.getTime() + hoursToAdd * 60 * 60 * 1000).toISOString();
}

export function getAuditStatus(hasBooking = false, explicitStatus?: string | null): AuditStatus {
  if (explicitStatus === 'booked' || hasBooking) return 'booked';
  if (explicitStatus === 'ready') return 'ready';
  if (explicitStatus === 'in_review') return 'in_review';
  return 'submitted';
}

export function getLeadStage(args: {
  source?: string;
  score: number;
  auditStatus?: string | null;
  hasBooking?: boolean;
}): LeadStage {
  const auditStatus = getAuditStatus(Boolean(args.hasBooking), args.auditStatus);
  if (auditStatus === 'booked') return 'call_booked';
  if (auditStatus === 'ready') return 'audit_ready';
  if (auditStatus === 'in_review') return 'audit_in_review';
  if ((args.source || '').includes('audit')) return 'audit_requested';
  if (args.score >= 56) return 'qualified';
  return 'new';
}

export function buildLeadWorkflow(input: LeadWorkflowInput, now = new Date()): LeadWorkflowResult {
  const score = scoreLead(input);
  const temperature = getLeadTemperature(score);
  return {
    score,
    temperature,
    stage: getLeadStage({ source: input.source, score }),
    auditStatus: 'submitted',
    priorityLabel: getPriorityLabel(score),
    nextFollowUpAt: getNextFollowUpAt(score, now),
    followUpSequence: getFollowUpSequence(score),
  };
}
