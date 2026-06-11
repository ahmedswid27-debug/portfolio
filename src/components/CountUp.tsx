"use client";

import { useEffect, useState } from "react";

// يحلّل قيمة مثل "+28K" أو "150" أو "CAPM" ويحرّك الجزء الرقمي من صفر.
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const m = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
  const hasNum = !!m;
  const prefix = m ? m[1] : "";
  const suffix = m ? m[3] : "";
  const target = m ? parseInt(m[2].replace(/,/g, ""), 10) : 0;
  const [n, setN] = useState(0);

  // الاعتماد على قيم أولية ثابتة فقط (hasNum, target) حتى لا يُعاد تشغيل المؤثّر كل render.
  useEffect(() => {
    if (!hasNum) return;
    let raf = 0;
    const dur = 1500;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round((1 - Math.pow(2, -10 * p)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hasNum, target]);

  if (!hasNum) return <span className={className}>{value}</span>;
  return (
    <span className={className} dir="ltr">
      {prefix}
      {n.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
