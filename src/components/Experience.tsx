import type { Content } from "@/data/content";
import SectionHead from "./SectionHead";

export default function Experience({ c }: { c: Content }) {
  const { experience, ui } = c;
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 sm:px-10 py-20 scroll-mt-24">
      <SectionHead n={2} icon="◈" title={ui.sec.experience} img="/riyadh/aerial-day.jpg" />

      <div className="card-gold rounded-2xl p-7 sm:p-9">
        <div className="flex justify-end pb-5 border-b border-gold/15">
          <span className="text-sm text-white/62 border border-gold/25 rounded-full px-4 py-1.5">
            {experience.period}
          </span>
        </div>

        <ul className="stagger mt-6 space-y-3.5">
          {experience.duties.map((d) => (
            <li key={d} className="flex items-start gap-3 text-white/70 leading-relaxed">
              <span className="text-gold/70 mt-1.5 shrink-0 text-xs">▹</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
