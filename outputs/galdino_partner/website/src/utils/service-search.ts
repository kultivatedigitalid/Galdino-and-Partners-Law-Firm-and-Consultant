/** Small, deterministic relevance score; no queries are sent to a server. */
export const normalizeSearch=(value:string)=>value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const stopWords=new Set('saya kami ingin mau butuh untuk dan atau di ke yang apa jasa izin perizinan mengurus pengurusan i we need want for a the and to my business permit permits'.split(' '));
const intents=[
 {words:['bangun','membangun','construction','construct','building','renovasi','renovation'],ids:['pbg-imb','slf','kkpr','krk']},
 {words:['gudang','warehouse','logistik','logistics'],ids:['pbg-imb','slf','kkpr','andalalin','inrit']},
 {words:['papan','signage','billboard','neon','banner','advertising','spanduk'],ids:['pajak-reklame','izin-reklame','pbg-reklame']},
 {words:['toko','outlet','retail','cabang','branch'],ids:['izin-reklame','pajak-reklame','manajemen-reklame-multi-lokasi','slf']},
 {words:['limbah','wastewater','ipalc','ipal'],ids:['pertek-air-limbah','slo-lingkungan','ukl-upl']},
 {words:['asap','emission','emissions','emisi'],ids:['pertek-emisi','slo-lingkungan']},
 {words:['laporan','pelaporan','reporting','monitoring'],ids:['rkl-rpl']},
 {words:['lahan','tanah','zoning','land','lokasi','location'],ids:['kkpr','krk','ippr','ippt']},
 {words:['keamanan','security','data'],ids:['sertifikasi-iso-27001']},
 {words:['mutu','quality'],ids:['sertifikasi-iso-9001']},
 {words:['pangan','food'],ids:['sertifikasi-iso-22000']},
 {words:['keselamatan','safety','k3'],ids:['sertifikasi-iso-45001']},
 {words:['laboratorium','laboratory','lab'],ids:['akreditasi-iso-17025','akreditasi-iso-15189']},
];
export interface SearchEntry{id:string;title:string;keywords:string}
export function serviceScore(entry:SearchEntry,query:string):number{
 const normalized=normalizeSearch(query),terms=normalized.split(' ').filter(t=>t.length>1&&!stopWords.has(t));
 if(!terms.length)return 0;
 const title=normalizeSearch(entry.title),keywords=normalizeSearch(entry.keywords),digits=terms.filter(t=>/^\d+$/.test(t));
 // Standards and numbered classifications should not recommend a different number.
 if((terms.includes('iso')||terms.includes('iec'))&&digits.some(t=>!keywords.split(' ').includes(t)))return 0;
 const exact=title.includes(normalized)?100:0;
 const titleHits=terms.filter(t=>title.includes(t)).length;
 const hits=terms.filter(t=>keywords.includes(t)).length;
 const intentHits=intents.filter(x=>x.ids.includes(entry.id)&&terms.some(t=>x.words.includes(t))).length;
 return exact+titleHits*18+hits*3+intentHits*12;
}
