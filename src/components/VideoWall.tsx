"use client";

import { useRef, useState } from "react";
import type { Clip } from "@/data/training";

/**
 * ⚠⚠ هذه البطاقة **خارج** `VideoWall` عمدا، ولا تنقل داخله.
 *
 * مكون يعرف داخل جسم مكون آخر يصير **نوعا جديدا في كل تصيير**، فيهدم
 * React شجرته ويبنيها من جديد عند أي تغير حالة. وأثره هنا كان عطلا مقيسا
 * على الموقع الحي: الضغط على زر التشغيل يستدعي `play()` ثم **يهدم عنصر
 * الفيديو نفسه ويركب غيره**، فيبقى `readyState = 0` ولا يبدأ شيء —
 * والمستخدم يرى شريط التحكم ظهر بلا تشغيل.
 */
function ClipCard({
  clip,
  on,
  officialLabel,
  bind,
  onStart,
  onPlaying,
}: {
  clip: Clip;
  on: boolean;
  officialLabel: string;
  bind: (el: HTMLVideoElement | null) => void;
  onStart: () => void;
  onPlaying: () => void;
}) {
  return (
    <figure className="tile card-gold rounded-2xl overflow-hidden flex flex-col">
      <div className={`relative bg-black ${clip.portrait ? "aspect-[9/16]" : "aspect-video"}`}>
        <video
          ref={bind}
          onPlay={onPlaying}
          src={clip.src}
          poster={clip.poster}
          controls={on}
          preload="none"
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />

        {!on && (
          <button
            type="button"
            onClick={onStart}
            aria-label={clip.title}
            className="absolute inset-0 z-10 grid place-items-center bg-ink/15 hover:bg-ink/5 transition-colors group"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-ink/70 border border-gold/45 text-gold text-lg backdrop-blur-sm transition-transform group-hover:scale-110">
              ▶
            </span>
          </button>
        )}

        {clip.official && (
          <span className="pointer-events-none absolute top-2.5 start-2.5 z-20 text-[11px] sm:text-[10px] text-gold bg-ink/80 border border-gold/30 rounded-full px-2 py-0.5">
            {officialLabel}
          </span>
        )}
      </div>

      <figcaption className="p-4">
        <h3 className="font-display font-bold text-sm leading-snug">{clip.title}</h3>
        <p className="mt-1 text-[12px] sm:text-[11px] text-white/60 leading-relaxed">{clip.meta}</p>
      </figcaption>
    </figure>
  );
}

/**
 * جدار مقاطع من قاعة التدريب.
 *
 * ⚠ الطولي والعرضي لا يخلطان في شبكة واحدة: نسبة ٩:١٦ في خانة عريضة
 *   تترك شريطين أسودين هائلين. فتفصل الشبكتان.
 * ⚠ شريط التحكم الأصلي لا يظهر قبل التشغيل: سبعة أشرطة رمادية ساكنة
 *   تفسد الصفحة. فيظهر غلاف وزر، ثم يسلم الأمر للمتصفح.
 * ⚠ `preload="none"` مقصود: تحميل بيانات سبعة مقاطع معا يبطئ الصفحة.
 */
export default function VideoWall({
  clips,
  officialLabel,
  portraitGrid = "grid gap-5 grid-cols-2 lg:grid-cols-4",
}: {
  clips: Clip[];
  officialLabel: string;
  /** شبكة المقاطع الطولية؛ مقطع واحد يأخذ عمودا كاملا */
  portraitGrid?: string;
}) {
  const refs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [started, setStarted] = useState<Record<string, boolean>>({});

  // تشغيل مقطع يوقف ما سواه — وإلا تداخلت الأصوات.
  const soloPlay = (src: string) => {
    for (const [k, v] of Object.entries(refs.current)) if (k !== src && v) v.pause();
  };

  const start = (src: string) => {
    soloPlay(src);
    setStarted((s) => (s[src] ? s : { ...s, [src]: true }));
    // الوعد يرفض إن منع المتصفح التشغيل — ولا يعالج بأكثر من تجاهله.
    refs.current[src]?.play().catch(() => {});
  };

  const render = (c: Clip) => (
    <ClipCard
      key={c.src}
      clip={c}
      on={!!started[c.src]}
      officialLabel={officialLabel}
      bind={(el) => {
        refs.current[c.src] = el;
      }}
      onStart={() => start(c.src)}
      onPlaying={() => {
        soloPlay(c.src);
        setStarted((s) => (s[c.src] ? s : { ...s, [c.src]: true }));
      }}
    />
  );

  const portrait = clips.filter((c) => c.portrait);
  const landscape = clips.filter((c) => !c.portrait);

  return (
    <div className="space-y-5">
      {portrait.length > 0 && (
        <div className={`stagger ${portraitGrid}`}>{portrait.map(render)}</div>
      )}
      {landscape.length > 0 && (
        <div className="stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{landscape.map(render)}</div>
      )}
    </div>
  );
}
