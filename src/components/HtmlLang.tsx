"use client";

import { useEffect } from "react";

/**
 * يضبط `lang` و`dir` على عنصر `<html>`.
 *
 * ⚠ الجذر في `layout.tsx` مكتوب `lang="ar" dir="rtl"` ثابتا، ولا سبيل في
 *   موجه التطبيقات (App Router) إلى تغييرهما من صفحة دون تخطيط مستقل.
 *   فكانت الصفحات الإنجليزية (`/en/training` و`?lang=en`) تعلن عربية
 *   للقارئ الآلي ومحرك البحث، وإن بدت سليمة للعين لأن `dir` على الحاوي
 *   يصحح الاتجاه بصريا. وهذا المكون يصحح الإعلان نفسه.
 *
 * `/` و`/en` تضبطهما `Portfolio.tsx` أصلا، فلا يضاف إليهما.
 */
export default function HtmlLang({ lang, dir }: { lang: string; dir: "rtl" | "ltr" }) {
  useEffect(() => {
    const el = document.documentElement;
    const prev = { lang: el.lang, dir: el.dir };
    el.lang = lang;
    el.dir = dir;
    return () => {
      el.lang = prev.lang;
      el.dir = prev.dir;
    };
  }, [lang, dir]);

  return null;
}
