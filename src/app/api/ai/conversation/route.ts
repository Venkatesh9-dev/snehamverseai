import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST() {
  try {
    /* ── Auth ── */
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /* ✅ Real user ID — never "guest" */
    const user_id = userId;

    /* Create conversation scoped to this user */
    const { data: conversation, error: convoError } = await supabaseAdmin
      .from("conversations")
      .insert([{ user_id }])
      .select()
      .single();

    if (convoError || !conversation) {
      console.error("Conversation insert failed:", convoError);
      return NextResponse.json(
        { error: "Failed to create conversation" },
        { status: 500 }
      );
    }

    /* Memory — scoped to this user only */
    const { data: profile } = await supabaseAdmin
      .from("user_profiles")
      .select("name")
      .eq("user_id", user_id)
      .single();

    /* Personalised greeting */
    let greeting = "Hi there 👋 How can I help you today?";
    if (profile?.name) {
      greeting = `Welcome back, ${profile.name} 👋 Ready to continue your AI journey today?`;
    }

    /* Save greeting message */
    const { error: msgError } = await supabaseAdmin
      .from("ai_messages")
      .insert([
        {
          conversation_id: conversation.id,
          role: "assistant",
          message: greeting,
          user_id,
        },
      ]);

    if (msgError) {
      console.error("Greeting insert failed:", msgError);
    }

    return NextResponse.json({ conversation });
  } catch (err) {
    console.error("Conversation API crash:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}