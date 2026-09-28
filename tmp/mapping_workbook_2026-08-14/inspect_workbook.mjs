import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@openai/artifact-tool";

const sourcePath = "C:\\Users\\Joshua\\Downloads\\GP_Fase2_Website_Content_Sheet_Final_Aligned_2026-08-06.xlsx";
const outputDir = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\tmp\\mapping_workbook_2026-08-14\\source_renders";
await fs.mkdir(outputDir, { recursive: true });

const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(sourcePath));
const names = workbook.worksheets.items.map((sheet) => sheet.name);
const inspections = [];

for (const sheetName of names) {
  const sheet = workbook.worksheets.getItem(sheetName);
  const inspected = await workbook.inspect({
    kind: "table",
    range: `${sheetName}!A1:Z80`,
    include: "values,formulas",
    tableMaxRows: 80,
    tableMaxCols: 26,
  });
  inspections.push({ sheetName, inspected });
  const image = await workbook.render({ sheetName, range: `${sheetName}!A1:Z80`, scale: 0.65 });
  await image.save(path.join(outputDir, `${sheetName}.png`));
}

await fs.writeFile(
  path.join(outputDir, "inspection.json"),
  JSON.stringify({ names, inspections }, null, 2),
  "utf8",
);

console.log(JSON.stringify({ sheetCount: names.length, names, outputDir }, null, 2));
