import type { Content } from "@/data/content";
import CountUp from "./CountUp";

export default function Hero({ c }: { c: Content }) {
  const { profile, stats, ui } = c;
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center mx-auto max-w-6xl px-6 pt-28 pb-16"
    >
      <div className="w-full max-w-3xl">
        <div>
          <span className="rise inline-flex items-center gap-2 text-xs sm:text-sm text-gold/90 border border-gold/25 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold glow" />
            {ui.hero.badge}
          </span>

          <h1 className="rise d1 font-display font-black tracking-normal leading-[1.15] text-4xl sm:text-5xl lg:text-[56px]">
            {ui.hero.iAm}
            <span className="text-gold-shine">{profile.name}</span>
            <br />
            <span className="text-gold-grad">{profile.title.split("·")[0].trim()}</span>
          </h1>

          <p className="rise d2 mt-6 max-w-xl text-lg sm:text-xl text-white/70 leading-relaxed">
            {profile.tagline}
          </p>

          <div className="rise d3 mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#design"
              className="px-6 py-3 rounded-full font-bold text-ink bg-gradient-to-l from-gold2 to-gold shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-shadow"
            >
              {ui.hero.ctaWork}
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full font-medium border border-gold/30 hover:border-gold/60 hover:bg-gold/5 transition-colors"
            >
              {ui.hero.ctaContact}
            </a>
            <a
              href={c.lang === "en" ? "/cv?lang=en" : "/cv"}
              className="px-6 py-3 rounded-full font-medium border border-gold/30 hover:border-gold/60 hover:bg-gold/5 transition-colors inline-flex items-center gap-1.5"
            >
              {ui.hero.ctaCv}
            </a>
          </div>

          <div className="rise d4 mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl">
            {stats.map((s) => (
              <div key={s.label}>
                <CountUp value={s.value} className="font-display text-2xl sm:text-3xl font-bold text-gold tabular block" />
                <p className="text-xs text-white/50 mt-1 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold/40 cue text-2xl">⌄</div>
    </section>
  );
}
