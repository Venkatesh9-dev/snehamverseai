export default function WorkshopsPage() {
  return (
    <main className="min-h-screen">

      {/* ================= HEADER ================= */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 space-y-6">

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Flexible Program Formats
          </h1>

          <p className="text-zinc-400 text-lg leading-relaxed">
            SnehamVerseAI workshops are designed to adapt to institutional needs,
            participant levels, and time availability. Programs can be delivered
            in modular or intensive formats.
          </p>

        </div>
      </section>


      {/* ================= PROGRAM FORMATS ================= */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">

          <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4">
            <h2 className="text-xl font-semibold">
              3-Hour Introductory Session
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              A foundational overview of AI literacy, ethical awareness,
              and practical exposure designed for first-time participants.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4">
            <h2 className="text-xl font-semibold">
              1-Day Intensive Bootcamp
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Deep-dive workshop covering structured AI frameworks,
              real-world applications, and interactive exercises.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4">
            <h2 className="text-xl font-semibold">
              5-Day Structured Curriculum
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Comprehensive AI literacy training including foundations,
              responsible usage, academic workflows, and career readiness.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4">
            <h2 className="text-xl font-semibold">
              Custom Institutional Program
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Tailored curriculum aligned with institutional objectives,
              academic standards, or corporate training goals.
            </p>
          </div>

        </div>
      </section>


      {/* ================= DELIVERY MODES ================= */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 space-y-8">

          <h2 className="text-3xl font-semibold tracking-tight">
            Delivery Modes
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-zinc-400 text-lg">

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              On-Site Delivery
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              Hybrid Format
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              Fully Online Sessions
            </div>

          </div>

        </div>
      </section>


      {/* ================= CTA ================= */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">

          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Schedule a Workshop for Your Institution.
          </h2>

          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="/contact"
              className="px-6 py-3 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 transition"
            >
              Request Booking
            </a>
          </div>

        </div>
      </section>

    </main>
  );
}