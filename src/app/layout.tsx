import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import LayoutWrapper from "@/components/LayoutWrapper";

/* ─── SEO METADATA ───────────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL("https://snehamverseai.com"),

  title: {
    default: "SnehAmverseAI | AI Literacy & GenAI Workshops for Institutions in India",
    template: "%s | SnehAmverseAI",
  },

  description:
    "SnehAmverseAI delivers structured AI literacy programs, GenAI workshops, and responsible AI education for schools, colleges, and enterprises across India. Powered by cutting-edge AI technology.",

  keywords: [
    "AI literacy India",
    "GenAI workshops",
    "artificial intelligence education",
    "AI for institutions",
    "responsible AI",
    "AI training programs India",
    "SnehAmverseAI",
    "AI chat assistant",
    "machine learning workshops",
    "AI upskilling",
  ],

  authors: [
    {
      name: "SNEHAMVERSE PRIVATE LIMITED",
      url: "https://snehamverseai.com",
    },
  ],
  creator: "SNEHAMVERSE PRIVATE LIMITED",
  publisher: "SNEHAMVERSE PRIVATE LIMITED",

  /* ── OpenGraph ── */
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://snehamverseai.com",
    siteName: "SnehAmverseAI",
    title: "SnehAmverseAI | AI Literacy & GenAI Workshops for Institutions in India",
    description:
      "Structured AI literacy programs and GenAI workshops for schools, colleges, and enterprises across India.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SnehAmverseAI — AI Literacy for Institutions",
      },
    ],
  },

  /* ── Twitter / X ── */
  twitter: {
    card: "summary_large_image",
    title: "SnehAmverseAI | AI Literacy for Institutions",
    description:
      "Structured AI literacy programs and GenAI workshops for schools, colleges, and enterprises across India.",
    images: ["/og-image.png"],
    creator: "@snehamverseai",
  },

  /* ── Crawling ── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ── Verification (add your codes when ready) ── */
  // verification: {
  //   google: "your-google-search-console-token",
  // },

  /* ── Canonical ── */
  alternates: {
    canonical: "https://snehamverseai.com",
  },

  /* ── PWA / Icons ── */
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Schema.org structured data — SoftwareApplication */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "SnehAmverseAI",
                applicationCategory: "EducationalApplication",
                operatingSystem: "Web",
                url: "https://snehamverseai.com",
                description:
                  "AI literacy platform providing structured GenAI education for institutions, professionals, and students across India.",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "INR",
                },
                author: {
                  "@type": "Organization",
                  name: "SNEHAMVERSE PRIVATE LIMITED",
                  url: "https://snehamverseai.com",
                },
                featureList: [
                  "AI Chat Assistant",
                  "Web Search Integration",
                  "Knowledge Base (RAG)",
                  "Multi-turn Conversations",
                  "AI Literacy Programs",
                  "GenAI Workshops",
                ],
              }),
            }}
          />

          {/* Organization schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "SNEHAMVERSE PRIVATE LIMITED",
                alternateName: "SnehAmverseAI",
                url: "https://snehamverseai.com",
                logo: "https://snehamverseai.com/logo.png",
                sameAs: [
                  "https://snehamverseai.com"
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "customer service",
                  availableLanguage: ["English", "Telugu", "Hindi"],
                },
              }),
            }}
          />

          {/* Preconnect for performance */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </head>
        <body className="bg-zinc-950 text-zinc-50 antialiased">
          <LayoutWrapper>{children}</LayoutWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
} 