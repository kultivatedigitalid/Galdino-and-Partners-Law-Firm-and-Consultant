import json
from collections import Counter
from pathlib import Path

path = Path(r"C:\Users\Joshua\OneDrive\Documents\Law\tmp\mapping_workbook_2026-08-14\workbook_data.json")
data = json.loads(path.read_text(encoding="utf-8"))
errors = []

for group in ["mappingRows", "assetRows", "referenceRows", "qaRows"]:
    rows = data[group]
    keys = list(rows[0])
    for index, row in enumerate(rows, start=1):
        missing = [key for key in keys if key not in row or row[key] in (None, "")]
        if missing:
            errors.append(f"{group} row {index}: blank {missing}")

for group, key in [("mappingRows", "Mapping ID"), ("mappingRows", "Content ID"), ("assetRows", "Asset ID"), ("referenceRows", "Reference ID"), ("qaRows", "QA ID")]:
    duplicates = [value for value, count in Counter(row[key] for row in data[group]).items() if count > 1]
    if duplicates:
        errors.append(f"{group} duplicate {key}: {duplicates}")

content_ids = [row["Content ID"] for row in data["mappingRows"] if row["Mapping Type"] == "CONTENT BLOCK"]
if len(content_ids) != 44:
    errors.append(f"Expected 44 content block mappings, found {len(content_ids)}")
if any(row["Approval Status"] == "APPROVED" or row["UI/UX Review"] == "APPROVED" for row in data["mappingRows"]):
    errors.append("Mapping must not self-approve UI/UX or final approval")

print(json.dumps({"errors": errors, "counts": {k: len(v) for k, v in data.items() if isinstance(v, list)}}, ensure_ascii=False, indent=2))
raise SystemExit(1 if errors else 0)
