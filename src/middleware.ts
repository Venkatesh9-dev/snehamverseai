import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/ai(.*)",
]);

const isPublicApiRoute = createRouteMatcher([
  "/api/ai/(.*)",
  "/api/(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // ✅ Allow APIs
  if (isPublicApiRoute(req)) return NextResponse.next();

  // 🔥 NEW: Redirect logged-in users from "/" → "/ai"
  if (req.nextUrl.pathname === "/" && userId) {
    return NextResponse.redirect(new URL("/ai", req.url));
  }

  // 🔒 Protect routes
  if (isProtectedRoute(req)) {
    if (!userId) return redirectToSignIn();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|woff|woff2|ttf|otf)$).*)",
  ],
};