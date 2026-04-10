import { NextResponse } from 'next/server';
import { listLeadNotes, listRecentLeads, updateLeadRecord } from '@/lib/lead-crm';
import { requireAdmin } from '@/lib/server-auth';

export async function GET(request: Request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const leads = await listRecentLeads();
    const enriched = await Promise.all(
      leads.map(async (lead) => ({
        ...lead,
        notes: await listLeadNotes(lead.id),
      }))
    );

    return NextResponse.json({ leads: enriched });
  } catch (error: any) {
    console.error('Admin lead fetch error:', error);
    return NextResponse.json({ error: 'Unable to load leads.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    if (!body.leadId || !body.updates) {
      return NextResponse.json({ error: 'Missing update payload.' }, { status: 400 });
    }

    const updates = {
      ...body.updates,
      owner_name: body.updates.owner_id ? admin.displayName : body.updates.owner_name,
    };

    const lead = await updateLeadRecord(String(body.leadId), updates);
    return NextResponse.json({ success: true, lead });
  } catch (error: any) {
    console.error('Admin lead update error:', error);
    return NextResponse.json({ error: error?.message || 'Unable to update lead.' }, { status: 500 });
  }
}
