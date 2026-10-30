import type { MetadataRoute } from "next";
import { CASE_SLUGS } from "@/data/cases";

const SITE = "https://www.ahmedswid.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/en`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/training`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/en/training`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/cv`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/cv/training`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/cv?lang=en`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...CASE_SLUGS.flatMap((s) => [
      { url: `${SITE}/work/${s}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
      { url: `${SITE}/en/work/${s}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    ]),
  ];
}
