import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * صورة المعاينة عند مشاركة الرابط: واجهة الموقع الداكنة الذهبية بالاسم العربي.
 * تصيّر في كروم بالأمر python tools/og/render.py، لأن Satori لا يشكل العربية جيدا.
 */
export const alt = "أحمد محمود سويد، خبير Power BI ومحلل بيانات وأعمال";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const png = await readFile(join(process.cwd(), "public/og.png"));
  return new Response(new Uint8Array(png), { headers: { "Content-Type": contentType } });
}
