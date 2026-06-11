import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio";
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
    url: "https://ahmed-swid.vercel.app/en",
  },
};

export default function EnHome() {
  return <Portfolio lang="en" />;
}
