// test-supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testInsert() {
  try {
    const { data, error } = await supabase
      .from("contact_requests")
      .insert([
        {
          name: "Test User",
          organization: "Test Org",
          role: "Tester",
          email: "test@example.com",
          phone: "1234567890",
          interest: "Debugging",
          message: "This is a test row",
        },
      ])
      .select();

    if (error) {
      console.error("Insert failed:", error);
    } else {
      console.log("Insert succeeded:", data);
    }
  } catch (err) {
    console.error("Connection error:", err);
  }
}

testInsert();
