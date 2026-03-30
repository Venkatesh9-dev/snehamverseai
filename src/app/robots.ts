import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/programs",
          "/workshops",
          "/institutions",
          "/about",
          "/contact",
          "/ai-platform",
        ],
        disallow: [
          "/ai",
          "/dashboard",
          "/sign-in",
          "/sign-up",
          "/api",
          "/_next",
        ],
      },
    ],
    sitemap: "https://snehamverseai.com/sitemap.xml",
  };
}