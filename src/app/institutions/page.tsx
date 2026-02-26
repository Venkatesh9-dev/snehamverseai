export default function InstitutionsPage() {
  return (
    <main className="bg-zinc-950 text-zinc-50 min-h-screen selection:bg-cyan-500/30 font-sans pb-24">

      {/* ================= HEADER ================= */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="relative max-w-5xl mx-auto px-6 text-center space-y-6 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Institutional Collaboration Model
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
            Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Partnerships</span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            SnehamVerseAI partners with Engineering colleges,
            global EdTech platforms, and public bodies to deliver structured 
            AI literacy programs aligned with future workforce demands.
          </p>
        </div>
      </section>

      {/* ================= PROCESS SECTION ================= */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 relative z-10">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
              Collaboration Framework
            </h2>
            <p className="text-zinc-400 font-light text-lg">A structured, 4-step deployment model for large-scale impact.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Step 1 */}
            <div className="group relative p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:bg-zinc-900/60 hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300 shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-cyan-400 font-bold text-xl">01</span>
                </div>
                <h3 className="text-2xl font-semibold text-zinc-100 group-hover:text-cyan-50 transition-colors">
                  Needs Assessment
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed font-light">
                  We evaluate institutional goals and participant profiles to design 
                  an optimized AI literacy framework.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:bg-zinc-900/60 hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-blue-400 font-bold text-xl">02</span>
                </div>
                <h3 className="text-2xl font-semibold text-zinc-100 group-hover:text-blue-50 transition-colors">
                  Curriculum Integration
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed font-light">
                  Program modules are customized for seamless integration with existing 
                  academic standards and corporate goals.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:bg-zinc-900/60 hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300 shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-cyan-400 font-bold text-xl">03</span>
                </div>
                <h3 className="text-2xl font-semibold text-zinc-100 group-hover:text-cyan-50 transition-colors">
                  Deployment
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed font-light">
                  Workshops are delivered via on-site, hybrid, or online channels 
                  featuring practical, hands-on frameworks.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="group relative p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:bg-zinc-900/60 hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-blue-400 font-bold text-xl">04</span>
                </div>
                <h3 className="text-2xl font-semibold text-zinc-100 group-hover:text-blue-50 transition-colors">
                  Impact Reporting
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed font-light">
                  Post-session analytics allow institutions to measure student impact 
                  and plan long-term AI strategy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TARGET BODIES ================= */}
      <section className="py-24 border-t border-white/5 bg-zinc-950/50">
        <div className="max-w-5xl mx-auto px-6 space-y-12 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
            Who We Collaborate With
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {/* ENGINEERING COLLEGES */}
            <div className="px-6 py-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 hover:border-blue-400 transition-all text-blue-50 font-medium cursor-default shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              Engineering Colleges
            </div>

            {/* EDTECH PLATFORMS */}
            <div className="px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 hover:border-cyan-400 transition-all text-cyan-50 font-medium cursor-default shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              EdTech Institutions & Platforms
            </div>

            <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all text-zinc-300 font-medium cursor-default">
              Corporate Training Departments
            </div>

            {/* GOVERNMENT HIGHLIGHT */}
            <div className="px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 hover:border-cyan-400 transition-all text-cyan-50 font-medium cursor-default shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              Government & Semi-Government Bodies
            </div>

            <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all text-zinc-300 font-medium cursor-default">
              Skill Development Authorities
            </div>
            
            <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all text-zinc-300 font-medium cursor-default">
              Professional Degree Institutions
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative p-12 md:p-16 rounded-3xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl text-center space-y-8 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
              Launch a Structured <br/> AI Literacy Partnership.
            </h2>
            <div className="flex justify-center pt-4">
              <a
                href="/contact"
                className="px-8 py-4 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 transition shadow-[0_0_30px_rgba(6,182,212,0.3)]"
              >
                Request Collaboration
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}