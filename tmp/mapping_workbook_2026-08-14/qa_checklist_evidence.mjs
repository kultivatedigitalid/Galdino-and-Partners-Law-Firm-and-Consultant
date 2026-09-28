import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outputPath = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\outputs\\galdino_partner\\fase2\\GP_Fase2_Website_Content_Sheet_Mapping_Checklist_Evidence_2026-08-14.xlsx";
const qaDir = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\tmp\\mapping_workbook_2026-08-14\\checklist_qa";
await fs.mkdir(qaDir, { recursive: true });
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(outputPath));
const table = await workbook.inspect({ kind: "table", range: "13_Checklist_Evidence!A1:F33", include: "values,formulas", tableMaxRows: 40, tableMaxCols: 8 });
const badEncoding = await workbook.inspect({ kind: "match", searchTerm: "â|Ã|ï¿½", options: { useRegex: true, maxResults: 200 }, summary: "encoding scan" });
const formulaErrors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 500 }, summary: "formula error scan" });
const preview = await workbook.render({ sheetName: "13_Checklist_Evidence", range: "A1:F33", scale: 0.85, format: "png" });
await fs.writeFile(path.join(qaDir, "13_Checklist_Evidence.png"), new Uint8Array(await preview.arrayBuffer()));
await fs.writeFile(path.join(qaDir, "inspection.json"), JSON.stringify({ table, badEncoding, formulaErrors, sheets: workbook.worksheets.items.map((s) => s.name) }, null, 2));
console.log(JSON.stringify({ outputPath, qaDir, sheetCount: workbook.worksheets.items.length, badEncoding, formulaErrors }, null, 2));
