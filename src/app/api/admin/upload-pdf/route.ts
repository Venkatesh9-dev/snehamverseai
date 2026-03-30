import { NextRequest, NextResponse } from "next/server";
import { generateEmbedding } from "@/lib/ai/embeddings";
import { createClient } from "@supabase/supabase-js";
import PDFParser from "pdf2json";

// ✅ Prevent build-time execution
export const dynamic = "force-dynamic";

/* ============================================================
   HELPERS
============================================================ */

function chunkText(text: string, size = 1000) {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}

function extractTextFromPDF(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (err) => reject(err));

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      let text = "";

      for (const page of pdfData.Pages) {
        for (const item of page.Texts) {
          for (const r of item.R) {
            text += decodeURIComponent(r.T) + " ";
          }
        }
      }

      resolve(text);
    });

    pdfParser.parseBuffer(buffer);
  });
}

/* ============================================================
   MAIN API
============================================================ */

export async function POST(req: NextRequest) {
  try {
    // ✅ Safe env handling (NO crashes in build)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Missing Supabase environment variables" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 📄 Get file
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // 📦 Convert to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // 🧠 Extract text
    const text = await extractTextFromPDF(buffer);

    // ✂️ Chunking
    const chunks = chunkText(text);

    // 🔁 Process chunks
    for (const content of chunks) {
      const embedding = await generateEmbedding(content);

      const { error } = await supabase.from("documents").insert({
        content,
        embedding,
        metadata: { source: file.name },
      });

      if (error) {
        console.error("Supabase insert error:", error);
        throw error;
      }
    }

    return NextResponse.json({
      message: "PDF processed successfully",
      chunks: chunks.length,
    });

  } catch (error: any) {
    console.error("[UPLOAD_PDF_ERROR]", error);

    return NextResponse.json(
      { error: error?.message || "Upload failed" },
      { status: 500 }
    );
  }
}