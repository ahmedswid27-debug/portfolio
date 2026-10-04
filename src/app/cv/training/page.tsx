import type { Metadata } from "next";
import { getTrainerCv } from "@/data/training";
import { getContent } from "@/data/content";
import PrintButton from "@/components/PrintButton";
import HtmlLang from "@/components/HtmlLang";

/**
 * السيرة الذاتية التدريبية — صفحة واحدة، لا تذكر غير التدريب (طلب المالك).
 *
 * تتبع تنسيق `/cv` نفسه حرفاً بحرف: ترويسةٌ داكنة، ولونُ إبرازٍ واحد،
 * وخطٌّ واحد بوزنَين، والتسلسل بالحجم لا بتبديل الخط. والفرق في المحتوى وحده.
 *
 * ⚠ قواعد الصفحة الواحدة في `globals.css` تتعلّق بـ`.cv-root` و`.cv-sheet`
 *   (منها `@page` بهامش ٩مم و`print:min-h-0`) — فلا يُغيَّر اسما الصنفين.
 * ⚠ وأيّ بندٍ يُضاف هنا يُقاس بعده عددُ الصفحات:
 *   `page.pdf(prefer_css_page_size=True)` ثمّ `fitz.open().page_count`.
 */

export const metadata: Metadata = {
  title: "ملفّ ورش العمل — أحمد محمود سويد",
  description: "ورش عمل تطبيقية في تحليل الأعمال وبناء لوحات المعلومات بـ Power BI — السجل والمحاور والمواد المُعَدّة.",
};

export default async function TrainerCvPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string; print?: string }>;
}) {
  const sp = await searchParams;
  const lang = sp.lang === "en" ? "en" : "ar";
  const autoPrint = sp.print === "1";
  const t = getTrainerCv(lang);
  const dir = lang === "en" ? "ltr" : "rtl";
  const { profile, languages: langs } = getContent(lang);

  return (
    <div className="cv-root min-h-screen print:min-h-0 bg-[#11161F] py-8 px-4 print:p-0 print:bg-white" dir={dir}>
      <HtmlLang lang={lang} dir={dir} />
      <div className="no-print max-w-[820px] mx-auto mb-5 flex items-center justify-between">
        <a
          href={lang === "en" ? "/en/training" : "/training"}
          className="inline-flex min-h-11 items-center text-sm text-gold hover:underline"
        >
          {t.back}
        </a>
        <div className="flex items-center gap-2">
          <a
            href={lang === "en" ? "/cv/training" : "/cv/training?lang=en"}
            className="grid min-h-11 min-w-11 place-items-center text-xs px-3 rounded-full border border-gold/30 text-gold"
          >
            {lang === "en" ? "عربي" : "EN"}
          </a>
          <PrintButton label={t.print} autoPrint={autoPrint} />
        </div>
      </div>

      <article
        dir={dir}
        className="cv-sheet cv-trainer max-w-[820px] mx-auto bg-white text-[#1a1d29] rounded-xl print:rounded-none shadow-2xl print:shadow-none overflow-hidden"
      >
        <header className="bg-[#0B0E14] text-white px-9 py-5">
          <h1 className="text-[26px] font-bold tracking-tight text-[#D8BC79]">{profile.fullName}</h1>
          <p className="mt-1.5 text-white/75 text-[13px] leading-relaxed">{t.role}</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[11.5px] text-white/70">
            <a href={`tel:${profile.phoneIntl}`} dir="ltr" className="hover:text-[#D8BC79] transition-colors">{profile.phone}</a>
            <a href={`mailto:${profile.email}`} dir="ltr" className="hover:text-[#D8BC79] transition-colors">{profile.email}</a>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" dir="ltr" className="hover:text-[#D8BC79] transition-colors">
              linkedin.com/in/ahmed-mahmoud-95aa1b2a5
            </a>
            <span>{profile.location}</span>
          </div>
        </header>

        <div className="cv-body px-9 py-4 space-y-[10px]">
          <Section title={t.summaryTitle}>
            <p className="text-[12.5px] leading-[1.75] text-[#3a3f52]">{t.summary}</p>
          </Section>

          <Section title={t.domainsTitle}>
            <div className="flex flex-wrap gap-1.5">
              {t.domains.map((d) => (
                <Chip key={d}>{d}</Chip>
              ))}
            </div>
          </Section>

          <Section title={t.recordTitle}>
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <h3 className="font-bold text-[13.5px] text-[#0B0E14]">{t.recordOrg}</h3>
              <span className="text-[11px] text-[#8a6d2f]">{t.recordPeriod}</span>
            </div>
            <ul className="mt-2 space-y-1">
              {t.record.map((r) => (
                <li key={r} className="text-[12.5px] leading-[1.7] text-[#3a3f52] flex gap-2">
                  <span className="text-[#B08D45] mt-[7px] text-[7px] shrink-0">●</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title={t.programmeTitle}>
            <p className="text-[11px] text-[#8a6d2f] mb-1.5">{t.programmeMeta}</p>
            <ul className="space-y-1">
              {t.programme.map((w) => (
                <li key={w.w} className="text-[12.5px] leading-[1.7] text-[#3a3f52]">
                  <span className="font-bold text-[#0B0E14]">{w.w} — </span>
                  {w.line}
                </li>
              ))}
            </ul>
          </Section>

          <div className="grid sm:grid-cols-2 gap-x-7 gap-y-[10px]">
            <Section title={t.materialsTitle}>
              <ul className="space-y-1">
                {t.materials.map((m) => (
                  <li key={m} className="text-[12px] leading-[1.6] text-[#3a3f52] flex gap-2">
                    <span className="text-[#B08D45] mt-[6px] text-[6px] shrink-0">●</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <div className="space-y-[10px]">
              <Section title={t.qualsTitle}>
                <ul className="space-y-1.5">
                  {t.quals.map((q) => (
                    <li key={q.t} className="text-[12px]">
                      <p className="font-bold text-[#0B0E14] leading-snug">{q.t}</p>
                      <p className="text-[10.5px] text-[#6b7185]">{q.m}</p>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title={t.langsTitle}>
                <ul className="space-y-1">
                  {langs.map((l) => (
                    <li key={l.name} className="text-[12px] flex justify-between">
                      <span>{l.name}</span>
                      <span className="text-[#6b7185]">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            </div>
          </div>

          {/* ⚠ القسمان جنباً إلى جنب لا مُكدَّسَين: كلاهما نثرٌ قصير، وتكديسهما
              كان يدفع الأخير إلى صفحةٍ ثانية (مقيس). والثاني سطرٌ واحد لأنّ
              مصداقيةُ المحتوى من ممارسةٍ قائمة، لا قسمُ خبرةٍ يُزاحم التدريب. */}
          <div className="grid sm:grid-cols-2 gap-x-7 gap-y-[10px]">
            <Section title={t.methodTitle}>
              <p className="text-[12px] leading-[1.75] text-[#3a3f52]">{t.method}</p>
            </Section>
            <Section title={t.practiceTitle}>
              <p className="text-[12px] leading-[1.75] text-[#3a3f52]">{t.practice}</p>
            </Section>
          </div>
        </div>
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="break-inside-avoid">
      <h2 className="text-[12px] font-bold uppercase tracking-[0.09em] text-[#0B0E14] border-s-[3px] border-[#B08D45] ps-2.5 mb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] px-2 py-0.5 rounded border border-[#ded2b0] bg-[#f7f2e6] text-[#5a4a22]">{children}</span>
  );
}
