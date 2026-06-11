"use client";

import { useState } from "react";
import type { Content, Lang } from "@/data/content";

export default function Nav({ c, lang }: { c: Content; lang: Lang }) {
  const [open, setOpen] = useState(false);
  const other = lang === "ar" ? "/en" : "/";
  const links = [
    { href: "#about", label: c.ui.nav.about },
    { href: "#experience", label: c.ui.nav.experience },
    { href: "#analysis", label: c.ui.nav.analysis },
    { href: "#design", label: c.ui.nav.design },
    { href: "#automation", label: c.ui.nav.automation },
    { href: "#training", label: c.ui.nav.training },
    { href: "#credentials", label: c.ui.nav.credentials },
  ];

  return (
    <header className="no-print fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-ink/70 border-b border-gold/12">
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-display font-bold tracking-tight text-lg shrink-0">
          <span className="text-gold-grad">{c.profile.name}</span>
          <span className="text-white/40 text-sm hidden sm:inline"> · {c.profile.titleShort}</span>
        </a>

        <ul className="hidden lg:flex items-center gap-6 text-sm text-white/65">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-gold transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={other}
            className="inline-flex items-center text-xs font-bold px-3 py-2 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition-colors"
          >
            {c.ui.toggle}
          </a>
          <a
            href={lang === "en" ? "/cv?lang=en" : "/cv"}
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition-colors"
          >
            {c.ui.nav.pdf}
          </a>
          <a
            href="#contact"
            className="hidden sm:inline-flex text-sm font-bold px-4 py-2 rounded-full text-ink bg-gradient-to-l from-gold2 to-gold hover:shadow-lg hover:shadow-gold/30 transition-shadow"
          >
            {c.ui.nav.startProject}
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="menu"
            aria-expanded={open ? "true" : "false"}
            className="lg:hidden h-10 w-10 rounded-lg border border-gold/25 text-gold flex flex-col items-center justify-center gap-1.5"
          >
            <span className={`block h-0.5 w-5 bg-gold transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-gold transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-gold transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 bg-ink/95 backdrop-blur-md border-b border-gold/12 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="px-6 py-4 grid grid-cols-2 gap-1 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block py-2.5 text-white/75 hover:text-gold transition-colors">
                {l.label}
              </a>
            </li>
          ))}
          <li className="col-span-2 mt-2">
            <a href={lang === "en" ? "/cv?lang=en" : "/cv"} onClick={() => setOpen(false)} className="block text-center font-medium py-2.5 rounded-full border border-gold/30 text-gold mb-2">
              {c.ui.nav.cvMobile}
            </a>
            <a href="#contact" onClick={() => setOpen(false)} className="block text-center font-bold py-2.5 rounded-full text-ink bg-gradient-to-l from-gold2 to-gold">
              {c.ui.nav.startProject}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
