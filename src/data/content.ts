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
  works: { view: string; fromTraining: string };
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
  chat: { greeting: string; ask: string; status: string; suggestions: string[]; placeholder: string; error: string };
  cv: { back: string; print: string; summary: string; experience: string; skills: string; core: string; tech: string; certs: string; languages: string; courses: string };
};

export type Content = {
  lang: Lang;
  profile: typeof ar.profile;
  stats: typeof ar.stats;
  facts: string[];
  experience: typeof ar.experience;
  skills: typeof ar.skills;
  certifications: typeof ar.certifications;
  courses: typeof ar.courses;
  languages: typeof ar.languages;
  sections: Section[];
  disciplines: typeof ar.disciplines;
  ui: UI;
};

// ───────────────────────── واجهة عربية ─────────────────────────
const AR_UI: UI = {
  dir: "rtl",
  toggle: "EN",
  nav: {
    about: "نبذة", experience: "الخبرة", analysis: "التحليل", design: "التصاميم",
    automation: "الأتمتة", training: "التدريب", credentials: "الشهادات",
    startProject: "ابدأ مشروعاً", pdf: "PDF ⤓", cvMobile: "السيرة الذاتية · طباعة PDF ⤓",
  },
  hero: {
    badge: "متاح للعمل الحر والاستشارات", iAm: "أنا",
    ctaWork: "استعرض أعمالي", ctaContact: "تواصل معي", ctaCv: "السيرة الذاتية ⤓",
    cardTop: "خبير Power BI", cardSub: "CAPM® · محلل أعمال وبيانات",
  },
  sec: {
    about: "نبذة عنّي", experience: "الخبرة العملية", skills: "المهارات",
    credentials: "الشهادات واللغات",
  },
  works: { view: "عرض ⤢", fromTraining: "📸 من ميدان التدريب" },
  skills: { core: "المهارات الأساسية", technical: "المهارات التقنية" },
  creds: {
    courses: "الدورات التدريبية", coursesCount: (n) => `(${n} دورات)`,
    viewCert: "عرض الشهادة ↗", languages: "اللغات",
  },
  disciplines: {
    title: "خمسة تخصّصات · نتيجة واحدة متكاملة",
    sub: "كل مشروع يُبنى حول مشكلة عمل واضحة — لا حول ما هو رائج. نتخصّص في خمس قدرات تُنتج عائداً قابلاً للقياس.",
  },
  contact: {
    title: "عندك مشروع في بالك؟",
    sub: "لوحة تحليل، تقرير تنفيذي, نظام أتمتة, أو تأهيل فريقك — لنبدأ الحوار الآن.",
    sendTitle: "راسلني مباشرة", nameLabel: "الاسم", namePh: "اسمك الكريم",
    msgLabel: "رسالتك", msgPh: "اكتب باختصار عن مشروعك أو طلبك…",
    send: "إرسال عبر واتساب →",
    hint: "يفتح واتساب برسالتك جاهزة — يعمل على الجوال والكمبيوتر.",
    copy: "نسخ", copied: "تم ✓",
    waText: (name, msg) => `السلام عليكم، أنا ${name || "—"}.\n${msg || "حابب أتواصل بخصوص مشروع."}`,
    rows: { phone: "جوال / واتساب", email: "البريد الإلكتروني", linkedin: "لينكدإن" },
    footer: "صُمّم وبُرمج بـ Next.js وذكاء Claude.",
  },
  chat: {
    greeting: "أهلاً 👋 أنا المساعد الذكي لأحمد. اسألني أي شيء عن أعماله، خبراته، أو كيف يقدر يساعدك.",
    ask: "اسأل عن أحمد", status: "مساعد ذكي · رد فوري",
    suggestions: ["إيش بيشتغل أحمد بالضبط؟", "وريني أعمال تحليل البيانات", "تقدر تبنيلي لوحة تحكم؟"],
    placeholder: "اكتب سؤالك…", error: "عذراً، تعذّر الوصول للخادم. راسلني على ",
  },
  cv: {
    back: "← رجوع للموقع", print: "تحميل / طباعة PDF ⤓",
    summary: "الملخص المهني", experience: "الخبرة العملية", skills: "المهارات",
    core: "المهارات الأساسية", tech: "المهارات التقنية", certs: "الشهادات",
    languages: "اللغات", courses: "الدورات التدريبية",
  },
};

// ───────────────────────── واجهة إنجليزية ─────────────────────────
const EN_UI: UI = {
  dir: "ltr",
  toggle: "عربي",
  nav: {
    about: "About", experience: "Experience", analysis: "Analytics", design: "Design",
    automation: "Automation", training: "Training", credentials: "Certificates",
    startProject: "Start a project", pdf: "PDF ⤓", cvMobile: "Resume · Print PDF ⤓",
  },
  hero: {
    badge: "Available for freelance & consulting", iAm: "I'm",
    ctaWork: "View my work", ctaContact: "Get in touch", ctaCv: "Resume ⤓",
    cardTop: "Power BI Expert", cardSub: "CAPM® · Business & Data Analyst",
  },
  sec: {
    about: "About me", experience: "Experience", skills: "Skills",
    credentials: "Certificates & Languages",
  },
  works: { view: "View ⤢", fromTraining: "📸 From the training field" },
  skills: { core: "Core skills", technical: "Technical skills" },
  creds: {
    courses: "Courses", coursesCount: (n) => `(${n} courses)`,
    viewCert: "View certificate ↗", languages: "Languages",
  },
  disciplines: {
    title: "Five disciplines · one integrated outcome",
    sub: "Every engagement is scoped around a clear business problem — not what's trendy. Five capabilities that consistently produce measurable ROI.",
  },
  contact: {
    title: "Have a project in mind?",
    sub: "A dashboard, an executive report, an automation system, or training your team — let's start the conversation.",
    sendTitle: "Message me directly", nameLabel: "Name", namePh: "Your name",
    msgLabel: "Your message", msgPh: "Briefly describe your project or request…",
    send: "Send via WhatsApp →",
    hint: "Opens WhatsApp with your message ready — works on mobile and desktop.",
    copy: "Copy", copied: "Done ✓",
    waText: (name, msg) => `Hello, I'm ${name || "—"}.\n${msg || "I'd like to get in touch about a project."}`,
    rows: { phone: "Mobile / WhatsApp", email: "Email", linkedin: "LinkedIn" },
    footer: "Designed & built with Next.js and Claude.",
  },
  chat: {
    greeting: "Hi 👋 I'm Ahmed's AI assistant. Ask me anything about his work, experience, or how he can help you.",
    ask: "Ask about Ahmed", status: "AI assistant · instant",
    suggestions: ["What does Ahmed do exactly?", "Show me data analysis work", "Can you build me a dashboard?"],
    placeholder: "Type your question…", error: "Sorry, couldn't reach the server. Email me at ",
  },
  cv: {
    back: "← Back to site", print: "Download / Print PDF ⤓",
    summary: "Professional Summary", experience: "Experience", skills: "Skills",
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
  summary:
    "Business Analyst focused on data analysis, administrative reporting, dashboard design, and workflow automation to improve efficiency across departments. Experienced in organizing operational data, building reports, designing interactive interfaces, and connecting tools and systems into automated workflows that support decision-making and reduce manual work.",
  bio: "I'm Ahmed Mahmoud Swid, a Business & Data Analyst at Riyadh Municipality with 5+ years of practical experience and a certified Power BI expert. I specialize in operational data analysis, administrative reporting, dashboard design (Power BI), and process automation with n8n. I've trained and mentored 150+ employees in a government entity, and I hold the CAPM project-management certification. I turn raw data into measurable decisions.",
};

const EN_STATS = [
  { value: "+5", label: "Years experience" },
  { value: "+150", label: "Professionals trained" },
  { value: "+28K", label: "Records analyzed" },
  { value: "CAPM", label: "Certified PM (PMI)" },
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
    "Analyze operational and administrative data and turn it into clear reports that support decision-making.",
    "Prepare periodic reports and performance indicators for management review.",
    "Design dashboards that present data in a clear, professional, actionable format.",
    "Clean, organize, and validate data before reporting and analysis.",
    "Develop automation ideas and workflow solutions to reduce manual processes.",
    "Design interfaces and websites that present information in a simple, user-friendly way.",
    "Build monitoring and analysis models for departments, requests, and operations.",
    "Work with teams to understand needs and translate them into actionable requirements.",
  ],
};

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
  { title: "Executive Analytics", desc: "Power BI dashboards and KPIs ready for decision-making.", icon: "◆" },
  { title: "Intelligent Automation", desc: "Connect your systems and automate operations with n8n and Claude.", icon: "⚡" },
  { title: "Cloud Platforms", desc: "Build custom SaaS platforms on Next.js and Supabase.", icon: "❖" },
  { title: "Workforce Enablement", desc: "Practical training paths that build real capability for your team.", icon: "❂" },
  { title: "Strategic Reporting", desc: "Boardroom-grade reports and infographics.", icon: "✦" },
];

// أقسام الأعمال بالإنجليزية (نفس الصور)
const EN_SECTIONS: Section[] = [
  {
    id: "design", name: "Design", sub: "Executive reports, infographics, and polished visual identities",
    icon: "✦", layout: "gallery",
    items: [
      { title: "Locations & Routes Report — Bridge S7", desc: "End-to-end report design for bridge relocation and storage: cover, content, and management mechanisms in official identity.", image: "/works/design/bridge-s7.jpg", tags: ["Report Design", "Layout", "InDesign"] },
      { title: "RASI Matrix in Governance", desc: "A simplified visual guide for defining responsibilities and accountability — PMO, North Sector.", image: "/works/design/rasi.jpg", tags: ["Governance", "Infographic"] },
      { title: "Challenges & Actions Presentation", desc: "Report design presenting operational challenges and solutions — Riyadh Municipality.", image: "/works/design/challenges.jpg", tags: ["Report", "Infographic"] },
      { title: "Al-Thumama Bridge S10 Report", desc: "Visual documentation of bridge dismantling, relocation and storage — full official identity.", image: "/works/design/thumama-bridge.jpg", tags: ["Design", "Project Docs"] },
    ],
  },
  {
    id: "analysis", name: "Data Analytics", sub: "Interactive Power BI dashboards and executive KPIs for Riyadh Municipality",
    icon: "◆", layout: "gallery",
    items: [
      { title: "North Sector Information Board", desc: "Main complaints dashboard: 26,229 complaints, completion (94.6%) and execution (99.8%) KPIs, map and breakdowns.", image: "/works/analysis/north-complaints.jpg", tags: ["Power BI", "DAX", "KPIs"] },
      { title: "940 Complaints — Lighting Maintenance", desc: "Multiple interactive dashboards analyzing lighting complaints by zone, district, and key indicators.", image: "/works/analysis/lighting-940.jpg", tags: ["Power BI", "Analysis"] },
      { title: "Complaints Dashboard — Tablet View", desc: "Complaints dashboard (South Sector) with a tablet-ready UX for real-time monitoring.", image: "/works/analysis/complaints-tablet.jpg", tags: ["Dashboard", "UX"] },
      { title: "Localization Performance Indicator", desc: "Analytical infographic of localization rates across 5 projects, 129 technical staff, and 10 nationalities.", image: "/works/analysis/localization-pro.jpg", tags: ["Infographic", "Analysis"] },
      { title: "Annual Executive Report", desc: "Executive infographic summarizing KPIs: 2,240 employees, 1,190 equipment, and completion levels.", image: "/works/analysis/exec-report.jpg", tags: ["Executive Report", "Infographic"] },
      { title: "Central Information Hub", desc: "Interactive navigation linking parks, roads, lighting, transactions, and projects in one place.", image: "/works/analysis/north-hub.jpg", tags: ["Dashboard", "UX", "Design"] },
      { title: "Lighting Assets Analysis", desc: "Lighting assets dashboard: 340 stations, 50,502 poles, 2.7M meters of cable, with a geographic map.", image: "/works/analysis/lighting-assets.jpg", tags: ["Power BI", "Assets", "Maps"] },
      { title: "Parks Assets Analysis", desc: "Parks assets dashboard: 469 parks, trees, pumps and wells, with geographic distribution and per-district KPIs.", image: "/works/analysis/gardens-assets.jpg", tags: ["Power BI", "Assets", "Analysis"] },
    ],
  },
  {
    id: "automation", name: "Automation & AI", sub: "Smart systems and bots that connect your data and run automatically",
    icon: "⚡", layout: "cards",
    items: [
      { title: "North Sector Enterprise System", desc: "An integrated platform for Riyadh Municipality: 8 analytics dashboards + self-serve Excel ingestion + a Claude analytical assistant on Telegram + RBAC + scheduled email reports and alerts.", tags: ["Next.js", "Claude", "Supabase", "n8n", "RBAC"], status: "Live", link: "https://north-infrastructure.vercel.app", linkLabel: "Visit system" },
      { title: "Restaurant SaaS AI Bot", desc: "An AI assistant on Telegram for restaurants: takes orders in Arabic and English, answers customers, and connects to an admin dashboard.", tags: ["Python", "Telegram", "Gemini", "Supabase"], status: "In progress" },
      { title: "TASI Personal Trading System", desc: "A trading-decision system for the Saudi market: daily EODHD data import, technical indicators, and a signal engine.", tags: ["Python", "EODHD", "Pandas", "Supabase"], status: "In progress" },
      { title: "n8n Automation Pipelines", desc: "Automation workflows: weekly executive reports, daily risk alerts, and multi-domain smart bots — all running automatically.", tags: ["n8n", "Automation", "Claude", "Gmail"], status: "Running" },
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
  skills: ar.skills, certifications: ar.certifications, courses: ar.courses,
  languages: ar.languages, sections: ar.sections, disciplines: ar.disciplines, ui: AR_UI,
};

const EN_CONTENT: Content = {
  lang: "en",
  profile: EN_PROFILE, stats: EN_STATS, facts: EN_FACTS, experience: EN_EXPERIENCE,
  skills: EN_SKILLS, certifications: EN_CERTS, courses: EN_COURSES,
  languages: EN_LANGUAGES, sections: EN_SECTIONS, disciplines: EN_DISCIPLINES, ui: EN_UI,
};

export function getContent(lang: Lang): Content {
  return lang === "en" ? EN_CONTENT : AR_CONTENT;
}
