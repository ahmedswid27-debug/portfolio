import Image from "next/image";
import type { Content } from "@/data/content";
import CountUp from "./CountUp";

export default function Hero({ c }: { c: Content }) {
  const { profile, stats } = c;
  return (
    <>
      <section id="top" className="relative isolate overflow-hidden">
        {/* صورة الرياض — تتحرّك ببطء، والنص فوقها */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image
            src="/riyadh/kafd.jpg"
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover object-center kenburns"
          />
          {/* تدرّجان: أفقيٌّ ليُقرأ النص، ورأسيٌّ ليذوب في الصفحة */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/40 to-ink" />
          <div className="absolute inset-0 rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-ink via-ink/50 to-ink/5" />
        </div>

        <div className="px-6 sm:px-10 lg:px-14 pt-24 pb-24 sm:pt-32 sm:pb-32 min-h-[74vh] flex items-center">
          <div className="max-w-3xl">
            {/* ⚠ leading ≥ 1.3 و pb — الخط العربي العريض يُقتطع دونهما */}
            <h1 className="rise font-display font-black tracking-normal leading-[1.32] pb-2 text-[34px] sm:text-5xl lg:text-[56px] text-gold-shine">
              {profile.fullName}
            </h1>
            <p className="rise d1 mt-1 font-display text-lg sm:text-xl lg:text-2xl text-gold-grad font-bold leading-[1.6]">
              {profile.titleShort}
            </p>
          </div>
        </div>
      </section>

      {/* شريط المؤشرات — ملتصق أسفل الواجهة كما في لوحات الوسط */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-14 -mt-12 sm:-mt-14">
        <div
          className="grid grid-cols-2 sm:grid-cols-4 rounded-2xl overflow-hidden border border-gold/20 bg-panel/90
                     backdrop-blur-md divide-x rtl:divide-x-reverse divide-gold/10
                     shadow-[0_24px_60px_-30px_rgba(0,0,0,1)]"
        >
          {stats.map((s) => (
            <div key={s.label} className="group px-4 py-5 sm:py-7 text-center transition-colors hover:bg-gold/[0.04]">
              <CountUp
                value={s.value}
                className="font-display text-2xl sm:text-[32px] font-bold text-gold tabular block leading-none"
              />
              <p className="mt-2 text-[11px] sm:text-xs text-white/72 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
