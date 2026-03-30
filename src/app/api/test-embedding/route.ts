import { NextResponse } from "next/server";
import { generateEmbedding } from "@/lib/ai/embeddings";

export async function GET() {
  const vector = await generateEmbedding(
    "Artificial Intelligence basics for beginners"
  );

  return NextResponse.json({
    length: vector.length,
    sample: vector.slice(0, 5),
  });
}