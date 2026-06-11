"use client";

import { useEffect } from "react";

export default function PrintButton({ label, autoPrint }: { label: string; autoPrint?: boolean }) {
  useEffect(() => {
    if (autoPrint) {
      const t = setTimeout(() => window.print(), 600);
      return () => clearTimeout(t);
    }
  }, [autoPrint]);

  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="px-5 py-2.5 rounded-full font-bold text-ink bg-gradient-to-l from-gold2 to-gold text-sm shadow-lg shadow-gold/20"
    >
      {label}
    </button>
  );
}
