import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/server-auth';
import { getLatestLeadByEmail, listAuditBookingsForLead } from '@/lib/lead-crm';

export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const lead = await getLatestLeadByEmail(user.email);
    if (!lead) {
      return NextResponse.json(
        { lead: null, bookings: [] },
        {
          headers: {
            'Cache-Control': 'no-store, max-age=0',
          },
        }
      );
    }

    const bookings = await listAuditBookingsForLead(lead.id);

    return NextResponse.json(
      {
        lead,
        bookings,
      },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error: any) {
    console.error('Dashboard lead API error:', error);
    return NextResponse.json({ error: 'Unable to load dashboard lead data.' }, { status: 500 });
  }
}
