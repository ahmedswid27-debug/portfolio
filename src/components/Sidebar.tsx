"use client";

import { useEffect, useState } from "react";
import type { Content, Lang } from "@/data/content";

/** ترتيب الأقسام في الشريط — العناوين تُقرأ من ui.nav، والمجموعات من ui.groups. */
const NAV: ({ g: keyof Content["ui"]["groups"] } | { id: string; k: keyof Content["ui"]["nav"] })[] = [
  { g: "main" },
  { id: "about", k: "about" },
  { id: "experience", k: "experience" },
  { g: "work" },
  { id: "automation", k: "automation" },
  { id: "analysis", k: "analysis" },
  { id: "reports", k: "reports" },
  { id: "training", k: "training" },
  { g: "creds" },
  { id: "skills", k: "skills" },
  { id: "credentials", k: "credentials" },
  { g: "reach" },
  { id: "contact", k: "contact" },
];

const IDS = NAV.filter((n): n is { id: string; k: keyof Content["ui"]["nav"] } => "id" in n).map((n) => n.id);

export default function Sidebar({ c, lang }: { c: Content; lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");
  const other = lang === "ar" ? "/en" : "/";
  const cvHref = lang === "en" ? "/cv?lang=en" : "/cv";

  // القسم النشط = آخر قسم تجاوز ثلث الشاشة.
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.34;
      let current = IDS[0];
      let best = -Infinity;
      for (const id of IDS) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line && top > best) {
          best = top;
          current = id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const Item = ({ id, label }: { id: string; label: string }) => {
    const on = active === id;
    return (
      <a
        href={`#${id}`}
        onClick={() => setOpen(false)}
        className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors ${
          on ? "text-gold bg-gold/[0.09] font-semibold" : "text-white/68 hover:text-white/90 hover:bg-white/[0.04]"
        }`}
      >
        {on && <span className="absolute inset-inline-start-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-gold" />}
        <span className={`text-[9px] transition-opacity ${on ? "opacity-100" : "opacity-40"}`}>◆</span>
        <span className="truncate">{label}</span>
      </a>
    );
  };

  return (
    <>
      {/* شريط علوي للجوال */}
      <div className="no-print md:hidden fixed inset-x-0 top-0 z-[60] flex items-center gap-3 px-4 h-14 bg-ink/92 backdrop-blur border-b border-gold/12">
        <button onClick={() => setOpen(true)} aria-label="menu" className="text-gold text-xl leading-none">
          ☰
        </button>
        <a href="#top" className="font-display font-bold text-sm text-gold-grad">
          {c.profile.name}
        </a>
        <div className="ms-auto flex items-center gap-2">
          <a href={other} className="text-[11px] font-bold px-2.5 py-1.5 rounded-full border border-gold/30 text-gold">
            {c.ui.toggle}
          </a>
          <a href={cvHref} className="text-[11px] font-bold px-2.5 py-1.5 rounded-full border border-gold/30 text-gold">
            {c.ui.nav.pdf}
          </a>
        </div>
      </div>

      {open && <div className="md:hidden fixed inset-0 bg-black/60 z-[70]" onClick={() => setOpen(false)} />}

      {/* الانزلاق للجوال وحده — max-md: يمنع تعارض المتغيّرات مع md: على الشاشات الكبيرة.
          ⚠ الخلفية = لون الصفحة نفسه (`bg-ink`) بلا شفافية ولا backdrop-blur:
          أيّ فرقِ درجةٍ أو طبقةِ تركيبٍ هنا يُقرأ خطّاً رأسياً عند الحدّ. */}
      <aside
        className={`no-print ${
          open ? "translate-x-0" : "max-md:rtl:translate-x-full max-md:ltr:-translate-x-full"
        } fixed max-md:start-0 md:sticky top-0 z-[80] h-screen w-[250px] shrink-0 flex flex-col
        bg-ink transition-transform duration-300`}
      >
        <a href="#top" onClick={() => setOpen(false)} className="px-5 py-5 flex items-center gap-2.5 border-b border-white/[0.06] shrink-0">
          <span className="text-gold text-lg leading-none">◆</span>
          <div className="leading-tight min-w-0">
            <p className="font-display font-bold text-white text-sm truncate">{c.profile.fullName}</p>
            <p className="text-[10px] text-white/40 truncate">{c.profile.titleShort}</p>
          </div>
        </a>

        <nav className="no-sb flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
          {NAV.map((n, i) =>
            "g" in n ? (
              <p key={i} className="text-white/30 text-[10px] font-display tracking-wider px-3 pt-3 pb-1 first:pt-1">
                {c.ui.groups[n.g]}
              </p>
            ) : (
              <Item key={n.id} id={n.id} label={c.ui.nav[n.k]} />
            )
          )}
        </nav>

        <div className="px-3 py-3 border-t border-white/[0.06] shrink-0 space-y-2">
          <a
            href={cvHref}
            className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg text-[13px] font-bold text-ink bg-gradient-to-l from-gold2 to-gold"
          >
            {c.ui.nav.pdf}
          </a>
          <div className="flex gap-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex-1 text-center py-2 rounded-lg text-[12px] border border-gold/25 text-gold/90 hover:bg-gold/[0.07] transition-colors"
            >
              {c.ui.nav.startProject}
            </a>
            <a
              href={other}
              className="px-3 py-2 rounded-lg text-[12px] font-bold border border-gold/25 text-gold/90 hover:bg-gold/[0.07] transition-colors"
            >
              {c.ui.toggle}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
