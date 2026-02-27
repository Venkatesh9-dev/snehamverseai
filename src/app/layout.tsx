import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://snehamverseai.com"),

  title: {
    default: "SnehAmverseAI | AI Literacy & GenAI Institutional Workshops in India",
    template: "%s | SnehAmverseAI",
  },

  description:
    "SnehAmverseAI provides AI literacy programs, GenAI workshops, automation training, and institutional AI education across India.",

  openGraph: {
    title: "SnehAmverseAI | AI Literacy & Institutional GenAI Workshops",
    description:
      "Structured AI literacy programs and GenAI workshops for institutions across India.",
    url: "https://snehamverseai.com",
    siteName: "SnehAmverseAI",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SnehAmverseAI - AI Literacy & Workshops",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SnehAmverseAI | AI Literacy & GenAI Workshops",
    description:
      "AI literacy programs and institutional GenAI training across India.",
    images: ["/og-image.png"],
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