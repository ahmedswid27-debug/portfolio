// ============================================================
//  محتوى ثنائي اللغة (عربي + إنجليزي).
//  العربي يُعاد استخدامه من profile.ts. الإنجليزي مُعرّف هنا.
// ============================================================
import * as ar from "./profile";
import type { Section } from "./profile";

export type Lang = "ar" | "en";

export type UI = {
  dir: "rtl" | "ltr";
  toggle: string;
  groups: { main: string; work: string; creds: string; reach: string };
  nav: Record<string, string> & { startProject: string; pdf: string; cvMobile: string };
  hero: {
    badge: string;
    iAm: string;
    ctaWork: string;
    ctaContact: string;
    ctaCv: string;
    cardTop: string;
    cardSub: string;
  };
  sec: Record<string, string>;
  works: { view: string; fromTraining: string; caseStudy: string; role: string; whatItDoes: string; moreShots: string };
  skills: { core: string; technical: string };
  creds: { courses: string; coursesCount: (n: number) => string; viewCert: string; languages: string };
  disciplines: { title: string; sub: string };
  contact: {
    title: string; sub: string; sendTitle: string; nameLabel: string; namePh: string;
    msgLabel: string; msgPh: string; send: string; hint: string; copy: string; copied: string;
    waText: (name: string, msg: string) => string;
    rows: { phone: string; email: string; linkedin: string };
    footer: string;
  };
  chat: { greeting: string; ask: string; fab: string; status: string; suggestions: string[]; placeholder: string; error: string };
  cv: { back: string; print: string; summary: string; experience: string; projects: string; skills: string; core: string; tech: string; certs: string; languages: string; courses: string };
};

export type Content = {
  lang: Lang;
  profile: typeof ar.profile;
  stats: typeof ar.stats;
  facts: string[];
  experience: typeof ar.experience;
  skills: typeof ar.skills;
  cvSkills: string[];
  skillGroups: typeof ar.skillGroups;
  certifications: typeof ar.certifications;
  courses: typeof ar.courses;
  languages: typeof ar.languages;
  keyProjects: typeof ar.keyProjects;
  sections: Section[];
  disciplines: typeof ar.disciplines;
  ui: UI;
};

// ───────────────────────── واجهة عربية ─────────────────────────
const AR_UI: UI = {
  dir: "rtl",
  toggle: "EN",
  groups: { main: "الرئيسية", work: "الأعمال", creds: "المؤهلات", reach: "التواصل" },
  nav: {
    about: "الملخّص المهني", experience: "الخبرة", analysis: "تحليل البيانات", design: "التصاميم",
    automation: "الأنظمة والأتمتة", training: "التدريب", credentials: "الشهادات",
    skills: "المهارات", reports: "التقارير", disciplines: "منهج العمل", contact: "التواصل",
    startProject: "تواصل", pdf: "السيرة الذاتية ⤓", cvMobile: "السيرة الذاتية · طباعة PDF ⤓",
  },
  hero: {
    badge: "مفتوح للفرص", iAm: "",
    ctaWork: "نماذج للأعمال", ctaContact: "تواصل معي", ctaCv: "السيرة الذاتية ⤓",
    cardTop: "خبير Power BI", cardSub: "CAPM® · محلل أعمال وبيانات",
  },
  sec: {
    about: "الملخّص المهني", experience: "الخبرة العملية", skills: "المهارات",
    credentials: "الشهادات واللغات",
  },
  works: {
    view: "تكبير", fromTraining: "من التدريب", caseStudy: "دراسة حالة",
    role: "الدور:", whatItDoes: "ما يفعله النظام", moreShots: "",
  },
  skills: { core: "المهارات الأساسية", technical: "المهارات التقنية" },
  creds: {
    courses: "الدورات التدريبية", coursesCount: (n) => `(${n} دورات)`,
    viewCert: "عرض الشهادة ↗", languages: "اللغات",
  },
  disciplines: {
    title: "كيف أشتغل",
    sub: "الترتيب الذي أتبعه في كل عمل — من السؤال الذي تسأله الإدارة إلى القرار الذي تُتَّخذ عليه.",
  },
  contact: {
    title: "للتواصل",
    sub: "مفتوح للفرص في تحليل الأعمال والبيانات وبناء أنظمة القرار.",
    sendTitle: "راسلني مباشرة", nameLabel: "الاسم", namePh: "الاسم",
    msgLabel: "الرسالة", msgPh: "اكتب باختصار…",
    send: "إرسال عبر واتساب →",
    hint: "يفتح واتساب برسالتك جاهزة.",
    copy: "نسخ", copied: "تم ✓",
    waText: (name, msg) => `السلام عليكم، أنا ${name || "—"}.\n${msg || "أودّ التواصل."}`,
    rows: { phone: "جوال / واتساب", email: "البريد الإلكتروني", linkedin: "لينكدإن" },
    footer: "",
  },
  chat: {
    greeting: "اسألني عن أعمال أحمد وخبرته — الأنظمة التي بناها، لوحات التحليل، أو التدريب.",
    ask: "اسأل عن أحمد", fab: "اسأل عن أحمد", status: "مساعد ذكي",
    suggestions: ["ما أبرز ما بناه؟", "ما خبرته في Power BI؟", "أرني تحليل المخاطر"],
    placeholder: "اكتب سؤالك…", error: "عذرًا، تعذّر الوصول إلى الخادم. راسلني على ",
  },
  cv: {
    back: "← رجوع للموقع", print: "تحميل / طباعة PDF ⤓",
    summary: "الملخص المهني", experience: "الخبرة العملية", projects: "أبرز المشاريع", skills: "المهارات",
    core: "المهارات الأساسية", tech: "المهارات التقنية", certs: "الشهادات",
    languages: "اللغات", courses: "الدورات التدريبية",
  },
};

// ───────────────────────── واجهة إنجليزية ─────────────────────────
const EN_UI: UI = {
  dir: "ltr",
  toggle: "عربي",
  groups: { main: "Overview", work: "Work", creds: "Credentials", reach: "Contact" },
  nav: {
    about: "Professional Summary", experience: "Experience", analysis: "Data Analytics", design: "Design",
    automation: "Systems & Automation", training: "Training", credentials: "Certificates",
    skills: "Skills", reports: "Reports", disciplines: "How I work", contact: "Contact",
    startProject: "Contact", pdf: "Résumé ⤓", cvMobile: "Resume · Print PDF ⤓",
  },
  hero: {
    badge: "Open to opportunities", iAm: "I'm ",
    ctaWork: "Work samples", ctaContact: "Get in touch", ctaCv: "Resume ⤓",
    cardTop: "Power BI Expert", cardSub: "CAPM® · Business & Data Analyst",
  },
  sec: {
    about: "Professional Summary", experience: "Experience", skills: "Skills",
    credentials: "Certificates & Languages",
  },
  works: {
    view: "Enlarge", fromTraining: "From the training room", caseStudy: "Case study",
    role: "Role:", whatItDoes: "What the system does", moreShots: "",
  },
  skills: { core: "Core skills", technical: "Technical skills" },
  creds: {
    courses: "Courses", coursesCount: (n) => `(${n} courses)`,
    viewCert: "View certificate ↗", languages: "Languages",
  },
  disciplines: {
    title: "How I work",
    sub: "The order I follow on every piece of work — from the question management asks to the decision it rests on.",
  },
  contact: {
    title: "Contact",
    sub: "Open to opportunities in business and data analysis and building decision systems.",
    sendTitle: "Message me directly", nameLabel: "Name", namePh: "Name",
    msgLabel: "Message", msgPh: "Keep it brief…",
    send: "Send via WhatsApp →",
    hint: "Opens WhatsApp with your message ready.",
    copy: "Copy", copied: "Done ✓",
    waText: (name, msg) => `Hello, I'm ${name || "—"}.\n${msg || "I'd like to get in touch."}`,
    rows: { phone: "Mobile / WhatsApp", email: "Email", linkedin: "LinkedIn" },
    footer: "",
  },
  chat: {
    greeting: "Hi 👋 I'm Ahmed's AI assistant. Ask me anything about his work, experience, or how he can help you.",
    ask: "Ask about Ahmed", fab: "Ask about Ahmed", status: "AI assistant · instant",
    suggestions: ["What does Ahmed do exactly?", "Show me data analysis work", "Can you build me a dashboard?"],
    placeholder: "Type your question…", error: "Sorry, couldn't reach the server. Email me at ",
  },
  cv: {
    back: "← Back to site", print: "Download / Print PDF ⤓",
    summary: "Professional Summary", experience: "Experience", projects: "Key Projects", skills: "Skills",
    core: "Core skills", tech: "Technical skills", certs: "Certifications",
    languages: "Languages", courses: "Courses",
  },
};

// ───────────────────────── بيانات إنجليزية ─────────────────────────
const EN_PROFILE = {
  ...ar.profile,
  name: "Ahmed Swid",
  fullName: "Ahmed Mahmoud Swid",
  initials: "AS",
  title: "Business Analyst · Reporting · Dashboard Design · Workflow Automation",
  titleShort: "Business & Data Analyst",
  tagline:
    "I turn raw operational data into clear indicators and decision-ready reports — and build automation that cuts manual effort and speeds delivery.",
  location: "Riyadh, Saudi Arabia",
  // ٥٠–١٠٠ كلمة، بالمصطلحات التي تطابقها أنظمة ATS لوظائف البيانات وذكاء الأعمال.
  cvSummary:
    "Business & Data Analyst with 5+ years at Riyadh Municipality, turning operational data into " +
    "decision-ready dashboards and KPIs. Designed and delivered BI platforms governing SAR 179.3M in " +
    "maintenance contracts, and automated executive reporting end to end — from data cleaning to daily " +
    "delivery with no manual step. Skilled in Power BI, DAX, Power Query, SQL and Excel across data " +
    "modelling, dashboard design and workflow automation. PMI CAPM® certified; trained 150+ staff in " +
    "data analysis and dashboard design.",
  summary:
    "A business and data analyst at Riyadh Municipality. My work starts from a question management asks and " +
    "cannot answer reliably — where complaints are piling up, which contractor is behind, which lighting pole is " +
    "about to cause an accident — and ends with a system that answers it every morning with no human in the loop. " +
    "For the Wasat sector I built a thirty-four-screen platform running SAR 179.3M of maintenance contracts, " +
    "classified 60,658 lighting poles into five risk tiers from resistance and leakage readings, and replaced " +
    "subjective contractor assessment with one objective yardstick. I work in Power BI, DAX and data modelling, " +
    "and build with Next.js, Supabase and n8n when a dashboard alone is not enough. CAPM certified in project " +
    "management, and I have trained 150+ employees in data analysis and dashboard building.",
  bio: "I'm Ahmed Mahmoud Swid, a Business & Data Analyst at Riyadh Municipality with 5+ years of practical experience and a certified Power BI expert. I specialize in operational data analysis, administrative reporting, dashboard design (Power BI), and process automation with n8n. I've trained and mentored 150+ employees in a government entity, and I hold the CAPM project-management certification. I turn raw data into measurable decisions.",
};

const EN_STATS = [
  { value: "+5", label: "Years experience" },
  { value: "SAR 179M", label: "In contracts run by a system I built" },
  { value: "+320", label: "Analytics projects" },
  { value: "+150", label: "Professionals trained" },
];

const EN_FACTS = [
  "5+ years of practical experience at Riyadh Municipality",
  "Certified expert in Power BI and dashboard design",
  "Trained and mentored 150+ employees in a government entity",
  "Proficient across Microsoft Office and Adobe Creative tools",
  "CAPM — Certified Associate in Project Management (PMI)",
];

const EN_EXPERIENCE = {
  role: "Business Analyst",
  org: "Riyadh Municipality",
  period: "5+ years",
  duties: [
    "Built a 34-screen operations platform running SAR 179.3M of street-lighting maintenance contracts for the Wasat sector — from data cleaning to the decision board, as sole analyst, designer, developer and operator.",
    "Automated the seven-page daily executive report so it reaches the director by email and Telegram with no human in the loop, replacing manual preparation every morning.",
    "Replaced subjective contractor assessment with one objective yardstick across eight maintenance contracts: spend rate against elapsed duration, safety score, and deducted penalties.",
    "Ran a risk analysis of the lighting network — 60,658 poles and 445 stations classified into five risk tiers from resistance and leakage readings — so repair priority rests on measurement rather than judgement.",
    "Analysed and geo-mapped 7,709 lighting complaints across eight zones, exposing where they accumulate by district, cause and period.",
    "Built an eight-dashboard analytics platform for the North sector with self-serve Excel ingestion, role-based access, and scheduled reports.",
    "Built earned-value (EVM) project performance boards: schedule and cost performance indices and earned value per contract.",
    "Trained and mentored 150+ employees in data analysis and dashboard building, and delivered an official accredited course.",
  ],
};

const EN_CV_SKILLS: string[] = [
  "Power BI", "DAX", "Power Query", "SQL", "Microsoft Excel (Advanced)",
  "Data Modelling", "ETL & Data Cleaning", "Dashboard Design", "KPI Development",
  "Business Analysis", "Executive Reporting", "Workflow Automation (n8n)",
  "Requirements Gathering", "Data Visualization",
];

const EN_SKILLS = {
  core: [
    "Business Analysis", "Administrative Reporting", "Data Analysis", "Dashboard Design",
    "Workflow Automation", "Process Improvement", "Data Cleaning", "KPI Development",
    "Executive Reporting", "Data-Driven Decision Support",
  ],
  technical: [
    "Microsoft Excel", "Power BI — Certified Expert", "Tableau", "n8n Automation",
    "Supabase", "APIs", "Telegram Bots", "Dashboard Design", "Data Cleaning",
    "Workflow Automation", "Web Design",
  ],
};

const EN_CERTS = [
  {
    title: "CAPM — Certified Associate in Project Management",
    issuer: "Project Management Institute (PMI)",
    meta: "Certificate No. 4183768 · Sep 2025 – 2028",
    image: "/certs/capm.png",
    link: "/certs/capm.pdf",
  },
];

const EN_COURSES = ar.courses.map((c) => ({ ...c }));

const EN_LANGUAGES = [
  { name: "Arabic", level: "Native", pct: 100 },
  { name: "English", level: "Good", pct: 70 },
];

const EN_DISCIPLINES = [
  { title: "1 · The question before the data", desc: "I start from the decision management needs to make, not from the tables that happen to exist. The wrong question yields a beautiful board nobody opens.", icon: "◆" },
  { title: "2 · Cleaning that is documented, not hidden", desc: "I clean at the source and expose what is missing on a data-quality board — so the reader knows the limits of what is in front of them before a decision rests on it.", icon: "❖" },
  { title: "3 · A model built once", desc: "Fact and dimension tables, relationships and DAX measures written once, then serving every later report instead of being recomputed in each file.", icon: "⚡" },
  { title: "4 · A board that reads, not one that unpacks", desc: "A handful of indicators up front, detail behind them. My test is that a director understands the page in ten seconds without explanation.", icon: "❂" },
  { title: "5 · Delivery is automation, not a file", desc: "A report sent by hand dies within a month. I hand over a scheduled path that arrives by email or Telegram and outlives me.", icon: "✦" },
];

// أقسام الأعمال بالإنجليزية (نفس الصور)
const EN_SECTIONS: Section[] = [
  {
    id: "automation", name: "Automation & AI", sub: "Full operational platforms — from data cleaning to the decision board to the report that arrives with no human in the loop.",
    icon: "⚡", layout: "cards",
    items: [
      {
        title: "Wasat Sector Platform — Street-Lighting Maintenance",
        featured: true,
        org: "Riyadh Municipality · General Directorate of Infrastructure",
        role: "Sole analyst, designer, developer and operator",
        desc:
          "An end-to-end operations platform running the street-lighting maintenance contracts of Riyadh's Wasat " +
          "sector. It ingests complaint files, interim payment certificates and monthly contractor reports, cleans " +
          "and reconciles them, then surfaces them across thirty-four analytical screens built around the questions " +
          "management actually asks — where complaints are piling up, which contractor is behind, how much is left " +
          "on each contract. On top sits a decision layer: a schedule performance index per project, one objective " +
          "contractor scorecard, and an executive report that reaches the director every morning with no human in the loop.",
        metrics: [
          { value: "SAR 179.3M", label: "in contracts managed" },
          { value: "7,709", label: "complaints analysed & mapped" },
          { value: "123K", label: "light fixtures tracked" },
          { value: "34", label: "analytical screens" },
        ],
        highlights: [
          "Live field map across eight zones plotting every complaint at its coordinates, with zone clustering, heat map, and time/cause filters.",
          "Contractor performance on one objective yardstick: spend rate against elapsed duration, safety score, and deducted penalties.",
          "Earned-value forecasting (EVM) — a schedule performance index computed per contract.",
          "Self-serve ingestion for four file types with automatic cleaning and validation, plus a data-quality board that exposes gaps before a decision rests on them.",
          "A Claude Sonnet 4.5 analytical assistant on Telegram with conversation memory and eleven query domains — management asks in plain Arabic.",
          "A seven-page executive report delivered daily by email and Telegram to the director, generated straight from database functions.",
          "Full auth and role-based access, installable PWA, Arabic Excel export, and a global search that returns analysis rather than rows.",
        ],
        gallery: [
          { src: "/works/automation/wasat-executive.jpg", caption: "Executive KPIs — contract value, assets, and data freshness" },
          { src: "/works/automation/wasat-map.jpg", caption: "Field map — 7,709 complaints across eight zones" },
          { src: "/works/automation/wasat-inventory.jpg", caption: "Lighting assets — fixtures, poles and stations by zone" },
        ],
        tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Claude", "n8n", "Leaflet", "Recharts", "PWA"],
        status: "In production",
        note: "The system is private and requires sign-in — it holds live operational data. Screenshots are from the production environment and show aggregate indicators only.",
      },
      { title: "North Sector Enterprise System", desc: "An integrated platform for Riyadh Municipality: 8 analytics dashboards + self-serve Excel ingestion + a Claude analytical assistant on Telegram + RBAC + scheduled email reports and alerts.", tags: ["Next.js", "Claude", "Supabase", "n8n", "RBAC"], status: "Internal system", note: "Internal system, sign-in required — not open to the public." },
      { title: "Restaurant SaaS AI Bot", desc: "An AI assistant on Telegram for restaurants: takes orders in Arabic and English, answers customers, and connects to an admin dashboard.", tags: ["Python", "Telegram", "Gemini", "Supabase"], status: "In progress" },
      { title: "TASI Personal Trading System", desc: "A trading-decision system for the Saudi market: daily EODHD data import, technical indicators, and a signal engine.", tags: ["Python", "EODHD", "Pandas", "Supabase"], status: "In progress" },
      { title: "n8n Automation Pipelines", desc: "Automation workflows: weekly executive reports, daily risk alerts, and multi-domain smart bots — all running automatically.", tags: ["n8n", "Automation", "Claude", "Gmail"], status: "Running" },
    ],
  },
  {
    id: "analysis", name: "Data Analytics", sub: "Interactive Power BI dashboards and executive KPIs for Riyadh Municipality",
    icon: "◆", layout: "gallery",
    items: [
      { title: "Risk Analysis — Street-Lighting Network", desc: "Classifies 60,658 lighting poles into five risk tiers from resistance readings and current leakage on the pole body — a preventive-safety tool that says where repair should start.", image: "/works/analysis/risk-lighting.jpg", tags: ["Power BI", "Risk analysis", "Safety"] },
      { title: "Key Milestones — Earned-Value Project Performance", desc: "A financial and delivery board on earned-value method: EV, SPI, CV, SV and BACKLOG, with planned-versus-actual by month plus collection and budget-adherence rates.", image: "/works/analysis/evm-milestones.jpg", tags: ["Power BI", "EVM", "Financial analysis"] },
      { title: "Complaints Analysis — Multi-page Report", desc: "A five-page interactive report with a navigation bar: key milestones, severe complaints, repeats and short-cycle cases — 3,472 complaints analysed by cause, district and station.", image: "/works/analysis/c26-milestones.jpg", tags: ["Power BI", "Interactive report", "UX"] },
      { title: "Complaints Report — Navigation Cover", desc: "A landing page linking the report's five pages — design that makes a report browsable rather than page-flipped.", image: "/works/analysis/c26-cover.jpg", tags: ["Power BI", "Report design", "UX"] },
      { title: "Central Information Hub — North Sector", desc: "An interactive navigation surface linking complaints, assets, transactions and projects in one place.", image: "/works/analysis/central-hub.png", tags: ["Dashboard", "UX", "Design"] },
      { title: "940 Complaints — North Sector", desc: "1,907 complaints with year-on-year and quarterly comparison, a distribution map, and completion and response gauges above 88% and 99%.", image: "/works/analysis/n-complaints940.jpg", tags: ["Power BI", "KPIs", "YoY"] },
      { title: "Cash Flow — North Sector", desc: "Planned versus spent across months: SAR 183.4M planned and 138.5M spent at a 75.5% spend rate, with a rating per project.", image: "/works/analysis/n-cashflow.jpg", tags: ["Power BI", "Financial analysis", "KPIs"] },
      { title: "Lighting Asset Analysis", desc: "57,169 fixtures, 50,502 poles and 340 stations across 2.7 million m² — geographically distributed and ranked by district.", image: "/works/analysis/n-lighting-assets.jpg", tags: ["Power BI", "Assets", "Maps"] },
      { title: "Road Asset Analysis", desc: "76.4 million m² of roads, 8,986 streets and 535 main roads — areas, classifications and district comparison.", image: "/works/analysis/n-roads-assets.jpg", tags: ["Power BI", "Assets", "Analysis"] },
      { title: "Park Asset Analysis", desc: "469 parks, 2,358 trees and 48 restrooms across 762,000 m² — with a map and per-district indicators.", image: "/works/analysis/n-gardens-assets.jpg", tags: ["Power BI", "Assets", "Maps"] },
      { title: "Ain Al-Yamama Reports", desc: "3,383 reports at a 58.4% resolution rate — analysed by authority, district and campaign type with geographic distribution.", image: "/works/analysis/n-ain-alyamama.jpg", tags: ["Power BI", "Reports", "Analysis"] },
      { title: "Transaction Analysis", desc: "1,272 transactions tracked as in-progress, completed and overdue — with monthly completion rates and distribution across departments.", image: "/works/analysis/n-transactions.jpg", tags: ["Power BI", "Tracking", "KPIs"] },
      { title: "Project Analysis — North Sector", desc: "SAR 51M in contract value across lighting, roads and parks, with penalties and spend and delivery rates.", image: "/works/analysis/n-projects.jpg", tags: ["Power BI", "Projects", "Financial analysis"] },
      { title: "Lighting Operations Board", desc: "Operational indicators for lighting maintenance: repeat, electrical and shared complaints, with a distribution map and root-cause analysis.", image: "/works/analysis/lighting-ops.jpg", tags: ["Power BI", "Operations", "Maps"] },
      { title: "South Sector Board", desc: "Operational tracking for the South sector: complaint locations, status, executing unit and completion rates.", image: "/works/analysis/south-sector.jpg", tags: ["Power BI", "Tracking"] },
      { title: "Localization Performance", desc: "An analytical infographic on localization rates across projects, technical staff and nationalities.", image: "/works/analysis/localization-pro.jpg", tags: ["Infographic", "Analysis"] },
      { title: "Global Sales Executive Performance", desc: "A Power BI board: year-on-year comparison, target versus achieved, YoY growth arrows, and a geographic map — illustrative data.", image: "/works/analysis/sales-global.png", tags: ["Power BI", "DAX", "YoY"] },
      { title: "Tablet Dashboard", desc: "A dashboard designed for tablet use for at-a-glance monitoring.", image: "/works/analysis/dashboard-tablet.jpg", tags: ["Dashboard", "UX"] },
    ],
  },
  {
    id: "reports", name: "Reporting & Report Design",
    sub: "Annual and semi-annual reports, project completion reports, and executive infographics — in official identity.",
    icon: "▣", layout: "gallery",
    items: [
      { title: "Annual Report 2024 — Supervision Project", desc: "A full annual report for the operations and maintenance supervision project, from cover to indicators and annexes.", image: "/works/reports/annual-2024.jpg", tags: ["Annual report", "Design", "KPIs"] },
      { title: "Semi-Annual Report", desc: "A half-year summary on one unified indicator board — numbers up front, detail behind them.", image: "/works/reports/semi-annual.jpg", tags: ["Periodic report", "KPIs"] },
      { title: "Thumama S7 Bridge Completion Report", desc: "Full documentation of dismantling, transport and storage: sites, routes and management procedures, in a complete official identity.", image: "/works/reports/thumama-bridge.jpg", tags: ["Project report", "Documentation", "Layout"] },
      { title: "RASI Matrix in Governance", desc: "A simplified visual guide to responsibility and accountability — Project Management Office.", image: "/works/reports/rasi-governance.jpg", tags: ["Governance", "Visual guide"] },
      { title: "Challenges & Actions Taken", desc: "An executive deck tying each challenge to the action taken and its effect — written to be read in a meeting, not at a desk.", image: "/works/reports/challenges.jpg", tags: ["Executive deck", "Tracking"] },
      { title: "Response & Support Department", desc: "A department activity report in one visual identity: indicators, initiatives and achievements.", image: "/works/reports/response-support.jpg", tags: ["Department report", "Visual identity"] },
      { title: "West Riyadh Lighting Network Safety Report", desc: "A technical report on network condition, hazard locations and proposed remedies.", image: "/works/reports/west-safety.jpg", tags: ["Technical report", "Safety"] },
      { title: "Technical Study — Wall Lantern Condition", desc: "A photo-documented comparison across conditions, with a technical recommendation for each.", image: "/works/reports/wall-lamps.jpg", tags: ["Technical study", "Comparison"] },
      { title: "Digitization Benefits Infographic", desc: "An executive infographic on the effect of digitization on procedures and turnaround time.", image: "/works/reports/digitization.jpg", tags: ["Infographic", "Digitization"] },
      { title: "Monthly Performance Indicator", desc: "A one-page monthly indicator board: figures, trend, and comparison with the previous month.", image: "/works/reports/kpi-march.jpg", tags: ["KPIs", "Monthly report"] },
      { title: "BRT Fleet Distribution Indicator", desc: "One-page analysis of fleet distribution across agencies and sectors.", image: "/works/reports/brt-buses.jpg", tags: ["Infographic", "Transport"] },
      { title: "Guidance Signage Rollout", desc: "A visual guide to signage rollout, locations and execution procedures.", image: "/works/reports/signage.jpg", tags: ["Procedure guide", "Infographic"] },
      { title: "National Day 94 Report", desc: "Documentation of municipality activity on National Day, in the official event identity.", image: "/works/reports/national-day.jpg", tags: ["Documentation", "Event identity"] },
    ],
  },
  {
    id: "training", name: "Training & Enablement", sub: "Building real capability in data and automation — trained 150+ employees",
    icon: "❖", layout: "cards",
    items: [
      { title: "Course: Business Analysis with Power BI — Certified Trainer", desc: "Delivered an official training course for Riyadh Municipality (South Sector) staff in business analysis and dashboard building with Power BI.", tags: ["Power BI", "Official Training", "Riyadh Municipality"], status: "Trainer" },
      { title: "Government Workforce Training", desc: "Trained and mentored 150+ employees on data analysis, reporting tools, and dashboards within Riyadh Municipality.", tags: ["+150 trained", "Power BI", "Reporting"], status: "Done" },
      { title: "Learning Roadmap — From Zero to Pro Automation", desc: "A progressive path of 7 skills (JSON, Git, Python, SQL, APIs, n8n, Claude) to build real intelligent systems — with a hands-on project per skill.", tags: ["Learning Path", "9 weeks", "7 skills"], status: "Available" },
      { title: "Data Analysis & Power BI Workshops", desc: "Hands-on workshops to upskill teams in data analysis, dashboard design, and decision-ready reporting.", tags: ["Power BI", "DAX", "Workshops"] },
    ],
    photos: ar.sections.find((s) => s.id === "training")?.photos?.map((p, i) => ({
      src: p.src,
      caption: [
        "Business Analysis with Power BI course — Riyadh Municipality",
        "Delivering dashboard training",
        "A training session for employees",
        "Hands-on Power BI workshop",
        "Hands-on training & mentoring",
        "Accrediting and signing trainee certificates",
      ][i] || p.caption,
    })),
  },
];

// ───────────────────────── التجميع ─────────────────────────
const AR_CONTENT: Content = {
  lang: "ar",
  profile: ar.profile, stats: ar.stats, facts: ar.facts, experience: ar.experience,
  skills: ar.skills, cvSkills: ar.cvSkills, skillGroups: ar.skillGroups, certifications: ar.certifications, courses: ar.courses,
  languages: ar.languages, keyProjects: ar.keyProjects, sections: ar.sections, disciplines: ar.disciplines, ui: AR_UI,
};

const EN_KEY_PROJECTS: typeof ar.keyProjects = [
  {
    name: "Wasat Sector Platform — Street-Lighting Maintenance",
    org: "Riyadh Municipality · General Directorate of Infrastructure",
    line:
      "A 34-screen operations platform running SAR 179.3M of maintenance contracts: automated data cleaning, " +
      "a field map of 7,709 complaints across eight zones, an objective contractor scorecard, EVM forecasting, " +
      "and an analytical assistant plus a daily executive report delivered to the director automatically.",
    stack: "Next.js · TypeScript · Supabase/PostgreSQL · Claude · n8n · Leaflet",
  },
  {
    name: "North Sector Enterprise System",
    org: "Riyadh Municipality",
    line:
      "An 8-dashboard analytics platform with self-serve Excel ingestion, RBAC, a Telegram analytical assistant, " +
      "and scheduled email reports and alerts.",
    stack: "Next.js · Claude · Supabase · n8n · RBAC",
  },
  {
    name: "Arabic Power BI Curriculum",
    org: "Self-authored training material",
    line:
      "A 26-part curriculum built on official Microsoft learning paths and the PL-300 exam guide, produced as " +
      "typeset PDF booklets through a purpose-built print pipeline.",
    stack: "Power BI · PL-300 · Instructional design",
  },
];

const EN_SKILL_GROUPS: typeof ar.skillGroups = [
  {
    title: "Data analysis & modelling",
    proof: "Boards running SAR 179M of contracts, and a risk classification across 60,658 lighting poles.",
    items: ["Power BI — certified expert", "DAX", "Data modelling", "Power Query", "Microsoft Excel", "Tableau"],
    icon: "◆",
  },
  {
    title: "Systems & automation",
    proof: "Two platforms in production across thirty-four screens, plus an assistant and a daily report that run unattended.",
    items: ["Next.js", "TypeScript", "Supabase / PostgreSQL", "n8n", "APIs", "Telegram bots", "Claude API"],
    icon: "⚡",
  },
  {
    title: "Project management & reporting",
    proof: "CAPM certified, earned-value boards across eight contracts, and annual and half-year reports in official identity.",
    items: ["CAPM®", "Earned value (EVM)", "KPIs", "Executive reporting", "Schedules"],
    icon: "❖",
  },
  {
    title: "Governance & data quality",
    proof: "A data-quality board that exposes gaps before a decision, and one objective contractor scorecard.",
    items: ["Business analysis", "Data quality", "Risk analysis", "Process improvement", "RASI matrix"],
    icon: "❂",
  },
];

const EN_CONTENT: Content = {
  lang: "en",
  profile: EN_PROFILE, stats: EN_STATS, facts: EN_FACTS, experience: EN_EXPERIENCE,
  skills: EN_SKILLS, cvSkills: EN_CV_SKILLS, skillGroups: EN_SKILL_GROUPS, certifications: EN_CERTS, courses: EN_COURSES,
  languages: EN_LANGUAGES, keyProjects: EN_KEY_PROJECTS, sections: EN_SECTIONS, disciplines: EN_DISCIPLINES, ui: EN_UI,
};

export function getContent(lang: Lang): Content {
  return lang === "en" ? EN_CONTENT : AR_CONTENT;
}
