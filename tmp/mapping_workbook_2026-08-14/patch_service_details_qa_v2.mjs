import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outputPath = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\outputs\\galdino_partner\\fase2\\GP_Fase2_Website_Content_Sheet_Mapping_Aligned_2026-08-14.xlsx";
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(outputPath));
const sheet = workbook.worksheets.getItem("12_Mapping_QA");
const contentRange = "'09_Page_Section_Mapping'!$C$5:$C$50";
const copyRange = "'09_Page_Section_Mapping'!$U$5:$U$50";
const structureRange = "'09_Page_Section_Mapping'!$AB$5:$AB$50";
const assetRange = "'09_Page_Section_Mapping'!$O$5:$O$50";
const referenceRange = "'09_Page_Section_Mapping'!$P$5:$P$50";
const ids = ["SD1-001", "SD2-001", "SD3-001", "SD4-001"];

sheet.getRange("G14").formulas = [[`=${ids.map((id) => `COUNTIF(${contentRange},"${id}")`).join("+")}`]];
sheet.getRange("H14").formulas = [["=0"]];
sheet.getRange("I14").formulas = [[`=${ids.map((id) => `COUNTIFS(${contentRange},"${id}",${copyRange},"READY FOR CONTENT APPROVAL")`).join("+")}`]];
sheet.getRange("J14").formulas = [["=G14-I14"]];
sheet.getRange("K14").formulas = [[`=IF(${ids.map((id) => `COUNTIFS(${contentRange},"${id}",${structureRange},"<>PASS – STRUCTURE")`).join("+")}=0,"PASS","FAIL")`]];
sheet.getRange("M14").formulas = [[`=IF(${ids.map((id) => `COUNTIFS(${contentRange},"${id}",${assetRange},"")+COUNTIFS(${contentRange},"${id}",${referenceRange},"")`).join("+")}=0,"PASS","FAIL")`]];

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(outputPath);
