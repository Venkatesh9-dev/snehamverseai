export default function InstitutionsPage() {
  return (
    <main className="min-h-screen">

      {/* ================= HEADER ================= */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 space-y-6">

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Institutional Collaboration Model
          </h1>

          <p className="text-zinc-400 text-lg leading-relaxed">
            SnehamVerseAI partners with educational institutions,
            corporate training teams, and public skill development
            bodies to deliver structured AI literacy programs aligned
            with evolving workforce demands.
          </p>

        </div>
      </section>


      {/* ================= PROCESS SECTION ================= */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 space-y-12">

          <h2 className="text-3xl font-semibold tracking-tight">
            Our Collaboration Process
          </h2>

          <div className="grid md:grid-cols-2 gap-10">

            <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4">
              <h3 className="text-xl font-semibold">
                1. Needs Assessment
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                We evaluate the institution’s academic level,
                participant profile, and training objectives
                to design an appropriate AI literacy framework.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4">
              <h3 className="text-xl font-semibold">
                2. Curriculum Customization
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Program modules are aligned with institutional goals,
                ensuring structured delivery without unnecessary complexity.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4">
              <h3 className="text-xl font-semibold">
                3. Program Delivery
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Workshops are delivered through on-site, hybrid,
                or online formats with practical frameworks
                and structured learning methodology.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4">
              <h3 className="text-xl font-semibold">
                4. Feedback & Reporting
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Post-session feedback and structured reporting
                enable institutions to measure impact
                and plan long-term AI literacy integration.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ================= TARGET BODIES ================= */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 space-y-8">

          <h2 className="text-3xl font-semibold tracking-tight">
            We Collaborate With
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-zinc-400 text-lg">

            <div>Schools & Junior Colleges</div>
            <div>Degree & Professional Institutions</div>
            <div>Corporate Training Departments</div>
            <div>CSR Initiatives</div>
            <div>Government & Semi-Government Bodies</div>
            <div>Skill Development Authorities</div>

          </div>

        </div>
      </section>


      {/* ================= FINAL CTA ================= */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">

          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Explore a Structured AI Literacy Partnership.
          </h2>

          <a
            href="/contact"
            className="px-6 py-3 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 transition"
          >
            Request Collaboration
          </a>

        </div>
      </section>

    </main>
  );
}