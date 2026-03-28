import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase env vars in /api/contact');
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();

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
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}