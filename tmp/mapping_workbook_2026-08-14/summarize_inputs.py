import json
from pathlib import Path

ROOT = Path(r"C:\Users\Joshua\OneDrive\Documents\Law\tmp\mapping_workbook_2026-08-14")

content = json.loads((ROOT / "content_sheet_data.json").read_text(encoding="utf-8"))
audit = json.loads((ROOT / "codebase_audit.json").read_text(encoding="utf-8"))

print("CONTENT BLOCKS")
for row in content["content_id"]:
    print(" | ".join(str(row.get(k, "")) for k in [
        "Content ID", "Page", "Lifecycle", "Section Order", "Section / Component",
        "Publication", "Review Status"
    ]))

print("\nROUTES")
for route in audit.get("routes", []):
    print(route)

print("\nASSETS")
for asset in audit.get("assets", []):
    print(asset)

print("\nCOMPONENT USAGES")
for item in audit.get("componentUsages", []):
    print(item)

print("\nIMPORTS")
for item in audit.get("imports", []):
    source = str(item.get("source", ""))
    if any(ext in source.lower() for ext in [".png", ".jpg", ".jpeg", ".webp", ".svg"]):
        print(item)
