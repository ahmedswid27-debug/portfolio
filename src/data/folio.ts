/**
 * محتوى الصفحة الرئيسية. الهوية الداكنة الذهبية نفسها في صفحة الورش (2026-10-30).
 *
 * قاعدة النصوص (طلب المالك، وتكررت): عنوان اسمي بسيط من كلمة إلى ثلاث، بلا مخاطبة للزائر
 * ولا شعارات ولا فقرات شرح. الوصف سطر قصير، ولا يكتب إلا إذا أضاف معلومة.
 *
 * القيد 3: لا رقم من بيانات العمل هنا. الأرقام حقائق شخصية، واللوحات توضيحية وموسومة.
 * القيد 4: لا «مدرّب» ولا «متدرّب»، بل «نفذ ورشة» و«مشارك».
 */
export type Lang = "ar" | "en";

export type Pic = { src: string; title: string; note?: string; w: number; h: number };

export type Folio = {
  dir: "rtl" | "ltr";
  lang: Lang;
  other: { href: string; label: string };
  nav: { id: string; label: string }[];
  cv: { label: string; href: string };
  linkedin: string;
  hero: { badge: string; name: string; lead: string };
  stats: { value: string; label: string }[];
  about: { title: string; text: string; facts: { k: string; v: string }[] };
  fields: { title: string; items: { t: string; d: string; tools: string; link: { id: string; label: string } }[] };
  boards: { title: string; items: Pic[]; notice: string };
  live: { title: string };
  method: { title: string; output: string; steps: { t: string; d: string; out: string }[] };
  cases: { title: string; more: string };
  platform: { title: string; org: string; points: string[]; more: string; notice: string; alt: string };
  lessons: { title: string; labels: { wrong: string; rule: string }; items: { t: string; wrong: string; rule: string }[] };
  reports: { title: string; items: Pic[] };
  workshops: { title: string; numbers: { value: string; label: string }[]; photos: Pic[]; link: { href: string; label: string } };
  experience: { title: string; jobs: { period: string; role: string; org: string; points: string[] }[] };
  skills: { title: string; groups: { title: string; items: string[] }[] };
  creds: {
    title: string;
    capm: { title: string; meta: string; img: string; href: string };
    coursesTitle: string;
    courses: { name: string; href: string }[];
    eduTitle: string;
    edu: string;
    langTitle: string;
    langs: { name: string; level: string }[];
  };
  contact: { title: string; phone: string; email: string; linkedin: string; cv: string; download: string; phoneValue: string; phoneHref: string; emailValue: string };
  footer: string;
  zoom: string;
  closeLabel: string;
};

const LINKEDIN = "https://www.linkedin.com/in/ahmed-mahmoud-95aa1b2a5";
const BOARD_W = 1600, BOARD_H = 1000;
const COURSES = [
  { name: "Complete Guide to Power BI for Data Analysts", href: "/certs/courses/powerbi-data-analysts.pdf" },
  { name: "Learning Power BI Desktop", href: "/certs/courses/powerbi-desktop.pdf" },
  { name: "Hands-On AI: Automate Data Analytics & Reporting with n8n", href: "/certs/courses/n8n-data-analytics.pdf" },
  { name: "Build AI Agents and Automate Workflows with n8n", href: "/certs/courses/n8n-agents-workflows.pdf" },
  { name: "The Non-Technical Skills of Effective Data Scientists", href: "/certs/courses/data-scientist-skills.pdf" },
];

const AR: Folio = {
  dir: "rtl",
  lang: "ar",
  other: { href: "/en", label: "EN" },
  nav: [
    { id: "fields", label: "المجالات" },
    { id: "boards", label: "اللوحات" },
    { id: "live", label: "اللوحة التفاعلية" },
    { id: "cases", label: "دراسات الحالة" },
    { id: "reports", label: "التقارير" },
    { id: "workshops", label: "الورش" },
    { id: "experience", label: "الخبرة" },
    { id: "contact", label: "التواصل" },
  ],
  cv: { label: "السيرة الذاتية", href: "/cv/Ahmed-Mahmoud-Swid-CV-ar.pdf" },
  linkedin: LINKEDIN,
  hero: {
    badge: "خبير Power BI",
    name: "أحمد محمود سويد",
    lead: "محلل بيانات وأعمال في مشاريع أمانة منطقة الرياض. تحليل البيانات والأتمتة والتصميم.",
  },
  stats: [
    { value: "9", label: "سنوات خبرة" },
    { value: "+4", label: "سنوات في البيانات" },
    { value: "+150", label: "مشارك في الورش" },
    { value: "+360", label: "ساعة تنفيذ" },
  ],
  about: {
    title: "نبذة",
    text: "أعمل منذ ديسمبر 2021 على تحويل بيانات التشغيل إلى لوحات وتقارير تعتمد عليها الإدارة. وقبلها أربع سنوات في التصميم وإدارة تنفيذ المشاريع.",
    facts: [
      { k: "التخصص", v: "Power BI وتحليل البيانات والأعمال" },
      { k: "الأدوات", v: "DAX, Power Query, SQL, Python, n8n" },
      { k: "الشهادة", v: "CAPM من معهد إدارة المشاريع" },
      { k: "الموقع", v: "الرياض" },
    ],
  },
  fields: {
    title: "مجالات العمل",
    items: [
      {
        t: "Power BI وتحليل البيانات",
        d: "نمذجة البيانات، وبناء اللوحات، وتعريف المؤشرات، من المصدر إلى تقرير تقرؤه الإدارة.",
        tools: "Power BI, DAX, Power Query, SQL, Excel",
        link: { id: "boards", label: "اللوحات" },
      },
      {
        t: "الأتمتة وبناء الأنظمة",
        d: "ربط الأنظمة، وأتمتة التقارير والتنبيهات، وبناء منصات وتطبيقات تشغيلية.",
        tools: "n8n, PostgreSQL, Next.js, Python, APIs",
        link: { id: "platform", label: "المنصة التشغيلية" },
      },
      {
        t: "التصميم",
        d: "تصميم التقارير الإدارية والعروض التقديمية والمواد المرئية.",
        tools: "InDesign, Illustrator, Photoshop, After Effects, Figma",
        link: { id: "reports", label: "التقارير" },
      },
    ],
  },
  boards: {
    title: "لوحات Power BI",
    notice: "بيانات توضيحية",
    items: [
      { src: "/works/illustrative/board-2.png", title: "تحليل البلاغات", w: BOARD_W, h: BOARD_H },
      { src: "/works/illustrative/board-1.png", title: "متابعة المشاريع", w: BOARD_W, h: BOARD_H },
      { src: "/works/illustrative/board-3.png", title: "التدفق المالي", w: BOARD_W, h: BOARD_H },
      { src: "/works/illustrative/board-4.png", title: "أداء الأسطول", w: BOARD_W, h: BOARD_H },
    ],
  },
  live: { title: "اللوحة التفاعلية" },
  method: {
    title: "منهج العمل",
    output: "المخرج",
    steps: [
      { t: "المتطلبات", d: "تحديد القرار وتعريف المؤشرات.", out: "قاموس المؤشرات" },
      { t: "البيانات", d: "فحص المصدر وجودته.", out: "تقرير الجودة" },
      { t: "النموذج", d: "نموذج نجمي وتنظيف في Power Query.", out: "نموذج موثق" },
      { t: "التصميم", d: "صفحة لكل سؤال، والأهم أولا.", out: "لوحة معتمدة" },
      { t: "التشغيل", d: "أتمتة التحديث والتحقق والتسليم.", out: "تقرير دوري" },
    ],
  },
  cases: { title: "دراسات الحالة", more: "التفاصيل" },
  platform: {
    title: "المنصة التشغيلية",
    org: "مشاريع أمانة منطقة الرياض",
    points: ["رفع الملفات والتحقق منها آليا", "لوحة لجودة البيانات", "خريطة ميدانية للبلاغات", "مؤشرات أداء العقود", "تقرير تنفيذي يومي", "مساعد تحليلي"],
    more: "التفاصيل",
    notice: "صور توضيحية",
    alt: "لوحتان توضيحيتان على جهازين لوحيين",
  },
  lessons: {
    title: "دروس عملية",
    labels: { wrong: "الخطأ", rule: "القاعدة" },
    items: [
      { t: "المقارنة السنوية", wrong: "مقارنة سنة جارية بسنة كاملة.", rule: "المقارنة بالأشهر نفسها حتى آخر شهر مكتمل." },
      { t: "نسبة الرضا", wrong: "احتساب غير المقيم راضيا.", rule: "المقام هو من قيم فعلا." },
      { t: "الصفر الصامت", wrong: "مدخل غير معروف يعيد صفرا.", rule: "المدخل المجهول يعيد خطأ صريحا." },
      { t: "حداثة البيانات", wrong: "قياس العمر بوقت الرفع.", rule: "العمر هو الفترة التي تغطيها البيانات." },
      { t: "نقاء القياس", wrong: "عد الحسابات الآلية ضمن الاستخدام.", rule: "الاستبعاد عند القراءة مع ذكر المستبعد." },
      { t: "المنطقة الزمنية", wrong: "تحويل وقت مخزن بالتوقيت المحلي.", rule: "إثبات التوقيت من الملف قبل أي تحويل." },
    ],
  },
  reports: {
    title: "التقارير الإدارية",
    items: [
      { src: "/works/reports/annual-2024.jpg", title: "التقرير السنوي 2024", w: 989, h: 1400 },
      { src: "/works/reports/thumama-bridge.jpg", title: "تقرير إنهاء أعمال جسر الثمامة", w: 1400, h: 787 },
      { src: "/works/reports/rasi-governance.jpg", title: "مصفوفة RASI في الحوكمة", w: 1400, h: 787 },
      { src: "/works/reports/west-safety.jpg", title: "تقرير سلامة شبكة الإنارة", w: 1400, h: 787 },
      { src: "/works/reports/wall-lamps.jpg", title: "دراسة فنية للفوانيس الجدارية", w: 1400, h: 787 },
      { src: "/works/reports/challenges.jpg", title: "التحديات والإجراءات المتخذة", w: 1400, h: 877 },
      { src: "/works/reports/response-support.jpg", title: "تقرير إدارة الاستجابة والإسناد", w: 989, h: 1400 },
      { src: "/works/reports/digitization.jpg", title: "فوائد الرقمنة", w: 989, h: 1400 },
    ],
  },
  workshops: {
    title: "ورش Power BI",
    numbers: [
      { value: "+150", label: "مشارك" },
      { value: "+360", label: "ساعة تنفيذ" },
      { value: "52", label: "صفحة مادة" },
    ],
    photos: [
      { src: "/works/training/presenting.jpg", title: "شرح على لوحة حية", w: 719, h: 408 },
      { src: "/training/video/hall.jpg", title: "ورشة قطاع الغرب", w: 854, h: 484 },
      { src: "/works/training/podium.jpg", title: "قاعة الورشة", w: 428, h: 536 },
      { src: "/works/training/room-powerbi.jpg", title: "التطبيق العملي", w: 431, h: 545 },
      { src: "/works/training/banner-powerbi.jpg", title: "لافتة الورشة", w: 428, h: 536 },
      { src: "/works/training/certificates.jpg", title: "توقيع الشهادات", w: 428, h: 536 },
    ],
    link: { href: "/training", label: "محاور الورش" },
  },
  experience: {
    title: "الخبرة",
    jobs: [
      {
        period: "ديسمبر 2021 حتى الآن",
        role: "محلل أعمال وبيانات",
        org: "شركة الشثري، مشاريع أمانة منطقة الرياض",
        points: [
          "بناء منصة متابعة عقود صيانة الإنارة لقطاع الوسط.",
          "أتمتة التقرير التنفيذي اليومي.",
          "تصنيف أصول الإنارة بدرجات خطورة من القياسات.",
          "تحليل البلاغات على النطاقات الجغرافية.",
          "بناء منصة تحليلية لقطاع الشمال.",
          "لوحات أداء بمنهج القيمة المكتسبة.",
        ],
      },
      {
        period: "2017 حتى 2021",
        role: "محلل أعمال ومصمم",
        org: "Mihab Advertising & Marketing",
        points: ["هويات بصرية وحملات رقمية ومطبوعة.", "مونتاج وموشن جرافيك وإدارة تنفيذ المشاريع."],
      },
    ],
  },
  skills: {
    title: "المهارات",
    groups: [
      { title: "تحليل البيانات", items: ["Power BI", "DAX", "Power Query", "نمذجة البيانات", "SQL", "Excel"] },
      { title: "الأنظمة والأتمتة", items: ["n8n", "PostgreSQL", "Python", "Next.js", "APIs"] },
      { title: "إدارة المشاريع", items: ["مؤشرات الأداء", "القيمة المكتسبة", "التقارير التنفيذية", "جمع المتطلبات"] },
      { title: "التصميم", items: ["Illustrator", "InDesign", "Photoshop", "After Effects", "Figma"] },
    ],
  },
  creds: {
    title: "الشهادات",
    capm: { title: "CAPM، معهد إدارة المشاريع PMI", meta: "سبتمبر 2025 حتى سبتمبر 2028", img: "/certs/capm.png", href: "/certs/capm.pdf" },
    coursesTitle: "دورات LinkedIn Learning",
    courses: COURSES,
    eduTitle: "المؤهل",
    edu: "ليسانس الحقوق، جامعة الزقازيق، 2011",
    langTitle: "اللغات",
    langs: [
      { name: "العربية", level: "اللغة الأم" },
      { name: "الإنجليزية", level: "جيد جدا" },
    ],
  },
  contact: {
    title: "التواصل",
    phone: "الجوال",
    email: "البريد",
    linkedin: "لينكد إن",
    cv: "السيرة الذاتية",
    download: "تحميل PDF",
    phoneValue: "0535919475",
    phoneHref: "tel:+966535919475",
    emailValue: "ahmedswid27@gmail.com",
  },
  footer: "أحمد محمود سويد، الرياض",
  zoom: "تكبير",
  closeLabel: "إغلاق",
};

const EN: Folio = {
  dir: "ltr",
  lang: "en",
  other: { href: "/", label: "عربي" },
  nav: [
    { id: "fields", label: "Fields" },
    { id: "boards", label: "Dashboards" },
    { id: "live", label: "Interactive board" },
    { id: "cases", label: "Case studies" },
    { id: "reports", label: "Reports" },
    { id: "workshops", label: "Workshops" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ],
  cv: { label: "CV", href: "/cv/Ahmed-Mahmoud-Swid-CV-en.pdf" },
  linkedin: LINKEDIN,
  hero: {
    badge: "Power BI Expert",
    name: "Ahmed Mahmoud Swid",
    lead: "Data and business analyst on Riyadh Municipality projects. Data analysis, automation and design.",
  },
  stats: [
    { value: "9", label: "Years of experience" },
    { value: "4+", label: "Years in data" },
    { value: "150+", label: "Workshop participants" },
    { value: "360+", label: "Hours delivered" },
  ],
  about: {
    title: "About",
    text: "Since December 2021 I have turned operational data into dashboards and reports that management relies on. Before that, four years in design and project delivery.",
    facts: [
      { k: "Focus", v: "Power BI, data and business analysis" },
      { k: "Tools", v: "DAX, Power Query, SQL, Python, n8n" },
      { k: "Certification", v: "CAPM, Project Management Institute" },
      { k: "Location", v: "Riyadh" },
    ],
  },
  fields: {
    title: "Fields of work",
    items: [
      {
        t: "Data analysis and Power BI",
        d: "Data modelling, dashboards and KPI definitions, from the source to a report management can read.",
        tools: "Power BI, DAX, Power Query, SQL, Excel",
        link: { id: "boards", label: "Dashboards" },
      },
      {
        t: "Automation and systems",
        d: "System integration, automated reports and alerts, and operational platforms and apps.",
        tools: "n8n, PostgreSQL, Next.js, Python, APIs",
        link: { id: "platform", label: "Operational platform" },
      },
      {
        t: "Design",
        d: "Management reports, presentations and visual materials.",
        tools: "InDesign, Illustrator, Photoshop, After Effects, Figma",
        link: { id: "reports", label: "Reports" },
      },
    ],
  },
  boards: {
    title: "Power BI dashboards",
    notice: "Illustrative data",
    items: [
      { src: "/works/illustrative/board-2.png", title: "Complaints analysis", w: BOARD_W, h: BOARD_H },
      { src: "/works/illustrative/board-1.png", title: "Project tracking", w: BOARD_W, h: BOARD_H },
      { src: "/works/illustrative/board-3.png", title: "Cash flow", w: BOARD_W, h: BOARD_H },
      { src: "/works/illustrative/board-4.png", title: "Fleet performance", w: BOARD_W, h: BOARD_H },
    ],
  },
  live: { title: "Interactive board" },
  method: {
    title: "Method",
    output: "Output",
    steps: [
      { t: "Requirements", d: "Define the decision and the KPIs.", out: "KPI dictionary" },
      { t: "Data", d: "Assess the source and its quality.", out: "Quality report" },
      { t: "Model", d: "Star schema, cleaned in Power Query.", out: "Documented model" },
      { t: "Design", d: "One page per question, key figure first.", out: "Approved board" },
      { t: "Operation", d: "Automated refresh, checks and delivery.", out: "Recurring report" },
    ],
  },
  cases: { title: "Case studies", more: "Details" },
  platform: {
    title: "Operations platform",
    org: "Riyadh Municipality projects",
    points: ["Automated file intake and validation", "Data quality board", "Field map of complaints", "Contract performance KPIs", "Daily executive report", "Analytical assistant"],
    more: "Details",
    notice: "Illustrative images",
    alt: "Two illustrative dashboards on two tablets",
  },
  lessons: {
    title: "Lessons learned",
    labels: { wrong: "Mistake", rule: "Rule" },
    items: [
      { t: "Year-on-year comparison", wrong: "Comparing a running year with a full year.", rule: "Compare the same months, up to the last complete month." },
      { t: "Satisfaction rate", wrong: "Counting unrated reports as satisfied.", rule: "The denominator is those who rated." },
      { t: "Silent zero", wrong: "An unknown input returns zero.", rule: "An unknown input returns an explicit error." },
      { t: "Data freshness", wrong: "Measuring age by upload time.", rule: "Age is the period the data covers." },
      { t: "Clean metrics", wrong: "Counting automated accounts as usage.", rule: "Exclude at read time and report what was excluded." },
      { t: "Time zones", wrong: "Converting a time already stored locally.", rule: "Prove the time zone from the file first." },
    ],
  },
  reports: {
    title: "Management reports",
    items: AR.reports.items.map((r, i) => ({
      ...r,
      title: ["Annual report 2024", "Thumama bridge completion report", "RASI matrix in governance", "Lighting network safety report", "Wall-lamp technical study", "Challenges and actions taken", "Response & support report", "Benefits of digitisation"][i],
    })),
  },
  workshops: {
    title: "Power BI workshops",
    numbers: [
      { value: "150+", label: "Participants" },
      { value: "360+", label: "Hours delivered" },
      { value: "52", label: "Pages of material" },
    ],
    photos: AR.workshops.photos.map((p, i) => ({
      ...p,
      title: ["Live dashboard walkthrough", "West sector workshop", "Workshop hall", "Hands-on practice", "Workshop banner", "Signing certificates"][i],
    })),
    link: { href: "/en/training", label: "Workshop syllabus" },
  },
  experience: {
    title: "Experience",
    jobs: [
      {
        period: "Dec 2021 to present",
        role: "Business & Data Analyst",
        org: "Al-Shathri Company, Riyadh Municipality projects",
        points: [
          "Built a platform tracking street-lighting maintenance contracts.",
          "Automated the daily executive report.",
          "Classified lighting assets into risk tiers from measurements.",
          "Analysed complaints across geographic zones.",
          "Built an analytics platform for the North sector.",
          "Built earned-value performance dashboards.",
        ],
      },
      {
        period: "2017 to 2021",
        role: "Business Analyst & Designer",
        org: "Mihab Advertising & Marketing",
        points: ["Visual identities and digital and print campaigns.", "Video editing, motion graphics and project delivery."],
      },
    ],
  },
  skills: {
    title: "Skills",
    groups: [
      { title: "Data analysis", items: ["Power BI", "DAX", "Power Query", "Data modelling", "SQL", "Excel"] },
      { title: "Systems & automation", items: ["n8n", "PostgreSQL", "Python", "Next.js", "APIs"] },
      { title: "Project management", items: ["KPIs", "Earned value", "Executive reporting", "Requirements"] },
      { title: "Design", items: ["Illustrator", "InDesign", "Photoshop", "After Effects", "Figma"] },
    ],
  },
  creds: {
    title: "Certifications",
    capm: { title: "CAPM, Project Management Institute", meta: "Sep 2025 to Sep 2028", img: "/certs/capm.png", href: "/certs/capm.pdf" },
    coursesTitle: "LinkedIn Learning courses",
    courses: COURSES,
    eduTitle: "Education",
    edu: "Bachelor of Law, Zagazig University, 2011",
    langTitle: "Languages",
    langs: [
      { name: "Arabic", level: "Native" },
      { name: "English", level: "Very good" },
    ],
  },
  contact: {
    title: "Contact",
    phone: "Phone",
    email: "Email",
    linkedin: "LinkedIn",
    cv: "CV",
    download: "Download PDF",
    phoneValue: "+966 53 591 9475",
    phoneHref: "tel:+966535919475",
    emailValue: "ahmedswid27@gmail.com",
  },
  footer: "Ahmed Mahmoud Swid, Riyadh",
  zoom: "Zoom",
  closeLabel: "Close",
};

export const getFolio = (lang: Lang) => (lang === "en" ? EN : AR);
