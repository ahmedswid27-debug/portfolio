import { getFolio, type Lang } from "@/data/folio";
import HtmlLang from "@/components/HtmlLang";
import ScrollProgress from "@/components/ScrollProgress";
import Reveal from "./Reveal";

/** الإطار المشترك للرئيسية ودراسات الحالة، بالشريط الرفيع نفسه في صفحة الورش. */
export default function FolioShell({ lang, onHome, otherHref, children }: { lang: Lang; onHome?: boolean; otherHref?: string; children: React.ReactNode }) {
  const s = getFolio(lang);
  const en = lang === "en";
  const home = en ? "/en" : "/";
  return (
    <div dir={s.dir} lang={s.lang} className="fo min-h-screen">
      <HtmlLang lang={s.lang} dir={s.dir} />
      <ScrollProgress />
      <Reveal />
      <a href="#main" className="fo-skip">{en ? "Skip to content" : "الانتقال إلى المحتوى"}</a>
      <header className="sticky top-0 z-50 bg-ink/92 backdrop-blur border-b border-gold/12">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 h-14 flex items-center gap-4">
          <a href={home} className="inline-flex items-center min-h-11 font-display font-bold text-[15px] text-gold whitespace-nowrap">{s.hero.name}</a>
          <nav aria-label={en ? "Sections" : "الأقسام"} className="hidden xl:flex items-center gap-6 ms-auto text-[13px] text-white/70">
            {s.nav.map((n) => (
              <a key={n.id} href={onHome ? `#${n.id}` : `${home}#${n.id}`} className="hover:text-gold transition-colors">{n.label}</a>
            ))}
          </nav>
          <div className="ms-auto xl:ms-4 flex items-center gap-2 shrink-0">
            <a href={otherHref ?? s.other.href} hrefLang={en ? "ar" : "en"} className="inline-flex items-center justify-center min-h-11 min-w-11 text-[12px] font-bold px-3 rounded-full border border-gold/30 text-gold hover:bg-gold/[0.08] transition-colors">
              {s.other.label}
            </a>
            <a href={s.cv.href} download className="inline-flex items-center min-h-11 text-[13px] font-bold px-4 rounded-full bg-gold text-ink hover:bg-gold2 transition-colors">{s.cv.label}</a>
          </div>
        </div>
      </header>
      {children}
      <footer className="mx-auto max-w-6xl px-6 sm:px-10 py-8 text-[13px] text-white/50 border-t border-gold/12">{s.footer}</footer>
    </div>
  );
}
