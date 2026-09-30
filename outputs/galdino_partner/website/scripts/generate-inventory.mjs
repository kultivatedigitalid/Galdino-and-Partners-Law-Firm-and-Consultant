import fs from 'node:fs';
// Replace generated artifacts atomically to avoid partial writes in synced folders.
function writeGenerated(file,content){
 const temporary=file+'.tmp';
 fs.writeFileSync(temporary,content);
 fs.renameSync(temporary,file);
}
import {SERVICES,serviceUrl} from '../src/data/services.ts';
import {SERVICE_CATEGORIES,SERVICE_GROUPS,categoryUrl,groupUrl} from '../src/data/service-catalog.ts';
import {INDUSTRIES,industryUrl} from '../src/data/industries.ts';
import {EXPERIENCES,experienceUrl} from '../src/data/experiences.ts';
import {PEOPLE} from '../src/data/people.ts';
import {HOME_CLIENTS} from '../src/data/home.ts';
import {PROFILE_CONTENT} from '../src/data/profile.ts';
import {ABOUT} from '../src/data/about.ts';
import {CONTACT} from '../src/data/contact.ts';
import {COMPANY_STATS} from '../src/data/stats.ts';
const locales=['id','en'], records=[],tick=String.fromCharCode(96);
function add(page,field,value,source,priority='P0',type=typeof value){records.push({field,page,currentPrototypeValue:value,dataType:type,replacementPriority:priority,source,provisional:true});}
function flatten(page,prefix,value,source,priority='P0'){
 if(value && typeof value==='object' && !Array.isArray(value)){for(const [k,v] of Object.entries(value))if(k!=='provisional')flatten(page,prefix?prefix+'.'+k:k,v,source,priority);}
 else add(page,prefix,value,source,priority,Array.isArray(value)?'array':typeof value);
}
for(const l of locales){
 flatten('/'+l+'/profile/','about',ABOUT[l],'Authorised editorial prototype; founder statement and milestones require owner approval');
 for(const [i,client] of HOME_CLIENTS[l].entries())flatten('/'+l+'/','clients.'+i,client,'Simulated client name, monogram and relationship; written approval or replacement required');
 flatten('/'+l+'/profile/','company',PROFILE_CONTENT[l].company,'Prototype company history, approach and identity; owner verification required');
 flatten('/'+l+'/*','CONTACT',CONTACT,'User brief / Kultivate company reference; ownership and operational details not yet verified');
 flatten('/'+l+'/; /'+l+'/profile/','COMPANY_STATS',COMPANY_STATS,'Simulation for prototype; replace using approved business records');
 for(const p of PEOPLE[l])flatten('/'+l+'/profile/'+p.slug+'/','person',p,'Brief names and roles; generated biography, experience and contact details require written approval');
 for(const e of EXPERIENCES)flatten(experienceUrl(e,l),e.slug,{company:e.company,location:e.location,year:e.year,imageKey:e.imageKey,services:e.services,...e.content[l]},'Simulated company/project; not evidence of an actual client relationship');
 for(const s of SERVICES){
  add(serviceUrl(s,l),'price',s.price,'docs/PRICING_RESEARCH.md; estimated scope, not an approved quotation','P0','IDR');
  flatten(serviceUrl(s,l),'content',s.content[l],'Editorial prototype based on public regulatory context; technical and commercial review required','P1');
 }
 for(const i of INDUSTRIES)flatten(industryUrl(i,l),'industry',i.content[l],'Editorial prototype; confirm delivery capability and industry-specific requirements','P1');
 for(const file of fs.readdirSync('src/content/blog/'+l).filter(f=>f.endsWith('.md'))){
  const raw=fs.readFileSync('src/content/blog/'+l+'/'+file,'utf8');
  const route='/'+l+'/blog/'+file.replace('.md','')+'/';
  add(route,'author','Galdino Wirawan','User brief; authorship and editorial approval pending','P0');
  add(route,'body', 'src/content/blog/'+l+'/'+file,'Original editorial draft; primary references recorded in article; subject-matter review required','P1','markdown reference');
  for(const field of ['pubDate','updatedDate']){const value=raw.match(new RegExp('^'+field+':\\s*(.+)$','m'))?.[1];if(value)add(route,field,value,'Editorial publication metadata; confirm actual publication date','P1','date');}
 }
}
add('/id/profile/; /en/profile/; individual profiles','team-hans-galdino.webp','AI-generated fictional portrait','Generated with imagegen for this prototype on 2026-09-29; replace with approved Hans photograph before public launch','P0','image');
add('/id/; /en/; /id/profile/; /en/profile/','existing imagery','src/assets/* and public/*','Inherited illustration and photo assets; confirm licence and subject/client association before public launch','P0','asset collection');
add('/id/industries/; /en/industries/; service and case pages','industry photography','src/assets/industry-*.webp','Five AI-generated contextual illustrations, 2026-09-29; not photographs of actual clients or company facilities. Prompts and sources: docs/VISUAL_REVISION.md','P0','image collection');
add('/id/services/; /en/services/; service hubs and details','service activity photography','src/assets/service-*.webp','Nine AI-generated activity photographs, 2026-09-30; illustrative, not client evidence. Prompts and source paths: docs/REVISION_2026-09-30.md','P0','image collection');
add('/id/services/; /id/industries/; /id/projects/; /id/blog/; /id/contact/; and EN equivalents','main page hero photography','src/assets/hero-*.webp','Five AI-generated contextual hero photographs with two portrait mobile variants, 2026-09-30; illustrative, not client evidence. Prompts and source paths: docs/REVISION_2026-09-30.md','P0','image collection');
add('/id/privacy/; /en/privacy/; /id/terms/; /en/terms/','legal policy content','src/data/legal.ts','Draft privacy and engagement policy; company approval required, including 12-month retention and processor list','P0','typescript reference');
add('/id/*; /en/*','structured-data identity','PT Karya Lintas Generasi; Galdino & Partner; https://galdino.co.id','User brief; verify business legal identity, address and domain ownership before index activation','P0');
writeGenerated('docs/PROVISIONAL_DATA_REGISTER.json',JSON.stringify({version:1,updated:'2026-09-30',indexingEnabled:false,records},null,2)+'\n');
const esc=v=>String(Array.isArray(v)?v.map(x=>typeof x==='object'?JSON.stringify(x):x).join('; '):v).replaceAll('|','/').replaceAll('\n',' ');
writeGenerated('docs/PROVISIONAL_DATA_REGISTER.md','# Provisional data register\n\nUpdated 30 September 2026. All listed values are authorised prototype content, not verified representations of actual clients, credentials or completed matters. Indexing must remain disabled.\n\nThe companion [JSON register](PROVISIONAL_DATA_REGISTER.json) is the structured field-level inventory. P0 must be replaced or approved in writing before any public launch; P1 requires subject-matter/editorial review before indexing. Changing a value must update both the source and this generated inventory. Run npm run docs:inventory after changes. Keep approval evidence in the company records, never in public content.\n\n| Field | Page | Current prototype value | Data type | Priority | Source | provisional |\n|---|---|---|---|---|---|---|\n'+records.map(r=>'| '+[r.field,r.page,r.currentPrototypeValue,r.dataType,r.replacementPriority,r.source,true].map(esc).join(' | ')+' |').join('\n')+'\n\n## Indexing control\n\nsrc/data/launch.ts keeps dataVerified: false. Indexing additionally requires PUBLIC_INDEXING_ENABLED=true, HTTPS, and the approved domain. Robots metadata and robots.txt stay restrictive until all conditions pass. Never enable indexing just to improve an audit score.\n');
let map='# Website architecture\n\nUpdated 30 September 2026. This is the approved replacement structure: 38 services, six categories, four environmental groups, six industries. Old PT/CV/PMA/NIB/LKPM/HAKI service offers are absent; informational articles may discuss those concepts without offering them as services.\n\n## Navigation and hierarchy\n\nHeader: Home → Services → Industries → Our Experiences → Insights → About Us + Consultation CTA. Contact uses the main immersive navbar; Home has a Why Galdino & Partner section. The service mega menu links directly to six hubs and 38 service pages. About Us also links to four people. Footer repeats the main routes and provides Privacy, Terms, cookie preferences and contact channels.\n\n'+tick.repeat(3)+'mermaid\nflowchart TD\n Website --> Home\n Website --> Services\n Website --> Industries\n Website --> Cases[Our Experiences]\n Website --> Insights\n Website --> About[About Us]\n Website --> Contact\n Services --> Categories[6 categories]\n Categories --> Details[38 service pages]\n Categories --> Environment[4 environmental sections]\n Environment --> Details\n Industries --> Sectors[6 industry pages]\n Cases --> CaseDetails[6 case studies]\n Insights --> Articles[14 articles per language]\n Home --> Why[Why Galdino & Partner]\n About --> People[4 people]\n'+tick.repeat(3)+'\n\n## Page inventory and language pairs\n\nExisting top-level route segments are retained for stable links; nested service and industry slugs are localised. Every page provides reciprocal Indonesian/English alternates. The root redirects to Indonesian.\n\n| Page | Indonesian URL | English URL |\n|---|---|---|\n';
for(const [name,part] of [['Home',''],['Layanan','services/'],['Industri','industries/'],['Our Experiences','projects/'],['Insight','blog/'],['About Us','profile/'],['Kontak','contact/'],['Privasi','privacy/'],['Ketentuan','terms/']])map+='| '+name+' | /id/'+part+' | /en/'+part+' |\n';
for(const c of SERVICE_CATEGORIES){
 map+='| **'+c.content.id.title+'** | '+categoryUrl(c,'id')+' | '+categoryUrl(c,'en')+' |\n';
 for(const g of SERVICE_GROUPS.filter(g=>g.category===c.id))map+='| ↳ '+g.title.id+' | '+groupUrl(g,'id')+' | '+groupUrl(g,'en')+' |\n';
 for(const s of SERVICES.filter(s=>s.category===c.id))map+='| '+'↳ '+s.content.id.title+' | '+serviceUrl(s,'id')+' | '+serviceUrl(s,'en')+' |\n';
}
for(const i of INDUSTRIES)map+='| '+i.content.id.title+' | '+industryUrl(i,'id')+' | '+industryUrl(i,'en')+' |\n';
for(const e of EXPERIENCES)map+='| '+e.content.id.title+' | '+experienceUrl(e,'id')+' | '+experienceUrl(e,'en')+' |\n';
for(let i=0;i<PEOPLE.id.length;i++)map+='| '+PEOPLE.id[i].name+' | /id/profile/'+PEOPLE.id[i].slug+'/ | /en/profile/'+PEOPLE.en[i].slug+'/ |\n';
const enPosts=fs.readdirSync('src/content/blog/en').filter(f=>f.endsWith('.md')).map(f=>({file:f,raw:fs.readFileSync('src/content/blog/en/'+f,'utf8')}));
for(const f of fs.readdirSync('src/content/blog/id').filter(f=>f.endsWith('.md'))){const raw=fs.readFileSync('src/content/blog/id/'+f,'utf8'),key=raw.match(/^translationKey:\s*(.+)$/m)?.[1],en=enPosts.find(e=>e.raw.match(/^translationKey:\s*(.+)$/m)?.[1]===key);map+='| '+raw.match(/^title:\s*(.+)$/m)?.[1]+' | /id/blog/'+f.replace('.md','')+'/ | /en/blog/'+en?.file.replace('.md','')+'/ |\n';}
map+='\n## Internal linking plan\n\n- Home links to all six service categories, selected cases, About and Contact.\n- Services links to six categories and every leaf through six visible HTML sections, with search temporarily hidden.\n- The environmental hub contains four anchored sections; services use category/leaf URLs without an intermediate group segment.\n- Service detail links to parent category, three related services, assigned people, matching case studies, relevant articles and a preselected contact form.\n- Each industry links to relevant services and case studies. Cases link back to services and relevant insights.\n- Insights link to supported service details and related articles. People link to their assigned services and insights.\n- Breadcrumbs expose Home, Services, category and service. The language switch preserves the corresponding entity.\n- XML sitemap and per-language RSS cover public content routes. API, assets and 404 are not editorial pages. The noindex gate remains active.\n\nMiddleware redirects the removed How We Work pages to the process section on Home and the former environmental group pages to hub anchors and the former nested service URLs to their shorter equivalents (301). Unsupported removed service URLs return a helpful 404 rather than redirecting to an unrelated offer.\n';
writeGenerated('docs/SITE_MAP.md',map);
console.log('Generated architecture and '+records.length+' provisional field records.');
