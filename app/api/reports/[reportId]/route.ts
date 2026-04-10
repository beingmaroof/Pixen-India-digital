import { NextResponse } from 'next/server';
import { getLeadByReportId, listAuditBookingsForLead, listLeadNotes } from '@/lib/lead-crm';

export async function GET(
  _request: Request,
  { params }: { params: { reportId: string } }
) {
  try {
    const lead = await getLeadByReportId(params.reportId);

    if (!lead) {
      return NextResponse.json({ error: 'Report not found.' }, { status: 404 });
    }

    const [bookings, notes] = await Promise.all([
      listAuditBookingsForLead(lead.id),
      listLeadNotes(lead.id),
    ]);

    return NextResponse.json({
      lead,
      report: lead.audit_report,
      bookings,
      notes,
    });
  } catch (error: any) {
    console.error('Report lookup error:', error);
    return NextResponse.json({ error: 'Unable to load report.' }, { status: 500 });
  }
}
