"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

/*
 * WHY THIS WORKS:
 *
 * The hydration mismatch was caused by wrapping <Navbar> in <ClerkLoaded>.
 * On the server, ClerkLoaded renders nothing (Clerk isn't loaded yet).
 * On the client, it renders <Navbar> → <header>.
 * React sees server=nothing, client=<header> → MISMATCH.
 *
 * The correct fix:
 * - Always render <Navbar> unconditionally — server and client agree.
 * - Move the auth-dependent rendering INSIDE Navbar using
 *   Clerk's <SignedIn> and <SignedOut> components, which render
 *   identically on server and client (they output a placeholder
 *   span on both sides, then swap content after hydration).
 * - No mounted hacks, no ClerkLoaded wrappers, no blank screens.
 */

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbar =
    pathname === "/ai" ||
    pathname.startsWith("/ai/") ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up");

  if (hideNavbar) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">{children}</main>
    </>
  );
}