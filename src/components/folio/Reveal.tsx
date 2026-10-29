"use client";

import { useEffect } from "react";

/** يضيف ‎.in‎ لكل عنصر ‎[data-reveal]‎ عند دخوله الشاشة. بلا جافاسكربت يبقى كل شيء ظاهرا. */
export default function Reveal() {
  useEffect(() => {
    const root = document.querySelector(".fo");
    if (!root) return;
    root.classList.add("fo-js");
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    root.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
