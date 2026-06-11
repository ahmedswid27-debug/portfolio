import { getContent, type Lang } from "@/data/content";
import PrintButton from "@/components/PrintButton";

export default async function CvPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string; print?: string }>;
}) {
  const sp = await searchParams;
  const lang: Lang = sp.lang === "en" ? "en" : "ar";
  const autoPrint = sp.print === "1";
  const c = getContent(lang);
  const { profile, experience, skills, certifications, courses, languages, ui } = c;
  const dir = ui.dir;

  return (
    <div className="cv-root min-h-screen bg-[#11161F] py-8 px-4 print:p-0 print:bg-white" dir={dir}>
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
        <header className="bg-[#0B0E14] text-white px-10 py-8">
          <h1 className="font-display text-3xl font-extrabold text-gold-grad">{profile.fullName}</h1>
          <p className="mt-2 text-white/75 text-sm leading-relaxed">{profile.title}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-white/70">
            <span dir="ltr">📞 {profile.phone}</span>
            <span dir="ltr">✉️ {profile.email}</span>
            <span dir="ltr">🔗 linkedin.com/in/ahmed-mahmoud-95aa1b2a5</span>
            <span>📍 {profile.location}</span>
          </div>
        </header>

        <div className="px-10 py-8 space-y-7">
          <Section title={ui.cv.summary}>
            <p className="text-sm leading-relaxed text-[#3a3f52]">{profile.summary}</p>
          </Section>

          <Section title={ui.cv.experience}>
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <h3 className="font-bold text-[#0B0E14]">{experience.role} — {experience.org}</h3>
              <span className="text-xs text-[#8a6d2f]">{experience.period}</span>
            </div>
            <ul className="mt-3 space-y-1.5">
              {experience.duties.map((d) => (
                <li key={d} className="text-sm text-[#3a3f52] flex gap-2">
                  <span className="text-gold mt-1 text-[10px]">●</span>
                  {d}
                </li>
              ))}
            </ul>
          </Section>

          <Section title={ui.cv.skills}>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <p className="text-xs font-bold text-[#8a6d2f] mb-2">{ui.cv.core}</p>
                <div className="flex flex-wrap gap-1.5">{skills.core.map((s) => <Chip key={s}>{s}</Chip>)}</div>
              </div>
              <div>
                <p className="text-xs font-bold text-[#8a6d2f] mb-2">{ui.cv.tech}</p>
                <div className="flex flex-wrap gap-1.5">{skills.technical.map((s) => <Chip key={s}>{s}</Chip>)}</div>
              </div>
            </div>
          </Section>

          <div className="grid sm:grid-cols-2 gap-7">
            <Section title={ui.cv.certs}>
              <ul className="space-y-2">
                {certifications.map((cert) => (
                  <li key={cert.title} className="text-sm">
                    <p className="font-bold text-[#0B0E14] leading-snug">{cert.title}</p>
                    <p className="text-xs text-[#6b7185]">{cert.issuer}</p>
                  </li>
                ))}
              </ul>
            </Section>
            <Section title={ui.cv.languages}>
              <ul className="space-y-1.5">
                {languages.map((l) => (
                  <li key={l.name} className="text-sm flex justify-between">
                    <span className="font-medium">{l.name}</span>
                    <span className="text-[#6b7185]">{l.level}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <Section title={ui.cv.courses}>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {courses.map((co) => (
                <li key={co.title} className="text-sm text-[#3a3f52] flex gap-2">
                  <span className="text-gold mt-1 text-[10px]">●</span>
                  <span>{co.title}<span className="text-[#9095a8] text-xs"> — {co.issuer}</span></span>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-base font-bold text-[#0B0E14] border-s-4 border-gold ps-3 mb-3">{title}</h2>
      {children}
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] px-2.5 py-1 rounded-md bg-[#f3eede] border border-[#e0d3ab] text-[#5a4a22]">{children}</span>
  );
}
