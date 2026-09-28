from pathlib import Path
from PIL import Image

root = Path(r"C:\Users\Joshua\OneDrive\Documents\Law\tmp\business_strategy_2026-08-05")
inputs = [
    root / "docx_render" / "contacts" / "docx-contact-01.png",
    root / "docx_render" / "contacts" / "docx-contact-02.png",
    root / "docx_render" / "contacts" / "docx-contact-03.png",
    root / "xlsx_renders_v2" / "xlsx-contact-01.png",
    root / "xlsx_renders_v2" / "xlsx-contact-02.png",
]
out_dir = root / "qa_small"
out_dir.mkdir(parents=True, exist_ok=True)
for src in inputs:
    im = Image.open(src).convert("RGB")
    target_w = 1000
    target_h = round(im.height * target_w / im.width)
    im = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
    out = out_dir / f"{src.stem}.jpg"
    im.save(out, quality=38, optimize=True, progressive=True)
    print(out, out.stat().st_size)

