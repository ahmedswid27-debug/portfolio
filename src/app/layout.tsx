import type { Metadata, Viewport } from "next";
import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";

const display = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});
const body = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmed-swid.vercel.app"),
  title: `${profile.fullName} — ${profile.titleShort}`,
  description: profile.tagline,
  keywords: [
    "محلل أعمال",
    "تحليل بيانات",
    "Power BI",
    "لوحات معلومات",
    "أتمتة",
    "Business Analyst",
    "Ahmed Swid",
  ],
  openGraph: {
    title: `${profile.fullName} — ${profile.titleShort}`,
    description: profile.tagline,
    type: "website",
    locale: "ar_SA",
    url: "https://ahmed-swid.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.fullName} — ${profile.titleShort}`,
    description: profile.tagline,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0E14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} h-full`}
    >
      <body className="grain font-body text-white/85 antialiased min-h-full">
        {children}
      </body>
    </html>
  );
}
