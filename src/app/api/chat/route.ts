import Anthropic from "@anthropic-ai/sdk";
import { getContent, type Lang } from "@/data/content";

export const runtime = "nodejs";

function buildSystemPrompt(lang: Lang) {
  const c = getContent(lang);
  const { profile, sections, stats } = c;
  const sectionLines = sections
    .map((s) => {
      const items = s.items
        .map((i) => {
          // الأعمال الرئيسية تدخل بأرقامها وقدراتها لا بعنوانها فقط.
          const extra = [
            i.org && `     ${i.org}`,
            i.metrics && `     ${i.metrics.map((m) => `${m.value} ${m.label}`).join(" · ")}`,
            i.highlights && i.highlights.map((h) => `     - ${h}`).join("\n"),
          ]
            .filter(Boolean)
            .join("\n");
          return `   • ${i.title}: ${i.desc}${extra ? `\n${extra}` : ""}`;
        })
        .join("\n");
      return `▪ ${s.name} — ${s.sub}\n${items}`;
    })
    .join("\n\n");
  const statLines = stats.map((s) => `${s.value} ${s.label}`).join(" · ");
  const intro =
    lang === "en"
      ? `You are the AI assistant on ${profile.fullName}'s portfolio. Answer visitors' questions about Ahmed warmly and concisely (2-4 sentences), in the visitor's language. If unsure, refer them to ${profile.email}.`
      : `أنت المساعد الذكي في موقع ${profile.fullName}. أجب عن أسئلة الزوار حول أحمد بدفء وإيجاز (٢-٤ جمل)، بنفس لغة الزائر. إن لم تعرف، وجّههم للإيميل ${profile.email}.`;
  return `${intro}\n\n${profile.bio}\n${profile.title} · ${profile.location} · ${profile.email}\n${statLines}\n\n${sectionLines}`;
}

// ردّ ذكي بدون مفتاح — يعتمد على الكلمات المفتاحية وبيانات الموقع.
function localAnswer(question: string, lang: Lang): string {
  const c = getContent(lang);
  const q = question.toLowerCase();
  const en = lang === "en";
  const has = (...k: string[]) => k.some((x) => q.includes(x));

  if (has("تواصل", "اتصال", "رقم", "ايميل", "ايمي", "contact", "email", "phone", "reach", "hire"))
    return en
      ? `You can reach Ahmed on WhatsApp ${c.profile.phone} or email ${c.profile.email}. He's available for freelance & consulting.`
      : `يمكنك التواصل مع أحمد عبر واتساب ${c.profile.phone} أو البريد ${c.profile.email}. وهو متاح للعمل الحر والاستشارات.`;
  if (has("مخاطر", "خطورة", "سلامة", "risk", "safety"))
    return en
      ? `One of Ahmed's strongest pieces: a risk analysis of Riyadh's street-lighting network that classified 60,658 poles and 445 stations into five risk tiers from resistance and current-leakage readings — so repair priority rests on measurement, not judgement. It's in the Data Analytics section.`
      : `من أقوى أعمال أحمد: تحليل مخاطر شبكة الإنارة في الرياض — صنّف 60,658 عمود إنارة و445 محطة إلى خمس درجات خطورة من قراءات المقاومة والتسريب، فصار ترتيب أولويات الإصلاح مبنيّاً على قياس لا على اجتهاد. تجده في قسم "تحليل البيانات".`;
  if (has("evm", "قيمة مكتسبة", "spi", "مشاريع", "project", "capm", "إدارة مشاريع"))
    return en
      ? `Ahmed holds the CAPM certification and builds earned-value (EVM) performance boards — schedule and cost performance indices per contract, planned versus actual by month, plus collection and budget-adherence rates.`
      : `أحمد حاصل على شهادة CAPM، ويبني لوحات أداء بمنهج القيمة المكتسبة (EVM): مؤشر أداء الجدول والتكلفة لكل عقد، والمخطّط مقابل الفعلي شهرياً، ونِسب التحصيل والالتزام بالموازنة.`;
  if (has("power bi", "داشبورد", "لوحة", "dashboard", "تحليل", "analy", "بيانات", "data"))
    return en
      ? `Ahmed is a certified Power BI expert. His boards run real operations at Riyadh Municipality — lighting risk analysis over 60,658 poles, complaint analytics, earned-value project performance, and executive KPI dashboards. See the Data Analytics section.`
      : `أحمد خبير معتمد في Power BI، ولوحاته تُشغّل عملاً حقيقياً في أمانة الرياض: تحليل مخاطر 60,658 عمود إنارة، وتحليل البلاغات، وأداء المشاريع بالقيمة المكتسبة، ولوحات المؤشرات التنفيذية. اطّلع على قسم "تحليل البيانات".`;
  if (has("تدريب", "كورس", "دورة", "train", "course", "workshop"))
    return en
      ? `Ahmed has trained 150+ employees and delivered an official "Business Analysis with Power BI" course. See the Training section for photos.`
      : `درّب أحمد أكثر من 150 موظفًا وقدّم دورة رسمية بعنوان "تحليل الأعمال باستخدام Power BI". يمكنك مشاهدة الصور في قسم "التدريب".`;
  if (has("أتمتة", "بوت", "الوسط", "وسط", "منصة", "نظام", "automation", "bot", "n8n", "ai", "wasat", "platform", "system"))
    return en
      ? `Ahmed builds full operational platforms. His flagship is the Wasat Sector platform for Riyadh Municipality: 34 analytical screens running SAR 179.3M of maintenance contracts, 7,709 complaints mapped across eight zones, EVM forecasting, a Claude assistant on Telegram, and a daily executive report. See the Automation section.`
      : `يبني أحمد منصّات تشغيلية كاملة. وأبرزها منصة قطاع الوسط لأمانة الرياض: 34 شاشة تحليلية تدير عقود صيانة بقيمة 179.3 مليون ريال، وخريطة لـ7,709 بلاغات على ثمانية نطاقات، وتنبؤ EVM، ومساعد Claude على تيليجرام، وتقرير تنفيذي يومي. اطّلع على قسم "الأتمتة".`;
  if (has("خبرة", "experience", "سنوات", "years", "من هو", "who", "توظيف", "وظيفة", "hire", "hiring"))
    return en
      ? `Ahmed is a Business & Data Analyst at Riyadh Municipality — 5+ years, CAPM certified, certified Power BI expert. He has built and operates a platform running SAR 179.3M of contracts, risk-classified 60,000+ lighting poles, and trained 150+ employees. He's open to opportunities — ${c.profile.email}.`
      : `أحمد محلل أعمال وبيانات في أمانة الرياض — أكثر من 5 سنوات، حاصل على CAPM، وخبير معتمد في Power BI. بنى ويشغّل منصّة تدير عقوداً بقيمة 179.3 مليون ريال، وصنّف مخاطر أكثر من 60 ألف عمود إنارة، ودرّب أكثر من 150 موظفاً. وهو منفتح على الفرص — ${c.profile.email}.`;
  return en
    ? `Ahmed is a Business & Data Analyst and certified Power BI expert. Ask me about his analytics, automation, design, or training work — or reach him at ${c.profile.email}.`
    : `أحمد محلل أعمال وبيانات وخبير معتمد في Power BI. اسألني عن أعماله في التحليل أو الأتمتة أو التصميم أو التدريب، أو تواصل معه عبر ${c.profile.email}.`;
}

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  let body: { messages?: Msg[]; lang?: Lang };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid body" }, { status: 400 });
  }

  const lang: Lang = body.lang === "en" ? "en" : "ar";
  const messages = (body.messages ?? []).filter(
    (m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
  );
  if (messages.length === 0) return Response.json({ error: "No messages" }, { status: 400 });

  // بدون مفتاح: ردّ ذكي محلي مبني على البيانات.
  if (!apiKey) {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    const text = localAnswer(lastUser?.content ?? "", lang);
    return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }

  const anthropic = new Anthropic({ apiKey });
  const stream = await anthropic.messages.stream({
    model: "claude-haiku-4-5",
    max_tokens: 512,
    system: buildSystemPrompt(lang),
    messages: messages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch {
        controller.enqueue(encoder.encode(lang === "en" ? "\n\nSorry, something went wrong." : "\n\nعذراً، حدث خطأ ما."));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" },
  });
}
