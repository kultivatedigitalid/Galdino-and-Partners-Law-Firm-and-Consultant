from pathlib import Path
import re

from PIL import Image, ImageDraw, ImageOps


workspace = Path(__file__).resolve().parents[2]
qa = workspace / "outputs" / "galdino_partner" / "brand" / "qa"
pages = sorted(qa.glob("page-*.png"), key=lambda p: int(re.findall(r"\d+", p.stem)[-1]))

for sheet_index, subset in enumerate((pages[:12], pages[12:]), 1):
    tw, th, cols, gap, lh = 145, 103, 3, 6, 13
    rows = (len(subset) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * tw + (cols + 1) * gap, rows * (th + lh) + (rows + 1) * gap), "#d6d4d0")
    draw = ImageDraw.Draw(sheet)
    for index, path in enumerate(subset):
        with Image.open(path) as opened:
            thumb = ImageOps.fit(opened.convert("RGB"), (tw, th), method=Image.Resampling.LANCZOS)
        col, row = index % cols, index // cols
        x = gap + col * (tw + gap)
        y = gap + row * (th + lh + gap)
        sheet.paste(thumb, (x, y))
        draw.rectangle((x, y, x + tw, y + th), outline="#5a5854", width=1)
        number = int(re.findall(r"\d+", path.stem)[-1])
        draw.text((x + 2, y + th + 1), f"P{number:02d}", fill="#171719")
    sheet.save(qa / f"tiny-contact-{sheet_index:02d}.jpg", quality=45, subsampling=2, optimize=True)
