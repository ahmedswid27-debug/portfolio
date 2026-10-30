"use client";

import { useMemo, useState } from "react";
import { byDim, CAUSES, DAX, LAST, measures, monthly, SEVS, ZONES, type Filter, type MeasureId } from "@/data/demo";
import type { Lang } from "@/data/folio";
import Code from "./Code";

/**
 * لوحة تفاعلية بسلوك Power BI: كل ضغطة تغير سياق الفلتر فتعاد القياسات كلها.
 * الرسوم بلا مكتبة، وشريط الأعمدة أزرار حقيقية تعمل بلوحة المفاتيح والقارئ الصوتي.
 * لونا الرسم على الخلفية الداكنة اجتازا فحص التمييز.
 */
const CUR = "#B38A3A";
const PREV = "#3A97D3";
const T = {
  ar: {
    notice: "بيانات توضيحية",
    all: "الكل",
    reset: "مسح الفلاتر",
    year: "السنة",
    sev: "الأهمية",
    kpi: { yoy: "البلاغات", faults: "الأعطال", onTime: "الالتزام", csat: "الرضا" },
    sub: { yoy: "عن العام الماضي", faults: (x: string) => `${x} بلاغ لكل عطل`, onTime: "من المغلقة", csat: "ممن قيموا" },
    trend: "الاتجاه الشهري",
    cause: "السبب",
    zone: "النطاق",
    month: "الشهر",
    table: "عرض الجدول",
    context: "سياق الفلتر",
    result: "النتيجة",
    alt: "حساب خاطئ",
    altName: { yoy: "مقابل سنة كاملة", faults: "عد الصفوف", onTime: "من كل البلاغات", csat: "مع غير المقيمين" },
    rightName: { yoy: "الأشهر نفسها", faults: "أعطال فعلية", onTime: "من المغلقة", csat: "ممن قيموا" },
    empty: "لا بيانات",
  },
  en: {
    notice: "Illustrative data",
    all: "All",
    reset: "Clear filters",
    year: "Year",
    sev: "Severity",
    kpi: { yoy: "Reports", faults: "Faults", onTime: "On time", csat: "Satisfaction" },
    sub: { yoy: "vs last year", faults: (x: string) => `${x} reports per fault`, onTime: "of closed", csat: "of those who rated" },
    trend: "Monthly trend",
    cause: "Cause",
    zone: "Zone",
    month: "Month",
    table: "Show table",
    context: "Filter context",
    result: "Result",
    alt: "Wrong calculation",
    altName: { yoy: "vs a full year", faults: "Row count", onTime: "of all reports", csat: "with unrated" },
    rightName: { yoy: "Same months", faults: "Actual faults", onTime: "of closed", csat: "of those who rated" },
    empty: "No data",
  },
};

const iso = (s: string) => `\u2066${s}\u2069`; // عزل الرقم عن الجملة العربية، وإلا قرئ +12% مقلوبا
const fmtN = (n: number) => n.toLocaleString("en-US");
const fmtP = (x: number | null, signed = false) =>
  x === null ? "—" : `${signed && x > 0 ? "+" : ""}${(x * 100).toFixed(1)}%`;

function Trend({ cur, prev, year, lang }: { cur: number[]; prev: number[]; year: number; lang: Lang }) {
  const [hover, setHover] = useState<number | null>(null);
  const t = T[lang];
  const W = 640, H = 236, L = 34, R = 44, Tp = 16, B = 26;
  const lastCur = year === LAST.y ? LAST.m : 12;
  const max = Math.max(4, ...cur, ...prev);
  const top = Math.ceil(max / 4) * 4; // من مضاعفات 4: منتصف المحور عدد صحيح
  const x = (i: number) => L + (i * (W - L - R)) / 11;
  const y = (v: number) => Tp + (1 - v / top) * (H - Tp - B);
  const path = (a: number[], n: number) => a.slice(0, n).map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const ticks = [0, top / 2, top];
  const hasPrev = prev.some((v) => v > 0);
  return (
    <div className="relative">
      {/* svg بلا اتجاه عربي: مرساة النص تنقلب تحت rtl، والزمن يسير من اليسار إلى اليمين */}
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto" style={{ direction: "ltr" }} role="img" aria-label={t.trend} onMouseLeave={() => setHover(null)}>
        {ticks.map((v) => (
          <g key={v}>
            <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="var(--line)" />
            <text x={L - 8} y={y(v) + 4} textAnchor="end" fontSize="12" fill="var(--muted)">{v}</text>
          </g>
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <text key={i} x={x(i)} y={H - 7} textAnchor="middle" fontSize="12" fill={hover === i ? "#fff" : "var(--muted)"}>{i + 1}</text>
        ))}
        {hasPrev && <path d={path(prev, 12)} fill="none" stroke={PREV} strokeWidth="2" strokeDasharray="5 4" strokeLinejoin="round" />}
        <path d={path(cur, lastCur)} fill="none" stroke={CUR} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {hasPrev && <text x={x(11) + 7} y={y(prev[11]) + 4} fontSize="12" fontWeight="700" fill="var(--muted)">{year - 1}</text>}
        <text x={x(lastCur - 1) + 7} y={y(cur[lastCur - 1]) + 4} fontSize="12" fontWeight="700" fill="#fff">{year}</text>
        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={Tp} y2={H - B} stroke="var(--muted)" />
            {hover < lastCur && <circle cx={x(hover)} cy={y(cur[hover])} r="4.5" fill={CUR} stroke="#11161F" strokeWidth="2" />}
            {hasPrev && <circle cx={x(hover)} cy={y(prev[hover])} r="4" fill={PREV} stroke="#11161F" strokeWidth="2" />}
          </g>
        )}
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={x(i) - (W - L - R) / 22} y={0} width={(W - L - R) / 11} height={H} fill="transparent" onMouseEnter={() => setHover(i)} onTouchStart={() => setHover(i)} />
        ))}
      </svg>
      {hover !== null && (
        <div className="fo-tip" style={{ insetInlineStart: 8, top: 4 }}>
          <b>{t.month} {hover + 1}</b>
          {hover < lastCur && <span>{year}: {cur[hover]}</span>}
          {hasPrev && <span>{year - 1}: {prev[hover]}</span>}
        </div>
      )}
    </div>
  );
}

function Bars({ title, labels, values, active, onPick, empty }: { title: string; labels: string[]; values: number[]; active: number | null; onPick: (i: number) => void; empty: string }) {
  const order = values.map((v, i) => ({ v, i })).sort((a, b) => b.v - a.v);
  const max = Math.max(1, ...values);
  return (
    <div>
      <h4 className="fo-board-h">{title}</h4>
      {max === 1 && values.every((v) => v === 0) ? (
        <p className="fo-small mt-3">{empty}</p>
      ) : (
        <ul className="mt-2 grid gap-0.5">
          {order.map(({ v, i }) => (
            <li key={i}>
              <button type="button" aria-pressed={active === i} onClick={() => onPick(i)} className={`fo-bar ${active === i ? "is-on" : ""} ${active !== null && active !== i ? "is-off" : ""}`}>
                <span className="fo-bar-name">{labels[i]}</span>
                <span className="fo-bar-track"><span className="fo-bar-fill" style={{ width: `${(v / max) * 100}%` }} /></span>
                <span className="fo-bar-val" dir="ltr">{fmtN(v)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function LiveBoard({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [f, setF] = useState<Filter>({ year: 2026, zone: null, cause: null, sev: null });
  const [mId, setMId] = useState<MeasureId>("faults");

  const m = useMemo(() => measures(f), [f]);
  const line = useMemo(() => monthly(f), [f]);
  const causes = useMemo(() => byDim(f, "cause", CAUSES.ar.length), [f]);
  const zones = useMemo(() => byDim(f, "zone", ZONES.ar.length), [f]);
  const filtered = f.zone !== null || f.cause !== null || f.sev !== null;

  const tiles: { id: MeasureId; value: string; sub: string }[] = [
    { id: "yoy", value: fmtN(m.reports), sub: `${iso(fmtP(m.yoy.value, true))} ${t.sub.yoy}` },
    { id: "faults", value: fmtN(m.faults.value ?? 0), sub: t.sub.faults(iso((m.faults.extra ?? 0).toFixed(1))) },
    { id: "onTime", value: fmtP(m.onTime.value), sub: t.sub.onTime },
    { id: "csat", value: fmtP(m.csat.value), sub: t.sub.csat },
  ];

  const ctx = [
    `'Date'[Year]    = ${f.year}`,
    ...(f.zone !== null ? [`Reports[Zone]   = "${ZONES.en[f.zone]}"`] : []),
    ...(f.cause !== null ? [`Reports[Cause]  = "${CAUSES.en[f.cause]}"`] : []),
    ...(f.sev !== null ? [`Reports[Sev]    = "${SEVS.en[f.sev]}"`] : []),
  ];
  const fmt = (r: { value: number | null; naive: number | null }, f: (v: number | null) => string) => [f(r.value), f(r.naive)];
  const [right, wrong] =
    mId === "yoy" ? fmt(m.yoy, (v) => fmtP(v, true))
    : mId === "faults" ? fmt(m.faults, (v) => fmtN(v ?? 0))
    : mId === "onTime" ? fmt(m.onTime, (v) => fmtP(v))
    : fmt(m.csat, (v) => fmtP(v));

  return (
    <div className="fo-board">
      <div className="fo-board-bar">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <fieldset className="fo-seg">
            <legend className="sr-only">{t.year}</legend>
            {[2026, 2025].map((y) => (
              <button key={y} type="button" aria-pressed={f.year === y} onClick={() => setF({ ...f, year: y })} dir="ltr">{y}</button>
            ))}
          </fieldset>
          <fieldset className="fo-seg">
            <legend className="sr-only">{t.sev}</legend>
            <button type="button" aria-pressed={f.sev === null} onClick={() => setF({ ...f, sev: null })}>{t.all}</button>
            {SEVS[lang].map((s, i) => (
              <button key={s} type="button" aria-pressed={f.sev === i} onClick={() => setF({ ...f, sev: f.sev === i ? null : i })}>{s}</button>
            ))}
          </fieldset>
        </div>
        <div className="flex items-center gap-4">
          {filtered && (
            <button type="button" className="text-[13px] font-bold text-gold min-h-11" onClick={() => setF({ ...f, zone: null, cause: null, sev: null })}>{t.reset}</button>
          )}
          <span className="fo-notice">{t.notice}</span>
        </div>
      </div>

      <div className="fo-kpis">
        {tiles.map((k) => (
          <button key={k.id} type="button" aria-pressed={mId === k.id} onClick={() => setMId(k.id)} className="fo-kpi">
            <span className="fo-kpi-name">{t.kpi[k.id]}</span>
            <span className="fo-kpi-val" dir="ltr">{k.value}</span>
            <span className="fo-kpi-sub">{k.sub}</span>
          </button>
        ))}
      </div>

      <div className="fo-board-grid">
        <div className="fo-board-cell fo-cell-trend">
          <h4 className="fo-board-h">{t.trend}</h4>
          <Trend cur={line.cur} prev={line.prev} year={f.year} lang={lang} />
        </div>
        <div className="fo-board-cell">
          <Bars title={t.cause} labels={CAUSES[lang]} values={causes} active={f.cause} empty={t.empty} onPick={(i) => setF({ ...f, cause: f.cause === i ? null : i })} />
        </div>
        <div className="fo-board-cell">
          <Bars title={t.zone} labels={ZONES[lang]} values={zones} active={f.zone} empty={t.empty} onPick={(i) => setF({ ...f, zone: f.zone === i ? null : i })} />
        </div>
      </div>

      <div className="fo-dax">
        <div className="fo-dax-code">
          <p className="fo-board-h">DAX</p>
          <Code lang="dax" code={DAX[mId]} />
        </div>
        <div className="fo-dax-side">
          <p className="fo-board-h">{t.context}</p>
          <pre className="fo-ctx" dir="ltr" aria-live="polite">{ctx.join("\n")}</pre>
          <dl className="fo-compare">
            <div><dt>{t.rightName[mId]}</dt><dd dir="ltr">{right}</dd></div>
            <div className="is-alt"><dt>{t.alt}، {t.altName[mId]}</dt><dd dir="ltr">{wrong}</dd></div>
          </dl>
        </div>
      </div>

      <details className="fo-table-view">
        <summary>{t.table}</summary>
        <div className="overflow-x-auto mt-3">
          <table>
            <thead><tr><th>{t.month}</th><th dir="ltr">{f.year}</th><th dir="ltr">{f.year - 1}</th></tr></thead>
            <tbody>
              {line.cur.map((v, i) => (
                <tr key={i}><td>{i + 1}</td><td>{f.year === LAST.y && i >= LAST.m ? "—" : v}</td><td>{line.prev[i] || "—"}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

    </div>
  );
}
