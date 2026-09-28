from __future__ import annotations

import json
import sys
from pathlib import Path

from docx import Document


source = Path(sys.argv[1]).resolve()
document = Document(source)
selected = {"Normal", "K Title", "K Subtitle", "K Section", "K Heading", "K Helper", "List Bullet"}
records = []
for style in document.styles:
    if style.name not in selected:
        continue
    paragraph = getattr(style, "paragraph_format", None)
    records.append(
        {
            "name": style.name,
            "type": str(style.type),
            "font_name": style.font.name,
            "font_size_pt": style.font.size.pt if style.font.size else None,
            "bold": style.font.bold,
            "italic": style.font.italic,
            "font_color": str(style.font.color.rgb) if style.font.color and style.font.color.rgb else None,
            "space_before_pt": paragraph.space_before.pt if paragraph and paragraph.space_before else None,
            "space_after_pt": paragraph.space_after.pt if paragraph and paragraph.space_after else None,
            "line_spacing": str(paragraph.line_spacing) if paragraph and paragraph.line_spacing else None,
            "keep_with_next": paragraph.keep_with_next if paragraph else None,
        }
    )
print(json.dumps(records, indent=2, ensure_ascii=False))
