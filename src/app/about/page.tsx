export default function AboutPage() {
  return (
    <main className="min-h-screen">

      {/* ================= HEADER ================= */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 space-y-6">

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            About SnehamVerseAI
          </h1>

          <p className="text-zinc-400 text-lg leading-relaxed">
            SnehamVerseAI is a structured AI literacy and future skills initiative
            focused on responsible AI education and real-world application.
          </p>

        </div>
      </section>


      {/* ================= MISSION SECTION ================= */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 space-y-6">

          <h2 className="text-2xl md:text-3xl font-semibold">
            Our Focus
          </h2>

          <p className="text-zinc-400 text-lg leading-relaxed">
            The rapid growth of artificial intelligence has created both opportunity
            and uncertainty. While AI tools are becoming widely accessible,
            structured literacy and responsible usage frameworks remain limited.
          </p>

          <p className="text-zinc-400 text-lg leading-relaxed">
            SnehamVerseAI addresses this gap through clear, practical, and
            implementation-oriented AI education programs designed for
            institutions and professionals.
          </p>

        </div>
      </section>


      {/* ================= POSITIONING SECTION ================= */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 space-y-6">

          <h2 className="text-2xl md:text-3xl font-semibold">
            Institutional Alignment
          </h2>

          <p className="text-zinc-400 text-lg leading-relaxed">
            The initiative operates as a vertical under
            <span className="text-zinc-200 font-medium">
              {" "}SNEHAMVERSE PRIVATE LIMITED
            </span>,
            ensuring structured governance, scalability, and long-term program development.
          </p>

          <p className="text-zinc-400 text-lg leading-relaxed">
            Programs are designed to align with academic standards,
            corporate training needs, and evolving workforce requirements.
          </p>

        </div>
      </section>


      {/* ================= FOUNDER SECTION ================= */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 space-y-6">

          <h2 className="text-2xl md:text-3xl font-semibold">
            Founder
          </h2>

          <p className="text-zinc-400 text-lg leading-relaxed">
            <span className="text-zinc-200 font-medium">
              Potti Venkatesh
            </span>{" "}
            is focused on building scalable AI literacy systems that prepare
            individuals and institutions for the evolving AI-driven economy.
          </p>

        </div>
      </section>

    </main>
  );
}