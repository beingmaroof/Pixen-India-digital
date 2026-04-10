import { NextResponse } from 'next/server';
import { createAuditBooking } from '@/lib/lead-crm';
import { getAvailableAuditSlots, getAuditSlotSummary } from '@/lib/audit-slots';
import { validateOrigin, isRateLimited } from '@/lib/security';

export async function GET() {
  try {
    const summary = await getAuditSlotSummary();
    return NextResponse.json(summary, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error: any) {
    console.error('Audit booking slot error:', error);
    return NextResponse.json({ error: 'Unable to load slots.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!validateOrigin(request)) {
      return NextResponse.json({ error: 'Unauthorized source' }, { status: 403 });
    }

    const rateLimit = isRateLimited(request, '/api/audit/bookings', 6, 60000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many booking attempts. Please wait a moment.', retryAfter: rateLimit.retryAfter },
        { status: 429 }
      );
    }

    const body = await request.json();

    if (!body.leadId || !body.name || !body.email || !body.startsAt) {
      return NextResponse.json({ error: 'Missing booking fields.' }, { status: 400 });
    }

    const availableSlots = await getAvailableAuditSlots();
    const matchingSlot = availableSlots.find((slot) => slot.startsAt === body.startsAt && !slot.booked);

    if (!matchingSlot) {
      return NextResponse.json({ error: 'Selected slot is no longer available.' }, { status: 409 });
    }

    const booking = await createAuditBooking({
      leadId: String(body.leadId),
      name: String(body.name),
      email: String(body.email),
      phone: String(body.phone || ''),
      startsAt: String(body.startsAt),
      timezone: String(body.timezone || 'Asia/Calcutta'),
      userId: body.userId ? String(body.userId) : null,
    });

    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: error?.message || 'Unable to book this slot.' },
      { status: 500 }
    );
  }
}
