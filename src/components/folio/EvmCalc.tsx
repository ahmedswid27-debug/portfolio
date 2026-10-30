"use client";

import { useState } from "react";
import type { Lang } from "@/data/folio";

/** قاعدة التصنيف: الفرق = نسبة المدة المنقضية − نسبة الصرف. والعتبات نفسها في قياس Status. */
const T = {
  ar: { time: "المدة المنقضية", spend: "الصرف", gap: "الفرق", cls: ["ممتاز", "جيد", "ضعيف", "متعثر"] },
  en: { time: "Time elapsed", spend: "Spent", gap: "Gap", cls: ["Excellent", "Good", "Weak", "At risk"] },
};

export default function EvmCalc({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [time, setTime] = useState(70);
  const [spend, setSpend] = useState(52);
  const gap = time - spend;
  const i = gap < 10 ? 0 : gap < 15 ? 1 : gap < 20 ? 2 : 3;
  return (
    <div className="fo-calc card-gold rounded-2xl">
      <label>
        <span>{t.time} <b dir="ltr">{time}%</b></span>
        <input type="range" min={0} max={100} value={time} onChange={(e) => setTime(+e.target.value)} />
      </label>
      <label>
        <span>{t.spend} <b dir="ltr">{spend}%</b></span>
        <input type="range" min={0} max={100} value={spend} onChange={(e) => setSpend(+e.target.value)} />
      </label>
      <div className="fo-calc-out" aria-live="polite">
        <div>
          <p className="fo-board-h">{t.gap}</p>
          <p className="fo-kpi-val" dir="ltr" style={{ textAlign: lang === "en" ? "left" : "right" }}>{gap > 0 ? "+" : ""}{gap}</p>
        </div>
        <ol className="fo-scale">
          {t.cls.map((c, k) => (
            <li key={c} aria-current={k === i ? "true" : undefined}>{c}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
