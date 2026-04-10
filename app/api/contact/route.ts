import { NextResponse } from 'next/server';
import { buildLeadWorkflow } from '@/lib/lead-workflow';
import { validateOrigin, isRateLimited, isBotHoneypot } from '@/lib/security';
import { sanitize, normalizeEmail } from '@/lib/sanitizer';

export async function POST(req: Request) {
  try {
    if (!validateOrigin(req)) {
      return NextResponse.json({ error: 'Unauthorized source' }, { status: 403 });
    }

    const rateLimit = isRateLimited(req, '/api/contact', 10, 60000);
    if (!rateLimit.success) {
      return NextResponse.json({ success: false, error: 'Too many requests. Please try again later.', errorCode: 'RATE_LIMIT_EXCEEDED', retryAfter: rateLimit.retryAfter }, { status: 429 });
    }

    const body = await req.json();

    if (isBotHoneypot(body)) {
      return NextResponse.json({ success: true });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase env vars in /api/contact');
      return NextResponse.json({ error: 'Service configuration error' }, { status: 500 });
    }

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);

    // AI Smart Lead Qualification
    const workflow = buildLeadWorkflow({
      source: String(body.source || 'contact_form'),
      businessType: String(body.businessType || ''),
      budget: String(body.budget || ''),
      message: String(body.message || ''),
      website: String(body.website || ''),
    });
    const aiScore = workflow.score;
    const autoPriority = workflow.priorityLabel;

    const { error } = await supabase.from('leads').insert([{
      name: sanitize(body.name).substring(0, 100),
      email: normalizeEmail(body.email).substring(0, 100),
      phone: sanitize(body.phone).substring(0, 20),
      website: sanitize(body.website || '').substring(0, 200),
      businessType: sanitize(body.businessType).substring(0, 100),
      budget: sanitize(body.budget).substring(0, 100),
      message: sanitize(body.message).substring(0, 2000),
      source: sanitize(body.source || 'contact_form').substring(0, 50),
      status: workflow.stage,
      stage: workflow.stage,
      audit_status: workflow.auditStatus,
      lead_score: workflow.score,
      lead_temperature: workflow.temperature,
      follow_up_sequence: workflow.followUpSequence,
      next_follow_up_at: workflow.nextFollowUpAt,
      utm_source: sanitize(body.utm_source || '').substring(0, 100),
      utm_medium: sanitize(body.utm_medium || '').substring(0, 100),
      utm_campaign: sanitize(body.utm_campaign || '').substring(0, 100),
    }]);

    if (error) {
      console.error('Supabase Insert Error:', error);
      // Masking db errors from frontend
      return NextResponse.json({ error: 'Failed to process request. Please try again later.' }, { status: 500 });
    }

    // Structured server-side logging for perfect analytics reliability
    console.info('lead_created', {
      email: body.email,
      name: body.name,
      timestamp: new Date().toISOString(),
      source: body.source || 'contact_form',
      aiScore,
      priority: autoPriority,
      temperature: workflow.temperature,
    });

    return NextResponse.json({
      success: true,
      ai_qualification_score: aiScore,
      lead_temperature: workflow.temperature,
      follow_up_sequence: workflow.followUpSequence,
    });
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
