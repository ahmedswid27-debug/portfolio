import type { Metadata } from "next";
import TrainingPage from "@/components/TrainingPage";
import { getTraining } from "@/data/training";

const t = getTraining("en");

export const metadata: Metadata = {
  title: `${t.title} — Hands-on workshops`,
  // ⚠ Search descriptions are truncated past ~160 characters; `t.lead` is a full paragraph
  description:
    "Hands-on Power BI workshops — tracks, material and delivery terms, with over 360 hours delivered to 150+ participants in a government body.",
  alternates: { canonical: "/en/training", languages: { "ar-SA": "/training", "en-US": "/en/training" } },
  openGraph: {
    title: t.title,
    description: t.lead,
    type: "profile",
    locale: "en_US",
    url: "https://www.ahmedswid.com/en/training",
  },
};

export default function Page() {
  return <TrainingPage lang="en" />;
}
