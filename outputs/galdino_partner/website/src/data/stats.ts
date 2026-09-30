import type { Locale } from './site';
export const COMPANY_STATS = { founded: 2015, businesses: 84, matters: 126, industries: 8, provisional: true };
export const HOME_STATS: Record<Locale, Array<{value: string; label: string}>> = {
 id: [{value:'84',label:'Bisnis didampingi'},{value:'126',label:'Kebutuhan perizinan'},{value:String(new Date().getFullYear()-2015),label:'Tahun beroperasi'},{value:'8',label:'Sektor industri'}],
 en: [{value:'84',label:'Businesses assisted'},{value:'126',label:'Licensing matters'},{value:String(new Date().getFullYear()-2015),label:'Years operating'},{value:'8',label:'Industries supported'}]
};