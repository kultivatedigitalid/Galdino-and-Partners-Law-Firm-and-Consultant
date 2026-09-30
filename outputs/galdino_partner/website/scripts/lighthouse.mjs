import fs from 'node:fs';
import path from 'node:path';
fs.mkdirSync('reports/lighthouse-profile',{recursive:true});
import lighthouse from 'lighthouse';
import {launch} from 'chrome-launcher';
const chrome=await launch({userDataDir:path.resolve("reports/lighthouse-profile"),chromePath:process.env.CHROME_PATH||(process.platform==='win32'?'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe':undefined),chromeFlags:['--headless','--no-first-run','--disable-extensions']});
const reports=[];
try{
 for(const [name,path] of [['home','/id/'],['services','/id/services/'],['contact','/id/contact/']]){
  const result=await lighthouse('http://localhost:4327'+path,{port:chrome.port,output:'json',logLevel:'error',onlyCategories:['performance','accessibility','best-practices','seo']});
  if(!result||result.lhr.runtimeError)throw Error(JSON.stringify(result?.lhr.runtimeError||'No Lighthouse report'));
  fs.writeFileSync('reports/lighthouse-'+name+'.json',result.report);
  const lhr=result.lhr,summary={name,path,device:'Lighthouse default mobile simulation',date:lhr.fetchTime,version:lhr.lighthouseVersion,scores:Object.fromEntries(Object.entries(lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)])),metrics:Object.fromEntries(['first-contentful-paint','largest-contentful-paint','cumulative-layout-shift','total-blocking-time','speed-index'].map(k=>[k,lhr.audits[k].numericValue])),failedAudits:Object.values(lhr.audits).filter(a=>a.score===0).map(a=>({id:a.id,title:a.title,description:a.description,details:a.details}))};
  reports.push(summary);console.log(JSON.stringify({name,scores:summary.scores,metrics:summary.metrics,failed:summary.failedAudits.map(a=>a.id)}));
 }
 fs.writeFileSync('reports/performance.json',JSON.stringify(reports,null,2)+'\n');
}finally{chrome.kill();}
