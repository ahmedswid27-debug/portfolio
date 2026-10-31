import Image from "next/image";
import SectionHead from "@/components/SectionHead";
import { getCases } from "@/data/cases";
import { getFolio, type Lang } from "@/data/folio";
import FolioShell from "./FolioShell";
import Gallery from "./Gallery";
import LiveBoard from "./LiveBoard";

/** الرئيسية بهوية صفحة الورش: صورة الواجهة، والعنوان الذهبي، وشريط الأرقام، وترويسات مصورة. */
function Sec({ id, n, title, img, children }: { id: string; n: number; title: string; img: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-12 sm:py-16" aria-label={title}>
      <SectionHead n={n} title={title} img={img} />
      {children}
    </section>
  );
}

export default function FolioPage({ lang }: { lang: Lang }) {
  const s = getFolio(lang);
  const en = lang === "en";
  const base = en ? "/en" : "";

  return (
    <FolioShell lang={lang} onHome>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/riyadh/lamps-hero.jpg" alt="" fill priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/70 to-ink" />
          <div className="absolute inset-0 rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-ink via-ink/65 to-ink/10" />
        </div>
        <div className="mx-auto max-w-6xl px-6 sm:px-10 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <span className="inline-block text-[12px] tracking-wider px-3 py-1 rounded-full bg-gold/12 border border-gold/30 text-gold">{s.hero.badge}</span>
          <h1 className="mt-5 font-display font-black leading-[1.34] pb-1 text-[34px] sm:text-[46px] lg:text-[56px] max-w-4xl text-gold-shine">{s.hero.name}</h1>
          <p className="mt-4 max-w-3xl text-[15px] sm:text-[17px] text-white/78 leading-loose">{s.hero.lead}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={s.cv.href} download className="fo-btn fo-btn-gold">{s.cv.label}</a>
            <a href={s.linkedin} target="_blank" rel="noopener noreferrer" className="fo-btn fo-btn-line">LinkedIn</a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-10 -mt-10 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 rounded-2xl overflow-hidden border border-gold/20 bg-panel/90 backdrop-blur-md divide-x rtl:divide-x-reverse divide-gold/10 shadow-[0_24px_60px_-30px_rgba(0,0,0,1)]">
          {s.stats.map((x) => (
            <div key={x.label} className="px-4 py-5 sm:py-7 text-center">
              <div className="font-display text-2xl sm:text-[32px] font-bold text-gold tabular leading-none" dir="ltr">{x.value}</div>
              <p className="mt-2 text-[12px] sm:text-xs text-white/72 leading-snug">{x.label}</p>
            </div>
          ))}
        </div>
      </div>

      <main id="main" className="mx-auto max-w-6xl px-6 sm:px-10">
        <Sec id="about" n={1} title={s.about.title} img="/riyadh/kafd.jpg">
          <div className="grid lg:grid-cols-5 gap-5">
            <p className="lg:col-span-3 card-gold rounded-2xl p-6 sm:p-8 text-[15px] sm:text-[16px] text-white/80 leading-loose">{s.about.text}</p>
            <dl className="lg:col-span-2 card-gold rounded-2xl divide-y divide-gold/10">
              {s.about.facts.map((f) => (
                <div key={f.k} className="grid grid-cols-[84px_1fr] gap-3 px-5 py-3">
                  <dt className="font-display font-bold text-[13px] text-gold/90">{f.k}</dt>
                  <dd className="text-[14px] text-white/74">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Sec>

        <Sec id="fields" n={2} title={s.fields.title} img="/riyadh/aerial-day.jpg">
          <ul className="grid lg:grid-cols-3 gap-5">
            {s.fields.items.map((f) => (
              <li key={f.t} data-reveal className="card-gold rounded-2xl p-6 flex flex-col">
                <h3 className="font-display font-bold text-[19px] text-white/95">{f.t}</h3>
                <p className="mt-2 text-[14px] text-white/72 leading-relaxed">{f.d}</p>
                <p className="mt-4 mb-4 text-[12.5px] text-gold/85 leading-relaxed"><bdi>{f.tools}</bdi></p>
                <a href={`#${f.link.id}`} className="mt-auto text-[13px] font-bold text-gold">{f.link.label}</a>
              </li>
            ))}
          </ul>
        </Sec>

        <Sec id="boards" n={3} title={s.boards.title} img="/riyadh/skyline-sunset.jpg">
          <Gallery items={s.boards.items} className="grid sm:grid-cols-2 gap-5" sizes="(max-width: 640px) 100vw, 560px" zoom={s.zoom} close={s.closeLabel} />
          <p className="fo-small mt-3">{s.boards.notice}</p>
        </Sec>

        <Sec id="live" n={4} title={s.live.title} img="/riyadh/aerial-day.jpg">
          <LiveBoard lang={lang} />
        </Sec>

        <Sec id="method" n={5} title={s.method.title} img="/riyadh/street.jpg">
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {s.method.steps.map((m, i) => (
              <li key={m.t} data-reveal className="card-gold rounded-2xl p-5 flex flex-col">
                <span className="font-mono text-xs text-gold/60" dir="ltr">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display font-bold text-[17px] text-white/95">{m.t}</h3>
                <p className="mt-1.5 text-[13.5px] text-white/68 leading-relaxed">{m.d}</p>
                <p className="mt-auto pt-3 text-[12.5px] text-gold/90"><span className="text-white/45">{s.method.output}: </span>{m.out}</p>
              </li>
            ))}
          </ol>
        </Sec>

        <Sec id="cases" n={6} title={s.cases.title} img="/riyadh/kingdom-night.jpg">
          <ul className="grid sm:grid-cols-2 gap-5">
            {getCases(lang).map((c) => (
              <li key={c.slug} data-reveal>
                <a href={`${base}/work/${c.slug}`} className="fo-case card-gold rounded-2xl">
                  <span className="fo-case-img">
                    <Image src={c.image} alt="" fill sizes="(max-width: 640px) 100vw, 560px" className="object-cover" />
                  </span>
                  <span className="block p-6">
                    <span className="block text-[12px] text-gold/80">{c.tag}</span>
                    <span className="block mt-1 font-display font-bold text-[21px] text-white/95">{c.title}</span>
                    <span className="block mt-1.5 text-[14px] text-white/68 leading-relaxed">{c.card}</span>
                    <span className="inline-block mt-4 text-[13px] font-bold text-gold">{s.cases.more}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Sec>

        <Sec id="platform" n={7} title={s.platform.title} img="/riyadh/lamps-hero.jpg">
          <div className="grid lg:grid-cols-5 gap-6 items-center">
            <div className="lg:col-span-2">
              <p className="text-[13px] text-gold/85">{s.platform.org}</p>
              <ul className="mt-3 card-gold rounded-2xl divide-y divide-gold/10">
                {s.platform.points.map((t) => <li key={t} className="px-5 py-2.5 text-[14px] text-white/78">{t}</li>)}
              </ul>
              <a href={`${base}/work/data-pipeline`} className="fo-btn fo-btn-line mt-4">{s.platform.more}</a>
            </div>
            <div className="lg:col-span-3">
              <Image src="/works/illustrative/tablets-2.png" alt={s.platform.alt} width={2000} height={670} sizes="(max-width: 1024px) 100vw, 680px" className="w-full h-auto" />
              <p className="fo-small mt-2">{s.platform.notice}</p>
            </div>
          </div>
        </Sec>

        <Sec id="lessons" n={8} title={s.lessons.title} img="/riyadh/street.jpg">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {s.lessons.items.map((l) => (
              <article key={l.t} data-reveal className="card-gold rounded-2xl p-5">
                <h3 className="font-display font-bold text-[16px] text-white/95">{l.t}</h3>
                <dl className="mt-3 grid gap-2 text-[13.5px] leading-relaxed">
                  <div><dt className="inline text-white/45">{s.lessons.labels.wrong}: </dt><dd className="inline text-white/72">{l.wrong}</dd></div>
                  <div><dt className="inline text-gold/90">{s.lessons.labels.rule}: </dt><dd className="inline text-white/90">{l.rule}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </Sec>

        <Sec id="reports" n={9} title={s.reports.title} img="/riyadh/kafd.jpg">
          <Gallery items={s.reports.items} className="fo-reports" sizes="(max-width: 640px) 100vw, 360px" zoom={s.zoom} close={s.closeLabel} />
        </Sec>

        <Sec id="workshops" n={10} title={s.workshops.title} img="/riyadh/skyline-sunset.jpg">
          <dl className="grid grid-cols-3 rounded-2xl overflow-hidden border border-gold/20 bg-panel/90 divide-x rtl:divide-x-reverse divide-gold/10 mb-6">
            {s.workshops.numbers.map((n) => (
              <div key={n.label} className="px-3 py-5 text-center">
                <dd className="font-display text-2xl sm:text-[30px] font-bold text-gold tabular leading-none" dir="ltr">{n.value}</dd>
                <dt className="mt-2 text-[12px] text-white/72">{n.label}</dt>
              </div>
            ))}
          </dl>
          <Gallery items={s.workshops.photos.filter((x) => x.w > x.h)} className="grid sm:grid-cols-2 gap-4" sizes="(max-width: 640px) 100vw, 560px" zoom={s.zoom} close={s.closeLabel} />
          <Gallery items={s.workshops.photos.filter((x) => x.w <= x.h)} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4" sizes="(max-width: 768px) 50vw, 270px" zoom={s.zoom} close={s.closeLabel} />
          <a href={s.workshops.link.href} className="fo-btn fo-btn-line mt-6">{s.workshops.link.label}</a>
        </Sec>

        <Sec id="experience" n={11} title={s.experience.title} img="/riyadh/aerial-day.jpg">
          <div className="grid gap-5">
            {s.experience.jobs.map((j) => (
              <article key={j.org} data-reveal className="card-gold rounded-2xl p-6 sm:p-7 grid lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-[12.5px] text-gold/85">{j.period}</p>
                  <h3 className="mt-1 font-display font-bold text-[19px] text-white/95">{j.role}</h3>
                  <p className="mt-1 text-[13.5px] text-white/62">{j.org}</p>
                </div>
                <ul className="lg:col-span-2 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[14px] text-white/76 leading-relaxed">
                  {j.points.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </Sec>

        <Sec id="skills" n={12} title={s.skills.title} img="/riyadh/kingdom-night.jpg">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {s.skills.groups.map((g) => (
              <div key={g.title} data-reveal className="card-gold rounded-2xl p-5">
                <h3 className="font-display font-bold text-[15px] text-gold">{g.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((t) => <li key={t} className="fo-tag">{t}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Sec>

        <Sec id="creds" n={13} title={s.creds.title} img="/riyadh/street.jpg">
          <div className="grid lg:grid-cols-2 gap-5">
            <a href={s.creds.capm.href} target="_blank" rel="noopener noreferrer" className="card-gold rounded-2xl p-4 block">
              <Image src={s.creds.capm.img} alt={s.creds.capm.title} width={1187} height={916} sizes="(max-width: 1024px) 100vw, 540px" className="w-full h-auto rounded-lg" />
              <p className="mt-3 font-display font-bold text-[15px] text-white/95">{s.creds.capm.title}</p>
              <p className="text-[12.5px] text-white/60">{s.creds.capm.meta}</p>
            </a>
            <div className="grid gap-5 content-start">
              <div className="card-gold rounded-2xl p-5">
                <h3 className="font-display font-bold text-[14px] text-gold">{s.creds.coursesTitle}</h3>
                <ul className="mt-2 divide-y divide-gold/10">
                  {s.creds.courses.map((c) => (
                    <li key={c.href}><a href={c.href} target="_blank" rel="noopener noreferrer" dir="ltr" className="block py-2 text-[13.5px] text-white/76 hover:text-gold transition-colors" style={{ textAlign: en ? "left" : "right" }}>{c.name}</a></li>
                  ))}
                </ul>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="card-gold rounded-2xl p-5">
                  <h3 className="font-display font-bold text-[14px] text-gold">{s.creds.eduTitle}</h3>
                  <p className="mt-2 text-[14px] text-white/78">{s.creds.edu}</p>
                </div>
                <div className="card-gold rounded-2xl p-5">
                  <h3 className="font-display font-bold text-[14px] text-gold">{s.creds.langTitle}</h3>
                  <ul className="mt-2 text-[14px] text-white/78">
                    {s.creds.langs.map((l) => <li key={l.name}>{l.name}{en ? ", " : "، "}{l.level}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Sec>

        <Sec id="contact" n={14} title={s.contact.title} img="/riyadh/lamps-hero.jpg">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { l: s.contact.phone, v: s.contact.phoneValue, h: s.contact.phoneHref },
              { l: s.contact.email, v: s.contact.emailValue, h: `mailto:${s.contact.emailValue}` },
              { l: s.contact.linkedin, v: "ahmed-mahmoud", h: s.linkedin, ext: true },
              { l: s.contact.cv, v: s.contact.download, h: s.cv.href, dl: true },
            ].map((c) => (
              <li key={c.l} className="card-gold rounded-2xl p-5">
                <p className="text-[12.5px] text-gold/85">{c.l}</p>
                <a href={c.h} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...(c.dl ? { download: true } : {})} dir="ltr" className="block mt-1 min-h-8 text-[14.5px] font-bold text-white/90 break-all hover:text-gold transition-colors" style={{ textAlign: en ? "left" : "right" }}>{c.v}</a>
              </li>
            ))}
          </ul>
        </Sec>
      </main>
    </FolioShell>
  );
}
