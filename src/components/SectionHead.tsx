import Image from "next/image";

/**
 * ترويسة قسم على نمط لوحات الوسط: شريط صورة رفيع يذوب في الخلفية،
 * وفوقه رقم القسم وعنوانه وسطر تعريفه.
 */
export default function SectionHead({
  n,
  icon,
  title,
  sub,
  img,
}: {
  n: number;
  icon?: string;
  title: string;
  sub?: string;
  img: string;
}) {
  return (
    <div className="relative isolate overflow-hidden rounded-2xl border border-gold/18 mb-10 shadow-[0_18px_50px_-30px_rgba(0,0,0,1)]">
      <div className="absolute inset-0 -z-10">
        <Image src={img} alt="" fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-ink/42" />
        <div className="absolute inset-0 rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-ink via-ink/70 to-ink/15" />
      </div>

      {/* شريط ذهبي على حافة البداية — يربط الترويسات بعضها ببعض */}
      <span className="absolute inset-y-0 rtl:right-0 ltr:left-0 w-[3px] bg-gradient-to-b from-gold via-gold/40 to-transparent" />

      <div className="px-6 sm:px-8 py-7 sm:py-9">
        <div className="flex items-center gap-3 mb-2.5">
          {icon && <span className="text-gold text-lg leading-none">{icon}</span>}
          <span className="font-mono text-xs text-gold/60">{String(n).padStart(2, "0")}</span>
          <div className="flex-1 hairline" />
        </div>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">{title}</h2>
        {sub && <p className="mt-2.5 text-sm sm:text-base text-white/68 max-w-2xl leading-relaxed">{sub}</p>}
      </div>
    </div>
  );
}
