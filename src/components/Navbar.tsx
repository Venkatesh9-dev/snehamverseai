"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      <div className="w-full border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* LOGO: SnehAmverse (Text-based professional mark) */}
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-bold tracking-tighter text-white group-hover:text-cyan-400 transition-colors">
              SnehAm<span className="text-zinc-500 group-hover:text-white transition-colors">verse</span>
              <span className="text-cyan-500 ml-0.5">AI</span>
            </span>
          </Link>

          {/* DESKTOP NAV (Mac/Laptop) */}
          <nav className="hidden lg:flex items-center gap-2">
            {[
              { name: "Programs", href: "/programs" },
              { name: "Workshops", href: "/workshops" },
              { name: "Institutions", href: "/institutions" },
              { name: "About", href: "/about" },
            ].map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full group ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  <div className={`absolute inset-0 bg-white/5 rounded-full transition-all duration-300 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"}`} />
                  {isActive && (
                    <div className="absolute -bottom-[26px] left-0 w-full h-[2px] bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT SIDE: CTA & MOBILE TOGGLE */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden sm:inline-flex px-6 py-2.5 rounded-xl bg-white text-zinc-950 text-sm font-bold hover:bg-cyan-50 transition-all active:scale-95"
            >
              Book Workshop
            </Link>

            {/* Mobile/Tablet Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY (iOS/Android/Tablet) */}
      <div className={`lg:hidden fixed inset-0 top-20 bg-zinc-950/95 backdrop-blur-2xl transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col p-8 gap-6">
          {[
            { name: "Programs", href: "/programs" },
            { name: "Workshops", href: "/workshops" },
            { name: "Institutions", href: "/institutions" },
            { name: "About", href: "/about" },
            { name: "Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-3xl font-semibold text-zinc-100 hover:text-cyan-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}