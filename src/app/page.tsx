import type { Viewport } from "next";
import FolioPage from "@/components/folio/FolioPage";

export const viewport: Viewport = { themeColor: "#0B0E14" };

export default function Home() {
  return <FolioPage lang="ar" />;
}
