import { getSite, type Lang } from "@/data/site";
import Shots from "./Shots";

/**
 * الصفحة الرئيسية لمسؤول التوظيف — الشبكة السويسرية (انظر docs/redesign.md).
 * أبيض وحبر ورمادي وأصفر Power BI كمساحة مصمتة فقط.
 */
export default function RecruiterPage({ lang }: { lang: Lang }) {
  const s = getSite(lang);
  const close = lang === "en" ? "Close" : "إغلاق";

  return (
    <div dir={s.dir} lang={s.lang} className="rx relative z-[2] min-h-screen bg-white text-[#111] font-plex">
      <a href="#work" className="rx-skip">{lang === "en" ? "Skip to work" : "تخطَّ إلى الأعمال"}</a>

      {/* ── الشريط العلوي ── */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-[#E2E2E2]">
        <div className="rx-wrap flex items-center justify-between h-14 gap-4">
          <a href={lang === "en" ? "/en" : "/"} className="font-bold text-[15px] whitespace-nowrap">
            {s.hero.name}
          </a>
          <nav aria-label={lang === "en" ? "Sections" : "الأقسام"} className="hidden md:flex items-center gap-7 text-[14px]">
            {s.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="rx-link">{n.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={s.other.href} className="text-[14px] rx-link" hrefLang={lang === "en" ? "ar" : "en"}>
              {s.other.label}
            </a>
            <a href={s.cvHref} download className="rx-btn rx-btn-primary h-9 px-4 text-[14px]">
              {s.cvLabel}
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* ── 00 المقدمة ── */}
        <section className="rx-wrap pt-16 md:pt-28 pb-14 md:pb-20" aria-labelledby="hero-name">
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-7">
              <p className="text-[14px] text-[#5F6368] mb-6">{s.hero.place}</p>
              <h1 id="hero-name" className="rx-display">{s.hero.name}</h1>
              <p className="rx-role mt-4">
                <span className="rx-bar" aria-hidden="true" />
                {s.hero.role}
              </p>
              <p className="mt-6 text-[18px] md:text-[20px] leading-[1.8] text-[#333] max-w-[40ch]">{s.hero.line}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href={s.cvHref} download className="rx-btn rx-btn-primary h-12 px-6 text-[16px]">
                  {s.hero.cv}
                </a>
                <a href={s.linkedin} target="_blank" rel="noopener noreferrer" className="rx-btn rx-btn-ghost h-12 px-6 text-[16px]">
                  {s.hero.li}
                </a>
              </div>
            </div>
            <figure className="md:col-span-5 md:pt-16 max-md:mt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.hero.shot.src}
                alt={s.hero.shot.title}
                className="w-full border border-[#E2E2E2] bg-[#F4F4F4]"
                style={{ aspectRatio: "1700/965" }}
                fetchPriority="high"
              />
              <figcaption className="mt-3 text-[13px] text-[#5F6368]">{s.hero.shot.title}</figcaption>
            </figure>
          </div>
        </section>

        {/* ── 01 الأرقام ── */}
        <section className="rx-wrap" aria-label={lang === "en" ? "Key figures" : "أرقام"}>
          <dl className="grid grid-cols-2 md:grid-cols-4 border-t-2 border-[#111]">
            {s.proof.map((p, i) => (
              <div
                key={p.label}
                className={`py-6 md:py-8 pe-4 ${i % 2 === 1 ? "max-md:ps-4 max-md:border-s" : ""} ${i > 0 ? "md:ps-6 md:border-s" : ""} ${i > 1 ? "max-md:border-t" : ""} border-[#E2E2E2]`}
              >
                <dt className="sr-only">{p.label}</dt>
                <dd>
                  <span className="rx-num block" dir="ltr">{p.value}</span>
                  <span className="block mt-2 text-[14px] leading-[1.6] text-[#5F6368]">{p.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── 02 دراسة الحالة ── */}
        <Section id="work" n="02" title={s.caseStudy.kicker}>
          <div className="grid md:grid-cols-12 gap-6 md:gap-10">
            <div className="md:col-span-5">
              <h3 className="rx-h3">{s.caseStudy.title}</h3>
              <p className="mt-2 text-[14px] text-[#5F6368]">{s.caseStudy.org}</p>
              <p className="mt-1 text-[14px] text-[#5F6368]">{s.caseStudy.role}</p>
              <p className="mt-6 text-[17px] leading-[1.9] text-[#222]">{s.caseStudy.lede}</p>
            </div>
            <div className="md:col-span-7">
              <dl className="grid grid-cols-2 gap-px bg-[#E2E2E2] border border-[#E2E2E2]">
                {s.caseStudy.metrics.map((m) => (
                  <div key={m.label} className="bg-white p-5">
                    <dt className="sr-only">{m.label}</dt>
                    <dd>
                      <span className="rx-num-sm block" dir="ltr">{m.value}</span>
                      <span className="block mt-1 text-[14px] text-[#5F6368]">{m.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-8 rx-list">
                {s.caseStudy.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12">
            <Shots items={s.caseStudy.shots} cols={3} aspect="1800/1231" scroller closeLabel={close} />
            <p className="mt-6 text-[13px] text-[#5F6368]">{s.caseStudy.note}</p>
          </div>
        </Section>

        {/* ── 03 لوحات Power BI ── */}
        <Section n="03" title={s.boards.title} lede={s.boards.lede}>
          <Shots items={s.boards.items} cols={2} aspect="1700/965" scroller closeLabel={close} />
          <h3 className="rx-h4 mt-16 mb-6">{s.boards.reportsTitle}</h3>
          <Shots items={s.boards.reports} cols={3} aspect="4/3" scroller closeLabel={close} />
        </Section>

        {/* ── 04 الخبرة ── */}
        <Section id="experience" n="04" title={s.experience.title}>
          <div className="grid md:grid-cols-12 gap-6 md:gap-10">
            <div className="md:col-span-4">
              <h3 className="rx-h3">{s.experience.role}</h3>
              <p className="mt-2 text-[15px] leading-[1.7]">{s.experience.org}</p>
              <p className="mt-2 text-[14px] text-[#5F6368]">{s.experience.period}</p>
            </div>
            <ul className="md:col-span-8 rx-list">
              {s.experience.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ── 05 الورش ── */}
        <Section n="05" title={s.workshops.title} lede={s.workshops.lede}>
          <dl className="flex flex-wrap gap-x-12 gap-y-6 mb-10">
            {s.workshops.metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="rx-num-sm block" dir="ltr">{m.value}</span>
                  <span className="block mt-1 text-[14px] text-[#5F6368]">{m.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <Shots items={s.workshops.photos} cols={3} aspect="4/3" scroller closeLabel={close} />
          <a href={s.workshops.link} className="rx-btn rx-btn-ghost h-11 px-5 text-[15px] mt-10">
            {s.workshops.linkLabel}
          </a>
        </Section>

        {/* ── 06 المهارات ── */}
        <Section id="skills" n="06" title={s.skills.title}>
          <div className="grid md:grid-cols-3 gap-10">
            {s.skills.groups.map((g) => (
              <div key={g.title} className="border-t border-[#111] pt-5">
                <h3 className="rx-h4">{g.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.8] text-[#5F6368]">{g.proof}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li key={it} className="rx-tag">{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 07 الشهادات والمؤهل ── */}
        <Section n="07" title={s.creds.title}>
          <div className="grid md:grid-cols-12 gap-x-10 gap-y-10">
            <div className="md:col-span-6">
              <h3 className="rx-label">{s.creds.certTitle}</h3>
              <a href={s.creds.cert.href} target="_blank" rel="noopener noreferrer" className="block mt-3 rx-link-block">
                <span className="block text-[17px] font-bold" dir="ltr">{s.creds.cert.name}</span>
                <span className="block mt-1 text-[14px] text-[#5F6368]">{s.creds.cert.meta}</span>
              </a>
              <h3 className="rx-label mt-10">{s.creds.eduTitle}</h3>
              <p className="mt-3 text-[17px] font-bold">{s.creds.edu}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="rx-label">{s.creds.langTitle}</h3>
              <ul className="mt-3 space-y-2">
                {s.creds.langs.map((l) => (
                  <li key={l.name} className="flex justify-between gap-4 text-[15px] border-b border-[#E2E2E2] pb-2">
                    <span>{l.name}</span>
                    <span className="text-[#5F6368]">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-3">
              <h3 className="rx-label">{s.creds.coursesTitle}</h3>
              <ul className="mt-3 space-y-2 text-[14px] leading-[1.6]" dir="ltr">
                {s.creds.courses.map((c) => (
                  <li key={c} className={lang === "ar" ? "text-right" : ""}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ── 08 التواصل ── */}
        <Section id="contact" n="08" title={s.contact.title} lede={s.contact.lede}>
          <dl className="grid md:grid-cols-4 border-t-2 border-[#111]">
            <Contact label={s.contact.labels.email} href={`mailto:${s.contact.email}`} value={s.contact.email} />
            <Contact label={s.contact.labels.phone} href={s.contact.phoneHref} value={s.contact.phone} />
            <Contact label={s.contact.labels.linkedin} href={s.linkedin} value="ahmed-mahmoud-95aa1b2a5" external />
            <Contact label={s.contact.labels.cv} href={s.cvHref} value={lang === "en" ? "Download PDF" : "تحميل PDF"} download />
          </dl>
        </Section>
      </main>

      <footer className="rx-wrap py-10 mt-10 border-t border-[#E2E2E2] text-[13px] text-[#5F6368]">
        {s.footer}
      </footer>
    </div>
  );
}

function Section({
  id,
  n,
  title,
  lede,
  children,
}: {
  id?: string;
  n: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="rx-wrap pt-20 md:pt-28 scroll-mt-16" aria-labelledby={`h-${n}`}>
      <div className="border-t-2 border-[#111] pt-5 mb-10 md:mb-14 grid md:grid-cols-12 gap-6">
        <p className="md:col-span-2 rx-index" aria-hidden="true">
          <span className="rx-square" />
          <span dir="ltr">{n}.</span>
        </p>
        <div className="md:col-span-10">
          <h2 id={`h-${n}`} className="rx-h2">{title}</h2>
          {lede && <p className="mt-3 text-[17px] leading-[1.8] text-[#333] max-w-[60ch]">{lede}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function Contact({
  label,
  value,
  href,
  external,
  download,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  download?: boolean;
}) {
  return (
    <div className="py-6 md:pe-6 border-b md:border-b-0 md:border-e last:border-e-0 border-[#E2E2E2] md:[&:not(:first-child)]:ps-6">
      <dt className="text-[13px] text-[#5F6368]">{label}</dt>
      <dd className="mt-2">
        <a
          href={href}
          dir={download ? undefined : "ltr"}
          className="rx-link text-[15px] font-bold break-all"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...(download ? { download: true } : {})}
        >
          {value}
        </a>
      </dd>
    </div>
  );
}
