import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";
const outputPath = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\outputs\\galdino_partner\\fase2\\GP_Fase2_Website_Content_Sheet_Mapping_Aligned_2026-08-14.xlsx";
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(outputPath));
for (const range of ["12_Mapping_QA!A13:S15", "12_Mapping_QA!A20:B26"]) {
  const result = await workbook.inspect({ kind: "table", range, include: "values,formulas", tableMaxRows: 10, tableMaxCols: 20 });
  console.log(result.ndjson);
}
const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 200 } });
console.log(errors.ndjson);
