import { getContent, type Lang } from "@/data/content";
import PrintButton from "@/components/PrintButton";

/**
 * السيرة الذاتية — صفحة واحدة.
 *
 * بُنيت على ملاحظات مراجعة JobLeads:
 * · ملخّص مهنيّ من ٥٠ إلى ١٠٠ كلمة في الصدر (`profile.cvSummary`) بدل السرد
 *   الطويل الذي يخدم الموقع والشات بوت لا مسؤولَ التوظيف.
 * · قسم مهاراتٍ واحدٌ من أربع عشرة مهارةً مستهدَفة (`cvSkills`) — غيابه يضرّ
 *   بظهور السيرة في أنظمة تتبّع المتقدّمين (ATS).
 * · خطٌّ واحد بوزنَين (عاديّ وعريض): التسلسل بالحجم لا بتبديل نوع الخط.
 *   وكلّ وزنٍ إضافيّ يُضمَّن في ملفّ PDF خطّاً عربياً كاملاً — نحو ٤٠٠ كيلوبايت.
 * · لونان: نصٌّ داكن ولون إبراز واحد.
 * · المدينة في بيانات التواصل بلا عنوان سكنٍ تفصيليّ.
 * · صفحة واحدة: الخبرة بخمسة بنود، والدورات أربعٌ متّصلةٌ بالوظيفة في سطر.
 */
export default async function CvPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string; print?: string; full?: string }>;
}) {
  const sp = await searchParams;
  const lang: Lang = sp.lang === "en" ? "en" : "ar";
  const autoPrint = sp.print === "1";
  // ‎?full=1 يعرض الخبرة كاملةً لمن يريد النسخة المطوّلة
  const full = sp.full === "1";
  const c = getContent(lang);
  const { profile, experience, cvSkills, certifications, courses, languages, keyProjects, ui } = c;
  const dir = ui.dir;

  // بندان في الخبرة يكرّران مشروعَين مذكورَين في «أبرز المشاريع» أسفلهما
  // (منصّة الوسط ونظام الشمال)، فيُستبعدان من السيرة المختصرة: التكرار يأكل
  // صفحةً ولا يضيف معلومة.
  const DUPLICATED = /34 شاشة|قطاع الشمال|thirty-four|Northern sector/i;
  const duties = full
    ? experience.duties
    : experience.duties.filter((d) => !DUPLICATED.test(d)).slice(0, 4);

  // الدورات المتّصلة بالوظيفة المستهدَفة وحدها — مبدأ المراجعة نفسه المطبَّق على
  // المهارات: ما يخدم الوظيفة لا كلّ ما دُرِس. وسبعُ دوراتٍ كاملةً تدفع القسم
  // إلى صفحةٍ ثانية بلا مقابل.
  // الترتيب بالصلة بالوظيفة المستهدَفة: Power BI ثمّ التحليل ثمّ الأتمتة.
  // بلا ترتيبٍ صريح تفوز الدورة الأسبق في المصفوفة لا الأوثق صلة.
  const rank = (t: string) =>
    /Power BI/.test(t) ? 0 : /تحليل|Analytics/.test(t) ? 1 : /أتمتة|Automation/.test(t) ? 2 : 9;
  // مشروعان في السيرة المختصرة: المنصّتان المؤسسيّتان اللتان تُثبتان التسليم
  // على نطاقٍ حقيقيّ. والثالث (منهج Power BI) في النسخة المطوّلة وعلى الموقع.
  const cvCourses = full
    ? courses
    : [...courses].filter((co) => rank(co.topic) < 9).sort((a, b) => rank(a.topic) - rank(b.topic)).slice(0, 4);

  return (
    <div className="cv-root min-h-screen print:min-h-0 bg-[#11161F] py-8 px-4 print:p-0 print:bg-white" dir={dir}>
      <div className="no-print max-w-[820px] mx-auto mb-5 flex items-center justify-between">
        <a href={lang === "en" ? "/en" : "/"} className="text-sm text-gold hover:underline">
          {ui.cv.back}
        </a>
        <div className="flex items-center gap-2">
          <a href={lang === "en" ? "/cv" : "/cv?lang=en"} className="text-xs px-3 py-2 rounded-full border border-gold/30 text-gold">
            {ui.toggle}
          </a>
          <PrintButton label={ui.cv.print} autoPrint={autoPrint} />
        </div>
      </div>

      <article dir={dir} className="cv-sheet max-w-[820px] mx-auto bg-white text-[#1a1d29] rounded-xl print:rounded-none shadow-2xl print:shadow-none overflow-hidden">
        {/* الترويسة: الاسم واللقب وبيانات التواصل — المدينة دون عنوانٍ تفصيليّ */}
        <header className="bg-[#0B0E14] text-white px-9 py-6">
          <h1 className="text-[26px] font-bold tracking-tight text-[#D8BC79]">{profile.fullName}</h1>
          <p className="mt-1.5 text-white/75 text-[13px] leading-relaxed">{profile.title}</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[11.5px] text-white/70">
            <a href={`tel:${profile.phoneIntl}`} dir="ltr" className="hover:text-[#D8BC79] transition-colors">{profile.phone}</a>
            <a href={`mailto:${profile.email}`} dir="ltr" className="hover:text-[#D8BC79] transition-colors">{profile.email}</a>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" dir="ltr" className="hover:text-[#D8BC79] transition-colors">linkedin.com/in/ahmed-mahmoud-95aa1b2a5</a>
            <span>{profile.location}</span>
          </div>
        </header>

        <div className="px-9 py-6 space-y-5">
          <Section title={ui.cv.summary}>
            <p className="text-[12.5px] leading-[1.75] text-[#3a3f52]">{profile.cvSummary}</p>
          </Section>

          {/* المهارات قبل الخبرة: أوّل ما يمسحه ATS وأوّل ما تقع عليه العين */}
          <Section title={ui.cv.skills}>
            <div className="flex flex-wrap gap-1.5">
              {cvSkills.map((s) => <Chip key={s}>{s}</Chip>)}
            </div>
          </Section>

          <Section title={ui.cv.experience}>
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <h3 className="font-bold text-[13.5px] text-[#0B0E14]">{experience.role} — {experience.org}</h3>
              <span className="text-[11px] text-[#8a6d2f]">{experience.period}</span>
            </div>
            <ul className="mt-2 space-y-1">
              {duties.map((d) => (
                <li key={d} className="text-[12.5px] leading-[1.7] text-[#3a3f52] flex gap-2">
                  <span className="text-[#B08D45] mt-[7px] text-[7px] shrink-0">●</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title={ui.cv.projects}>
            <ul className="space-y-2.5">
              {(full ? keyProjects : keyProjects.slice(0, 2)).map((pr) => (
                <li key={pr.name} className="break-inside-avoid">
                  <div className="flex items-baseline justify-between flex-wrap gap-x-3">
                    <h3 className="font-bold text-[#0B0E14] text-[12.5px] leading-snug">{pr.name}</h3>
                    <span className="text-[10.5px] text-[#8a6d2f]">{pr.org}</span>
                  </div>
                  <p className="mt-0.5 text-[12.5px] text-[#3a3f52] leading-[1.7]">{pr.line}</p>
                  <p className="mt-0.5 text-[10.5px] text-[#9095a8]" dir="ltr">{pr.stack}</p>
                </li>
              ))}
            </ul>
          </Section>

          <div className="grid sm:grid-cols-2 gap-x-7 gap-y-5">
            <Section title={ui.cv.certs}>
              <ul className="space-y-1.5">
                {certifications.map((cert) => (
                  <li key={cert.title} className="text-[12.5px]">
                    <p className="font-bold text-[#0B0E14] leading-snug">{cert.title}</p>
                    <p className="text-[11px] text-[#6b7185]">{cert.issuer}</p>
                  </li>
                ))}
              </ul>
            </Section>
            <Section title={ui.cv.languages}>
              <ul className="space-y-1">
                {languages.map((l) => (
                  <li key={l.name} className="text-[12.5px] flex justify-between">
                    <span>{l.name}</span>
                    <span className="text-[#6b7185]">{l.level}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          {/* الدورات في النسخة المطوّلة وحدها (‎?full=1).
              مبدأ المراجعة نفسه المطبَّق على المهارات: ما يخدم الوظيفة لا كلّ ما دُرِس.
              وقسم الشهادات يحمل ما يهمّ فعلاً — CAPM® وخبير Power BI — أمّا عناوين
              الدورات فلا تضيف لأنظمة ATS شيئاً ليس في قسم المهارات أصلاً.
              وهي كاملةً في قسم «الشهادات والدورات» على الموقع. */}
          {full && (
            <Section title={ui.cv.courses}>
              <p className="text-[11.5px] leading-[1.9] text-[#3a3f52]">
                {cvCourses.map((co) => co.title).join(" · ")}
              </p>
            </Section>
          )}
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
