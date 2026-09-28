import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const HERE = "C:/Users/Joshua/OneDrive/Documents/Law/tmp/business_strategy_2026-08-05";
const OUT = "C:/Users/Joshua/OneDrive/Documents/Law/outputs/galdino_partner/business_strategy_2026-08-05/GP_Service_Portfolio_Scenario_Matrix_2026-08-05.xlsx";
const d = JSON.parse(await fs.readFile(`${HERE}/strategy_data.json`, "utf8"));
const wb = Workbook.create();

const CLR = { red:"#8B1E2D", dark:"#5E1320", gold:"#B28A45", ink:"#202124", muted:"#5F6368", white:"#FFFFFF", grid:"#D8DCE3", light:"#F2F4F7", paleRed:"#F8EDEF", paleGold:"#FBF6EA", paleBlue:"#E8EEF5", paleGreen:"#EAF4EE", yellow:"#FFF4D6", bad:"#F5DDE1", good:"#DDEFE4" };
const col = n => { let s=""; while(n){ n--; s=String.fromCharCode(65+n%26)+s; n=Math.floor(n/26); } return s; };

function styleTitle(s, last, title, subtitle, note) {
  s.mergeCells(`A1:${last}1`); s.getRange(`A1:${last}1`).values=[[title]];
  s.getRange(`A1:${last}1`).format={fill:CLR.dark,font:{name:"Aptos Display",bold:true,color:CLR.white,size:18},wrapText:true,verticalAlignment:"center"};
  s.getRange(`A1:${last}1`).format.rowHeight=34;
  s.mergeCells(`A2:${last}2`); s.getRange(`A2:${last}2`).values=[[subtitle]];
  s.getRange(`A2:${last}2`).format={fill:CLR.paleRed,font:{name:"Aptos",italic:true,color:CLR.dark,size:10},wrapText:true};
  s.getRange(`A2:${last}2`).format.rowHeight=28;
  s.mergeCells(`A3:${last}3`); s.getRange(`A3:${last}3`).values=[[note]];
  s.getRange(`A3:${last}3`).format={fill:CLR.paleGold,font:{name:"Aptos",color:CLR.ink,size:9},wrapText:true};
  s.getRange(`A3:${last}3`).format.rowHeight=30;
}
function styleHeader(s, range) {
  s.getRange(range).format={fill:CLR.red,font:{name:"Aptos",bold:true,color:CLR.white,size:9},wrapText:true,verticalAlignment:"center",horizontalAlignment:"center",borders:{top:{style:"continuous",color:CLR.grid},bottom:{style:"continuous",color:CLR.grid},left:{style:"continuous",color:CLR.grid},right:{style:"continuous",color:CLR.grid}}};
  s.getRange(range).format.rowHeight=34;
}
function styleBody(s, range, size=8) {
  s.getRange(range).format={font:{name:"Aptos",color:CLR.ink,size},wrapText:true,verticalAlignment:"top",borders:{top:{style:"continuous",color:CLR.grid},bottom:{style:"continuous",color:CLR.grid},left:{style:"continuous",color:CLR.grid},right:{style:"continuous",color:CLR.grid}}};
}
function widths(s, ws, rows=100) { ws.forEach((w,i)=>s.getRange(`${col(i+1)}1:${col(i+1)}${rows}`).format.columnWidth=w); }
function freeze(s, at="A6") { try{s.freezePanes.freezeAt(at);}catch{try{s.freezePanes.freezeRows(5);}catch{}} }
function gradeColor(s, letter, start, vals) { vals.forEach((v,i)=>{s.getRange(`${letter}${start+i}`).format.fill=v==="A"?CLR.good:v==="B"?CLR.yellow:CLR.bad; s.getRange(`${letter}${start+i}`).format.font={name:"Aptos",bold:true,color:CLR.ink,size:9};}); }
function makeSheet(name, title, subtitle, note, headers, rows, ws, size=8) {
  const s=wb.worksheets.add(name), last=col(headers.length), end=5+rows.length;
  styleTitle(s,last,title,subtitle,note);
  s.getRange(`A5:${last}5`).values=[headers]; styleHeader(s,`A5:${last}5`);
  if(rows.length){s.getRange(`A6:${last}${end}`).values=rows; styleBody(s,`A6:${last}${end}`,size); s.getRange(`A6:${last}${end}`).format.rowHeight=48;}
  widths(s,ws,Math.max(80,end+5)); freeze(s); return s;
}

// Executive Summary
{
  const s=wb.worksheets.add("Executive Summary"); styleTitle(s,"H","Galdino & Partner — Business & Service Portfolio Decision Workbook","39 service families • 18 scenarios • qualitative scoring only • project-file evidence","Yellow cells are adjustable analytical inputs. No validated financial, demand-volume, case-hour, or numeric capacity data exists in project files.");
  s.getRange("A5:H5").values=[["Decision","Selected model","Launch offers","Owner design","Launch team","Website","Primary risk","Gate"]]; styleHeader(s,"A5:H5");
  s.getRange("A6:H6").values=[["RECOMMENDED","K13 High-Ticket Boutique + K16 partner layer","Readiness/Roadmap; Regulatory Care; selective Project PM","2 hours/day steady state","4-5 + validated partners","11-13 realistic pages","Unverified capability and sprawl","Paid pilot + time study"]]; styleBody(s,"A6:H6",10); s.getRange("A6:H6").format.fill=CLR.paleGreen; s.getRange("A6:H6").format.rowHeight=64;
  s.getRange("A8:D8").values=[["Control","Formula/value","Interpretation","Source"]]; styleHeader(s,"A8:D8");
  s.getRange("A9:D15").values=[["Grade A",null,"Internal only","Service Decisions"],["Grade B",null,"Selective","Service Decisions"],["Grade C",null,"Conditional","Service Decisions"],["Lean Launch",null,"Core families","Service Decisions"],["Scenarios",null,"Compared","Scenario Matrix"],["Top score",null,"Not approval","Scenario Matrix"],["Numeric client cap","NOT AVAILABLE","Use stage-gated WIP","Project files"]];
  s.getRange("B9:B14").formulas=[["=COUNTIF('Service Decisions'!$C$6:$C$44,\"A\")"],["=COUNTIF('Service Decisions'!$C$6:$C$44,\"B\")"],["=COUNTIF('Service Decisions'!$C$6:$C$44,\"C\")"],["=COUNTIF('Service Decisions'!$D$6:$D$44,\"Lean Launch\")"],["=COUNTA('Scenario Matrix'!$A$6:$A$23)"],["=MAX('Scenario Matrix'!$W$6:$W$23)"]];
  styleBody(s,"A9:D15",9); s.getRange("B9:B15").format.fill=CLR.paleBlue;
  s.getRange("A17:H17").values=[["Choice","Safest","Most potentially profitable","Leanest","Easiest","SEO/portfolio","Best balance","Caveat"]]; styleHeader(s,"A17:H17");
  s.getRange("A18:H18").values=[["Scenario","K01","K14","K15","K03/K12","K14 + K15","K13","Profit not quantified"]]; styleBody(s,"A18:H18",9);
  widths(s,[18,25,30,24,24,27,27,32],30); freeze(s,"A5");
}

// Scoring Guide
{
  const s=wb.worksheets.add("Scoring Guide"); styleTitle(s,"Q","Scoring Guide & Assumptions","Service: positive 5 = attractive; negative 5 = heavy burden/risk. Scenario: 5 = favorable.","Grade A/B/C also uses hard proof, scope, expertise, and operating gates.");
  s.getRange("A5:E5").values=[["Key","Service criterion","Direction","Weight","Definition"]]; styleHeader(s,"A5:E5");
  const rows=d.criteria.map(x=>[x.key,x.label,x.direction,x.weight,x.direction==="positive"?"1 low — 5 attractive":"1 low — 5 heavy; reversed"]); s.getRange("A6:E35").values=rows; styleBody(s,"A6:E35",8); s.getRange("D6:D35").format.numberFormat="0.0%"; s.getRange("D6:D35").format.fill=CLR.yellow;
  s.getRange("A37:E37").values=[["Grade","Meaning","Decision","Hard gate","Legal class?"]]; styleHeader(s,"A37:E37"); s.getRange("A38:E40").values=[["A","Core High-Ticket","Lean Launch","Scope/SOP/reviewer/proof","No"],["B","Selective Growth","Pilot/partner","One vertical + governance","No"],["C","Conditional/Low Priority","Partner/defer/eliminate","Capability/economics","No"]]; styleBody(s,"A38:E40",9); gradeColor(s,"A",38,["A","B","C"]);
  s.getRange("A42:Q42").values=[["Scenario weight",...d.scenario_weights.map(x=>x.label)]]; styleHeader(s,"A42:Q42"); s.getRange("A43:Q43").values=[["Weight",...d.scenario_weights.map(x=>x.weight)]]; styleBody(s,"A43:Q43",8); s.getRange("B43:Q43").format.numberFormat="0.0%"; s.getRange("B43:Q43").format.fill=CLR.yellow;
  widths(s,[25,31,13,12,42,...Array(12).fill(13)],50); freeze(s);
}

makeSheet("Source Register","Project Source Register","Only project files are fact sources.","Source IDs are used across both deliverables.",["ID","Tier","Project-relative file","Locator","Use"],d.sources.map(x=>[x.id,x.tier,x.path,x.locator,x.use]),[10,20,58,40,58],8);

{
  const rows=d.services.map(x=>[x.id,x.permit_type,x.name,x.examples,x.target,x.problem,x.readiness,x.grade,x.decision,x.rationale,x.advantages,x.disadvantages,x.risks,x.source]);
  const s=makeSheet("Service Inventory","Service Inventory","All service families and examples found.","Inventory presence does not imply sale/publication approval.",["ID","Permit type","Service family","Examples","Target","Problem","Readiness","Grade","Decision","Rationale","Advantages","Disadvantages","Risks","Source"],rows,[8,24,34,48,38,42,28,9,18,44,38,38,38,28],7.5); gradeColor(s,"H",6,d.services.map(x=>x.grade));
}

// Service Scoring with formulas
{
  const start=4, end=start+d.criteria.length-1, last=col(end+1); const s=wb.worksheets.add("Service Scoring"); styleTitle(s,last,"Service Scoring — 30 Criteria","Yellow inputs are analytical assumptions.","Composite reverses burden/risk criteria and normalizes to 1-5.");
  s.getRange(`A5:${last}5`).values=[["ID","Service","Manual grade",...d.criteria.map(x=>x.label),"Composite 1-5"]]; styleHeader(s,`A5:${last}5`);
  const rows=d.services.map(x=>[x.id,x.name,x.grade,...d.criteria.map(c=>x.ratings[c.key]),null]); s.getRange(`A6:${last}44`).values=rows; styleBody(s,`A6:${last}44`,7); const inA=col(start),inB=col(end); s.getRange(`${inA}6:${inB}44`).format.fill=CLR.yellow; s.getRange(`${inA}6:${inB}44`).format.horizontalAlignment="center";
  const base=d.criteria.map((c,i)=>{const cell=`${col(start+i)}ROW`;return `${c.direction==="positive"?cell:`(6-${cell})`}*'Scoring Guide'!$D$${6+i}`;});
  s.getRange(`${last}6:${last}44`).formulas=d.services.map((_x,i)=>[`=ROUND((${base.join("+").replaceAll("ROW",String(6+i))})/SUM('Scoring Guide'!$D$6:$D$35),2)`]); s.getRange(`${last}6:${last}44`).format.fill=CLR.paleBlue; s.getRange(`${last}6:${last}44`).format.numberFormat="0.00"; gradeColor(s,"C",6,d.services.map(x=>x.grade)); widths(s,[8,32,11,...Array(30).fill(12),14],50); freeze(s,"D6");
}

{
  const role=x=>x.decision==="Lean Launch"?"Core offer/module":x.decision==="Controlled Growth"?"Supporting/gated":x.decision==="Partner-Based"?"After partner gate":x.decision==="Experimental"?"Do not publish":x.decision==="Ditunda"?"Hidden":"Remove standalone";
  const rows=d.services.map(x=>[x.id,x.name,x.grade,x.decision,x.composite,x.rationale,x.conditions,x.readiness,x.risks,x.source,role(x)]); const s=makeSheet("Service Decisions","Service Portfolio Decisions","Grades, decisions, gates, and evidence status.","Eliminated usually means removed as standalone public offer.",["ID","Service","Grade","Decision","Composite","Why","Conditions","Readiness","Primary risk","Source","Public role"],rows,[8,34,9,20,12,44,48,30,38,28,24],7.5); s.getRange("E6:E44").format.numberFormat="0.00"; gradeColor(s,"C",6,d.services.map(x=>x.grade));
}

{
  const rows=d.type_map.map(x=>[x.type,x.ids.join(", "),x.client,x.problem,x.value,x.complexity,x.expert,x.core,x.content,x.burden,x.average_grade,x.fit_2h,x.fit_4h]); const s=makeSheet("Permit Type Map","Permit Type Map","Target, value, complexity, expertise, content, and time fit.","Employment licensing was not found as a supported service family.",["Type","IDs","Target","Problem","Value","Complexity","Expert","Core","Content","Burden","Avg grade","2h fit","4h fit"],rows,[30,22,34,42,24,24,32,24,24,26,12,28,28],7.5); gradeColor(s,"K",6,d.type_map.map(x=>x.average_grade));
}

// Scenario Matrix with formulas
{
  const start=7,end=start+d.scenario_weights.length-1,last=col(end+1); const s=wb.worksheets.add("Scenario Matrix"); styleTitle(s,last,"Scenario Comparison Matrix — 18 Alternatives","Scores 1-5; 5 is favorable. Yellow cells are adjustable.","Score is a comparison aid, not a launch approval.");
  s.getRange(`A5:${last}5`).values=[["ID","Scenario","Family","Decision","Owner time","Team",...d.scenario_weights.map(x=>x.label),"Final score"]]; styleHeader(s,`A5:${last}5`);
  const rows=d.scenarios.map(x=>[x.id,x.name,x.family,x.recommendation,x.time,x.team,...d.scenario_weights.map(w=>x.ratings[w.key]),null]); s.getRange(`A6:${last}23`).values=rows; styleBody(s,`A6:${last}23`,7.2); const inA=col(start),inB=col(end); s.getRange(`${inA}6:${inB}23`).format.fill=CLR.yellow; s.getRange(`${inA}6:${inB}23`).format.horizontalAlignment="center"; s.getRange(`${last}6:${last}23`).formulas=d.scenarios.map((_x,i)=>[`=ROUND(SUMPRODUCT(${inA}${6+i}:${inB}${6+i},'Scoring Guide'!$B$43:$Q$43),2)`]); s.getRange(`${last}6:${last}23`).format.fill=CLR.paleBlue; s.getRange(`${last}6:${last}23`).format.numberFormat="0.00"; widths(s,[8,38,18,24,24,20,...Array(16).fill(13),14],30); freeze(s,"G6");
}

{
  const rows=d.scenarios.map(x=>[x.id,x.name,x.family,x.recommendation,x.description,x.permit_types,x.services,x.grades,x.target,`${x.time}; ${x.owner}`,x.team,x.roles,x.partners,x.automation,x.complexity,x.risk,x.communication,x.regulation,x.web,x.seo,x.youtube,x.social,x.repeat,x.cross,x.advantages,x.disadvantages,x.success,x.fail,x.capacity,x.final_score]); makeSheet("Scenario Details","Scenario Operating Details","All requested scenario fields.","Capacity is qualitative; no utilization data exists.",["ID","Scenario","Family","Recommendation","Description","Permit types","Services","Grades","Target","Owner","Team","Roles","Partners","Automation","Complexity","Risk","Communication","Regulation","Website","SEO","YouTube","Social","Repeat","Cross-sell","Advantages","Disadvantages","Success","Failure","Capacity","Score"],rows,[8,34,18,24,40,32,30,12,34,38,20,42,24,32,16,34,18,18,24,18,18,18,14,16,38,38,40,40,38,14],7);
}

makeSheet("Website IA","Website Architecture After Business Decision","Business model → scenario → services → target → process → content → pages.","No website code is changed.",["URL","Page","Decision","Purpose/content","CTA","Relationship"],d.website_ia,[28,28,22,65,28,34],8.3);

{
  const headers=["Cluster","Theme","Intent","Priority topics & existing asset","YouTube","Social","Maintenance"]; makeSheet("Content Strategy","SEO, YouTube & Social Content Strategy","Three clusters; one reviewed pillar reused across channels.","Current six localized articles remain preview-only until competent review.",headers,d.content_strategy,[18,34,28,72,32,32,34],8.3);
}

makeSheet("Conflicts","Cross-File Conflicts & Resolution","Aligned/current evidence wins except dummy, unsafe, unconfirmed, or unfinished implementation.","Do not align strategy to placeholder content.",["Topic","Conflict","Priority state","Source","Resolution"],d.conflicts,[24,55,52,35,52],8);

{
  const s=wb.worksheets.add("Risks & Gaps"); styleTitle(s,"E","Risks, Missing Information & Controls","Critical blockers before production or expansion.","Commercial and capacity gaps prevent quantitative projections."); s.getRange("A5:E5").values=[["Risk","Severity","Why","Mitigation","Owner"]]; styleHeader(s,"A5:E5"); s.getRange(`A6:E${5+d.risks.length}`).values=d.risks; styleBody(s,`A6:E${5+d.risks.length}`,8); s.getRange("A17:D17").values=[["Gap area","Missing information","Status","Impact"]]; styleHeader(s,"A17:D17"); s.getRange(`A18:D${17+d.missing.length}`).values=d.missing; styleBody(s,`A18:D${17+d.missing.length}`,8); widths(s,[28,24,60,62,24],35); freeze(s);
}

{
  const s=wb.worksheets.add("Roadmap"); styleTitle(s,"D","Evidence-Gated Implementation Roadmap","No invented calendar dates.","Source code and existing project files remain unchanged."); s.getRange("A5:D5").values=[["Gate","Actions","Output","Exit criterion"]]; styleHeader(s,"A5:D5"); s.getRange(`A6:D${5+d.roadmap.length}`).values=d.roadmap; styleBody(s,`A6:D${5+d.roadmap.length}`,8.5); s.getRange("A14:C14").values=[["Decision","Choice","Reason"]]; styleHeader(s,"A14:C14"); s.getRange(`A15:C${14+d.final_choices.length}`).values=d.final_choices; styleBody(s,`A15:C${14+d.final_choices.length}`,8.5); widths(s,[30,72,46,52],30); freeze(s);
}

const summary=await wb.inspect({kind:"workbook,sheet,formula",maxChars:12000,tableMaxRows:4,tableMaxCols:8}); await fs.writeFile(`${HERE}/workbook_inspect_v2.txt`,summary.ndjson||String(summary),"utf8");
const errors=await wb.inspect({kind:"match",searchTerm:"#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",options:{useRegex:true,maxResults:200},summary:"formula error scan"}); await fs.writeFile(`${HERE}/formula_errors_v2.txt`,errors.ndjson||String(errors),"utf8");
const file=await SpreadsheetFile.exportXlsx(wb); await file.save(OUT); console.log(OUT);

