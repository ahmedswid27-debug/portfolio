/**
 * بيانات اللوحة الحية — مولدة بالكامل من بذرة ثابتة، ولا صف فيها من أي جهة (القيد 3).
 * مدينة افتراضية بستة نطاقات، وكل بلاغ يتبع عطلا (Fault)، والعطل الواحد قد يولد عدة بلاغات.
 * البذرة ثابتة، فالخادم والمتصفح يولدان الصفوف نفسها ولا يختلف الترطيب.
 *
 * كل قياس هنا هو ترجمة جافاسكربت لقياس DAX المعروض بجواره في اللوحة (DAX أدناه)،
 * فالرقم الذي يراه الزائر هو ما يعيده الكود الذي يقرؤه.
 */
export type Row = {
  id: number;
  y: number;
  m: number; // 1–12
  zone: number;
  cause: number;
  sev: number;
  fault: number;
  closed: boolean;
  hours: number | null;
  onTime: boolean | null;
  rating: 0 | 1 | null; // 1 راض · 0 غير راض · null لم يقيم
};

export const ZONES = {
  ar: ["النطاق أ", "النطاق ب", "النطاق ج", "النطاق د", "النطاق هـ", "النطاق و"],
  en: ["Zone A", "Zone B", "Zone C", "Zone D", "Zone E", "Zone F"],
};
export const CAUSES = {
  ar: ["قصر في الكيبل", "سرقة كيبل", "فانوس تالف", "عطل قاطع", "انقطاع التغذية", "أخرى"],
  en: ["Cable short", "Cable theft", "Failed lamp", "Breaker fault", "Supply outage", "Other"],
};
export const SEVS = { ar: ["عادي", "خطير", "طارئ"], en: ["Routine", "Serious", "Urgent"] };

const CAUSE_W = [0.3, 0.14, 0.34, 0.1, 0.07, 0.05];
const CAUSE_REPORTS = [5, 4, 1, 2, 6, 1]; // أقصى عدد بلاغات يولده العطل الواحد
const ZONE_W = [0.24, 0.2, 0.18, 0.16, 0.13, 0.09];
const SLA = [24, 12, 6]; // ساعات الموعد لكل أهمية
export const LAST = { y: 2026, m: 9 }; // آخر شهر مكتمل في البيانات

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(w: number[], r: number) {
  let s = 0;
  for (let i = 0; i < w.length; i++) {
    s += w[i];
    if (r < s) return i;
  }
  return w.length - 1;
}

function build(): Row[] {
  const r = rng(20261029);
  const rows: Row[] = [];
  let id = 0;
  let fault = 0;
  for (const y of [2025, 2026]) {
    for (let m = 1; m <= (y === LAST.y ? LAST.m : 12); m++) {
      // الصيف أعلى، والسنة الثانية أعلى قليلا
      const season = 1 + 0.45 * Math.sin(((m - 3) / 12) * Math.PI * 2);
      const n = Math.round((y === 2026 ? 62 : 58) * season + r() * 8);
      for (let f = 0; f < n; f++) {
        fault++;
        const cause = pick(CAUSE_W, r());
        const zone = pick(ZONE_W, r());
        const count = 1 + Math.floor(r() * CAUSE_REPORTS[cause]);
        const sev = pick(cause === 0 || cause === 4 ? [0.55, 0.33, 0.12] : [0.82, 0.14, 0.04], r());
        const late = y === LAST.y && m === LAST.m && r() < 0.16; // مفتوح في آخر شهر
        const base = 2.5 + -Math.log(1 - r()) * (SLA[sev] * 0.42);
        for (let c = 0; c < count; c++) {
          const hours = late ? null : Math.round((base + r() * 2) * 10) / 10;
          const q = r();
          rows.push({
            id: ++id, y, m, zone, cause, sev, fault,
            closed: !late,
            hours,
            onTime: hours === null ? null : hours <= SLA[sev],
            rating: late || q < 0.46 ? null : q < 0.97 ? 1 : 0,
          });
        }
      }
    }
  }
  return rows;
}

export const ROWS = build();

export type Filter = { year: number; zone: number | null; cause: number | null; sev: number | null };

/** كل ما عدا السنة: يغذي المقارنة بين السنتين */
export const slice = (f: Filter, except?: "zone" | "cause") =>
  ROWS.filter(
    (r) =>
      (except === "zone" || f.zone === null || r.zone === f.zone) &&
      (except === "cause" || f.cause === null || r.cause === f.cause) &&
      (f.sev === null || r.sev === f.sev),
  );

export type Result = { value: number | null; naive: number | null; extra?: number | null };

export function measures(f: Filter) {
  const base = slice(f);
  const cur = base.filter((r) => r.y === f.year);
  const prevAll = base.filter((r) => r.y === f.year - 1);
  const lastM = cur.length ? Math.max(...cur.map((r) => r.m)) : 0;
  const prev = prevAll.filter((r) => r.m <= lastM);
  const closed = cur.filter((r) => r.closed);
  const faults = new Set(cur.map((r) => r.fault)).size;
  const rated = cur.filter((r) => r.rating !== null);
  const happy = rated.filter((r) => r.rating === 1).length;
  const pct = (a: number, b: number) => (b ? a / b : null);
  const yoy = (a: number, b: number) => (b ? (a - b) / b : null);
  return {
    reports: cur.length,
    yoy: { value: yoy(cur.length, prev.length), naive: yoy(cur.length, prevAll.length) } as Result,
    faults: { value: faults, naive: cur.length, extra: pct(cur.length, faults) } as Result,
    onTime: { value: pct(closed.filter((r) => r.onTime).length, closed.length), naive: pct(closed.filter((r) => r.onTime).length, cur.length) } as Result,
    csat: { value: pct(happy, rated.length), naive: pct(cur.length - (rated.length - happy), cur.length), extra: rated.length } as Result,
  };
}

export function monthly(f: Filter) {
  const base = slice(f);
  const y1 = Array<number>(12).fill(0);
  const y0 = Array<number>(12).fill(0);
  for (const r of base) {
    if (r.y === f.year) y1[r.m - 1]++;
    else if (r.y === f.year - 1) y0[r.m - 1]++;
  }
  return { cur: y1, prev: y0 };
}

export function byDim(f: Filter, dim: "zone" | "cause", n: number) {
  const out = Array<number>(n).fill(0);
  for (const r of slice(f, dim)) if (r.y === f.year) out[r[dim]]++;
  return out;
}

/** نص القياسات كما يكتب في Power BI — الكود بالإنجليزية عمدا: هكذا يقرؤه أي محلل */
export const DAX = {
  yoy: `Reports = COUNTROWS ( Reports )

Reports PY (same months) =
VAR LastMonth =
    CALCULATE ( MAX ( 'Date'[MonthEnd] ), 'Date'[HasData] = TRUE () )
RETURN
    CALCULATE (
        [Reports],
        SAMEPERIODLASTYEAR (
            FILTER ( VALUES ( 'Date'[Date] ), 'Date'[Date] <= LastMonth )
        )
    )

YoY % =
DIVIDE ( [Reports] - [Reports PY (same months)], [Reports PY (same months)] )`,
  faults: `Faults = DISTINCTCOUNT ( Reports[FaultKey] )

Reports per Fault = DIVIDE ( [Reports], [Faults] )`,
  onTime: `On-time % =
VAR Closed =
    CALCULATE ( [Reports], Reports[Status] = "Closed" )
VAR OnTime =
    CALCULATE (
        [Reports],
        Reports[Status] = "Closed",
        Reports[OnTime] = TRUE ()
    )
RETURN
    DIVIDE ( OnTime, Closed )`,
  csat: `CSAT % =
VAR Rated =
    CALCULATE ( [Reports], Reports[Rating] <> "Not rated" )
VAR Satisfied =
    CALCULATE ( [Reports], Reports[Rating] = "Satisfied" )
RETURN
    DIVIDE ( Satisfied, Rated )`,
};
export type MeasureId = keyof typeof DAX;
