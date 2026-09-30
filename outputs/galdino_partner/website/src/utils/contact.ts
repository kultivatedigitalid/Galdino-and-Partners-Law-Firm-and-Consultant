export const LIMITS = {name:100,email:160,whatsapp:24,company:140,service:80,location:160,message:3000,website:200} as const;
export type ContactPayload = Record<keyof typeof LIMITS,string> & {consent:boolean;locale:'id'|'en'};
export function parseContactPayload(form:FormData):ContactPayload {
 const fields = Object.fromEntries(Object.keys(LIMITS).map(key => [key, typeof form.get(key)==='string' ? String(form.get(key)).normalize('NFKC').replace(/[\u0000-\u001F\u007F]/g,' ').replace(/\s+/g,' ').trim() : ''])) as Record<keyof typeof LIMITS,string>;
 fields.email=fields.email.toLowerCase();
 return {...fields,consent:form.get('consent')==='true',locale:form.get('locale')==='en'?'en':'id'};
}
export function validateContact(p:ContactPayload, serviceIds:string[]=[]){
 const errors:string[]=[];
 for(const [key,max] of Object.entries(LIMITS)) if(p[key as keyof typeof LIMITS].length>max) errors.push(key);
 if(p.name.length<2) errors.push('name');
 if(!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/.test(p.email)) errors.push('email');
 if(!/^\+?[\d ()-]+$/.test(p.whatsapp)||p.whatsapp.replace(/\D/g,'').length<8||p.whatsapp.replace(/\D/g,'').length>15) errors.push('whatsapp');
 if(p.company.length<2) errors.push('company');
 if(p.location.length<2) errors.push('location');
 if(p.service.length<2||(serviceIds.length&&!serviceIds.includes(p.service))) errors.push('service');
 if(p.message.length<20) errors.push('message');
 if(!p.consent) errors.push('consent');
 return [...new Set(errors)];
}
export const escapeHtml=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]!);
