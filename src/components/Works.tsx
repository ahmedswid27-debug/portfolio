"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import type { Content } from "@/data/content";
import type { WorkItem } from "@/data/profile";

export default function Works({ c }: { c: Content }) {
  const { sections, ui } = c;
  const [lightbox, setLightbox] = useState<WorkItem | null>(null);
  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
  }, [lightbox]);

  return (
    <>
      {sections.map((section, si) => (
        <section key={section.id} id={section.id} className="mx-auto max-w-6xl px-6 py-20 scroll-mt-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-gold text-xl">{section.icon}</span>
            <span className="font-mono text-xs text-gold/60">{String(si + 3).padStart(2, "0")}</span>
            <div className="flex-1 hairline" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{section.name}</h2>
          <p className="mt-3 text-white/55 max-w-2xl">{section.sub}</p>

          {section.layout === "gallery" ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <button
                  type="button"
                  key={item.title}
                  onClick={() => setLightbox(item)}
                  className="tile card-gold rounded-2xl overflow-hidden text-start group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-panel2">
                    {item.image && (
                      <Image src={item.image} alt={item.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-60" />
                    <span className="absolute top-3 left-3 text-[11px] text-gold bg-ink/70 border border-gold/30 rounded-full px-2.5 py-0.5">
                      {ui.works.view}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-base leading-snug">{item.title}</h3>
                    <p className="mt-2 text-xs text-white/55 leading-relaxed line-clamp-2">{item.desc}</p>
                    {item.tags && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.tags.map((t) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-gold/8 border border-gold/15 text-gold/80">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {section.items.map((item) => (
                <article key={item.title} className="tile card-gold rounded-2xl p-6 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display font-bold text-lg leading-snug">{item.title}</h3>
                    {item.status && (
                      <span className="shrink-0 text-[11px] px-2.5 py-0.5 rounded-full bg-saud/20 border border-saud/40 text-emerald-300">{item.status}</span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-white/60 leading-relaxed flex-1">{item.desc}</p>
                  {item.tags && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.tags.map((t) => (
                        <span key={t} className="text-[11px] px-2.5 py-1 rounded-md bg-gold/8 border border-gold/15 text-gold/80">{t}</span>
                      ))}
                    </div>
                  )}
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:gap-2.5 transition-all w-fit">
                      {item.linkLabel || "↗"} ↗
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}

          {section.photos && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4 text-sm text-gold/70">{ui.works.fromTraining}</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {section.photos.map((p) => (
                  <button
                    type="button"
                    key={p.src}
                    onClick={() => setLightbox({ title: p.caption, desc: "", image: p.src })}
                    className="tile card-gold rounded-xl overflow-hidden group text-start"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-panel2">
                      <Image src={p.src} alt={p.caption} fill sizes="(max-width: 640px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-70" />
                      <p className="absolute bottom-2 inset-x-2 text-[11px] text-white/90 leading-snug">{p.caption}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      ))}

      {lightbox && (
        <div onClick={close} className="fixed inset-0 z-[60] bg-ink/92 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10 fade">
          <button type="button" onClick={close} className="absolute top-5 right-5 h-11 w-11 rounded-full border border-gold/30 text-gold text-xl hover:bg-gold/10 transition-colors" aria-label="close">✕</button>
          <div onClick={(e) => e.stopPropagation()} className="max-w-5xl w-full max-h-full flex flex-col items-center">
            {lightbox.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={lightbox.image} alt={lightbox.title} className="max-w-full max-h-[78vh] object-contain rounded-xl border border-gold/20 shadow-2xl" />
            )}
            <div className="mt-4 text-center">
              <h3 className="font-display font-bold text-lg text-gold">{lightbox.title}</h3>
              {lightbox.desc && <p className="mt-1 text-sm text-white/60 max-w-2xl">{lightbox.desc}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
