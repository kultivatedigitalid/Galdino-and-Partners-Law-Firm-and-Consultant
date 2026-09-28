import json
from pathlib import Path

root = Path(r"C:\Users\Joshua\OneDrive\Documents\Law\tmp\mapping_workbook_2026-08-14")
content = json.loads((root / "content_sheet_data.json").read_text(encoding="utf-8"))

for row in content["content_id"]:
    print("\t".join(str(row.get(k, "")).replace("\n", " / ") for k in [
        "Content ID", "Page", "Lifecycle", "Order", "Section / Component",
        "Question ID", "Headline", "Primary CTA", "Destination", "Secondary CTA",
        "Publication Status", "Placeholder / Dependency", "Source Basis", "Review Status"
    ]))

print("\nPAGE QUESTIONS")
print(list(content["page_questions"][0].keys()))
for row in content["page_questions"]:
    print("\t".join(str(value).replace("\n", " / ") for value in row.values()))

print("\nQA")
print(list(content["positioning_qa"][0].keys()))
for row in content["positioning_qa"]:
    print("\t".join(str(value).replace("\n", " / ") for value in row.values()))
