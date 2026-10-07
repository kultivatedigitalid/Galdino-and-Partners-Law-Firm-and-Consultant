import {serviceActivityImage} from './service-images';
import {serviceStockImages} from './service-stock-images';
import {SERVICES} from './services';
import {experienceImages} from './experience-images';
import type {BlogEntry} from '../utils/blog';

export function blogImage(post:BlogEntry){
 const service=SERVICES.find(entry=>entry.id===post.data.services[0]);
 return service?(serviceStockImages[service.id]?.image||serviceActivityImage(service).image):experienceImages.compliance;
}
