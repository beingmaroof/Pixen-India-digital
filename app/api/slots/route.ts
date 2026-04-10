import { NextResponse } from 'next/server';
import { getAuditSlotSummary } from '@/lib/audit-slots';

export async function GET() {
  try {
    const summary = await getAuditSlotSummary();

    return NextResponse.json(
      {
        total: summary.total,
        used: summary.used,
        remaining: summary.remaining,
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
