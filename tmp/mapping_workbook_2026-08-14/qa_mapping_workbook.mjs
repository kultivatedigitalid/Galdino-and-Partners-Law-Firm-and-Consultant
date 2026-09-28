import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outputPath = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\outputs\\galdino_partner\\fase2\\GP_Fase2_Website_Content_Sheet_Mapping_Aligned_2026-08-14.xlsx";
const renderDir = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\tmp\\mapping_workbook_2026-08-14\\final_renders";
await fs.mkdir(renderDir, { recursive: true });

const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(outputPath));
const sheetNames = workbook.worksheets.items.map((sheet) => sheet.name);
const inspections = {};

for (const [sheetName, range] of [
  ["09_Page_Section_Mapping", "A1:AE50"],
  ["10_Asset_Register", "A1:P22"],
  ["11_Reference_Register", "A1:M31"],
  ["12_Mapping_QA", "A1:U26"],
]) {
  inspections[sheetName] = await workbook.inspect({
    kind: "table",
    range: `${sheetName}!${range}`,
    include: "values,formulas",
    tableMaxRows: 80,
    tableMaxCols: 35,
  });
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 0.7, format: "png" });
  await fs.writeFile(path.join(renderDir, `${sheetName}.png`), new Uint8Array(await preview.arrayBuffer()));
}

const formulaErrors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 500 },
  summary: "final formula error scan",
});

await fs.writeFile(path.join(renderDir, "qa_inspection.json"), JSON.stringify({ sheetNames, inspections, formulaErrors }, null, 2), "utf8");
console.log(JSON.stringify({ outputPath, sheetCount: sheetNames.length, sheetNames, renderDir, formulaErrors }, null, 2));
