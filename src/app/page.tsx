import type { Viewport } from "next";
import FolioPage from "@/components/folio/FolioPage";

export const viewport: Viewport = { themeColor: "#F4F8F6" };

export default function Home() {
  return <FolioPage lang="ar" />;
}
