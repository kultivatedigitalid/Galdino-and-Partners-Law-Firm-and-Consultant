import { CONTACT } from './contact';
export type Locale = 'id' | 'en';

export const SITE = {
  legalName: 'PT Karya Lintas Generasi',
  displayName: 'Galdino & Partner',
  shortName: 'G&P',
  domain: 'https://galdino.co.id',
  address: CONTACT.address,
  registration: 'Legal & Licensing Consultant',
  whatsappDisplay: CONTACT.phone,
  whatsappHref: CONTACT.whatsapp,
  email: CONTACT.email,
} as const;

export const NAV = {
 id:[{href:'/id/',label:'Home'},{href:'/id/services/',label:'Layanan'},{href:'/id/industries/',label:'Industri'},{href:'/id/projects/',label:'Our Experiences'},{href:'/id/blog/',label:'Insight'},{href:'/id/profile/',label:'About Us'}],
 en:[{href:'/en/',label:'Home'},{href:'/en/services/',label:'Services'},{href:'/en/industries/',label:'Industries'},{href:'/en/projects/',label:'Our Experiences'},{href:'/en/blog/',label:'Insights'},{href:'/en/profile/',label:'About Us'}]
} as const;

export const COPY = {
  id: {
    skip: 'Lewati ke konten utama',
    consult: 'Jadwalkan Konsultasi',
    servicesCta: 'Lihat Layanan',
    footerSummary: 'Mitra hukum dan regulasi untuk membantu bisnis memahami, memperoleh, dan menjaga kepatuhan perizinan.',
    legal: 'Informasi pada situs ini bersifat umum dan bukan nasihat hukum untuk perkara tertentu.',
  },
  en: {
    skip: 'Skip to main content',
    consult: 'Schedule a Consultation',
    servicesCta: 'View Services',
    footerSummary: 'A legal and regulatory partner helping businesses understand, secure, and maintain licensing compliance.',
    legal: 'Information on this website is general and does not constitute legal advice for a specific matter.',
  },
} as const;
