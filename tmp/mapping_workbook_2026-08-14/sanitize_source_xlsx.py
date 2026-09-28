import zipfile
from pathlib import Path

source = Path(r"C:\Users\Joshua\Downloads\GP_Fase2_Website_Content_Sheet_Final_Aligned_2026-08-06.xlsx")
target = Path(r"C:\Users\Joshua\OneDrive\Documents\Law\tmp\mapping_workbook_2026-08-14\source_sanitized_for_artifact_tool.xlsx")

with zipfile.ZipFile(source, "r") as input_zip, zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED) as output_zip:
    for item in input_zip.infolist():
        data = input_zip.read(item.filename)
        if item.filename == "xl/charts/chart1.xml":
            text = data.decode("utf-8")
            text = text.replace('grouping val="none"', 'grouping val="clustered"')
            data = text.encode("utf-8")
        output_zip.writestr(item, data)

print(target)
