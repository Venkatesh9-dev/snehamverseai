import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Programs & GenAI Curriculum for Institutions",
  description:
    "Explore structured AI literacy programs, GenAI modules, and automation workshops designed for colleges, professionals, and organizations across India.",
};

export default function ProgramsPage() {
  return (
    <main className="bg-zinc-950 text-zinc-50 min-h-screen selection:bg-cyan-500/30 font-sans pb-32">
      
      {/* ================= MASSIVE BACKGROUND GLOW ================= */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-900/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-900/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
        
        {/* ================= SPLIT SCREEN LAYOUT ================= */}
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* ================= LEFT COLUMN (STICKY) ================= */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              SnehAmverseAI Curriculum
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
              Structured <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                AI Literacy.
              </span>
            </h1>
            
            <p className="text-zinc-400 text-lg leading-relaxed font-light">
              A comprehensive, responsible, and practical AI education model designed for institutions preparing for an AI-driven future.
            </p>

            <div className="hidden lg:block pt-8">
              <a href="/workshops" className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm font-medium bg-white text-zinc-950 hover:bg-zinc-200 transition shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                Request a Workshop
              </a>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (SCROLLING CARDS) ================= */}
          <div className="lg:w-2/3 space-y-8">
            
            {/* Module 01 */}
            <div className="group relative p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:bg-zinc-900/80 hover:border-cyan-500/30 transition-all duration-500 shadow-2xl overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/5 blur-[80px] rounded-full group-hover:bg-cyan-500/10 transition-colors duration-500" />
              <div className="relative z-10 space-y-6">
                <div className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Module 01</div>
                <h2 className="text-3xl font-semibold text-zinc-100">Foundations of Artificial Intelligence</h2>
                <div className="space-y-4 text-zinc-400 font-light leading-relaxed">
                  <p>Participants gain a structured understanding of how AI systems work, what they can realistically achieve, and where their limitations lie.</p>
                  <p>This module establishes technical literacy, decision awareness, and foundational confidence in navigating AI tools safely.</p>
                </div>
              </div>
            </div>

            {/* Module 02 */}
            <div className="group relative p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:bg-zinc-900/80 hover:border-blue-500/30 transition-all duration-500 shadow-2xl overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-colors duration-500" />
              <div className="relative z-10 space-y-6">
                <div className="text-blue-400 font-mono text-sm tracking-widest uppercase">Module 02</div>
                <h2 className="text-3xl font-semibold text-zinc-100">Responsible AI & Ethical Usage</h2>
                <div className="space-y-4 text-zinc-400 font-light leading-relaxed">
                  <p>AI adoption must be aligned with ethical responsibility. This focuses on academic integrity, responsible prompting, and data awareness.</p>
                  <p>Learn to use AI as an assistive tool without compromising originality, accountability, or strict professional standards.</p>
                </div>
              </div>
            </div>

            {/* Module 03 */}
            <div className="group relative p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:bg-zinc-900/80 hover:border-cyan-500/30 transition-all duration-500 shadow-2xl overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/5 blur-[80px] rounded-full group-hover:bg-cyan-500/10 transition-colors duration-500" />
              <div className="relative z-10 space-y-6">
                <div className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Module 03</div>
                <h2 className="text-3xl font-semibold text-zinc-100">AI for Academic Excellence</h2>
                <div className="space-y-4 text-zinc-400 font-light leading-relaxed">
                  <p>Structured AI workflows for revision planning, research assistance, summarization, and cognitive concept clarification.</p>
                  <p>The core objective is to drastically enhance learning efficiency while maintaining intellectual discipline.</p>
                </div>
              </div>
            </div>

            {/* Module 04 */}
            <div className="group relative p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:bg-zinc-900/80 hover:border-blue-500/30 transition-all duration-500 shadow-2xl overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-colors duration-500" />
              <div className="relative z-10 space-y-6">
                <div className="text-blue-400 font-mono text-sm tracking-widest uppercase">Module 04</div>
                <h2 className="text-3xl font-semibold text-zinc-100">AI for Business & Entrepreneurship</h2>
                <div className="space-y-4 text-zinc-400 font-light leading-relaxed">
                  <p>Practical frameworks for leveraging AI in business workflows, automation systems, strategic planning, and operational efficiency.</p>
                  <p>Engineered strictly for founders, professionals, and decision-makers integrating AI into real-world operations.</p>
                </div>
              </div>
            </div>

            {/* Module 05 */}
            <div className="group relative p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:bg-zinc-900/80 hover:border-cyan-500/30 transition-all duration-500 shadow-2xl overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/5 blur-[80px] rounded-full group-hover:bg-cyan-500/10 transition-colors duration-500" />
              <div className="relative z-10 space-y-6">
                <div className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Module 05</div>
                <h2 className="text-3xl font-semibold text-zinc-100">Career Readiness in the AI Era</h2>
                <div className="space-y-4 text-zinc-400 font-light leading-relaxed">
                  <p>Exploration of emerging AI-driven roles, adaptive skill development, and structuring future-proof career pathways.</p>
                  <p>Participants gain deep awareness of how AI is reshaping industries and how to position themselves competitively.</p>
                </div>
              </div>
            </div>

            {/* Mobile CTA (Only shows on phones) */}
            <div className="lg:hidden pt-12">
              <a href="/workshops" className="flex items-center justify-center w-full px-8 py-4 rounded-xl text-sm font-medium bg-white text-zinc-950 hover:bg-zinc-200 transition">
                Request a Workshop
              </a>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}