import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
  try {
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
