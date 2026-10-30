/**
 * دراسات الحالة (2026-10-30). النصوص قصيرة وبعناوين اسمية بسيطة، والعمق في الكود والنموذج.
 * القيد 3: لا رقم ولا اسم عقد ولا موقع من بيانات العمل. كل مثال هنا مولد أو افتراضي وموسوم.
 * المنهج والمزالق والدروس هي خبرة الكاتب، أما الأرقام فتوضيحية.
 * الكود بالإنجليزية عمدا (المعرفات والتعليقات) ليبقى مقروءا ولا ينقلب داخل سطر عربي.
 */
import type { Lang } from "./folio";

export type Block =
  | { kind: "text"; h: string; body: string[] }
  | { kind: "compare"; h: string; before: { title: string; items: string[] }; after: { title: string; items: string[] } }
  | { kind: "code"; h: string; lang: "dax" | "m" | "sql" | "python"; code: string }
  | { kind: "model"; h: string; fact: { name: string; cols: string[] }; dims: { name: string; cols: string[] }[] }
  | { kind: "steps"; h: string; items: { t: string; d: string }[] }
  | { kind: "table"; h: string; head: string[]; rows: string[][] }
  | { kind: "calc"; h: string; body: string };

export type Case = {
  slug: string;
  tag: string;
  title: string;
  question: string;
  card: string;
  image: string;
  tools: string[];
  blocks: Block[];
  outcomeTitle: string;
  outcome: string[];
};

const M_KEY = `let
    Source   = Csv.Document(File.Contents(Path), [Encoding = 65001]),
    Headers  = Table.PromoteHeaders(Source),
    Typed    = Table.TransformColumnTypes(Headers, {{"ReportedAt", type datetime}}, "en-GB"),

    // The same station is typed "353A", "A353" and "A 353".
    // One key: digits first, then letters, no separators.
    StationKey = Table.AddColumn(Typed, "StationKey", each
        let
            raw     = Text.Upper(Text.Remove([Station] ?? "", {" ", "-", "/"})),
            digits  = Text.Select(raw, {"0".."9"}),
            letters = Text.Remove(raw, {"0".."9"})
        in
            digits & letters, type text)
in
    StationKey`;

const PY_FAULTS = `def group_faults(reports, radius_m=150, gap_h=48):
    """Reports close in space AND time describe one fault."""
    sites = []
    for r in sorted(reports, key=lambda r: r.time):
        near = [s for s in sites if any(meters(r, x) <= radius_m for x in s)]
        merged = [r] + [x for s in near for x in s]
        sites = [s for s in sites if s not in near] + [merged]

    faults = []
    for site in sites:
        site.sort(key=lambda r: r.time)
        wave = [site[0]]
        for r in site[1:]:
            if hours(r.time - wave[-1].time) > gap_h:
                faults.append(wave)
                wave = []
            wave.append(r)
        faults.append(wave)
    return faults`;

const DAX_REPEAT = `Faults = DISTINCTCOUNT ( Reports[FaultKey] )

Reports per Fault = DIVIDE ( [Reports], [Faults] )

// A site is chronic when faults keep returning, not when one fault was loud.
Chronic Sites =
COUNTROWS (
    FILTER (
        VALUES ( Sites[SiteKey] ),
        CALCULATE ( [Faults], DATESINPERIOD ( 'Date'[Date], MAX ( 'Date'[Date] ), -180, DAY ) ) >= 3
    )
)`;

const DAX_EVM = `Planned Value =
SUMX (
    Contracts,
    Contracts[Value] * DIVIDE (
        MIN ( MAX ( 'Date'[Date] ), Contracts[End] ) - Contracts[Start],
        Contracts[End] - Contracts[Start]
    )
)

Earned Value  = SUM ( Claims[WorkDoneValue] )
Actual Cost   = SUM ( Claims[PaidValue] )

SPI = DIVIDE ( [Earned Value], [Planned Value] )
CPI = DIVIDE ( [Earned Value], [Actual Cost] )

Elapsed % = DIVIDE ( [Planned Value], SUM ( Contracts[Value] ) )
Spent %   = DIVIDE ( [Actual Cost], SUM ( Contracts[Value] ) )

Status =
VAR Gap = [Elapsed %] - [Spent %]
RETURN
    SWITCH (
        TRUE (),
        ISBLANK ( Gap ), BLANK (),
        Gap < 0.10, "Excellent",
        Gap < 0.15, "Good",
        Gap < 0.20, "Weak",
        "At risk"
    )`;

const DAX_LATEST = `// "Latest row wins" is only safe if the latest row is complete.
Latest Claim =
VAR LastComplete =
    CALCULATE (
        MAX ( Claims[ClaimNo] ),
        NOT ISBLANK ( Claims[Contractor] ),
        NOT ISBLANK ( Claims[Scope] ),
        ALLEXCEPT ( Claims, Claims[ContractNo] )
    )
RETURN
    CALCULATE ( SUM ( Claims[WorkDoneValue] ), Claims[ClaimNo] = LastComplete )`;

const SQL_SYNC = `-- The file is a full snapshot, so what is missing from it no longer exists.
-- An upsert alone keeps those rows alive forever.
with bounds as (
    select min(reported_at) lo, max(reported_at) hi from incoming
), gone as (
    select r.* from reports r, bounds b
    where r.reported_at between b.lo and b.hi
      and not exists (select 1 from incoming i where i.id = r.id)
)
select count(*) as gone_rows,
       (select count(*) from reports r, bounds b
         where r.reported_at between b.lo and b.hi) as in_range
from gone;

-- Guard: more than 3% missing means a bad file, not a clean-up. Stop.
-- Otherwise move the rows to reports_archive with their full copy. Never drop them.`;

const SQL_KEEP = `-- A later file arrives with blank columns. Blank must never erase work already done.
create trigger keep_enrichment before update on reports
for each row execute function keep_non_blank('reason', 'station', 'feeder');

-- A database guard, not an app guard: there are several write paths today,
-- and there will be one more tomorrow.`;

const SHARED = {
  complaints: { tools: ["Power Query", "Python", "DAX", "Power BI", "SQL"] },
  evm: { tools: ["DAX", "Power BI", "Excel", "EVM"] },
  pipeline: { tools: ["n8n", "PostgreSQL", "Python", "Next.js", "Telegram API"] },
  arabic: { tools: ["Power BI", "PowerPoint", "Illustrator", "InDesign"] },
};

const AR: Case[] = [
  {
    slug: "complaints",
    tag: "البلاغات",
    title: "تحليل البلاغات",
    question: "هل زيادة البلاغات تعني زيادة الأعطال؟",
    card: "تحويل البلاغات إلى أعطال قابلة للقياس.",
    image: "/riyadh/lamps-hero.jpg",
    tools: SHARED.complaints.tools,
    blocks: [
      { kind: "text", h: "المشكلة", body: ["العطل الواحد يولد عدة بلاغات، والملف يسجل كل بلاغ صفا مستقلا."] },
      {
        kind: "compare",
        h: "البيانات",
        before: { title: "الملف الأصلي", items: ["صف لكل بلاغ بلا مفتاح يربطها", "المحطة بأكثر من صيغة", "الحي نفسه باسمين"] },
        after: { title: "بعد المعالجة", items: ["مفتاح موحد للمحطة والموقع", "مفتاح عطل يجمع البلاغات", "مطابقة كل رقم مع المصدر"] },
      },
      { kind: "code", h: "توحيد المفاتيح", lang: "m", code: M_KEY },
      { kind: "code", h: "تعريف العطل", lang: "python", code: PY_FAULTS },
      {
        kind: "model",
        h: "النموذج",
        fact: { name: "Reports", cols: ["ReportID", "FaultKey", "SiteKey", "DateKey", "Status", "OnTime", "Rating"] },
        dims: [
          { name: "Date", cols: ["Date", "Year", "Month", "HasData"] },
          { name: "Sites", cols: ["SiteKey", "StationKey", "Feeder", "Lat, Long"] },
          { name: "Zones", cols: ["Zone", "Contract"] },
          { name: "Causes", cols: ["Cause", "Group"] },
        ],
      },
      { kind: "code", h: "القياسات", lang: "dax", code: DAX_REPEAT },
      {
        kind: "table",
        h: "مثال توضيحي",
        head: ["اليوم", "البلاغات", "مقطع الكيبل", "العطل"],
        rows: [["4", "3", "العمودان 41 و42", "عطل 1"], ["9", "5", "العمودان 42 و43", "عطل 2"], ["21", "4", "العمودان 43 و44", "عطل 3"]],
      },
    ],
    outcomeTitle: "النتيجة",
    outcome: ["تحديد مواقع التأهيل بدل الصيانة المتكررة.", "مطابقة الأرقام قبل كل رد.", "كشف البلاغات غير المذكورة في الطلبات."],
  },
  {
    slug: "earned-value",
    tag: "العقود",
    title: "متابعة العقود",
    question: "أي عقد متأخر فعلا؟",
    card: "معيار موحد بالقيمة المكتسبة لكل العقود.",
    image: "/riyadh/aerial-day.jpg",
    tools: SHARED.evm.tools,
    blocks: [
      { kind: "text", h: "المشكلة", body: ["نسبة الصرف وحدها لا تكفي للمقارنة بين عقود مختلفة القيمة والمدة."] },
      { kind: "code", h: "القياسات", lang: "dax", code: DAX_EVM },
      { kind: "calc", h: "قاعدة التصنيف", body: "الفرق = نسبة المدة المنقضية − نسبة الصرف" },
      {
        kind: "table",
        h: "مثال توضيحي",
        head: ["العقد", "المدة المنقضية", "الصرف", "SPI", "CPI", "التصنيف"],
        rows: [
          ["عقد أ", "62%", "58%", "0.96", "1.02", "ممتاز"],
          ["عقد ب", "71%", "54%", "0.82", "0.97", "ضعيف"],
          ["عقد ج", "48%", "25%", "0.61", "0.92", "متعثر"],
        ],
      },
      { kind: "code", h: "اختيار آخر مستخلص", lang: "dax", code: DAX_LATEST },
    ],
    outcomeTitle: "النتيجة",
    outcome: ["معيار واحد قابل للتحقق لكل العقود.", "تصنيف موحد في اللوحة والتقرير والعرض."],
  },
  {
    slug: "data-pipeline",
    tag: "الأتمتة",
    title: "أتمتة البيانات",
    question: "كيف يوثق بتقرير يصل آليا كل صباح؟",
    card: "خط بيانات يتحقق من نفسه قبل التسليم.",
    image: "/riyadh/kingdom-night.jpg",
    tools: SHARED.pipeline.tools,
    blocks: [
      {
        kind: "steps",
        h: "مسار البيانات",
        items: [
          { t: "الاستقبال", d: "رفع الملف وقراءة الأعمدة بأسمائها." },
          { t: "التحقق", d: "فحص الأنواع والتواريخ والمفاتيح." },
          { t: "المطابقة", d: "مقارنة اللقطة بالقاعدة وأرشفة ما غاب." },
          { t: "الحماية", d: "قيود في القاعدة تمنع فقد البيانات." },
          { t: "الفحص الليلي", d: "مقارنة الصفحات بجداولها." },
          { t: "التسليم", d: "تقرير يومي بالبريد وتيليجرام." },
        ],
      },
      { kind: "code", h: "مطابقة المصدر", lang: "sql", code: SQL_SYNC },
      { kind: "code", h: "حماية البيانات", lang: "sql", code: SQL_KEEP },
      {
        kind: "compare",
        h: "قبل وبعد",
        before: { title: "قبل", items: ["إعداد يدوي كل صباح", "الخطأ يكتشفه القارئ", "الملف لا يحفظ"] },
        after: { title: "بعد", items: ["تقرير آلي يومي", "الخطأ يكتشفه الفحص الليلي", "كل ملف مؤرشف"] },
      },
    ],
    outcomeTitle: "النتيجة",
    outcome: ["إلغاء الإعداد اليدوي للتقرير.", "كشف الخطأ قبل وصوله إلى الإدارة.", "إمكان إعادة بناء أي رقم من مصدره."],
  },
  {
    slug: "arabic-reporting",
    tag: "التصميم",
    title: "التقارير العربية",
    question: "كيف تصمم لوحة عربية صحيحة؟",
    card: "قواعد التصميم والاتجاه في اللوحات والتقارير العربية.",
    image: "/riyadh/skyline-sunset.jpg",
    tools: SHARED.arabic.tools,
    blocks: [
      {
        kind: "steps",
        h: "القواعد",
        items: [
          { t: "صفحة لكل سؤال", d: "ما لا يجيب عن السؤال يحذف." },
          { t: "اتجاه الزمن", d: "من اليسار إلى اليمين حتى في الواجهة العربية." },
          { t: "عزل الأرقام", d: "الإشارة والنسبة والمدى باتجاه يساري." },
          { t: "وظيفة اللون", d: "هوية أو مقدار أو حالة." },
          { t: "الجوال", d: "فئات أقل بدل قص النصوص." },
          { t: "فحص الخط", d: "الحكم من الصفحة المصيرة." },
        ],
      },
      {
        kind: "compare",
        h: "أخطاء شائعة",
        before: { title: "الخطأ", items: ["أقواس مقلوبة في PowerPoint", "أرقام المحور داخل الرسم", "سهم على رقم لا يقارنه", "مؤشر منحاز إلى الأسوأ"] },
        after: { title: "الحل", items: ["لغة المقطع ar-SA", "حاوية الرسم باتجاه يساري", "السهم على رقمه فقط", "استبعاد المؤشر من المقارنة"] },
      },
    ],
    outcomeTitle: "النتيجة",
    outcome: ["تقارير تقرأ في اجتماع واحد.", "نظام تصميم قابل لإعادة الاستخدام."],
  },
];

const EN: Case[] = [
  {
    slug: "complaints",
    tag: "Complaints",
    title: "Complaints analysis",
    question: "Do more reports mean more faults?",
    card: "Turning reports into measurable faults.",
    image: "/riyadh/lamps-hero.jpg",
    tools: SHARED.complaints.tools,
    blocks: [
      { kind: "text", h: "The problem", body: ["One fault creates several reports, and the file records each report as its own row."] },
      {
        kind: "compare",
        h: "The data",
        before: { title: "Source file", items: ["One row per report, no linking key", "Station IDs in several formats", "One location, two district names"] },
        after: { title: "After processing", items: ["One station and site key", "A fault key grouping reports", "Every number matched to source"] },
      },
      { kind: "code", h: "Key standardisation", lang: "m", code: M_KEY },
      { kind: "code", h: "Fault definition", lang: "python", code: PY_FAULTS },
      {
        kind: "model",
        h: "The model",
        fact: { name: "Reports", cols: ["ReportID", "FaultKey", "SiteKey", "DateKey", "Status", "OnTime", "Rating"] },
        dims: [
          { name: "Date", cols: ["Date", "Year", "Month", "HasData"] },
          { name: "Sites", cols: ["SiteKey", "StationKey", "Feeder", "Lat, Long"] },
          { name: "Zones", cols: ["Zone", "Contract"] },
          { name: "Causes", cols: ["Cause", "Group"] },
        ],
      },
      { kind: "code", h: "Measures", lang: "dax", code: DAX_REPEAT },
      {
        kind: "table",
        h: "Illustrative example",
        head: ["Day", "Reports", "Cable span", "Fault"],
        rows: [["4", "3", "Poles 41–42", "Fault 1"], ["9", "5", "Poles 42–43", "Fault 2"], ["21", "4", "Poles 43–44", "Fault 3"]],
      },
    ],
    outcomeTitle: "Result",
    outcome: ["Rehabilitation sites identified instead of repeat maintenance.", "Numbers matched before every reply.", "Unreported complaints surfaced."],
  },
  {
    slug: "earned-value",
    tag: "Contracts",
    title: "Contract tracking",
    question: "Which contract is really behind?",
    card: "One earned-value standard for every contract.",
    image: "/riyadh/aerial-day.jpg",
    tools: SHARED.evm.tools,
    blocks: [
      { kind: "text", h: "The problem", body: ["Percent spent alone cannot compare contracts of different value and duration."] },
      { kind: "code", h: "Measures", lang: "dax", code: DAX_EVM },
      { kind: "calc", h: "Classification rule", body: "Gap = % time elapsed − % spent" },
      {
        kind: "table",
        h: "Illustrative example",
        head: ["Contract", "Time elapsed", "Spent", "SPI", "CPI", "Status"],
        rows: [
          ["Contract A", "62%", "58%", "0.96", "1.02", "Excellent"],
          ["Contract B", "71%", "54%", "0.82", "0.97", "Weak"],
          ["Contract C", "48%", "25%", "0.61", "0.92", "At risk"],
        ],
      },
      { kind: "code", h: "Selecting the latest claim", lang: "dax", code: DAX_LATEST },
    ],
    outcomeTitle: "Result",
    outcome: ["One verifiable standard for every contract.", "The same status in the board, report and deck."],
  },
  {
    slug: "data-pipeline",
    tag: "Automation",
    title: "Data automation",
    question: "How can an automatic daily report be trusted?",
    card: "A pipeline that validates itself before delivery.",
    image: "/riyadh/kingdom-night.jpg",
    tools: SHARED.pipeline.tools,
    blocks: [
      {
        kind: "steps",
        h: "Data path",
        items: [
          { t: "Intake", d: "Upload, reading columns by name." },
          { t: "Validation", d: "Type, date and key checks." },
          { t: "Reconciliation", d: "Compare the snapshot and archive what is missing." },
          { t: "Protection", d: "Database constraints that prevent data loss." },
          { t: "Nightly check", d: "Compare pages with their tables." },
          { t: "Delivery", d: "Daily report by email and Telegram." },
        ],
      },
      { kind: "code", h: "Source reconciliation", lang: "sql", code: SQL_SYNC },
      { kind: "code", h: "Data protection", lang: "sql", code: SQL_KEEP },
      {
        kind: "compare",
        h: "Before and after",
        before: { title: "Before", items: ["Manual preparation every morning", "Errors found by the reader", "Files not kept"] },
        after: { title: "After", items: ["Automatic daily report", "Errors found by the nightly check", "Every file archived"] },
      },
    ],
    outcomeTitle: "Result",
    outcome: ["Manual report preparation removed.", "Errors caught before reaching management.", "Any number can be rebuilt from its source."],
  },
  {
    slug: "arabic-reporting",
    tag: "Design",
    title: "Arabic reporting",
    question: "What makes an Arabic dashboard correct?",
    card: "Design and direction rules for Arabic dashboards and reports.",
    image: "/riyadh/skyline-sunset.jpg",
    tools: SHARED.arabic.tools,
    blocks: [
      {
        kind: "steps",
        h: "Rules",
        items: [
          { t: "One page, one question", d: "What does not answer it is removed." },
          { t: "Time direction", d: "Left to right, even in an Arabic interface." },
          { t: "Number isolation", d: "Signs, percentages and ranges run left to right." },
          { t: "Colour function", d: "Identity, magnitude or status." },
          { t: "Mobile", d: "Fewer categories instead of truncation." },
          { t: "Type checks", d: "Judge from the rendered page." },
        ],
      },
      {
        kind: "compare",
        h: "Common mistakes",
        before: { title: "Mistake", items: ["Flipped brackets in PowerPoint", "Axis numbers inside the plot", "An arrow on an unrelated number", "A metric biased to the worse"] },
        after: { title: "Fix", items: ["Run language set to ar-SA", "Left-to-right chart container", "Arrows only on their own number", "Metric removed from the comparison"] },
      },
    ],
    outcomeTitle: "Result",
    outcome: ["Reports read in one meeting.", "A reusable design system."],
  },
];

export const getCases = (lang: Lang) => (lang === "en" ? EN : AR);
export const CASE_SLUGS = AR.map((c) => c.slug);
export const getCase = (lang: Lang, slug: string) => getCases(lang).find((c) => c.slug === slug);
