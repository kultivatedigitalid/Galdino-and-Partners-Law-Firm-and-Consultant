import type {APIRoute} from 'astro';
import nodemailer from 'nodemailer';
import {isIP} from 'node:net';
import {createContactHandler} from '../../server/contact-handler';
import {SERVICES} from '../../data/services';
export const prerender=false;
const env=(key:string)=>process.env[key]||import.meta.env[key]||'';
const deliver=async(message:{subject:string;replyTo:string;text:string;html:string})=>{
 const localTest=env('CONTACT_TEST_MODE')==='true'&&/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(env('CONTACT_ORIGIN'));
 if(localTest){await nodemailer.createTransport({streamTransport:true,buffer:true}).sendMail({from:'test@example.test',to:'sink@example.test',...message});return;}
 if(!['SMTP_HOST','SMTP_PORT','SMTP_USER','SMTP_PASSWORD','CONTACT_FROM_EMAIL','CONTACT_TO_EMAIL'].every(k=>env(k))) throw new Error('Delivery unavailable');
 const port=Number(env('SMTP_PORT'));if(![465,587].includes(port))throw new Error('Delivery unavailable');
 const transport=nodemailer.createTransport({host:env('SMTP_HOST'),port,secure:port===465,requireTLS:port===587,
 auth:{user:env('SMTP_USER'),pass:env('SMTP_PASSWORD')},connectionTimeout:10000,socketTimeout:15000,
 logger:false,debug:false,tls:{minVersion:'TLSv1.2'},disableFileAccess:true,disableUrlAccess:true});
 const sent=await transport.sendMail({from:env('CONTACT_FROM_EMAIL'),to:env('CONTACT_TO_EMAIL'),...message});
 if(!sent.accepted?.length)throw new Error('Delivery unavailable');
};
let handler:ReturnType<typeof createContactHandler>|undefined;
export const ALL:APIRoute=({request,clientAddress,url})=>{
 const origin=env('CONTACT_ORIGIN')||(import.meta.env.DEV?url.origin:'https://galdino.co.id');
 handler ||= createContactHandler({deliver,serviceIds:[...SERVICES.map(s=>s.id),'other'],origin});
 const trustedHeader=env('TRUST_PROXY_IP_HEADER').toLowerCase();
 const forwarded=trustedHeader?request.headers.get(trustedHeader)?.split(',').at(-1)?.trim():'';
 return handler(request,forwarded&&isIP(forwarded)?forwarded:clientAddress||'unknown');
};