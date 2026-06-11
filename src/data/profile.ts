// ============================================================
//  عدّل هذا الملف لتحديث محتوى الموقع بالكامل (والشات بوت).
//  كل النصوص والأعمال والصور تُقرأ من هنا.
// ============================================================

export const profile = {
  name: "أحمد سويد",
  fullName: "أحمد محمود سويد",
  fullNameEn: "Ahmed Mahmoud Swid",
  initials: "أ.س",
  title: "محلل أعمال · إعداد التقارير · تصميم لوحات المعلومات · أتمتة الإجراءات",
  titleShort: "محلل أعمال وبيانات",
  tagline:
    "أحوّل البيانات التشغيلية إلى مؤشرات واضحة وتقارير قابلة للقرار — وأبني حلول أتمتة تقلّل الجهد وتسرّع الإنجاز.",
  location: "المملكة العربية السعودية",
  email: "ahmedswid27@gmail.com",
  phone: "0535919475",
  phoneIntl: "+966535919475",
  photo: "/me.jpg",

  // الملخص المهني (يظهر في قسم "نبذة" ويستخدمه الشات بوت).
  summary: `محلل أعمال مهتم بتحليل البيانات وإعداد التقارير الإدارية وتصميم لوحات المعلومات وتطوير حلول الأتمتة
لتحسين كفاءة العمل داخل الإدارات. أمتلك خبرة في تنظيم البيانات وبناء التقارير وتصميم واجهات ومواقع تفاعلية،
وربط الأدوات والأنظمة لإنشاء مسارات عمل مؤتمتة تدعم اتخاذ القرار وتقلّل الجهد اليدوي. أركّز على تحويل البيانات
التشغيلية إلى مؤشرات واضحة وتقارير قابلة للعرض، مع تحسين جودة البيانات وسرعة الوصول للمعلومة.`,

  // نبذة بصيغة المتكلّم للشات بوت.
  bio: `أنا أحمد محمود سويد، محلل أعمال وبيانات بأمانة منطقة الرياض، بخبرة أكثر من 5 سنوات عملية، وخبير معتمد في Power BI. متخصص في تحليل
البيانات التشغيلية، إعداد التقارير الإدارية، تصميم لوحات المعلومات (Power BI)، وأتمتة الإجراءات بـ n8n.
درّبت ووجّهت أكثر من 150 موظفاً داخل جهة حكومية. حاصل على شهادة CAPM في إدارة المشاريع.
أحوّل البيانات الخام إلى قرارات قابلة للقياس.`,

  social: {
    linkedin: "https://www.linkedin.com/in/ahmed-mahmoud-95aa1b2a5",
    email: "mailto:ahmedswid27@gmail.com",
    whatsapp: "https://wa.me/966535919475",
    phone: "tel:+966535919475",
  },
};

// أرقام حقيقية موجزة.
export const stats: { value: string; label: string }[] = [
  { value: "+5", label: "سنوات خبرة عملية" },
  { value: "+150", label: "موظف تم تدريبه" },
  { value: "+28K", label: "بلاغ تم تحليله" },
  { value: "CAPM", label: "معتمد إدارة مشاريع" },
];

// أبرز الحقائق (قسم النبذة).
export const facts: string[] = [
  "أكثر من 5 سنوات خبرة عملية في أمانة منطقة الرياض",
  "خبير معتمد في Power BI وتصميم لوحات المعلومات",
  "تدريب وتوجيه أكثر من 150 موظفاً في جهة حكومية",
  "إتقان حزمة Microsoft Office وأدوات Adobe الإبداعية",
  "حاصل على شهادة CAPM في إدارة المشاريع",
];

export const experience = {
  role: "محلل أعمال",
  org: "أمانة منطقة الرياض",
  period: "أكثر من 5 سنوات عملية",
  duties: [
    "تحليل البيانات التشغيلية والإدارية وتحويلها إلى تقارير واضحة تدعم اتخاذ القرار.",
    "إعداد تقارير دورية ومؤشرات أداء لقياس مستوى الإنجاز والمتابعة.",
    "تصميم لوحات معلومات Dashboards لعرض البيانات بصورة مبسطة واحترافية.",
    "تنظيم وتنظيف ملفات البيانات وتحسين جودتها قبل استخدامها في التقارير.",
    "تطوير أفكار وحلول أتمتة لتقليل العمل اليدوي وتسريع الإجراءات الإدارية.",
    "تصميم واجهات ومواقع تساعد في عرض البيانات وتحويلها إلى تجربة استخدام واضحة.",
    "بناء نماذج متابعة وتحليل للإدارات والبلاغات والعمليات التشغيلية.",
    "التنسيق مع فرق العمل لفهم الاحتياجات وتحويلها إلى متطلبات قابلة للتنفيذ.",
  ],
};

export const skills = {
  core: [
    "تحليل الأعمال",
    "إعداد التقارير الإدارية",
    "تحليل البيانات",
    "تصميم لوحات المعلومات",
    "أتمتة الإجراءات",
    "تحسين سير العمل",
    "تنظيم وتنظيف البيانات",
    "بناء مؤشرات الأداء KPIs",
    "إعداد العروض التنفيذية",
    "دعم اتخاذ القرار بالبيانات",
  ],
  technical: [
    "Microsoft Excel",
    "Power BI — خبير معتمد",
    "Tableau",
    "n8n Automation",
    "Supabase",
    "APIs",
    "Telegram Bots",
    "Dashboard Design",
    "Data Cleaning",
    "Workflow Automation",
    "Web Design",
  ],
};

export const certifications: {
  title: string;
  issuer: string;
  meta?: string;
  image?: string;
  link?: string;
}[] = [
  {
    title: "CAPM — Certified Associate in Project Management",
    issuer: "Project Management Institute (PMI)",
    meta: "رقم الشهادة 4183768 · سبتمبر 2025 – 2028",
    image: "/certs/capm.png",
    link: "/certs/capm.pdf",
  },
];

// الدورات التدريبية (شهادات إتمام — LinkedIn Learning)
export const courses: { title: string; issuer: string; topic: string; link: string }[] = [
  {
    title: "Complete Guide to Power BI for Data Analysts",
    issuer: "Microsoft Press · LinkedIn Learning",
    topic: "Power BI",
    link: "/certs/courses/powerbi-data-analysts.pdf",
  },
  {
    title: "Learning Power BI Desktop",
    issuer: "LinkedIn Learning",
    topic: "Power BI",
    link: "/certs/courses/powerbi-desktop.pdf",
  },
  {
    title: "Build AI Agents and Automate Workflows with n8n",
    issuer: "LinkedIn Learning",
    topic: "أتمتة · AI",
    link: "/certs/courses/n8n-agents-workflows.pdf",
  },
  {
    title: "Build AI Agents with n8n",
    issuer: "LinkedIn Learning",
    topic: "أتمتة · AI",
    link: "/certs/courses/n8n-agents.pdf",
  },
  {
    title: "Hands-On AI: Automate Data Analytics & Reporting with n8n",
    issuer: "LinkedIn Learning",
    topic: "تحليل · أتمتة",
    link: "/certs/courses/n8n-data-analytics.pdf",
  },
  {
    title: "The Non-Technical Skills of Effective Data Scientists",
    issuer: "LinkedIn Learning",
    topic: "علم البيانات",
    link: "/certs/courses/data-scientist-skills.pdf",
  },
];

export const languages: { name: string; level: string; pct: number }[] = [
  { name: "العربية الفصحى", level: "اللغة الأم", pct: 100 },
  { name: "الإنجليزية", level: "جيد", pct: 70 },
];

export type WorkItem = {
  title: string;
  desc: string;
  image?: string;
  tags?: string[];
  link?: string;
  linkLabel?: string;
  status?: string;
};

export type Section = {
  id: string;
  name: string;
  sub: string;
  icon: string;
  layout: "gallery" | "cards";
  items: WorkItem[];
  photos?: { src: string; caption: string }[];
};

export const sections: Section[] = [
  // ─────────────── التصاميم ───────────────
  {
    id: "design",
    name: "التصاميم",
    sub: "تقارير تنفيذية، إنفوجرافيك، وهويات بصرية احترافية",
    icon: "✦",
    layout: "gallery",
    items: [
      {
        title: "تقرير المواقع والمسارات — جسر S7",
        desc: "تصميم تقرير متكامل لأعمال نقل وتخزين الجسر: غلاف، محتوى، وآليات الإدارة بهوية رسمية.",
        image: "/works/design/bridge-s7.jpg",
        tags: ["تصميم تقرير", "Layout", "InDesign"],
      },
      {
        title: "مصفوفة راسي (RASI) في الحوكمة",
        desc: "دليل بصري مبسّط لتحديد المسؤوليات والمساءلة — مكتب إدارة المشاريع، قطاع الشمال.",
        image: "/works/design/rasi.jpg",
        tags: ["حوكمة", "إنفوجرافيك"],
      },
      {
        title: "عرض التحديات والإجراءات المتّخذة",
        desc: "تصميم تقرير يعرض التحديات التشغيلية والحلول — أمانة منطقة الرياض.",
        image: "/works/design/challenges.jpg",
        tags: ["تقرير", "إنفوجرافيك"],
      },
      {
        title: "تقرير جسر الثمامة S10",
        desc: "توثيق بصري لأعمال فكّ ونقل وتخزين الجسر — هوية رسمية متكاملة.",
        image: "/works/design/thumama-bridge.jpg",
        tags: ["تصميم", "توثيق مشاريع"],
      },
    ],
  },

  // ─────────────── التحليل ───────────────
  {
    id: "analysis",
    name: "تحليل البيانات",
    sub: "لوحات Power BI تفاعلية ومؤشرات أداء تنفيذية لأمانة الرياض",
    icon: "◆",
    layout: "gallery",
    items: [
      {
        title: "لوحة معلومات قطاع الشمال",
        desc: "لوحة تحليل البلاغات الرئيسية: 26,229 بلاغ، مؤشرات الإنجاز (94.6%) والتنفيذ (99.8%)، خريطة وتوزيعات.",
        image: "/works/analysis/north-complaints.jpg",
        tags: ["Power BI", "DAX", "KPIs"],
      },
      {
        title: "تحليل بلاغات 940 — صيانة الإنارة",
        desc: "لوحات تفاعلية متعددة لتحليل بلاغات الإنارة حسب النطاقات والأحياء وأهم المؤشرات.",
        image: "/works/analysis/lighting-940.jpg",
        tags: ["Power BI", "تحليل"],
      },
      {
        title: "لوحة البلاغات — عرض على الأجهزة اللوحية",
        desc: "تصميم لوحة تحكم البلاغات (قطاع الجنوب) بتجربة استخدام تعمل على التابلت لمتابعة لحظية.",
        image: "/works/analysis/complaints-tablet.jpg",
        tags: ["Dashboard", "UX"],
      },
      {
        title: "مؤشر أداء التوطين",
        desc: "إنفوجرافيك تحليلي لنسب التوطين عبر 5 مشاريع و129 موظفاً فنياً و10 جنسيات.",
        image: "/works/analysis/localization-pro.jpg",
        tags: ["إنفوجرافيك", "تحليل"],
      },
      {
        title: "تقرير الأعمال التنفيذية السنوي",
        desc: "إنفوجرافيك تنفيذي يلخّص مؤشرات الأداء: 2,240 موظفاً، 1,190 معدة، ومستوى الإنجاز.",
        image: "/works/analysis/exec-report.jpg",
        tags: ["تقرير تنفيذي", "إنفوجرافيك"],
      },
      {
        title: "لوحة المعلومات المركزية",
        desc: "واجهة تنقّل تفاعلية تربط أصول الحدائق والطرق والإنارة والمعاملات والمشاريع في مكان واحد.",
        image: "/works/analysis/north-hub.jpg",
        tags: ["Dashboard", "UX", "تصميم"],
      },
      {
        title: "تحليل أصول الإنارة",
        desc: "لوحة تحليل أصول الإنارة: 340 محطة، 50,502 عمود، 2.7 مليون متر كابل، مع خريطة توزيع جغرافي.",
        image: "/works/analysis/lighting-assets.jpg",
        tags: ["Power BI", "أصول", "خرائط"],
      },
      {
        title: "تحليل أصول الحدائق",
        desc: "لوحة تحليل أصول الحدائق: 469 حديقة، أشجار ومضخات وآبار، مع توزيع جغرافي ومؤشرات لكل حي.",
        image: "/works/analysis/gardens-assets.jpg",
        tags: ["Power BI", "أصول", "تحليل"],
      },
    ],
  },

  // ─────────────── الأتمتة ───────────────
  {
    id: "automation",
    name: "الأتمتة والذكاء الاصطناعي",
    sub: "أنظمة ذكية وبوتات تربط بياناتك وتعمل تلقائياً",
    icon: "⚡",
    layout: "cards",
    items: [
      {
        title: "نظام قطاع الشمال المؤسسي",
        desc: "منصة متكاملة لأمانة الرياض: 8 لوحات تحليلية + رفع Excel ذاتي + مساعد تحليلي بـ Claude على تيليجرام + صلاحيات RBAC + تقارير وتنبيهات مجدولة بالإيميل.",
        tags: ["Next.js", "Claude", "Supabase", "n8n", "RBAC"],
        status: "منشور",
        link: "https://north-infrastructure.vercel.app",
        linkLabel: "زيارة النظام",
      },
      {
        title: "بوت المطاعم الذكي (Restaurant SaaS)",
        desc: "مساعد ذكاء اصطناعي على تيليجرام للمطاعم: يستقبل الطلبات بالعربي والإنجليزي ويرد على العملاء ويتصل بلوحة تحكم الإدارة.",
        tags: ["Python", "Telegram", "Gemini", "Supabase"],
        status: "قيد التطوير",
      },
      {
        title: "نظام تداول تاسي الشخصي",
        desc: "نظام قرار تداول لسوق تاسي: استيراد بيانات يومي من EODHD، مؤشرات فنية، ومحرّك إشارات.",
        tags: ["Python", "EODHD", "Pandas", "Supabase"],
        status: "قيد التطوير",
      },
      {
        title: "خطوط أتمتة n8n",
        desc: "وركفلوهات أتمتة: تقارير تنفيذية أسبوعية، تنبيهات مخاطر يومية، وبوتات ذكية متعددة المجالات — كلها تعمل تلقائياً.",
        tags: ["n8n", "Automation", "Claude", "Gmail"],
        status: "يعمل",
      },
    ],
  },

  // ─────────────── التدريب ───────────────
  {
    id: "training",
    name: "التدريب والتأهيل",
    sub: "بناء قدرات حقيقية في البيانات والأتمتة — درّبت أكثر من 150 موظفاً",
    icon: "❖",
    layout: "cards",
    items: [
      {
        title: "دورة: تحليل الأعمال باستخدام Power BI — مُدرّب معتمد",
        desc: "تقديم دورة تدريبية رسمية لمنسوبي أمانة منطقة الرياض (قطاع الجنوب) في تحليل الأعمال وبناء لوحات المعلومات بـ Power BI.",
        tags: ["Power BI", "تدريب رسمي", "أمانة الرياض"],
        status: "مُدرّب",
      },
      {
        title: "تدريب الموظفين في جهة حكومية",
        desc: "تدريب وتوجيه أكثر من 150 موظفاً على تحليل البيانات وأدوات التقارير ولوحات المعلومات داخل أمانة الرياض.",
        tags: ["+150 متدرب", "Power BI", "تقارير"],
        status: "منجز",
      },
      {
        title: "خريطة التعلّم — من الصفر إلى أتمتة احترافية",
        desc: "مسار تدريبي متدرّج من 7 مهارات (JSON، Git، Python، SQL، APIs، n8n، Claude) لبناء أنظمة ذكية حقيقية — بمشاريع تطبيقية لكل مهارة.",
        tags: ["مسار تدريبي", "9 أسابيع", "7 مهارات"],
        status: "متاح",
      },
      {
        title: "ورش تحليل البيانات وPower BI",
        desc: "ورش عملية لتأهيل الكوادر على تحليل البيانات، تصميم لوحات المؤشرات، وإعداد التقارير القابلة للقرار.",
        tags: ["Power BI", "DAX", "ورش عمل"],
      },
      {
        title: "إعداد المحتوى والمسارات التدريبية",
        desc: "تصميم مناهج ومسارات تدريب عملية ومواد عرض احترافية تبني قدرات حقيقية وقابلة للتطبيق الفوري.",
        tags: ["مناهج", "عروض", "تأهيل"],
      },
    ],
    photos: [
      { src: "/works/training/banner-powerbi.jpg", caption: "دورة تحليل الأعمال باستخدام Power BI — أمانة الرياض" },
      { src: "/works/training/presenting.jpg", caption: "تقديم التدريب على لوحات المعلومات" },
      { src: "/works/training/podium.jpg", caption: "جلسة تدريبية للموظفين" },
      { src: "/works/training/room-powerbi.jpg", caption: "ورشة عملية على Power BI" },
      { src: "/works/training/hands-on.jpg", caption: "تدريب عملي ومتابعة المتدربين" },
      { src: "/works/training/certificates.jpg", caption: "اعتماد وتوقيع شهادات المتدربين" },
    ],
  },
];

// خمس خدمات (تظهر في قسم "ماذا أقدّم")
export const disciplines: { title: string; desc: string; icon: string }[] = [
  { title: "التحليل التنفيذي", desc: "لوحات Power BI ومؤشرات أداء جاهزة لاتخاذ القرار.", icon: "◆" },
  { title: "الأتمتة الذكية", desc: "ربط أنظمتك وأتمتة العمليات بـ n8n وذكاء Claude.", icon: "⚡" },
  { title: "المنصّات السحابية", desc: "بناء منصات SaaS مخصّصة على Next.js وSupabase.", icon: "❖" },
  { title: "تأهيل الكوادر", desc: "مسارات تدريب عملية تبني قدرات حقيقية لفريقك.", icon: "❂" },
  { title: "التقارير الاستراتيجية", desc: "تصميم تقارير وإنفوجرافيك بمستوى مجالس الإدارة.", icon: "✦" },
];
