import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {
  await redis.set("test-key", "Hello Chinna 🔥");

  const value = await redis.get("test-key");

  return NextResponse.json({
    success: true,
    value,
  });
}