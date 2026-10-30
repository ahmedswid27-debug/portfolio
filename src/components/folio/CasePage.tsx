import { getCase, getCases, type Block } from "@/data/cases";
import type { Lang } from "@/data/folio";
import Code from "./Code";
import EvmCalc from "./EvmCalc";
import FolioShell from "./FolioShell";

const T = {
  ar: { back: "كل دراسات الحالة", q: "السؤال", tools: "الأدوات", notice: "الأرقام والأسماء والأمثلة في هذه الصفحة توضيحية ومولدة، ولا تمثل بيانات أي جهة. المنهج والأخطاء والدروس من خبرتي الفعلية.", next: "الدراسة التالية", fact: "جدول الحقائق", dim: "بعد", rel: "علاقة واحد إلى متعدد" },
  en: { back: "All case studies", q: "The question", tools: "Tools", notice: "Figures, names and examples on this page are generated and illustrative, and represent no organisation's data. The method, mistakes and lessons are from my actual work.", next: "Next case study", fact: "Fact table", dim: "Dimension", rel: "One-to-many relationship" },
};

function Table({ name, cols, tag, fact }: { name: string; cols: string[]; tag: string; fact?: boolean }) {
  return (
    <div className={`fo-tbl ${fact ? "is-fact" : ""}`}>
      <p className="fo-tbl-tag">{tag}</p>
      <p className="fo-tbl-name" dir="ltr">{name}</p>
      <ul dir="ltr">{cols.map((c) => <li key={c}>{c}</li>)}</ul>
    </div>
  );
}

function Model({ b, lang }: { b: Extract<Block, { kind: "model" }>; lang: Lang }) {
  const t = T[lang];
  return (
    <>
      <div className="fo-model" role="img" aria-label={`${t.fact} ${b.fact.name}, ${b.dims.map((d) => d.name).join(", ")}`}>
        <div className="fo-model-dims"><Table name={b.dims[0].name} cols={b.dims[0].cols} tag={t.dim} /><Table name={b.dims[1].name} cols={b.dims[1].cols} tag={t.dim} /></div>
        <div className="fo-model-fact"><Table name={b.fact.name} cols={b.fact.cols} tag={t.fact} fact /></div>
        <div className="fo-model-dims"><Table name={b.dims[2].name} cols={b.dims[2].cols} tag={t.dim} /><Table name={b.dims[3].name} cols={b.dims[3].cols} tag={t.dim} /></div>
      </div>
      <p className="fo-small mt-3">{t.rel}. {b.note}</p>
    </>
  );
}

function Render({ b, lang }: { b: Block; lang: Lang }) {
  switch (b.kind) {
    case "text":
      return <>{b.body.map((p, i) => <p key={i} className={`fo-lede ${i ? "mt-4" : ""}`}>{p}</p>)}</>;
    case "compare":
      return (
        <div className="grid md:grid-cols-2 gap-4">
          {[{ c: b.before, on: false }, { c: b.after, on: true }].map(({ c, on }) => (
            <div key={c.title} className={on ? "fo-panel p-6" : "p-6 border"} style={on ? undefined : { borderColor: "var(--line)" }}>
              <h3 className="text-[18px] font-extrabold">{c.title}</h3>
              <ul className="mt-3 grid gap-2 text-[16px] leading-relaxed" style={{ color: "var(--navy)" }}>
                {c.items.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
          ))}
        </div>
      );
    case "code":
      return <><Code code={b.code} lang={b.lang} />{b.note && <p className="fo-small mt-3 max-w-3xl">{b.note}</p>}</>;
    case "model":
      return <Model b={b} lang={lang} />;
    case "steps":
      return <ol className="fo-points">{b.items.map((x) => <li key={x.t}><div><b className="font-extrabold">{x.t}</b><span className="block mt-1">{x.d}</span></div></li>)}</ol>;
    case "table":
      return (
        <>
          <div className="overflow-x-auto">
            <table className="fo-data">
              <thead><tr>{b.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>{b.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}><bdi>{c}</bdi></td>)}</tr>)}</tbody>
            </table>
          </div>
          {b.note && <p className="fo-small mt-3">{b.note}</p>}
        </>
      );
    case "calc":
      return <><p className="fo-lede">{b.body}</p><div className="mt-5"><EvmCalc lang={lang} /></div></>;
  }
}

export default function CasePage({ lang, slug }: { lang: Lang; slug: string }) {
  const c = getCase(lang, slug)!;
  const t = T[lang];
  const list = getCases(lang);
  const next = list[(list.findIndex((x) => x.slug === slug) + 1) % list.length];
  const base = lang === "en" ? "/en" : "";
  return (
    <FolioShell lang={lang} otherHref={`${lang === "en" ? "" : "/en"}/work/${slug}`}>
      <main id="main">
        <article>
          <header className="fo-wrap pt-10 md:pt-16">
            <a href={`${base || "/"}#cases`} className="fo-link text-[15px] font-bold min-h-11 inline-flex items-center">{t.back}</a>
            <p className="fo-label mt-4">{c.tag}</p>
            <h1 className="fo-h2 mt-2" style={{ fontSize: "clamp(34px, 5vw, 60px)" }}>{c.title}</h1>
            <div className="fo-panel p-6 md:p-8 mt-8 max-w-4xl">
              <p className="fo-board-h">{t.q}</p>
              <p className="mt-2 text-[20px] md:text-[24px] font-extrabold leading-relaxed">{c.question}</p>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label={t.tools}>
              {c.tools.map((x) => <li key={x} className="fo-tag" dir="ltr">{x}</li>)}
            </ul>
          </header>

          {c.blocks.map((b, i) => (
            <section key={i} className="fo-wrap pt-14 md:pt-20">
              <div data-reveal>
                <h2 className="text-[24px] md:text-[30px] font-extrabold leading-snug mb-5">{b.h}</h2>
                <Render b={b} lang={lang} />
              </div>
            </section>
          ))}

          <section className="fo-wrap pt-14 md:pt-20">
            <h2 className="text-[24px] md:text-[30px] font-extrabold mb-5">{c.outcomeTitle}</h2>
            <ol className="fo-points">{c.outcome.map((x) => <li key={x}>{x}</li>)}</ol>
            <p className="fo-small mt-8 max-w-3xl">{t.notice}</p>
          </section>

          <nav className="fo-wrap py-14 md:py-20" aria-label={t.next}>
            <a href={`${base}/work/${next.slug}`} className="fo-next">
              <span className="fo-label">{t.next}</span>
              <span className="block mt-1 text-[24px] md:text-[32px] font-extrabold leading-snug">{next.title}</span>
            </a>
          </nav>
        </article>
      </main>
    </FolioShell>
  );
}
