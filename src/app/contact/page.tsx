"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    role: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSuccess(true);
      setFormData({
        name: "",
        organization: "",
        role: "",
        email: "",
        phone: "",
        interest: "",
        message: "",
      });
    } catch (error: any) {
      console.error(error);
      setErrorMsg("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen py-24">
      <div className="max-w-3xl mx-auto px-6 space-y-10">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Contact & Collaboration
          </h1>
          <p className="text-zinc-400 text-lg">
            Request workshops, institutional collaborations, or program details.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white/5 border border-white/10 rounded-xl p-8"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-zinc-50 focus:outline-none focus:border-cyan-500"
          />

          <input
            type="text"
            name="organization"
            value={formData.organization}
            placeholder="Organization / Institution"
            required
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-zinc-50 focus:outline-none focus:border-cyan-500"
          />

          <input
            type="text"
            name="role"
            value={formData.role}
            placeholder="Your Role (Principal, HR, Faculty, etc.)"
            required
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-zinc-50 focus:outline-none focus:border-cyan-500"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email Address"
            required
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-zinc-50 focus:outline-none focus:border-cyan-500"
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-zinc-50 focus:outline-none focus:border-cyan-500"
          />

          <input
            type="text"
            name="interest"
            value={formData.interest}
            placeholder="Program Interest"
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-zinc-50 focus:outline-none focus:border-cyan-500"
          />

          <textarea
            name="message"
            value={formData.message}
            placeholder="Message"
            rows={4}
            required
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-zinc-50 focus:outline-none focus:border-cyan-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>

          {success && (
            <p className="text-green-400 text-sm">
              Request submitted successfully.
            </p>
          )}

          {errorMsg && (
            <p className="text-red-400 text-sm">
              {errorMsg}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}