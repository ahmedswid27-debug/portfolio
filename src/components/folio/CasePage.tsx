import Image from "next/image";
import { getCase, getCases, type Block } from "@/data/cases";
import type { Lang } from "@/data/folio";
import Code from "./Code";
import EvmCalc from "./EvmCalc";
import FolioShell from "./FolioShell";

const T = {
  ar: { back: "دراسات الحالة", notice: "الأرقام والأمثلة توضيحية.", next: "الدراسة التالية", fact: "جدول الحقائق", dim: "بعد" },
  en: { back: "Case studies", notice: "Figures and examples are illustrative.", next: "Next case study", fact: "Fact table", dim: "Dimension" },
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
    <div className="fo-model" role="img" aria-label={`${t.fact} ${b.fact.name}, ${b.dims.map((d) => d.name).join(", ")}`}>
      <div className="fo-model-dims"><Table name={b.dims[0].name} cols={b.dims[0].cols} tag={t.dim} /><Table name={b.dims[1].name} cols={b.dims[1].cols} tag={t.dim} /></div>
      <div className="fo-model-fact"><Table name={b.fact.name} cols={b.fact.cols} tag={t.fact} fact /></div>
      <div className="fo-model-dims"><Table name={b.dims[2].name} cols={b.dims[2].cols} tag={t.dim} /><Table name={b.dims[3].name} cols={b.dims[3].cols} tag={t.dim} /></div>
    </div>
  );
}

function Render({ b, lang }: { b: Block; lang: Lang }) {
  switch (b.kind) {
    case "text":
      return <>{b.body.map((p, i) => <p key={i} className="text-[15px] sm:text-[16px] text-white/80 leading-loose max-w-3xl">{p}</p>)}</>;
    case "compare":
      return (
        <div className="grid md:grid-cols-2 gap-4">
          {[b.before, b.after].map((c, k) => (
            <div key={c.title} className="card-gold rounded-2xl p-5">
              <h3 className={`font-display font-bold text-[15px] ${k ? "text-gold" : "text-white/70"}`}>{c.title}</h3>
              <ul className="mt-2.5 grid gap-1.5 text-[14px] text-white/78 leading-relaxed">
                {c.items.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
          ))}
        </div>
      );
    case "code":
      return <Code code={b.code} lang={b.lang} />;
    case "model":
      return <Model b={b} lang={lang} />;
    case "steps":
      return (
        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {b.items.map((x, i) => (
            <li key={x.t} className="card-gold rounded-2xl p-5">
              <span className="font-mono text-xs text-gold/60" dir="ltr">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-1.5 font-display font-bold text-[16px] text-white/95">{x.t}</h3>
              <p className="mt-1 text-[13.5px] text-white/68 leading-relaxed">{x.d}</p>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="overflow-x-auto card-gold rounded-2xl">
          <table className="fo-data">
            <thead><tr>{b.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>{b.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}><bdi>{c}</bdi></td>)}</tr>)}</tbody>
          </table>
        </div>
      );
    case "calc":
      return <><p className="text-[14px] text-gold/90 mb-3">{b.body}</p><EvmCalc lang={lang} /></>;
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
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src={c.image} alt="" fill priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/70 to-ink" />
          <div className="absolute inset-0 rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-ink via-ink/65 to-ink/10" />
        </div>
        <div className="mx-auto max-w-6xl px-6 sm:px-10 pt-12 pb-14 sm:pt-16 sm:pb-20">
          <a href={`${base || "/"}#cases`} className="inline-flex items-center min-h-11 text-[13px] text-gold/90 hover:text-gold transition-colors">{t.back}</a>
          <span className="block mt-2"><span className="inline-block text-[12px] tracking-wider px-3 py-1 rounded-full bg-gold/12 border border-gold/30 text-gold">{c.tag}</span></span>
          <h1 className="mt-5 font-display font-black leading-[1.34] pb-1 text-[30px] sm:text-[42px] lg:text-[50px] max-w-4xl text-gold-shine">{c.title}</h1>
          <p className="mt-3 max-w-3xl text-[16px] sm:text-[18px] text-white/82 leading-loose">{c.question}</p>
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {c.tools.map((x) => <li key={x} className="fo-tag" dir="ltr">{x}</li>)}
          </ul>
        </div>
      </section>

      <main id="main" className="mx-auto max-w-6xl px-6 sm:px-10">
        {c.blocks.map((b, i) => (
          <section key={i} data-reveal className="pt-10 sm:pt-14">
            <h2 className="fo-sub">{b.h}</h2>
            <Render b={b} lang={lang} />
          </section>
        ))}

        <section className="pt-10 sm:pt-14">
          <h2 className="fo-sub">{c.outcomeTitle}</h2>
          <ul className="card-gold rounded-2xl divide-y divide-gold/10">
            {c.outcome.map((x) => <li key={x} className="px-5 py-3 text-[14.5px] text-white/82">{x}</li>)}
          </ul>
          <p className="fo-small mt-3">{t.notice}</p>
        </section>

        <nav className="py-12" aria-label={t.next}>
          <a href={`${base}/work/${next.slug}`} className="block card-gold rounded-2xl p-6">
            <span className="block text-[12.5px] text-gold/85">{t.next}</span>
            <span className="block mt-1 font-display font-bold text-[22px] text-white/95">{next.title}</span>
          </a>
        </nav>
      </main>
    </FolioShell>
  );
}
