import type { Metadata } from "next";
import TrainingPage from "@/components/TrainingPage";
import { getTraining } from "@/data/training";

const t = getTraining("ar");

export const metadata: Metadata = {
  title: `${t.title} — ورش عمل تطبيقية`,
  // ⚠ وصفُ البحث لا يتجاوز ١٦٠ حرفاً وإلّا بُتر — و`t.lead` فقرةٌ كاملة
  description:
    "ورش عمل تطبيقية في Power BI — المحاور والمواد وشروط التنفيذ، وسجلُّ تنفيذٍ يتجاوز 360 ساعةً لأكثر من 150 مشاركاً في جهة حكومية.",
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
