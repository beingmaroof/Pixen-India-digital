import { NextResponse } from 'next/server';
import { validateOrigin } from '@/lib/security';
import { supabaseAdmin } from '@/lib/supabase-admin';

const PLAN_AMOUNTS: Record<string, number> = {
  starter: 4999900,
  growth: 9999900,
  premium: 19999900,
};

export async function POST(req: Request) {
  try {
    // 1. CSRF / Origin Validation
    if (!validateOrigin(req)) {
      console.warn("CSRF blocked cross-origin request to /api/razorpay/order");
      return NextResponse.json({ error: "Unauthorized request origin" }, { status: 403 });
    }

    // 2. Extract Bearer Token
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace(/^Bearer\s/i, '');
    
    if (!token) {
      return NextResponse.json({ error: "Missing authentication token" }, { status: 401 });
    }

    // 3. Verify user securely on the server
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !user) {
      console.warn("Invalid token used for /api/razorpay/order");
      return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 });
    }

    const { plan, userId, email } = await req.json();

    // 4. Validate payload matches token owner
    if (user.id !== userId) {
      console.warn(`User ID mismatch in order creation. Token: ${user.id}, Payload: ${userId}`);
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    if (!plan || !PLAN_AMOUNTS[plan]) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error('Missing Razorpay env vars');
      return NextResponse.json({ error: 'Payment gateway unconfigured temporarily' }, { status: 500 });
    }

    // Dynamic import to avoid SSG crash when env vars are absent
    const Razorpay = (await import('razorpay')).default;
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const order = await razorpay.orders.create({
      amount: PLAN_AMOUNTS[plan],
      currency: 'INR',
      receipt: `receipt_${user.id}_${Date.now()}`,
      notes: { userId: user.id, email: user.email || '', plan },
    }) as any;

    // 5. Structured Analytics Logging
    console.info("payment_initiated", {
      userId: user.id,
      email: user.email,
      plan,
      amount: order.amount,
      orderId: order.id,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (err: any) {
    console.error('Razorpay order error:', err);
    return NextResponse.json({ error: 'Failed to create payment order. Please try again.' }, { status: 500 });
  }
}

