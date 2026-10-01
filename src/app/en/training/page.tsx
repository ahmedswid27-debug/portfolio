import type { Metadata } from "next";
import TrainingPage from "@/components/TrainingPage";
import { getTraining } from "@/data/training";

const t = getTraining("en");

export const metadata: Metadata = {
  title: `${t.title} — Training profile`,
  description: t.lead,
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
