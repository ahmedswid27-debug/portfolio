"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import type { Content } from "@/data/content";
import type { WorkItem } from "@/data/profile";
import SectionHead from "./SectionHead";

/** صورة ترويسة لكل قسم — من مكتبة صور الرياض. */
const SECTION_IMG: Record<string, string> = {
  automation: "/riyadh/kingdom-night.jpg",
  analysis: "/riyadh/aerial-day.jpg",
  reports: "/riyadh/skyline-sunset.jpg",
  design: "/riyadh/street.jpg",
  training: "/riyadh/lamps-hero.jpg",
};

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
        <section key={section.id} id={section.id} className="mx-auto max-w-6xl px-6 sm:px-10 py-20 scroll-mt-24">
          <SectionHead
            n={si + 3}
            icon={section.icon}
            title={section.name}
            sub={section.sub}
            img={SECTION_IMG[section.id] ?? "/riyadh/skyline-sunset.jpg"}
          />

          {section.layout === "gallery" ? (
            <div className="stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <button
                  type="button"
                  key={item.title}
                  onClick={() => setLightbox(item)}
                  className="tile card-gold rounded-2xl overflow-hidden text-start group"
                >
                  {/* contain لا cover: أغلفة التقارير طولية وتُقتطع بشعاً مع cover */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-panel2 p-2">
                    {item.image && (
                      <Image src={item.image} alt={item.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain transition-transform duration-500 group-hover:scale-[1.04]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent opacity-70 pointer-events-none" />
                    <span className="absolute top-3 left-3 text-[11px] text-gold bg-ink/70 border border-gold/30 rounded-full px-2.5 py-0.5">
                      {ui.works.view}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-base leading-snug">{item.title}</h3>
                    <p className="mt-2 text-xs text-white/68 leading-relaxed line-clamp-2">{item.desc}</p>
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
            <div className="stagger grid gap-5 md:grid-cols-2">
              {section.items.filter((i) => i.featured).map((item) => (
                <article key={item.title} className="md:col-span-2 card-gold rounded-2xl overflow-hidden">
                  {/* ── ترويسة دراسة الحالة ── */}
                  <div className="p-6 sm:p-8 border-b border-gold/10">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px]">
                      <span className="px-2.5 py-0.5 rounded-full bg-gold/12 border border-gold/30 text-gold font-medium">
                        {ui.works.caseStudy}
                      </span>
                      {item.status && (
                        <span className="px-2.5 py-0.5 rounded-full bg-saud/20 border border-saud/40 text-emerald-300">{item.status}</span>
                      )}
                      {item.org && <span className="text-white/72">{item.org}</span>}
                    </div>

                    <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold tracking-tight text-gold-grad">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm sm:text-[15px] text-white/76 leading-loose max-w-3xl">
                      {item.desc}
                    </p>
                  </div>

                  {/* ── الأرقام ── */}
                  {item.metrics && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-x-reverse divide-gold/10 border-b border-gold/10 bg-panel2/40">
                      {item.metrics.map((m) => (
                        <div key={m.label} className="px-4 py-5 text-center">
                          <div className="font-display text-xl sm:text-2xl font-bold text-gold tabular-nums" dir="ltr">{m.value}</div>
                          <div className="mt-1 text-[11px] text-white/72 leading-snug">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ── القدرات: عمودان يملآن العرض ── */}
                  {item.highlights && (
                    <div className="px-6 sm:px-8 pt-6 sm:pt-8">
                      <h4 className="text-xs font-medium text-gold/70 mb-4">{ui.works.whatItDoes}</h4>
                      <ul className="grid gap-x-10 gap-y-3 md:grid-cols-2">
                        {item.highlights.map((h) => (
                          <li key={h} className="flex gap-3 text-[13px] text-white/72 leading-relaxed">
                            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold/70" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* ── اللقطات ── */}
                  {item.gallery && (
                    <div className="px-6 sm:px-8 pt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {item.gallery.map((g) => (
                        <button
                          type="button"
                          key={g.src}
                          onClick={() => setLightbox({ title: g.caption, desc: "", image: g.src })}
                          className="tile card-gold rounded-xl overflow-hidden w-full text-start group"
                        >
                          <div className="relative aspect-[16/11] bg-panel2">
                            <Image
                              src={g.src}
                              alt={g.caption}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent" />
                            <span className="absolute top-2.5 left-2.5 text-[10px] text-gold bg-ink/75 border border-gold/25 rounded-full px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              {ui.works.view}
                            </span>
                            <p className="absolute bottom-2.5 inset-x-3 text-[11px] text-white/85 leading-snug">{g.caption}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* ── التقنيات والملاحظة ── */}
                  <div className="px-6 sm:px-8 pt-7 pb-6 sm:pb-8">
                    {item.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((t) => (
                          <span key={t} className="text-[11px] px-2.5 py-1 rounded-md bg-gold/8 border border-gold/15 text-gold/80">{t}</span>
                        ))}
                      </div>
                    )}
                    {item.note && <p className="mt-4 text-[11px] text-white/50 leading-relaxed">{item.note}</p>}
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:gap-2.5 transition-all w-fit">
                        {item.linkLabel || "↗"} ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}

              {section.items.filter((i) => !i.featured).map((item) => (
                <article key={item.title} className="tile card-gold rounded-2xl p-6 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display font-bold text-lg leading-snug">{item.title}</h3>
                    {item.status && (
                      <span className="shrink-0 text-[11px] px-2.5 py-0.5 rounded-full bg-saud/20 border border-saud/40 text-emerald-300">{item.status}</span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-white/72 leading-relaxed flex-1">{item.desc}</p>
                  {item.tags && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.tags.map((t) => (
                        <span key={t} className="text-[11px] px-2.5 py-1 rounded-md bg-gold/8 border border-gold/15 text-gold/80">{t}</span>
                      ))}
                    </div>
                  )}
                  {item.note && <p className="mt-3 text-[11px] text-white/50 leading-relaxed">{item.note}</p>}
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
              {lightbox.desc && <p className="mt-1 text-sm text-white/72 max-w-2xl">{lightbox.desc}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
