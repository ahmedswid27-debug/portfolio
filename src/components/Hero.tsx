import Image from "next/image";
import type { Content } from "@/data/content";

export default function Hero({ c }: { c: Content }) {
  const { profile, stats, ui } = c;
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center mx-auto max-w-6xl px-6 pt-28 pb-16"
    >
      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center w-full">
        <div className="order-2 lg:order-1">
          <span className="rise inline-flex items-center gap-2 text-xs sm:text-sm text-gold/90 border border-gold/25 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold glow" />
            {ui.hero.badge}
          </span>

          <h1 className="rise d1 font-display font-black tracking-tight leading-[1.15] text-4xl sm:text-5xl lg:text-[56px]">
            {ui.hero.iAm} {profile.name}
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
                <p className="font-display text-2xl sm:text-3xl font-bold text-gold tabular">{s.value}</p>
                <p className="text-xs text-white/50 mt-1 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2 flex justify-center">
          <div className="rise d2 relative float">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-gold/30 via-transparent to-saud/20 blur-2xl opacity-60" />
            <div className="relative rounded-3xl overflow-hidden border border-gold/20 w-[260px] sm:w-[320px] aspect-[3/4] card-gold">
              <Image src={profile.photo} alt={profile.fullName} fill priority sizes="320px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 card-gold rounded-2xl px-4 py-2.5 text-center">
              <p className="font-display text-gold font-bold text-sm">{ui.hero.cardTop}</p>
              <p className="text-[10px] text-white/50">{ui.hero.cardSub}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold/40 cue text-2xl">⌄</div>
    </section>
  );
}
