import type { Content } from "@/data/content";

function Chips({ items, accent }: { items: string[]; accent: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((s) => (
        <span key={s} className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${accent}`}>
          {s}
        </span>
      ))}
    </div>
  );
}

export default function SkillsSection({ c }: { c: Content }) {
  const { skills, ui } = c;
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-20 scroll-mt-20">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-gold text-xl">❖</span>
        <span className="font-mono text-xs text-gold/60">07</span>
        <div className="flex-1 hairline" />
      </div>
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{ui.sec.skills}</h2>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="card-gold rounded-2xl p-7">
          <h3 className="font-display font-bold text-lg mb-5 flex items-center gap-2">
            <span className="text-gold">◆</span> {ui.skills.core}
          </h3>
          <Chips items={skills.core} accent="bg-gold/8 border-gold/20 text-white/80 hover:border-gold/50" />
        </div>

        <div className="card-gold rounded-2xl p-7">
          <h3 className="font-display font-bold text-lg mb-5 flex items-center gap-2">
            <span className="text-gold">⚡</span> {ui.skills.technical}
          </h3>
          <Chips items={skills.technical} accent="bg-saud/12 border-saud/30 text-emerald-100/85 hover:border-saud/60" />
        </div>
      </div>
    </section>
  );
}
