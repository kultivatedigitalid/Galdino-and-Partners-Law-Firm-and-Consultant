import type { Locale } from './site';
import { SITE } from './site';

export interface ProfileMember {
  slug: string;
  imageKey: 'kelvin' | 'maria' | 'michael';
  name: string;
  role: string;
  credentials: string;
  email: string;
  phone: string;
  domicile: string;
  summary: string;
  expertise: string[];
  imageAlt: string;
}

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
      title: 'Tim hukum dibelakang perizinan Anda.',
      lead: 'Kami memetakan regulasi, menyiapkan dokumen, dan mengawal proses izin sesuai kebutuhan bisnis Anda.',
      cta: 'Kenali tim kami',
      imageAlt: 'Lima profesional hukum dan perizinan Indonesia dalam komposisi editorial merah, hitam, dan putih',
      imagePlaceholder: '[VISUAL KONSEP: GANTI DENGAN FOTO TIM RESMI]',
    },
    company: {
      context: 'Tentang Perusahaan',
      titleLines: ['Kami Hadir Membantu', 'Bisnis Anda'],
      paragraphs: [
        'Beroperasi sejak [PLACEHOLDER: TAHUN BERDIRI], perusahaan membangun rekam jejak dalam kebutuhan legalitas dan perizinan bisnis yang akan dipublikasikan setelah verifikasi. Visi kami adalah membuat proses izin lebih jelas, tertib, dan dapat ditelusuri, dengan ketelitian hukum, komunikasi progres, dan fokus pada penyelesaian sebagai nilai pembeda.',
        'Galdino & Partner membantu bisnis memahami kewajiban, menyiapkan legalitas, dan menavigasi perizinan berdasarkan aktivitas, tingkat risiko, sektor, serta tujuan operasional. Pendampingan mencakup pemetaan kebutuhan, penyiapan dokumen, koordinasi proses, dan pemantauan progres izin.',
      ],
      factsTitle: 'Identitas perusahaan',
      facts: [
        { label: 'Nama legal', value: SITE.legalName },
        { label: 'Beroperasi sejak', value: '[PLACEHOLDER: TAHUN BERDIRI]' },
        { label: 'Registrasi', value: SITE.registration },
        { label: 'Alamat kantor', value: SITE.address },
      ],
    },
    team: {
      context: 'Tim kami',
      title: 'Tim yang menangani kebutuhan izin Anda.',
      intro: 'Kenali fokus keahlian tim yang mendampingi kebutuhan legalitas dan perizinan bisnis Anda.',
      profileAction: 'Lihat profil',
      members: [
        {
          slug: 'kelvin-anata-lian',
          imageKey: 'kelvin',
          name: 'Kelvin Anata Lian',
          role: 'Partner, Perizinan Korporasi',
          credentials: '[PLACEHOLDER: KREDENSIAL PROFESIONAL]',
          email: '[PLACEHOLDER: EMAIL PROFESIONAL]',
          phone: '[PLACEHOLDER: NOMOR TELEPON PROFESIONAL]',
          domicile: '[PLACEHOLDER: DOMISILI / KANTOR]',
          summary: 'Menangani struktur badan usaha, dokumen korporasi, dan kesiapan legal operasional.',
          expertise: ['Pendirian & legalitas usaha', 'Struktur korporasi', 'Perizinan awal'],
          imageAlt: 'Portrait konsep Kelvin Anata Lian, Partner Perizinan Korporasi',
        },
        {
          slug: 'maria-indah-putri',
          imageKey: 'maria',
          name: 'Maria Indah Putri',
          role: 'Senior Consultant, OSS-RBA',
          credentials: '[PLACEHOLDER: KREDENSIAL PROFESIONAL]',
          email: '[PLACEHOLDER: EMAIL PROFESIONAL]',
          phone: '[PLACEHOLDER: NOMOR TELEPON PROFESIONAL]',
          domicile: '[PLACEHOLDER: DOMISILI / KANTOR]',
          summary: 'Menangani pemetaan KBLI, risiko OSS-RBA, dan koordinasi izin sektoral.',
          expertise: ['OSS-RBA', 'KBLI & tingkat risiko', 'Izin sektoral'],
          imageAlt: 'Portrait konsep Maria Indah Putri, Senior Consultant OSS-RBA',
        },
        {
          slug: 'michael-alvaro',
          imageKey: 'michael',
          name: 'Michael Alvaro',
          role: 'Legal Consultant, Compliance',
          credentials: '[PLACEHOLDER: KREDENSIAL PROFESIONAL]',
          email: '[PLACEHOLDER: EMAIL PROFESIONAL]',
          phone: '[PLACEHOLDER: NOMOR TELEPON PROFESIONAL]',
          domicile: '[PLACEHOLDER: DOMISILI / KANTOR]',
          summary: 'Menangani kepatuhan regulasi serta kebutuhan izin proyek dan investasi.',
          expertise: ['Kepatuhan regulasi', 'Perizinan proyek', 'Dukungan investasi'],
          imageAlt: 'Portrait konsep Michael Alvaro, Legal Consultant bidang kepatuhan',
        },
      ],
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
      imagePlaceholder: '[CONCEPT VISUAL: REPLACE WITH THE OFFICIAL TEAM PHOTO]',
    },
    company: {
      context: 'About the Company',
      titleLines: ['Here to Help', 'Your Business'],
      paragraphs: [
        'Operating since [PLACEHOLDER: YEAR ESTABLISHED], the firm is building a track record in business legality and licensing that will be published after verification. Our vision is to make permits clearer, orderly, and traceable, with legal precision, progress communication, and a focus on resolution as our differentiating values.',
        'Galdino & Partner helps businesses understand obligations, prepare legal foundations, and navigate licensing around the activity, risk level, sector, and operational objective. Support covers requirement mapping, document preparation, process coordination, and permit-progress monitoring.',
      ],
      factsTitle: 'Company identity',
      facts: [
        { label: 'Legal name', value: SITE.legalName },
        { label: 'Operating since', value: '[PLACEHOLDER: YEAR ESTABLISHED]' },
        { label: 'Registration', value: SITE.registration },
        { label: 'Office address', value: SITE.address },
      ],
    },
    team: {
      context: 'Our team',
      title: 'The team handling your permit needs.',
      intro: 'Meet the expertise behind the team supporting your business legality and licensing needs.',
      profileAction: 'View profile',
      members: [
        {
          slug: 'kelvin-anata-lian',
          imageKey: 'kelvin',
          name: 'Kelvin Anata Lian',
          role: 'Partner, Corporate Licensing',
          credentials: '[PLACEHOLDER: PROFESSIONAL CREDENTIALS]',
          email: '[PLACEHOLDER: PROFESSIONAL EMAIL]',
          phone: '[PLACEHOLDER: PROFESSIONAL PHONE NUMBER]',
          domicile: '[PLACEHOLDER: DOMICILE / OFFICE]',
          summary: 'Handles business structures, corporate documents, and operational legal readiness.',
          expertise: ['Business establishment', 'Corporate structure', 'Initial licensing'],
          imageAlt: 'Concept portrait of Kelvin Anata Lian, Corporate Licensing Partner',
        },
        {
          slug: 'maria-indah-putri',
          imageKey: 'maria',
          name: 'Maria Indah Putri',
          role: 'Senior Consultant, OSS-RBA',
          credentials: '[PLACEHOLDER: PROFESSIONAL CREDENTIALS]',
          email: '[PLACEHOLDER: PROFESSIONAL EMAIL]',
          phone: '[PLACEHOLDER: PROFESSIONAL PHONE NUMBER]',
          domicile: '[PLACEHOLDER: DOMICILE / OFFICE]',
          summary: 'Handles business classification, OSS-RBA risk mapping, and sectoral permit coordination.',
          expertise: ['OSS-RBA', 'Classification & risk', 'Sectoral permits'],
          imageAlt: 'Concept portrait of Maria Indah Putri, Senior OSS-RBA Consultant',
        },
        {
          slug: 'michael-alvaro',
          imageKey: 'michael',
          name: 'Michael Alvaro',
          role: 'Legal Consultant, Compliance',
          credentials: '[PLACEHOLDER: PROFESSIONAL CREDENTIALS]',
          email: '[PLACEHOLDER: PROFESSIONAL EMAIL]',
          phone: '[PLACEHOLDER: PROFESSIONAL PHONE NUMBER]',
          domicile: '[PLACEHOLDER: DOMICILE / OFFICE]',
          summary: 'Handles regulatory compliance and project and investment licensing needs.',
          expertise: ['Regulatory compliance', 'Project licensing', 'Investment support'],
          imageAlt: 'Concept portrait of Michael Alvaro, Legal Consultant in regulatory compliance',
        },
      ],
    },
  },
};