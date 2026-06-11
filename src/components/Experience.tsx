import type { Content } from "@/data/content";

export default function Experience({ c }: { c: Content }) {
  const { experience, ui } = c;
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20 scroll-mt-20">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-gold text-xl">◈</span>
        <span className="font-mono text-xs text-gold/60">02</span>
        <div className="flex-1 hairline" />
      </div>
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{ui.sec.experience}</h2>

      <div className="mt-10 card-gold rounded-2xl p-7 sm:p-9">
        <div className="flex flex-wrap items-baseline justify-between gap-3 pb-5 border-b border-gold/15">
          <div>
            <h3 className="font-display text-2xl font-bold text-gold">{experience.role}</h3>
            <p className="mt-1 text-white/70">{experience.org}</p>
          </div>
          <span className="text-sm text-white/50 border border-gold/25 rounded-full px-4 py-1.5">
            {experience.period}
          </span>
        </div>

        <ul className="mt-6 space-y-3.5">
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
