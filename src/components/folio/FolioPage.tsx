import Image from "next/image";
import { getFolio, type Lang } from "@/data/folio";
import HtmlLang from "@/components/HtmlLang";
import Gallery from "./Gallery";
import Reveal from "./Reveal";

/**
 * الصفحة الرئيسية على هوية ملف الأعمال الذي صممه أحمد بيده
 * (portfolio.pdf و«بورتفوليو 2026.ai»): الكلمة الضخمة فوق الشريط النعناعي،
 * والاسم بالأزرق المخضر، والبرتقالي لعبارة «ملف أعمال» وحدها، واللوحات على أجهزة لوحية.
 */
function Head({ label, title, lede, id }: { label: string; title: string; lede?: string; id: string }) {
  return (
    <div data-reveal className="fo-h2-wrap max-w-3xl">
      <p className="fo-label">{label}</p>
      <h2 id={id} className="fo-h2 mt-2">{title}</h2>
      {lede && <p className="fo-lede mt-5">{lede}</p>}
    </div>
  );
}

export default function FolioPage({ lang }: { lang: Lang }) {
  const s = getFolio(lang);
  const en = lang === "en";
  const p = s.profile;

  return (
    <div dir={s.dir} lang={s.lang} className="fo relative z-[2] min-h-screen">
      <HtmlLang lang={s.lang} dir={s.dir} />
      <Reveal />
      <a href="#main" className="fo-skip">{en ? "Skip to content" : "تخطَّ إلى المحتوى"}</a>

      {/* ── الشريط العلوي ── */}
      <header className="fo-top">
        <div className="fo-wrap flex items-center justify-between h-16 gap-4">
          <a href={en ? "/en" : "/"} className="fo-latin whitespace-nowrap min-h-11 inline-flex items-center" dir="ltr" aria-label={p.name}>
            AHMED SWID
          </a>
          <nav aria-label={en ? "Sections" : "الأقسام"} className="hidden lg:flex items-center gap-8 text-[15px] font-semibold">
            {s.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="fo-link">{n.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <a href={s.other.href} hrefLang={en ? "ar" : "en"} className="fo-link text-[15px] font-semibold min-h-11 inline-flex items-center px-2">
              {s.other.label}
            </a>
            <a href={s.cv.href} download className="fo-btn fo-btn-ink min-h-11 px-4 text-[15px]">{s.cv.label}</a>
          </div>
        </div>
      </header>

      <main id="main">
        {/* ── الغلاف: كلمة الملف نفسها ── */}
        <section className="pt-12 md:pt-20" aria-labelledby="hero-title">
          <h1 id="hero-title" className="sr-only">{`${p.name}، ${p.role}`}</h1>
          <div className="fo-wrap flex justify-center">
            <div className="fo-mark-box" aria-hidden="true">
              <span className="fo-band" style={{ bottom: 0, height: "56%" }} />
              <span className="fo-mark fo-mark-xl fo-latin block text-center" dir="ltr">portfolio</span>
              <p className="fo-kicker px-[3%] pt-3 pb-4" dir={s.dir}>
                <b>{s.hero.kicker}</b>
                <span>{s.hero.sub}</span>
              </p>
            </div>
          </div>
          <div className="fo-wrap mt-6 md:mt-10 max-sm:overflow-hidden">
            <Image
              src="/works/illustrative/tablets.png"
              alt={s.hero.alt}
              width={2000}
              height={670}
              priority
              sizes="(max-width: 640px) 170vw, (max-width: 1240px) 100vw, 1180px"
              className="w-full h-auto max-sm:w-[165%] max-sm:max-w-none max-sm:ltr:-ml-[65%]"
            />
          </div>
        </section>

        {/* ── الملف الشخصي (صفحة 2 من الملف) ── */}
        <section id="profile" className="fo-sec pt-10 md:pt-16" aria-label={p.name}>
          <div className="fo-wrap">
            <div data-reveal>
              <div className="fo-mark-box" dir="ltr">
                <span className="fo-band" style={{ bottom: "-4px", height: "48%" }} />
                <p className="fo-name fo-latin relative z-[1] px-1">AHMED SWID</p>
              </div>
              <p className="mt-6 text-[24px] md:text-[28px] font-extrabold leading-snug">{p.name}</p>
              <p className="mt-1 text-[19px] md:text-[22px] font-semibold" style={{ color: "var(--teal)" }}>{p.role}</p>
            </div>

            <div className="mt-10 grid md:grid-cols-12 gap-4">
              <div data-reveal className="fo-panel md:col-span-8 p-6 md:p-10">
                {p.summary.map((t, i) => (
                  <p key={i} className={`fo-lede ${i ? "mt-5 text-[16px]" : ""}`}>{t}</p>
                ))}
              </div>
              <div data-reveal className="fo-panel md:col-span-4 p-6 md:p-8 flex flex-col">
                <ul className="grid gap-3 text-[16px] leading-relaxed" style={{ color: "var(--navy)" }}>
                  {p.facts.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <div className="mt-8 md:mt-auto pt-6 grid gap-1 text-[15px] font-bold" style={{ color: "var(--navy)" }}>
                  <a href={p.contact.phoneHref} className="fo-link min-h-11 inline-flex items-center">
                    {en ? "Phone" : "الجوال"}: <bdi dir="ltr" className="ms-1">{p.contact.phone}</bdi>
                  </a>
                  <a href={`mailto:${p.contact.email}`} className="fo-link break-all min-h-11 inline-flex items-center">{p.contact.email}</a>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href={s.cv.href} download className="fo-btn fo-btn-ink">{s.cv.download}</a>
              <a href={s.linkedin} target="_blank" rel="noopener noreferrer" className="fo-btn fo-btn-line">LinkedIn</a>
            </div>

            <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 border-t" style={{ borderColor: "var(--line)" }}>
              {s.proof.map((x, i) => (
                <div
                  key={x.label}
                  data-reveal
                  className={`pt-7 pb-2 pe-4 ${i % 2 ? "max-md:ps-4 max-md:border-s" : ""} ${i ? "md:ps-6 md:border-s" : ""}`}
                  style={{ borderColor: "var(--line)" }}
                >
                  <dd className="fo-num" dir="ltr" style={{ textAlign: en ? "left" : "right" }}>{x.value}</dd>
                  <dt className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>{x.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── لوحات Power BI ── */}
        <section id="boards" className="fo-sec fo-rule" aria-labelledby="h-boards">
          <div className="fo-wrap">
            <Head id="h-boards" label={s.boards.label} title={s.boards.title} lede={s.boards.lede} />
            <div className="mt-12" data-reveal>
              <Gallery
                items={s.boards.flat}
                className="grid sm:grid-cols-2 gap-x-6 gap-y-4"
                sizes="(max-width: 640px) 100vw, 600px"
                zoom={s.zoom}
                close={s.closeLabel}
              />
            </div>
            <p className="fo-small mt-4 max-w-3xl">{s.boards.disclaimer}</p>
          </div>
        </section>

        {/* ── منصة تشغيلية ── */}
        <section id="platform" className="fo-sec fo-rule" aria-labelledby="h-platform">
          <div className="fo-wrap">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-5">
                <Head id="h-platform" label={s.platform.label} title={s.platform.title} />
                <p className="fo-small mt-3">{s.platform.org}</p>
                <p data-reveal className="fo-lede mt-6">{s.platform.lede}</p>
              </div>
              <div className="lg:col-span-7 lg:pt-6">
                <ol data-reveal className="fo-points">
                  {s.platform.points.map((t) => <li key={t}>{t}</li>)}
                </ol>
              </div>
            </div>
            <div data-reveal className="mt-12">
              <Image
                src="/works/illustrative/tablets-2.png"
                alt={s.platform.mockAlt}
                width={2000}
                height={670}
                sizes="(max-width: 1240px) 100vw, 1180px"
                className="w-full h-auto"
              />
              <p className="fo-small mt-2">{s.platform.note}</p>
            </div>
          </div>
        </section>

        {/* ── التقارير ── */}
        <section id="reports" className="fo-sec fo-rule" aria-labelledby="h-reports">
          <div className="fo-wrap">
            <Head id="h-reports" label={s.reports.label} title={s.reports.title} lede={s.reports.lede} />
            <div className="mt-12" data-reveal>
              <Gallery items={s.reports.items} className="fo-reports" sizes="(max-width: 640px) 100vw, 400px" zoom={s.zoom} close={s.closeLabel} />
            </div>
          </div>
        </section>

        {/* ── الورش ── */}
        <section id="workshops" className="fo-sec fo-rule" aria-labelledby="h-workshops">
          <div className="fo-wrap">
            <div className="grid lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-7">
                <Head id="h-workshops" label={s.workshops.label} title={s.workshops.title} lede={s.workshops.lede} />
              </div>
              <dl data-reveal className="lg:col-span-5 grid grid-cols-3 gap-4">
                {s.workshops.numbers.map((n) => (
                  <div key={n.label}>
                    <dd className="fo-num-sm" dir="ltr" style={{ textAlign: en ? "left" : "right" }}>{n.value}</dd>
                    <dt className="mt-2 text-[14px]" style={{ color: "var(--muted)" }}>{n.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-12 grid gap-4" data-reveal>
              <Gallery
                items={s.workshops.photos.filter((x) => x.w > x.h)}
                className="grid sm:grid-cols-2 gap-x-4"
                sizes="(max-width: 640px) 100vw, 600px"
                zoom={s.zoom}
                close={s.closeLabel}
              />
              <Gallery
                items={s.workshops.photos.filter((x) => x.w <= x.h)}
                className="grid grid-cols-2 md:grid-cols-4 gap-x-4"
                sizes="(max-width: 768px) 50vw, 300px"
                zoom={s.zoom}
                close={s.closeLabel}
              />
            </div>
            <a href={s.workshops.link.href} className="fo-btn fo-btn-line mt-8">{s.workshops.link.label}</a>
          </div>
        </section>

        {/* ── الخبرة ── */}
        <section id="experience" className="fo-sec fo-rule" aria-labelledby="h-exp">
          <div className="fo-wrap">
            <Head id="h-exp" label={s.experience.label} title={s.experience.title} />
            <div className="mt-12 grid gap-12">
              {s.experience.jobs.map((j) => (
                <article key={j.org} data-reveal className="grid lg:grid-cols-12 gap-4 lg:gap-10 pt-8 border-t" style={{ borderColor: "var(--line)" }}>
                  <div className="lg:col-span-4">
                    <p className="text-[15px] font-bold" style={{ color: "var(--teal)" }}>{j.period}</p>
                    <h3 className="mt-2 text-[24px] font-extrabold leading-snug">{j.role}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>{j.org}</p>
                  </div>
                  <ol className="fo-points lg:col-span-8">
                    {j.points.map((t) => <li key={t}>{t}</li>)}
                  </ol>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── المهارات ── */}
        <section id="skills" className="fo-sec fo-rule" aria-labelledby="h-skills">
          <div className="fo-wrap">
            <Head id="h-skills" label={s.skills.label} title={s.skills.title} />
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {s.skills.groups.map((g) => (
                <div key={g.title} data-reveal className="fo-panel p-6">
                  <h3 className="text-[18px] font-extrabold">{g.title}</h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {g.items.map((t) => <li key={t} className="fo-tag">{t}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── الشهادات ── */}
        <section id="creds" className="fo-sec fo-rule" aria-labelledby="h-creds">
          <div className="fo-wrap">
            <Head id="h-creds" label={s.creds.label} title={s.creds.title} />
            <div className="mt-12 grid lg:grid-cols-12 gap-10">
              <a href={s.creds.capm.href} target="_blank" rel="noopener noreferrer" data-reveal className="lg:col-span-7 block group">
                <span className="fo-frame" style={{ cursor: "pointer" }}>
                  <Image src={s.creds.capm.img} alt={s.creds.capm.title} width={1187} height={916} sizes="(max-width: 1024px) 100vw, 680px" />
                  <span className="fo-cap">
                    <b>{s.creds.capm.title}</b>
                    <span>{s.creds.capm.meta}</span>
                  </span>
                </span>
              </a>
              <div data-reveal className="lg:col-span-5 grid gap-10 content-start">
                <div>
                  <h3 className="fo-label">{s.creds.coursesTitle}</h3>
                  <ul className="mt-3">
                    {s.creds.courses.map((c) => (
                      <li key={c.href} className="border-t" style={{ borderColor: "var(--line)" }}>
                        <a href={c.href} target="_blank" rel="noopener noreferrer" dir="ltr" className="fo-link block py-3 text-[15px] leading-relaxed" style={{ textAlign: en ? "left" : "right" }}>
                          {c.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="fo-label">{s.creds.eduTitle}</h3>
                  <p className="mt-3 text-[17px] font-bold">{s.creds.edu}</p>
                </div>
                <div>
                  <h3 className="fo-label">{s.creds.langTitle}</h3>
                  <ul className="mt-3 grid gap-1 text-[16px]">
                    {s.creds.langs.map((l) => (
                      <li key={l.name}><b>{l.name}</b> <span style={{ color: "var(--muted)" }}>{l.level}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── التواصل والختام (الصفحة الأخيرة من الملف) ── */}
        <section id="contact" className="fo-sec fo-rule pb-10" aria-labelledby="h-contact">
          <div className="fo-wrap">
            <Head id="h-contact" label={s.contact.label} title={s.contact.title} lede={s.contact.lede} />
            <ul data-reveal className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 border-t" style={{ borderColor: "var(--line)" }}>
              {[
                { l: s.contact.labels.phone, v: p.contact.phone, h: p.contact.phoneHref, ltr: true },
                { l: s.contact.labels.email, v: p.contact.email, h: `mailto:${p.contact.email}`, ltr: true },
                { l: s.contact.labels.linkedin, v: "ahmed-mahmoud-95aa1b2a5", h: s.linkedin, ltr: true, ext: true },
                { l: s.contact.labels.cv, v: en ? "Download PDF" : "تحميل PDF", h: s.cv.href, ltr: true, dl: true },
              ].map((c, i) => (
                <li key={c.l} className={`py-6 ${i ? "lg:ps-6 lg:border-s" : ""} ${i % 2 ? "sm:ps-6 sm:border-s" : ""} max-sm:border-b`} style={{ borderColor: "var(--line)" }}>
                  <p className="text-[14px]" style={{ color: "var(--muted)" }}>{c.l}</p>
                  <a
                    href={c.h}
                    {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    {...(c.dl ? { download: true } : {})}
                    dir={c.ltr ? "ltr" : undefined}
                    className="fo-link mt-1 min-h-11 inline-flex items-center text-[17px] font-bold break-all"
                  >
                    {c.v}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="fo-wrap mt-20 md:mt-28 flex justify-center" aria-hidden="true">
            <div className="fo-mark-box" data-reveal>
              <span className="fo-band" style={{ bottom: 0, height: "58%" }} />
              <span className="fo-mark fo-mark-lg fo-latin block text-center" dir="ltr">{s.close}</span>
              <p className="fo-kicker px-[3%] pt-2 pb-3" dir={s.dir}>
                <b>{s.closeSub}</b>
                <span>{s.hero.sub}</span>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="fo-wrap py-8 text-[14px] border-t" style={{ borderColor: "var(--line)", color: "var(--muted)" }}>
        {s.footer}
      </footer>
    </div>
  );
}
