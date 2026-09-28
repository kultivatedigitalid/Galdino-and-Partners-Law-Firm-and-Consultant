from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(r"C:\Users\Joshua\OneDrive\Documents\Law\tmp\business_strategy_2026-08-05")


def labeled_thumb(path: Path, width: int, max_height: int | None = None):
    im = Image.open(path).convert("RGB")
    height = max(1, round(im.height * width / im.width))
    im.thumbnail((width, min(height, max_height or height)), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (im.width, im.height + 24), "white")
    canvas.paste(im, (0, 24))
    ImageDraw.Draw(canvas).text((6, 5), path.stem, fill="#202124")
    return canvas


def make_contacts(files, out_dir, prefix, cols, batch_size, width, max_height=None):
    out_dir.mkdir(parents=True, exist_ok=True)
    outputs = []
    for batch_start in range(0, len(files), batch_size):
        thumbs = [labeled_thumb(p, width, max_height) for p in files[batch_start:batch_start + batch_size]]
        rows = (len(thumbs) + cols - 1) // cols
        cell_w = max(x.width for x in thumbs) + 16
        cell_h = max(x.height for x in thumbs) + 16
        canvas = Image.new("RGB", (cell_w * cols, cell_h * rows), "#D9D9D9")
        for i, im in enumerate(thumbs):
            canvas.paste(im, ((i % cols) * cell_w + 8, (i // cols) * cell_h + 8))
        out = out_dir / f"{prefix}-{batch_start // batch_size + 1:02d}.png"
        canvas.save(out)
        outputs.append(out)
    return outputs


docx_pages = sorted((ROOT / "docx_render" / "pages").glob("*.png"))
docx_contacts = make_contacts(docx_pages, ROOT / "docx_render" / "contacts", "docx-contact", 4, 16, 220)
xlsx_pages = sorted(p for p in (ROOT / "xlsx_renders_v2").glob("*.png") if "contact" not in p.name)
xlsx_contacts = make_contacts(xlsx_pages, ROOT / "xlsx_renders_v2", "xlsx-contact", 2, 8, 480, 650)

print(f"DOCX_PAGES={len(docx_pages)}")
print(f"DOCX_CONTACTS={len(docx_contacts)}")
print(f"XLSX_RENDERS={len(xlsx_pages)}")
print(f"XLSX_CONTACTS={len(xlsx_contacts)}")
for p in docx_contacts + xlsx_contacts:
    print(p)

