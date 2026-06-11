"use client";

import { useEffect, useRef, useState } from "react";
import type { Content } from "@/data/content";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatWidget({ c }: { c: Content }) {
  const { profile, ui, lang } = c;
  const t = ui.chat;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: t.greeting }]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, lang }),
      });
      if (!res.body) throw new Error("No body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: copy[copy.length - 1].content + chunk };
          return copy;
        });
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "assistant", content: t.error + profile.email };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-label="chat" className="no-print fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full bg-gradient-to-l from-gold2 to-gold shadow-xl shadow-gold/30 flex items-center justify-center text-2xl text-ink hover:scale-105 active:scale-95 transition-transform">
        {open ? "✕" : "✦"}
      </button>

      <div className={`no-print fixed bottom-24 left-6 z-50 w-[min(92vw,380px)] origin-bottom-left transition-all duration-300 ${open ? "scale-100 opacity-100 pointer-events-auto" : "scale-90 opacity-0 pointer-events-none"}`}>
        <div className="flex flex-col h-[min(70vh,560px)] rounded-2xl border border-gold/25 bg-panel/95 backdrop-blur-xl shadow-2xl overflow-hidden" dir={ui.dir}>
          <div className="px-4 py-3 border-b border-gold/15 flex items-center gap-3 bg-panel2/60">
            <div className="h-9 w-9 rounded-full bg-gradient-to-l from-gold2 to-gold flex items-center justify-center text-ink">✦</div>
            <div>
              <p className="text-sm font-bold leading-tight">{t.ask}</p>
              <p className="text-[11px] text-white/45">{t.status}</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed whitespace-pre-wrap ${m.role === "user" ? "bg-gold text-ink rounded-bl-sm font-medium" : "bg-panel2 text-white/85 rounded-br-sm border border-gold/12"}`}>
                  {m.content || (<span className="typing"><span /><span /><span /></span>)}
                </div>
              </div>
            ))}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {t.suggestions.map((s) => (
                  <button type="button" key={s} onClick={() => send(s)} className="text-xs px-3 py-1.5 rounded-full border border-gold/20 text-white/60 hover:text-gold hover:border-gold/50 transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="p-3 border-t border-gold/15 flex items-center gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.placeholder} className="flex-1 bg-panel2 border border-gold/15 rounded-full px-4 py-2.5 text-sm outline-none focus:border-gold/50 transition-colors" />
            <button type="submit" disabled={loading || !input.trim()} className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-l from-gold2 to-gold flex items-center justify-center text-ink disabled:opacity-40 transition-opacity" aria-label="send">➤</button>
          </form>
        </div>
      </div>
    </>
  );
}
