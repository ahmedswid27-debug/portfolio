import type { Metadata } from "next";
import TrainingPage from "@/components/TrainingPage";
import { getTraining } from "@/data/training";

const t = getTraining("ar");

export const metadata: Metadata = {
  title: `${t.title} — ملف تدريبي`,
  description: t.lead,
  alternates: { canonical: "/training", languages: { "ar-SA": "/training", "en-US": "/en/training" } },
  openGraph: {
    title: t.title,
    description: t.lead,
    type: "profile",
    locale: "ar_SA",
    url: "https://www.ahmedswid.com/training",
  },
};

export default function Page() {
  return <TrainingPage lang="ar" />;
}
