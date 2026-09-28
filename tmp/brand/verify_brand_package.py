from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

import pdfplumber
from PIL import Image, ImageChops, ImageDraw, ImageStat
from pypdf import PdfReader


MASTER_SHA256 = "92c2079247e08515100b3c7861c738db9b280f591b66f2dd6ffe3de187e012ed"
EXPECTED_PAGES = 23


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def make_contact_sheet(paths: list[Path], output: Path) -> dict:
    thumb_w, thumb_h = 360, 255
    cols, gap, label_h = 3, 18, 24
    rows = (len(paths) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * thumb_w + (cols + 1) * gap, rows * (thumb_h + label_h) + (rows + 1) * gap), "#d6d4d0")
    draw = ImageDraw.Draw(sheet)
    for index, path in enumerate(paths):
        with Image.open(path) as opened:
            image = ImageOps.fit(opened.convert("RGB"), (thumb_w, thumb_h), method=Image.Resampling.LANCZOS)
        col, row = index % cols, index // cols
        x = gap + col * (thumb_w + gap)
        y = gap + row * (thumb_h + label_h + gap)
        sheet.paste(image, (x, y))
        draw.rectangle((x, y, x + thumb_w, y + thumb_h), outline="#6c6964", width=1)
        draw.text((x + 4, y + thumb_h + 4), f"PAGE {int(re.findall(r'\d+', path.stem)[-1]):02d}", fill="#171719")
    sheet.save(output, quality=92, subsampling=0)
    return {"file": output.name, "size": list(sheet.size), "pages": len(paths), "sha256": sha256(output)}


def main() -> None:
    workspace = Path(__file__).resolve().parents[2]
    brand = workspace / "outputs" / "galdino_partner" / "brand"
    pdf_path = brand / "Galdino-and-Partner-Brand-Guidelines.pdf"
    logo_dir = brand / "logos"
    qa = brand / "qa"
    master = workspace / "outputs" / "galdino_partner" / "website" / "public" / "assets" / "gp-logo-brand.png"

    assert pdf_path.exists() and pdf_path.stat().st_size > 500_000
    assert sha256(master) == MASTER_SHA256
    assert sha256(logo_dir / "galdino-partner-logo-transparent.png") == MASTER_SHA256

    expected_logo_files = {
        "galdino-partner-logo-transparent.png", "galdino-partner-logo-white-bg.png", "galdino-partner-logo-black-bg.png",
        "galdino-partner-logo-transparent.webp", "galdino-partner-logo-white-bg.webp", "galdino-partner-logo-black-bg.webp",
        "galdino-partner-logo-white-bg.jpg", "galdino-partner-logo-black-bg.jpg",
    }
    actual_logo_files = {path.name for path in logo_dir.iterdir() if path.is_file()}
    assert actual_logo_files == expected_logo_files

    image_checks = []
    for path in sorted(logo_dir.iterdir()):
        with Image.open(path) as image:
            image.verify()
        with Image.open(path) as image:
            assert image.size == (600, 413)
            has_alpha = "A" in image.getbands()
            alpha_extrema = image.getchannel("A").getextrema() if has_alpha else None
            if "transparent" in path.name:
                assert has_alpha and alpha_extrema[0] == 0 and alpha_extrema[1] == 255
            else:
                assert not has_alpha or alpha_extrema == (255, 255)
            if path.suffix.lower() == ".jpg":
                assert image.format == "JPEG" and not has_alpha
            if path.suffix.lower() == ".webp":
                assert image.format == "WEBP"
            if path.suffix.lower() == ".png":
                assert image.format == "PNG"
            image_checks.append({"file": path.name, "format": image.format, "mode": image.mode, "sha256": sha256(path)})

    reader = PdfReader(str(pdf_path))
    assert len(reader.pages) == EXPECTED_PAGES
    dimensions = []
    for page in reader.pages:
        width = float(page.mediabox.width)
        height = float(page.mediabox.height)
        assert width > height
        assert abs(width - 841.8898) < 1 and abs(height - 595.2756) < 1
        dimensions.append([round(width, 2), round(height, 2)])

    page_texts = []
    with pdfplumber.open(pdf_path) as pdf:
        assert len(pdf.pages) == EXPECTED_PAGES
        for index, page in enumerate(pdf.pages, 1):
            text = page.extract_text() or ""
            assert len(text.strip()) > 80, f"Page {index} has too little text"
            page_texts.append(text)
    full_text = "\n".join(page_texts)

    required = [
        "BRAND GUIDELINES", "A system grounded in the project", "Regulatory clarity for business action",
        "The approved red-black-gold master mark", "Choose the file by background",
        "A disciplined red-led palette", "System typography", "Accessibility and bilingual clarity",
        "Publish only what the project can prove", "Project source register",
    ]
    for phrase in required:
        assert phrase.lower() in full_text.lower(), phrase
    assert "[PLACEHOLDER" not in full_text
    assert "�" not in full_text
    assert ":codex-file-citation" not in full_text
    assert "100% approved" in full_text  # appears only as a prohibited phrase
    assert "Imagegen concept" in full_text

    rendered = sorted(qa.glob("page-*.png"), key=lambda path: int(re.findall(r"\d+", path.stem)[-1]))
    assert len(rendered) == EXPECTED_PAGES, len(rendered)
    render_checks = []
    for index, path in enumerate(rendered, 1):
        with Image.open(path) as image:
            image.load()
            assert image.width > image.height
            stat = ImageStat.Stat(image.convert("L"))
            assert stat.var[0] > 50, f"Page {index} may be blank"
            # Require at least a visible content area distinct from the corner background.
            corner = image.convert("RGB").getpixel((3, 3))
            flat = Image.new("RGB", image.size, corner)
            difference = ImageChops.difference(image.convert("RGB"), flat)
            assert difference.getbbox() is not None
            render_checks.append({"page": index, "size": list(image.size), "variance": round(stat.var[0], 2), "sha256": sha256(path)})

    contact_sheets = [
        make_contact_sheet(rendered[:12], qa / "contact-sheet-01.jpg"),
        make_contact_sheet(rendered[12:], qa / "contact-sheet-02.jpg"),
    ]

    manifest = json.loads((brand / "logo-manifest.json").read_text(encoding="utf-8"))
    assert manifest["master_sha256"] == MASTER_SHA256
    assert len(manifest["assets"]) == 8

    report = {
        "result": "PASS",
        "pdf": {"file": pdf_path.name, "bytes": pdf_path.stat().st_size, "sha256": sha256(pdf_path), "pages": len(reader.pages)},
        "page_dimensions": dimensions[0],
        "logo_master_unchanged": True,
        "logo_files": image_checks,
        "rendered_pages": render_checks,
        "contact_sheets": contact_sheets,
        "content_checks": {"required_headings": len(required), "replacement_characters": 0, "placeholder_markers": 0},
    }
    report_path = qa / "verification-report.json"
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({
        "result": report["result"],
        "pdf_pages": report["pdf"]["pages"],
        "logo_files": len(report["logo_files"]),
        "rendered_pages": len(report["rendered_pages"]),
        "contact_sheets": [sheet["file"] for sheet in contact_sheets],
        "report": str(report_path.resolve()),
    }, indent=2))


if __name__ == "__main__":
    from PIL import ImageOps
    main()
