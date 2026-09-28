from __future__ import annotations

import math
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


def main() -> None:
    source = Path(sys.argv[1])
    output = Path(sys.argv[2])
    per_sheet = int(sys.argv[3]) if len(sys.argv) > 3 else 6
    output.mkdir(parents=True, exist_ok=True)
    pages = sorted(source.glob("page-*.png"))
    if not pages:
        raise SystemExit(f"No rendered pages found in {source}")

    thumb_w = 640
    label_h = 40
    gap = 22
    columns = 2
    rows = math.ceil(per_sheet / columns)
    font = ImageFont.load_default()

    for sheet_index in range(math.ceil(len(pages) / per_sheet)):
        subset = pages[sheet_index * per_sheet : (sheet_index + 1) * per_sheet]
        with Image.open(subset[0]) as sample:
            thumb_h = round(sample.height * thumb_w / sample.width)
        canvas = Image.new(
            "RGB",
            (columns * thumb_w + (columns + 1) * gap, rows * (thumb_h + label_h) + (rows + 1) * gap),
            "#202124",
        )
        draw = ImageDraw.Draw(canvas)
        for item_index, page_path in enumerate(subset):
            row, col = divmod(item_index, columns)
            x = gap + col * (thumb_w + gap)
            y = gap + row * (thumb_h + label_h + gap)
            with Image.open(page_path) as page:
                page = page.convert("RGB")
                page.thumbnail((thumb_w, thumb_h), Image.Resampling.LANCZOS)
                canvas.paste(page, (x, y + label_h))
            page_number = sheet_index * per_sheet + item_index + 1
            draw.text((x, y + 12), f"PAGE {page_number:02d}", fill="#F4F3F1", font=font)
        canvas.save(output / f"contact-{sheet_index + 1:02d}.png", quality=92)


if __name__ == "__main__":
    main()
