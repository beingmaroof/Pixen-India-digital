import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, businessType, goals = [], revenue = '' } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required for audit generation" }, { status: 400 });
    }

    // AI Smart Qualification Algorithm (Deterministic Mock)
    let aiScore = 50;
    const highValueSectors = ['SaaS / Software', 'E-Commerce', 'B2B Company'];
    if (highValueSectors.includes(businessType)) aiScore += 15;
    if (revenue.includes('₹20L') || revenue.includes('₹1Cr+')) aiScore += 25;
    if (goals.length >= 3) aiScore += 10;

    // Simulate extensive report building pipeline lag
    await new Promise(resolve => setTimeout(resolve, 4000));

    const mockReportUrl = `https://pixen-assets.com/reports/audit_${Date.now()}_secured.pdf`;
    const priority = aiScore > 75 ? 'high' : aiScore < 40 ? 'low' : 'medium';

    // Back-update the latest lead to push Status out of "new" and configure AI Priority
    const { error } = await supabase.from('leads')
      .update({
        status: 'audit_ready',
        priority: priority
      })
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error("[Audit Generator] Database sync error:", error);
    }

    console.info(`[Audit Generator] Successfully processed lead for ${email}. AI Score: ${aiScore}`);

    return NextResponse.json({ success: true, aiScore, mockReportUrl, priority });

  } catch (error) {
    console.error("[Audit Generator] Critial pipeline failure:", error);
    return NextResponse.json({ error: "Failed to generate report schema" }, { status: 500 });
  }
}
