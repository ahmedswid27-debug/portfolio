import type { Content } from "@/data/content";
import SectionHead from "./SectionHead";

export default function About({ c }: { c: Content }) {
  const { profile, facts, ui } = c;
  // أوّل فقرة تُقدَّم بحجمٍ أكبر — فتُقرأ وحدها إن لم يُقرأ الباقي.
  const paras = profile.summary.split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean);
  const [lead, ...rest] = paras;

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 sm:px-10 py-20 scroll-mt-24">
      <SectionHead n={1} icon="❂" title={ui.sec.about} img="/riyadh/skyline-sunset.jpg" />

      <div className="grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:gap-14">
        <div className="rtl:border-r ltr:border-l border-gold/25 rtl:pr-6 ltr:pl-6 sm:rtl:pr-8 sm:ltr:pl-8">
          <p className="text-lg sm:text-xl text-white/80 leading-loose">{lead}</p>
          {rest.map((t) => (
            <p key={t.slice(0, 24)} className="mt-5 text-[15px] text-white/72 leading-loose">
              {t}
            </p>
          ))}
        </div>

        <ul className="stagger space-y-2.5 lg:pt-1">
          {facts.map((f) => (
            <li
              key={f}
              className="flex items-start gap-3 text-[13px] text-white/70 leading-relaxed card-gold rounded-xl px-4 py-3.5"
            >
              <span className="text-gold/80 mt-[3px] shrink-0 text-[10px]">◆</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
