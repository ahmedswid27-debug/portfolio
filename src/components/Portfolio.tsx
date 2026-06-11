"use client";

import { useEffect } from "react";
import { getContent, type Lang } from "@/data/content";
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Works from "./Works";
import SkillsSection from "./SkillsSection";
import Credentials from "./Credentials";
import Disciplines from "./Disciplines";
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
    <main dir={c.ui.dir}>
      <div className="ambient" aria-hidden="true">
        <span />
        <span />
      </div>
      <ScrollProgress />
      <ScrollReveal />
      <Nav c={c} lang={lang} />
      <Hero c={c} />
      <About c={c} />
      <Experience c={c} />
      <Works c={c} />
      <SkillsSection c={c} />
      <Credentials c={c} />
      <Disciplines c={c} />
      <Contact c={c} />
      <ChatWidget c={c} />
    </main>
  );
}
