import type { Locale } from './site';

export interface HomeService {
  slug: string;
  title: string;
  description: string;
  price: string;
}

export const HOME_SERVICES: Record<Locale, HomeService[]> = {
  id: [
    { slug: 'pendirian-pt-cv', title: 'Pendirian PT & CV', description: 'Penentuan bentuk usaha, persiapan dokumen, dan koordinasi proses pendirian.', price: '[PLACEHOLDER HARGA]' },
    { slug: 'pendirian-pt-pma', title: 'Pendirian PT PMA', description: 'Pendampingan struktur investasi, dokumen korporasi, dan legalitas awal perusahaan.', price: '[PLACEHOLDER HARGA]' },
    { slug: 'nib-oss-rba', title: 'NIB & OSS-RBA', description: 'Pemetaan KBLI, tingkat risiko, dan pengurusan identitas usaha melalui OSS-RBA.', price: '[PLACEHOLDER HARGA]' },
    { slug: 'sertifikat-standar', title: 'Sertifikat Standar Usaha', description: 'Identifikasi kewajiban, dokumen pendukung, dan pengawalan pemenuhan standar usaha.', price: 'Estimasi setelah asesmen' },
    { slug: 'izin-sektoral', title: 'Perizinan Sektoral', description: 'Pemetaan dan pengurusan izin khusus sesuai sektor, skala, dan aktivitas bisnis.', price: 'Estimasi setelah asesmen' },
    { slug: 'kkpr-lokasi', title: 'KKPR & Persetujuan Lokasi', description: 'Pemeriksaan kebutuhan dan pendampingan dokumen kesesuaian pemanfaatan ruang.', price: 'Estimasi setelah asesmen' },
    { slug: 'lingkungan', title: 'Persetujuan Lingkungan', description: 'Pemetaan jalur SPPL, UKL-UPL, atau AMDAL bersama tenaga ahli terkait.', price: 'Estimasi setelah asesmen' },
    { slug: 'pbg-slf', title: 'PBG & SLF', description: 'Koordinasi dokumen bangunan dan pemenuhan persyaratan teknis yang relevan.', price: 'Estimasi setelah asesmen' },
    { slug: 'konstruksi', title: 'SBU & Perizinan Konstruksi', description: 'Pendampingan legalitas dan persyaratan badan usaha jasa konstruksi.', price: 'Estimasi setelah asesmen' },
    { slug: 'industri', title: 'Izin Industri & Manufaktur', description: 'Pemetaan izin operasional, lokasi, lingkungan, dan kewajiban sektor industri.', price: 'Estimasi setelah asesmen' },
    { slug: 'perdagangan', title: 'Izin Perdagangan & Distribusi', description: 'Pendampingan izin usaha, distribusi, dan persyaratan komoditas yang relevan.', price: 'Estimasi setelah asesmen' },
    { slug: 'perubahan-perseroan', title: 'Perubahan Data Perseroan', description: 'Koordinasi perubahan anggaran dasar, data perseroan, dan pembaruan legalitas.', price: '[PLACEHOLDER HARGA]' },
    { slug: 'lkpm', title: 'LKPM & Pelaporan Berkala', description: 'Pendampingan penyiapan data dan penyampaian laporan kegiatan penanaman modal.', price: '[PLACEHOLDER HARGA]' },
    { slug: 'haki', title: 'HAKI & Perlindungan Merek', description: 'Pemeriksaan awal dan koordinasi pendaftaran merek serta hak kekayaan intelektual.', price: '[PLACEHOLDER HARGA]' },
    { slug: 'proyek-investasi', title: 'Perizinan Proyek & Investasi', description: 'Regulatory mapping dan pengawalan perizinan proyek secara terkoordinasi.', price: 'Estimasi setelah asesmen' },
  ],
  en: [
    { slug: 'company-establishment', title: 'PT & CV Establishment', description: 'Entity selection, document preparation, and establishment process coordination.', price: '[PRICE PLACEHOLDER]' },
    { slug: 'foreign-investment-company', title: 'Foreign Investment Company', description: 'Investment structure, corporate documents, and initial business legality assistance.', price: '[PRICE PLACEHOLDER]' },
    { slug: 'business-identification', title: 'Business ID & OSS-RBA', description: 'Business classification, risk mapping, and registration through OSS-RBA.', price: '[PRICE PLACEHOLDER]' },
    { slug: 'business-standard', title: 'Business Standard Certificate', description: 'Requirement mapping, supporting documents, and standard fulfilment assistance.', price: 'Estimate after assessment' },
    { slug: 'sectoral-licence', title: 'Sectoral Licensing', description: 'Special licence mapping based on sector, scale, and business activity.', price: 'Estimate after assessment' },
    { slug: 'spatial-approval', title: 'Spatial & Location Approval', description: 'Requirement review and assistance for spatial-use conformity documents.', price: 'Estimate after assessment' },
    { slug: 'environmental-approval', title: 'Environmental Approval', description: 'SPPL, UKL-UPL, or AMDAL pathway mapping with relevant specialists.', price: 'Estimate after assessment' },
    { slug: 'building-approval', title: 'Building Approval & SLF', description: 'Coordination of building documents and applicable technical requirements.', price: 'Estimate after assessment' },
    { slug: 'construction-licensing', title: 'Construction Business Licensing', description: 'Business legality and construction-services requirement assistance.', price: 'Estimate after assessment' },
    { slug: 'industrial-licensing', title: 'Industrial & Manufacturing Licensing', description: 'Operational, spatial, environmental, and industrial obligation mapping.', price: 'Estimate after assessment' },
    { slug: 'trade-distribution', title: 'Trade & Distribution Licensing', description: 'Business, distribution, and relevant commodity licensing assistance.', price: 'Estimate after assessment' },
    { slug: 'corporate-changes', title: 'Corporate Data Changes', description: 'Corporate document changes and business legality updates.', price: '[PRICE PLACEHOLDER]' },
    { slug: 'investment-reporting', title: 'Investment Activity Reporting', description: 'Data preparation and investment activity report submission assistance.', price: '[PRICE PLACEHOLDER]' },
    { slug: 'intellectual-property', title: 'Trademark & IP Protection', description: 'Preliminary review and coordination of trademark and IP registration.', price: '[PRICE PLACEHOLDER]' },
    { slug: 'project-investment', title: 'Project & Investment Licensing', description: 'Coordinated regulatory mapping and project licensing assistance.', price: 'Estimate after assessment' },
  ],
};

type ClientLogoVariant = 'block' | 'round' | 'outline' | 'split' | 'serif' | 'wide';

export interface HomeClient {
  mark: string;
  name: string;
  sector: string;
  variant: ClientLogoVariant;
}

export const HOME_CLIENTS: Record<Locale, HomeClient[]> = {
  id: [
    { mark: 'AR', name: '[DUMMY] ARUNA', sector: 'Manufaktur', variant: 'block' },
    { mark: 'N+', name: '[DUMMY] NUSA', sector: 'Teknologi', variant: 'round' },
    { mark: 'PRM', name: '[DUMMY] PRIMA', sector: 'Perdagangan', variant: 'outline' },
    { mark: 'VX', name: '[DUMMY] VERTEX', sector: 'Konstruksi', variant: 'split' },
    { mark: 'LT', name: '[DUMMY] LINTAS', sector: 'Logistik', variant: 'serif' },
    { mark: 'KR', name: '[DUMMY] KARYA', sector: 'Properti', variant: 'wide' },
  ],
  en: [
    { mark: 'AR', name: '[DUMMY] ARUNA', sector: 'Manufacturing', variant: 'block' },
    { mark: 'N+', name: '[DUMMY] NUSA', sector: 'Technology', variant: 'round' },
    { mark: 'PRM', name: '[DUMMY] PRIMA', sector: 'Trade', variant: 'outline' },
    { mark: 'VX', name: '[DUMMY] VERTEX', sector: 'Construction', variant: 'split' },
    { mark: 'LT', name: '[DUMMY] LINTAS', sector: 'Logistics', variant: 'serif' },
    { mark: 'KR', name: '[DUMMY] KARYA', sector: 'Property', variant: 'wide' },
  ],
};

export const HOME_STATS: Record<Locale, Array<{ value: string; label: string }>> = {
  id: [
    { value: '[DATA]', label: 'Klien yang didampingi' },
    { value: '[DATA]', label: 'Izin diselesaikan' },
    { value: '[DATA]', label: 'Tahun pengalaman' },
    { value: '[DATA]', label: 'Tingkat keberhasilan terverifikasi' },
  ],
  en: [
    { value: '[DATA]', label: 'Clients assisted' },
    { value: '[DATA]', label: 'Licences completed' },
    { value: '[DATA]', label: 'Years of experience' },
    { value: '[DATA]', label: 'Verified success rate' },
  ],
};
