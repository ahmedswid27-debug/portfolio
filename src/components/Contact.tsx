"use client";

import { useState } from "react";
import type { Content } from "@/data/content";

export default function Contact({ c }: { c: Content }) {
  const { profile, ui } = c;
  const t = ui.contact;
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  function sendWhatsApp(e: React.FormEvent) {
    e.preventDefault();
    const text = t.waText(name, msg);
    window.open(`https://wa.me/${profile.phoneIntl.replace("+", "")}?text=${encodeURIComponent(text)}`, "_blank");
  }

  async function copy(value: string, key: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      /* ignore */
    }
  }

  const rows = [
    { key: "phone", label: t.rows.phone, value: profile.phone, href: profile.social.whatsapp, icon: "📱" },
    { key: "email", label: t.rows.email, value: profile.email, href: profile.social.email, icon: "✉️" },
    { key: "linkedin", label: t.rows.linkedin, value: "ahmed-mahmoud", href: profile.social.linkedin, icon: "🔗" },
  ];

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 scroll-mt-20">
      <div className="relative overflow-hidden card-gold rounded-3xl px-6 py-14 sm:px-12">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[80%] bg-gold/15 blur-[100px] rounded-full" />

        <div className="relative grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-center lg:text-start">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <span className="text-gold">◆</span>
              <div className="w-16 hairline" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{t.title}</h2>
            <p className="mt-4 text-white/60 max-w-md mx-auto lg:mx-0 leading-relaxed">{t.sub}</p>

            <div className="mt-8 space-y-3 max-w-md mx-auto lg:mx-0">
              {rows.map((row) => (
                <div key={row.key} className="flex items-center gap-3 bg-ink/40 border border-gold/15 rounded-xl px-4 py-3">
                  <span className="text-lg shrink-0">{row.icon}</span>
                  <div className="min-w-0 flex-1 text-start">
                    <p className="text-[11px] text-white/45">{row.label}</p>
                    <a href={row.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/85 hover:text-gold transition-colors truncate block text-start" dir="ltr">
                      {row.value}
                    </a>
                  </div>
                  <button type="button" onClick={() => copy(row.value, row.key)} className="text-[11px] shrink-0 px-2.5 py-1 rounded-md border border-gold/25 text-gold/80 hover:bg-gold/10 transition-colors">
                    {copied === row.key ? t.copied : t.copy}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={sendWhatsApp} className="bg-ink/40 border border-gold/15 rounded-2xl p-6">
            <h3 className="font-display font-bold text-lg mb-5 flex items-center gap-2">
              <span className="text-gold">✦</span> {t.sendTitle}
            </h3>
            <label className="block text-sm text-white/60 mb-1.5">{t.nameLabel}</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.namePh} className="w-full bg-panel2 border border-gold/15 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gold/50 transition-colors mb-4" />
            <label className="block text-sm text-white/60 mb-1.5">{t.msgLabel}</label>
            <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={t.msgPh} rows={4} className="w-full bg-panel2 border border-gold/15 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gold/50 transition-colors mb-5 resize-none" />
            <button type="submit" className="w-full px-6 py-3.5 rounded-full font-bold text-ink bg-gradient-to-l from-gold2 to-gold shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-shadow">
              {t.send}
            </button>
            <p className="mt-3 text-[11px] text-white/40 text-center">{t.hint}</p>
          </form>
        </div>
      </div>

      <footer className="mt-14 text-center text-sm text-white/40">
        <div className="w-full hairline mb-6" />
        © {new Date().getFullYear()} {profile.fullName}. {t.footer}
      </footer>
    </section>
  );
}
