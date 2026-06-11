import Image from "next/image";
import type { Content } from "@/data/content";

export default function Credentials({ c }: { c: Content }) {
  const { certifications, courses, languages, ui } = c;
  return (
    <section id="credentials" className="mx-auto max-w-6xl px-6 py-20 scroll-mt-20">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-gold text-xl">❂</span>
        <span className="font-mono text-xs text-gold/60">08</span>
        <div className="flex-1 hairline" />
      </div>
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{ui.sec.credentials}</h2>

      <div className="mt-10 grid lg:grid-cols-[1.3fr_0.7fr] gap-6">
        <div className="space-y-5">
          {certifications.map((cert) => (
            <a key={cert.title} href={cert.link} target="_blank" rel="noopener noreferrer" className="tile card-gold rounded-2xl p-5 flex gap-5 items-center group">
              {cert.image ? (
                <div className="relative w-32 sm:w-40 aspect-[3/2] shrink-0 rounded-lg overflow-hidden border border-gold/20">
                  <Image src={cert.image} alt={cert.title} fill sizes="160px" className="object-cover" />
                </div>
              ) : (
                <div className="w-16 h-16 shrink-0 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-2xl text-gold">❖</div>
              )}
              <div className="min-w-0">
                <h3 className="font-display font-bold leading-snug group-hover:text-gold transition-colors">{cert.title}</h3>
                <p className="mt-1 text-sm text-white/55">{cert.issuer}</p>
                {cert.meta && <p className="mt-1 text-xs text-gold/70">{cert.meta}</p>}
                {cert.link && <span className="mt-2 inline-block text-xs text-gold/80">{ui.creds.viewCert}</span>}
              </div>
            </a>
          ))}
        </div>

        <div className="card-gold rounded-2xl p-7">
          <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
            <span className="text-gold">◆</span> {ui.creds.languages}
          </h3>
          <div className="space-y-6">
            {languages.map((l) => (
              <div key={l.name}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-medium">{l.name}</span>
                  <span className="text-xs text-white/50">{l.level}</span>
                </div>
                <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-l from-gold2 to-gold" style={{ width: `${l.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-display font-bold text-lg mb-5 flex items-center gap-2">
          <span className="text-gold">❖</span> {ui.creds.courses}
          <span className="text-sm text-white/40 font-normal">{ui.creds.coursesCount(courses.length)}</span>
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((co) => (
            <a key={co.title} href={co.link} target="_blank" rel="noopener noreferrer" className="tile card-gold rounded-xl p-4 flex flex-col group">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-gold/8 border border-gold/15 text-gold/80">{co.topic}</span>
                <span className="text-gold/50 text-xs group-hover:text-gold transition-colors">PDF ↗</span>
              </div>
              <h4 className="text-sm font-bold leading-snug group-hover:text-gold transition-colors">{co.title}</h4>
              <p className="mt-2 text-xs text-white/45 mt-auto pt-2">{co.issuer}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
