import Anthropic from "@anthropic-ai/sdk";
import { getContent, type Lang } from "@/data/content";

export const runtime = "nodejs";

function buildSystemPrompt(lang: Lang) {
  const c = getContent(lang);
  const { profile, sections, stats } = c;
  const sectionLines = sections
    .map((s) => `▪ ${s.name} — ${s.sub}\n${s.items.map((i) => `   • ${i.title}: ${i.desc}`).join("\n")}`)
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
  if (has("power bi", "داشبورد", "لوحة", "dashboard", "تحليل", "analy", "بيانات", "data"))
    return en
      ? `Ahmed is a certified Power BI expert. He builds interactive dashboards and executive reports — see the Data Analytics section for real work at Riyadh Municipality.`
      : `أحمد خبير معتمد في Power BI، ويبني لوحات تحليل تفاعلية وتقارير تنفيذية — يمكنك الاطّلاع على قسم "تحليل البيانات" لأعماله الفعلية في أمانة الرياض.`;
  if (has("تدريب", "كورس", "دورة", "train", "course", "workshop"))
    return en
      ? `Ahmed has trained 150+ employees and delivered an official "Business Analysis with Power BI" course. See the Training section for photos.`
      : `درّب أحمد أكثر من 150 موظفًا وقدّم دورة رسمية بعنوان "تحليل الأعمال باستخدام Power BI". يمكنك مشاهدة الصور في قسم "التدريب".`;
  if (has("أتمتة", "بوت", "automation", "bot", "n8n", "ai"))
    return en
      ? `Ahmed builds automation with n8n and AI bots (Claude/Gemini) — including an enterprise system for Riyadh Municipality. See the Automation section.`
      : `يبني أحمد أنظمة أتمتة باستخدام n8n وبوتات ذكاء اصطناعي (Claude/Gemini) — منها نظام مؤسسي لأمانة الرياض. اطّلع على قسم "الأتمتة".`;
  if (has("خبرة", "experience", "سنوات", "years", "من هو", "who"))
    return en
      ? `Ahmed is a Business & Data Analyst at Riyadh Municipality with 5+ years of practical experience and CAPM certification.`
      : `أحمد محلل أعمال وبيانات في أمانة الرياض، يتمتّع بخبرة تزيد عن 5 سنوات عملية وحاصل على شهادة CAPM.`;
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
