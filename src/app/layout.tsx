import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://snehamverseai.com"),

  title: {
    default: "SnehAmverseAI | AI Literacy & Institutional GenAI Workshops",
    template: "%s | SnehAmverseAI",
  },

  description:
    "SnehAmverseAI delivers AI literacy programs, GenAI workshops, and institutional AI training across India. An initiative under SNEHAMVERSE PRIVATE LIMITED.",

  keywords: [
    "AI Workshop India",
    "GenAI Training",
    "AI Literacy Program",
    "Artificial Intelligence Education",
    "Institution AI Training India",
    "Responsible AI Education",
    "SnehAmverseAI",
  ],

  creator: "SnehAmverseAI",
  publisher: "SNEHAMVERSE PRIVATE LIMITED",

  openGraph: {
    title: "SnehAmverseAI | AI Literacy & Institutional GenAI Workshops",
    description:
      "Empowering institutions and students with responsible AI literacy and GenAI skills.",
    url: "https://snehamverseai.com",
    siteName: "SnehAmverseAI",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SnehAmverseAI | AI Literacy & Institutional Workshops",
    description:
      "AI literacy programs and GenAI training for institutions across India.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-50">
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}