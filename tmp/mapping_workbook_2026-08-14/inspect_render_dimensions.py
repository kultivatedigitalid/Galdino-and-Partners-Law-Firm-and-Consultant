from pathlib import Path
from PIL import Image

root = Path(r"C:\Users\Joshua\OneDrive\Documents\Law\tmp\mapping_workbook_2026-08-14\final_renders")
for path in sorted(root.glob("*.png")):
    with Image.open(path) as image:
        print(path.name, image.size)
