import { NextResponse } from 'next/server';
import { addLeadNote } from '@/lib/lead-crm';
import { requireAdmin } from '@/lib/server-auth';

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    if (!body.leadId || !body.note) {
      return NextResponse.json({ error: 'Lead and note are required.' }, { status: 400 });
    }

    const note = await addLeadNote(
      String(body.leadId),
      admin.id,
      admin.displayName,
      String(body.note).trim()
    );

    return NextResponse.json({ success: true, note });
  } catch (error: any) {
    console.error('Admin note create error:', error);
    return NextResponse.json({ error: error?.message || 'Unable to save note.' }, { status: 500 });
  }
}
