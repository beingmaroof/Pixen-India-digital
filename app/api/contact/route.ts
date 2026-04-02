import { NextResponse } from "next/server";
import { validateOrigin, isRateLimited, isBotHoneypot } from "@/lib/security";
import { sanitize, normalizeEmail } from "@/lib/sanitizer";

export async function POST(req: Request) {
  try {
    if (!validateOrigin(req)) {
      console.warn("CSRF blocked cross-origin request to /api/contact");
      return NextResponse.json({ error: "Unauthorized source" }, { status: 403 });
    }

    const rateLimit = isRateLimited(req, '/api/contact', 10, 60000);
    if (!rateLimit.success) {
      console.warn("Rate limit exceeded for contact form");
      return NextResponse.json({ success: false, error: "Too many requests. Please try again later.", errorCode: "RATE_LIMIT_EXCEEDED", retryAfter: rateLimit.retryAfter }, { status: 429 });
    }

    const body = await req.json();

    if (isBotHoneypot(body)) {
      console.warn("Honeypot triggered on contact form");
      // Silently pretend it worked to trick the bot
      return NextResponse.json({ success: true });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase env vars in /api/contact');
      return NextResponse.json({ error: "Service configuration error" }, { status: 500 });
    }

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseKey);

    // AI Smart Lead Qualification
    const budgetRaw = String(body.budget || '');
    let aiScore = 50;
    if (budgetRaw.includes('3,00,000') || budgetRaw.includes('Above')) aiScore += 30;
    if (budgetRaw.includes('Below ₹50,000')) aiScore -= 20;
    
    // Message insight
    const msg = String(body.message || '');
    if (msg.length > 50) aiScore += 10;
    if (msg.toLowerCase().includes('scale') || msg.toLowerCase().includes('growth')) aiScore += 10;

    let autoPriority = 'medium';
    if (aiScore > 70) autoPriority = 'high';
    if (aiScore < 40) autoPriority = 'low';

    const { error } = await supabase.from("leads").insert([{
      name: sanitize(body.name).substring(0, 100),
      email: normalizeEmail(body.email).substring(0, 100),
      phone: sanitize(body.phone).substring(0, 20),
      businessType: sanitize(body.businessType).substring(0, 100),
      budget: sanitize(body.budget).substring(0, 100),
      message: sanitize(body.message).substring(0, 2000) + `\n\n[AI Qual Score: ${aiScore} | Priority: ${autoPriority}]`,
      source: sanitize(body.source || 'contact_form').substring(0, 50),
      status: 'new'
    }]);

    if (error) {
      console.error('Supabase Insert Error:', error);
      // Masking db errors from frontend
      return NextResponse.json({ error: "Failed to process request. Please try again later." }, { status: 500 });
    }

    // Structured server-side logging for perfect analytics reliability
    console.info("lead_created", {
      email: body.email,
      name: body.name,
      timestamp: new Date().toISOString(),
      source: body.source || 'contact_form',
      aiScore,
      priority: autoPriority
    });

    return NextResponse.json({ success: true, ai_qualification_score: aiScore });
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}