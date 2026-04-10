import { NextResponse } from 'next/server';
import { createAuditLead } from '@/lib/lead-crm';
import { validateOrigin, isRateLimited } from '@/lib/security';

export async function POST(request: Request) {
  try {
    if (!validateOrigin(request)) {
      return NextResponse.json({ error: 'Unauthorized source' }, { status: 403 });
    }

    const rateLimit = isRateLimited(request, '/api/audit', 5, 60000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.', retryAfter: rateLimit.retryAfter },
        { status: 429 }
      );
    }

    const body = await request.json();

    if (!body.name || !body.email || !body.businessType || !body.budget || !body.timeline) {
      return NextResponse.json({ error: 'Missing required audit fields.' }, { status: 400 });
    }

    const { lead, report } = await createAuditLead({
      name: String(body.name).trim(),
      email: String(body.email).trim(),
      phone: String(body.phone || '').trim(),
      website: String(body.website || '').trim(),
      businessType: String(body.businessType).trim(),
      revenue: String(body.revenue || '').trim(),
      channels: Array.isArray(body.channels) ? body.channels : [],
      goals: Array.isArray(body.goals) ? body.goals : [],
      customGoal: String(body.customGoal || '').trim(),
      budget: String(body.budget).trim(),
      timeline: String(body.timeline).trim(),
    });

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      reportId: lead.report_id,
      reportUrl: lead.report_url,
      auditStatus: lead.audit_status,
      stage: lead.stage,
      workflow: report.workflow,
    });
  } catch (error: any) {
    console.error('Audit creation error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate audit.' },
      { status: 500 }
    );
  }
}
