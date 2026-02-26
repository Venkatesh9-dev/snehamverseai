import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  // Validate env variables
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase environment variables");
    return NextResponse.json(
      { error: "Server configuration missing." },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const resend = resendKey ? new Resend(resendKey) : null;

  try {
    const body = await req.json();
    const { name, organization, role, email, phone, interest, message } = body;

    // Insert into Supabase
    const { error: dbError } = await supabase
      .from("contact_requests")
      .insert([
        {
          name,
          organization,
          role,
          email,
          phone: phone || null,
          interest: interest || null,
          message,
        },
      ]);

    if (dbError) {
      console.error("Database Error:", dbError.message);
      return NextResponse.json(
        { error: "Database insert failed." },
        { status: 500 }
      );
    }

    // Send email (optional)
    if (resend) {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "snehamverseai@gmail.com",
        subject: "New Institutional Inquiry - SnehAmverseAI",
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Organization:</strong> ${organization}</p>
          <p><strong>Role:</strong> ${role}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Interest:</strong> ${interest || "N/A"}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error("Connection Error:", err);
    return NextResponse.json(
      { error: "Connection failed. Check network or Supabase access." },
      { status: 503 }
    );
  }
}