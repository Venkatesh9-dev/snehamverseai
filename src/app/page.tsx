import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SnehAmverseAI | AI Literacy & GenAI Workshops for Institutions in India",
  description:
    "Structured AI literacy programs and GenAI workshops for schools, colleges, and enterprises across India. Responsible AI education for the real world.",
  alternates: {
    canonical: "https://snehamverseai.com",
  },
};

const PROGRAM_CARDS = [
  {
    id: "01",
    title: "Foundations of Artificial Intelligence",
    desc: "Understanding AI systems, real capabilities, and limitations beyond hype.",
    color: "cyan" as const,
  },
  {
    id: "02",
    title: "Responsible AI & Ethical Usage",
    desc: "Academic integrity, decision awareness, and responsible prompting methodologies.",
    color: "blue" as const,
  },
  {
    id: "03",
    title: "AI for Academics",
    desc: "Research assistance, structured revision systems, and workflow optimization.",
    color: "cyan" as const,
  },
  {
    id: "04",
    title: "AI for Entrepreneurs & Professionals",
    desc: "Business productivity, automation, and strategic AI integration.",
    color: "blue" as const,
  },
];

export default function Home() {
  return (
    <main className="bg-zinc-950 text-zinc-50 min-h-screen selection:bg-cyan-500/30 relative z-0">

      {/* ══════════════ HERO ══════════════ */}
      {/*
        min-h-[100dvh] = dynamic viewport height (iOS Safari safe).
        overflow-hidden on the SECTION (not body) clips the video
        without breaking position:fixed navbar.
      */}
      <section className="relative min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden z-0">

        {/*
          MOBILE VIDEO (hidden on sm+):
          - position: absolute, full section height
          - w-auto preserves natural aspect ratio (portrait video stays portrait)
          - centered with left-1/2 -translate-x-1/2
          - This makes the video fill vertically and overflow horizontally,
            showing the vertical scene just like the production site (Image 3)
          - overflow-hidden on the <section> clips the sides cleanly
        */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          className="sm:hidden absolute inset-0 h-full w-auto left-1/2 -translate-x-1/2 opacity-40 mix-blend-screen pointer-events-none z-0"
          style={{ objectFit: "cover", minWidth: "100%", minHeight: "100%" }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/*
          DESKTOP VIDEO (hidden on mobile):
          - Standard object-cover fills the full widescreen section
        */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          className="hidden sm:block absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen pointer-events-none z-0"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-zinc-950/60 to-zinc-950 pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Hero content */}
        <div className="relative w-full max-w-5xl mx-auto px-6 py-32 text-center space-y-8 z-10">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05]">
            AI Literacy
            <br />
            <span className="text-zinc-400 bg-clip-text text-transparent bg-gradient-to-r from-zinc-400 to-zinc-600">
              Structured for the Real World.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto font-light drop-shadow-md">
            Institutional AI education designed for responsible adoption,
            practical workflows, and long-term strategic clarity.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <Link
              href="/programs"
              className="px-8 py-4 rounded-lg text-sm font-medium text-white hover:opacity-90 transition"
              style={{
                background: "linear-gradient(to right, #0891b2, #2563eb)",
                boxShadow: "0 0 40px rgba(6,182,212,0.4)",
              }}
            >
              Explore Programs
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-lg text-sm font-medium border border-white/20 bg-black/40 hover:bg-black/60 text-zinc-200 transition backdrop-blur-md"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ STATEMENT ══════════════ */}
      <section className="py-20 md:py-32 relative flex justify-center px-6">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[200px] sm:h-[300px] bg-blue-500/5 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none z-0"
          aria-hidden="true"
        />
        <div className="relative w-full max-w-4xl mx-auto p-8 sm:p-12 md:p-16 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md shadow-2xl overflow-hidden z-10">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
            aria-hidden="true"
          />
          <div className="text-center space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-100">
              The AI Gap Is Growing.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed font-light max-w-2xl mx-auto">
              Artificial Intelligence is transforming education and industry at unprecedented speed.
              Yet structured AI literacy remains limited. SnehAmverseAI bridges exposure and understanding through
              responsible, institutional AI education.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════ PROGRAMS ══════════════ */}
      <section className="py-20 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-6 space-y-16 md:space-y-20">
          <div className="space-y-4 sm:space-y-6 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-100">
              Our Core Programs
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg font-light">
              Structured AI literacy frameworks for institutions,
              professionals, and organizations navigating the AI economy.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 relative">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none z-0"
              aria-hidden="true"
            />
            {PROGRAM_CARDS.map((card) => (
              <div
                key={card.id}
                className="group relative p-8 sm:p-10 rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-md hover:bg-zinc-900 hover:-translate-y-1 transition-all duration-300 space-y-4 z-10"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 ${
                    card.color === "cyan" ? "bg-cyan-500/10" : "bg-blue-500/10"
                  }`}
                >
                  <span
                    className={`font-semibold text-sm ${
                      card.color === "cyan" ? "text-cyan-400" : "text-blue-400"
                    }`}
                  >
                    {card.id}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-medium text-zinc-100">{card.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4 sm:pt-8">
            <Link
              href="/programs"
              className="text-cyan-500 hover:text-cyan-400 font-medium transition inline-flex items-center gap-2 text-sm sm:text-base"
            >
              View Full Programs <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section className="py-20 md:py-32 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative">
          <div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none z-0"
            aria-hidden="true"
          />
          <div className="relative p-8 sm:p-12 md:p-20 rounded-3xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl text-center space-y-8 sm:space-y-10 shadow-2xl z-10">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
              aria-hidden="true"
            />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-100">
              Bring structured AI literacy
              <br className="hidden sm:block" />
              {" "}to your institution.
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2 sm:pt-4">
              <Link
                href="/workshops"
                className="px-8 py-4 rounded-lg text-sm font-medium text-white hover:opacity-90 transition"
                style={{
                  background: "linear-gradient(to right, #06b6d4, #3b82f6)",
                  boxShadow: "0 0 30px rgba(6,182,212,0.3)",
                }}
              >
                Book a Workshop
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-lg text-sm font-medium border border-white/10 bg-zinc-950/50 hover:bg-zinc-800 text-zinc-300 transition"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}