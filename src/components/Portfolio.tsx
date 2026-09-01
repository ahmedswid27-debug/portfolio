"use client";

import { useEffect } from "react";
import { getContent, type Lang } from "@/data/content";
import Sidebar from "./Sidebar";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Works from "./Works";
import SkillsSection from "./SkillsSection";
import Credentials from "./Credentials";
import Contact from "./Contact";
import ChatWidget from "./ChatWidget";
import ScrollReveal from "./ScrollReveal";
import ScrollProgress from "./ScrollProgress";

export default function Portfolio({ lang }: { lang: Lang }) {
  const c = getContent(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = c.ui.dir;
  }, [lang, c.ui.dir]);

  return (
    <div dir={c.ui.dir} className="flex min-h-screen">
      <ScrollProgress />
      <ScrollReveal />
      <Sidebar c={c} lang={lang} />

      <main className="flex-1 min-w-0 relative max-md:pt-14">
        <div className="ambient" aria-hidden="true">
          <span />
          <span />
        </div>
        <Hero c={c} />
        <About c={c} />
        <Experience c={c} />
        <Works c={c} />
        <SkillsSection c={c} />
        <Credentials c={c} />
        <Contact c={c} />
      </main>

      <ChatWidget c={c} />
    </div>
  );
}
