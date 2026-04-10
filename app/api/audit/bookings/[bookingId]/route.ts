import { NextResponse } from 'next/server';
import { updateAuditBooking } from '@/lib/lead-crm';
import { validateOrigin } from '@/lib/security';

export async function PATCH(
  request: Request,
  { params }: { params: { bookingId: string } }
) {
  try {
    if (!validateOrigin(request)) {
      return NextResponse.json({ error: 'Unauthorized source' }, { status: 403 });
    }

    const body = await request.json();
    const action = String(body.action || '');

    if (action === 'cancel') {
      const booking = await updateAuditBooking(
        params.bookingId,
        {
          booking_status: 'cancelled',
          cancellation_reason: String(body.reason || 'Cancelled by user'),
        },
        body.leadId ? String(body.leadId) : undefined
      );

      return NextResponse.json({ success: true, booking });
    }

    return NextResponse.json({ error: 'Unsupported booking action.' }, { status: 400 });
  } catch (error: any) {
    console.error('Booking update error:', error);
    return NextResponse.json(
      { error: error?.message || 'Unable to update booking.' },
      { status: 500 }
    );
  }
}
