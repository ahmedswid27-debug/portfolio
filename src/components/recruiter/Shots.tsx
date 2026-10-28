"use client";

import { useRef, useState } from "react";

type Shot = { src: string; title: string; note: string };

/**
 * شبكة لقطات تُفتح بالعارض الأصلي للمتصفح (<dialog>) — بلا مكتبة.
 * `cols` يحدد الأعمدة على الشاشة الكبيرة، والجوال يعرض عموداً واحداً أو شريطاً أفقياً.
 */
export default function Shots({
  items,
  cols = 2,
  aspect = "16/10",
  scroller = false,
  closeLabel,
}: {
  items: Shot[];
  cols?: 2 | 3;
  aspect?: string;
  scroller?: boolean;
  closeLabel: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Shot | null>(null);

  const show = (s: Shot) => {
    setOpen(s);
    ref.current?.showModal();
  };

  const grid = cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <>
      <ul
        className={
          scroller
            ? `rx-scroller md:grid ${grid} md:gap-x-6 md:gap-y-10`
            : `grid grid-cols-1 ${grid} gap-x-6 gap-y-10`
        }
      >
        {items.map((s) => (
          <li key={s.src} className={scroller ? "rx-scroller-item" : ""}>
            <figure>
              <button
                type="button"
                onClick={() => show(s)}
                className="rx-shot block w-full bg-[#F4F4F4] border border-[#E2E2E2] overflow-hidden"
                style={{ aspectRatio: aspect }}
                aria-label={s.title}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.title} loading="lazy" className="w-full h-full object-contain" />
              </button>
              <figcaption className="mt-3">
                <p className="text-[15px] font-bold text-[#111]">{s.title}</p>
                <p className="text-[14px] text-[#5F6368] mt-0.5 leading-[1.7]">{s.note}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={ref}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === ref.current && ref.current?.close()}
        className="rx-dialog"
      >
        {open && (
          <div className="flex flex-col gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={open.src} alt={open.title} className="max-h-[80vh] w-auto mx-auto" />
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-bold text-white">{open.title}</p>
                <p className="text-white/70 text-sm">{open.note}</p>
              </div>
              <button
                type="button"
                onClick={() => ref.current?.close()}
                className="shrink-0 text-sm text-white border border-white/40 px-3 py-1.5 hover:bg-white hover:text-black"
              >
                {closeLabel}
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
