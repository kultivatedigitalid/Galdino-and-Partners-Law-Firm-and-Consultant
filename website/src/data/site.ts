export type Locale = 'id' | 'en';

export const SITE = {
  legalName: '[PLACEHOLDER — NAMA LEGAL PERUSAHAAN]',
  displayName: 'Galdino & Partner',
  shortName: 'G&P',
  domain: 'https://example-legal-domain.com',
  address: '[PLACEHOLDER — ALAMAT KANTOR RESMI]',
  registration: '[PLACEHOLDER — NOMOR REGISTRASI / LEGAL]',
  whatsappDisplay: '+62 821-2592-4637',
  whatsappHref: 'https://wa.me/6282125924637',
  email: 'kultivatedigitalid@gmail.com',
  privacyStatus: '[PLACEHOLDER — KEBIJAKAN PRIVASI MENUNGGU REVIEW]',
  termsStatus: '[PLACEHOLDER — SYARAT & KETENTUAN MENUNGGU REVIEW]',
} as const;

export const NAV = {
  id: [
    { href: '/id/profile/', label: 'Profil' },
    { href: '/id/services/', label: 'Layanan' },
    { href: '/id/projects/', label: 'Pengalaman' },
    { href: '/id/blog/', label: 'Insight' },
    { href: '/id/contact/', label: 'Kontak' },
  ],
  en: [
    { href: '/en/profile/', label: 'Profile' },
    { href: '/en/services/', label: 'Services' },
    { href: '/en/projects/', label: 'Experience' },
    { href: '/en/blog/', label: 'Insights' },
    { href: '/en/contact/', label: 'Contact' },
  ],
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
    consult: 'Book a Consultation',
    servicesCta: 'View Services',
    footerSummary: 'A legal and regulatory partner helping businesses understand, secure, and maintain licensing compliance.',
    legal: 'Information on this website is general and does not constitute legal advice for a specific matter.',
  },
} as const;

export const SERVICES = {
  id: [
    { number: '01', title: 'Pendirian & Legalitas Usaha', description: 'Pendampingan struktur badan usaha, dokumen korporasi, NIB, dan fondasi legal operasional.' },
    { number: '02', title: 'Perizinan Berbasis Risiko', description: 'Pemetaan KBLI, tingkat risiko, persyaratan OSS-RBA, serta izin sektoral yang relevan.' },
    { number: '03', title: 'Kepatuhan & Legal Advisory', description: 'Review kepatuhan berkala, identifikasi risiko regulasi, dan dukungan hukum untuk keputusan bisnis.' },
    { number: '04', title: 'Perizinan Proyek & Investasi', description: 'Koordinasi dokumen dan jalur perizinan untuk ekspansi, proyek, serta aktivitas investasi.' },
  ],
  en: [
    { number: '01', title: 'Business Establishment & Legality', description: 'Guidance on entity structure, corporate documents, business identification, and legal foundations.' },
    { number: '02', title: 'Risk-Based Licensing', description: 'Business classification, risk-level mapping, OSS-RBA requirements, and relevant sectoral licences.' },
    { number: '03', title: 'Compliance & Legal Advisory', description: 'Periodic compliance review, regulatory risk identification, and legal support for business decisions.' },
    { number: '04', title: 'Project & Investment Licensing', description: 'Document and licensing pathway coordination for expansion, projects, and investment activities.' },
  ],
} as const;

export const PROJECTS = {
  id: [
    { type: 'Perizinan usaha', title: '[PLACEHOLDER — Pengurusan legalitas dan izin operasional perusahaan]', outcome: 'Ruang lingkup, industri, periode, dan hasil menunggu persetujuan publikasi.' },
    { type: 'Legal advisory', title: '[PLACEHOLDER — Review kepatuhan regulasi untuk ekspansi bisnis]', outcome: 'Detail pengalaman akan ditambahkan setelah verifikasi kerahasiaan klien.' },
    { type: 'Investasi', title: '[PLACEHOLDER — Pendampingan perizinan proyek investasi]', outcome: 'Nilai proyek dan identitas pihak terkait tidak ditampilkan sebelum disetujui.' },
  ],
  en: [
    { type: 'Business licensing', title: '[PLACEHOLDER — Corporate legality and operational licensing engagement]', outcome: 'Scope, industry, period, and outcome await publication approval.' },
    { type: 'Legal advisory', title: '[PLACEHOLDER — Regulatory compliance review for business expansion]', outcome: 'Experience details will be added after client-confidentiality verification.' },
    { type: 'Investment', title: '[PLACEHOLDER — Investment project licensing assistance]', outcome: 'Project value and related party identities remain unpublished pending approval.' },
  ],
} as const;

export const SERVICE_OPTIONS = {
  id: ['Pendirian & legalitas usaha', 'Perizinan berbasis risiko', 'Kepatuhan & legal advisory', 'Perizinan proyek & investasi', 'Kebutuhan lain'],
  en: ['Business establishment & legality', 'Risk-based licensing', 'Compliance & legal advisory', 'Project & investment licensing', 'Other requirement'],
} as const;
