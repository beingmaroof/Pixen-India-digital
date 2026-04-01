import { NextResponse } from "next/server";
import { validateOrigin, isRateLimited, isBotHoneypot } from "@/lib/security";

export async function POST(req: Request) {
  try {
    if (!validateOrigin(req)) {
      console.warn("CSRF blocked cross-origin request to /api/contact");
      return NextResponse.json({ error: "Unauthorized source" }, { status: 403 });
    }

    if (isRateLimited(req, 10, 60000)) { // 10 requests per minute
      console.warn("Rate limit exceeded for contact form");
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
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

    const { error } = await supabase.from("contacts").insert([{
      name: body.name,
      email: body.email,
      phone: body.phone,
      businessType: body.businessType,
      budget: body.budget,
      message: body.message,
      source: body.source || 'contact_form'
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
      source: body.source || 'contact_form'
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}