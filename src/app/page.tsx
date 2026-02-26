export default function Home() {
  return (
    <main className="bg-zinc-950 text-zinc-50 min-h-screen selection:bg-cyan-500/30">
      
      {/* ================= HERO (3D Visual Background) ================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* 3D Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen pointer-events-none"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay to ensure text remains perfectly readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-zinc-950/60 to-zinc-950 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 py-32 text-center space-y-8 z-10">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05]">
            AI Literacy
            <br />
            <span className="text-zinc-400 bg-clip-text text-transparent bg-gradient-to-r from-zinc-400 to-zinc-600">
              Structured for the Real World.
            </span>
          </h1>

          <p className="text-xl text-zinc-300 max-w-2xl mx-auto font-light drop-shadow-md">
            Institutional AI education designed for responsible adoption,
            practical workflows, and long-term strategic clarity.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <a
              href="/programs"
              className="px-8 py-4 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:opacity-90 transition shadow-[0_0_40px_rgba(6,182,212,0.4)]"
            >
              Explore Programs
            </a>
            <a
              href="/contact"
              className="px-8 py-4 rounded-lg text-sm font-medium border border-white/20 bg-black/40 hover:bg-black/60 text-zinc-200 transition backdrop-blur-md"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </section>

      {/* ================= STATEMENT BLOCK ================= */}
      <section className="py-32 relative flex justify-center px-6">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative max-w-4xl w-full mx-auto p-12 md:p-16 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md shadow-2xl overflow-hidden">
          {/* Subtle top border glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          
          <div className="text-center space-y-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-100">
              The AI Gap Is Growing.
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
              Artificial Intelligence is transforming education and industry at unprecedented speed.
              Yet structured AI literacy remains limited. SnehamVerseAI bridges exposure and understanding through
              responsible, institutional AI education.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PROGRAMS ================= */}
      <section className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6 space-y-20">
          
          <div className="space-y-6 text-center">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-100">
              Our Core Programs
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light">
              Structured AI literacy frameworks for institutions,
              professionals, and organizations navigating the AI economy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 relative">
            
            {/* Ambient background glow for the whole grid */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Card 1 */}
            <div className="group relative p-10 rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-md hover:bg-zinc-900 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-1 transition-all duration-300 space-y-4 z-10">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-cyan-400 font-semibold">01</span>
              </div>
              <h3 className="text-2xl font-medium text-zinc-100 group-hover:text-cyan-50 transition-colors">
                Foundations of Artificial Intelligence
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Understanding AI systems, real capabilities, and limitations beyond hype.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative p-10 rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-md hover:bg-zinc-900 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1 transition-all duration-300 space-y-4 z-10">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-blue-400 font-semibold">02</span>
              </div>
              <h3 className="text-2xl font-medium text-zinc-100 group-hover:text-blue-50 transition-colors">
                Responsible AI & Ethical Usage
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Academic integrity, decision awareness, and responsible prompting methodologies.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative p-10 rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-md hover:bg-zinc-900 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-1 transition-all duration-300 space-y-4 z-10">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-cyan-400 font-semibold">03</span>
              </div>
              <h3 className="text-2xl font-medium text-zinc-100 group-hover:text-cyan-50 transition-colors">
                AI for Academics
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Research assistance, structured revision systems, and workflow optimization.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group relative p-10 rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-md hover:bg-zinc-900 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1 transition-all duration-300 space-y-4 z-10">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-blue-400 font-semibold">04</span>
              </div>
              <h3 className="text-2xl font-medium text-zinc-100 group-hover:text-blue-50 transition-colors">
                AI for Entrepreneurs & Professionals
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Business productivity, automation, and strategic AI integration.
              </p>
            </div>
            
          </div>
          
          <div className="text-center pt-8">
            <a href="/programs" className="text-cyan-500 hover:text-cyan-400 font-medium transition inline-flex items-center gap-2">
              View Full Programs <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative">
          
          {/* Glowing background behind the CTA box */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative p-12 md:p-20 rounded-3xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl text-center space-y-10 shadow-2xl">
            {/* Subtle top border glow for consistency */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-100">
              Bring structured AI literacy
              <br />
              to your institution.
            </h2>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <a
                href="/workshops"
                className="px-8 py-4 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 transition shadow-[0_0_30px_rgba(6,182,212,0.3)]"
              >
                Book a Workshop
              </a>
              <a
                href="/contact"
                className="px-8 py-4 rounded-lg text-sm font-medium border border-white/10 bg-zinc-950/50 hover:bg-zinc-800 text-zinc-300 transition backdrop-blur-sm"
              >
                Contact Our Team
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}