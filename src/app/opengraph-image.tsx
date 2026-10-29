import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * صورة المعاينة عند مشاركة الرابط — غلاف ملف الأعمال نفسه:
 * كلمة «portfolio» فوق الشريط النعناعي، والاسم بالأزرق المخضر.
 * لاتينية فقط لأن Satori لا يشكّل العربية جيدا.
 */
export const alt = "Ahmed Swid — Power BI Expert, Data & Business Analyst";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const anton = await readFile(join(process.cwd(), "src/app/fonts/Anton-Regular.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F4F8F6",
          padding: "64px 72px",
          fontFamily: "Anton",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 40, color: "#1C6181", letterSpacing: 2 }}>AHMED SWID</div>
          <div style={{ display: "flex", fontSize: 26, color: "#2B2965", fontFamily: "sans-serif" }}>www.ahmedswid.com</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: -24,
              right: -24,
              bottom: -10,
              height: 150,
              display: "flex",
              backgroundImage: "linear-gradient(180deg, rgba(218,237,226,0), #DAEDE2)",
            }}
          />
          <div style={{ display: "flex", fontSize: 250, lineHeight: 0.9, color: "#221F1F", letterSpacing: 14 }}>portfolio</div>
        </div>

        <div style={{ display: "flex", fontSize: 34, color: "#2B2965", fontFamily: "sans-serif", fontWeight: 700 }}>
          Power BI Expert · Data &amp; Business Analyst · Riyadh
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Anton", data: anton, weight: 400, style: "normal" }] },
  );
}
