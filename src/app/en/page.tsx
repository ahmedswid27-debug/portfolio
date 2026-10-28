import type { Metadata, Viewport } from "next";
import RecruiterPage from "@/components/recruiter/RecruiterPage";
import { getContent } from "@/data/content";

const c = getContent("en");

export const metadata: Metadata = {
  title: `${c.profile.fullName} — ${c.profile.titleShort}`,
  description: c.profile.tagline,
  openGraph: {
    title: `${c.profile.fullName} — ${c.profile.titleShort}`,
    description: c.profile.tagline,
    type: "website",
    locale: "en_US",
    url: "https://www.ahmedswid.com/en",
  },
};

export const viewport: Viewport = { themeColor: "#FFFFFF" };

export default function EnHome() {
  return <RecruiterPage lang="en" />;
}
