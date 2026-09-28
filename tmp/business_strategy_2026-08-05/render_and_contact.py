from __future__ import annotations

from pathlib import Path

import fitz
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(r"C:\Users\Joshua\OneDrive\Documents\Law\tmp\business_strategy_2026-08-05")
PDF = ROOT / "docx_render" / "GP_Business_Service_Portfolio_Strategy_2026-08-05.pdf"
DOCX_PAGES = ROOT / "docx_render" / "pages"
DOCX_CONTACT = ROOT / "docx_render" / "contacts"
XLSX_RENDER = ROOT / "xlsx_renders_v2"
XLSX_CONTACT = ROOT / "xlsx_renders_v2" / "contact_sheet.png"


def label(img: Image.Image, text: str, pad: int = 22) -> Image.Image:
    canvas = Image.new("RGB", (img.width, img.height + pad), "white")
    canvas.paste(img, (0, pad))
    draw = ImageDraw.Draw(canvas)
    draw.text((6, 4), text, fill="#202124")
    return canvas


def render_pdf():
    DOCX_PAGES.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(PDF)
    files = []
    matrix = fitz.Matrix(1.35, 1.35)
    for index, page in enumerate(doc):
        pix = page.get_pixmap(matrix=matrix, alpha=False)
        out = DOCX_PAGES / f"page-{index + 1:03d}.png"
        pix.save(out)
        files.append(out)
    return files


def contacts(files, out_dir: Path, prefix: str, cols=4, page_batch=16, thumb_w=220):
    out_dir.mkdir(parents=True, exist_ok=True)
    outputs = []
    for batch_idx in range(0, len(files), page_batch):
        batch = files[batch_idx:batch_idx + page_batch]
        thumbs = []
        for f in batch:
            im = Image.open(f).convert("RGB")
            h = max(1, round(im.height * thumb_w / im.width))
            im.thumbnail((thumb_w, h), Image.Resampling.LANCZOS)
            thumbs.append(label(im, f.stem))
        rows = (len(thumbs) + cols - 1) // cols
        cell_w = max(t.width for t in thumbs) + 16
        cell_h = max(t.height for t in thumbs) + 16
        canvas = Image.new("RGB", (cell_w * cols, cell_h * rows), "#D9D9D9")
        for idx, im in enumerate(thumbs):
            x = (idx % cols) * cell_w + 8
            y = (idx // cols) * cell_h + 8
            canvas.paste(im, (x, y))
        out = out_dir / f"{prefix}-{batch_idx // page_batch + 1:02d}.png"
        canvas.save(out)
        outputs.append(out)
    return outputs


def xlsx_contact():
    files = sorted(p for p in XLSX_RENDER.glob("*.png") if p.name != XLSX_CONTACT.name)
    thumbs = []
    for f in files:
        im = Image.open(f).convert("RGB")
        thumb_w = 520
        h = max(1, round(im.height * thumb_w / im.width))
        im.thumbnail((thumb_w, min(h, 700)), Image.Resampling.LANCZOS)
        thumbs.append(label(im, f.stem, 26))
    cols = 2
    rows = (len(thumbs) + cols - 1) // cols
    cell_w = max(t.width for t in thumbs) + 20
    cell_h = max(t.height for t in thumbs) + 20
    canvas = Image.new("RGB", (cell_w * cols, cell_h * rows), "#D9D9D9")
    for idx, im in enumerate(thumbs):
        x = (idx % cols) * cell_w + 10
        y = (idx // cols) * cell_h + 10
        canvas.paste(im, (x, y))
    canvas.save(XLSX_CONTACT)
    return files


if __name__ == "__main__":
    pages = render_pdf()
    contact_files = contacts(pages, DOCX_CONTACT, "docx-contact")
    xlsx_files = xlsx_contact()
    print(f"DOCX_PAGES={len(pages)}")
    print(f"DOCX_CONTACTS={len(contact_files)}")
    print(f"XLSX_RENDERS={len(xlsx_files)}")
    for p in contact_files:
        print(p)
    print(XLSX_CONTACT)

