/**
 * دراسات الحالة — تعميق الموقع (2026-10-30): كيف أفكر، لا ماذا أنجزت فقط.
 * القيد 3: لا رقم ولا اسم عقد ولا موقع من بيانات العمل. كل مثال هنا مولد أو افتراضي وموسوم.
 * المنهج والمزالق والدروس هي خبرة الكاتب، أما الأرقام فتوضيحية.
 * الكود بالإنجليزية عمدا (المعرفات والتعليقات) ليبقى مقروءا ولا ينقلب داخل سطر عربي.
 */
import type { Lang } from "./folio";

export type Block =
  | { kind: "text"; h: string; body: string[] }
  | { kind: "compare"; h: string; before: { title: string; items: string[] }; after: { title: string; items: string[] } }
  | { kind: "code"; h: string; lang: "dax" | "m" | "sql" | "python"; code: string; note?: string }
  | { kind: "model"; h: string; fact: { name: string; cols: string[] }; dims: { name: string; cols: string[] }[]; note?: string }
  | { kind: "steps"; h: string; items: { t: string; d: string }[] }
  | { kind: "table"; h: string; head: string[]; rows: string[][]; note?: string }
  | { kind: "calc"; h: string; body: string };

export type Case = {
  slug: string;
  tag: string;
  title: string;
  question: string;
  card: string;
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
    tag: "تحليل البلاغات",
    title: "عدد البلاغات لا يساوي عدد الأعطال",
    question: "ارتفعت البلاغات في أحد النطاقات، فهل تراجعت الصيانة أم أن شيئا آخر يحدث؟",
    card: "كيف حولت ملفا فيه بلاغ لكل صف إلى عطل قابل للقياس، فتغير السؤال من «كم بلاغا» إلى «أين نؤهل الشبكة».",
    tools: SHARED.complaints.tools,
    blocks: [
      {
        kind: "text",
        h: "لماذا كان الرقم مضللا",
        body: [
          "قصر واحد في كيبل أرضي يطفئ عدة أعمدة دفعة واحدة، فيبلغ عدة مواطنين عن الشارع نفسه. يدخل كل بلاغ صفا مستقلا في الملف، ويقرؤه التقرير بوصفه عملا جديدا.",
          "فالمؤشر الذي تتابعه الإدارة يقيس ما رآه الناس، لا ما تعطل. ولا يكشف الفرق بينهما إلا تعريف جديد لم يكن في البيانات أصلا، هو العطل.",
        ],
      },
      {
        kind: "compare",
        h: "ما كان في الملف وما يلزم للسؤال",
        before: { title: "الملف كما يصل", items: ["صف لكل بلاغ، بلا مفتاح يربط البلاغات ببعضها", "المحطة مكتوبة بأكثر من صيغة", "الحي نفسه يسجل باسمين في النقطة نفسها", "أرقام تصل من المقاولين برسائل وقد تحمل خطأ كتابة"] },
        after: { title: "ما بنيته فوقه", items: ["مفتاح موحد للمحطة وآخر للموقع", "مفتاح عطل يجمع البلاغات المتقاربة مكانا وزمنا", "مطابقة كل رقم مع التصدير قبل أي رد", "قائمة بالبلاغات المجاورة التي لم تذكر في الطلب"] },
      },
      { kind: "code", h: "أولا، توحيد المفتاح في Power Query", lang: "m", code: M_KEY, note: "التنظيف هنا لا في DAX: ما يوحد مرة عند الدخول لا يكرر في كل قياس." },
      { kind: "code", h: "ثم، تعريف العطل", lang: "python", code: PY_FAULTS, note: "المكان وحده لا يكفي، فالموقع قد يتعطل مرتين في شهر. لذلك يقطع الفاصل الزمني الموقع الواحد إلى أعطال منفصلة." },
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
        note: "جدول حقائق واحد بأبعاد بسيطة. مفتاح العطل عمود في الحقائق لا جدول مستقل، فهو تجميع لا كيان له صفاته.",
      },
      { kind: "code", h: "القياسات", lang: "dax", code: DAX_REPEAT },
      {
        kind: "table",
        h: "مثال توضيحي لشارع واحد خلال شهر",
        head: ["التاريخ", "البلاغات", "مقطع الكيبل", "العطل"],
        rows: [["4", "3", "العمودان 41 و42", "عطل 1"], ["9", "5", "العمودان 42 و43", "عطل 2"], ["21", "4", "العمودان 43 و44", "عطل 3"]],
        note: "مثال مصطنع بأرقام توضيحية. يظهر الشارع في التقرير باثني عشر بلاغا، وفي الحقيقة ثلاثة أعطال في مقطع واحد من الكيبل.",
      },
    ],
    outcomeTitle: "ما تغير",
    outcome: [
      "صار السؤال في الاجتماع أين نستبدل المقطع، لا لماذا زادت البلاغات.",
      "ظهرت المواقع التي يعود إليها العطل، وهي مواضع تأهيل لا صيانة متكررة.",
      "صار كل رد على الجهات يبدأ بمطابقة الأرقام، وكشفت المطابقة بلاغات لم يذكرها الطلب وأخطاء كتابة في الأرقام.",
    ],
  },
  {
    slug: "earned-value",
    tag: "متابعة العقود",
    title: "أي عقد متأخر فعلا",
    question: "كيف نقارن عقودا مختلفة القيمة والمدة بمعيار واحد لا يعتمد على الانطباع؟",
    card: "استبدال التقييم الانطباعي بمعيار موحد: القيمة المكتسبة، ومؤشرا الجدول والتكلفة، وقاعدة تصنيف واحدة في كل الشاشات.",
    tools: SHARED.evm.tools,
    blocks: [
      {
        kind: "text",
        h: "المشكلة",
        body: [
          "نسبة الصرف وحدها لا تقول شيئا. عقد صرف نصف قيمته قد يكون متقدما أو متأخرا، بحسب ما انقضى من مدته.",
          "والمقارنة العادلة تحتاج مرجعا واحدا لكل العقود: ما كان يجب إنجازه الآن، مقابل ما أنجز، مقابل ما صرف. هذا هو منهج القيمة المكتسبة، وقد درسته في مسار إدارة المشاريع ثم طبقته في DAX.",
        ],
      },
      { kind: "code", h: "القياسات", lang: "dax", code: DAX_EVM, note: "لا درجات مركبة ولا أوزان اجتهادية. قاعدة واحدة تكتب مرة وتظهر بالنتيجة نفسها في كل شاشة." },
      { kind: "calc", h: "جرب القاعدة", body: "حرك المؤشرين لترى كيف يتغير التصنيف. الفرق هو نسبة المدة المنقضية ناقص نسبة الصرف." },
      {
        kind: "table",
        h: "ثلاثة عقود افتراضية بقراءة واحدة",
        head: ["العقد", "المدة المنقضية", "الصرف", "SPI", "CPI", "القراءة"],
        rows: [
          ["عقد أ", "62%", "58%", "0.96", "1.02", "ممتاز"],
          ["عقد ب", "71%", "54%", "0.82", "0.97", "ضعيف"],
          ["عقد ج", "48%", "25%", "0.61", "0.92", "متعثر"],
        ],
        note: "عقود افتراضية وأرقام توضيحية.",
      },
      {
        kind: "code",
        h: "الخطأ الذي كلفني مراجعة",
        lang: "dax",
        code: DAX_LATEST,
        note: "اختيار أحدث مستخلص يبدو بديهيا. لكن صفا أحدث وأفقر يدهس صفا أقدم وأكمل في صمت، فيظهر العقد بلا اسم ويدخل المعيار خطأ. حيث تختار «آخر نسخة»، افحص نقصها لا وجودها.",
      },
      {
        kind: "text",
        h: "ثلاثة تفاصيل تحدد صحة الرقم",
        body: [
          "النسبة المخزنة كسر بين 0 و1. نسيان الضرب في 100 قبل المقارنة بالعتبات يجعل كل عقد ممتازا.",
          "تاريخ النهاية يحمل التمديد أحيانا. إضافة التمديد مرة ثانية تطيل العقد على الورق وتخفي تأخره.",
          "المستخلص يتأخر لأنه ينتظر الاعتماد، فعمره ليس تقصيرا من المقاول. يجب أن يذكر ذلك بجوار الرقم، وإلا قرئ اتهاما.",
        ],
      },
    ],
    outcomeTitle: "ما تغير",
    outcome: [
      "حل معيار واحد قابل للتحقق محل الانطباع عند تقييم المقاولين.",
      "صار كل عقد يقرأ بالطريقة نفسها في اللوحة والتقرير والعرض.",
      "انتقل النقاش من الدفاع عن الرقم إلى ما يجب فعله بشأنه.",
    ],
  },
  {
    slug: "data-pipeline",
    tag: "أتمتة وأنظمة",
    title: "كيف تثق الإدارة برقم يصلها كل صباح",
    question: "التقرير يصل آليا، فمن يضمن أن رقمه صحيح حين لا يراجعه أحد قبل إرساله؟",
    card: "من ملف يرفع يدويا إلى خط بيانات يتحقق من نفسه، ويطابق المصدر، ويرسل التقرير، وينبه حين يختل شيء.",
    tools: SHARED.pipeline.tools,
    blocks: [
      {
        kind: "steps",
        h: "مسار البيانات",
        items: [
          { t: "الاستقبال", d: "رفع ذاتي للملف مع قراءة الأعمدة بأسمائها لا بمواضعها، فعمود يزاح لا يفرغ الجدول في صمت." },
          { t: "التحقق", d: "فحص النوع والتاريخ والمفتاح. والتاريخ قد يصل نصا، وخلية إكسل قد تعود بفارق ثوان ينقل التقرير إلى شهر آخر." },
          { t: "المطابقة", d: "الملف لقطة كاملة، فما غاب عنه ينقل إلى الأرشيف بنسخته كاملة، ولا يبقى حيا." },
          { t: "الحراسة", d: "قيود في القاعدة نفسها: القيمة المكتوبة لا يمحوها فراغ، والبلاغ المنفذ لا يعود مفتوحا." },
          { t: "الفحص الليلي", d: "مقارنة كل صفحة بجداولها، ورسالة عند الاختلال فقط." },
          { t: "التسليم", d: "تقرير تنفيذي يومي بالبريد وتيليجرام، بجملة أولى تقول ما يحتاج تدخلا." },
        ],
      },
      { kind: "code", h: "رفعة تحدث ولا تطابق تبقي القديم حيا", lang: "sql", code: SQL_SYNC, note: "وقعت هذا الخطأ مع ثلاثة مصادر قبل أن أكتبه قاعدة. أول سؤال عن أي مصدر جديد الآن: هل الملف لقطة كاملة أم إضافة؟" },
      { kind: "code", h: "الحارس مكانه القاعدة لا التطبيق", lang: "sql", code: SQL_KEEP },
      {
        kind: "compare",
        h: "قبل وبعد",
        before: { title: "إعداد يدوي", items: ["تقرير يبنى كل صباح", "الخطأ يكتشفه القارئ", "الملف يقرأ ثم يختفي", "عمر البيانات يقاس بوقت الرفع"] },
        after: { title: "خط بيانات", items: ["تقرير يصل قبل بدء الدوام", "الخطأ يكتشفه الفحص الليلي", "كل ملف مؤرشف بنسخته الأصلية", "عمر البيانات يقاس بالفترة التي تغطيها"] },
      },
      {
        kind: "text",
        h: "ما لا يقاس هنا بالأدوات",
        body: [
          "الأتمتة تنقل الخطأ بسرعة أكبر إن لم تتحقق من نفسها. لذلك يقاس الخط بعدد الأخطاء التي أوقفها قبل أن تصل القارئ، لا بعدد التقارير التي أرسلها.",
          "وكل نسخة احتياطية تجرب بالاستعادة فعلا. النسخة التي لم تستعد ليست نسخة.",
        ],
      },
    ],
    outcomeTitle: "ما تغير",
    outcome: [
      "اختفى إعداد التقرير الصباحي اليدوي.",
      "صار الخطأ في البيانات يصل إلى صاحب النظام قبل أن يصل إلى الإدارة.",
      "صار ممكنا إعادة بناء أي رقم من مصدره، لأن كل ملف محفوظ.",
    ],
  },
  {
    slug: "arabic-reporting",
    tag: "تصميم التقارير",
    title: "اللوحة العربية ليست لوحة إنجليزية مقلوبة",
    question: "لماذا تبدو كثير من اللوحات العربية مكسورة، مع أن بياناتها صحيحة؟",
    card: "خبرة التصميم والتحليل معا: قواعد مقيسة لتقارير ولوحات تقرؤها الإدارة في اجتماع واحد، بالعربية الصحيحة.",
    tools: SHARED.arabic.tools,
    blocks: [
      {
        kind: "text",
        h: "لماذا يهم التصميم محلل البيانات",
        body: [
          "عملت أربع سنوات في التصميم والموشن قبل التحليل. والدرس الذي حملته معي أن الرقم الصحيح الذي لا يقرأ في ثوان لا يصل إلى القرار.",
          "وفي السوق العربية مشكلة إضافية: الأدوات مبنية لليسار إلى اليمين، فقلب الاتجاه لا يكفي، وأي تفصيل يهمل يظهر كسرا أمام المدير.",
        ],
      },
      {
        kind: "steps",
        h: "قواعد أطبقها في كل لوحة",
        items: [
          { t: "صفحة لسؤال واحد", d: "العنوان يكتب الجواب أو السؤال، لا اسم الجدول. وأي عنصر لا يجيب عن السؤال يخرج." },
          { t: "الزمن يسير يسارا إلى يمين", d: "حتى في الواجهة العربية. قلب المحور يجعل الصعود يبدو هبوطا." },
          { t: "الرقم يعزل عن النص", d: "الإشارة والنسبة والمدى تعزل باتجاه يساري، وإلا قرئ +12% معكوسا و100–250 مقلوبا." },
          { t: "اللون له وظيفة", d: "هوية أو مقدار أو حالة، ولا يختار للزينة. ولون الحالة لا يأتي وحده، بل مع كلمة أو أيقونة." },
          { t: "الجوال ليس شاشة مصغرة", d: "الفئات تقلل بدل أن تقطع، والأسماء الطويلة تصبح قائمة أفقية، والجدول يصبح بطاقات بأربعة حقول." },
          { t: "الخط يختبر بالصورة", d: "لا يحكم على النص العربي من استخراج PDF، بل من الصفحة المصيرة نفسها." },
        ],
      },
      {
        kind: "compare",
        h: "من مصيدة إلى قاعدة",
        before: { title: "ما رأيته يتكرر", items: ["أقواس مقلوبة في PowerPoint العربي", "أرقام المحور تدخل مساحة الرسم في RTL", "سهم اتجاه ملصق ببطاقة رقمها مختلف", "حساب نسبة لفترة منحازة دائما إلى الأسوأ"] },
        after: { title: "ما صار قاعدة عندي", items: ["كل مقطع عربي بلغة ar-SA، فالمحرف الخفي لا يكفي", "حاوية الرسم باتجاه يساري داخل صفحة عربية", "السهم لا يوضع إلا على الرقم الذي يقارنه", "إخراج المؤشر المنحاز من المقارنة بدل تفسيره"] },
      },
    ],
    outcomeTitle: "ما تغير",
    outcome: [
      "تقارير تقرأ في اجتماع واحد، بمصدر واحد لكل رقم.",
      "نظام تصميم قابل لإعادة الاستعمال بدل البدء من الصفر في كل تقرير.",
      "لوحات عربية يقرؤها المدير والمقاول دون شرح.",
    ],
  },
];

const EN: Case[] = [
  {
    slug: "complaints",
    tag: "Complaint analytics",
    title: "The number of reports is not the number of faults",
    question: "Reports rose in one zone. Did maintenance slip, or is something else going on?",
    card: "How a one-row-per-report file became a measurable fault, moving the question from “how many reports” to “where do we rehabilitate the network”.",
    tools: SHARED.complaints.tools,
    blocks: [
      {
        kind: "text",
        h: "Why the number misled",
        body: [
          "One short in an underground cable takes out several poles at once, so several citizens report the same street. Each report becomes its own row, and the dashboard reads it as new work.",
          "So the KPI management tracked measured what people saw, not what broke. The gap between the two needed a concept the data did not contain: the fault.",
        ],
      },
      {
        kind: "compare",
        h: "What the file had, and what the question needed",
        before: { title: "The file as received", items: ["One row per report, with nothing linking reports together", "Station IDs typed in several formats", "The same spot recorded under two district names", "Numbers relayed by contractors, sometimes mistyped"] },
        after: { title: "What I built on top", items: ["One station key and one site key", "A fault key grouping reports close in space and time", "Every number matched to the export before any reply", "A list of neighbouring reports the request never mentioned"] },
      },
      { kind: "code", h: "First, one key in Power Query", lang: "m", code: M_KEY, note: "Clean at the door, not in DAX: what is fixed once on the way in never has to be repeated in a measure." },
      { kind: "code", h: "Then, define the fault", lang: "python", code: PY_FAULTS, note: "Location alone is not enough, because a site can fail twice in a month. The time gap cuts one site into separate faults." },
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
        note: "One fact table and plain dimensions. The fault key stays a column in the fact table: it is a grouping, not an entity with attributes of its own.",
      },
      { kind: "code", h: "The measures", lang: "dax", code: DAX_REPEAT },
      {
        kind: "table",
        h: "An illustrative street over one month",
        head: ["Day", "Reports", "Cable span", "Fault"],
        rows: [["4", "3", "Poles 41–42", "Fault 1"], ["9", "5", "Poles 42–43", "Fault 2"], ["21", "4", "Poles 43–44", "Fault 3"]],
        note: "A made-up example with illustrative figures. The report shows twelve complaints; the reality is three faults on one stretch of cable.",
      },
    ],
    outcomeTitle: "What changed",
    outcome: [
      "The meeting question became where to replace the span, not why reports went up.",
      "Sites where faults keep returning became visible: rehabilitation targets, not repeat maintenance.",
      "Every reply now starts with matching the numbers, which surfaced unreported complaints and typing errors.",
    ],
  },
  {
    slug: "earned-value",
    tag: "Contract tracking",
    title: "Which contract is really behind",
    question: "How do you compare contracts of different size and length with one standard that does not rest on impressions?",
    card: "Replacing impression-based assessment with one standard: earned value, schedule and cost indices, and a single classification rule on every screen.",
    tools: SHARED.evm.tools,
    blocks: [
      {
        kind: "text",
        h: "The problem",
        body: [
          "Percent spent alone says nothing. A contract that has spent half its value may be ahead or behind, depending on how much of its time has passed.",
          "A fair comparison needs one reference for every contract: what should be done by now, what is done, and what was paid. That is earned value, which I studied on the project management track and then implemented in DAX.",
        ],
      },
      { kind: "code", h: "The measures", lang: "dax", code: DAX_EVM, note: "No composite scores and no judgement weights. One rule, written once, giving the same result on every screen." },
      { kind: "calc", h: "Try the rule", body: "Move the sliders to see the classification change. The gap is percent of time elapsed minus percent spent." },
      {
        kind: "table",
        h: "Three fictional contracts, one reading",
        head: ["Contract", "Time elapsed", "Spent", "SPI", "CPI", "Reading"],
        rows: [
          ["Contract A", "62%", "58%", "0.96", "1.02", "Excellent"],
          ["Contract B", "71%", "54%", "0.82", "0.97", "Weak"],
          ["Contract C", "48%", "25%", "0.61", "0.92", "At risk"],
        ],
        note: "Fictional contracts and illustrative figures.",
      },
      {
        kind: "code",
        h: "The trap that cost me a review",
        lang: "dax",
        code: DAX_LATEST,
        note: "Picking the latest claim looks obvious. But a newer, emptier row silently overrides an older, complete one: the contract appears nameless and enters the benchmark wrongly. Wherever you pick “the latest version”, check that it is complete, not just that it exists.",
      },
      {
        kind: "text",
        h: "Three details that decide whether the number is right",
        body: [
          "The stored percentage is a fraction between 0 and 1. Forget to scale it before comparing to thresholds and every contract looks excellent.",
          "The end date sometimes already includes an extension. Add it again and the contract stretches on paper, hiding the delay.",
          "A claim can be late because it is waiting for approval, so its age is not a contractor failure. Say so next to the number, or it reads as an accusation.",
        ],
      },
    ],
    outcomeTitle: "What changed",
    outcome: [
      "One verifiable standard replaced impressions when assessing contractors.",
      "Every contract now reads the same way in the dashboard, the report and the deck.",
      "The discussion moved from defending the number to deciding what to do about it.",
    ],
  },
  {
    slug: "data-pipeline",
    tag: "Automation & systems",
    title: "How management can trust a number that arrives every morning",
    question: "The report arrives automatically. Who guarantees it is right when nobody reviews it first?",
    card: "From a manually uploaded file to a pipeline that validates itself, reconciles with the source, delivers the report and raises a flag when something drifts.",
    tools: SHARED.pipeline.tools,
    blocks: [
      {
        kind: "steps",
        h: "The data path",
        items: [
          { t: "Intake", d: "Self-serve upload that reads columns by name, not position, so a shifted column cannot silently empty a table." },
          { t: "Validation", d: "Type, date and key checks. A date may arrive as text, and an Excel cell can come back seconds off and move a report into another month." },
          { t: "Reconciliation", d: "The file is a full snapshot, so what is missing from it moves to an archive with its full copy instead of staying alive." },
          { t: "Guards", d: "Constraints in the database itself: a written value cannot be erased by a blank, and a closed report cannot reopen." },
          { t: "Nightly check", d: "Every page compared with its tables, and a message only when something is off." },
          { t: "Delivery", d: "A daily executive report by email and Telegram, whose first sentence says what needs attention." },
        ],
      },
      { kind: "code", h: "An upload that updates but never reconciles keeps the past alive", lang: "sql", code: SQL_SYNC, note: "I hit this with three sources before writing it down as a rule. The first question for any new source is now: is this file a full snapshot or an increment?" },
      { kind: "code", h: "The guard belongs in the database, not the app", lang: "sql", code: SQL_KEEP },
      {
        kind: "compare",
        h: "Before and after",
        before: { title: "Manual", items: ["A report rebuilt every morning", "Errors found by the reader", "Files read, then gone", "Data age measured by upload time"] },
        after: { title: "Pipeline", items: ["A report that arrives before the working day", "Errors found by the nightly check", "Every file archived as received", "Data age measured by the period it covers"] },
      },
      {
        kind: "text",
        h: "What tools do not measure",
        body: [
          "Automation spreads a mistake faster if it does not check itself. So a pipeline is judged by the errors it stopped before reaching a reader, not by the reports it sent.",
          "And every backup is proven by actually restoring it. A backup that was never restored is not a backup.",
        ],
      },
    ],
    outcomeTitle: "What changed",
    outcome: [
      "Manual morning report preparation disappeared.",
      "Data errors now reach the system owner before they reach management.",
      "Any number can be rebuilt from its source, because every file is kept.",
    ],
  },
  {
    slug: "arabic-reporting",
    tag: "Report design",
    title: "An Arabic dashboard is not an English one flipped",
    question: "Why do so many Arabic dashboards look broken even when their data is right?",
    card: "Design and analysis together: measured rules for dashboards and reports that management reads in one meeting, in correct Arabic.",
    tools: SHARED.arabic.tools,
    blocks: [
      {
        kind: "text",
        h: "Why design matters to a data analyst",
        body: [
          "I spent four years in design and motion graphics before analytics. The lesson I carried over: a correct number that cannot be read in seconds never reaches the decision.",
          "The Arabic market adds a second problem. The tools are built left to right, flipping the direction is not enough, and every neglected detail shows up as a visible break in front of the director.",
        ],
      },
      {
        kind: "steps",
        h: "Rules I apply on every board",
        items: [
          { t: "One page, one question", d: "The title states the answer or the question, never the table name. What does not answer it leaves." },
          { t: "Time runs left to right", d: "Even in an Arabic interface. A flipped axis makes growth look like decline." },
          { t: "Isolate numbers from text", d: "Signs, percentages and ranges get their own left-to-right run, or +12% and 100–250 read backwards." },
          { t: "Colour has a job", d: "Identity, magnitude or status, never decoration. A status colour never arrives alone: it comes with a word or icon." },
          { t: "A phone is not a small screen", d: "Fewer categories instead of truncation, long names as a list, and tables as four-field cards." },
          { t: "Judge type from the render", d: "Never judge Arabic from PDF text extraction. Judge it from the rendered page." },
        ],
      },
      {
        kind: "compare",
        h: "From trap to rule",
        before: { title: "What I kept seeing", items: ["Flipped brackets in Arabic PowerPoint", "Axis numbers sliding into the plot under RTL", "A trend arrow on a card showing a different number", "A rate over a window that always leans to the worse"] },
        after: { title: "What became a rule", items: ["Every Arabic run tagged ar-SA: a hidden mark is not enough", "A left-to-right chart container inside an Arabic page", "An arrow only on the number it compares", "Remove the biased metric from the comparison instead of explaining it"] },
      },
    ],
    outcomeTitle: "What changed",
    outcome: [
      "Reports read in one meeting, with one source for every number.",
      "A reusable design system instead of starting every report from zero.",
      "Arabic dashboards that directors and contractors read without explanation.",
    ],
  },
];

export const getCases = (lang: Lang) => (lang === "en" ? EN : AR);
export const CASE_SLUGS = AR.map((c) => c.slug);
export const getCase = (lang: Lang, slug: string) => getCases(lang).find((c) => c.slug === slug);
