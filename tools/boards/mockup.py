"""يركّب لوحتين توضيحيتين على شاشتي موكب «Galaxy Tab S8» من ملف أعمال أحمد.

python tools/boards/mockup.py
الأركان مقيسة يدويا على الصورة الأصلية (6000×4500)، والشاشة القديمة تُمحى قبل التركيب.
"""
import os
from pathlib import Path
import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[2]
SRC = Path(r"D:\01-الأمانة\أرشيف\ملفات العمل القديمة\ملف الاعمال\تصاميم عادية\Samsung Galaxy Tab S8 Mockup, Clay.png")
OUT = ROOT / "public" / "works" / "illustrative"

# الشاشة: أعلى يسار، أعلى يمين، أسفل يمين، أسفل يسار
SCREENS = {
    "right": ([3136, 1469], [5170, 1498], [5669, 2894], [3629, 2983]),
    "left": ([1307, 2074], [2819, 2098], [1819, 2880], [344, 2798]),
}
PAD = 22  # يمد الرباعي قليلا ليغطي حواف الشاشة القديمة


def grow(q, pad):
    q = np.array(q, np.float32)
    c = q.mean(0)
    return np.array([p + (p - c) / np.linalg.norm(p - c) * pad for p in q], np.float32)


def read(p):
    return cv2.imdecode(np.fromfile(str(p), np.uint8), cv2.IMREAD_UNCHANGED)


def place(base, board, quad):
    h, w = board.shape[:2]
    q = grow(quad, PAD)
    M = cv2.getPerspectiveTransform(np.float32([[0, 0], [w, 0], [w, h], [0, h]]), q)
    H, W = base.shape[:2]
    warped = cv2.warpPerspective(board, M, (W, H), flags=cv2.INTER_AREA)
    mask = cv2.warpPerspective(np.full((h, w), 255, np.uint8), M, (W, H), flags=cv2.INTER_LINEAR)
    a = (mask.astype(np.float32) / 255)[..., None]
    base[..., :3] = (warped[..., :3] * a + base[..., :3] * (1 - a)).astype(np.uint8)


def main(right=2, left=1, name="tablets"):
    base = read(SRC)
    for side, n in (("right", right), ("left", left)):
        b = read(OUT / f"board-{n}.png")
        if b.shape[2] == 4:
            b = b[..., :3]
        b = np.dstack([b, np.full(b.shape[:2], 255, np.uint8)])
        place(base, b, SCREENS[side])
    # قصّ الهامش الشفاف ثم تصغير للويب
    ys, xs = np.where(base[..., 3] > 8)
    base = base[max(ys.min() - 40, 0): ys.max() + 40, max(xs.min() - 40, 0): xs.max() + 40]
    scale = 2000 / base.shape[1]
    small = cv2.resize(base, None, fx=scale, fy=scale, interpolation=cv2.INTER_AREA)
    ok, buf = cv2.imencode(".png", small)
    buf.tofile(str(OUT / f"{name}.png"))
    print(name, small.shape)


if __name__ == "__main__":
    main(right=2, left=1, name="tablets")
    main(right=3, left=4, name="tablets-2")
