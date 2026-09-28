import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const sourcePath = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\tmp\\mapping_workbook_2026-08-14\\source_sanitized_for_artifact_tool.xlsx";
const outputDir = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\tmp\\mapping_workbook_2026-08-14\\source_renders";
await fs.mkdir(outputDir, { recursive: true });

const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(sourcePath));
const names = workbook.worksheets.items.map((sheet) => sheet.name);
const inspections = [];

for (const sheetName of names) {
  const inspected = await workbook.inspect({
    kind: "table",
    range: `${sheetName}!A1:Z80`,
    include: "values,formulas",
    tableMaxRows: 80,
    tableMaxCols: 26,
  });
  inspections.push({ sheetName, inspected });
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 0.65, format: "png" });
  await fs.writeFile(path.join(outputDir, `${sheetName}.png`), new Uint8Array(await preview.arrayBuffer()));
}

await fs.writeFile(path.join(outputDir, "inspection.json"), JSON.stringify({ names, inspections }, null, 2), "utf8");
console.log(JSON.stringify({ sheetCount: names.length, names, outputDir }, null, 2));
