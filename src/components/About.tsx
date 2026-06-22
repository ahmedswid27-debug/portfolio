import type { Content } from "@/data/content";

export default function About({ c }: { c: Content }) {
  const { profile, facts, ui } = c;
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20 scroll-mt-20">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-gold text-xl">❂</span>
        <span className="font-mono text-xs text-gold/60">01</span>
        <div className="flex-1 hairline" />
      </div>
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{ui.sec.about}</h2>

      <div className="mt-10">
        <div>
          <p className="text-white/70 leading-loose text-lg">{profile.summary}</p>
          <ul className="mt-8 grid sm:grid-cols-2 gap-3">
            {facts.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-white/75 card-gold rounded-xl px-4 py-3">
                <span className="text-gold mt-0.5 shrink-0">◆</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
