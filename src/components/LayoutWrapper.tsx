"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/*
 * Layout controller:
 * - Keeps Navbar hidden on AI app/auth pages
 * - Shows company Footer on public marketing pages
 * - Keeps hydration safe
 */

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout =
    pathname === "/ai" ||
    pathname.startsWith("/ai/") ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up");

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />

      <main className="pt-16">
        {children}
      </main>

      <Footer />
    </>
  );
}