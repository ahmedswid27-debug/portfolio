import Image from "next/image";
import Link from "next/link";
import { getTraining } from "@/data/training";
import { profile } from "@/data/profile";
import SectionHead from "./SectionHead";
import VideoWall from "./VideoWall";
import ScrollReveal from "./ScrollReveal";
import ScrollProgress from "./ScrollProgress";
import HtmlLang from "./HtmlLang";

export default function TrainingPage({ lang }: { lang: "ar" | "en" }) {
  const t = getTraining(lang);
  const home = lang === "en" ? "/en" : "/";
  const other = lang === "en" ? "/training" : "/en/training";
  const otherLabel = lang === "en" ? "عربي" : "EN";

  return (
    <div dir={t.dir} className="min-h-screen">
      <HtmlLang lang={lang} dir={t.dir} />
      <ScrollProgress />
      {/* ⚠ `ScrollReveal` يختار `main section` ويخفيها حتى تدخل الشاشة —
          فأقسام هذه الصفحة كلُّها داخل `<main>` لذلك، وقواعد الطباعة تُظهرها. */}
      <ScrollReveal />

      {/* ── شريط علويّ رفيع: الرجوع واللغة ── */}
      <header className="no-print sticky top-0 z-50 bg-ink/92 backdrop-blur border-b border-gold/12">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 h-14 flex items-center gap-4">
          <Link href={home} className="inline-flex items-center min-h-11 text-[14px] sm:text-[13px] text-gold/90 hover:text-gold transition-colors">
            {t.back}
          </Link>
          <span className="hidden sm:block flex-1 hairline" />
          <p className="ms-auto sm:ms-0 text-[13px] sm:text-[12px] text-white/50 truncate">{profile.fullName}</p>
          <Link
            href={other}
            className="shrink-0 inline-flex items-center justify-center min-h-11 min-w-11 text-[12px] sm:text-[11px] font-bold px-3 rounded-full border border-gold/30 text-gold hover:bg-gold/[0.08] transition-colors"
          >
            {otherLabel}
          </Link>
        </div>
      </header>

      {/* ── الواجهة ── */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/riyadh/lamps-hero.jpg" alt="" fill priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/70 to-ink" />
          <div className="absolute inset-0 rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-ink via-ink/65 to-ink/10" />
        </div>

        <div className="mx-auto max-w-6xl px-6 sm:px-10 pt-16 pb-20 sm:pt-20 sm:pb-24">
          <span className="inline-block text-[12px] sm:text-[11px] tracking-wider px-3 py-1 rounded-full bg-gold/12 border border-gold/30 text-gold">
            {t.badge}
          </span>
          {/* ⚠ leading ≥ 1.3 و pb — الخط العربي العريض يُقتطع دونهما */}
          <h1 className="mt-5 font-display font-black leading-[1.34] pb-1 text-[30px] sm:text-[42px] lg:text-[50px] max-w-4xl text-gold-shine">
            {t.title}
          </h1>
          <p className="mt-5 max-w-3xl text-sm sm:text-[15px] text-white/78 leading-loose">{t.lead}</p>
        </div>
      </section>

      {/* ── شريط الأرقام ── */}
      <div className="mx-auto max-w-6xl px-6 sm:px-10 -mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 rounded-2xl overflow-hidden border border-gold/20 bg-panel/90 backdrop-blur-md divide-x rtl:divide-x-reverse divide-gold/10 shadow-[0_24px_60px_-30px_rgba(0,0,0,1)]">
          {t.stats.map((s) => (
            <div key={s.label} className="px-4 py-5 sm:py-7 text-center">
              <div className="font-display text-2xl sm:text-[32px] font-bold text-gold tabular leading-none" dir="ltr">
                {s.value}
              </div>
              <p className="mt-2 text-[12px] sm:text-xs text-white/72 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 sm:px-10">
        {/* ── ١ · من قاعة التدريب ── */}
        <section className="py-16 sm:py-20">
          <SectionHead n={1} title={t.evidenceTitle} sub={t.evidenceSub} img="/riyadh/kafd.jpg" />
          <VideoWall clips={t.clips} officialLabel={lang === "en" ? "Official" : "تغطية رسمية"} />
        </section>

        {/* ── ٢ · الفئة المستهدفة ── */}
        <section className="py-16 sm:py-20">
          <SectionHead n={2} title={t.audienceTitle} img="/riyadh/skyline-sunset.jpg" />
          <dl className="card-gold rounded-2xl divide-y divide-gold/10">
            {t.audience.map((a) => (
              <div key={a.k} className="grid sm:grid-cols-[180px_1fr] gap-x-6 gap-y-1.5 px-6 sm:px-8 py-5">
                <dt className="font-display font-bold text-[14px] sm:text-[13px] text-gold/90">{a.k}</dt>
                <dd className="text-[14px] sm:text-[13px] text-white/74 leading-relaxed">{a.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── ٣ · المنهج ── */}
        <section className="py-16 sm:py-20">
          <SectionHead n={3} title={t.curriculumTitle} sub={t.curriculumSub} img="/riyadh/aerial-day.jpg" />

          <div className="space-y-10">
            {t.weeks.map((w) => (
              <div key={w.n}>
                {/* ترويسة الأسبوع */}
                <div className="flex items-baseline gap-3 sm:gap-4 mb-5">
                  <span className="font-display text-[34px] sm:text-5xl font-black text-gold/22 leading-none tabular">
                    {w.n}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg sm:text-xl font-bold leading-snug">{w.title}</h3>
                    {w.hours && <p className="text-[12px] sm:text-[11px] text-gold/70 mt-0.5">{w.hours}</p>}
                  </div>
                  <span className="flex-1 hairline self-center" />
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                  {w.sessions.map((s) => (
                    <article
                      key={s.n}
                      className={`rounded-2xl p-5 sm:p-6 flex flex-col border ${
                        s.pivot
                          ? "border-saud/55 bg-saud/[0.10] shadow-[0_0_0_1px_rgba(30,107,79,0.25)]"
                          : "card-gold"
                      }`}
                    >
                      <div className="flex items-center gap-2 text-[12px] sm:text-[11px]">
                        <span className="font-mono text-gold/60">
                          {lang === "en" ? "S" : "ج"}
                          {s.n}
                        </span>
                        {s.hours && <><span className="text-white/35">·</span>
                        <span className="text-white/55">{s.hours}</span></>}
                        {s.pivot && (
                          <span className="ms-auto px-2 py-0.5 rounded-full bg-saud/35 border border-saud/60 text-emerald-200 text-[11px] sm:text-[10px]">
                            {t.pivotLabel}
                          </span>
                        )}
                      </div>

                      <h4 className="mt-2.5 font-display font-bold text-[15px] leading-snug">{s.title}</h4>

                      <ul className="mt-3.5 space-y-2 flex-1">
                        {s.points.map((p) => (
                          <li key={p} className="flex gap-2.5 text-[14px] sm:text-[12.5px] text-white/70 leading-relaxed">
                            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold/60" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>

                      <p className="mt-4 pt-3.5 border-t border-white/[0.07] text-[13px] sm:text-[12px] text-white/60 leading-relaxed">
                        <span className="text-gold/80 font-medium">{t.labLabel} · </span>
                        {s.lab}
                      </p>
                    </article>
                  ))}
                </div>

                {/* مخرج الأسبوع */}
                <p className="mt-4 rounded-xl border-s-[3px] border-s-gold bg-panel2/50 px-5 py-3.5 text-[14px] sm:text-[13px] text-white/78 leading-relaxed">
                  <span className="text-gold/85 font-medium">{t.outcomeLabel} · </span>
                  {w.outcome}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── ٤ · منهجية التدريب ── */}
        <section className="py-16 sm:py-20">
          <SectionHead n={4} title={t.methodTitle} sub={t.methodSub} img="/riyadh/street.jpg" />
          <ol className="relative border-s border-gold/18 ms-3 space-y-7">
            {t.method.map((m) => (
              <li key={m.n} className="relative ps-7">
                <span className="absolute start-0 -ms-3 top-0.5 grid h-6 w-6 place-items-center rounded-full bg-ink border border-gold/40 text-[12px] sm:text-[11px] font-bold text-gold tabular">
                  {m.n}
                </span>
                <h3 className="font-display font-bold text-[15px]">{m.t}</h3>
                <p className="mt-1.5 text-[14px] sm:text-[13px] text-white/68 leading-relaxed max-w-2xl">{m.d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── ٥ · البيانات التدريبية ── */}
        <section className="py-16 sm:py-20">
          <SectionHead n={5} title={t.dataTitle} sub={t.dataSub} img="/riyadh/kingdom-night.jpg" />
          <div className="card-gold rounded-2xl overflow-hidden">
            {/* ⚠ ثلاثة أعمدة في شاشة ٣٩٠ تعرض عمودين ونصفاً، والثالث يُقرأ شظيّةً.
                فعلى الجوال تُفكَّك الصفوف بطاقاتٍ، وعلى الشاشة الواسعة تبقى جدولاً. */}
            <table className="hidden sm:table w-full text-start border-collapse">
              <thead>
                <tr className="bg-panel2/60 border-b border-gold/15">
                  {t.dataHead.map((h) => (
                    <th key={h} className="px-5 py-3.5 text-start text-[12px] sm:text-[11px] font-display font-bold text-gold/85">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.dataRows.map((r) => (
                  <tr key={r.file} className="border-b border-white/[0.06] last:border-0">
                    <td className="px-5 py-3.5 text-[14px] sm:text-[12.5px] text-white/82 font-medium">{r.file}</td>
                    <td className="px-5 py-3.5 text-[14px] sm:text-[12.5px] text-white/66">{r.flaw}</td>
                    <td className="px-5 py-3.5 text-[13px] sm:text-[12px] text-gold/75 whitespace-nowrap">{r.lesson}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ul className="sm:hidden divide-y divide-white/[0.06]">
              {t.dataRows.map((r) => (
                <li key={r.file} className="px-5 py-4">
                  <p className="text-[14px] sm:text-[13px] text-white/85 font-medium">{r.file}</p>
                  <p className="mt-1.5 text-[14px] sm:text-[12.5px] text-white/66 leading-relaxed">
                    <span className="text-white/40">{t.dataHead[1]} · </span>
                    {r.flaw}
                  </p>
                  <p className="mt-1 text-[13px] sm:text-[12px] text-gold/75">{r.lesson}</p>
                </li>
              ))}
            </ul>

            <p className="px-5 py-4 text-[13px] sm:text-[12px] text-white/55 leading-relaxed border-t border-white/[0.07]">{t.dataNote}</p>
          </div>
        </section>

        {/* ── ٦ · التقويم وما يخرج به المشارك ── */}
        <section className="py-16 sm:py-20">
          <SectionHead n={6} title={t.assessTitle} img="/riyadh/aerial-day.jpg" />
          <div className="grid gap-5 lg:grid-cols-2 items-start">
            <dl className="card-gold rounded-2xl divide-y divide-gold/10">
              {t.assess.map((a) => (
                <div key={a.k} className="px-6 py-5">
                  <dt className="font-display font-bold text-[14px] sm:text-[13px] text-gold/90">{a.k}</dt>
                  <dd className="mt-1.5 text-[14px] sm:text-[13px] text-white/72 leading-relaxed">{a.v}</dd>
                </div>
              ))}
            </dl>

            <div className="rounded-2xl border border-saud/40 bg-saud/[0.08] p-6 sm:p-7">
              <h3 className="font-display font-bold text-base text-emerald-200">{t.takeawayTitle}</h3>
              <ul className="mt-5 space-y-3.5">
                {t.takeaways.map((k) => (
                  <li key={k} className="flex gap-3 text-[14px] sm:text-[13px] text-white/80 leading-relaxed">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-emerald-300/80" />
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── التواصل ── */}
        <section className="pb-24">
          <div className="rounded-2xl border border-gold/25 bg-gradient-to-br from-panel to-ink p-7 sm:p-10">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-gold-grad">{t.ctaTitle}</h2>
            <p className="mt-3 max-w-2xl text-[14px] sm:text-sm text-white/74 leading-loose">{t.ctaBody}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={profile.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center min-h-11 px-5 py-3 rounded-lg text-[14px] sm:text-[13px] font-bold text-ink bg-gradient-to-l from-gold2 to-gold"
              >
                {t.ctaWhatsapp}
              </a>
              <Link
                href={lang === "en" ? "/cv/training?lang=en" : "/cv/training"}
                className="inline-flex items-center min-h-11 px-5 py-3 rounded-lg text-[14px] sm:text-[13px] font-bold border border-gold/45 bg-gold/[0.08] text-gold hover:bg-gold/[0.14] transition-colors"
              >
                {t.ctaCv}
              </Link>
              <a
                href={profile.social.email}
                className="inline-flex items-center min-h-11 px-5 py-3 rounded-lg text-[14px] sm:text-[13px] border border-gold/30 text-gold/90 hover:bg-gold/[0.07] transition-colors"
              >
                {t.ctaEmail}
              </a>
              <Link
                href={home}
                className="inline-flex items-center min-h-11 px-5 py-3 rounded-lg text-[14px] sm:text-[13px] border border-white/15 text-white/70 hover:bg-white/[0.05] transition-colors"
              >
                {t.ctaProfile}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
