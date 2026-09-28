from pathlib import Path
from PIL import Image

root = Path(r"C:\Users\Joshua\OneDrive\Documents\Law\tmp\mapping_workbook_2026-08-14\explicit_renders")
for source in root.glob("*.png"):
    with Image.open(source) as image:
        image = image.convert("RGB")
        image.thumbnail((2600, 1800), Image.Resampling.LANCZOS)
        target = source.with_suffix(".jpg")
        image.save(target, quality=84, optimize=True)
        print(source.name, "->", target.name, image.size, target.stat().st_size)
