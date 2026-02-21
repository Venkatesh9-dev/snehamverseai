export default function Home() {
  return (
    <main className="min-h-screen">

      {/* ================= HERO SECTION ================= */}
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl space-y-8">

            <h1 className="text-5xl md:text-7xl font-bold tracking-[-0.02em] leading-[1.05]">
              AI Literacy for the Real World.
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
              Structured, practical AI education for students, educators,
              entrepreneurs, and professionals navigating the AI-driven future.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="/programs"
                className="px-6 py-3 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 transition"
              >
                Explore Programs
              </a>

              <a
                href="/contact"
                className="px-6 py-3 rounded-lg text-sm font-medium border border-white/10 text-zinc-50 hover:bg-white/5 transition"
              >
                Partner With Us
              </a>
            </div>

          </div>
        </div>
      </section>


      {/* ================= AI GAP SECTION ================= */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 space-y-6">

          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            The AI Gap Is Growing.
          </h2>

          <p className="text-zinc-400 text-lg leading-relaxed">
            Artificial Intelligence is transforming education, careers, and industries at unprecedented speed. Yet structured AI literacy remains limited. Many individuals use AI tools without understanding their capabilities, limitations, ethical implications, or long-term career impact.
          </p>

          <p className="text-zinc-400 text-lg leading-relaxed">
            SnehamVerseAI bridges the gap between exposure and understanding through structured, responsible AI education programs designed for real-world application.
          </p>

        </div>
      </section>


      {/* ================= CORE PROGRAMS SECTION ================= */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 space-y-12">

          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Our Core Programs
            </h2>
            <p className="text-zinc-400 text-lg">
              Structured AI literacy frameworks designed for academic institutions,
              professionals, and organizations preparing for the AI-driven economy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-medium">
                Foundations of Artificial Intelligence
              </h3>
              <p className="text-zinc-400">
                Understanding AI systems, real capabilities, limitations, and structured knowledge beyond hype.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-medium">
                Responsible AI & Ethical Usage
              </h3>
              <p className="text-zinc-400">
                Academic integrity, ethical prompting, and responsible implementation in learning and professional environments.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-medium">
                AI for Academics & Research
              </h3>
              <p className="text-zinc-400">
                Practical AI workflows for structured revision, research assistance, and academic productivity.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-medium">
                AI for Entrepreneurs & Professionals
              </h3>
              <p className="text-zinc-400">
                Business productivity, automation systems, and strategic AI integration frameworks.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-medium">
                Career Readiness in the AI Era
              </h3>
              <p className="text-zinc-400">
                Understanding emerging roles, future skills, and adaptive thinking in an AI-driven workforce.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ================= WHO WE SERVE ================= */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 space-y-10">

          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Who We Serve
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-zinc-400 text-lg">
            <div>Secondary Schools</div>
            <div>Junior Colleges</div>
            <div>Degree & Professional Institutions</div>
            <div>Corporate Teams</div>
            <div>Entrepreneurs & Startups</div>
            <div>Public & Skill Development Bodies</div>
          </div>

        </div>
      </section>


      {/* ================= OUTCOMES ================= */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 space-y-6">

          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Program Outcomes
          </h2>

          <ul className="space-y-4 text-zinc-400 text-lg list-disc list-inside">
            <li>Foundational AI clarity</li>
            <li>Practical prompt-thinking skills</li>
            <li>Responsible AI mindset</li>
            <li>Academic & professional workflow systems</li>
            <li>Awareness of emerging AI-driven careers</li>
          </ul>

        </div>
      </section>


      {/* ================= FINAL CTA ================= */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">

          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Bring Structured AI Literacy to Your Institution.
          </h2>

          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="/workshops"
              className="px-6 py-3 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 transition"
            >
              Book a Workshop
            </a>

            <a
              href="/contact"
              className="px-6 py-3 rounded-lg text-sm font-medium border border-white/10 text-zinc-50 hover:bg-white/5 transition"
            >
              Contact Our Team
            </a>
          </div>

        </div>
      </section>

    </main>
  );
}