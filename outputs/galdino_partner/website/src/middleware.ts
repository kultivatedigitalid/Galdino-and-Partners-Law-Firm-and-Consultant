import {defineMiddleware} from 'astro:middleware';
import {SERVICES,serviceUrl} from './data/services';
import {SERVICE_GROUPS,categoryById,categoryUrl,groupUrl} from './data/service-catalog';
const legacyRoutes=new Map<string,string>();
for(const locale of ['id','en'] as const){
 legacyRoutes.set('/'+locale+'/profile/how-we-work/','/'+locale+'/#process-title');
 for(const group of SERVICE_GROUPS){
  const oldGroup=categoryUrl(categoryById(group.category),locale)+group.slug[locale]+'/';
  legacyRoutes.set(oldGroup,groupUrl(group,locale));
  for(const service of SERVICES.filter(s=>s.group===group.id)){
   legacyRoutes.set(oldGroup+service.slug[locale].split('/').at(-1)+'/',serviceUrl(service,locale));
  }
 }
}
export const onRequest=defineMiddleware((context,next)=>{
 const target=legacyRoutes.get(context.url.pathname.replace(/\/?$/,'/'));
 if(!target)return next();
 const destination=new URL(target,context.url);
 destination.search=context.url.search;
 return context.redirect(destination.pathname+destination.search+destination.hash,301);
});
