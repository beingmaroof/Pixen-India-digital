import { NextResponse } from 'next/server';

const PLAN_AMOUNTS: Record<string, number> = {
  starter: 4999900,
  growth: 9999900,
  premium: 19999900,
};

export async function POST(req: Request) {
  try {
    const { plan, userId, email } = await req.json();

    if (!plan || !PLAN_AMOUNTS[plan]) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: 'Payment gateway not configured. Please contact support.' }, { status: 500 });
    }

    // Dynamic import to avoid SSG crash when env vars are absent
    const Razorpay = (await import('razorpay')).default;
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const order = await razorpay.orders.create({
      amount: PLAN_AMOUNTS[plan],
      currency: 'INR',
      receipt: `receipt_${userId}_${Date.now()}`,
      notes: { userId, email, plan },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (err: any) {
    console.error('Razorpay order error:', err);
    return NextResponse.json({ error: err.message || 'Failed to create payment order' }, { status: 500 });
  }
}
