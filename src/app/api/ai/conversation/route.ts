import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST() {
  try {
    const user_id = "guest";

    // 🆕 Create conversation
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

    // 🧠 Get user memory
    const { data: profile } = await supabaseAdmin
      .from("user_profiles")
      .select("name")
      .eq("user_id", user_id)
      .single();

    // 💬 Smart greeting
    let greeting = "Hi there 👋 How can I help you today?";

    if (profile?.name) {
      greeting = `Welcome back, ${profile.name} 👋 Ready to continue your AI journey today?`;
    }

    // 💾 Save greeting
    const { error: msgError } = await supabaseAdmin.from("ai_messages").insert([
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
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}