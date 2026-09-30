import type { Locale } from './site';
import { SITE } from './site';

import {PEOPLE, type ProfileMember} from './people';
export type {ProfileMember} from './people';

interface ProfileContent {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    context: string;
    title: string;
    lead: string;
    cta: string;
    imageAlt: string;
    imagePlaceholder: string;
  };
  company: {
    context: string;
    titleLines: [string, string];
    paragraphs: string[];
    factsTitle: string;
    facts: Array<{ label: string; value: string }>;
  };
  team: {
    context: string;
    title: string;
    intro: string;
    profileAction: string;
    members: ProfileMember[];
  };
}

export const PROFILE_CONTENT: Record<Locale, ProfileContent> = {
  id: {
    seo: {
      title: 'Profil Tim Hukum & Perizinan | Galdino & Partner',
      description: 'Kenali tim, pendekatan, dan keahlian Galdino & Partner dalam pengurusan perizinan usaha, legalitas, OSS-RBA, serta kepatuhan bisnis.',
    },
    hero: {
      context: 'Tentang Kami',
      title: 'Tim hukum di belakang perizinan Anda.',
      lead: 'Kami memetakan regulasi, menyiapkan dokumen, dan mengawal proses izin sesuai kebutuhan bisnis Anda.',
      cta: 'Kenali tim kami',
      imageAlt: 'Lima profesional hukum dan perizinan Indonesia dalam komposisi editorial merah, hitam, dan putih',
      imagePlaceholder: 'Legal & Licensing Consultant',
    },
    company: {
      context: 'Tentang Perusahaan',
      titleLines: ['Kami Hadir Membantu', 'Bisnis Anda'],
      paragraphs: [
        'Beroperasi sejak 2015, kami mendampingi bisnis dalam menata legalitas dan kebutuhan perizinan. Visi kami adalah membuat proses izin lebih jelas, tertib, dan dapat ditelusuri, dengan ketelitian hukum, komunikasi progres, dan fokus pada penyelesaian sebagai nilai pembeda.',
        'Galdino & Partner membantu bisnis memahami kewajiban, menyiapkan legalitas, dan menavigasi perizinan berdasarkan aktivitas, tingkat risiko, sektor, serta tujuan operasional. Pendampingan mencakup pemetaan kebutuhan, penyiapan dokumen, koordinasi proses, dan pemantauan progres izin.',
      ],
      factsTitle: 'Identitas perusahaan',
      facts: [
        { label: 'Nama legal', value: SITE.legalName },
        { label: 'Beroperasi sejak', value: '2015' },
        { label: 'Fokus layanan', value: SITE.registration },
        { label: 'Alamat kantor', value: SITE.address },
      ],
    },
    team: {
      context: 'Tim kami',
      title: 'Tim yang menangani kebutuhan izin Anda.',
      intro: 'Kenali fokus keahlian tim yang mendampingi kebutuhan legalitas dan perizinan bisnis Anda.',
      profileAction: 'Lihat profil',
      members: PEOPLE.id,
    },
  },
  en: {
    seo: {
      title: 'Legal & Licensing Team Profile | Galdino & Partner',
      description: 'Meet the Galdino & Partner team and learn about its approach to business licensing, company legality, OSS-RBA, and regulatory compliance.',
    },
    hero: {
      context: 'About Us',
      title: 'The legal team behind your permits.',
      lead: 'We map regulations, prepare documents, and guide the permit process around your business needs.',
      cta: 'Meet our team',
      imageAlt: 'Five Indonesian legal and licensing professionals in a red, black, and white editorial composition',
      imagePlaceholder: 'Legal & Licensing Consultant',
    },
    company: {
      context: 'About the Company',
      titleLines: ['Here to Help', 'Your Business'],
      paragraphs: [
        'Operating since 2015, we help businesses organise their legal and licensing requirements. Our vision is to make permits clearer, orderly, and traceable, with legal precision, progress communication, and a focus on resolution as our differentiating values.',
        'Galdino & Partner helps businesses understand obligations, prepare legal foundations, and navigate licensing around the activity, risk level, sector, and operational objective. Support covers requirement mapping, document preparation, process coordination, and permit-progress monitoring.',
      ],
      factsTitle: 'Company identity',
      facts: [
        { label: 'Legal name', value: SITE.legalName },
        { label: 'Operating since', value: '2015' },
        { label: 'Service focus', value: SITE.registration },
        { label: 'Office address', value: SITE.address },
      ],
    },
    team: {
      context: 'Our team',
      title: 'The team handling your permit needs.',
      intro: 'Meet the expertise behind the team supporting your business legality and licensing needs.',
      profileAction: 'View profile',
      members: PEOPLE.en,
    },
  },
};