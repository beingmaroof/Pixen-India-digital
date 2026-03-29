import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface EmailBody {
  to: string;
  name: string;
  planName: string;
  planPrice: string;
  type: 'payment_confirmation' | 'contact_confirmation' | 'support_confirmation';
}

const BRAND_COLOR = '#4F46E5';

function getEmailContent(type: EmailBody['type'], name: string, planName?: string, planPrice?: string): { subject: string; html: string } {
  if (type === 'payment_confirmation') {
    return {
      subject: `🎉 Welcome to Pixen India — ${planName} Activated!`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, ${BRAND_COLOR}, #6366f1); padding: 40px 32px; border-radius: 16px 16px 0 0; text-align: center;">
            <h1 style="color: #ffffff; font-size: 28px; font-weight: 800; margin: 0 0 8px 0;">Welcome to Pixen India Digital</h1>
            <p style="color: rgba(255,255,255,0.85); font-size: 16px; margin: 0;">Your growth journey starts now 🚀</p>
          </div>
          
          <div style="padding: 40px 32px;">
            <p style="font-size: 16px; color: #374151; margin: 0 0 16px 0;">Hi <strong>${name}</strong>,</p>
            <p style="font-size: 16px; color: #374151; line-height: 1.6; margin: 0 0 24px 0;">
              Your payment was successful! Your <strong>${planName}</strong> (${planPrice}/month) is now active.
              Our team will reach out within <strong>24 hours</strong> to kick off your onboarding.
            </p>
            
            <div style="background: #f3f4f6; border-radius: 12px; padding: 24px; margin: 0 0 32px 0;">
              <h3 style="color: #111827; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px 0;">What Happens Next</h3>
              <ul style="list-style: none; padding: 0; margin: 0; space-y: 8px;">
                <li style="color: #374151; font-size: 15px; padding: 6px 0;">✅ Onboarding call scheduled within 24h</li>
                <li style="color: #374151; font-size: 15px; padding: 6px 0;">📊 Custom growth strategy prepared</li>
                <li style="color: #374151; font-size: 15px; padding: 6px 0;">🎯 Campaigns launched within 7 days</li>
              </ul>
            </div>

            <div style="text-align: center; margin: 0 0 32px 0;">
              <a href="https://pixenindia.com/dashboard" style="display: inline-block; background: linear-gradient(135deg, ${BRAND_COLOR}, #6366f1); color: white; font-weight: 700; font-size: 16px; padding: 14px 32px; border-radius: 10px; text-decoration: none;">
                Go to Your Dashboard →
              </a>
            </div>

            <p style="font-size: 14px; color: #9ca3af; text-align: center; margin: 0;">
              Questions? Reply to this email or WhatsApp us at <a href="https://wa.me/917827717445" style="color: ${BRAND_COLOR};">+91 78277 17445</a>
            </p>
          </div>

          <div style="background: #f9fafb; padding: 24px 32px; border-radius: 0 0 16px 16px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2025 Pixen India Digital · B/459, Gali no.6, Khadda Colony, Jaitpur, South Delhi 110044</p>
          </div>
        </div>
      `,
    };
  }

  if (type === 'contact_confirmation') {
    return {
      subject: '✅ We received your audit request — Pixen India',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, ${BRAND_COLOR}, #6366f1); padding: 40px 32px; border-radius: 16px 16px 0 0; text-align: center;">
            <h1 style="color: #ffffff; font-size: 28px; font-weight: 800; margin: 0 0 8px 0;">Request Received! 🎉</h1>
            <p style="color: rgba(255,255,255,0.85); font-size: 16px; margin: 0;">We'll be in touch soon</p>
          </div>
          <div style="padding: 40px 32px;">
            <p style="font-size: 16px; color: #374151; margin: 0 0 16px 0;">Hi <strong>${name}</strong>,</p>
            <p style="font-size: 16px; color: #374151; line-height: 1.6; margin: 0 0 24px 0;">
              Thank you for requesting a free growth audit! We review every application personally and will respond within <strong>24 hours</strong> — usually faster.
            </p>
            <div style="text-align: center; margin: 0 0 32px 0;">
              <a href="https://calendly.com/pixenindia/free-consultation" style="display: inline-block; background: linear-gradient(135deg, ${BRAND_COLOR}, #6366f1); color: white; font-weight: 700; font-size: 16px; padding: 14px 32px; border-radius: 10px; text-decoration: none;">
                Book a Call Now →
              </a>
            </div>
          </div>
          <div style="background: #f9fafb; padding: 24px 32px; border-radius: 0 0 16px 16px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2025 Pixen India Digital</p>
          </div>
        </div>
      `,
    };
  }

  // support_confirmation
  return {
    subject: '🛠️ Support request received — Pixen India',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 40px 32px; border-radius: 16px 16px 0 0; text-align: center;">
          <h1 style="color: #ffffff; font-size: 28px; font-weight: 800; margin: 0 0 8px 0;">Support Ticket Created</h1>
          <p style="color: rgba(255,255,255,0.85); font-size: 16px; margin: 0;">We'll respond within 2-4 hours</p>
        </div>
        <div style="padding: 40px 32px;">
          <p style="font-size: 16px; color: #374151; margin: 0 0 16px 0;">Hi <strong>${name}</strong>,</p>
          <p style="font-size: 16px; color: #374151; line-height: 1.6;">
            We've received your support request and our team is on it. You'll hear back from us within 2–4 hours on business days.
          </p>
          <p style="font-size: 14px; color: #9ca3af; text-align: center; margin-top: 24px;">
            Urgent? WhatsApp us at <a href="https://wa.me/917827717445" style="color: #059669;">+91 78277 17445</a>
          </p>
        </div>
        <div style="background: #f9fafb; padding: 24px 32px; border-radius: 0 0 16px 16px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2025 Pixen India Digital</p>
        </div>
      </div>
    `,
  };
}

export async function POST(req: Request) {
  try {
    const body: EmailBody = await req.json();
    const { to, name, planName, planPrice, type } = body;

    if (!to || !name || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      // Log but don't fail hard — emails are non-critical
      console.warn('Email credentials not configured. Skipping email send.');
      return NextResponse.json({ success: true, skipped: true });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: emailUser, pass: emailPass },
    });

    const { subject, html } = getEmailContent(type, name, planName, planPrice);

    // Send confirmation to user
    await transporter.sendMail({
      from: `"Pixen India Digital" <${emailUser}>`,
      to,
      subject,
      html,
    });

    // Notify internal team
    if (type === 'payment_confirmation' || type === 'contact_confirmation') {
      await transporter.sendMail({
        from: `"Pixen India Notifications" <${emailUser}>`,
        to: 'Pixenindiadigital@gmail.com',
        subject: `[${type === 'payment_confirmation' ? 'NEW PAYMENT' : 'NEW LEAD'}] ${name} — ${planName || 'Audit Request'}`,
        html: `<p>New ${type === 'payment_confirmation' ? 'payment' : 'lead'} from <strong>${name}</strong> (${to}). Plan: ${planName || 'N/A'}.</p>`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Email send error:', err);
    // Return 200 even on email failure — don't block user flows for this
    return NextResponse.json({ success: false, error: err.message });
  }
}
