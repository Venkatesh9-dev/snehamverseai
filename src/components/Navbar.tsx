"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { name: "Programs",     href: "/programs" },
  { name: "Workshops",    href: "/workshops" },
  { name: "Institutions", href: "/institutions" },
  { name: "About",        href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="w-full fixed top-0 left-0 z-[9999] isolate">
      <div className="w-full border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* ── LOGO ─────────────────────────────────────────────── */}
          {/*
           * suppressHydrationWarning is placed on the element that
           * contains the logo text. Browser extensions (Grammarly,
           * Google Translate, etc.) split text nodes like
           * "SnehAmverseAI" → ["SnehAm", "verseAI"] on the client,
           * causing a hydration mismatch. suppressHydrationWarning
           * tells React to ignore text-node differences on this element
           * without disabling hydration for the whole tree.
           */}
          <Link href="/" className="flex items-center group" aria-label="SnehAmverseAI home">
            <span
              suppressHydrationWarning
              className="text-2xl font-bold tracking-tighter text-white group-hover:text-cyan-400 transition-colors select-none"
            >
              SnehAm
              <span className="text-zinc-500 group-hover:text-white transition-colors">verse</span>
              <span className="text-cyan-500 ml-0.5">AI</span>
            </span>
          </Link>

          {/* ── DESKTOP NAV ───────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 group ${
                    isActive
                      ? "text-white bg-white/5"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                  }`}
                >
                  {link.name}
                  {/* Active underline */}
                  {isActive && (
                    <span className="absolute -bottom-[26px] left-0 w-full h-0.5 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── RIGHT SIDE ────────────────────────────────────────── */}
          <div className="flex items-center gap-3">

            {/* Sign In */}
            <Link
              href="/sign-in"
              className="hidden sm:inline-flex px-5 py-2.5 rounded-xl bg-cyan-500 text-zinc-950 text-sm font-bold hover:bg-cyan-400 transition-all active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              Sign In
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                    isOpen ? "rotate-45 translate-y-[9px]" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                    isOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-[9px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU ───────────────────────────────────────────── */}
      {/*
       * Using isOpen directly (no mounted check) is intentional.
       * isOpen starts as false on both server and client, so the
       * menu is hidden on both sides during SSR. There is no mismatch.
       * The menu only appears after a user click (client-only event).
       */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-zinc-950/95 backdrop-blur-2xl transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <nav className="flex flex-col p-8 gap-6" aria-label="Mobile navigation">
          {[...NAV_LINKS, { name: "Contact", href: "/contact" }].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-3xl font-semibold text-zinc-100 hover:text-cyan-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/sign-in"
            onClick={() => setIsOpen(false)}
            className="text-2xl font-semibold text-white mt-4 hover:text-cyan-400 transition-colors"
            >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}