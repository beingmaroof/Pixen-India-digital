import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { validateOrigin, isRateLimited } from '@/lib/security';

export async function POST(request: Request) {
  try {
    if (!validateOrigin(request)) {
      return NextResponse.json({ error: "Unauthorized source" }, { status: 403 });
    }

    const rateLimit = isRateLimited(request, '/api/check-email-provider', 5, 60000);
    if (!rateLimit.success) {
      return NextResponse.json({ success: false, error: "Too many login attempts. Please wait.", errorCode: "RATE_LIMIT_EXCEEDED", retryAfter: rateLimit.retryAfter }, { status: 429 });
    }
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ exists: false, provider: null }, { status: 400 });
    }

    // Use the admin API to look up users by email — this checks the actual auth layer
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      console.error('Admin listUsers error:', error);
      // Fallback: assume unknown on error — don't block the user
      return NextResponse.json({ exists: false, provider: null });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const matchedUser = data.users.find(
      (u) => u.email?.toLowerCase() === normalizedEmail
    );

    if (!matchedUser) {
      return NextResponse.json({ exists: false, provider: null });
    }

    // Determine the primary provider
    const identities = matchedUser.identities || [];
    const hasGoogle = identities.some((id) => id.provider === 'google');
    const hasEmail = identities.some((id) => id.provider === 'email');

    let provider: 'google' | 'email' | 'other' = 'other';
    if (hasGoogle && !hasEmail) provider = 'google';
    else if (hasEmail) provider = 'email';

    return NextResponse.json({ exists: true, provider });
  } catch (err) {
    console.error('check-email-provider error:', err);
    return NextResponse.json({ exists: false, provider: null });
  }
}
