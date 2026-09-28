from pathlib import Path

from PIL import Image


workspace = Path(__file__).resolve().parents[2]
qa = workspace / "outputs" / "galdino_partner" / "brand" / "qa"
with Image.open(qa / "page-15.png") as opened:
    image = opened.convert("RGB")
    image.thumbnail((720, 510), Image.Resampling.LANCZOS)
    image.save(qa / "page-15-preview.jpg", quality=38, subsampling=2, optimize=True)
