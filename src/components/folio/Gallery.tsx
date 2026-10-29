"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Pic } from "@/data/folio";

/**
 * صور تُكبَّر بالعارض الأصلي للمتصفح (<dialog>) — بلا مكتبة.
 * كل صورة تجلس فوق الشريط النعناعي (‎.fo-frame‎) كما في ملف الأعمال.
 */
export default function Gallery({
  items,
  className,
  sizes,
  zoom,
  close,
  caption = true,
}: {
  items: Pic[];
  className: string;
  sizes: string;
  zoom: string;
  close: string;
  caption?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Pic | null>(null);

  return (
    <>
      <ul className={className}>
        {items.map((p) => (
          <li key={p.src}>
            <button
              type="button"
              className="fo-frame"
              aria-label={`${zoom}: ${p.title}`}
              onClick={() => {
                setOpen(p);
                ref.current?.showModal();
              }}
            >
              <Image src={p.src} alt={p.title} width={p.w} height={p.h} sizes={sizes} />
              {caption && (
                <span className="fo-cap">
                  <b>{p.title}</b>
                  {p.note && <span>{p.note}</span>}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={ref} className="fo-dialog" onClose={() => setOpen(null)} onClick={(e) => e.target === ref.current && ref.current?.close()}>
        {open && (
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={open.src} alt={open.title} />
            <figcaption className="flex items-center justify-between gap-4 pt-3">
              <span className="font-bold">{open.title}</span>
              <button type="button" className="fo-btn fo-btn-line min-h-11 px-4 text-[14px]" onClick={() => ref.current?.close()}>
                {close}
              </button>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
