import json
import re
from pathlib import Path
from PIL import Image

work = Path(r"C:\Users\Joshua\OneDrive\Documents\Law\tmp\mapping_workbook_2026-08-14")
site_root = Path(r"C:\Users\Joshua\OneDrive\Documents\Law\outputs\galdino_partner\website")
audit = json.loads((work / "codebase_audit.json").read_text(encoding="utf-8"))

asset_imports = []
for item in audit["imports"]:
    target = item.get("target", "")
    if Path(target).suffix.lower() in {".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"}:
        asset_imports.append(item)

assets = []
for item in audit["assetFiles"]:
    rel = item["file"]
    full = site_root / rel
    width = height = None
    mime = ""
    try:
        if full.suffix.lower() == ".svg":
            text = full.read_text(encoding="utf-8")
            viewbox = re.search(r'viewBox="[^"]*?([0-9.]+)\s+([0-9.]+)"', text)
            if viewbox:
                width, height = float(viewbox.group(1)), float(viewbox.group(2))
            mime = "image/svg+xml"
        else:
            with Image.open(full) as image:
                width, height = image.size
                mime = Image.MIME.get(image.format, "")
    except Exception as exc:
        mime = f"ERROR: {exc}"
    imports = [entry for entry in asset_imports if Path(entry["target"]).name == full.name]
    assets.append({**item, "width": width, "height": height, "mime": mime, "imports": imports})

flags_by_file = {}
for item in audit["flags"]:
    flags_by_file.setdefault(item["file"], []).append(item)

context = {
    "coverage": audit["coverage"],
    "routes": audit["routes"],
    "links": audit["links"],
    "assets": assets,
    "assetImports": asset_imports,
    "flagsByFile": flags_by_file,
}
(work / "mapping_context.json").write_text(json.dumps(context, ensure_ascii=False, indent=2), encoding="utf-8")

print("ASSETS")
for item in assets:
    uses = ", ".join(f'{u["file"]}:{u["line"]}' for u in item["imports"]) or "not imported"
    print(f'{item["file"]} | {item["width"]}x{item["height"]} | {item["size"]} | {uses}')
print("\nROUTE LINKS")
for item in audit["links"]:
    print(item)
