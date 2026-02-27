import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book AI Workshops & Institutional Training Programs",
  description:
    "Book AI literacy workshops, GenAI training sessions, and automation programs for colleges, government bodies, and corporate institutions.",
};

export default function WorkshopsPage() {
  return (
    <main className="bg-zinc-950 text-zinc-50 min-h-screen selection:bg-cyan-500/30 font-sans pb-24">

      {/* ================= HEADER ================= */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-white/5">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="relative max-w-5xl mx-auto px-6 text-center space-y-6 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Institutional Training
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
            Flexible <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Program Formats</span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            SnehamVerseAI workshops are designed to adapt to institutional needs,
            participant levels, and time availability. Programs can be delivered
            in modular or intensive formats.
          </p>
        </div>
      </section>

      {/* ================= PROGRAM FORMATS ================= */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            
            {/* Ambient grid glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Format 1 */}
            <div className="group relative p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:bg-zinc-900/60 hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300 shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="space-y-6 relative z-10">
                <div className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-wider w-fit border border-cyan-500/20">
                  Introductory
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-zinc-100 group-hover:text-cyan-50 transition-colors">
                  3-Hour Session
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed font-light">
                  A foundational overview of AI literacy, ethical awareness,
                  and practical exposure designed for first-time participants.
                </p>
              </div>
            </div>

            {/* Format 2 */}
            <div className="group relative p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:bg-zinc-900/60 hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="space-y-6 relative z-10">
                <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono uppercase tracking-wider w-fit border border-blue-500/20">
                  Intensive
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-zinc-100 group-hover:text-blue-50 transition-colors">
                  1-Day Bootcamp
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed font-light">
                  Deep-dive workshop covering structured AI frameworks,
                  real-world applications, and interactive exercises.
                </p>
              </div>
            </div>

            {/* Format 3 */}
            <div className="group relative p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:bg-zinc-900/60 hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300 shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="space-y-6 relative z-10">
                <div className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-wider w-fit border border-cyan-500/20">
                  Comprehensive
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-zinc-100 group-hover:text-cyan-50 transition-colors">
                  5-Day Curriculum
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed font-light">
                  Comprehensive AI literacy training including foundations,
                  responsible usage, academic workflows, and career readiness.
                </p>
              </div>
            </div>

            {/* Format 4 */}
            <div className="group relative p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:bg-zinc-900/60 hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="space-y-6 relative z-10">
                <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono uppercase tracking-wider w-fit border border-blue-500/20">
                  Tailored
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-zinc-100 group-hover:text-blue-50 transition-colors">
                  Custom Program
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed font-light">
                  Tailored curriculum aligned with institutional objectives,
                  academic standards, or corporate training goals.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= DELIVERY MODES ================= */}
      <section className="py-24 border-t border-white/5 bg-zinc-950/50">
        <div className="max-w-5xl mx-auto px-6 space-y-12 text-center">

          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
            Delivery Modes
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="group flex flex-col items-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all">
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
              </div>
              <h3 className="text-lg font-medium text-zinc-200">On-Site Delivery</h3>
              <p className="text-zinc-500 text-sm mt-2 font-light">At your campus or office</p>
            </div>

            <div className="group flex flex-col items-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              </div>
              <h3 className="text-lg font-medium text-zinc-200">Hybrid Format</h3>
              <p className="text-zinc-500 text-sm mt-2 font-light">Mix of in-person & digital</p>
            </div>

            <div className="group flex flex-col items-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all">
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
              </div>
              <h3 className="text-lg font-medium text-zinc-200">Fully Online</h3>
              <p className="text-zinc-500 text-sm mt-2 font-light">Remote digital sessions</p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          {/* Glowing background behind the CTA box */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative p-12 md:p-16 rounded-3xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl text-center space-y-8 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
              Schedule a Workshop <br/> for Your Institution.
            </h2>
            <p className="text-zinc-400 text-lg font-light">
              Contact our team to discuss customized AI training modules tailored to your exact needs.
            </p>

            <div className="flex justify-center pt-4">
              <a
                href="/contact"
                className="px-8 py-4 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 transition shadow-[0_0_30px_rgba(6,182,212,0.3)]"
              >
                Request Booking
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}