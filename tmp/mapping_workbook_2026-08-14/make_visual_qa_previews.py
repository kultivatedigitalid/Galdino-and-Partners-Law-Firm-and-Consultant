from pathlib import Path
from PIL import Image

source_dir = Path(r"C:\Users\Joshua\OneDrive\Documents\Law\tmp\mapping_workbook_2026-08-14\final_renders")
target_dir = source_dir / "previews"
target_dir.mkdir(parents=True, exist_ok=True)

for source in source_dir.glob("*.png"):
    with Image.open(source) as image:
        image = image.convert("RGB")
        width, height = image.size
        regions = {
            "left": (0, 0, min(width, 5200), min(height, 1900)),
            "right": (max(0, width - 5200), 0, width, min(height, 1900)),
        }
        for label, box in regions.items():
            crop = image.crop(box)
            max_width = 2200
            if crop.width > max_width:
                new_height = max(1, round(crop.height * max_width / crop.width))
                crop = crop.resize((max_width, new_height), Image.Resampling.LANCZOS)
            crop.save(target_dir / f"{source.stem}_{label}.jpg", quality=82, optimize=True)
        full = image.copy()
        full.thumbnail((2200, 1600), Image.Resampling.LANCZOS)
        full.save(target_dir / f"{source.stem}_full.jpg", quality=80, optimize=True)

for target in sorted(target_dir.glob("*.jpg")):
    print(target.name, target.stat().st_size)
