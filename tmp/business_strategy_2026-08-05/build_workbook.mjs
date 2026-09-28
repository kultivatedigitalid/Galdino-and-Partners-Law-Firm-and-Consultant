import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const HERE = "C:/Users/Joshua/OneDrive/Documents/Law/tmp/business_strategy_2026-08-05";
const OUTPUT_DIR = "C:/Users/Joshua/OneDrive/Documents/Law/outputs/galdino_partner/business_strategy_2026-08-05";
const RENDER_DIR = `${HERE}/xlsx_renders`;
const OUTPUT_PATH = `${OUTPUT_DIR}/GP_Service_Portfolio_Scenario_Matrix_2026-08-05.xlsx`;
const data = JSON.parse(await fs.readFile(`${HERE}/strategy_data.json`, "utf8"));

await fs.mkdir(OUTPUT_DIR, { recursive: true });
await fs.mkdir(RENDER_DIR, { recursive: true });

const wb = Workbook.create();
const sheets = {};
for (const name of [
  "Executive Summary", "Scoring Guide", "Source Register", "Service Inventory",
  "Service Scoring", "Service Decisions", "Permit Type Map", "Scenario Matrix",
  "Scenario Details", "Website IA", "Content Strategy", "Conflicts", "Risks & Gaps", "Roadmap"
]) {
  sheets[name] = wb.worksheets.add(name);
}

const C = {
  red: "#8B1E2D", darkRed: "#5E1320", gold: "#B28A45", ink: "#202124",
  muted: "#5F6368", light: "#F2F4F7", paleRed: "#F8EDEF", paleGold: "#FBF6EA",
  paleGreen: "#EAF4EE", paleYellow: "#FFF4D6", paleBlue: "#E8EEF5",
  white: "#FFFFFF", grid: "#D8DCE3", input: "#FFF4D6", good: "#DDEFE4",
  bad: "#F5DDE1"
};

const colLetter = (n) => {
  let s = "";
  while (n > 0) { n--; s = String.fromCharCode(65 + (n % 26)) + s; n = Math.floor(n / 26); }
  return s;
};

function titleBlock(sheet, lastCol, title, subtitle, note) {
  sheet.mergeCells(`A1:${lastCol}1`);
  sheet.getRange(`A1:${lastCol}1`).values = [[title]];
  sheet.getRange(`A1:${lastCol}1`).format = {
    fill: C.darkRed, font: { bold: true, color: C.white, size: 18 },
    verticalAlignment: "center", wrapText: true
  };
  sheet.getRange(`A1:${lastCol}1`).format.rowHeight = 34;
  sheet.mergeCells(`A2:${lastCol}2`);
  sheet.getRange(`A2:${lastCol}2`).values = [[subtitle]];
  sheet.getRange(`A2:${lastCol}2`).format = {
    fill: C.paleRed, font: { color: C.darkRed, italic: true, size: 10 }, wrapText: true
  };
  sheet.getRange(`A2:${lastCol}2`).format.rowHeight = 28;
  sheet.mergeCells(`A3:${lastCol}3`);
  sheet.getRange(`A3:${lastCol}3`).values = [[note]];
  sheet.getRange(`A3:${lastCol}3`).format = {
    fill: C.paleGold, font: { color: C.ink, size: 9 }, wrapText: true
  };
  sheet.getRange(`A3:${lastCol}3`).format.rowHeight = 30;
}

function header(sheet, range) {
  sheet.getRange(range).format = {
    fill: C.red,
    font: { bold: true, color: C.white, size: 9 },
    wrapText: true,
    verticalAlignment: "center",
    horizontalAlignment: "center",
    borders: { top: { style: "continuous", color: C.grid }, bottom: { style: "continuous", color: C.grid }, left: { style: "continuous", color: C.grid }, right: { style: "continuous", color: C.grid } }
  };
  sheet.getRange(range).format.rowHeight = 34;
}

function body(sheet, range, fontSize = 9) {
  sheet.getRange(range).format = {
    font: { color: C.ink, size: fontSize }, wrapText: true, verticalAlignment: "top",
    borders: { top: { style: "continuous", color: C.grid }, bottom: { style: "continuous", color: C.grid }, left: { style: "continuous", color: C.grid }, right: { style: "continuous", color: C.grid } }
  };
}

function setWidths(sheet, widths, endRow = 200) {
  widths.forEach((width, idx) => { sheet.getRange(`${colLetter(idx + 1)}1:${colLetter(idx + 1)}${endRow}`).format.columnWidth = width; });
}

function freeze(sheet, cell = "A5") {
  try { sheet.freezePanes.freezeAt(cell); } catch { try { sheet.freezePanes.freezeRows(4); } catch {} }
}

function paintGrade(sheet, col, start, values) {
  values.forEach((grade, idx) => {
    const fill = grade === "A" ? C.good : grade === "B" ? C.paleYellow : C.bad;
    sheet.getRange(`${col}${start + idx}`).format.fill = fill;
    sheet.getRange(`${col}${start + idx}`).format.font = { bold: true, color: C.ink, size: 9 };
  });
}

// 1. Executive Summary
{
  const s = sheets["Executive Summary"];
  titleBlock(s, "H", "Galdino & Partner — Business & Service Portfolio Decision Workbook",
    "39 service families • 18 scenarios • qualitative scoring only • project-file evidence",
    "Yellow cells are adjustable analytical inputs. No project file contains validated prices, margin, demand volume, case hours, or numeric client capacity.");
  s.getRange("A5:H5").values = [["Decision", "Selected model", "Launch offers", "Owner design", "Launch team", "Website", "Primary risk", "Gate"]];
  header(s, "A5:H5");
  s.getRange("A6:H6").values = [[
    "RECOMMENDED", "K13 High-Ticket Boutique + K16 partner delivery layer",
    "Readiness/Roadmap; Regulatory Care; selective Project PM", "2 hours/day steady state",
    "4-5 people + validated reviewers/partners", "11-13 realistic launch pages",
    "Unverified capability and portfolio sprawl", "Paid pilot + time study before expansion"
  ]];
  body(s, "A6:H6", 10);
  s.getRange("A6:H6").format.fill = C.paleGreen;
  s.getRange("A8:D8").values = [["KPI / control", "Formula / value", "Interpretation", "Source"]];
  header(s, "A8:D8");
  s.getRange("A9:D15").values = [
    ["Grade A service families", null, "Internal grade, not legal class", "Service Decisions"],
    ["Grade B service families", null, "Selective growth", "Service Decisions"],
    ["Grade C service families", null, "Conditional / low priority", "Service Decisions"],
    ["Lean Launch families", null, "Public launch candidates", "Service Decisions"],
    ["Scenarios compared", null, "Minimum brief exceeded", "Scenario Matrix"],
    ["Top analytical scenario score", null, "Score alone is not launch approval", "Scenario Matrix"],
    ["Numeric client cap", "NOT AVAILABLE", "Use stage-gated WIP and measured owner hours", "Project files"],
  ];
  s.getRange("B9:B14").formulas = [
    ["=COUNTIF('Service Decisions'!$C$5:$C$43,\"A\")"],
    ["=COUNTIF('Service Decisions'!$C$5:$C$43,\"B\")"],
    ["=COUNTIF('Service Decisions'!$C$5:$C$43,\"C\")"],
    ["=COUNTIF('Service Decisions'!$D$5:$D$43,\"Lean Launch\")"],
    ["=COUNTA('Scenario Matrix'!$A$5:$A$22)"],
    ["=MAX('Scenario Matrix'!$W$5:$W$22)"],
  ];
  body(s, "A9:D15", 9);
  s.getRange("B9:B15").format.fill = C.paleBlue;
  s.getRange("A17:H17").values = [["Choice", "Safest", "Most potentially profitable", "Leanest", "Easiest", "SEO/portfolio", "Best balance", "Important caveat"]];
  header(s, "A17:H17");
  s.getRange("A18:H18").values = [["Scenario", "K01", "K14", "K15", "K03/K12", "K14 + K15", "K13", "Profitability is not quantified"]];
  body(s, "A18:H18", 9);
  setWidths(s, [18, 24, 28, 24, 24, 28, 24, 32], 30);
  freeze(s, "A5");
}

// 2. Scoring Guide
{
  const s = sheets["Scoring Guide"];
  titleBlock(s, "Q", "Scoring Guide & Assumptions",
    "Service scores: positive 5 = attractive; negative 5 = heavy burden/risk. Scenario scores: 5 = favorable.",
    "Service composite is normalized to 1-5. Grade A/B/C also uses hard capability/launch gates and may not equal a pure threshold.");
  s.getRange("A5:E5").values = [["Key", "Service criterion", "Direction", "Weight", "Definition"]];
  header(s, "A5:E5");
  const rows = data.criteria.map(c => [c.key, c.label, c.direction, c.weight, c.direction === "positive" ? "1 low — 5 high/attractive" : "1 low burden — 5 high burden; reversed in composite"]);
  s.getRange(`A6:E${5 + rows.length}`).values = rows;
  body(s, `A6:E${5 + rows.length}`, 8.5);
  s.getRange(`D6:D${5 + rows.length}`).format.numberFormat = "0.0%";
  s.getRange(`D6:D${5 + rows.length}`).format.fill = C.input;
  s.getRange("A37:E37").values = [["Grade", "Internal meaning", "Typical decision", "Hard gate", "Not legal class"]];
  header(s, "A37:E37");
  s.getRange("A38:E40").values = [
    ["A", "Core High-Ticket", "Lean Launch", "Scope/SOP/reviewer/proof", "Yes"],
    ["B", "Selective Growth", "Pilot/controlled/partner", "One vertical + governance", "Yes"],
    ["C", "Conditional/Low Priority", "Partner/defer/eliminate", "Capability and economics", "Yes"],
  ];
  body(s, "A38:E40", 9);
  paintGrade(s, "A", 38, ["A","B","C"]);
  s.getRange("A42:Q42").values = [["Scenario weight", ...data.scenario_weights.map(w => w.label)]];
  header(s, "A42:Q42");
  s.getRange("A43:Q43").values = [["Weight", ...data.scenario_weights.map(w => w.weight)]];
  body(s, "A43:Q43", 8);
  s.getRange("B43:Q43").format.numberFormat = "0.0%";
  s.getRange("B43:Q43").format.fill = C.input;
  setWidths(s, [25, 31, 13, 12, 40, 3,3,3,3,3,3,3,3,3,3,3,3], 50);
  freeze(s, "A6");
}

// 3. Source Register
{
  const s = sheets["Source Register"];
  titleBlock(s, "E", "Project Source Register", "Only project files are used as fact sources.", "Source IDs are referenced across this workbook and the companion report.");
  s.getRange("A5:E5").values = [["ID", "Tier", "Project-relative file", "Locator", "Use"]];
  header(s, "A5:E5");
  const rows = data.sources.map(x => [x.id, x.tier, x.path, x.locator, x.use]);
  s.getRange(`A6:E${5 + rows.length}`).values = rows;
  body(s, `A6:E${5 + rows.length}`, 8);
  setWidths(s, [10, 20, 55, 38, 55], 40);
  freeze(s, "A6");
}

// 4. Service Inventory
{
  const s = sheets["Service Inventory"];
  titleBlock(s, "N", "Service Inventory", "All service families and examples found in project files.", "Appearance in this inventory does not mean approval to sell or publish.");
  const headers = ["ID","Permit type","Service family","Examples","Target","Client problem","Readiness","Grade","Decision","Rationale","Advantages","Disadvantages","Risks","Source"];
  s.getRange("A5:N5").values = [headers]; header(s, "A5:N5");
  const rows = data.services.map(x => [x.id,x.permit_type,x.name,x.examples,x.target,x.problem,x.readiness,x.grade,x.decision,x.rationale,x.advantages,x.disadvantages,x.risks,x.source]);
  s.getRange(`A6:N${5 + rows.length}`).values = rows;
  body(s, `A6:N${5 + rows.length}`, 7.5);
  paintGrade(s, "H", 6, data.services.map(x => x.grade));
  setWidths(s, [8,24,34,48,38,42,28,9,18,44,38,38,38,28], 50);
  freeze(s, "A6");
}

// 5. Service Scoring
{
  const s = sheets["Service Scoring"];
  const critStart = 4; // D
  const critEnd = critStart + data.criteria.length - 1;
  const scoreCol = colLetter(critEnd + 1);
  titleBlock(s, scoreCol, "Service Scoring — 30 Criteria", "Adjust yellow input scores only after evidence is available.", "All current ratings are analytical assumptions. The score formula reverses negative burden/risk criteria and normalizes by total weight.");
  const headers = ["ID","Service","Manual grade", ...data.criteria.map(c => c.label), "Composite 1-5"];
  s.getRange(`A5:${scoreCol}5`).values = [headers]; header(s, `A5:${scoreCol}5`);
  const rawRows = data.services.map(x => [x.id, x.name, x.grade, ...data.criteria.map(c => x.ratings[c.key]), null]);
  s.getRange(`A6:${scoreCol}${5 + rawRows.length}`).values = rawRows;
  body(s, `A6:${scoreCol}${5 + rawRows.length}`, 7.2);
  const inputStart = colLetter(critStart);
  const inputEnd = colLetter(critEnd);
  s.getRange(`${inputStart}6:${inputEnd}${5 + rawRows.length}`).format.fill = C.input;
  s.getRange(`${inputStart}6:${inputEnd}${5 + rawRows.length}`).format.horizontalAlignment = "center";
  const terms = data.criteria.map((c, idx) => {
    const cell = `${colLetter(critStart + idx)}ROW`;
    const val = c.direction === "positive" ? cell : `(6-${cell})`;
    return `${val}*'Scoring Guide'!$D$${6 + idx}`;
  });
  const formulas = data.services.map((_x, idx) => {
    const row = 6 + idx;
    return [`=ROUND((${terms.join("+").replaceAll("ROW", String(row))})/SUM('Scoring Guide'!$D$6:$D$35),2)`];
  });
  s.getRange(`${scoreCol}6:${scoreCol}${5 + rawRows.length}`).formulas = formulas;
  s.getRange(`${scoreCol}6:${scoreCol}${5 + rawRows.length}`).format.numberFormat = "0.00";
  s.getRange(`${scoreCol}6:${scoreCol}${5 + rawRows.length}`).format.fill = C.paleBlue;
  paintGrade(s, "C", 6, data.services.map(x => x.grade));
  const widths = [8,32,11, ...data.criteria.map(() => 12), 14];
  setWidths(s, widths, 50);
  freeze(s, "D6");
}

// 6. Service Decisions
{
  const s = sheets["Service Decisions"];
  titleBlock(s, "K", "Service Portfolio Decisions", "Grades, decisions, gates, and evidence status.", "Dieliminasi usually means removed as a standalone public offer, not forbidden referral/bundle work.");
  const headers = ["ID","Service","Grade","Decision","Composite","Why","Conditions","Readiness","Primary risk","Source","Public role"];
  s.getRange("A5:K5").values = [headers]; header(s, "A5:K5");
  const publicRole = (x) => x.decision === "Lean Launch" ? "Core offer/module" : x.decision === "Controlled Growth" ? "Supporting/gated" : x.decision === "Partner-Based" ? "Mention only after partner gate" : x.decision === "Experimental" ? "Do not publish yet" : x.decision === "Ditunda" ? "Hidden" : "Remove standalone";
  const rows = data.services.map(x => [x.id,x.name,x.grade,x.decision,x.composite,x.rationale,x.conditions,x.readiness,x.risks,x.source,publicRole(x)]);
  s.getRange(`A6:K${5 + rows.length}`).values = rows;
  body(s, `A6:K${5 + rows.length}`, 7.8);
  s.getRange(`E6:E${5 + rows.length}`).format.numberFormat = "0.00";
  paintGrade(s, "C", 6, data.services.map(x => x.grade));
  setWidths(s, [8,34,9,20,12,44,48,30,38,28,24], 50);
  freeze(s, "A6");
}

// 7. Permit Type Map
{
  const s = sheets["Permit Type Map"];
  titleBlock(s, "M", "Permit Type Map", "Target, problem, value, complexity, expertise, content, and time-fit by type.", "Average grade is based on internal business-operational grades; service-level gates still control launchability.");
  const headers = ["Type","Service IDs","Target client","Main problem","Business value","Complexity","Expert dependency","Core potential","Content potential","Operational burden","Average grade","2-hour fit","4-hour fit"];
  s.getRange("A5:M5").values = [headers]; header(s, "A5:M5");
  const rows = data.type_map.map(x => [x.type,x.ids.join(", "),x.client,x.problem,x.value,x.complexity,x.expert,x.core,x.content,x.burden,x.average_grade,x.fit_2h,x.fit_4h]);
  s.getRange(`A6:M${5 + rows.length}`).values = rows;
  body(s, `A6:M${5 + rows.length}`, 7.8);
  paintGrade(s, "K", 6, data.type_map.map(x => x.average_grade));
  setWidths(s, [30,22,34,42,24,24,32,24,24,26,12,28,28], 30);
  freeze(s, "A6");
}

// 8. Scenario Matrix
{
  const s = sheets["Scenario Matrix"];
  const ratingStart = 7; // G
  const ratingEnd = ratingStart + data.scenario_weights.length - 1; // V
  const scoreCol = colLetter(ratingEnd + 1); // W
  titleBlock(s, scoreCol, "Scenario Comparison Matrix — 18 Alternatives", "Scores 1-5; 5 is favorable. Yellow cells are adjustable assumptions.", "The formula weights are in Scoring Guide row 43. Score is a comparison aid, not a substitute for evidence gates.");
  const headers = ["ID","Scenario","Family","Decision","Owner time","Team",...data.scenario_weights.map(w => w.label),"Final score"];
  s.getRange(`A5:${scoreCol}5`).values = [headers]; header(s, `A5:${scoreCol}5`);
  const rows = data.scenarios.map(x => [x.id,x.name,x.family,x.recommendation,x.time,x.team,...data.scenario_weights.map(w => x.ratings[w.key]),null]);
  s.getRange(`A6:${scoreCol}${5 + rows.length}`).values = rows;
  body(s, `A6:${scoreCol}${5 + rows.length}`, 7.5);
  const inputStart = colLetter(ratingStart), inputEnd = colLetter(ratingEnd);
  s.getRange(`${inputStart}6:${inputEnd}${5 + rows.length}`).format.fill = C.input;
  s.getRange(`${inputStart}6:${inputEnd}${5 + rows.length}`).format.horizontalAlignment = "center";
  const formulas = data.scenarios.map((_x, idx) => [`=ROUND(SUMPRODUCT(${inputStart}${6+idx}:${inputEnd}${6+idx},'Scoring Guide'!$B$43:$Q$43),2)`]);
  s.getRange(`${scoreCol}6:${scoreCol}${5 + rows.length}`).formulas = formulas;
  s.getRange(`${scoreCol}6:${scoreCol}${5 + rows.length}`).format.numberFormat = "0.00";
  s.getRange(`${scoreCol}6:${scoreCol}${5 + rows.length}`).format.fill = C.paleBlue;
  setWidths(s, [8,38,18,24,24,20,...data.scenario_weights.map(() => 13),14], 30);
  freeze(s, "G6");
}

// 9. Scenario Details
{
  const s = sheets["Scenario Details"];
  titleBlock(s, "AD", "Scenario Operating Details", "All fields requested in the owner brief, one row per scenario.", "Capacity values are qualitative because no case-time or utilization data exists in project files.");
  const headers = ["ID","Scenario","Family","Recommendation","Description","Permit types","Services","Grades","Target","Owner involvement","Team","Roles","Partners","Automation","Complexity","Risk","Communication","Regulation","Website","SEO","YouTube","Social","Repeat","Cross-sell","Advantages","Disadvantages","Success condition","Failure condition","Capacity","Analytical score"];
  s.getRange("A5:AD5").values = [headers]; header(s, "A5:AD5");
  const rows = data.scenarios.map(x => [x.id,x.name,x.family,x.recommendation,x.description,x.permit_types,x.services,x.grades,x.target,`${x.time}; ${x.owner}`,x.team,x.roles,x.partners,x.automation,x.complexity,x.risk,x.communication,x.regulation,x.web,x.seo,x.youtube,x.social,x.repeat,x.cross,x.advantages,x.disadvantages,x.success,x.fail,x.capacity,x.final_score]);
  s.getRange(`A6:AD${5 + rows.length}`).values = rows;
  body(s, `A6:AD${5 + rows.length}`, 7.2);
  s.getRange(`AD6:AD${5 + rows.length}`).format.numberFormat = "0.00";
  setWidths(s, [8,34,18,24,40,32,30,12,34,38,20,42,24,32,16,34,18,18,24,18,18,18,14,16,38,38,40,40,38,14], 30);
  freeze(s, "A6");
}

// 10. Website IA
{
  const s = sheets["Website IA"];
  titleBlock(s, "F", "Website Architecture After Business Decision", "Business model → scenario → priority services → target → operating process → content → pages.", "Current code is not changed. This is the recommended future IA after approval.");
  s.getRange("A5:F5").values = [["URL","Page","Decision","Purpose / content","CTA","Relationship"]]; header(s, "A5:F5");
  s.getRange(`A6:F${5 + data.website_ia.length}`).values = data.website_ia;
  body(s, `A6:F${5 + data.website_ia.length}`, 8.5);
  s.getRange("A21:F21").values = [["Navigation","Home","Services","Profile","Insights","Contact / Assessment"]]; header(s, "A21:F21");
  s.getRange("A22:F22").values = [["Rule","4-5 header items","3 public offers","Real proof only","Reviewed clusters","Primary CTA"]]; body(s, "A22:F22", 9);
  setWidths(s, [28,28,22,65,28,34], 30);
  freeze(s, "A6");
}

// 11. Content Strategy
{
  const s = sheets["Content Strategy"];
  titleBlock(s, "H", "SEO, YouTube & Social Content Strategy", "Three validated clusters; one reviewed pillar reused across channels.", "The six current localized article files are preview-only and require competent review before launch.");
  s.getRange("A5:H5").values = [["Cluster","Theme","Intent","Priority topics","Existing article action","YouTube","Social","Maintenance"]]; header(s, "A5:H5");
  s.getRange(`A6:H${5 + data.content_strategy.length}`).values = data.content_strategy;
  body(s, `A6:H${5 + data.content_strategy.length}`, 8.5);
  s.getRange("A11:D11").values = [["Governance","Rule","Why","Source"]]; header(s, "A11:D11");
  s.getRange("A12:D16").values = [
    ["Review","Named competent reviewer + source/effective date","Avoid stale legal-regulatory advice","S02 T60,T89; S16"],
    ["Bilingual","Review both languages","Doubles maintenance and inconsistency risk","S03; S14"],
    ["Routing","One relevant commercial CTA per asset","Media must feed validated offers","S18"],
    ["Dummy","No prototype fact in metadata/schema","Production reputation and search risk","S07; S19-S20"],
    ["Cadence","Expand only after converted demand","Avoid content debt","Analytical recommendation"],
  ];
  body(s, "A12:D16", 8.5);
  setWidths(s, [18,34,28,55,36,32,32,34], 25);
  freeze(s, "A6");
}

// 12. Conflicts
{
  const s = sheets["Conflicts"];
  titleBlock(s, "E", "Cross-File Conflicts & Resolution", "Aligned decisions/current evidence take priority, except dummy, unsafe, legally unconfirmed, or unfinished implementation.", "Do not align strategy to errors, placeholder content, or prototype claims.");
  s.getRange("A5:E5").values = [["Topic","Conflict","Priority state","Source","Resolution"]]; header(s, "A5:E5");
  s.getRange(`A6:E${5 + data.conflicts.length}`).values = data.conflicts;
  body(s, `A6:E${5 + data.conflicts.length}`, 8);
  setWidths(s, [24,55,52,35,52], 25);
  freeze(s, "A6");
}

// 13. Risks & Gaps
{
  const s = sheets["Risks & Gaps"];
  titleBlock(s, "E", "Risks, Missing Information & Controls", "Critical blockers before production or portfolio expansion.", "Commercial and capacity gaps prevent quantitative projections.");
  s.getRange("A5:E5").values = [["Risk","Severity","Why it matters","Mitigation","Owner"]]; header(s, "A5:E5");
  s.getRange(`A6:E${5 + data.risks.length}`).values = data.risks;
  body(s, `A6:E${5 + data.risks.length}`, 8);
  s.getRange("A17:D17").values = [["Gap area","Missing information","Status","Decision impact"]]; header(s, "A17:D17");
  s.getRange(`A18:D${17 + data.missing.length}`).values = data.missing;
  body(s, `A18:D${17 + data.missing.length}`, 8);
  setWidths(s, [28,24,60,62,24], 35);
  freeze(s, "A6");
}

// 14. Roadmap
{
  const s = sheets["Roadmap"];
  titleBlock(s, "D", "Evidence-Gated Implementation Roadmap", "No invented calendar dates. Every expansion step has an exit criterion.", "Source code and existing project files remain unchanged in this task.");
  s.getRange("A5:D5").values = [["Gate","Actions","Output","Exit criterion"]]; header(s, "A5:D5");
  s.getRange(`A6:D${5 + data.roadmap.length}`).values = data.roadmap;
  body(s, `A6:D${5 + data.roadmap.length}`, 8.5);
  s.getRange("A14:C14").values = [["Decision","Chosen","Why"]]; header(s, "A14:C14");
  s.getRange(`A15:C${14 + data.final_choices.length}`).values = data.final_choices;
  body(s, `A15:C${14 + data.final_choices.length}`, 8.5);
  setWidths(s, [30,72,46,52], 30);
  freeze(s, "A6");
}

// General row sizing and formula inspection.
for (const [name, sheet] of Object.entries(sheets)) {
  try { sheet.getUsedRange().format.autofitRows(); } catch {}
  try { sheet.getUsedRange().format.font = { name: "Aptos", color: C.ink, size: 9 }; } catch {}
  // Reapply title and header fonts after general font operation.
}

// Reapply title/header visual style because a global font name may have overridden sizes.
for (const [name, sheet] of Object.entries(sheets)) {
  const used = sheet.getUsedRange();
  const lastCol = colLetter(used.columnCount || 1);
  sheet.getRange(`A1:${lastCol}1`).format.font = { name: "Aptos Display", bold: true, color: C.white, size: 18 };
  sheet.getRange(`A2:${lastCol}2`).format.font = { name: "Aptos", italic: true, color: C.darkRed, size: 10 };
  sheet.getRange(`A3:${lastCol}3`).format.font = { name: "Aptos", color: C.ink, size: 9 };
}

const inspect = await wb.inspect({ kind: "workbook,sheet,formula", maxChars: 12000, tableMaxRows: 4, tableMaxCols: 8 });
await fs.writeFile(`${HERE}/workbook_inspect.txt`, inspect.ndjson || String(inspect), "utf8");

const formulaErrors = await wb.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 200 },
  summary: "final formula error scan"
});
await fs.writeFile(`${HERE}/formula_errors.txt`, formulaErrors.ndjson || String(formulaErrors), "utf8");

// Render every sheet for visual QA.
for (const name of Object.keys(sheets)) {
  try {
    const preview = await wb.render({ sheetName: name, autoCrop: "all", scale: 0.75, format: "png" });
    const safe = name.replaceAll(" ", "_").replaceAll("&", "and");
    await fs.writeFile(`${RENDER_DIR}/${safe}.png`, new Uint8Array(await preview.arrayBuffer()));
  } catch (err) {
    await fs.writeFile(`${RENDER_DIR}/${name.replaceAll(" ", "_")}.error.txt`, String(err), "utf8");
  }
}

const xlsx = await SpreadsheetFile.exportXlsx(wb);
await xlsx.save(OUTPUT_PATH);
console.log(OUTPUT_PATH);
console.log(RENDER_DIR);

