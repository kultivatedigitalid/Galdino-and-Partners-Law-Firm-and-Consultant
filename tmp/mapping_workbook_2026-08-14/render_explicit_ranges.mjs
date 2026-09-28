import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outputPath = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\outputs\\galdino_partner\\fase2\\GP_Fase2_Website_Content_Sheet_Mapping_Aligned_2026-08-14.xlsx";
const outputDir = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\tmp\\mapping_workbook_2026-08-14\\explicit_renders";
await fs.mkdir(outputDir, { recursive: true });
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(outputPath));
for (const [sheetName, range] of [
  ["09_Page_Section_Mapping", "A1:AE14"],
  ["10_Asset_Register", "A1:P12"],
  ["11_Reference_Register", "A1:M12"],
  ["12_Mapping_QA", "A1:U26"],
]) {
  const preview = await workbook.render({ sheetName, range, scale: 0.8, format: "png" });
  await fs.writeFile(path.join(outputDir, `${sheetName}.png`), new Uint8Array(await preview.arrayBuffer()));
}
console.log(outputDir);
