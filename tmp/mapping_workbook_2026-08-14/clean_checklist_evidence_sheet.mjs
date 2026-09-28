import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outputPath = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\outputs\\galdino_partner\\fase2\\GP_Fase2_Website_Content_Sheet_Mapping_Checklist_Evidence_2026-08-14.xlsx";
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(outputPath));
const sheet = workbook.worksheets.getItem("13_Checklist_Evidence");
const range = sheet.getRange("A1:F33");
const current = range.values;
const replacements = new Map([
  ["â˜", "[ ]"],
  ["â€“", "-"],
  ["â€”", "--"],
  ["â€¦", "..."],
]);
const cleaned = current.map((row) => row.map((value) => {
  if (typeof value !== "string") return value;
  let result = value;
  for (const [bad, good] of replacements) result = result.split(bad).join(good);
  return result;
}));
range.values = cleaned;
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(outputPath);
