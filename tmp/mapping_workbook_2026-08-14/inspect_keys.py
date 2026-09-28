import json
from pathlib import Path

root = Path(r"C:\Users\Joshua\OneDrive\Documents\Law\tmp\mapping_workbook_2026-08-14")
content = json.loads((root / "content_sheet_data.json").read_text(encoding="utf-8"))
audit = json.loads((root / "codebase_audit.json").read_text(encoding="utf-8"))
print("CONTENT_KEYS", list(content["content_id"][0].keys()))
print("AUDIT_KEYS", list(audit.keys()))
for key, value in audit.items():
    if isinstance(value, list):
        print(key, len(value), value[:2])
