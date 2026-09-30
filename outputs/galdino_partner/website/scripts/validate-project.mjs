import {existsSync,readFileSync,readdirSync,mkdirSync,writeFileSync} from 'node:fs';
import {join,relative} from 'node:path';import {load} from 'cheerio';
import {SERVICES,serviceUrl} from '../src/data/services.ts';
import {SERVICE_CATEGORIES,SERVICE_GROUPS,categoryUrl,groupUrl} from '../src/data/service-catalog.ts';
import {INDUSTRIES,industryUrl} from '../src/data/industries.ts';
import {EXPERIENCES,experienceUrl} from '../src/data/experiences.ts';
import {PEOPLE} from '../src/data/people.ts';
const root=process.cwd(),out=join(root,'dist/client'),errors=[],pages=new Map(),incoming=new Set(),locales=['id','en'];
const assert=(condition,message)=>{if(!condition)errors.push(message);};
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(d=>d.isDirectory()?walk(join(dir,d.name)):[join(dir,d.name)]);
assert(existsSync(out),'Missing build output. Run npm run build first.');
if(!existsSync(out))throw Error(errors.join('\n'));
for(const file of walk(out).filter(f=>f.endsWith('.html'))){const key='/'+relative(out,file).replaceAll('\\','/').replace(/index\.html$/,'');pages.set(key,{file,$:load(readFileSync(file,'utf8'))});}
assert(SERVICES.length===38,'Expected exactly 38 services');assert(SERVICE_CATEGORIES.length===6,'Expected six service categories');assert(SERVICE_GROUPS.length===4,'Expected four environmental groups');assert(INDUSTRIES.length===6,'Expected six industries');
const ids=new Set(SERVICES.map(s=>s.id));assert(ids.size===38,'Duplicate service identifiers');
for(const locale of locales){
 const expected=[...['','services/','industries/','projects/','blog/','profile/','profile/how-we-work/','contact/','privacy/','terms/'].map(p=>'/'+locale+'/'+p),...SERVICES.map(s=>serviceUrl(s,locale)),...SERVICE_CATEGORIES.map(c=>categoryUrl(c,locale)),...SERVICE_GROUPS.map(g=>groupUrl(g,locale)),...INDUSTRIES.map(i=>industryUrl(i,locale)),...EXPERIENCES.map(e=>experienceUrl(e,locale)),...PEOPLE[locale].map(p=>'/'+locale+'/profile/'+p.slug+'/')];
 for(const path of expected)assert(pages.has(path),'Missing route '+path);
 const posts=readdirSync(join(root,'src/content/blog',locale)).filter(f=>f.endsWith('.md'));assert(posts.length===14,'Expected 14 articles in '+locale);
 assert(PEOPLE[locale].length===4,'Expected four people in '+locale);
 for(const p of PEOPLE[locale])for(const id of p.services)assert(ids.has(id),'Unknown person service '+id);
 for(const f of posts){const body=readFileSync(join(root,'src/content/blog',locale,f),'utf8');for(const key of ['title:','description:','author: "Galdino Wirawan"','services:','sources:','translationKey:'])assert(body.includes(key),'Missing '+key+' in '+f);assert(pages.has('/'+locale+'/blog/'+f.replace(/\.md$/,'')+'/'),'Missing article '+f);}
 for(const service of SERVICES){const page=pages.get(serviceUrl(service,locale));if(page)assert(page.$('details').length>=5,'Insufficient FAQs '+service.id);assert(service.price>0,'Missing price '+service.id);assert(service.content[locale].documents.length>=5,'Missing documents '+service.id);assert(service.content[locale].deliverables.every(Boolean),'Invalid deliverables '+service.id);}
}
for(const owner of [...INDUSTRIES,...EXPERIENCES])for(const id of owner.services)assert(ids.has(id),'Unknown related service '+id);
const isLocal=u=>u.hostname==='galdino.co.id';
for(const [path,page] of pages){
 if(path==='/'||path==='/404.html')continue;const $=page.$,base=new URL(path,'https://galdino.co.id');
 assert($('h1').length===1,'Expected one h1 '+path);assert($('html').attr('lang')===path.split('/')[1],'Incorrect language '+path);
 assert($('meta[name=description]').attr('content')?.length>40,'Missing description '+path);
 assert($('meta[name=robots]').attr('content')==='noindex,nofollow','Indexing must remain disabled '+path);
 assert($('link[rel=canonical]').attr('href')===base.href,'Wrong canonical '+path);
 for(const lang of ['id-ID','en','x-default']){const href=$('link[rel=alternate][hreflang="'+lang+'"]').attr('href');assert(!!href,'Missing hreflang '+lang+' '+path);if(href){const target=new URL(href).pathname;assert(pages.has(target),'Broken alternate '+target+' from '+path);if(lang!=='x-default'&&target!==path){const reciprocal=pages.get(target)?.$('link[rel=alternate][hreflang="'+(path.startsWith('/id/')?'id-ID':'en')+'"]').attr('href');assert(reciprocal===base.href,'Nonreciprocal translation '+path);}}}
 const texts=$.root().clone();texts.find('script,style').remove();assert(!/\[(?:PLACEHOLDER|DUMMY|DATA)[^\]]*\]|lorem ipsum|logo masih berupa dummy|pending approval/i.test(texts.text()),'Visible provisional marker '+path);
 $('img').each((_,el)=>assert($(el).attr('alt')!==undefined,'Image without alt '+path));
 $('script[type="application/ld+json"]').each((_,el)=>{try{const value=JSON.parse($(el).text());assert(!JSON.stringify(value).match(/"@type"\s*:\s*(?:"(?:AggregateRating|Review)"|\[[^\]]*"(?:AggregateRating|Review)")/),'Unapproved review schema '+path);}catch{errors.push('Invalid JSON-LD '+path);}});
 $('[href],[src],[action]').each((_,el)=>{const raw=$(el).attr('href')||$(el).attr('src')||$(el).attr('action');if(!raw||/^(mailto:|tel:|data:|javascript:)/.test(raw))return;let url;try{url=new URL(raw,base);}catch{return errors.push('Invalid URL '+raw+' '+path)}if(!isLocal(url))return;
  const target=decodeURIComponent(url.pathname);if(pages.has(target)){incoming.add(target);if(url.hash){const hash=decodeURIComponent(url.hash.slice(1));const dest=pages.get(target).$;assert(dest('[id]').toArray().some(e=>dest(e).attr('id')===hash),'Missing anchor '+url.href+' from '+path);}}
  else assert(existsSync(join(out,target.replace(/^\//,'')))||target==='/api/contact/','Broken local link '+target+' from '+path);
 });
}
for(const path of pages.keys())if(path!=='/'&&path!=='/404.html')assert(incoming.has(path),'Orphan page '+path);
const robots=readFileSync(join(out,'robots.txt'),'utf8');assert(robots.includes('Disallow: /'),'Staging robots must block crawling');assert(existsSync(join(out,'sitemap-index.xml')),'Missing sitemap');for(const l of locales)assert(existsSync(join(out,l,'rss.xml')),'Missing RSS '+l);
for(const doc of ['DEPLOYMENT','ARCHITECTURE','SITE_MAP','PROVISIONAL_DATA_REGISTER','PRICING_RESEARCH','ANALYTICS','LAUNCH_CHECKLIST'])assert(existsSync(join(root,'docs',doc+'.md')),'Missing documentation '+doc);
mkdirSync(join(root,'reports'),{recursive:true});writeFileSync(join(root,'reports','validation.json'),JSON.stringify({checkedAt:new Date().toISOString(),pages:pages.size,services:SERVICES.length,categories:SERVICE_CATEGORIES.length,environmentalGroups:SERVICE_GROUPS.length,industries:INDUSTRIES.length,articlesPerLocale:14,errors},null,2)+'\n');
if(errors.length)throw Error(errors.join('\n'));
console.log('Validation passed: '+pages.size+' pages, 38 services, 6 categories, 4 environmental groups, 6 industries, bilingual links, metadata, schemas and noindex.');
