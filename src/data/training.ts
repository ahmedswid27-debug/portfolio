// ============================================================
//  ملفُّ ورش العمل ومحاورها — صفحة /training و /en/training.
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

/** ملفُّ ورش العمل — صفحةٌ واحدة لا تذكر غير الورش. */
export type TrainerCv = {
  back: string;
  print: string;
  role: string;
  summaryTitle: string;
  summary: string;
  domainsTitle: string;
  domains: string[];
  recordTitle: string;
  recordOrg: string;
  recordPeriod: string;
  record: string[];
  programmeTitle: string;
  programmeMeta: string;
  programme: { w: string; line: string }[];
  materialsTitle: string;
  materials: string[];
  methodTitle: string;
  method: string;
  qualsTitle: string;
  quals: { t: string; m: string }[];
  langsTitle: string;
  practiceTitle: string;
  practice: string;
};

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

  ctaTitle: string;
  ctaBody: string;
  ctaWhatsapp: string;
  ctaEmail: string;
  ctaProfile: string;
  ctaCv: string;
};

// ───────────────────────────── عربي ─────────────────────────────

const AR: TrainingContent = {
  dir: "rtl",
  back: "الملف المهني ←",
  badge: "ملف ورش العمل",
  title: "تحليل الأعمال وبناء لوحات المعلومات بـ Power BI",
  lead:
    "ورش عمل تطبيقية في تحليل الأعمال وبناء لوحات المعلومات، نفَّذها أحمد محمود سويد " +
    "لمنسوبي أمانة منطقة الرياض. تبدأ الورشة من ملف خام فيه عيوب حقيقية، وتنتهي بتقرير " +
    "منشور ومؤمَّن يُحدَّث بضغطة واحدة. والمادة والبيانات التطبيقية مُعَدَّة مسبقًا.",

  // ⚠ سجلٌّ تراكميّ لما نُفِّذ فعلاً، لا وصفٌ لبرنامجٍ واحد.
  stats: [
    { value: "+150", label: "مشارك" },
    { value: "+360", label: "ساعة تنفيذ" },
    { value: "+30", label: "جلسة تطبيقية" },
    { value: "+30", label: "أسبوع عمل" },
  ],

  evidenceTitle: "من قاعة الورشة",
  evidenceSub:
    "ورش Power BI لمنسوبي أمانة منطقة الرياض — قطاعات الغرب والشمال والجنوب. " +
    "المقاطع المعلّمة بهوية الأمانة من تغطية حساب التواصل الداخلي بالأمانة.",
  clips: [
    {
      src: "/training/video/workshop-west.mp4",
      poster: "/training/video/workshop-west.jpg",
      title: "ورشة Power BI — قطاع الغرب",
      meta: "11–15 يناير 2026 · تغطية رسمية من أمانة منطقة الرياض",
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
      meta: "من الورشة",
      portrait: true,
    },
    {
      src: "/training/video/explaining.mp4",
      poster: "/training/video/explaining.jpg",
      title: "متابعة المشاركين على أجهزتهم",
      meta: "من الورشة",
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
      title: "تسليم شهادات المشاركين",
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
    { k: "الصيغة", v: "ورشة مكثفة في أسبوع، أو جلسات موزّعة على أربعة أسابيع، أو جلسات فردية — حسب جدول الجهة." },
    { k: "مدة الجلسة", v: "ساعتان إلى ساعتين ونصف، منها 15 دقيقة لمراجعة واجب الجلسة السابقة." },
    { k: "حجم المجموعة", v: "12 إلى 16 مشاركًا. الورشة تطبيقية وكل مشارك يعمل على جهازه، فالعدد الأكبر يفقد المتابعة الفردية." },
    { k: "اللغة", v: "عربي، والمصطلح التقني بلفظه الإنجليزي كما يرد في الأداة وفي التوثيق." },
    { k: "التجهيزات", v: "قاعة بأجهزة أو أجهزة شخصية، وشاشة عرض، وإنترنت للنشر إلى Power BI Service في الجلسة الأخيرة." },
  ],

  curriculumTitle: "محاور الورشة",
  curriculumSub: "أربعة محاور متدرّجة، لكل محور مخرَج يراه المشارك بنفسه قبل الانتقال إلى ما بعده.",
  labLabel: "تطبيق",
  outcomeLabel: "مخرَج المحور",
  pivotLabel: "جلسة مفصلية",
  weeks: [
    {
      n: "1",
      title: "المحور الأول — من الفوضى إلى جدول نظيف",
      hours: "",
      outcome: "ملف يحدث بضغطة واحدة، بعد أن كان عمل ساعتين يدوياً كل شهر.",
      sessions: [
        {
          n: "1",
          title: "موضع Power BI ودورة البيانات",
          hours: "",
          points: [
            "دورة البيانات: تولد ← تخزن ← تحلل ← تستهلك ← تثير أسئلة جديدة",
            "المسار الكامل: مصادر ← Power Query ← النموذج ← الرسوم ← النشر",
            "Excel وPower BI: لكل منهما قوة وضعف، ولا يلغي أحدهما الآخر",
            "الرخص: ما يلزم للتدريب وما يلزم للمشاركة لاحقاً",
          ],
          lab: "فتح الأداة والتنقل بين الأوضاع الثلاثة وتسميتها",
        },
        {
          n: "2",
          title: "Power Query — الاستيراد والتنظيف",
          hours: "",
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
          n: "3",
          title: "Power Query — الجمع والأتمتة",
          hours: "",
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
      n: "2",
      title: "المحور الثاني — النموذج",
      hours: "",
      outcome: "نموذج نظيف يجيب أسئلة لم تكن ممكنة على الجدول الخام.",
      sessions: [
        {
          n: "4",
          title: "النمذجة البعدية والعلاقات",
          hours: "",
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
          n: "5",
          title: "جدول التاريخ والهرميات",
          hours: "",
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
          n: "6",
          title: "DAX — المقياس والعمود المحسوب",
          hours: "",
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
      n: "3",
      title: "المحور الثالث — قلب الأداة",
      hours: "",
      outcome: "المشارك يكتب مقاييسه بنفسه، ويشخص أخطاءها بنفسه.",
      sessions: [
        {
          n: "7",
          title: "سياق المرشح — Filter Context",
          hours: "",
          pivot: true,
          points: [
            "لماذا يتغير رقم المقياس نفسه من رسم إلى آخر؟",
            "سياق الصف مقابل سياق المرشح",
            "كيف يفرض الرسم سياقه: المحور · المقسم · المرشح · الصف",
            "التمرين المحوري: مقياس واحد يعرض في خمسة مواضع فيعطي خمسة أرقام، ثم يشرح كل منها",
            "لا انتقال إلى الجلسة الثامنة قبل أن يشرح المشارك الفرق بلا مساعدة",
          ],
          lab: "تشخيص ثلاثة أرقام «خاطئة» ومعرفة سبب كل منها",
        },
        {
          n: "8",
          title: "CALCULATE وأخواتها",
          hours: "",
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
          n: "9",
          title: "ذكاء الوقت — Time Intelligence",
          hours: "",
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
      n: "4",
      title: "المحور الرابع — العرض والتسليم",
      hours: "",
      outcome: "تقرير منشور ومؤمن، يعرضه المشارك في خمس عشرة دقيقة.",
      sessions: [
        {
          n: "10",
          title: "الرسوم واختيارها",
          hours: "",
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
          n: "11",
          title: "التفاعل والتنقل",
          hours: "",
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
          n: "12",
          title: "النشر والحوكمة والمشروع الختامي",
          hours: "",
          points: [
            "النشر إلى الخدمة · مساحات العمل · المشاركة",
            "لوحة المعلومات مقابل التقرير: الفرق، ومتى كل منهما",
            "التنبيهات والتحديث المجدول",
            "أمان مستوى الصف RLS: كل جهة ترى نطاقها — ويختبر",
            "قرر ما يدخل النموذج قبل أن يبني الناس فوقه، فالحذف بعد ذلك يكسر تقاريرهم",
          ],
          lab: "المشروع الختامي: من الملف الخام إلى تقرير منشور مؤمن",
        },
      ],
    },
  ],

  methodTitle: "منهجية التدريب",
  methodSub: "خمس قواعد مستخلصة من تدريب أكثر من 150 موظفاً.",
  method: [
    { n: "1", t: "لا شريحة تقرأ", d: "الشرح على الشاشة الحية، والمشارك يعمل معك لا يشاهدك." },
    { n: "2", t: "الخطأ يصنع عمداً", d: "ثم يشخص. تشخيص الخطأ يثبت المعلومة أكثر من الطريق الصحيح." },
    { n: "3", t: "«لماذا» قبل «كيف»", d: "المشارك المحترف لا يقبل خطوة بلا سبب، وهذه ميزة تستثمر لا عائق." },
    { n: "4", t: "المصطلح إنجليزي ومعناه عربي", d: "لأنه سيقرأ التوثيق ويعمل مع أدوات إنجليزية بعد انتهاء الدورة." },
    { n: "5", t: "جلسة التوقف", d: "إن تعثر في سياق المرشح أعيدت الجلسة السابعة، ولم يمض قدماً." },
  ],

  dataTitle: "البيانات التطبيقية",
  dataSub:
    "ستة ملفات معدة خصيصاً، في كل منها عيب مقصود يخدم درساً بعينه. " +
    "والمبدأ: الملف النظيف لا يعلم شيئاً، والمشارك يتعلم من الفوضى.",
  dataHead: ["الملف", "العيب المقصود", "الدرس"],
  dataRows: [
    { file: "السجلات الخام (CSV)", flaw: "ثلاثة صفوف عنوان، وأعمدة بلا أسماء", lesson: "جلسة 2 · التنظيف" },
    { file: "جدول المرجع (XLSX)", flaw: "جدول داخل ورقة فيها ملاحظات جانبية", lesson: "جلسة 3 · الجدول لا الورقة" },
    { file: "النطاقات (XLSX)", flaw: "حقلان في عمود واحد، ومسافات حوله", lesson: "جلسة 3 · التقسيم والتشذيب" },
    { file: "الجهات (CSV)", flaw: "الاسم بصيغتين: همزة، وبادئة زائدة", lesson: "جلسة 3 · التوحيد قبل الربط" },
    { file: "ملفات شهرية (6 ملفات)", flaw: "متطابقة البنية، تتجدد كل شهر", lesson: "جلسة 3 · موصل المجلد" },
    { file: "سجلات سنة سابقة", flaw: "عمودان مختلفان عن أخيه", lesson: "جلسة 3 · الضم غير المتطابق" },
  ],
  dataNote:
    "وفي الصفوف عيوب مبثوثة: تواريخ نصية · أكواد 1/0 تحتاج ترجمة · حالة أحرف مضطربة · " +
    "مسافات عربية مزدوجة · سجلات بلا مرجع لدرس Anti Join · قيم شاذة في زمن المعالجة.",

  assessTitle: "التقويم",
  assess: [
    { k: "واجب بعد كل جلسة", v: "30 إلى 45 دقيقة، يراجع في أول 15 دقيقة من الجلسة التالية." },
    { k: "ثلاث نقاط تفتيش", v: "في نهاية كل أسبوع من الأسابيع الثلاثة الأولى." },
    { k: "بوابة إلزامية", v: "الجلسة السابعة: لا انتقال قبل أن يشرح المشارك سياق المرشح بلسانه." },
    { k: "المشروع الختامي", v: "ملف خام ← تقرير منشور مؤمن، يعرضه المشارك في خمس عشرة دقيقة." },
  ],

  takeawayTitle: "ما يخرج به المشارك",
  takeaways: [
    "ملف pbix كامل بناه بنفسه من ملف خام",
    "تقرير منشور على Power BI Service بصلاحيات مضبوطة",
    "مرجع مكتوب بالمصطلحات: الإنجليزي ومقابله العربي المعتمد",
    "نسخة من البيانات التطبيقية ليعيد التمرين بعد انتهاء الورشة",
    "قائمة تحقق قبل نشر أي تقرير",
  ],

  ctaTitle: "لتنسيق دورة",
  ctaBody:
    "البرنامج قابل للتكييف حسب مدة المركز وعدد المشاركين ومستواهم، " +
    "وتجهز البيانات التطبيقية على مجال الجهة المشاركة إن طلب ذلك.",
  ctaWhatsapp: "واتساب",
  ctaEmail: "البريد الإلكتروني",
  ctaProfile: "الملف المهني الكامل",
  ctaCv: "ملف ورش العمل — نسخة للطباعة",
};

// ──────────────────────────── English ────────────────────────────

const EN: TrainingContent = {
  dir: "ltr",
  back: "← Professional profile",
  badge: "Workshop profile",
  title: "Business Analysis & Dashboard Design with Power BI",
  lead:
    "Hands-on workshops in business analysis and dashboard design, delivered by Ahmed Mahmoud Swid " +
    "to Riyadh Municipality staff. Each workshop starts from a raw file with real defects and ends " +
    "with a published, secured report that refreshes with a single click. Material and practice data are prepared in advance.",

  // Cumulative record of what was actually delivered — not one programme's shape.
  stats: [
    { value: "+150", label: "Participants" },
    { value: "+360", label: "Hours delivered" },
    { value: "+30", label: "Hands-on sessions" },
    { value: "+30", label: "Weeks of delivery" },
  ],

  evidenceTitle: "From the workshop room",
  evidenceSub:
    "Power BI workshops for Riyadh Municipality staff — West, North and South sectors. " +
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
      title: "Working through it with the participants",
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
    { k: "Format", v: "A one-week intensive workshop, sessions spread across four weeks, or one-to-one sessions — to suit the host's schedule." },
    { k: "Session length", v: "Two to two and a half hours, including 15 minutes reviewing the previous session's assignment." },
    { k: "Group size", v: "12 to 16 participants. Every participant works on their own machine, so a larger group loses individual follow-up." },
    { k: "Language", v: "Arabic, with technical terms kept in English as they appear in the tool and its documentation." },
    { k: "Facilities", v: "A room with machines or personal laptops, a display screen, and internet access for publishing to Power BI Service in the final session." },
  ],

  curriculumTitle: "Workshop tracks",
  curriculumSub: "Four progressive tracks. Each ends with an output the participant sees before moving on.",
  labLabel: "Lab",
  outcomeLabel: "Track output",
  pivotLabel: "Pivotal session",
  weeks: [
    {
      n: "1",
      title: "Track 1 — From mess to a clean table",
      hours: "",
      outcome: "A file that refreshes with one click, where it used to be two hours of manual work every month.",
      sessions: [
        {
          n: "1",
          title: "Where Power BI sits, and the data cycle",
          hours: "",
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
          hours: "",
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
          hours: "",
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
      title: "Track 2 — The model",
      hours: "",
      outcome: "A clean model that answers questions the raw table could not.",
      sessions: [
        {
          n: "4",
          title: "Dimensional modelling and relationships",
          hours: "",
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
          hours: "",
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
          hours: "",
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
      title: "Track 3 — The heart of the tool",
      hours: "",
      outcome: "The participant writes their own measures — and diagnoses their own mistakes.",
      sessions: [
        {
          n: "7",
          title: "Filter context",
          hours: "",
          pivot: true,
          points: [
            "Why does the same measure return a different number in a different visual?",
            "Row context versus filter context",
            "How a visual imposes its context: axis · slicer · filter · row",
            "The pivotal exercise: one measure shown in five places returning five numbers, then explaining each",
            "No move to session 8 until the participant explains the difference unaided",
          ],
          lab: "Diagnose three \"wrong\" numbers and name the cause of each",
        },
        {
          n: "8",
          title: "CALCULATE and its family",
          hours: "",
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
          hours: "",
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
      title: "Track 4 — Presentation and delivery",
      hours: "",
      outcome: "A published, secured report the participant presents in fifteen minutes.",
      sessions: [
        {
          n: "10",
          title: "Choosing the right visual",
          hours: "",
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
          hours: "",
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
          title: "Publishing, governance, and the closing project",
          hours: "",
          points: [
            "Publishing to the service · workspaces · sharing",
            "Dashboard versus report: the difference, and when each applies",
            "Alerts and scheduled refresh",
            "Row-level security: each party sees only its own scope — and it gets tested",
            "Decide what enters the model before people build on it; deleting later breaks their reports",
          ],
          lab: "Closing project: from the raw file to a published, secured report",
        },
      ],
    },
  ],

  methodTitle: "Training method",
  methodSub: "Five rules drawn from training more than 150 staff.",
  method: [
    { n: "1", t: "No slide gets read aloud", d: "Teaching happens on the live screen, and the participant works alongside you rather than watching." },
    { n: "2", t: "Mistakes are made on purpose", d: "Then diagnosed. Diagnosing an error fixes the lesson better than the correct path does." },
    { n: "3", t: "\"Why\" before \"how\"", d: "A professional participant will not accept a step without a reason — that is an asset, not an obstacle." },
    { n: "4", t: "English term, Arabic meaning", d: "Because after the course they will read the documentation and work with English tools." },
    { n: "5", t: "The stop session", d: "If filter context does not land, session 7 is repeated and the course does not move on." },
  ],

  dataTitle: "Training data",
  dataSub:
    "Six purpose-built files, each carrying one deliberate defect that serves one lesson. " +
    "The principle: a clean file teaches nothing — the participant learns from the mess.",
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
    { k: "A mandatory gate", v: "Session 7: no progress until the participant explains filter context in their own words." },
    { k: "Closing project project", v: "Raw file → published, secured report, presented by the participant in fifteen minutes." },
  ],

  takeawayTitle: "What the participant leaves with",
  takeaways: [
    "A complete .pbix file they built themselves from a raw source",
    "A report published to Power BI Service with permissions configured",
    "A written glossary: the English term and its agreed Arabic equivalent",
    "A copy of the training data to repeat the exercises after the course",
    "A pre-publish checklist for any future report",
  ],

  ctaTitle: "To arrange a course",
  ctaBody:
    "The programme adapts to the centre's schedule, group size, and starting level, " +
    "and the training data can be rebuilt around the participants' own domain on request.",
  ctaWhatsapp: "WhatsApp",
  ctaEmail: "Email",
  ctaProfile: "Full professional profile",
  ctaCv: "Workshop profile — printable",
};

export const getTraining = (lang: "ar" | "en"): TrainingContent => (lang === "en" ? EN : AR);

// ───────────────────── ملفُّ ورش العمل (نسخةٌ للطباعة) ─────────────────────
//  ⚠ لا تذكر غير ورش العمل — بطلب المالك. ولا تُستعمل صفةُ «مدرّب» في أيّ موضع:
//    الوصفُ فعلٌ منفَّذ (ورشٌ قُدِّمت) لا صفةٌ مهنية، تجنّبًا للمساءلة. والخلفية العملية سطرٌ واحدٌ في
//    آخرها لأنّ مصداقية المحتوى تأتي من ممارسةٍ قائمة، لا بوصفها خبرةً تُعرَض.
//  ⚠ صفحةٌ واحدة: أيّ بندٍ يُضاف يُقاس بعده عددُ الصفحات لا يُفترَض.

const CV_AR: TrainerCv = {
  back: "ملف ورش العمل ←",
  print: "تحميل / طباعة PDF",
  role: "ورش عمل تطبيقية في تحليل الأعمال وبناء لوحات المعلومات — Power BI",

  summaryTitle: "الملخص",
  summary:
    "محلل أعمال وبيانات بأمانة منطقة الرياض، بخبرة تتجاوز خمس سنوات. نفَّذ ورش عمل تطبيقية " +
    "في تحليل الأعمال وبناء لوحات المعلومات بـ Power BI لأكثر من 150 من منسوبي الأمانة، " +
    "تجاوز مجموعها 360 ساعة. وأعدَّ مادتها: بيانات تطبيقية مصمَّمة لغرض التعليم، وكتيِّبات " +
    "مطبوعة، ومعجم مصطلحات عربي إنجليزي. حاصل على شهادة CAPM من معهد إدارة المشاريع PMI.",

  domainsTitle: "مجالات التدريب",
  domains: [
    "Power BI Desktop",
    "Power Query — ETL",
    "نمذجة البيانات — Star Schema",
    "DAX",
    "سياق المرشح — Filter Context",
    "ذكاء الوقت — Time Intelligence",
    "تصميم لوحات المعلومات",
    "بناء مؤشرات الأداء — KPI",
    "Power BI Service والنشر",
    "أمان مستوى الصف — RLS",
    "تنظيف البيانات وجودتها",
    "إعداد التقارير التنفيذية",
  ],

  recordTitle: "سجل ورش العمل",
  recordOrg: "أمانة منطقة الرياض",
  recordPeriod: "أكثر من 5 سنوات",
  record: [
    "ورشة «تحليل الأعمال باستخدام Power BI» لمنسوبي قطاع الغرب — خمسة أيام، 11 إلى 15 يناير 2026، بواقع أربع ساعات ونصف يومياً.",
    "ورشة Power BI لمدة أسبوع لمنسوبي قطاع الشمال، غطّتها قناة التواصل الداخلي بالأمانة.",
    "دورة رسمية في تحليل الأعمال وبناء لوحات المعلومات لمنسوبي قطاع الجنوب.",
    "تدريب وتوجيه أكثر من 150 موظفاً على تحليل البيانات وإعداد التقارير وبناء لوحات المعلومات.",
    "الورشة تطبيقية على الشاشة الحية: كل مشارك يعمل على جهازه، ويُختم البرنامج بمشروع ختامي يعرضه بنفسه.",
  ],

  programmeTitle: "محاور الورشة",
  programmeMeta: "أربعة محاور متدرّجة · عربي بالمصطلح الإنجليزي",
  programme: [
    { w: "المحور الأول", line: "من الفوضى إلى جدول نظيف — الاستيراد والتنظيف والجمع وأتمتة التحديث بـ Power Query. المخرج: ملف يحدّث بضغطة." },
    { w: "المحور الثاني", line: "النموذج — النمذجة البعدية والعلاقات، جدول التاريخ والهرميات، والمقياس مقابل العمود المحسوب في DAX." },
    { w: "المحور الثالث", line: "قلب الأداة — سياق المرشح جلسةً كاملة وبوابةً إلزامية، ثم CALCULATE وأخواتها وذكاء الوقت." },
    { w: "المحور الرابع", line: "العرض والتسليم — اختيار الرسوم والتفاعل والتنقل، ثم النشر والحوكمة وأمان مستوى الصف والمشروع الختامي." },
  ],

  materialsTitle: "المواد المعدة",
  materials: [
    "خطة المنهج ومعيار اللغة — 7 صفحات",
    "الجزء الأول: مقدمة إلى Power BI — 22 صفحة",
    "الجزء الثاني: أول تقرير كامل — 23 صفحة",
    "معجم مصطلحات عربي إنجليزي معتمد للمنهج",
    "ستة ملفات بيانات تدريبية، في كل منها عيب مقصود يخدم درساً بعينه",
    "قائمة تحقق قبل نشر أي تقرير، تسلّم للمشارك",
  ],

  methodTitle: "أسلوب التنفيذ",
  method:
    "لا شريحة تقرأ، والشرح على الشاشة الحية · الخطأ يصنع عمداً ثم يشخّص · «لماذا» قبل «كيف» · " +
    "المصطلح إنجليزي ومعناه عربي · لا انتقال قبل أن يشرح المشارك سياق المرشح بلسانه.",

  qualsTitle: "المؤهلات",
  quals: [
    { t: "CAPM — Certified Associate in Project Management", m: "Project Management Institute (PMI) · رقم 4183768 · 2025–2028" },
    { t: "Complete Guide to Power BI for Data Analysts", m: "Microsoft Press · LinkedIn Learning" },
    { t: "Learning Power BI Desktop", m: "LinkedIn Learning" },
  ],

  langsTitle: "اللغات",
  practiceTitle: "الخلفية العملية",
  practice:
    "ما يُدرَّس مأخوذ من ممارسة قائمة: محلل أعمال وبيانات بأمانة منطقة الرياض، بنى منصة تحليلية من 34 شاشة " +
    "تدير عقود صيانة بقيمة 179.3 مليون ريال، وصنّف 60,658 عمود إنارة إلى خمس درجات خطورة.",
};

const CV_EN: TrainerCv = {
  back: "← Workshop profile",
  print: "Download / Print PDF",
  role: "Hands-on workshops in Business Analysis & Dashboard Design — Power BI",

  summaryTitle: "Summary",
  summary:
    "Business & Data Analyst at Riyadh Municipality with over five years of practice. Has delivered hands-on " +
    "business-analysis and Power BI dashboard workshops to more than 150 Municipality staff, totalling over 360 " +
    "hours, and authored their material: purpose-built practice data, printed handbooks and a glossary. PMI CAPM certified.",

  domainsTitle: "Training areas",
  domains: [
    "Power BI Desktop",
    "Power Query — ETL",
    "Data modelling — star schema",
    "DAX",
    "Filter context",
    "Time intelligence",
    "Dashboard design",
    "KPI development",
    "Power BI Service & publishing",
    "Row-level security",
    "Data cleaning & quality",
    "Executive reporting",
  ],

  recordTitle: "Workshop record",
  recordOrg: "Riyadh Municipality",
  recordPeriod: "5+ years",
  record: [
    "“Business Analysis with Power BI” workshop for West sector staff — five days, 11–15 January 2026, four and a half hours daily.",
    "A week-long Power BI workshop for North sector staff, covered by the Municipality’s internal channel.",
    "An official business analysis and dashboard course for South sector staff.",
    "Trained and mentored more than 150 staff in data analysis, reporting and dashboard building.",
    "Hands-on throughout: every participant works on their own machine, and the programme closes with a closing project they present themselves.",
  ],

  programmeTitle: "Workshop tracks",
  programmeMeta: "Four progressive tracks · Arabic, with English terminology",
  programme: [
    { w: "Track 1", line: "From mess to a clean table — import, clean, combine and automate refresh with Power Query. Output: a file that refreshes in one click." },
    { w: "Track 2", line: "The model — dimensional modelling and relationships, date table and hierarchies, measures versus calculated columns in DAX." },
    { w: "Track 3", line: "The heart of the tool — filter context as a full session and a mandatory gate, then CALCULATE and its family, and time intelligence." },
    { w: "Track 4", line: "Presentation and delivery — visual choice, interaction and navigation, then publishing, governance, RLS and the closing project." },
  ],

  materialsTitle: "Prepared material",
  materials: [
    "Curriculum plan and language standard — 7 pages",
    "Part One: Introduction to Power BI — 22 pages",
    "Part Two: Your first complete report — 23 pages",
    "An agreed Arabic–English glossary for the curriculum",
    "Six training data files, each with one deliberate defect",
    "A pre-publish checklist handed to every participant",
  ],

  methodTitle: "How it runs",
  method:
    "No slide gets read aloud · Mistakes are made on purpose, then diagnosed · “Why” before “how” · " +
    "English term, Arabic meaning · Filter context is a mandatory gate.",

  qualsTitle: "Qualifications",
  quals: [
    { t: "CAPM — Certified Associate in Project Management", m: "Project Management Institute (PMI) · No. 4183768 · 2025–2028" },
    { t: "Complete Guide to Power BI for Data Analysts", m: "Microsoft Press · LinkedIn Learning" },
    { t: "Learning Power BI Desktop", m: "LinkedIn Learning" },
  ],

  langsTitle: "Languages",
  practiceTitle: "Practical background",
  practice:
    "What is taught comes from live practice: a Business & Data Analyst at Riyadh Municipality who built a " +
    "34-screen platform running SAR 179.3M of maintenance contracts.",
};

export const getTrainerCv = (lang: "ar" | "en"): TrainerCv => (lang === "en" ? CV_EN : CV_AR);
