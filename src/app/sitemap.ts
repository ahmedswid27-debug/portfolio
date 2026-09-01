import type { MetadataRoute } from "next";

const SITE = "https://www.ahmedswid.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/en`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/cv`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/cv?lang=en`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
