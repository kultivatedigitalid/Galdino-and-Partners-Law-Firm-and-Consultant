import fs from "node:fs/promises";
import { pathToFileURL } from "node:url";

const dir = "C:/Users/Joshua/OneDrive/Documents/Law/tmp/business_strategy_2026-08-05";
const sourcePath = `${dir}/build_workbook_v2.mjs`;
const runtimePath = `${dir}/build_workbook_runtime_v3.mjs`;
let source = await fs.readFile(sourcePath, "utf8");

const names = [
  "Executive Summary", "Scoring Guide", "Source Register", "Service Inventory",
  "Service Scoring", "Service Decisions", "Permit Type Map", "Scenario Matrix",
  "Scenario Details", "Website IA", "Content Strategy", "Conflicts", "Risks & Gaps", "Roadmap"
];
const precreate = `const wb = Workbook.create();\nfor (const sheetName of ${JSON.stringify(names)}) wb.worksheets.add(sheetName);`;
source = source.replace("const wb = Workbook.create();", precreate);
source = source.replaceAll("wb.worksheets.add(name)", "wb.worksheets.getItem(name)");
for (const name of names) {
  source = source.replaceAll(`wb.worksheets.add(${JSON.stringify(name)})`, `wb.worksheets.getItem(${JSON.stringify(name)})`);
}
await fs.writeFile(runtimePath, source, "utf8");
await import(`${pathToFileURL(runtimePath).href}?v=3`);

