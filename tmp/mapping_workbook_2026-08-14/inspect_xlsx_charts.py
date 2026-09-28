import re
import zipfile
from pathlib import Path

source = Path(r"C:\Users\Joshua\Downloads\GP_Fase2_Website_Content_Sheet_Final_Aligned_2026-08-06.xlsx")
with zipfile.ZipFile(source, "r") as archive:
    for name in archive.namelist():
        if name.startswith("xl/charts/") and name.endswith(".xml"):
            text = archive.read(name).decode("utf-8")
            groupings = re.findall(r"<(?:c:)?grouping[^>]*val=\"([^\"]+)\"", text)
            bar_dirs = re.findall(r"<(?:c:)?barDir[^>]*val=\"([^\"]+)\"", text)
            print(name, "grouping=", groupings, "barDir=", bar_dirs)
