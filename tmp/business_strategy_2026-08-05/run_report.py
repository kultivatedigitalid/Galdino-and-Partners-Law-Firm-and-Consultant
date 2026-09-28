from pathlib import Path

import build_report as br


_original_add_table = br.add_table


def _safe_add_table(doc, headers, rows, widths, **kwargs):
    widths = list(widths)
    delta = br.CONTENT_W - sum(widths)
    if delta:
        target = 1 if len(widths) > 1 else 0
        widths[target] += delta
    return _original_add_table(doc, headers, rows, widths, **kwargs)


br.add_table = _safe_add_table
br.build_doc()
br.export_json()
print(br.DOCX_PATH)
print(br.JSON_PATH)

