import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('audit_slots')
      .select('total_slots, used_slots')
      .single();

    if (error || !data) {
      // Fallback if table not ready
      return NextResponse.json({ total: 5, used: 2, remaining: 3 });
    }

    return NextResponse.json(
      {
        total: data.total_slots,
        used: data.used_slots,
        remaining: data.total_slots - data.used_slots,
      },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch {
    return NextResponse.json({ total: 5, used: 2, remaining: 3 });
  }
}
