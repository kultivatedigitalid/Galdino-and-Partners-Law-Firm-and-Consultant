import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outputPath = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\outputs\\galdino_partner\\fase2\\GP_Fase2_Website_Content_Sheet_Mapping_Aligned_2026-08-14.xlsx";
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(outputPath));
const ends = {
  "09_Page_Section_Mapping": "AE",
  "10_Asset_Register": "P",
  "11_Reference_Register": "M",
  "12_Mapping_QA": "U",
};

for (const [sheetName, endColumn] of Object.entries(ends)) {
  const sheet = workbook.worksheets.getItem(sheetName);
  sheet.getRange(`A2:${endColumn}2`).format.wrapText = false;
  sheet.getRange(`A3:${endColumn}3`).format.wrapText = false;
  sheet.getRange("A2").format.rowHeightPx = 25;
  sheet.getRange("A3").format.rowHeightPx = 28;
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(outputPath);
