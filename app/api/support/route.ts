import { NextResponse } from "next/server";
import { validateOrigin, isRateLimited } from "@/lib/security";
import { sanitize, normalizeEmail } from "@/lib/sanitizer";

export async function POST(req: Request) {
  try {
    if (!validateOrigin(req)) {
      return NextResponse.json({ error: "Unauthorized CSRF" }, { status: 403 });
    }
    const rateLimit = isRateLimited(req, '/api/support', 5, 60000);
    if (!rateLimit.success) {
      return NextResponse.json({ error: "Too many requests. Please try again later.", retryAfter: rateLimit.retryAfter }, { status: 429 });
    }
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase environment variables");
      return NextResponse.json({ error: "Server configuration error. Please try email instead." }, { status: 500 });
    }

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();

    // Insert into support_tickets table or fallback to contacts if support_tickets doesn't exist
    // We'll insert to support_tickets and if it fails due to table not existing, we'll try contacts
    let { error } = await supabase.from("support_tickets").insert([
      { 
        name: sanitize(body.name).substring(0, 100),
        email: normalizeEmail(body.email).substring(0, 100),
        phone: sanitize(body.phone).substring(0, 20),
        problem: sanitize(body.problem).substring(0, 2000),
        source: "support_page", 
        created_at: new Date().toISOString() 
      }
    ]);

    if (error && error.code === '42P01') { // 42P01 is undefined_table in postgres
      console.warn("support_tickets table does not exist, falling back to leads table");
      const { error: fallbackError } = await supabase.from("leads").insert([
        { 
          name: sanitize(body.name).substring(0, 100),
          email: normalizeEmail(body.email).substring(0, 100),
          phone: sanitize(body.phone).substring(0, 20),
          message: sanitize(body.problem).substring(0, 2000),
          source: 'support_page',
          businessType: 'support_ticket', // repurposing fields to fit contacts schema
          budget: 'N/A'
        }
      ]);
      if (fallbackError) throw fallbackError;
    } else if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Support API Error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to submit support request. Please try direct email." }, 
      { status: 500 }
    );
  }
}
