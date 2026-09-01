import type { Content } from "@/data/content";
import SectionHead from "./SectionHead";

export default function SkillsSection({ c }: { c: Content }) {
  const { skillGroups, ui } = c;
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 sm:px-10 py-20 scroll-mt-24">
      <SectionHead n={7} icon="❖" title={ui.sec.skills} img="/riyadh/street.jpg" />

      {/* كل مجموعة بدليلها — الرقاقة وحدها لا تقول للقارئ شيئاً */}
      <div className="stagger grid gap-5 md:grid-cols-2">
        {skillGroups.map((g) => (
          <article key={g.title} className="tile card-gold rounded-2xl p-6 sm:p-7 flex flex-col">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center h-9 w-9 rounded-lg bg-gold/10 border border-gold/25 text-gold text-sm">
                {g.icon}
              </span>
              <h3 className="font-display font-bold text-lg leading-snug">{g.title}</h3>
            </div>

            <p className="mt-3.5 text-[13px] text-white/62 leading-loose">{g.proof}</p>

            <div className="mt-5 pt-4 border-t border-gold/10 flex flex-wrap gap-1.5">
              {g.items.map((it) => (
                <span
                  key={it}
                  className="text-[11.5px] px-2.5 py-1 rounded-md bg-gold/[0.07] border border-gold/15 text-gold/85"
                >
                  {it}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
