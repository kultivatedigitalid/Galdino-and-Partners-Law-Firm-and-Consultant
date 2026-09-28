import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outputPath = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\outputs\\galdino_partner\\fase2\\GP_Fase2_Website_Content_Sheet_Mapping_Aligned_2026-08-14.xlsx";
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(outputPath));
const sheet = workbook.worksheets.getItem("12_Mapping_QA");
const mapEnd = 50;

sheet.getRange("G14").formulas = [[`=COUNTIF('09_Page_Section_Mapping'!$C$5:$C$${mapEnd},"SD*-001")`]];
sheet.getRange("H14").formulas = [["=0"]];
sheet.getRange("I14").formulas = [[`=COUNTIFS('09_Page_Section_Mapping'!$C$5:$C$${mapEnd},"SD*-001",'09_Page_Section_Mapping'!$U$5:$U$${mapEnd},"READY FOR CONTENT APPROVAL")`]];
sheet.getRange("J14").formulas = [["=G14-I14"]];
sheet.getRange("K14").formulas = [[`=IF(COUNTIFS('09_Page_Section_Mapping'!$C$5:$C$${mapEnd},"SD*-001",'09_Page_Section_Mapping'!$AB$5:$AB$${mapEnd},"<>PASS – STRUCTURE")=0,"PASS","FAIL")`]];
sheet.getRange("M14").formulas = [[`=IF(COUNTIFS('09_Page_Section_Mapping'!$C$5:$C$${mapEnd},"SD*-001",'09_Page_Section_Mapping'!$O$5:$O$${mapEnd},"")+COUNTIFS('09_Page_Section_Mapping'!$C$5:$C$${mapEnd},"SD*-001",'09_Page_Section_Mapping'!$P$5:$P$${mapEnd},"")=0,"PASS","FAIL")`]];

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(outputPath);
