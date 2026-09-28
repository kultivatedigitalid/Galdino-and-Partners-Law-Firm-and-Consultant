import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outputPath = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\outputs\\galdino_partner\\fase2\\GP_Fase2_Website_Content_Sheet_Mapping_Aligned_2026-08-14.xlsx";
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(outputPath));
for (const range of [
  "09_Page_Section_Mapping!A4:C50",
  "09_Page_Section_Mapping!AB4:AC50",
  "12_Mapping_QA!G4:S17",
  "12_Mapping_QA!A20:B26",
  "00_Dashboard!A45:J58",
]) {
  const result = await workbook.inspect({ kind: "table", range, include: "values,formulas", tableMaxRows: 60, tableMaxCols: 20, tableMaxCellChars: 160 });
  console.log(`RANGE ${range}\n${result.ndjson}\n`);
}
