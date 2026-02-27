import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact SnehAmverseAI | Partner With Us",
  description:
    "Contact SnehAmverseAI for AI workshops, institutional partnerships, corporate training, and GenAI literacy programs.",
};

"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    role: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess(true);

      setFormData({
        name: "",
        organization: "",
        role: "",
        email: "",
        phone: "",
        message: "",
      });

    } catch {
      setErrorMsg("Submission failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <main className="bg-zinc-950 text-zinc-50 min-h-screen selection:bg-cyan-500/30 font-sans pb-24">

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 text-center space-y-6 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Institutional Inquiry
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
            Strategic{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Collaboration
            </span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            Partner with SnehAmverseAI to deploy structured AI literacy programs across institutions.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">

          <div className="relative p-12 md:p-16 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md shadow-2xl space-y-12">

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

            <form onSubmit={handleSubmit} className="space-y-10">

              {success && (
                <div className="text-green-400 text-sm text-center">
                  ✓ Inquiry submitted successfully. Our team will respond shortly.
                </div>
              )}

              {errorMsg && (
                <div className="text-red-400 text-sm text-center">
                  {errorMsg}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-10">
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-cyan-500 transition-all"
                />

                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Official Email"
                  className="bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <input
                  type="text"
                  name="organization"
                  required
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Institution / Organization"
                  className="bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-cyan-500 transition-all"
                />

                <input
                  type="text"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Your Role (Director / HOD / Faculty)"
                  className="bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Direct Contact"
                className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-cyan-500 transition-all"
              />

              <textarea
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your institutional requirements..."
                className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-cyan-500 transition-all resize-none"
              />

              <div className="pt-6 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-12 py-5 rounded-2xl text-sm font-medium bg-white text-zinc-950 hover:bg-cyan-50 transition-all duration-300 shadow-[0_0_50px_rgba(6,182,212,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:scale-[1.02]"
                >
                  {loading ? "Transmitting..." : "Submit Inquiry"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>
    </main>
  );
}