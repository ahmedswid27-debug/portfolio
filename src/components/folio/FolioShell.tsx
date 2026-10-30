import { getFolio, type Lang } from "@/data/folio";
import HtmlLang from "@/components/HtmlLang";
import Reveal from "./Reveal";

/** الإطار المشترك بين الرئيسية وصفحات دراسات الحالة: الشريط العلوي والتذييل. */
export default function FolioShell({ lang, onHome, otherHref, children }: { lang: Lang; onHome?: boolean; otherHref?: string; children: React.ReactNode }) {
  const s = getFolio(lang);
  const en = lang === "en";
  const home = en ? "/en" : "/";
  const other = otherHref ?? s.other.href;
  return (
    <div dir={s.dir} lang={s.lang} className="fo relative z-[2] min-h-screen">
      <HtmlLang lang={s.lang} dir={s.dir} />
      <Reveal />
      <a href="#main" className="fo-skip">{en ? "Skip to content" : "انتقل إلى المحتوى"}</a>
      <header className="fo-top">
        <div className="fo-wrap flex items-center justify-between h-16 gap-4">
          <a href={home} className="fo-latin whitespace-nowrap min-h-11 inline-flex items-center" dir="ltr" aria-label={s.profile.name}>
            AHMED SWID
          </a>
          <nav aria-label={en ? "Sections" : "الأقسام"} className="hidden lg:flex items-center gap-7 text-[15px] font-semibold">
            {s.nav.map((n) => (
              <a key={n.id} href={onHome ? `#${n.id}` : `${home}#${n.id}`} className="fo-link">{n.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <a href={other} hrefLang={en ? "ar" : "en"} className="fo-link text-[15px] font-semibold min-h-11 inline-flex items-center px-2">
              {s.other.label}
            </a>
            <a href={s.cv.href} download className="fo-btn fo-btn-ink min-h-11 px-4 text-[15px]">{s.cv.label}</a>
          </div>
        </div>
      </header>
      {children}
      <footer className="fo-wrap py-8 text-[14px] border-t" style={{ borderColor: "var(--line)", color: "var(--muted)" }}>
        {s.footer}
      </footer>
    </div>
  );
}
