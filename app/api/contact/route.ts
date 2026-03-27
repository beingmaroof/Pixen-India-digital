import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendConfirmationEmail, sendAdminNotification } from '@/lib/email';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name, email, phone, businessType, budget, message,
      source = 'contact_form', utm_source, utm_medium, utm_campaign,
    } = body;

    // --- Validation ---
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (message.trim().length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters.' }, { status: 400 });
    }

    // --- Store Lead in Supabase ---
    const { data: lead, error: dbError } = await supabase
      .from('leads')
      .insert([{
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        businessType: businessType || null,
        budget: budget || null,
        message: message.trim(),
        source,
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
        status: 'new',
      }])
      .select('id')
      .single();

    if (dbError) {
      console.error('Lead DB error:', dbError);
      // Don't fail silently — still send emails even if DB write fails
    }

    const leadId = lead?.id ?? `fallback-${Date.now()}`;

    // --- Send Emails (non-blocking) ---
    Promise.allSettled([
      sendConfirmationEmail({ name, email, message }),
      sendAdminNotification({ name, email, phone, businessType, budget, message }),
    ]).then(results => {
      results.forEach((r, i) => {
        if (r.status === 'rejected') {
          console.error(`Email ${i} failed:`, r.reason);
        }
      });
    });

    return NextResponse.json(
      {
        success: true,
        id: leadId,
        message: "Thank you! We'll get back to you within 24 hours.",
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('Contact route error:', err);
    return NextResponse.json(
      { error: err.message || 'Server error. Please email us at Pixenindiadigital@gmail.com' },
      { status: 500 }
    );
  }
}
