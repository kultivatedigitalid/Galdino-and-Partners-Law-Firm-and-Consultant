import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const source = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\outputs\\galdino_partner\\fase2\\GP_Fase2_Website_Content_Sheet_Mapping_Checklist_Evidence_2026-08-14.xlsx";
const target = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\tmp\\mapping_workbook_2026-08-14\\checklist_qa";
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(source));
for (const [name, range] of [["tiny_top", "A1:F12"], ["tiny_middle", "A13:F23"], ["tiny_bottom", "A24:F33"]]) {
  const image = await workbook.render({ sheetName: "13_Checklist_Evidence", range, scale: 0.18, format: "png" });
  await fs.writeFile(path.join(target, `${name}.png`), new Uint8Array(await image.arrayBuffer()));
}
console.log(target);
