import type { Content } from "@/data/content";

export default function Disciplines({ c }: { c: Content }) {
  const { disciplines, ui } = c;
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20 scroll-mt-20">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-gold text-xl">❂</span>
        <span className="font-mono text-xs text-gold/60">09</span>
        <div className="flex-1 hairline" />
      </div>
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{ui.disciplines.title}</h2>
      <p className="mt-3 text-white/55 max-w-2xl">{ui.disciplines.sub}</p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {disciplines.map((d) => (
          <div key={d.title} className="tile card-gold rounded-2xl p-6">
            <div className="text-gold text-2xl mb-3">{d.icon}</div>
            <h3 className="font-display font-bold text-lg">{d.title}</h3>
            <p className="mt-2 text-sm text-white/55 leading-relaxed">{d.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
