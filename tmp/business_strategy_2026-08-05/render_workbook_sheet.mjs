import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const input = "C:/Users/Joshua/OneDrive/Documents/Law/outputs/galdino_partner/business_strategy_2026-08-05/GP_Service_Portfolio_Scenario_Matrix_2026-08-05.xlsx";
const outDir = "C:/Users/Joshua/OneDrive/Documents/Law/tmp/business_strategy_2026-08-05/xlsx_renders_v2";
const sheetName = process.argv[2];
if (!sheetName) throw new Error("sheet name required");
await fs.mkdir(outDir, { recursive: true });
const file = await FileBlob.load(input);
const wb = await SpreadsheetFile.importXlsx(file);
const image = await wb.render({ sheetName, autoCrop: "all", scale: 0.25, format: "png" });
const safe = sheetName.replaceAll(" ", "_").replaceAll("&", "and");
const out = `${outDir}/${safe}.png`;
await fs.writeFile(out, new Uint8Array(await image.arrayBuffer()));
console.log(out);

