import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const workDir = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\tmp\\mapping_workbook_2026-08-14";
const sourcePath = path.join(workDir, "source_sanitized_for_artifact_tool.xlsx");
const dataPath = path.join(workDir, "workbook_data.json");
const outputDir = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\outputs\\galdino_partner\\fase2";
const outputPath = path.join(outputDir, "GP_Fase2_Website_Content_Sheet_Mapping_Aligned_2026-08-14.xlsx");

const COLORS = {
  black: "#0B0B0C",
  red: "#720D1C",
  brightRed: "#C4142A",
  gold: "#B18A4B",
  paper: "#F4F3F1",
  white: "#FFFFFF",
  ink: "#0B0B0C",
  muted: "#78716C",
  line: "#D6D3D1",
  amber: "#FEF3C7",
  amberText: "#92400E",
  redSoft: "#FEE2E2",
  redText: "#991B1B",
  greenSoft: "#DCFCE7",
  greenText: "#166534",
  blueSoft: "#DBEAFE",
  blueText: "#1E40AF",
  slateSoft: "#F8FAFC",
};

const data = JSON.parse(await fs.readFile(dataPath, "utf8"));
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(sourcePath));

function columnName(number) {
  let result = "";
  let current = number;
  while (current > 0) {
    current -= 1;
    result = String.fromCharCode(65 + (current % 26)) + result;
    current = Math.floor(current / 26);
  }
  return result;
}

function applyCoreStyle(sheet, lastColumn, lastRow) {
  const body = sheet.getRange(`A1:${lastColumn}${lastRow}`);
  body.format = {
    font: { typeface: "Carlito", fontSize: 9, color: COLORS.ink },
    verticalAlignment: "center",
  };
  sheet.showGridLines = false;
}

function applyTitleStyle(sheet, lastColumn, title, subtitle, caution) {
  sheet.mergeCells(`A1:${lastColumn}1`);
  sheet.mergeCells(`A2:${lastColumn}2`);
  sheet.mergeCells(`A3:${lastColumn}3`);
  sheet.getRange("A1").values = [[title]];
  sheet.getRange("A2").values = [[subtitle]];
  sheet.getRange("A3").values = [[caution]];
  sheet.getRange(`A1:${lastColumn}1`).format = {
    fill: COLORS.black,
    font: { typeface: "Carlito", fontSize: 20, bold: true, color: COLORS.white },
    horizontalAlignment: "left",
    verticalAlignment: "center",
  };
  sheet.getRange(`A2:${lastColumn}2`).format = {
    fill: COLORS.paper,
    font: { typeface: "Carlito", fontSize: 10, italic: true, color: COLORS.muted },
    wrapText: true,
    verticalAlignment: "center",
  };
  sheet.getRange(`A3:${lastColumn}3`).format = {
    fill: COLORS.amber,
    font: { typeface: "Carlito", fontSize: 9, bold: true, color: COLORS.amberText },
    wrapText: true,
    verticalAlignment: "center",
  };
  sheet.getRange(`A1:${lastColumn}1`).format.rowHeightPx = 34;
  sheet.getRange(`A2:${lastColumn}2`).format.rowHeightPx = 32;
  sheet.getRange(`A3:${lastColumn}3`).format.rowHeightPx = 42;
}

function writeTableSheet({ name, title, subtitle, caution, headers, rows, tableName, widths, rowHeight = 64 }) {
  const sheet = workbook.worksheets.add(name);
  const lastColumn = columnName(headers.length);
  const firstDataRow = 5;
  const lastDataRow = firstDataRow + rows.length - 1;
  const matrix = rows.map((row) => headers.map((header) => row[header] ?? ""));

  applyCoreStyle(sheet, lastColumn, Math.max(lastDataRow, 30));
  applyTitleStyle(sheet, lastColumn, title, subtitle, caution);
  sheet.getRange(`A4:${lastColumn}4`).values = [headers];
  sheet.getRange(`A5:${lastColumn}${lastDataRow}`).values = matrix;
  sheet.tables.add(`A4:${lastColumn}${lastDataRow}`, true, tableName);

  sheet.getRange(`A4:${lastColumn}4`).format = {
    fill: COLORS.red,
    font: { typeface: "Carlito", fontSize: 10, bold: true, color: COLORS.white },
    wrapText: true,
    horizontalAlignment: "center",
    verticalAlignment: "center",
    borders: { preset: "all", style: "thin", color: COLORS.gold },
  };
  sheet.getRange(`A4:${lastColumn}4`).format.rowHeightPx = 42;
  sheet.getRange(`A5:${lastColumn}${lastDataRow}`).format = {
    font: { typeface: "Carlito", fontSize: 9, color: COLORS.ink },
    wrapText: true,
    verticalAlignment: "top",
    borders: { preset: "all", style: "hair", color: COLORS.line },
  };
  sheet.getRange(`A5:${lastColumn}${lastDataRow}`).format.rowHeightPx = rowHeight;

  widths.forEach((width, index) => {
    const column = columnName(index + 1);
    sheet.getRange(`${column}1:${column}${lastDataRow}`).format.columnWidthPx = width;
  });
  sheet.freezePanes.freezeRows(4);
  sheet.freezePanes.freezeColumns(Math.min(3, headers.length));
  return { sheet, firstDataRow, lastDataRow, lastColumn };
}

const mappingHeaders = [
  "Mapping ID", "Mapping Type", "Content ID", "Page", "Lifecycle", "Locale Coverage", "Route / Target", "Order",
  "Section / Component", "Section Family", "Variant", "Headline / Identifier", "Implemented Component / Location",
  "Implementation Status", "Asset ID", "Reference ID", "Structure Note", "Wireframe Required", "Wireframe ID",
  "Decision Category", "Copy Approval Status", "Publication Status", "Primary CTA", "Destination", "UI/UX Review",
  "Approval Status", "Source Evidence", "Structure QA", "Mapping Status", "Reviewer", "Review Date",
];
const mappingRows = data.mappingRows.map((row) => ({ ...row, "Structure QA": "", "Mapping Status": "", Reviewer: "", "Review Date": "" }));
const mapping = writeTableSheet({
  name: "09_Page_Section_Mapping",
  title: "PAGE–SECTION MAPPING / IMPLEMENTATION CONTROL",
  subtitle: `Galdino & Partner — 44 aligned content blocks plus 2 website-only prototype sections. Audit coverage: ${data.auditCoverage.textFiles} text files (${data.auditCoverage.textLines} lines) and ${data.auditCoverage.assetFiles} assets. Verified 14 Agustus 2026.`,
  caution: "DRAFT MAPPING is not final approval. No row may be marked MAPPED until copy is approved, the wireframe/implemented section is reviewed by UI/UX, blockers are resolved, and reviewer/date fields are completed.",
  headers: mappingHeaders,
  rows: mappingRows,
  tableName: "tblPageSectionMapping",
  widths: [88, 105, 92, 145, 155, 82, 145, 50, 155, 125, 175, 235, 245, 205, 140, 105, 290, 175, 200, 210, 205, 205, 135, 125, 105, 105, 250, 145, 225, 120, 95],
  rowHeight: 78,
});
mapping.sheet.getRange(`AB5`).formulas = [[`=IF(COUNTIF($A$5:$A$${mapping.lastDataRow},A5)<>1,"FAIL – DUPLICATE MAPPING ID",IF(COUNTIF($C$5:$C$${mapping.lastDataRow},C5)<>1,"FAIL – DUPLICATE CONTENT ID",IF(COUNTA(A5:AA5)<27,"INCOMPLETE","PASS – STRUCTURE")))`]];
mapping.sheet.getRange(`AB5:AB${mapping.lastDataRow}`).fillDown();
mapping.sheet.getRange(`AC5`).formulas = [[`=IF(B5="WEBSITE-ONLY","OPEN – DOCUMENT DECISION REQUIRED",IF(LEFT(U5,5)<>"READY","BLOCKED – COPY/DEPENDENCY",IF(OR(LEFT(N5,7)="PARTIAL",LEFT(N5,15)="NOT IMPLEMENTED"),"DRAFT MAPPING – GAP OPEN","DRAFT MAPPING – READY FOR UI/UX REVIEW")))`]];
mapping.sheet.getRange(`AC5:AC${mapping.lastDataRow}`).fillDown();
mapping.sheet.getRange(`Y5:Y${mapping.lastDataRow}`).dataValidation = { rule: { type: "list", values: ["NOT REVIEWED", "IN REVIEW", "CHANGES REQUIRED", "APPROVED"] } };
mapping.sheet.getRange(`Z5:Z${mapping.lastDataRow}`).dataValidation = { rule: { type: "list", values: ["NOT APPROVED", "PENDING APPROVAL", "APPROVED", "REMOVED FROM LAUNCH"] } };
mapping.sheet.getRange(`N5:N${mapping.lastDataRow}`).conditionalFormats.add("containsText", { text: "NOT IMPLEMENTED", format: { fill: COLORS.redSoft, font: { color: COLORS.redText, bold: true } } });
mapping.sheet.getRange(`N5:N${mapping.lastDataRow}`).conditionalFormats.add("containsText", { text: "PROTOTYPE", format: { fill: COLORS.amber, font: { color: COLORS.amberText } } });
mapping.sheet.getRange(`U5:U${mapping.lastDataRow}`).conditionalFormats.add("containsText", { text: "READY FOR CONTENT APPROVAL", format: { fill: COLORS.blueSoft, font: { color: COLORS.blueText } } });
mapping.sheet.getRange(`U5:U${mapping.lastDataRow}`).conditionalFormats.add("containsText", { text: "BLOCKED", format: { fill: COLORS.redSoft, font: { color: COLORS.redText, bold: true } } });
mapping.sheet.getRange(`AB5:AB${mapping.lastDataRow}`).conditionalFormats.add("containsText", { text: "PASS", format: { fill: COLORS.greenSoft, font: { color: COLORS.greenText, bold: true } } });
mapping.sheet.getRange(`AC5:AC${mapping.lastDataRow}`).conditionalFormats.add("containsText", { text: "BLOCKED", format: { fill: COLORS.redSoft, font: { color: COLORS.redText, bold: true } } });
mapping.sheet.getRange(`AC5:AC${mapping.lastDataRow}`).conditionalFormats.add("containsText", { text: "DRAFT MAPPING", format: { fill: COLORS.amber, font: { color: COLORS.amberText, bold: true } } });
mapping.sheet.getRange(`A5:H${mapping.lastDataRow}`).format.horizontalAlignment = "center";
mapping.sheet.getRange(`Y5:Z${mapping.lastDataRow}`).format.horizontalAlignment = "center";
mapping.sheet.getRange(`AB5:AC${mapping.lastDataRow}`).format.horizontalAlignment = "center";

const assetHeaders = [
  "Asset ID", "File Path", "Format", "Dimensions", "Size KB", "Used By", "Page / Section", "Current Role",
  "Classification", "Rights / Consent", "Launch Decision", "Alt Text / Copy Source", "Replacement Required",
  "Source Evidence", "Approval Status", "Register QA",
];
const assetRows = data.assetRows.map((row) => ({ ...row, "Register QA": "" }));
const assets = writeTableSheet({
  name: "10_Asset_Register",
  title: "ASSET REGISTER / LAUNCH GOVERNANCE",
  subtitle: "Complete inventory of 18 raster/vector assets found in the current codebase, including dimensions, usage, placeholder status, evidence/consent and launch decision.",
  caution: "Dummy, generated, concept, preview and undocumented-rights assets are not company facts. They must not be used as final claims, metadata evidence, or structured-data proof before verification and approval.",
  headers: assetHeaders,
  rows: assetRows,
  tableName: "tblAssetRegister",
  widths: [85, 250, 70, 105, 80, 220, 120, 180, 205, 210, 260, 220, 145, 235, 115, 100],
  rowHeight: 72,
});
assets.sheet.getRange("E5:E22").format.numberFormat = "0.0";
assets.sheet.getRange("P5").formulas = [["=IF(COUNTA(A5:O5)<15,\"INCOMPLETE\",\"PASS\")"]];
assets.sheet.getRange(`P5:P${assets.lastDataRow}`).fillDown();
assets.sheet.getRange(`I5:I${assets.lastDataRow}`).conditionalFormats.add("containsText", { text: "DATA DUMMY", format: { fill: COLORS.redSoft, font: { color: COLORS.redText, bold: true } } });
assets.sheet.getRange(`I5:I${assets.lastDataRow}`).conditionalFormats.add("containsText", { text: "PLACEHOLDER", format: { fill: COLORS.amber, font: { color: COLORS.amberText } } });
assets.sheet.getRange(`I5:I${assets.lastDataRow}`).conditionalFormats.add("containsText", { text: "DIPERTAHANKAN", format: { fill: COLORS.greenSoft, font: { color: COLORS.greenText } } });
assets.sheet.getRange(`O5:O${assets.lastDataRow}`).conditionalFormats.add("containsText", { text: "BLOCKED", format: { fill: COLORS.redSoft, font: { color: COLORS.redText, bold: true } } });
assets.sheet.getRange(`P5:P${assets.lastDataRow}`).conditionalFormats.add("containsText", { text: "PASS", format: { fill: COLORS.greenSoft, font: { color: COLORS.greenText, bold: true } } });
assets.sheet.getRange(`A5:E${assets.lastDataRow}`).format.horizontalAlignment = "center";
assets.sheet.getRange(`M5:P${assets.lastDataRow}`).format.horizontalAlignment = "center";

const referenceHeaders = [
  "Reference ID", "Reference Type", "Source / Path", "Relevant Section", "Used By", "Purpose", "Reuse Scope",
  "Priority", "Status", "Known Limitation", "Last Verified", "Owner / Reviewer", "Register QA",
];
const referenceRows = data.referenceRows.map((row) => ({ ...row, "Register QA": "" }));
const references = writeTableSheet({
  name: "11_Reference_Register",
  title: "REFERENCE REGISTER / SOURCE TRACEABILITY",
  subtitle: "Traceable implementation, documentation, workbook, audit and project-decision sources used for each mapping and launch-control decision.",
  caution: "Priority follows the agreed hierarchy: actual implementation first unless clearly placeholder/dummy; then latest aligned Fase 2 content; confirmed governance/legal limits; supporting references last.",
  headers: referenceHeaders,
  rows: referenceRows,
  tableName: "tblReferenceRegister",
  widths: [105, 125, 285, 240, 210, 245, 125, 90, 185, 260, 100, 180, 100],
  rowHeight: 72,
});
references.sheet.getRange("M5").formulas = [["=IF(COUNTA(A5:L5)<12,\"INCOMPLETE\",\"PASS\")"]];
references.sheet.getRange(`M5:M${references.lastDataRow}`).fillDown();
references.sheet.getRange(`H5:H${references.lastDataRow}`).conditionalFormats.add("containsText", { text: "PRIMARY", format: { fill: COLORS.blueSoft, font: { color: COLORS.blueText, bold: true } } });
references.sheet.getRange(`I5:I${references.lastDataRow}`).conditionalFormats.add("containsText", { text: "PROTOTYPE", format: { fill: COLORS.amber, font: { color: COLORS.amberText } } });
references.sheet.getRange(`M5:M${references.lastDataRow}`).conditionalFormats.add("containsText", { text: "PASS", format: { fill: COLORS.greenSoft, font: { color: COLORS.greenText, bold: true } } });
references.sheet.getRange(`A5:B${references.lastDataRow}`).format.horizontalAlignment = "center";
references.sheet.getRange(`G5:I${references.lastDataRow}`).format.horizontalAlignment = "center";
references.sheet.getRange(`K5:M${references.lastDataRow}`).format.horizontalAlignment = "center";

const qaHeaders = [
  "QA ID", "Page", "Lifecycle", "Route ID", "Route EN", "Route Status", "Content Blocks", "Website-only Blocks",
  "Copy Ready", "Copy Blocked", "Structure QA", "Implementation Match", "Asset / Reference QA", "Wireframe State",
  "UI/UX Review", "Approval Status", "Open Blocker", "Recommended Action", "Final Result", "Reviewer", "Review Date",
];
const qaRows = data.qaRows.map((row) => ({
  ...row,
  "Content Blocks": "", "Website-only Blocks": "", "Copy Ready": "", "Copy Blocked": "", "Structure QA": "",
  "Asset / Reference QA": "", "Final Result": "", Reviewer: "", "Review Date": "",
}));
const qa = writeTableSheet({
  name: "12_Mapping_QA",
  title: "MAPPING QA / CHECKABILITY CONTROL",
  subtitle: "Page-level QA that distinguishes completed internal mapping work from human review, copy approval, legal approval, evidence, consent, production configuration and launch readiness.",
  caution: "The workbook does not self-approve. FINAL RESULT becomes CHECKABLE only after UI/UX Review and Approval Status are both APPROVED and the structural/asset/reference checks pass.",
  headers: qaHeaders,
  rows: qaRows,
  tableName: "tblMappingQA",
  widths: [82, 130, 175, 145, 145, 160, 90, 105, 85, 90, 110, 255, 135, 170, 110, 115, 220, 310, 240, 110, 100],
  rowHeight: 76,
});
const mapEnd = mapping.lastDataRow;
qa.sheet.getRange("G5").formulas = [[`=COUNTIFS('09_Page_Section_Mapping'!$B$5:$B$${mapEnd},"CONTENT BLOCK",'09_Page_Section_Mapping'!$D$5:$D$${mapEnd},B5)`]];
qa.sheet.getRange(`G5:G${qa.lastDataRow}`).fillDown();
qa.sheet.getRange("H5").formulas = [[`=COUNTIFS('09_Page_Section_Mapping'!$B$5:$B$${mapEnd},"WEBSITE-ONLY",'09_Page_Section_Mapping'!$D$5:$D$${mapEnd},B5)`]];
qa.sheet.getRange(`H5:H${qa.lastDataRow}`).fillDown();
qa.sheet.getRange("I5").formulas = [[`=COUNTIFS('09_Page_Section_Mapping'!$B$5:$B$${mapEnd},"CONTENT BLOCK",'09_Page_Section_Mapping'!$D$5:$D$${mapEnd},B5,'09_Page_Section_Mapping'!$U$5:$U$${mapEnd},"READY FOR CONTENT APPROVAL")`]];
qa.sheet.getRange(`I5:I${qa.lastDataRow}`).fillDown();
qa.sheet.getRange("J5").formulas = [["=G5-I5"]];
qa.sheet.getRange(`J5:J${qa.lastDataRow}`).fillDown();
qa.sheet.getRange("K5").formulas = [[`=IF(B5="GLOBAL","N/A",IF(COUNTIFS('09_Page_Section_Mapping'!$D$5:$D$${mapEnd},B5,'09_Page_Section_Mapping'!$AB$5:$AB$${mapEnd},"<>PASS – STRUCTURE")=0,"PASS","FAIL"))`]];
qa.sheet.getRange(`K5:K${qa.lastDataRow}`).fillDown();
qa.sheet.getRange("M5").formulas = [[`=IF(B5="GLOBAL","SEE REGISTERS",IF(COUNTIFS('09_Page_Section_Mapping'!$D$5:$D$${mapEnd},B5,'09_Page_Section_Mapping'!$O$5:$O$${mapEnd},"")+COUNTIFS('09_Page_Section_Mapping'!$D$5:$D$${mapEnd},B5,'09_Page_Section_Mapping'!$P$5:$P$${mapEnd},"")=0,"PASS","FAIL"))`]];
qa.sheet.getRange(`M5:M${qa.lastDataRow}`).fillDown();
qa.sheet.getRange("S5").formulas = [["=IF(OR(O5<>\"APPROVED\",P5<>\"APPROVED\"),\"NOT CHECKABLE – REVIEW/APPROVAL PENDING\",IF(OR(K5=\"FAIL\",M5=\"FAIL\"),\"NOT CHECKABLE – MAPPING GAP\",\"CHECKABLE\"))"]];
qa.sheet.getRange(`S5:S${qa.lastDataRow}`).fillDown();
qa.sheet.getRange(`O5:O${qa.lastDataRow}`).dataValidation = { rule: { type: "list", values: ["NOT REVIEWED", "IN REVIEW", "CHANGES REQUIRED", "APPROVED"] } };
qa.sheet.getRange(`P5:P${qa.lastDataRow}`).dataValidation = { rule: { type: "list", values: ["NOT APPROVED", "PENDING APPROVAL", "APPROVED", "REMOVED FROM LAUNCH"] } };
qa.sheet.getRange(`K5:K${qa.lastDataRow}`).conditionalFormats.add("containsText", { text: "PASS", format: { fill: COLORS.greenSoft, font: { color: COLORS.greenText, bold: true } } });
qa.sheet.getRange(`L5:L${qa.lastDataRow}`).conditionalFormats.add("containsText", { text: "NOT IMPLEMENTED", format: { fill: COLORS.redSoft, font: { color: COLORS.redText, bold: true } } });
qa.sheet.getRange(`L5:L${qa.lastDataRow}`).conditionalFormats.add("containsText", { text: "PARTIAL", format: { fill: COLORS.amber, font: { color: COLORS.amberText } } });
qa.sheet.getRange(`S5:S${qa.lastDataRow}`).conditionalFormats.add("containsText", { text: "NOT CHECKABLE", format: { fill: COLORS.redSoft, font: { color: COLORS.redText, bold: true } } });
qa.sheet.getRange(`A5:K${qa.lastDataRow}`).format.horizontalAlignment = "center";
qa.sheet.getRange(`M5:P${qa.lastDataRow}`).format.horizontalAlignment = "center";
qa.sheet.getRange(`S5:U${qa.lastDataRow}`).format.horizontalAlignment = "center";

qa.sheet.mergeCells("A20:F20");
qa.sheet.getRange("A20").values = [["MAPPING SUMMARY"]];
qa.sheet.getRange("A20:F20").format = { fill: COLORS.red, font: { typeface: "Carlito", fontSize: 10, bold: true, color: COLORS.white }, horizontalAlignment: "center" };
qa.sheet.getRange("A21:A26").values = [["Total mapping rows"], ["Aligned content blocks"], ["Website-only prototype sections"], ["Copy-ready blocks"], ["Final MAPPED rows"], ["UI/UX approved page rows"]];
qa.sheet.getRange("B21").formulas = [[`=COUNTA('09_Page_Section_Mapping'!$A$5:$A$${mapEnd})`]];
qa.sheet.getRange("B22").formulas = [[`=COUNTIF('09_Page_Section_Mapping'!$B$5:$B$${mapEnd},"CONTENT BLOCK")`]];
qa.sheet.getRange("B23").formulas = [[`=COUNTIF('09_Page_Section_Mapping'!$B$5:$B$${mapEnd},"WEBSITE-ONLY")`]];
qa.sheet.getRange("B24").formulas = [[`=COUNTIF('09_Page_Section_Mapping'!$U$5:$U$${mapEnd},"READY FOR CONTENT APPROVAL")`]];
qa.sheet.getRange("B25").formulas = [[`=COUNTIF('09_Page_Section_Mapping'!$AC$5:$AC$${mapEnd},"MAPPED")`]];
qa.sheet.getRange("B26").formulas = [[`=COUNTIF($O$5:$O$${qa.lastDataRow},"APPROVED")`]];
qa.sheet.getRange("A21:B26").format = { fill: COLORS.slateSoft, font: { typeface: "Carlito", fontSize: 10, color: COLORS.ink }, wrapText: true, borders: { preset: "all", style: "thin", color: COLORS.line } };
qa.sheet.getRange("B21:B26").format = { fill: COLORS.paper, font: { typeface: "Carlito", fontSize: 14, bold: true, color: COLORS.brightRed }, horizontalAlignment: "center", borders: { preset: "all", style: "thin", color: COLORS.line } };
qa.sheet.mergeCells("J20:U20");
qa.sheet.getRange("J20").values = [["STATUS DEFINITIONS"]];
qa.sheet.getRange("J20:U20").format = { fill: COLORS.black, font: { typeface: "Carlito", fontSize: 10, bold: true, color: COLORS.white }, horizontalAlignment: "center" };
const legends = [
  ["DRAFT MAPPING – READY FOR UI/UX REVIEW", "Structure is mapped, but reviewer sign-off has not occurred."],
  ["DRAFT MAPPING – GAP OPEN", "A section/route/structure mismatch remains open."],
  ["BLOCKED – COPY/DEPENDENCY", "Copy, evidence, consent, policy, or business dependency is unresolved."],
  ["OPEN – DOCUMENT DECISION REQUIRED", "The website contains a section that the 44-block content sheet does not."],
  ["MAPPED", "Reserved for future use only after copy approval, UI/UX approval, reviewer and date are complete."],
];
for (let index = 0; index < legends.length; index += 1) {
  const row = 21 + index;
  qa.sheet.mergeCells(`J${row}:M${row}`);
  qa.sheet.mergeCells(`N${row}:U${row}`);
  qa.sheet.getRange(`J${row}`).values = [[legends[index][0]]];
  qa.sheet.getRange(`N${row}`).values = [[legends[index][1]]];
}
qa.sheet.getRange("J21:U25").format = { fill: COLORS.slateSoft, font: { typeface: "Carlito", fontSize: 9, color: COLORS.ink }, wrapText: true, verticalAlignment: "center", borders: { preset: "all", style: "thin", color: COLORS.line } };
qa.sheet.getRange("J21:M25").format.font = { typeface: "Carlito", fontSize: 9, bold: true, color: COLORS.red };

const dashboard = workbook.worksheets.getItem("00_Dashboard");
dashboard.getRange("A2").values = [["Galdino & Partner — final copy, page questions, GLOBAL system copy, proof control, positioning/tone QA, launch actions, and implementation mapping. Original content prepared 6 Agustus 2026; mapping extension verified 14 Agustus 2026."]];
const dashboardRows = [
  ["09_Page_Section_Mapping", "Page–section mapping", "Content IDs, implemented components, routes, variants, structure notes, wireframe decisions, review and approval status"],
  ["10_Asset_Register", "Asset governance", "18 codebase assets, dimensions, usage, dummy/placeholder classification, rights, launch decision and replacement status"],
  ["11_Reference_Register", "Source traceability", "Code, data, documentation, workbook, audit and confirmed project-decision references"],
  ["12_Mapping_QA", "Checkability control", "Page-level counts, structure QA, implementation gaps, blockers, UI/UX review, approval and final result"],
];
for (let index = 0; index < dashboardRows.length; index += 1) {
  const row = 55 + index;
  dashboard.mergeCells(`B${row}:F${row}`);
  dashboard.mergeCells(`G${row}:J${row}`);
  dashboard.getRange(`A${row}`).values = [[dashboardRows[index][0]]];
  dashboard.getRange(`B${row}`).values = [[dashboardRows[index][1]]];
  dashboard.getRange(`G${row}`).values = [[dashboardRows[index][2]]];
  dashboard.getRange(`A${row}:J${row}`).format = {
    fill: index % 2 === 0 ? COLORS.white : COLORS.slateSoft,
    font: { typeface: "Carlito", fontSize: 9, color: COLORS.ink },
    wrapText: true,
    verticalAlignment: "center",
    borders: { preset: "all", style: "hair", color: COLORS.line },
  };
  dashboard.getRange(`A${row}`).format.font = { typeface: "Carlito", fontSize: 9, bold: true, color: COLORS.red };
  dashboard.getRange(`A${row}:J${row}`).format.rowHeightPx = 42;
}

await fs.mkdir(outputDir, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(JSON.stringify({ outputPath, sheetNames: workbook.worksheets.items.map((sheet) => sheet.name) }, null, 2));
