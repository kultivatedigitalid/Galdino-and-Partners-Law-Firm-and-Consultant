import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

path = Path(r"C:\Users\Joshua\OneDrive\Documents\Law\outputs\galdino_partner\fase2\GP_Fase2_Website_Content_Sheet_Mapping_Aligned_2026-08-14.xlsx")
ns_main = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
ns_rel = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
ns_pkg = "http://schemas.openxmlformats.org/package/2006/relationships"

with zipfile.ZipFile(path) as archive:
    workbook = ET.fromstring(archive.read("xl/workbook.xml"))
    rels = ET.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
    targets = {rel.attrib["Id"]: rel.attrib["Target"] for rel in rels.findall(f"{{{ns_pkg}}}Relationship")}
    for sheet in workbook.find(f"{{{ns_main}}}sheets"):
        name = sheet.attrib["name"]
        if name not in {"09_Page_Section_Mapping", "10_Asset_Register", "11_Reference_Register", "12_Mapping_QA"}:
            continue
        rel_id = sheet.attrib[f"{{{ns_rel}}}id"]
        target = targets[rel_id]
        xml_path = target.lstrip("/")
        if not xml_path.startswith("xl/"):
            xml_path = "xl/" + xml_path
        root = ET.fromstring(archive.read(xml_path))
        rows = root.find(f"{{{ns_main}}}sheetData")
        details = []
        for row in rows.findall(f"{{{ns_main}}}row")[:8]:
            details.append({key: row.attrib.get(key) for key in ["r", "ht", "customHeight", "hidden"]})
        merges = root.find(f"{{{ns_main}}}mergeCells")
        merge_refs = [cell.attrib["ref"] for cell in merges] if merges is not None else []
        dimension = root.find(f"{{{ns_main}}}dimension")
        print(name, xml_path, "dimension", dimension.attrib if dimension is not None else None, "rows", details, "merges", merge_refs[:12])
