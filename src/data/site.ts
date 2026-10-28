/**
 * نص الصفحة الرئيسية بعد إعادة التصميم (2026-10-29) — صفحة لمسؤول التوظيف.
 * كل رقم هنا منقول من `profile.ts` بعد تصحيح 29 أكتوبر؛ لا رقم جديد بلا مصدر.
 * الاتجاه والسبب في `docs/redesign.md`.
 */
export type Lang = "ar" | "en";

type Shot = { src: string; title: string; note: string };

export type Site = {
  dir: "rtl" | "ltr";
  lang: Lang;
  other: { href: string; label: string };
  nav: { id: string; label: string }[];
  cvLabel: string;
  cvHref: string;
  linkedin: string;
  hero: { name: string; role: string; line: string; place: string; cv: string; li: string; shot: { src: string; title: string } };
  proof: { value: string; label: string }[];
  caseStudy: {
    kicker: string;
    title: string;
    lede: string;
    org: string;
    role: string;
    metrics: { value: string; label: string }[];
    points: string[];
    shots: Shot[];
    note: string;
  };
  boards: { title: string; lede: string; items: Shot[]; reportsTitle: string; reports: Shot[] };
  experience: {
    title: string;
    role: string;
    org: string;
    period: string;
    points: string[];
  };
  workshops: {
    title: string;
    lede: string;
    metrics: { value: string; label: string }[];
    photos: Shot[];
    link: string;
    linkLabel: string;
  };
  skills: { title: string; groups: { title: string; proof: string; items: string[] }[] };
  creds: {
    title: string;
    certTitle: string;
    cert: { name: string; meta: string; href: string };
    eduTitle: string;
    edu: string;
    langTitle: string;
    langs: { name: string; level: string }[];
    coursesTitle: string;
    courses: string[];
  };
  contact: {
    title: string;
    lede: string;
    email: string;
    phone: string;
    phoneHref: string;
    labels: { email: string; phone: string; linkedin: string; cv: string };
  };
  footer: string;
};

const LINKEDIN = "https://www.linkedin.com/in/ahmed-mahmoud-95aa1b2a5";

const AR: Site = {
  dir: "rtl",
  lang: "ar",
  other: { href: "/en", label: "English" },
  nav: [
    { id: "work", label: "الأعمال" },
    { id: "experience", label: "الخبرة" },
    { id: "skills", label: "المهارات" },
    { id: "contact", label: "التواصل" },
  ],
  cvLabel: "السيرة الذاتية",
  cvHref: "/cv/Ahmed-Mahmoud-Swid-CV-ar.pdf",
  linkedin: LINKEDIN,
  hero: {
    name: "أحمد محمود سويد",
    role: "خبير Power BI ومحلل بيانات وأعمال",
    line: "أبني لوحات Power BI ومنصات تشغيلية تقرؤها الإدارة كل صباح، من تنظيف البيانات الخام حتى القرار.",
    place: "الرياض، المملكة العربية السعودية",
    cv: "تحميل السيرة الذاتية",
    li: "لينكد إن",
    shot: { src: "/works/analysis/risk-lighting.jpg", title: "لوحة Power BI لتحليل خطورة 60,658 عمود إنارة" },
  },
  proof: [
    { value: "+4", label: "سنوات في مشاريع أمانة منطقة الرياض" },
    { value: "179M", label: "ريال قيمة عقود تديرها منصة بنيتها" },
    { value: "60,658", label: "عمود إنارة مصنّف بدرجة الخطورة" },
    { value: "+150", label: "مشاركاً في ورش Power BI نفّذتُها" },
  ],
  caseStudy: {
    kicker: "دراسة حالة",
    title: "منصة صيانة الإنارة لقطاع الوسط",
    lede:
      "منصة تشغيلية تستقبل ملفات البلاغات والمستخلصات والتقارير الشهرية، وتنظّفها، وتعرضها في أربعٍ وثلاثين شاشة تجيب عن أسئلة الإدارة اليومية: أين تتراكم البلاغات، وأي مشروع متأخر، وكم بقي في كل عقد.",
    org: "مشاريع أمانة منطقة الرياض، الإدارة العامة للبنية التحتية",
    role: "التحليل والتصميم والتطوير والتشغيل",
    metrics: [
      { value: "179.3M", label: "ريال قيمة العقود المُدارة" },
      { value: "7,709", label: "بلاغاً محلّلاً على الخريطة" },
      { value: "123K", label: "فانوس إنارة مرصود" },
      { value: "34", label: "شاشة تحليلية" },
    ],
    points: [
      "خريطة ميدانية لثمانية نطاقات ترسم كل بلاغ بموقعه وسببه وفترته.",
      "مؤشر أداء الجدول لكل عقد بمنهج القيمة المكتسبة.",
      "رفع ذاتي لأربعة أنواع من الملفات، مع تحقق آلي ولوحة لجودة البيانات.",
      "تقرير تنفيذي يومي من سبع صفحات يصل مدير الإدارة بالبريد وتيليجرام دون إعداد يدوي.",
      "مساعد تحليلي يجيب عن أسئلة الإدارة نصّاً من قاعدة البيانات نفسها.",
    ],
    shots: [
      { src: "/works/automation/wasat-executive.jpg", title: "المؤشرات الرئيسية", note: "قيمة العقود والأصول وحداثة البيانات" },
      { src: "/works/automation/wasat-map.jpg", title: "الخريطة الميدانية", note: "7,709 بلاغاً على ثمانية نطاقات" },
      { src: "/works/automation/wasat-inventory.jpg", title: "أصول الإنارة", note: "الفوانيس والأعمدة والمحطات حسب النطاق" },
    ],
    note: "النظام داخلي ويتطلب دخولاً. اللقطات من البيئة الحية وتعرض مؤشرات مجمّعة فقط.",
  },
  boards: {
    title: "لوحات Power BI",
    lede: "مختارات من لوحات تعمل في متابعة التشغيل والعقود والبلاغات. كل لوحة تجيب عن سؤال واحد.",
    items: [
      { src: "/works/analysis/evm-milestones.jpg", title: "أداء المشاريع بالقيمة المكتسبة", note: "EV وSPI وCV والمخطط مقابل الفعلي شهرياً" },
      { src: "/works/analysis/c26-milestones.jpg", title: "تقرير البلاغات متعدد الصفحات", note: "3,472 بلاغاً حسب السبب والحي والمحطة" },
      { src: "/works/analysis/n-complaints940.jpg", title: "بلاغات 940 لقطاع الشمال", note: "1,907 بلاغات بمقارنة سنوية وربعية" },
      { src: "/works/analysis/n-cashflow.jpg", title: "التدفق المالي لقطاع الشمال", note: "183.4 مليون مخطط و138.5 مليون مصروف" },
      { src: "/works/analysis/n-lighting-assets.jpg", title: "أصول الإنارة", note: "57,169 فانوساً و50,502 عمود و340 محطة" },
      { src: "/works/analysis/lighting-ops.jpg", title: "لوحة الإنارة التشغيلية", note: "البلاغات المكررة والكهربائية وتحليل الأسباب" },
      { src: "/works/analysis/n-transactions.jpg", title: "متابعة المعاملات", note: "1,272 معاملة بين الجاري والمكتمل والمتأخر" },
      { src: "/works/analysis/sales-global.png", title: "الأداء التنفيذي للمبيعات", note: "مقارنة سنوية ومستهدف مقابل محقق، ببيانات توضيحية" },
    ],
    reportsTitle: "تقارير تنفيذية",
    reports: [
      { src: "/works/reports/annual-2024.jpg", title: "التقرير السنوي 2024", note: "مشروع الإشراف على التشغيل والصيانة" },
      { src: "/works/reports/semi-annual.jpg", title: "التقرير النصف سنوي", note: "لوحة مؤشرات موحدة" },
      { src: "/works/reports/kpi-march.jpg", title: "مؤشر الأداء الشهري", note: "صفحة واحدة بالاتجاه والمقارنة" },
      { src: "/works/reports/thumama-bridge.jpg", title: "تقرير إنهاء جسر الثمامة", note: "توثيق أعمال الفك والنقل والتخزين" },
      { src: "/works/reports/west-safety.jpg", title: "سلامة شبكة إنارة الغرب", note: "مواضع الخطر والمعالجات" },
      { src: "/works/reports/rasi-governance.jpg", title: "مصفوفة RASI في الحوكمة", note: "دليل بصري للمسؤوليات" },
    ],
  },
  experience: {
    title: "الخبرة",
    role: "محلل أعمال وبيانات",
    org: "شركة الشثري، مشاريع أمانة منطقة الرياض (وكالة التشغيل والصيانة)",
    period: "2022 حتى الآن",
    points: [
      "بناء منصة تشغيلية من 34 شاشة تدير عقود صيانة الإنارة لقطاع الوسط بقيمة 179.3 مليون ريال.",
      "أتمتة التقرير التنفيذي اليومي ليصل مدير الإدارة بالبريد وتيليجرام بدل إعداده يدوياً كل صباح.",
      "تصنيف 60,658 عمود إنارة و445 محطة في خمس درجات خطورة، فصار ترتيب الإصلاح مبنياً على القياس.",
      "تحليل 7,709 بلاغات إنارة ورسمها على ثمانية نطاقات حسب الحي والسبب والفترة.",
      "بناء منصة تحليلية من ثماني لوحات لقطاع الشمال، برفع Excel ذاتي وصلاحيات وتقارير مجدولة.",
      "لوحات أداء مشاريع بمنهج القيمة المكتسبة: مؤشر أداء الجدول والتكلفة لكل عقد.",
    ],
  },
  workshops: {
    title: "ورش Power BI",
    lede: "نفّذتُ ورشاً تطبيقية لمنسوبي الأمانة في قطاعات الغرب والشمال والجنوب. تبدأ الورشة من ملف خام فيه عيوب مقصودة، وتنتهي بتقرير منشور يتحدث بضغطة.",
    metrics: [
      { value: "+150", label: "مشاركاً" },
      { value: "+360", label: "ساعة تنفيذ" },
      { value: "52", label: "صفحة مادة معدّة" },
    ],
    photos: [
      { src: "/training/video/hall.jpg", title: "ورشة تطبيقية", note: "قاعة الورشة" },
      { src: "/works/training/presenting.jpg", title: "الشرح على لوحة حية", note: "من الورشة" },
      { src: "/training/video/teaching.jpg", title: "متابعة المشاركين", note: "من الورشة" },
    ],
    link: "/training",
    linkLabel: "محاور الورش وموادها",
  },
  skills: {
    title: "المهارات",
    groups: [
      {
        title: "تحليل البيانات والنمذجة",
        proof: "لوحات تتابع عقوداً بقيمة 179 مليون ريال، وتصنيف خطورة 60,658 عموداً.",
        items: ["Power BI", "DAX", "Power Query", "نمذجة البيانات", "SQL", "Excel المتقدم"],
      },
      {
        title: "الأنظمة والأتمتة",
        proof: "منصتان تعملان يومياً، وتقرير تنفيذي ومساعد تحليلي بلا تدخل يدوي.",
        items: ["n8n", "Supabase / PostgreSQL", "Python", "Next.js", "APIs"],
      },
      {
        title: "إدارة المشاريع والتقارير",
        proof: "شهادة CAPM، ولوحات قيمة مكتسبة لثمانية عقود، وتقارير سنوية ونصف سنوية.",
        items: ["مؤشرات الأداء", "القيمة المكتسبة EVM", "التقارير التنفيذية", "جمع المتطلبات"],
      },
    ],
  },
  creds: {
    title: "الشهادات والمؤهل",
    certTitle: "شهادة مهنية",
    cert: { name: "CAPM — Certified Associate in Project Management", meta: "معهد إدارة المشاريع PMI، رقم 4183768، من 2025 إلى 2028", href: "/certs/capm.pdf" },
    eduTitle: "المؤهل الدراسي",
    edu: "ليسانس الحقوق، جامعة الزقازيق، 2011",
    langTitle: "اللغات",
    langs: [
      { name: "العربية", level: "اللغة الأم" },
      { name: "الإنجليزية", level: "جيد" },
    ],
    coursesTitle: "دورات",
    courses: [
      "Complete Guide to Power BI for Data Analysts",
      "Learning Power BI Desktop",
      "Hands-On AI: Automate Data Analytics & Reporting with n8n",
      "The Non-Technical Skills of Effective Data Scientists",
    ],
  },
  contact: {
    title: "التواصل",
    lede: "للتواصل بخصوص وظيفة أو مقابلة.",
    email: "ahmedswid27@gmail.com",
    phone: "0535919475",
    phoneHref: "tel:+966535919475",
    labels: { email: "البريد", phone: "الجوال", linkedin: "لينكد إن", cv: "السيرة الذاتية PDF" },
  },
  footer: "أحمد محمود سويد، الرياض",
};

const EN: Site = {
  dir: "ltr",
  lang: "en",
  other: { href: "/", label: "عربي" },
  nav: [
    { id: "work", label: "Work" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ],
  cvLabel: "CV",
  cvHref: "/cv/Ahmed-Mahmoud-Swid-CV-en.pdf",
  linkedin: LINKEDIN,
  hero: {
    name: "Ahmed Mahmoud Swid",
    role: "Power BI Expert, Data & Business Analyst",
    line: "I build Power BI dashboards and operational platforms that management reads every morning, from raw data to the decision.",
    place: "Riyadh, Saudi Arabia",
    cv: "Download CV",
    li: "LinkedIn",
    shot: { src: "/works/analysis/risk-lighting.jpg", title: "Power BI board classifying 60,658 lighting poles by risk" },
  },
  proof: [
    { value: "4+", label: "years on Riyadh Municipality projects" },
    { value: "SAR 179M", label: "in contracts run by a platform I built" },
    { value: "60,658", label: "lighting poles classified by risk" },
    { value: "150+", label: "participants in Power BI workshops I delivered" },
  ],
  caseStudy: {
    kicker: "Case study",
    title: "Street-lighting maintenance platform, Wasat sector",
    lede:
      "An operations platform that ingests complaint files, contractor claims and monthly reports, cleans them, and answers management's daily questions across thirty-four screens: where complaints pile up, which project is behind, and what is left on every contract.",
    org: "Riyadh Municipality projects, General Directorate of Infrastructure",
    role: "Analysis, design, development and operation",
    metrics: [
      { value: "SAR 179.3M", label: "contract value managed" },
      { value: "7,709", label: "complaints analysed on the map" },
      { value: "123K", label: "light fixtures tracked" },
      { value: "34", label: "analytical screens" },
    ],
    points: [
      "A field map of eight zones plotting every complaint by location, cause and period.",
      "A schedule performance index for every contract using earned value.",
      "Self-serve upload for four file types, with automatic validation and a data-quality board.",
      "A seven-page executive report delivered daily by email and Telegram, with no manual preparation.",
      "An analytical assistant that answers management's questions in text, straight from the database.",
    ],
    shots: [
      { src: "/works/automation/wasat-executive.jpg", title: "Executive KPIs", note: "Contract value, assets and data freshness" },
      { src: "/works/automation/wasat-map.jpg", title: "Field map", note: "7,709 complaints across eight zones" },
      { src: "/works/automation/wasat-inventory.jpg", title: "Lighting assets", note: "Fixtures, poles and stations by zone" },
    ],
    note: "The system is internal and requires sign-in. Screenshots come from the live environment and show aggregated indicators only.",
  },
  boards: {
    title: "Power BI dashboards",
    lede: "A selection of boards used to track operations, contracts and complaints. Each one answers a single question.",
    items: [
      { src: "/works/analysis/evm-milestones.jpg", title: "Earned-value project performance", note: "EV, SPI, CV and planned versus actual by month" },
      { src: "/works/analysis/c26-milestones.jpg", title: "Multi-page complaints report", note: "3,472 complaints by cause, district and station" },
      { src: "/works/analysis/n-complaints940.jpg", title: "940 complaints, North sector", note: "1,907 complaints with yearly and quarterly comparison" },
      { src: "/works/analysis/n-cashflow.jpg", title: "Cash flow, North sector", note: "SAR 183.4M planned and 138.5M spent" },
      { src: "/works/analysis/n-lighting-assets.jpg", title: "Lighting assets", note: "57,169 fixtures, 50,502 poles and 340 stations" },
      { src: "/works/analysis/lighting-ops.jpg", title: "Lighting operations board", note: "Repeat and electrical complaints with root causes" },
      { src: "/works/analysis/n-transactions.jpg", title: "Transaction tracking", note: "1,272 transactions in progress, completed and overdue" },
      { src: "/works/analysis/sales-global.png", title: "Executive sales performance", note: "Year on year and target versus actual, illustrative data" },
    ],
    reportsTitle: "Executive reports",
    reports: [
      { src: "/works/reports/annual-2024.jpg", title: "Annual report 2024", note: "O&M supervision project" },
      { src: "/works/reports/semi-annual.jpg", title: "Semi-annual report", note: "One unified indicator board" },
      { src: "/works/reports/kpi-march.jpg", title: "Monthly performance indicator", note: "One page with trend and comparison" },
      { src: "/works/reports/thumama-bridge.jpg", title: "Thumama bridge completion report", note: "Dismantling, transport and storage" },
      { src: "/works/reports/west-safety.jpg", title: "West lighting network safety", note: "Hazard locations and remedies" },
      { src: "/works/reports/rasi-governance.jpg", title: "RASI matrix in governance", note: "A visual guide to responsibilities" },
    ],
  },
  experience: {
    title: "Experience",
    role: "Business & Data Analyst",
    org: "Al-Shathri Company, Riyadh Municipality projects (Operations & Maintenance Agency)",
    period: "2022 to present",
    points: [
      "Built a 34-screen operations platform running SAR 179.3M of street-lighting maintenance contracts for the Wasat sector.",
      "Automated the daily executive report so it reaches the director by email and Telegram instead of being prepared by hand every morning.",
      "Classified 60,658 lighting poles and 445 stations into five risk tiers, so repair priority rests on measurement.",
      "Analysed and mapped 7,709 lighting complaints across eight zones by district, cause and period.",
      "Built an eight-dashboard analytics platform for the North sector with self-serve Excel upload, access control and scheduled reports.",
      "Built earned-value performance boards: schedule and cost performance indices for every contract.",
    ],
  },
  workshops: {
    title: "Power BI workshops",
    lede: "Hands-on workshops I delivered to Municipality staff in the West, North and South sectors. Each one starts from a raw file with deliberate defects and ends with a published report that refreshes in one click.",
    metrics: [
      { value: "150+", label: "participants" },
      { value: "360+", label: "hours delivered" },
      { value: "52", label: "pages of prepared material" },
    ],
    photos: [
      { src: "/training/video/hall.jpg", title: "Hands-on workshop", note: "Workshop hall" },
      { src: "/works/training/presenting.jpg", title: "Walking through a live board", note: "From the workshop" },
      { src: "/training/video/teaching.jpg", title: "Working with participants", note: "From the workshop" },
    ],
    link: "/en/training",
    linkLabel: "Workshop syllabus and material",
  },
  skills: {
    title: "Skills",
    groups: [
      {
        title: "Data analysis & modelling",
        proof: "Boards tracking SAR 179M of contracts, and a risk classification of 60,658 poles.",
        items: ["Power BI", "DAX", "Power Query", "Data modelling", "SQL", "Advanced Excel"],
      },
      {
        title: "Systems & automation",
        proof: "Two platforms in daily use, plus an executive report and an assistant that run unattended.",
        items: ["n8n", "Supabase / PostgreSQL", "Python", "Next.js", "APIs"],
      },
      {
        title: "Project management & reporting",
        proof: "CAPM certificate, earned-value boards for eight contracts, and annual and half-year reports.",
        items: ["KPIs", "Earned value (EVM)", "Executive reporting", "Requirements gathering"],
      },
    ],
  },
  creds: {
    title: "Certification & education",
    certTitle: "Professional certificate",
    cert: { name: "CAPM — Certified Associate in Project Management", meta: "Project Management Institute (PMI), No. 4183768, 2025 to 2028", href: "/certs/capm.pdf" },
    eduTitle: "Education",
    edu: "Bachelor of Laws (LL.B.), Zagazig University, 2011",
    langTitle: "Languages",
    langs: [
      { name: "Arabic", level: "Native" },
      { name: "English", level: "Good" },
    ],
    coursesTitle: "Courses",
    courses: [
      "Complete Guide to Power BI for Data Analysts",
      "Learning Power BI Desktop",
      "Hands-On AI: Automate Data Analytics & Reporting with n8n",
      "The Non-Technical Skills of Effective Data Scientists",
    ],
  },
  contact: {
    title: "Contact",
    lede: "For a role or an interview.",
    email: "ahmedswid27@gmail.com",
    phone: "+966 53 591 9475",
    phoneHref: "tel:+966535919475",
    labels: { email: "Email", phone: "Phone", linkedin: "LinkedIn", cv: "CV (PDF)" },
  },
  footer: "Ahmed Mahmoud Swid, Riyadh",
};

export const getSite = (lang: Lang): Site => (lang === "en" ? EN : AR);
