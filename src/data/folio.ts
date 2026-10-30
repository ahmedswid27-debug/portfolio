/**
 * محتوى الصفحة الرئيسية على هوية «ملف الأعمال» التي صممها أحمد بيده
 * (portfolio.pdf و«بورتفوليو 2026.ai») — 2026-10-29.
 *
 * القيد 3: لا رقم من بيانات العمل هنا. الأرقام الباقية حقائق شخصية
 * (سنوات الخبرة، المشاركون في الورش، ساعات التنفيذ). واللوحات صور
 * توضيحية مولدة في tools/boards/ وعلى كل واحدة وسم «بيانات توضيحية».
 * القيد 4: لا «مدرّب» ولا «متدرّب» — «نفّذ ورشة» و«مشارك».
 */
export type Lang = "ar" | "en";

export type Pic = { src: string; title: string; note?: string; w: number; h: number };

export type Folio = {
  dir: "rtl" | "ltr";
  lang: Lang;
  other: { href: string; label: string };
  nav: { id: string; label: string }[];
  cv: { label: string; href: string; download: string };
  linkedin: string;
  hero: { kicker: string; sub: string; alt: string };
  profile: {
    name: string;
    role: string;
    summary: string[];
    facts: string[];
    contact: { phone: string; phoneHref: string; email: string };
  };
  proof: { value: string; label: string }[];
  boards: {
    label: string;
    title: string;
    lede: string;
    mockAlt: string;
    flat: Pic[];
    disclaimer: string;
    link: string;
  };
  platform: {
    label: string;
    title: string;
    org: string;
    lede: string;
    points: string[];
    mockAlt: string;
    note: string;
    link: string;
  };
  live: { label: string; title: string; lede: string };
  method: { label: string; title: string; lede: string; steps: { t: string; d: string; out: string }[]; outLabel: string };
  cases: { label: string; title: string; lede: string; read: string };
  lessons: { label: string; title: string; lede: string; items: { t: string; wrong: string; caught: string; rule: string }[]; labels: { wrong: string; caught: string; rule: string }; note: string };
  reports: { label: string; title: string; lede: string; items: Pic[] };
  workshops: {
    label: string;
    title: string;
    lede: string;
    numbers: { value: string; label: string }[];
    photos: Pic[];
    link: { href: string; label: string };
  };
  experience: {
    label: string;
    title: string;
    jobs: { period: string; role: string; org: string; points: string[] }[];
  };
  skills: { label: string; title: string; groups: { title: string; items: string[] }[] };
  creds: {
    label: string;
    title: string;
    capm: { title: string; meta: string; img: string; href: string };
    coursesTitle: string;
    courses: { name: string; href: string }[];
    eduTitle: string;
    edu: string;
    langTitle: string;
    langs: { name: string; level: string }[];
  };
  contact: {
    label: string;
    title: string;
    lede: string;
    labels: { phone: string; email: string; linkedin: string; cv: string };
  };
  close: string;
  closeSub: string;
  footer: string;
  zoom: string;
  closeLabel: string;
};

const LINKEDIN = "https://www.linkedin.com/in/ahmed-mahmoud-95aa1b2a5";
const PHONE = { phone: "0535919475", phoneHref: "tel:+966535919475", email: "ahmedswid27@gmail.com" };

const BOARD_W = 1600, BOARD_H = 1000;

const AR: Folio = {
  dir: "rtl",
  lang: "ar",
  other: { href: "/en", label: "English" },
  nav: [
    { id: "boards", label: "اللوحات" },
    { id: "live", label: "جرب اللوحة" },
    { id: "cases", label: "دراسات الحالة" },
    { id: "reports", label: "التقارير" },
    { id: "workshops", label: "الورش" },
    { id: "experience", label: "الخبرة" },
    { id: "contact", label: "التواصل" },
  ],
  cv: { label: "السيرة الذاتية", href: "/cv/Ahmed-Mahmoud-Swid-CV-ar.pdf", download: "تحميل السيرة الذاتية" },
  linkedin: LINKEDIN,
  hero: {
    kicker: "ملــف أعمــال",
    sub: "(تحليل بيانات ولوحات Power BI وتقارير إدارية)",
    alt: "لوحتان من تصميم أحمد سويد على جهازين لوحيين، ببيانات توضيحية",
  },
  profile: {
    name: "أحمد محمود سويد",
    role: "خبير Power BI ومحلل بيانات وأعمال",
    summary: [
      "أحول بيانات التشغيل الخام إلى لوحات Power BI وتقارير تقرؤها الإدارة وتتخذ بها القرار، من جمع المتطلبات وتنظيف البيانات وبناء النموذج حتى تصميم اللوحة وأتمتة تسليمها.",
      "أعمل منذ ديسمبر 2021 محلل أعمال وبيانات في مشاريع أمانة منطقة الرياض: لوحات متابعة للبلاغات والعقود والأصول، ومنصات تشغيلية تعمل يوميا، وتقارير دورية للإدارة. وقبلها أربع سنوات في التصميم وإدارة تنفيذ المشاريع، وهي التي تجعل لوحاتي تقرأ من النظرة الأولى.",
    ],
    facts: [
      "9 سنوات خبرة مهنية، منها 4+ في البيانات وذكاء الأعمال",
      "أدوات Power BI و DAX و Power Query و SQL",
      "إعداد التقارير الإدارية وتصميمها",
      "ورش Power BI لأكثر من 150 مشاركا",
      "شهادة CAPM من معهد إدارة المشاريع",
    ],
    contact: PHONE,
  },
  proof: [
    { value: "9", label: "سنوات خبرة مهنية" },
    { value: "+4", label: "سنوات في البيانات وذكاء الأعمال" },
    { value: "+150", label: "مشاركا في ورش Power BI" },
    { value: "+360", label: "ساعة تنفيذ للورش" },
  ],
  boards: {
    label: "تحليل بيانات",
    title: "لوحات Power BI",
    lede: "كل لوحة تجيب عن سؤال واحد تسأله الإدارة: أين تتراكم البلاغات، وأي مشروع متأخر عن مخططه، وكم صرف من قيمة العقود. التصميم يبدأ بالسؤال، ثم المؤشر، ثم الرسم الذي يجيب عنه بنظرة.",
    mockAlt: "لوحتا تحليل البلاغات ومتابعة أعمال المشروع على جهازين لوحيين، ببيانات توضيحية",
    flat: [
      { src: "/works/illustrative/board-2.png", title: "تحليل البلاغات", note: "الأسباب والنطاقات والاتجاه الشهري وزمن الإغلاق", w: BOARD_W, h: BOARD_H },
      { src: "/works/illustrative/board-1.png", title: "متابعة أعمال المشروع", note: "الإنجاز الفعلي مقابل المخطط لكل مرحلة", w: BOARD_W, h: BOARD_H },
      { src: "/works/illustrative/board-3.png", title: "التدفق المالي", note: "الصرف التراكمي مقابل المخطط لكل مشروع", w: BOARD_W, h: BOARD_H },
      { src: "/works/illustrative/board-4.png", title: "أداء الأسطول", note: "الرحلات اليومية وأوقات الذروة ومسار الطلبات", w: BOARD_W, h: BOARD_H },
    ],
    disclaimer: "اللوحات المعروضة إعادة بناء لتصميم لوحاتي ببيانات توضيحية مولدة، ولا تمثل بيانات أي جهة.",
    link: "جرب لوحة حية",
  },
  platform: {
    label: "أتمتة وأنظمة",
    title: "منصة تشغيلية تعمل كل صباح",
    org: "مشاريع أمانة منطقة الرياض، الإدارة العامة للبنية التحتية",
    lede: "بنيت منصة تستقبل ملفات البلاغات والمستخلصات والتقارير الشهرية، وتنظفها وتتحقق منها آليا، ثم تعرضها في شاشات تحليلية للإدارة، وترسل لها تقريرا تنفيذيا يوميا دون إعداد يدوي.",
    points: [
      "رفع ذاتي للملفات مع تحقق آلي ولوحة لجودة البيانات.",
      "خريطة ميدانية ترسم كل بلاغ بموقعه وسببه وفترته.",
      "مؤشر أداء الجدول لكل عقد بمنهج القيمة المكتسبة.",
      "تقرير تنفيذي يومي يصل بالبريد وتيليجرام.",
      "مساعد تحليلي يجيب عن أسئلة الإدارة من قاعدة البيانات نفسها.",
    ],
    mockAlt: "لوحتا التدفق المالي وأداء الأسطول على جهازين لوحيين، ببيانات توضيحية",
    note: "المنصة داخلية وتتطلب دخولا، والصور هنا لوحات توضيحية بأسلوبها لا لقطات منها.",
    link: "كيف تتحقق المنصة من نفسها",
  },
  live: {
    label: "جرب بنفسك",
    title: "لوحة حية، لا صورة لوحة",
    lede: "هذه ليست لقطة شاشة. اضغط أي عمود فيتغير سياق الفلتر وتعاد القياسات كلها، وترى بجوارها كود DAX الذي أنتج الرقم، والخطأ الشائع الذي يتجنبه.",
  },
  method: {
    label: "المنهج",
    title: "من السؤال إلى القرار",
    lede: "لا أبدأ من البيانات ولا من الأداة. أبدأ من القرار الذي تريد الإدارة اتخاذه، ثم أعود إلى الوراء.",
    outLabel: "المخرج",
    steps: [
      { t: "السؤال", d: "أجلس مع صاحب القرار حتى يصبح السؤال جملة واحدة قابلة للقياس، وأتفق معه على تعريف كل رقم قبل كتابة أي معادلة.", out: "قاموس مؤشرات" },
      { t: "البيانات", d: "أقرأ الملف قبل أن أثق به: لقطة أم إضافة؟ ما الذي يمثله كل صف؟ ما الفارغ وما الملتبس؟ وأقيس الأعمدة بدل أن أفترضها.", out: "تقرير جودة البيانات" },
      { t: "النموذج", d: "نموذج نجمي بجدول حقائق بحبيبة واضحة، وتنظيف في Power Query لا في المعادلات، وجدول تاريخ يعرف أين تنتهي البيانات.", out: "نموذج موثق" },
      { t: "التصميم", d: "صفحة لكل سؤال، والرقم الأهم أولا، واللون بوظيفة، وعربية صحيحة الاتجاه. أختبر اللوحة على الجوال وعلى من لم يرها قبل ذلك.", out: "لوحة تقرأ في ثوان" },
      { t: "التشغيل", d: "أتمتة التحديث والتسليم، وفحص يكشف الخطأ قبل القارئ، ومطابقة الأرقام من مصدر مستقل قبل أي تسليم.", out: "نظام يعمل كل صباح" },
    ],
  },
  cases: {
    label: "دراسات حالة",
    title: "كيف أفكر، بالتفصيل",
    lede: "أربع مشكلات حقيقية من عملي: السؤال، ومشكلة البيانات، والنموذج، والكود، والقرار. الأرقام توضيحية، والمنهج والأخطاء حقيقية.",
    read: "اقرأ الدراسة",
  },
  lessons: {
    label: "دروس من الإنتاج",
    title: "أخطاء لا تظهر في الدورات",
    lede: "الرقم الخطأ لا يعلن عن نفسه. هذه أخطاء وقعت في أنظمة تعمل فعلا، وكل واحد منها صار فحصا ثابتا عندي.",
    labels: { wrong: "الخطأ", caught: "كيف انكشف", rule: "القاعدة" },
    note: "صيغت الدروس بلا أرقام أو تفاصيل من بيانات العمل.",
    items: [
      { t: "مقارنة سنة جارية بسنة كاملة", wrong: "أشهر من هذه السنة مقابل اثني عشر شهرا من السابقة، فيظهر انخفاض كبير لم يحدث.", caught: "رقم بدا أجمل من أن يكون صحيحا، فأعدت حسابه شهرا بشهر.", rule: "المقارنة بالأشهر نفسها من السنتين، وحتى آخر شهر مكتمل، ويكتب ذلك بجوار الرقم." },
      { t: "نسبة تحسب من لم يجب", wrong: "نسبة الرضا كانت تعد غير المقيم راضيا، فظهرت قريبة من الكمال.", caught: "لم يتطابق مقامها مع عدد التقييمات الفعلي.", rule: "كل نسبة يكتب مقامها صراحة، وغير المقيم ليس راضيا ولا غير راض." },
      { t: "الصفر الصامت", wrong: "مدخل فارغ أعاد صفرا، فظهر جواب واثق أن لا مشكلة، والحقيقة غير ذلك.", caught: "صفر لم يتفق مع ما يعرفه الميدان.", rule: "النتيجة الفارغة بسبب مدخل مجهول تعيد خطأ صريحا، لا صفرا." },
      { t: "عمر الرفع ليس عمر البيانات", wrong: "شارة خضراء تقول إن البيانات حديثة، لأن الملف رفع قبل أيام، وهو يغطي فترة قديمة.", caught: "مقارنة وقت الرفع بآخر فترة داخل الملف.", rule: "الحداثة تقاس بالفترة التي تغطيها البيانات وبتغطيتها، لا بلحظة الرفع." },
      { t: "مقياس ملوث", wrong: "جزء كبير من زيارات النظام كان من حسابات فحص آلية، فبدا الاستخدام أعلى من حقيقته.", caught: "وجدت زيارات لحسابات لم تعد موجودة.", rule: "ينظف القياس عند القراءة ويذكر ما استبعد. المقياس الملوث أسوأ من غيابه لأنه يقرأ بثقة." },
      { t: "افتراض المنطقة الزمنية", wrong: "حولت الأوقات إلى توقيت الرياض وهي مخزنة به أصلا، فانتقلت بلاغات ليلية إلى اليوم التالي وتغيرت أرقام الأشهر.", caught: "قارنت آخر بلاغ في الملف بلحظة تنزيله، فثبت أن الافتراض مقلوب.", rule: "البرهان من الملف لا من الدالة. وتطابق رقمين حسبا بالخطأ نفسه ليس دليلا." },
    ],
  },
  reports: {
    label: "إعداد تقارير إدارية",
    title: "التقارير الإدارية",
    lede: "تقارير سنوية وتقارير إنجاز ودراسات فنية وأدلة حوكمة، أعددت محتواها وصممتها لتقرأ في اجتماع واحد.",
    items: [
      { src: "/works/reports/annual-2024.jpg", title: "التقرير السنوي 2024", note: "مشروع الإشراف على التشغيل والصيانة", w: 989, h: 1400 },
      { src: "/works/reports/thumama-bridge.jpg", title: "تقرير إنهاء أعمال جسر الثمامة", note: "توثيق أعمال الفك والنقل والتخزين", w: 1400, h: 787 },
      { src: "/works/reports/rasi-governance.jpg", title: "مصفوفة RASI في الحوكمة", note: "دليل بصري لتحديد المسؤوليات", w: 1400, h: 787 },
      { src: "/works/reports/west-safety.jpg", title: "تقرير سلامة شبكة الإنارة", note: "مواضع الخطر والمعالجات", w: 1400, h: 787 },
      { src: "/works/reports/wall-lamps.jpg", title: "دراسة فنية للفوانيس الجدارية", note: "الحالة والبدائل والتوصية", w: 1400, h: 787 },
      { src: "/works/reports/challenges.jpg", title: "التحديات والإجراءات المتخذة", note: "عرض للإدارة العليا", w: 1400, h: 877 },
      { src: "/works/reports/response-support.jpg", title: "تقرير إدارة الاستجابة والإسناد", note: "تقرير إدارة سنوي", w: 989, h: 1400 },
      { src: "/works/reports/digitization.jpg", title: "فوائد الرقمنة", note: "إنفوجرافيك توعوي", w: 989, h: 1400 },
    ],
  },
  workshops: {
    label: "ورش عمل",
    title: "ورش Power BI",
    lede: "نفذت ورشا تطبيقية لمنسوبي الأمانة في قطاعات الغرب والشمال والجنوب. تبدأ الورشة من ملف خام فيه أخطاء مقصودة، وتنتهي بتقرير منشور يتحدث بضغطة.",
    numbers: [
      { value: "+150", label: "مشاركا" },
      { value: "+360", label: "ساعة تنفيذ" },
      { value: "52", label: "صفحة مادة معدة" },
    ],
    photos: [
      { src: "/works/training/presenting.jpg", title: "الشرح على لوحة حية", w: 719, h: 408 },
      { src: "/works/training/podium.jpg", title: "قاعة الورشة", w: 428, h: 536 },
      { src: "/works/training/room-powerbi.jpg", title: "التطبيق على الأجهزة", w: 431, h: 545 },
      { src: "/training/video/hall.jpg", title: "ورشة قطاع الغرب", w: 854, h: 484 },
      { src: "/works/training/banner-powerbi.jpg", title: "لافتة دورة Power BI", w: 428, h: 536 },
      { src: "/works/training/certificates.jpg", title: "توقيع شهادات المشاركين", w: 428, h: 536 },
    ],
    link: { href: "/training", label: "محاور الورش وموادها" },
  },
  experience: {
    label: "المسار المهني",
    title: "الخبرة",
    jobs: [
      {
        period: "ديسمبر 2021 حتى الآن",
        role: "محلل أعمال وبيانات",
        org: "شركة الشثري، مشاريع أمانة منطقة الرياض (وكالة التشغيل والصيانة)",
        points: [
          "بناء منصة تشغيلية تدير متابعة عقود صيانة الإنارة لقطاع الوسط، من تنظيف البيانات حتى لوحة القرار.",
          "أتمتة التقرير التنفيذي اليومي ليصل مدير الإدارة بالبريد وتيليجرام بدل إعداده يدويا كل صباح.",
          "تصنيف أعمدة الإنارة ومحطاتها في درجات خطورة من قراءات المقاومة والتسريب، فصار ترتيب الإصلاح مبنيا على القياس.",
          "تحليل بلاغات الإنارة ورسمها على النطاقات الجغرافية حسب الحي والسبب والفترة.",
          "بناء منصة تحليلية للوحات قطاع الشمال، برفع Excel ذاتي وصلاحيات وتقارير مجدولة.",
          "لوحات أداء مشاريع بمنهج القيمة المكتسبة: مؤشر أداء الجدول والتكلفة لكل عقد.",
        ],
      },
      {
        period: "2017 حتى 2021",
        role: "محلل أعمال ومصمم",
        org: "Mihab Advertising & Marketing",
        points: [
          "هويات بصرية وحملات تسويق رقمية ومطبوعة لعلامات تجارية متعددة.",
          "مونتاج وموشن جرافيك ببرنامجي Premiere و After Effects، وإدارة تنفيذ المشاريع.",
        ],
      },
    ],
  },
  skills: {
    label: "الأدوات",
    title: "المهارات",
    groups: [
      { title: "تحليل البيانات والنمذجة", items: ["Power BI", "DAX", "Power Query", "نمذجة البيانات", "SQL", "Excel المتقدم"] },
      { title: "الأنظمة والأتمتة", items: ["n8n", "Supabase / PostgreSQL", "Python", "Next.js", "APIs"] },
      { title: "إدارة المشاريع والتقارير", items: ["مؤشرات الأداء", "القيمة المكتسبة EVM", "التقارير التنفيذية", "جمع المتطلبات"] },
      { title: "التصميم", items: ["Illustrator", "InDesign", "Photoshop", "After Effects", "Figma"] },
    ],
  },
  creds: {
    label: "الشهادات",
    title: "الشهادات والمؤهل",
    capm: { title: "شهادة CAPM من معهد إدارة المشاريع PMI", meta: "رقم 4183768، من سبتمبر 2025 حتى سبتمبر 2028", img: "/certs/capm.png", href: "/certs/capm.pdf" },
    coursesTitle: "دورات LinkedIn Learning",
    courses: [
      { name: "Complete Guide to Power BI for Data Analysts", href: "/certs/courses/powerbi-data-analysts.pdf" },
      { name: "Learning Power BI Desktop", href: "/certs/courses/powerbi-desktop.pdf" },
      { name: "Hands-On AI: Automate Data Analytics & Reporting with n8n", href: "/certs/courses/n8n-data-analytics.pdf" },
      { name: "Build AI Agents and Automate Workflows with n8n", href: "/certs/courses/n8n-agents-workflows.pdf" },
      { name: "The Non-Technical Skills of Effective Data Scientists", href: "/certs/courses/data-scientist-skills.pdf" },
    ],
    eduTitle: "المؤهل الدراسي",
    edu: "ليسانس الحقوق، جامعة الزقازيق، 2011",
    langTitle: "اللغات",
    langs: [
      { name: "العربية", level: "اللغة الأم" },
      { name: "الإنجليزية", level: "جيد جدا" },
    ],
  },
  contact: {
    label: "تواصل",
    title: "التواصل",
    lede: "للتواصل بخصوص وظيفة أو مقابلة.",
    labels: { phone: "الجوال", email: "البريد", linkedin: "لينكد إن", cv: "السيرة الذاتية" },
  },
  close: "THANK YOU",
  closeSub: "ملــف أعمــال",
  footer: "أحمد محمود سويد، الرياض",
  zoom: "تكبير",
  closeLabel: "إغلاق",
};

const EN: Folio = {
  dir: "ltr",
  lang: "en",
  other: { href: "/", label: "عربي" },
  nav: [
    { id: "boards", label: "Dashboards" },
    { id: "live", label: "Live board" },
    { id: "cases", label: "Case studies" },
    { id: "reports", label: "Reports" },
    { id: "workshops", label: "Workshops" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ],
  cv: { label: "CV", href: "/cv/Ahmed-Mahmoud-Swid-CV-en.pdf", download: "Download CV" },
  linkedin: LINKEDIN,
  hero: {
    kicker: "Selected work",
    sub: "(Power BI, data analysis and management reporting)",
    alt: "Two dashboards designed by Ahmed Swid on two tablets, with illustrative data",
  },
  profile: {
    name: "Ahmed Mahmoud Swid",
    role: "Power BI Expert, Data & Business Analyst",
    summary: [
      "I turn raw operational data into Power BI dashboards and reports that management reads and acts on, from requirements and data cleaning to the model, the dashboard design and automated delivery.",
      "Since December 2021 I have worked as a business and data analyst on Riyadh Municipality projects: dashboards tracking complaints, contracts and assets, operational platforms in daily use, and periodic reports for management. Before that, four years in design and project delivery, which is why my dashboards read at first glance.",
    ],
    facts: [
      "9 years of professional experience, 4+ in data & BI",
      "Power BI, DAX, Power Query and SQL",
      "Management report writing and design",
      "Power BI workshops for 150+ participants",
      "CAPM, Project Management Institute",
    ],
    contact: { ...PHONE, phone: "+966 53 591 9475" },
  },
  proof: [
    { value: "9", label: "years of professional experience" },
    { value: "4+", label: "years in data & BI" },
    { value: "150+", label: "Power BI workshop participants" },
    { value: "360+", label: "workshop hours delivered" },
  ],
  boards: {
    label: "Data analysis",
    title: "Power BI dashboards",
    lede: "Each dashboard answers one question management asks: where complaints pile up, which project is behind plan, how much of the contract value has been spent. Design starts with the question, then the measure, then the visual that answers it at a glance.",
    mockAlt: "Complaints analysis and project tracking dashboards on two tablets, with illustrative data",
    flat: [
      { src: "/works/illustrative/board-2.png", title: "Complaints analysis", note: "Causes, zones, monthly trend and time to close", w: BOARD_W, h: BOARD_H },
      { src: "/works/illustrative/board-1.png", title: "Project progress", note: "Actual versus planned progress by phase", w: BOARD_W, h: BOARD_H },
      { src: "/works/illustrative/board-3.png", title: "Cash flow", note: "Cumulative spend versus plan by project", w: BOARD_W, h: BOARD_H },
      { src: "/works/illustrative/board-4.png", title: "Fleet performance", note: "Daily trips, peak hours and request funnel", w: BOARD_W, h: BOARD_H },
    ],
    disclaimer: "These dashboards rebuild my designs with generated illustrative data and do not represent any organisation's data.",
    link: "Try a live board",
  },
  platform: {
    label: "Automation & systems",
    title: "An operations platform that runs every morning",
    org: "Riyadh Municipality projects, General Directorate of Infrastructure",
    lede: "I built a platform that ingests complaint files, contractor claims and monthly reports, cleans and validates them automatically, presents them on analytical screens for management, and sends a daily executive report with no manual preparation.",
    points: [
      "Self-serve file upload with automatic validation and a data-quality board.",
      "A field map plotting every complaint by location, cause and period.",
      "A schedule performance index for every contract using earned value.",
      "A daily executive report delivered by email and Telegram.",
      "An analytical assistant that answers management's questions from the database itself.",
    ],
    mockAlt: "Cash flow and fleet performance dashboards on two tablets, with illustrative data",
    note: "The platform is internal and requires sign-in. The images here are illustrative dashboards in its style, not screenshots of it.",
    link: "How the platform checks itself",
  },
  live: {
    label: "Try it yourself",
    title: "A live board, not a picture of one",
    lede: "This is not a screenshot. Click any bar: the filter context changes, every measure recalculates, and next to it you see the DAX behind the number and the common mistake it avoids.",
  },
  method: {
    label: "Method",
    title: "From question to decision",
    lede: "I do not start from the data or the tool. I start from the decision management needs to make, and work backwards.",
    outLabel: "Output",
    steps: [
      { t: "Question", d: "I sit with the decision owner until the question is one measurable sentence, and we agree the definition of every number before any formula is written.", out: "KPI dictionary" },
      { t: "Data", d: "I read the file before trusting it: snapshot or increment? What does one row mean? What is blank and what is ambiguous? I measure the columns instead of assuming them.", out: "Data quality report" },
      { t: "Model", d: "A star schema with a clear grain, cleaning in Power Query rather than in formulas, and a date table that knows where the data ends.", out: "Documented model" },
      { t: "Design", d: "One page per question, the key number first, colour with a job, Arabic with the right direction. I test on a phone and on someone who has never seen it.", out: "A board read in seconds" },
      { t: "Operation", d: "Automated refresh and delivery, a check that catches errors before the reader does, and numbers verified from an independent source before any handover.", out: "A system that runs every morning" },
    ],
  },
  cases: {
    label: "Case studies",
    title: "How I think, in detail",
    lede: "Four real problems from my work: the question, the data problem, the model, the code and the decision. The figures are illustrative; the method and the mistakes are real.",
    read: "Read the case study",
  },
  lessons: {
    label: "Lessons from production",
    title: "Mistakes no course shows you",
    lede: "A wrong number does not announce itself. These happened in systems running for real, and each one became a permanent check.",
    labels: { wrong: "The mistake", caught: "How it surfaced", rule: "The rule" },
    note: "Lessons are written without any figures or details from work data.",
    items: [
      { t: "A running year against a full year", wrong: "Some months of this year against twelve of the last showed a large fall that never happened.", caught: "A number looked too good, so I recomputed it month by month.", rule: "Compare the same months in both years, up to the last complete month, and say so next to the number." },
      { t: "A rate that counts non-responders", wrong: "Satisfaction counted unrated reports as satisfied, so it looked close to perfect.", caught: "Its denominator did not match the real number of ratings.", rule: "State every rate's denominator. Unrated is neither satisfied nor dissatisfied." },
      { t: "The silent zero", wrong: "An empty input returned zero, producing a confident “no problem” when the truth was otherwise.", caught: "A zero that disagreed with what the field knew.", rule: "An empty result from an unknown input returns an explicit error, never a zero." },
      { t: "Upload age is not data age", wrong: "A green badge called the data fresh because the file was uploaded days ago, while it covered an old period.", caught: "Comparing upload time with the last period inside the file.", rule: "Freshness is the period the data covers and its coverage, not the moment of upload." },
      { t: "A polluted metric", wrong: "A large share of system visits came from automated test accounts, inflating usage.", caught: "I found visits from accounts that no longer existed.", rule: "Clean at read time and report what was excluded. A polluted metric is worse than none, because it is read with confidence." },
      { t: "Assuming the time zone", wrong: "I converted timestamps to Riyadh time when they were already stored in it, pushing night reports into the next day and shifting monthly totals.", caught: "Comparing the file's last report with its download time proved the assumption backwards.", rule: "Proof comes from the file, not the function. Two numbers computed with the same mistake agreeing is not evidence." },
    ],
  },
  reports: {
    label: "Management reporting",
    title: "Management reports",
    lede: "Annual and completion reports, technical studies and governance guides. I wrote the content and designed each one to be read in a single meeting.",
    items: AR.reports.items.map((r, i) => ({
      ...r,
      ...[
        { title: "Annual report 2024", note: "O&M supervision project" },
        { title: "Thumama bridge completion report", note: "Dismantling, transport and storage" },
        { title: "RASI matrix in governance", note: "A visual guide to responsibilities" },
        { title: "Lighting network safety report", note: "Hazard locations and remedies" },
        { title: "Wall-lamp technical study", note: "Condition, options and recommendation" },
        { title: "Challenges and actions taken", note: "Deck for senior management" },
        { title: "Response & support directorate report", note: "Annual directorate report" },
        { title: "Benefits of digitisation", note: "Awareness infographic" },
      ][i],
    })),
  },
  workshops: {
    label: "Workshops",
    title: "Power BI workshops",
    lede: "Hands-on workshops I delivered to Municipality staff in the West, North and South sectors. Each one starts from a raw file with deliberate errors and ends with a published report that refreshes in one click.",
    numbers: [
      { value: "150+", label: "participants" },
      { value: "360+", label: "hours delivered" },
      { value: "52", label: "pages of prepared material" },
    ],
    photos: AR.workshops.photos.map((p, i) => ({
      ...p,
      title: ["Walking through a live dashboard", "Workshop hall", "Hands-on practice", "West sector workshop", "Business analysis with Power BI", "Signing participants' certificates"][i],
    })),
    link: { href: "/en/training", label: "Workshop syllabus and material" },
  },
  experience: {
    label: "Career",
    title: "Experience",
    jobs: [
      {
        period: "Dec 2021 to present",
        role: "Business & Data Analyst",
        org: "Al-Shathri Company, Riyadh Municipality projects (Operations & Maintenance Agency)",
        points: [
          "Built an operations platform that tracks street-lighting maintenance contracts for the Wasat sector, from data cleaning to the decision dashboard.",
          "Automated the daily executive report so it reaches the director by email and Telegram instead of being prepared by hand every morning.",
          "Classified lighting poles and stations into risk tiers from resistance and leakage readings, so repair priority rests on measurement.",
          "Analysed and mapped lighting complaints across geographic zones by district, cause and period.",
          "Built an analytics platform for the North sector with self-serve Excel upload, access control and scheduled reports.",
          "Built earned-value project boards: schedule and cost performance indices for every contract.",
        ],
      },
      {
        period: "2017 to 2021",
        role: "Business Analyst & Designer",
        org: "Mihab Advertising & Marketing",
        points: [
          "Visual identities and digital and print campaigns for multiple brands.",
          "Editing and motion graphics in Premiere and After Effects, and project delivery.",
        ],
      },
    ],
  },
  skills: {
    label: "Tools",
    title: "Skills",
    groups: [
      { title: "Data analysis & modelling", items: ["Power BI", "DAX", "Power Query", "Data modelling", "SQL", "Advanced Excel"] },
      { title: "Systems & automation", items: ["n8n", "Supabase / PostgreSQL", "Python", "Next.js", "APIs"] },
      { title: "Project management & reporting", items: ["KPIs", "Earned value (EVM)", "Executive reporting", "Requirements gathering"] },
      { title: "Design", items: ["Illustrator", "InDesign", "Photoshop", "After Effects", "Figma"] },
    ],
  },
  creds: {
    label: "Certification",
    title: "Certification & education",
    capm: { title: "CAPM, Project Management Institute (PMI)", meta: "No. 4183768, September 2025 to September 2028", img: "/certs/capm.png", href: "/certs/capm.pdf" },
    coursesTitle: "LinkedIn Learning courses",
    courses: AR.creds.courses,
    eduTitle: "Education",
    edu: "Bachelor of Laws (LL.B.), Zagazig University, 2011",
    langTitle: "Languages",
    langs: [
      { name: "Arabic", level: "Native" },
      { name: "English", level: "Very good" },
    ],
  },
  contact: {
    label: "Contact",
    title: "Contact",
    lede: "For a role or an interview.",
    labels: { phone: "Phone", email: "Email", linkedin: "LinkedIn", cv: "CV" },
  },
  close: "THANK YOU",
  closeSub: "Selected work",
  footer: "Ahmed Mahmoud Swid, Riyadh",
  zoom: "Enlarge",
  closeLabel: "Close",
};

export const getFolio = (lang: Lang): Folio => (lang === "en" ? EN : AR);
