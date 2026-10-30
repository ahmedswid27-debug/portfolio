"use client";

import { useState } from "react";
import type { Lang } from "@/data/folio";

/** حاسبة قاعدة التصنيف: الفرق = نسبة المدة المنقضية − نسبة الصرف. والعتبات نفسها في قياس Status. */
const T = {
  ar: { time: "المدة المنقضية", spend: "نسبة الصرف", gap: "الفرق", cls: ["ممتاز", "جيد", "ضعيف", "متعثر"], note: "أي صرف يسبق المدة يبقى ممتازا: القاعدة تقيس التأخر فقط." },
  en: { time: "Time elapsed", spend: "Percent spent", gap: "Gap", cls: ["Excellent", "Good", "Weak", "At risk"], note: "Spending ahead of time stays Excellent: the rule only measures delay." },
};

export default function EvmCalc({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [time, setTime] = useState(70);
  const [spend, setSpend] = useState(52);
  const gap = time - spend;
  const i = gap < 10 ? 0 : gap < 15 ? 1 : gap < 20 ? 2 : 3;
  return (
    <div className="fo-calc">
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
      <p className="fo-small mt-3">{t.note}</p>
    </div>
  );
}
