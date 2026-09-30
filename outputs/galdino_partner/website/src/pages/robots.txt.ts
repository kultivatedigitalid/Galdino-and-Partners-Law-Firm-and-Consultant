import type {APIRoute} from 'astro';
import {canIndex} from '../data/launch';
export const GET:APIRoute=({site})=>new Response('User-agent: *\n'+(canIndex(site)?'Allow: /\nDisallow: /api/\nSitemap: '+new URL('sitemap-index.xml',site):'Disallow: /')+'\n',{headers:{'Content-Type':'text/plain; charset=utf-8'}});
