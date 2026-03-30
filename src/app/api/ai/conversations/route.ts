import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .eq("user_id", "guest") // later replace with auth user id
      .eq("is_deleted", false)
      .order("created_at", { ascending: false });
      

    if (error) throw error;

    return NextResponse.json({ conversations: data });
  } catch (err: any) {
    console.error("Conversations fetch error:", err.message);
    return NextResponse.json({ conversations: [] });
  }
}