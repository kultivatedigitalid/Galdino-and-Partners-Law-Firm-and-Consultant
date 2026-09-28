import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const sourceFile = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\tmp\\mapping_workbook_2026-08-14\\add_checklist_evidence_sheet.mjs";
let code = await fs.readFile(sourceFile, "utf8");
code = code
  .replace(/^import fs[^\n]*\n/m, "")
  .replace(/^import path[^\n]*\n/m, "")
  .replace(/^import \{ FileBlob[^\n]*\n/m, "")
  .replace(/const old = workbook\.worksheets\.getItemOrNull\("13_Checklist_Evidence"\);\s*if \(old\) old\.delete\(\);/m, "")
  .split("â˜").join("[ ]")
  .split("â€“").join("-")
  .split("â€”").join("--")
  .split("â€¦").join("...");

const run = new Function("fs", "path", "FileBlob", "SpreadsheetFile", `return (async () => { ${code} })();`);
await run(fs, path, FileBlob, SpreadsheetFile);
