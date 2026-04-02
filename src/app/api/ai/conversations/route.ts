import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    /* ── Auth ── */
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /* ── Only return conversations owned by this user ── */
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .eq("user_id", userId)          // ✅ real user — never "guest"
      .eq("is_deleted", false)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ conversations: data });
  } catch (err: any) {
    console.error("Conversations fetch error:", err.message);
    return NextResponse.json({ conversations: [] });
  }
}