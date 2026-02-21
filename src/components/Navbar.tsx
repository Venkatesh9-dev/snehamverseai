"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold tracking-tight">
          SnehamVerseAI
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          <Link href="/programs" className="hover:text-zinc-50 transition">
            Programs
          </Link>
          <Link href="/workshops" className="hover:text-zinc-50 transition">
            Workshops
          </Link>
          <Link href="/institutions" className="hover:text-zinc-50 transition">
            Institutions
          </Link>
          <Link href="/about" className="hover:text-zinc-50 transition">
            About
          </Link>
        </nav>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 transition"
        >
          Book Workshop
        </Link>
      </div>
    </header>
  );
}