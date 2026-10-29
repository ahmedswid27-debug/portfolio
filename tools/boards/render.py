"""يصيّر اللوحات التوضيحية الأربع من boards.html إلى public/works/illustrative/.

python tools/boards/render.py
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public" / "works" / "illustrative"
OUT.mkdir(parents=True, exist_ok=True)
page_url = (ROOT / "tools" / "boards" / "boards.html").as_uri()

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1600, "height": 1000}, device_scale_factor=1)
    for n in (1, 2, 3, 4):
        pg.goto(f"{page_url}?b={n}")
        pg.wait_for_selector("body[data-ready]")
        pg.wait_for_timeout(300)
        pg.screenshot(path=str(OUT / f"board-{n}.png"))
        print("board", n)
    b.close()
