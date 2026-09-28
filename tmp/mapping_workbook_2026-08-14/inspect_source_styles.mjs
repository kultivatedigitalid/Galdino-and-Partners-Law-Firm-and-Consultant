import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const sourcePath = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\tmp\\mapping_workbook_2026-08-14\\source_sanitized_for_artifact_tool.xlsx";
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(sourcePath));
for (const range of ["00_Dashboard!A1:J12", "03_Content_ID!A1:Q6", "07_Approval_Actions!A1:L6"]) {
  const result = await workbook.inspect({ kind: "computedStyle", range, include: "values,styles", tableMaxRows: 12, tableMaxCols: 18 });
  console.log(range, JSON.stringify(result, null, 2));
}
