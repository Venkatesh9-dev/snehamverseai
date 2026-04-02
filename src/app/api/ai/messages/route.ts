import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    /* ── Auth ── */
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const conversation_id = searchParams.get("conversation_id");

    if (!conversation_id) {
      return NextResponse.json(
        { error: "Missing conversation_id" },
        { status: 400 }
      );
    }

    /*
     * ✅ OWNERSHIP CHECK
     * Verify the conversation belongs to the requesting user BEFORE
     * returning any messages. Without this, any authenticated user
     * could read any conversation by guessing its UUID.
     */
    const { data: conversation, error: convError } = await supabaseAdmin
      .from("conversations")
      .select("id")
      .eq("id", conversation_id)
      .eq("user_id", userId)           // must belong to this user
      .single();

    if (convError || !conversation) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    /* Safe to return messages */
    const { data, error } = await supabaseAdmin
      .from("ai_messages")
      .select("*")
      .eq("conversation_id", conversation_id)
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ messages: data });
  } catch (err) {
    console.error("Messages fetch error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}