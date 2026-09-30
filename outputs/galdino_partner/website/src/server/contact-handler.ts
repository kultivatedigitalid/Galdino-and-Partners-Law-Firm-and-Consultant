import {createHmac,randomBytes} from 'node:crypto';
import {escapeHtml,LIMITS,parseContactPayload,validateContact} from '../utils/contact';
type Deliver=(message:{subject:string;replyTo:string;text:string;html:string})=>Promise<void>;
export function createContactHandler({deliver,serviceIds,origin,now=Date.now}:{deliver:Deliver;serviceIds:string[];origin:string;now?:()=>number}){
 const buckets=new Map<string,{count:number;until:number;last:number}>();
 const salt=randomBytes(32); let globalCount=0,globalUntil=0;
 const reply=(status:number,message:string,extra:object={})=>new Response(JSON.stringify({message,...extra}),{status,headers:{
 'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',
 ...(status===405?{Allow:'POST'}:{}),...(status===429?{'Retry-After':'60'}:{})}});
 return async(request:Request,ip:string)=>{
  if(request.method!=='POST') return reply(405,'Method not allowed.');
  if(request.headers.get('origin')!==origin||request.headers.get('sec-fetch-site')==='cross-site') return reply(403,'Invalid request origin.');
  const type=request.headers.get('content-type')||'';
  if(!/^(multipart\/form-data;|application\/x-www-form-urlencoded(?:;|$))/i.test(type)) return reply(415,'Unsupported content type.');
  const time=now();
  for(const [key,b] of buckets) if(b.until<=time) buckets.delete(key);
  const key=createHmac('sha256',salt).update(ip).digest('hex');
  const b=buckets.get(key)||{count:0,until:time+900_000,last:-Infinity};
  if(time>=globalUntil){globalCount=0;globalUntil=time+60_000;}
  if(++globalCount>60||buckets.size>=10_000||++b.count>5||time-b.last<10_000) return reply(429,'Terlalu banyak permintaan. Coba lagi nanti / Too many requests. Please try later.');
  b.last=time;buckets.set(key,b);
  const reader=request.body?.getReader();
  if(!reader) return reply(400,'Form data is required.');
  let size=0; const chunks:Uint8Array[]=[];
  try{
   while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>24000){await reader.cancel();return reply(413,'Form data is too large.');}chunks.push(value);}
   const bytes=new Uint8Array(size);let offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.length;}
   const form=await new Response(bytes,{headers:{'Content-Type':type}}).formData();
   for(const [field,value] of form) if(typeof value!=='string'||form.getAll(field).length!==1) return reply(422,'Invalid form fields.');
   for(const [field,max] of Object.entries(LIMITS)) if(String(form.get(field)||'').length>max) return reply(422,'Field too long.',{fields:[field]});
   const p=parseContactPayload(form);
   if(p.website) return reply(200,'Thank you.');
   const errors=validateContact(p,serviceIds);
   if(errors.length) return reply(422,p.locale==='id'?'Periksa kembali data formulir.':'Please review your form.',{fields:errors});
   const entries=Object.entries(p).filter(([k])=>k!=='website');
   try{
    await deliver({subject:'Galdino — consultation request',replyTo:p.email,
     text:entries.map(([k,v])=>k+': '+v).join('\n'),
     html:'<h1>Consultation request</h1>'+entries.map(([k,v])=>'<p><b>'+k+':</b> '+escapeHtml(String(v))+'</p>').join('')});
   }catch{return reply(503,p.locale==='id'?'Pesan belum terkirim. Silakan coba kembali, gunakan WhatsApp, atau email.':'Your message was not sent. Please retry, use WhatsApp, or email.');}
   return reply(200,p.locale==='id'?'Permintaan diterima.':'Request received.');
  }catch{return reply(400,'Form data could not be read.');}
 };
}