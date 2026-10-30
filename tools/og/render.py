"""يصيّر صورة المعاينة عند مشاركة الموقع إلى public/og.png.

python tools/og/render.py
الصورة تُصيّر في كروم لا في Satori، لأن Satori لا يشكل العربية جيدا.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome")
    pg = b.new_page(viewport={"width": 1200, "height": 630}, device_scale_factor=1)
    pg.goto((ROOT / "tools" / "og" / "og.html").as_uri(), wait_until="networkidle")
    pg.evaluate("document.fonts.ready")
    pg.wait_for_timeout(500)
    pg.screenshot(path=str(ROOT / "public" / "og.png"))
    b.close()
print("ok")
