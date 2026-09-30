type EventName='consultation_cta_click'|'whatsapp_click'|'service_search'|'service_view'|'service_related_click'|'article_view'|'article_service_click'|'contact_form_start'|'contact_form_submit'|'contact_form_success'|'language_switch';
type AnalyticsWindow=Window&{dataLayer?:unknown[];gpConsent?:boolean;gpAnalyticsLoaded?:boolean};
export function track(event:EventName,details:{entity_id?:string;result_count?:number}={}){
 const w=window as AnalyticsWindow;if(!w.gpConsent||!w.gpAnalyticsLoaded)return;
 const safe:Record<string,string|number>={event,language:document.documentElement.lang==='en'?'en':'id',page_path:location.pathname};
 if(details.entity_id&&/^[a-z0-9-]{1,90}$/.test(details.entity_id))safe.entity_id=details.entity_id;
 if(Number.isInteger(details.result_count)&&details.result_count!>=0)safe.result_count=details.result_count!;
 (w.dataLayer ||= []).push(safe);
}
export function setAnalyticsConsent(allowed:boolean){
 const w=window as AnalyticsWindow;w.gpConsent=allowed;
 const id=document.querySelector<HTMLElement>('[data-gtm]')?.dataset.gtm||'';
 if(!allowed||w.gpAnalyticsLoaded||!/^GTM-[A-Z0-9]+$/.test(id))return;
 w.dataLayer ||= [];
 // Basic consent mode: no Google request exists before affirmative consent.
 w.dataLayer.push({event:'consent_granted',analytics_storage:'granted',page_location:location.origin+location.pathname,page_referrer:document.referrer?new URL(document.referrer).origin:''});
 w.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
 const script=document.createElement('script');script.src='https://www.googletagmanager.com/gtm.js?id='+encodeURIComponent(id);script.async=true;script.id='gp-gtm';document.head.append(script);w.gpAnalyticsLoaded=true;
 const page=document.querySelector<HTMLElement>('[data-page-event]');if(page?.dataset.pageEvent)track(page.dataset.pageEvent as EventName,{entity_id:page.dataset.entity});
}
document.addEventListener('click',event=>{
 const a=(event.target as Element)?.closest<HTMLAnchorElement>('a');if(!a)return;
 const explicit=a.dataset.event as EventName|undefined;
 if(explicit){track(explicit,{entity_id:a.dataset.entity});return;}
 const href=new URL(a.href,location.href);
 if(a.hasAttribute('data-preserve-scroll'))track('language_switch');
 else if(href.hostname==='wa.me')track('whatsapp_click');
 else if(/^\/(id|en)\/contact\/$/.test(href.pathname))track('consultation_cta_click');
});
