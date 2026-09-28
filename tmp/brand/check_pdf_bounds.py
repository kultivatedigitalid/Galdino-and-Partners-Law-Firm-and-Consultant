import json
from pathlib import Path

import pdfplumber


workspace = Path(__file__).resolve().parents[2]
pdf_path = workspace / "outputs" / "galdino_partner" / "brand" / "Galdino-and-Partner-Brand-Guidelines.pdf"
pages = []
with pdfplumber.open(pdf_path) as pdf:
    for number, page in enumerate(pdf.pages, 1):
        out = []
        for char in page.chars:
            if char["x0"] < -0.5 or char["x1"] > page.width + 0.5 or char["top"] < -0.5 or char["bottom"] > page.height + 0.5:
                out.append({key: char.get(key) for key in ("text", "x0", "x1", "top", "bottom")})
        assert not out, f"Page {number} has out-of-bounds text: {out[:3]}"
        pages.append({"page": number, "characters": len(page.chars), "words": len(page.extract_words()), "out_of_bounds": 0})

report = {"result": "PASS", "pages": len(pages), "out_of_bounds_characters": 0, "page_checks": pages}
output = workspace / "outputs" / "galdino_partner" / "brand" / "qa" / "bounds-report.json"
output.write_text(json.dumps(report, indent=2), encoding="utf-8")
print(json.dumps({"result": "PASS", "pages": len(pages), "out_of_bounds_characters": 0}, indent=2))
