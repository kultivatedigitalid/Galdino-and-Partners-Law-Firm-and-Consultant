import type {Locale} from './site';
import records1 from './service-records-1';import records2 from './service-records-2';import records3 from './service-records-3';
import {categoryById,categoryUrl,SERVICE_GROUPS,groupUrl} from './service-catalog';
import {SERVICE_PRICES} from './service-prices';
export interface ServiceContent {title:string;description:string;definition:string;why:string;audience:string[];triggers:string[];documents:string[];scope:string[];deliverables:string[];timeline:string;priceScope:string;}
export interface Service {id:string;number:string;category:string;group?:string;slug:Record<Locale,string>;price:number;provisional:boolean;keywords:string;related:string[];content:Record<Locale,ServiceContent>;}
const records=[...records1,...records2,...records3];
const timeline:Record<string,[string,string]>={'reklame':['1–3 minggu','1–3 weeks'],'tata-ruang':['2–4 minggu','2–4 weeks'],'bangunan-konstruksi':['3–8 minggu','3–8 weeks'],'lingkungan':['4–12 minggu','4–12 weeks'],'lalu-lintas-akses':['3–8 minggu','3–8 weeks'],'iso':['4–12 minggu','4–12 weeks']};
export const SERVICES:Service[]=records.map((r,i)=>{
 const category=categoryById(r[0]),group=SERVICE_GROUPS.find(g=>g.id===r[1]);
 const leaf={id:r[2],en:r[3]};
 const slug={id:category.slug.id+'/'+(group?group.slug.id+'/':'')+leaf.id,en:category.slug.en+'/'+(group?group.slug.en+'/':'')+leaf.en};
 const content=Object.fromEntries((['id','en'] as const).map(l=>{
  const id=l==='id',c=category.content[l],focus=r[id?12:13];
  return [l,{title:r[id?4:5],description:r[id?6:7],definition:r[id?8:9],why:c.note,audience:c.audience,triggers:c.triggers,
   documents:[...r[id?10:11].split('|'),id?'Identitas badan usaha dan penanggung jawab':'Business identity and responsible-person details',id?'Dokumen persetujuan sebelumnya bila tersedia':'Previous approval records where available'],
   scope:id?['Asesmen status dan kebutuhan berdasarkan kegiatan serta lokasi',focus,'Review kelengkapan dan konsistensi data pemohon','Koordinasi perbaikan, pengajuan, atau kesiapan asesmen sesuai scope']:['Assess status and requirements against activity and location',focus,'Review completeness and consistency of applicant information','Coordinate corrections, submission or assessment readiness within scope'],
   deliverables:id?[focus,'Daftar kekurangan data beserta pemilik tindak lanjut','Arsip versi dokumen dan catatan koordinasi','Ringkasan status, pengecualian, dan kewajiban berikutnya']:[focus,'Information gap list with action owners','Document-version archive and coordination notes','Status, exclusions and next-obligation summary'],
   timeline:timeline[category.id][id?0:1],
   priceScope:id?'Estimasi untuk satu lingkup dasar: asesmen, review dokumen tersedia, dan koordinasi administratif. Lingkup teknis, pengujian, audit lembaga, dan biaya resmi dihitung terpisah setelah asesmen.':'Estimate for one basic scope: assessment, review of available documents and administrative coordination. Technical work, testing, external audits and official charges are quoted separately after assessment.'
  }];
 })) as Record<Locale,ServiceContent>;
 return {id:r[2],number:String(i+1).padStart(2,'0'),category:category.id,group:group?.id,slug,price:SERVICE_PRICES[r[2]],provisional:true,
 keywords:[r[4],r[5],r[10],r[11],category.content.id.title,category.content.en.title,...category.content.id.audience,...category.content.en.audience].join(' '),related:records.filter(x=>x[0]===r[0]&&x[2]!==r[2]).slice(0,3).map(x=>x[2]),content};
});
export const serviceById=(id:string)=>SERVICES.find(s=>s.id===id);
export const serviceUrl=(s:Service,l:Locale)=>`/${l}/services/${s.slug[l]}/`;
export const priceLabel=(s:Pick<Service,'price'>,l:Locale)=>(l==='id'?'Estimasi mulai ':'Estimated from ')+new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(s.price);
export const serviceBreadcrumbs=(s:Service,l:Locale)=>{
 const c=categoryById(s.category),g=SERVICE_GROUPS.find(x=>x.id===s.group);
 return [{name:l==='id'?'Layanan':'Services',href:`/${l}/services/`},{name:c.content[l].title,href:categoryUrl(c,l)},...(g?[{name:g.title[l],href:groupUrl(g,l)}]:[]),{name:s.content[l].title}];
};
