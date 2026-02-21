import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://snehamverseai.com",
      lastModified: new Date(),
    },
    {
      url: "https://snehamverseai.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://snehamverseai.com/programs",
      lastModified: new Date(),
    },
    {
      url: "https://snehamverseai.com/workshops",
      lastModified: new Date(),
    },
    {
      url: "https://snehamverseai.com/institutions",
      lastModified: new Date(),
    },
    {
      url: "https://snehamverseai.com/contact",
      lastModified: new Date(),
    },
  ];
}