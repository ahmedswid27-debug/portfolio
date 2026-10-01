// ============================================================
//  ملف تعريف المدرّب والمنهج — صفحة /training و /en/training.
//
//  مصدر المنهج: C:\Users\User\powerbi-course\training\plan-engineer-28h.md
//  (٢٨ ساعة · ١٢ جلسة · ٤ أسابيع). ويُحدَّث هذا الملف وحده عند تعديل المنهج.
//
//  ⚠ لغة هذه الصفحة رسميةٌ بلا تشكيل وبلا صيغة المتكلّم — تُقرأ من جهةٍ
//    تدريبية لا من زائرٍ عابر، والمصطلح التقنيّ بحروفه اللاتينية لأنّه
//    كذلك في الأداة وفي التوثيق.
// ============================================================

export type Session = {
  n: string;
  title: string;
  hours: string;
  points: string[];
  lab: string;
  /** جلسةٌ محوريةٌ تُبرَز بصرياً ولا تُدمج */
  pivot?: boolean;
};

export type Week = {
  n: string;
  title: string;
  hours: string;
  sessions: Session[];
  outcome: string;
};

export type Clip = {
  src: string;
  poster: string;
  title: string;
  meta: string;
  /** طوليّ (٩:١٦) أم عرضيّ (١٦:٩) — يحدّد نسبة الإطار */
  portrait: boolean;
  /** تغطيةٌ نشرتها الجهة نفسها */
  official?: boolean;
};

export type Doc = { href: string; title: string; meta: string };

export type TrainingContent = {
  dir: "rtl" | "ltr";
  back: string;
  badge: string;
  title: string;
  lead: string;
  stats: { value: string; label: string }[];

  evidenceTitle: string;
  evidenceSub: string;
  clips: Clip[];

  audienceTitle: string;
  audience: { k: string; v: string }[];

  curriculumTitle: string;
  curriculumSub: string;
  weeks: Week[];
  labLabel: string;
  outcomeLabel: string;
  pivotLabel: string;

  methodTitle: string;
  methodSub: string;
  method: { n: string; t: string; d: string }[];

  dataTitle: string;
  dataSub: string;
  dataRows: { file: string; flaw: string; lesson: string }[];
  dataHead: [string, string, string];
  dataNote: string;

  assessTitle: string;
  assess: { k: string; v: string }[];

  takeawayTitle: string;
  takeaways: string[];

  docsTitle: string;
  docsSub: string;
  docsOpen: string;
  docs: Doc[];

  ctaTitle: string;
  ctaBody: string;
  ctaWhatsapp: string;
  ctaEmail: string;
  ctaProfile: string;
};

// ───────────────────────────── عربي ─────────────────────────────

const AR: TrainingContent = {
  dir: "rtl",
  back: "الملف المهني ←",
  badge: "ملف تدريبي",
  title: "تحليل الأعمال وبناء لوحات المعلومات بـ Power BI",
  lead:
    "برنامج تدريبي تطبيقي مدته ٢٨ ساعة، يقدمه أحمد محمود سويد، محلل أعمال وبيانات " +
    "بأمانة منطقة الرياض وحاصل على شهادة CAPM من معهد إدارة المشاريع PMI. " +
    "يبدأ البرنامج من ملف خام فيه عيوب حقيقية، وينتهي بتقرير منشور ومؤمن يحدث بضغطة واحدة.",

  stats: [
    { value: "+150", label: "متدرب" },
    { value: "28", label: "ساعة تدريب" },
    { value: "12", label: "جلسة تطبيقية" },
    { value: "4", label: "أسابيع" },
  ],

  evidenceTitle: "من قاعة التدريب",
  evidenceSub:
    "ورشة Power BI لمدة أسبوع لمنسوبي أمانة منطقة الرياض — قطاعا الغرب والشمال. " +
    "المقاطع المعلّمة بهوية الأمانة من تغطية حساب التواصل الداخلي بالأمانة.",
  clips: [
    {
      src: "/training/video/workshop-west.mp4",
      poster: "/training/video/workshop-west.jpg",
      title: "ورشة Power BI — قطاع الغرب",
      meta: "١١–١٥ يناير ٢٠٢٦ · تغطية رسمية من أمانة منطقة الرياض",
      portrait: true,
      official: true,
    },
    {
      src: "/training/video/workshop-north.mp4",
      poster: "/training/video/workshop-north.jpg",
      title: "ورشة Power BI — قطاع الشمال",
      meta: "تغطية رسمية · أمانة منطقة الرياض",
      portrait: true,
      official: true,
    },
    {
      src: "/training/video/teaching.mp4",
      poster: "/training/video/teaching.jpg",
      title: "شرح على الشاشة الحية",
      meta: "جلسة تطبيقية",
      portrait: true,
    },
    {
      src: "/training/video/explaining.mp4",
      poster: "/training/video/explaining.jpg",
      title: "متابعة المتدربين على أجهزتهم",
      meta: "جلسة تطبيقية",
      portrait: true,
    },
    {
      src: "/training/video/hall.mp4",
      poster: "/training/video/hall.jpg",
      title: "قاعة التدريب",
      meta: "ورشة الأسبوع",
      portrait: false,
    },
    {
      src: "/training/video/certificates.mp4",
      poster: "/training/video/certificates.jpg",
      title: "تسليم شهادات المتدربين",
      meta: "ختام الورشة",
      portrait: false,
    },
    {
      src: "/training/video/dashboard.mp4",
      poster: "/training/video/dashboard.jpg",
      title: "نموذج من مخرجات التدريب — لوحة مبيعات تفاعلية",
      meta: "تسجيل للوحة حية · بيانات تدريبية",
      portrait: false,
    },
  ],

  audienceTitle: "الفئة المستهدفة وشروط التنفيذ",
  audience: [
    {
      k: "لمن",
      v: "المحللون والمهندسون وموظفو التشغيل والمتابعة ومعدو التقارير — من يعمل على Excel يومياً ويحتاج الانتقال إلى نموذج بيانات يحدث بضغطة واحدة.",
    },
    { k: "المتطلبات", v: "جهاز بنظام Windows، وPower BI Desktop (مجاني)، وإلمام أساسي بـ Excel. لا تشترط خبرة برمجية." },
    { k: "الصيغة", v: "١٢ جلسة على أربعة أسابيع (٣ جلسات أسبوعياً)، أو ورشة مكثفة في أسبوع واحد، أو تدريب فردي." },
    { k: "مدة الجلسة", v: "ساعتان إلى ساعتين ونصف، منها ١٥ دقيقة لمراجعة واجب الجلسة السابقة." },
    { k: "حجم المجموعة", v: "١٢ إلى ١٦ متدرباً. التدريب تطبيقي وكل متدرب يعمل على جهازه، فالعدد الأكبر يفقد المتابعة الفردية." },
    { k: "اللغة", v: "عربي، والمصطلح التقني بلفظه الإنجليزي كما يرد في الأداة وفي التوثيق." },
    { k: "التجهيزات", v: "قاعة بأجهزة أو أجهزة شخصية، وشاشة عرض، وإنترنت للنشر إلى Power BI Service في الجلسة الأخيرة." },
  ],

  curriculumTitle: "المنهج",
  curriculumSub: "أربعة أسابيع، لكل أسبوع مخرج يراه المتدرب بنفسه قبل الانتقال إلى ما بعده.",
  labLabel: "تطبيق",
  outcomeLabel: "مخرج الأسبوع",
  pivotLabel: "جلسة مفصلية",
  weeks: [
    {
      n: "١",
      title: "من الفوضى إلى جدول نظيف",
      hours: "٧ ساعات",
      outcome: "ملف يحدث بضغطة واحدة، بعد أن كان عمل ساعتين يدوياً كل شهر.",
      sessions: [
        {
          n: "١",
          title: "موضع Power BI ودورة البيانات",
          hours: "٢ س",
          points: [
            "دورة البيانات: تولد ← تخزن ← تحلل ← تستهلك ← تثير أسئلة جديدة",
            "المسار الكامل: مصادر ← Power Query ← النموذج ← الرسوم ← النشر",
            "Excel وPower BI: لكل منهما قوة وضعف، ولا يلغي أحدهما الآخر",
            "الرخص: ما يلزم للتدريب وما يلزم للمشاركة لاحقاً",
          ],
          lab: "فتح الأداة والتنقل بين الأوضاع الثلاثة وتسميتها",
        },
        {
          n: "٢",
          title: "Power Query — الاستيراد والتنظيف",
          hours: "٢٫٥ س",
          points: [
            "المحرر: الاستعلامات · الخطوات المطبقة · المعاينة",
            "Transform Data لا Load — القرار الأول، وأكثر ما يخطأ فيه",
            "ملف فيه صفوف عنوان: حذف الفارغ ← حذف العلوي ← ترقية الترويسة",
            "الأنواع تراجع بعد كل ترقية، والنوع Any ممنوع",
            "حساسية حالة الأحرف: التوحيد قبل الترشيح لا بعده",
            "العربية أشد: ا/أ/إ · ة/ه · ي/ى · المسافة المزدوجة",
          ],
          lab: "تنظيف ملف بلاغات خام حتى يصير صالحاً للتحميل",
        },
        {
          n: "٣",
          title: "Power Query — الجمع والأتمتة",
          hours: "٢٫٥ س",
          points: [
            "Split by Delimiter — عمود مركب ومسافاته الخفية",
            "Merge بأنواع الوصل الستة، ومؤشر التطابق قراءة تشخيصية",
            "Anti Join — «أي سجل بلا مرجع؟» أداة التدقيق الأولى",
            "Append لملفين بأعمدة غير متطابقة",
            "موصل المجلد: ملف جديد كل شهر يدخل بلا تعديل",
            "تعطيل التحميل والتوثيق وخريطة الاعتماديات",
          ],
          lab: "بناء مجموعة الاستعلامات كاملة، وتشغيل تحديث واحد ينظف الكل",
        },
      ],
    },
    {
      n: "٢",
      title: "النموذج",
      hours: "٧ ساعات",
      outcome: "نموذج نظيف يجيب أسئلة لم تكن ممكنة على الجدول الخام.",
      sessions: [
        {
          n: "٤",
          title: "النمذجة البعدية والعلاقات",
          hours: "٢٫٥ س",
          points: [
            "لماذا لا يكفي جدول واحد عريض",
            "المخطط النجمي: جداول حقائق وجداول أبعاد",
            "العلاقة: المفتاح · الاتجاه · التعددية",
            "العلاقة ثنائية الاتجاه: متى تلزم، ولماذا تتجنب افتراضياً",
            "العلاقات غير النشطة ومتى تفعل",
            "التوازن الثلاثي: بساطة للمستخدم ⟷ حجم للأداء ⟷ سهولة صيانة",
          ],
          lab: "ربط جدول الحقائق بجداول الأبعاد ومراجعة اتجاه الترشيح",
        },
        {
          n: "٥",
          title: "جدول التاريخ والهرميات",
          hours: "٢ س",
          points: [
            "إطفاء التاريخ التلقائي أولاً — ينشئ جدولاً خفياً لكل عمود تاريخ",
            "بناء جدول تاريخ صريح واعتماده",
            "الهرميات: المستوى الأعلى ← الأدنى، والتنقل بينها",
            "خصائص الأعمدة: التنسيق · التصنيف · التلخيص · الترتيب بعمود",
            "ما لا يستعمل يخفى ولا يحذف",
          ],
          lab: "جدول تاريخ كامل وهرم جغرافي يعمل بالتنقل",
        },
        {
          n: "٦",
          title: "DAX — المقياس والعمود المحسوب",
          hours: "٢٫٥ س",
          points: [
            "الفرق الجوهري: العمود يحسب صفاً صفاً ويخزن، والمقياس يحسب عند العرض",
            "متى عمود ومتى مقياس — سؤال يتكرر طول العمل",
            "الأساسيات: SUM · COUNTROWS · DISTINCTCOUNT · DIVIDE",
            "DIVIDE لا القسمة العادية — القسمة على صفر تفسد التقرير",
            "المنطق: IF · SWITCH",
            "تنظيم المقاييس في جدول خاص",
          ],
          lab: "ثمانية مقاييس أساسية مكتوبة ومراجعة",
        },
      ],
    },
    {
      n: "٣",
      title: "قلب الأداة",
      hours: "٧ ساعات",
      outcome: "المتدرب يكتب مقاييسه بنفسه، ويشخص أخطاءها بنفسه.",
      sessions: [
        {
          n: "٧",
          title: "سياق المرشح — Filter Context",
          hours: "٢٫٥ س",
          pivot: true,
          points: [
            "لماذا يتغير رقم المقياس نفسه من رسم إلى آخر؟",
            "سياق الصف مقابل سياق المرشح",
            "كيف يفرض الرسم سياقه: المحور · المقسم · المرشح · الصف",
            "التمرين المحوري: مقياس واحد يعرض في خمسة مواضع فيعطي خمسة أرقام، ثم يشرح كل منها",
            "لا انتقال إلى الجلسة الثامنة قبل أن يشرح المتدرب الفرق بلا مساعدة",
          ],
          lab: "تشخيص ثلاثة أرقام «خاطئة» ومعرفة سبب كل منها",
        },
        {
          n: "٨",
          title: "CALCULATE وأخواتها",
          hours: "٢٫٥ س",
          points: [
            "CALCULATE — الدالة التي تعدل السياق، ولب DAX كله",
            "FILTER: متى تلزم، ومتى تكون ترفاً مكلفاً",
            "ALL · ALLEXCEPT · REMOVEFILTERS لإزالة المرشحات",
            "النسب: نسبة الجزء من المجموعة، ونسبة المجموعة من الكل",
            "المقاييس السريعة تستعمل، ثم يقرأ الكود المتولد ويفهم",
          ],
          lab: "نسب وترتيبات تتفاعل مع المقسمات على الوجه الصحيح",
        },
        {
          n: "٩",
          title: "ذكاء الوقت — Time Intelligence",
          hours: "٢ س",
          points: [
            "TOTALYTD · SAMEPERIODLASTYEAR · DATEADD · PREVIOUSMONTH",
            "لا تعمل إلا بجدول تاريخ معتمد — وهنا تظهر ثمرة الجلسة الخامسة",
            "الشهر الجاري ناقص، فلا يقارن بشهر تام",
            "الاتجاه يقرأ على متوسط فترة، لا على شهر مقابل شهر",
            "اتجاه المؤشر: ارتفاع العدد قد يعني تدهور الأداء، وعكسه يقلب كل حكم",
          ],
          lab: "مقارنة شهرية وسنوية مع قراءة صحيحة للاتجاه",
        },
      ],
    },
    {
      n: "٤",
      title: "العرض والتسليم",
      hours: "٧ ساعات",
      outcome: "تقرير منشور ومؤمن، يعرضه المتدرب في خمس عشرة دقيقة.",
      sessions: [
        {
          n: "١٠",
          title: "الرسوم واختيارها",
          hours: "٢٫٥ س",
          points: [
            "قاعدة الاختيار: مقارنة ← أعمدة · تطور ← خط · تركيب ← لا دائرة غالباً",
            "البطاقة والمؤشر، ومتى يغنيان عن رسم",
            "المقسمات: أنواعها وأثرها على السياق",
            "التنسيق الشرطي بمعيار مكتوب لا بذوق",
            "السمة والخلفية وشبكة الصفحة",
            "الرسم يخدم سؤالاً، ورسم بلا سؤال يحذف",
          ],
          lab: "صفحة مؤشرات رئيسية كاملة",
        },
        {
          n: "١١",
          title: "التفاعل والتنقل",
          hours: "٢ س",
          points: [
            "تحرير التفاعل بين الرسوم — أكثر ما يغفل",
            "التنقل لأسفل ولأعلى، والعبور Drill through",
            "تلميح مخصص بصفحة كاملة",
            "جزء التحديد والإشارات المرجعية والأزرار",
            "جزء المرشحات بمستوياته الثلاثة",
          ],
          lab: "تقرير من ثلاث صفحات متنقلة",
        },
        {
          n: "١٢",
          title: "النشر والحوكمة ومشروع التخرج",
          hours: "٢٫٥ س",
          points: [
            "النشر إلى الخدمة · مساحات العمل · المشاركة",
            "لوحة المعلومات مقابل التقرير: الفرق، ومتى كل منهما",
            "التنبيهات والتحديث المجدول",
            "أمان مستوى الصف RLS: كل جهة ترى نطاقها — ويختبر",
            "قرر ما يدخل النموذج قبل أن يبني الناس فوقه، فالحذف بعد ذلك يكسر تقاريرهم",
          ],
          lab: "مشروع التخرج: من الملف الخام إلى تقرير منشور مؤمن",
        },
      ],
    },
  ],

  methodTitle: "منهجية التدريب",
  methodSub: "خمس قواعد مستخلصة من تدريب أكثر من ١٥٠ موظفاً.",
  method: [
    { n: "١", t: "لا شريحة تقرأ", d: "الشرح على الشاشة الحية، والمتدرب يعمل معك لا يشاهدك." },
    { n: "٢", t: "الخطأ يصنع عمداً", d: "ثم يشخص. تشخيص الخطأ يثبت المعلومة أكثر من الطريق الصحيح." },
    { n: "٣", t: "«لماذا» قبل «كيف»", d: "المتدرب المحترف لا يقبل خطوة بلا سبب، وهذه ميزة تستثمر لا عائق." },
    { n: "٤", t: "المصطلح إنجليزي ومعناه عربي", d: "لأنه سيقرأ التوثيق ويعمل مع أدوات إنجليزية بعد انتهاء الدورة." },
    { n: "٥", t: "جلسة التوقف", d: "إن تعثر في سياق المرشح أعيدت الجلسة السابعة، ولم يمض قدماً." },
  ],

  dataTitle: "البيانات التدريبية",
  dataSub:
    "ستة ملفات معدة خصيصاً، في كل منها عيب مقصود يخدم درساً بعينه. " +
    "والمبدأ: الملف النظيف لا يعلم شيئاً، والمتدرب يتعلم من الفوضى.",
  dataHead: ["الملف", "العيب المقصود", "الدرس"],
  dataRows: [
    { file: "السجلات الخام (CSV)", flaw: "ثلاثة صفوف عنوان، وأعمدة بلا أسماء", lesson: "جلسة ٢ · التنظيف" },
    { file: "جدول المرجع (XLSX)", flaw: "جدول داخل ورقة فيها ملاحظات جانبية", lesson: "جلسة ٣ · الجدول لا الورقة" },
    { file: "النطاقات (XLSX)", flaw: "حقلان في عمود واحد، ومسافات حوله", lesson: "جلسة ٣ · التقسيم والتشذيب" },
    { file: "الجهات (CSV)", flaw: "الاسم بصيغتين: همزة، وبادئة زائدة", lesson: "جلسة ٣ · التوحيد قبل الربط" },
    { file: "ملفات شهرية (٦ ملفات)", flaw: "متطابقة البنية، تتجدد كل شهر", lesson: "جلسة ٣ · موصل المجلد" },
    { file: "سجلات سنة سابقة", flaw: "عمودان مختلفان عن أخيه", lesson: "جلسة ٣ · الضم غير المتطابق" },
  ],
  dataNote:
    "وفي الصفوف عيوب مبثوثة: تواريخ نصية · أكواد ١/٠ تحتاج ترجمة · حالة أحرف مضطربة · " +
    "مسافات عربية مزدوجة · سجلات بلا مرجع لدرس Anti Join · قيم شاذة في زمن المعالجة.",

  assessTitle: "التقويم",
  assess: [
    { k: "واجب بعد كل جلسة", v: "٣٠ إلى ٤٥ دقيقة، يراجع في أول ١٥ دقيقة من الجلسة التالية." },
    { k: "ثلاث نقاط تفتيش", v: "في نهاية كل أسبوع من الأسابيع الثلاثة الأولى." },
    { k: "بوابة إلزامية", v: "الجلسة السابعة: لا انتقال قبل أن يشرح المتدرب سياق المرشح بلسانه." },
    { k: "مشروع التخرج", v: "ملف خام ← تقرير منشور مؤمن، يعرضه المتدرب في خمس عشرة دقيقة." },
  ],

  takeawayTitle: "ما يخرج به المتدرب",
  takeaways: [
    "ملف pbix كامل بناه بنفسه من ملف خام",
    "تقرير منشور على Power BI Service بصلاحيات مضبوطة",
    "مرجع مكتوب بالمصطلحات: الإنجليزي ومقابله العربي المعتمد",
    "نسخة من البيانات التدريبية ليعيد التمرين بعد انتهاء الدورة",
    "قائمة تحقق قبل نشر أي تقرير",
  ],

  docsTitle: "المواد المعدة",
  docsSub: "كتيبات مصفوفة معدة للطباعة، مشتقة من السكربت نفسه فلا يتفرق المصطلح بينها.",
  docsOpen: "فتح الملف",
  docs: [
    { href: "/training/docs/curriculum-plan.pdf", title: "خطة المنهج ومعيار اللغة", meta: "PDF · ٧ صفحات" },
    { href: "/training/docs/part1-intro-power-bi.pdf", title: "الجزء الأول — مقدمة إلى Power BI", meta: "PDF · ٢٢ صفحة" },
    { href: "/training/docs/part2-first-report.pdf", title: "الجزء الثاني — أول تقرير كامل", meta: "PDF · ٢٣ صفحة" },
  ],

  ctaTitle: "لتنسيق دورة",
  ctaBody:
    "البرنامج قابل للتكييف حسب مدة المركز وعدد المتدربين ومستواهم، " +
    "وتجهز البيانات التدريبية على مجال الجهة المتدربة إن طلب ذلك.",
  ctaWhatsapp: "واتساب",
  ctaEmail: "البريد الإلكتروني",
  ctaProfile: "الملف المهني الكامل",
};

// ──────────────────────────── English ────────────────────────────

const EN: TrainingContent = {
  dir: "ltr",
  back: "← Professional profile",
  badge: "Training profile",
  title: "Business Analysis & Dashboard Design with Power BI",
  lead:
    "A 28-hour hands-on programme delivered by Ahmed Mahmoud Swid, Business & Data Analyst at " +
    "Riyadh Municipality and a PMI-certified CAPM. It starts from a raw file with real defects and " +
    "ends with a published, secured report that refreshes with a single click.",

  stats: [
    { value: "+150", label: "Trainees" },
    { value: "28", label: "Training hours" },
    { value: "12", label: "Hands-on sessions" },
    { value: "4", label: "Weeks" },
  ],

  evidenceTitle: "From the training room",
  evidenceSub:
    "A week-long Power BI workshop for Riyadh Municipality staff — West and North sectors. " +
    "Clips carrying the Municipality's identity are from its own internal-communications coverage.",
  clips: [
    {
      src: "/training/video/workshop-west.mp4",
      poster: "/training/video/workshop-west.jpg",
      title: "Power BI workshop — West sector",
      meta: "11–15 January 2026 · official Riyadh Municipality coverage",
      portrait: true,
      official: true,
    },
    {
      src: "/training/video/workshop-north.mp4",
      poster: "/training/video/workshop-north.jpg",
      title: "Power BI workshop — North sector",
      meta: "Official coverage · Riyadh Municipality",
      portrait: true,
      official: true,
    },
    {
      src: "/training/video/teaching.mp4",
      poster: "/training/video/teaching.jpg",
      title: "Teaching on the live screen",
      meta: "Hands-on session",
      portrait: true,
    },
    {
      src: "/training/video/explaining.mp4",
      poster: "/training/video/explaining.jpg",
      title: "Working through it with the trainees",
      meta: "Hands-on session",
      portrait: true,
    },
    {
      src: "/training/video/hall.mp4",
      poster: "/training/video/hall.jpg",
      title: "The training room",
      meta: "Week-long workshop",
      portrait: false,
    },
    {
      src: "/training/video/certificates.mp4",
      poster: "/training/video/certificates.jpg",
      title: "Certificates awarded",
      meta: "Closing session",
      portrait: false,
    },
    {
      src: "/training/video/dashboard.mp4",
      poster: "/training/video/dashboard.jpg",
      title: "Sample output — interactive sales dashboard",
      meta: "Live report recording · training data",
      portrait: false,
    },
  ],

  audienceTitle: "Audience and delivery requirements",
  audience: [
    {
      k: "Who it is for",
      v: "Analysts, engineers, operations and monitoring staff, and report writers — anyone living in Excel who needs to move to a data model that refreshes with one click.",
    },
    { k: "Prerequisites", v: "A Windows machine, Power BI Desktop (free), and working Excel knowledge. No programming experience required." },
    { k: "Format", v: "12 sessions across four weeks (3 per week), a one-week intensive workshop, or one-to-one coaching." },
    { k: "Session length", v: "Two to two and a half hours, including 15 minutes reviewing the previous session's assignment." },
    { k: "Group size", v: "12 to 16 trainees. Every trainee works on their own machine, so a larger group loses individual follow-up." },
    { k: "Language", v: "Arabic, with technical terms kept in English as they appear in the tool and its documentation." },
    { k: "Facilities", v: "A room with machines or personal laptops, a display screen, and internet access for publishing to Power BI Service in the final session." },
  ],

  curriculumTitle: "Curriculum",
  curriculumSub: "Four weeks. Each one ends with an output the trainee can see before moving on.",
  labLabel: "Lab",
  outcomeLabel: "Week output",
  pivotLabel: "Pivotal session",
  weeks: [
    {
      n: "1",
      title: "From mess to a clean table",
      hours: "7 hours",
      outcome: "A file that refreshes with one click, where it used to be two hours of manual work every month.",
      sessions: [
        {
          n: "1",
          title: "Where Power BI sits, and the data cycle",
          hours: "2 h",
          points: [
            "The data cycle: generated → stored → analysed → consumed → raises new questions",
            "The full path: sources → Power Query → model → visuals → publish",
            "Excel and Power BI: each has its strength; neither replaces the other",
            "Licensing: what the training needs, and what sharing needs later",
          ],
          lab: "Open the tool, move between the three views, and name them",
        },
        {
          n: "2",
          title: "Power Query — import and clean",
          hours: "2.5 h",
          points: [
            "The editor: queries · applied steps · preview",
            "Transform Data, not Load — the first decision, and the most commonly wrong one",
            "A file with title rows: remove blanks → remove top rows → promote headers",
            "Review types after every promotion; the Any type is not allowed",
            "Case sensitivity: normalise before filtering, never after",
            "Arabic is harder: alef forms · taa marbuta · yaa · double spaces",
          ],
          lab: "Clean a raw records file until it is fit to load",
        },
        {
          n: "3",
          title: "Power Query — combine and automate",
          hours: "2.5 h",
          points: [
            "Split by Delimiter — a compound column and its hidden spaces",
            "Merge with all six join kinds, reading the match indicator diagnostically",
            "Anti Join — \"which record has no reference?\", the first auditing tool",
            "Append across two files with mismatched columns",
            "Folder connector: a new monthly file flows in with no edits",
            "Disable load, document the steps, map the dependencies",
          ],
          lab: "Build the full query set and run one refresh that cleans everything",
        },
      ],
    },
    {
      n: "2",
      title: "The model",
      hours: "7 hours",
      outcome: "A clean model that answers questions the raw table could not.",
      sessions: [
        {
          n: "4",
          title: "Dimensional modelling and relationships",
          hours: "2.5 h",
          points: [
            "Why one wide table is not enough",
            "The star schema: fact tables and dimension tables",
            "A relationship: key · direction · cardinality",
            "Bi-directional relationships: when they are needed, why they are avoided by default",
            "Inactive relationships and when to activate them",
            "The three-way trade-off: simplicity ⟷ performance ⟷ maintainability",
          ],
          lab: "Connect the fact table to its dimensions and review filter direction",
        },
        {
          n: "5",
          title: "Date table and hierarchies",
          hours: "2 h",
          points: [
            "Turn off auto date/time first — it creates a hidden table per date column",
            "Build an explicit date table and mark it as such",
            "Hierarchies: top level → lowest, and drilling between them",
            "Column properties: format · category · summarisation · sort by column",
            "What is not used gets hidden, not deleted",
          ],
          lab: "A complete date table and a working geographic hierarchy",
        },
        {
          n: "6",
          title: "DAX — measures and calculated columns",
          hours: "2.5 h",
          points: [
            "The core difference: a column computes row by row and is stored; a measure computes at display time",
            "When a column and when a measure — a question that recurs for a career",
            "The basics: SUM · COUNTROWS · DISTINCTCOUNT · DIVIDE",
            "DIVIDE, not the division operator — dividing by zero breaks the report",
            "Logic: IF · SWITCH",
            "Organising measures in a dedicated table",
          ],
          lab: "Eight core measures, written and reviewed",
        },
      ],
    },
    {
      n: "3",
      title: "The heart of the tool",
      hours: "7 hours",
      outcome: "The trainee writes their own measures — and diagnoses their own mistakes.",
      sessions: [
        {
          n: "7",
          title: "Filter context",
          hours: "2.5 h",
          pivot: true,
          points: [
            "Why does the same measure return a different number in a different visual?",
            "Row context versus filter context",
            "How a visual imposes its context: axis · slicer · filter · row",
            "The pivotal exercise: one measure shown in five places returning five numbers, then explaining each",
            "No move to session 8 until the trainee explains the difference unaided",
          ],
          lab: "Diagnose three \"wrong\" numbers and name the cause of each",
        },
        {
          n: "8",
          title: "CALCULATE and its family",
          hours: "2.5 h",
          points: [
            "CALCULATE — the function that modifies context, and the core of all DAX",
            "FILTER: when it is required, and when it is an expensive luxury",
            "ALL · ALLEXCEPT · REMOVEFILTERS for removing filters",
            "Ratios: part of group, and group of total",
            "Quick measures are used — then the generated code is read and understood",
          ],
          lab: "Ratios and rankings that react correctly to slicers",
        },
        {
          n: "9",
          title: "Time intelligence",
          hours: "2 h",
          points: [
            "TOTALYTD · SAMEPERIODLASTYEAR · DATEADD · PREVIOUSMONTH",
            "None of it works without a marked date table — the payoff from session 5",
            "The current month is incomplete, so it is not compared to a full month",
            "Trend is read over a period average, not month against month",
            "Metric direction: a rising count can mean falling performance, and inverting it reverses every judgement",
          ],
          lab: "Month-on-month and year-on-year comparison, read correctly",
        },
      ],
    },
    {
      n: "4",
      title: "Presentation and delivery",
      hours: "7 hours",
      outcome: "A published, secured report the trainee presents in fifteen minutes.",
      sessions: [
        {
          n: "10",
          title: "Choosing the right visual",
          hours: "2.5 h",
          points: [
            "The selection rule: comparison → bars · change over time → line · composition → rarely a pie",
            "Cards and KPIs, and when they replace a chart entirely",
            "Slicers: their kinds and their effect on context",
            "Conditional formatting against a written rule, not taste",
            "Theme, background, and page grid",
            "A visual serves a question; a visual without one is deleted",
          ],
          lab: "A complete KPI page",
        },
        {
          n: "11",
          title: "Interaction and navigation",
          hours: "2 h",
          points: [
            "Edit interactions between visuals — the most overlooked feature",
            "Drill down, drill up, and drill through",
            "Custom page tooltips",
            "Selection pane, bookmarks, and buttons",
            "The filter pane and its three levels",
          ],
          lab: "A three-page report with working navigation",
        },
        {
          n: "12",
          title: "Publishing, governance, and the capstone",
          hours: "2.5 h",
          points: [
            "Publishing to the service · workspaces · sharing",
            "Dashboard versus report: the difference, and when each applies",
            "Alerts and scheduled refresh",
            "Row-level security: each party sees only its own scope — and it gets tested",
            "Decide what enters the model before people build on it; deleting later breaks their reports",
          ],
          lab: "Capstone: from the raw file to a published, secured report",
        },
      ],
    },
  ],

  methodTitle: "Training method",
  methodSub: "Five rules drawn from training more than 150 staff.",
  method: [
    { n: "1", t: "No slide gets read aloud", d: "Teaching happens on the live screen, and the trainee works alongside you rather than watching." },
    { n: "2", t: "Mistakes are made on purpose", d: "Then diagnosed. Diagnosing an error fixes the lesson better than the correct path does." },
    { n: "3", t: "\"Why\" before \"how\"", d: "A professional trainee will not accept a step without a reason — that is an asset, not an obstacle." },
    { n: "4", t: "English term, Arabic meaning", d: "Because after the course they will read the documentation and work with English tools." },
    { n: "5", t: "The stop session", d: "If filter context does not land, session 7 is repeated and the course does not move on." },
  ],

  dataTitle: "Training data",
  dataSub:
    "Six purpose-built files, each carrying one deliberate defect that serves one lesson. " +
    "The principle: a clean file teaches nothing — the trainee learns from the mess.",
  dataHead: ["File", "Deliberate defect", "Lesson"],
  dataRows: [
    { file: "Raw records (CSV)", flaw: "Three title rows, columns with no names", lesson: "Session 2 · cleaning" },
    { file: "Reference table (XLSX)", flaw: "A table inside a sheet with side notes", lesson: "Session 3 · table, not sheet" },
    { file: "Scopes (XLSX)", flaw: "Two fields in one column, with padding", lesson: "Session 3 · split and trim" },
    { file: "Parties (CSV)", flaw: "The same name in two spellings", lesson: "Session 3 · normalise before joining" },
    { file: "Monthly files (6)", flaw: "Identical structure, renewed monthly", lesson: "Session 3 · folder connector" },
    { file: "Prior-year records", flaw: "Two columns differ from its sibling", lesson: "Session 3 · mismatched append" },
  ],
  dataNote:
    "And defects seeded through the rows: text dates · 1/0 codes needing translation · inconsistent casing · " +
    "double Arabic spaces · records with no reference for the Anti Join lesson · outliers in handling time.",

  assessTitle: "Assessment",
  assess: [
    { k: "Assignment after every session", v: "30 to 45 minutes, reviewed in the first 15 minutes of the next session." },
    { k: "Three checkpoints", v: "At the end of each of the first three weeks." },
    { k: "A mandatory gate", v: "Session 7: no progress until the trainee explains filter context in their own words." },
    { k: "Capstone project", v: "Raw file → published, secured report, presented by the trainee in fifteen minutes." },
  ],

  takeawayTitle: "What the trainee leaves with",
  takeaways: [
    "A complete .pbix file they built themselves from a raw source",
    "A report published to Power BI Service with permissions configured",
    "A written glossary: the English term and its agreed Arabic equivalent",
    "A copy of the training data to repeat the exercises after the course",
    "A pre-publish checklist for any future report",
  ],

  docsTitle: "Prepared material",
  docsSub: "Typeset, print-ready handbooks derived from a single source script, so the terminology never diverges between them.",
  docsOpen: "Open file",
  docs: [
    { href: "/training/docs/curriculum-plan.pdf", title: "Curriculum plan and language standard", meta: "PDF · 7 pages · Arabic" },
    { href: "/training/docs/part1-intro-power-bi.pdf", title: "Part One — Introduction to Power BI", meta: "PDF · 22 pages · Arabic" },
    { href: "/training/docs/part2-first-report.pdf", title: "Part Two — Your first complete report", meta: "PDF · 23 pages · Arabic" },
  ],

  ctaTitle: "To arrange a course",
  ctaBody:
    "The programme adapts to the centre's schedule, group size, and starting level, " +
    "and the training data can be rebuilt around the trainees' own domain on request.",
  ctaWhatsapp: "WhatsApp",
  ctaEmail: "Email",
  ctaProfile: "Full professional profile",
};

export const getTraining = (lang: "ar" | "en"): TrainingContent => (lang === "en" ? EN : AR);
