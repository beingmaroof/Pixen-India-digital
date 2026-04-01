import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { validateOrigin } from '@/lib/security';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(req: Request) {
  try {
    // 1. CSRF / Origin Validation
    if (!validateOrigin(req)) {
      console.warn("CSRF blocked cross-origin request to /api/razorpay/verify");
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
      console.warn("Invalid token used for /api/razorpay/verify");
      return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      console.warn(`Invalid signature detected for user ${user.id} and order ${razorpay_order_id}`);
      return NextResponse.json({ verified: false, error: 'Invalid payment signature' }, { status: 400 });
    }

    // 4. Structured Analytics Logging
    console.info("payment_verified", {
      userId: user.id,
      email: user.email,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({ verified: true });
  } catch (err: any) {
    console.error('Razorpay verify error:', err);
    return NextResponse.json({ error: 'Verification failed. Please try again or contact support.' }, { status: 500 });
  }
}
