export default function AboutPage() {
  return (
    <main className="bg-zinc-950 text-zinc-50 min-h-screen selection:bg-cyan-500/30 font-sans pb-24">

      {/* ================= HERO / HEADER ================= */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="relative max-w-5xl mx-auto px-6 text-center space-y-6 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Institutional Mission
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
            Democratizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">AI Literacy</span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            Bridging the gap between technological advancement and human understanding through structured, responsible education.
          </p>
        </div>
      </section>

      {/* ================= NARRATIVE SECTION ================= */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative p-12 md:p-16 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md shadow-2xl space-y-12">
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

            <div className="space-y-4 text-center">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
                A Note from the Founder
              </h2>
              <div className="h-px w-12 bg-zinc-800 mx-auto" />
            </div>

            <div className="space-y-8 text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
              <p>
                As the **Founder & Managing Director** of <span className="text-zinc-100 font-medium">SNEHAMVERSE PRIVATE LIMITED</span>, my journey began with a simple realization: while AI is transforming the world, the literacy required to navigate it remains a privilege of the few.
              </p>
              <p>
                My book, <span className="text-cyan-400 italic font-medium">"An Uninvited Guest – AI"</span>, was written to demystify these systems and provide a responsible framework for adoption. SnehamVerseAI is the living extension of that curriculum.
              </p>
              <p>
                We are committed to empowering tier-2 cities, academic institutions, and government bodies with the tools they need to stay competitive in the AI era.
              </p>
            </div>

            <div className="pt-8 text-center">
              <p className="text-zinc-200 font-semibold text-2xl tracking-tight">Venkatesh Potti</p>
              <p className="text-cyan-500 font-mono text-xs tracking-widest uppercase mt-1">Founder & Managing Director</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MILESTONES ================= */}
      <section className="py-24 border-t border-white/5 bg-zinc-950/50">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">Project Milestones</h2>
            <p className="text-zinc-500 font-light">The foundational pillars of the SnehAmverse ecosystem.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Milestone 1 */}
            <div className="group relative p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-cyan-400 font-mono text-xs mb-6 uppercase tracking-[0.2em]">Launch 2026</p>
              <h3 className="text-2xl font-medium text-zinc-100 mb-4">Book Launch</h3>
              <p className="text-zinc-400 leading-relaxed font-light">
                "An Uninvited Guest – AI" officially launched, establishing the ethical foundation for our structured literacy curriculum.
              </p>
            </div>

            {/* Milestone 2 */}
            <div className="group relative p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-blue-400 font-mono text-xs mb-6 uppercase tracking-[0.2em]">Corporate Identity</p>
              <h3 className="text-2xl font-medium text-zinc-100 mb-4">DPIIT Recognition</h3>
              <p className="text-zinc-400 leading-relaxed font-light">
                SNEHAMVERSE PRIVATE LIMITED achieved formal recognition as a startup, enabling institutional governance and scalability.
              </p>
            </div>

            {/* Milestone 3 */}
            <div className="group relative p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-cyan-400 font-mono text-xs mb-6 uppercase tracking-[0.2em]">Expansion</p>
              <h3 className="text-2xl font-medium text-zinc-100 mb-4">EdTech Sync</h3>
              <p className="text-zinc-400 leading-relaxed font-light">
                Integration of digital platforms to extend curriculum reach to academic institutions and professional bodies nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL SPACE-THEMED CTA ================= */}
      <section className="py-32 px-6 relative">
        <div className="max-w-5xl mx-auto relative group">
          
          {/* Space Theme Glow (Hidden until hover) */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/40 via-blue-900/20 to-zinc-950 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Main Card */}
          <div className="relative p-12 md:p-24 rounded-[3rem] bg-zinc-900/50 border border-white/10 backdrop-blur-md text-center space-y-10 overflow-hidden shadow-2xl transition-all duration-500 group-hover:bg-zinc-900/30 group-hover:border-white/20">
            
            {/* Animated Space Particles Placeholder (Subtle Gradients) */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse opacity-20" />
                <div className="absolute bottom-20 right-40 w-1 h-1 bg-white rounded-full animate-pulse delay-75 opacity-20" />
                <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-150 opacity-20" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-100 relative z-10 leading-[1.15]">
              Be Part of the <br/> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-blue-400">
                SnehAmverse Story.
              </span>
            </h2>

            <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto relative z-10">
                Join us in building a future where AI literacy is accessible, ethical, and structured for real-world impact.
            </p>
            
            <div className="flex justify-center pt-6 relative z-10">
              <a
                href="/contact"
                className="px-12 py-5 rounded-2xl text-sm font-medium bg-white text-zinc-950 hover:bg-cyan-50 transition-all duration-300 shadow-[0_0_50px_rgba(6,182,212,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:scale-[1.02]"
              >
                Request Partnership
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}