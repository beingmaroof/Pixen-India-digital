import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Missing env" }, { status: 500 });
    }

    const { createClient } = await import("@supabase/supabase-js");

    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();

    const { error } = await supabase.from("contacts").insert([body]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}