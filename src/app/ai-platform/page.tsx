import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Chat Platform | SnehAmverseAI",
  description:
    "SnehAmverseAI's AI chat platform offers multi-turn conversations, web search integration, knowledge-base retrieval (RAG), and source citations — built for students and institutions.",
  openGraph: {
    title: "AI Chat Platform | SnehAmverseAI",
    description:
      "Explore the SnehAmverseAI chat platform — AI-powered research, multi-turn conversations, and live web search for students and institutions.",
    url: "https://snehamverseai.com/ai-platform",
  },
  alternates: {
    canonical: "https://snehamverseai.com/ai-platform",
  },
};

const FEATURES = [
  {
    icon: "💬",
    title: "Multi-turn AI Conversations",
    desc: "Context-aware conversations that remember what you said earlier in the session — no need to repeat yourself.",
  },
  {
    icon: "🌐",
    title: "Live Web Search",
    desc: "Automatically fetches live results for queries about news, current events, and real-time information.",
  },
  {
    icon: "📚",
    title: "Knowledge Base (RAG)",
    desc: "Answers grounded in your institution's uploaded content via vector-based retrieval-augmented generation.",
  },
  {
    icon: "🔗",
    title: "Source Citations",
    desc: "Every web-sourced answer includes clickable source chips so you can verify information independently.",
  },
  {
    icon: "🎨",
    title: "Customizable Experience",
    desc: "Choose your theme (dark/light/system), font size, and toggle web search and source display per preference.",
  },
  {
    icon: "🔐",
    title: "Secure & Private",
    desc: "Auth powered by Clerk. Conversations are tied to your account. No data is shared across users.",
  },
];

const USECASES = [
  { audience: "Students", use: "Research assistance, essay structuring, exam prep, and concept explanation." },
  { audience: "Educators", use: "Lesson planning, curriculum design, and AI literacy demonstration." },
  { audience: "Institutions", use: "Onboarding AI into workflows responsibly with structured guidance." },
  { audience: "Professionals", use: "Business research, automation ideation, and productivity acceleration." },
];

export default function AIPlatformPage() {
  return (
    <main className="bg-zinc-950 text-zinc-50 min-h-screen">

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          AI Platform
        </div>

        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-6">
          Meet{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            SnehAmverseAI
          </span>
        </h1>

        <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed mb-10">
          An AI chat platform built for students and institutions — with web search,
          knowledge retrieval, and source citations built in.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/sign-up"
            className="px-8 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 transition shadow-[0_0_30px_rgba(34,211,238,0.3)]"
          >
            Get Started Free
          </Link>
          <Link
            href="/programs"
            className="px-8 py-4 rounded-xl text-sm font-medium border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-200 transition"
          >
            View Programs
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100 mb-4">
            What SnehAmverseAI Can Do
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto font-light">
            A full-featured AI assistant designed for responsible, educational use.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="p-8 rounded-2xl bg-zinc-900/50 border border-white/8 hover:border-cyan-500/30 hover:bg-zinc-900 transition-all duration-300 space-y-3"
            >
              <div className="text-3xl">{f.icon}</div>
              <h3 className="text-lg font-semibold text-zinc-100">{f.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-light">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100 mb-4">
            Who Is It For?
          </h2>
        </div>

        <div className="space-y-4">
          {USECASES.map((u) => (
            <div key={u.audience} className="flex gap-6 p-6 rounded-xl bg-zinc-900/40 border border-white/6">
              <div className="w-32 flex-shrink-0">
                <span className="text-sm font-semibold text-cyan-400">{u.audience}</span>
              </div>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">{u.use}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-32 text-center">
        <div className="p-12 rounded-3xl bg-zinc-900/60 border border-white/8">
          <h2 className="text-3xl font-semibold text-zinc-100 mb-4 tracking-tight">
            Ready to try it?
          </h2>
          <p className="text-zinc-400 mb-8 font-light">
            Create a free account and start your first AI conversation in seconds.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex px-8 py-4 rounded-xl text-sm font-bold bg-cyan-500 text-zinc-950 hover:bg-cyan-400 transition shadow-[0_0_24px_rgba(34,211,238,0.35)]"
          >
            Start for Free →
          </Link>
        </div>
      </section>

    </main>
  );
}