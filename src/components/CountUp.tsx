"use client";

import { useEffect, useRef, useState } from "react";

// يحلّل قيمة مثل "+28K" أو "150" أو "CAPM" ويحرّك الجزء الرقمي من صفر.
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const m = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
  const target = m ? parseInt(m[2].replace(/,/g, ""), 10) : 0;
  const [n, setN] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!m || started.current) return;
    started.current = true;
    let raf = 0;
    const dur = 1500;
    const s = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - s) / dur, 1);
      setN(Math.round((1 - Math.pow(2, -10 * p)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [m, target]);

  if (!m) return <span className={className}>{value}</span>;
  return (
    <span className={className}>
      {m[1]}
      {n.toLocaleString("en-US")}
      {m[3]}
    </span>
  );
}
