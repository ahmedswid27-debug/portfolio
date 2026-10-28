import type { Viewport } from "next";
import RecruiterPage from "@/components/recruiter/RecruiterPage";

export const viewport: Viewport = { themeColor: "#FFFFFF" };

export default function Home() {
  return <RecruiterPage lang="ar" />;
}
