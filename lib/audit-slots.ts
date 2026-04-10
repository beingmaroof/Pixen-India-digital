import 'server-only';

import { supabaseAdmin } from '@/lib/supabase-admin';

export interface AvailableAuditSlot {
  id: string;
  startsAt: string;
  timezone: string;
  label: string;
  booked: boolean;
}

function createIstSlot(date: Date, hour: number, minute = 0) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), hour - 5, minute - 30));
}

function formatSlotLabel(date: Date) {
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Calcutta',
  }).format(date);
}

function generateFallbackSlots() {
  const slots: AvailableAuditSlot[] = [];
  const cursor = new Date();

  for (let dayOffset = 1; slots.length < 12 && dayOffset < 30; dayOffset += 1) {
    const current = new Date(cursor.getTime() + dayOffset * 24 * 60 * 60 * 1000);
    const weekday = current.getUTCDay();
    if (weekday === 0 || weekday === 6) continue;

    [11, 15].forEach((hour, index) => {
      if (slots.length >= 12) return;
      const startsAt = createIstSlot(current, hour, 0);
      slots.push({
        id: `fallback-${dayOffset}-${index}`,
        startsAt: startsAt.toISOString(),
        timezone: 'Asia/Calcutta',
        label: formatSlotLabel(startsAt),
        booked: false,
      });
    });
  }

  return slots;
}

export async function getAvailableAuditSlots() {
  const fallback = generateFallbackSlots();

  try {
    const [slotResponse, bookingResponse] = await Promise.all([
      supabaseAdmin
        .from('audit_slots')
        .select('*')
        .eq('is_active', true)
        .gte('starts_at', new Date().toISOString())
        .order('starts_at', { ascending: true })
        .limit(20),
      supabaseAdmin
        .from('audit_bookings')
        .select('starts_at, booking_status')
        .neq('booking_status', 'cancelled'),
    ]);

    if (slotResponse.error || !slotResponse.data || slotResponse.data.length === 0) {
      return fallback;
    }

    const bookedStarts = new Set(
      (bookingResponse.data || []).map((entry) => new Date(entry.starts_at).toISOString())
    );

    return slotResponse.data.map((slot) => {
      const startsAt = new Date(slot.starts_at);
      return {
        id: slot.id,
        startsAt: startsAt.toISOString(),
        timezone: slot.timezone || 'Asia/Calcutta',
        label: formatSlotLabel(startsAt),
        booked: bookedStarts.has(startsAt.toISOString()),
      };
    });
  } catch {
    return fallback;
  }
}

export async function getAuditSlotSummary() {
  const slots = await getAvailableAuditSlots();
  const total = slots.length;
  const used = slots.filter((slot) => slot.booked).length;
  return {
    total,
    used,
    remaining: Math.max(0, total - used),
    slots,
  };
}
