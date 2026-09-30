import type {Locale} from './site';
import {SERVICES,priceLabel} from './services';
import {SERVICE_CATEGORIES} from './service-catalog';
export {HOME_STATS} from './stats';
const homeServices=(locale:Locale)=>SERVICE_CATEGORIES.map(c=>({slug:c.slug[locale],title:c.content[locale].title,description:c.content[locale].description,price:priceLabel({price:Math.min(...SERVICES.filter(s=>s.category===c.id).map(s=>s.price))},locale)}));
export const HOME_SERVICES={id:homeServices('id'),en:homeServices('en')};
type ClientLogoVariant = 'block' | 'round' | 'outline' | 'split' | 'serif' | 'wide';

export interface HomeClient {
  mark: string;
  name: string;
  sector: string;
  variant: ClientLogoVariant;
}

export const HOME_CLIENTS: Record<Locale, HomeClient[]> = {
  id: [
    { mark: 'AR', name: 'PT Aruna Pangan Nusantara', sector: 'Manufaktur', variant: 'block' },
    { mark: 'N+', name: 'PT Nusa Teknologi Integrasi', sector: 'Teknologi', variant: 'round' },
    { mark: 'PRM', name: 'PT Prima Distribusi Indonesia', sector: 'Perdagangan', variant: 'outline' },
    { mark: 'VX', name: 'PT Vertex Konstruksi Utama', sector: 'Konstruksi', variant: 'split' },
    { mark: 'LT', name: 'PT Lintas Logistik Nusantara', sector: 'Logistik', variant: 'serif' },
    { mark: 'KR', name: 'PT Karya Properti Sentosa', sector: 'Properti', variant: 'wide' },
  ],
  en: [
    { mark: 'AR', name: 'PT Aruna Pangan Nusantara', sector: 'Manufacturing', variant: 'block' },
    { mark: 'N+', name: 'PT Nusa Teknologi Integrasi', sector: 'Technology', variant: 'round' },
    { mark: 'PRM', name: 'PT Prima Distribusi Indonesia', sector: 'Trade', variant: 'outline' },
    { mark: 'VX', name: 'PT Vertex Konstruksi Utama', sector: 'Construction', variant: 'split' },
    { mark: 'LT', name: 'PT Lintas Logistik Nusantara', sector: 'Logistics', variant: 'serif' },
    { mark: 'KR', name: 'PT Karya Properti Sentosa', sector: 'Property', variant: 'wide' },
  ],
};
