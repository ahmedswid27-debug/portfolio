import type { Metadata, Viewport } from "next";
import FolioPage from "@/components/folio/FolioPage";
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

export const viewport: Viewport = { themeColor: "#0B0E14" };

export default function EnHome() {
  return <FolioPage lang="en" />;
}
