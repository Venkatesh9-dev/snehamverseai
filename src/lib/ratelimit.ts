import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/* ============================================================
   REDIS CLIENT
============================================================ */

const redis = Redis.fromEnv();

/* ============================================================
   RATE LIMITERS (PRODUCTION READY)

   Free  : 30 requests per day
   Pro   : 300 requests per day

   Uses sliding window → smooth UX
   Prefix updated → resets old limits instantly
============================================================ */

let _freeLimiter: Ratelimit | null = null;
let _proLimiter: Ratelimit | null = null;

export function getFreeLimiter(): Ratelimit {
  if (!_freeLimiter) {
    _freeLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, "1 d"), // ✅ upgraded
      analytics: true,
      prefix: "ratelimit:free:v2", // ✅ reset old limits
    });
  }
  return _freeLimiter;
}

export function getProLimiter(): Ratelimit {
  if (!_proLimiter) {
    _proLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(300, "1 d"), // ✅ realistic SaaS
      analytics: true,
      prefix: "ratelimit:pro:v2", // ✅ reset old limits
    });
  }
  return _proLimiter;
}

/* ============================================================
   USAGE (IMPORTANT)

   In your API route:

   const limiter = isPro ? getProLimiter() : getFreeLimiter();

   const { success } = await limiter.limit(userId);

   if (!success) {
     return NextResponse.json(
       { error: "Daily limit reached. Upgrade to Pro." },
       { status: 429 }
     );
   }

============================================================ */

/* ============================================================
   PLAN CONTROL (CLERK)

   publicMetadata.plan = "free" | "pro"

   Example:
   const plan = user?.publicMetadata?.plan || "free";
============================================================ */