import type {Locale} from './site';

// Short display headlines keep hero copy to two desktop lines. The complete
// editorial titles remain in article metadata, listings and structured data.
export const ARTICLE_HEADLINES:Record<string,Record<Locale,string>>={
 'corporate-data-updates':{id:'Kapan Data Perseroan Perlu Diperbarui?',en:'When to Update Corporate Records'},
 'pbg-slf-explained':{id:'PBG dan SLF: Apa Bedanya?',en:'PBG and SLF: What Is the Difference?'},
 'business-standards':{id:'Memahami Sertifikat Standar OSS-RBA',en:'Understanding OSS-RBA Standard Certificates'},
 'choosing-kbli':{id:'Memilih KBLI yang Tepat',en:'Choosing the Right KBLI'},
 'lkpm-preparation':{id:'LKPM: Kewajiban dan Persiapannya',en:'LKPM: Reporting and Preparation'},
 'environmental-readiness':{id:'Kapan Persetujuan Lingkungan Dibutuhkan?',en:'When Is Environmental Approval Needed?'},
 'amdal-versus-uklupl':{id:'AMDAL vs UKL-UPL',en:'AMDAL vs UKL-UPL'},
 'expansion-legality-checklist':{id:'Checklist Legalitas untuk Ekspansi',en:'A Legality Checklist for Expansion'},
 'what-is-pbg':{id:'Apa Itu PBG?',en:'What Is PBG?'},
 'after-nib-issued':{id:'Kewajiban Setelah NIB Terbit',en:'Your Obligations After NIB'},
 'pbg-versus-imb':{id:'PBG vs IMB: Memahami Dokumen Lama',en:'PBG vs IMB: Understanding Older Records'},
 'risk-based-licensing':{id:'Memahami Perizinan Berbasis Risiko',en:'Understanding Risk-Based Licensing'},
 'slf-requirements':{id:'Syarat SLF: Dokumen dan Kesiapan',en:'SLF: Documents and Readiness'},
 'kkpr-timing':{id:'Berapa Lama Mengurus KKPR?',en:'How Long Does KKPR Take?'}
};

export const EXPERIENCE_HEADLINES:Record<string,Record<Locale,string>>={
 'aruna-pangan':{id:'UKL-UPL untuk Ekspansi Fasilitas',en:'UKL-UPL for Facility Expansion'},
 'nusa-teknologi':{id:'Kesiapan Keamanan Informasi',en:'Information-Security Readiness'},
 'prima-distribusi':{id:'Data Pajak Reklame Lintas Outlet',en:'Advertising Tax Across Outlets'},
 'vertex-konstruksi':{id:'Kesiapan Badan Usaha Konstruksi',en:'Construction-Business Readiness'},
 'lintas-logistik':{id:'Kelaikan dan Akses Fasilitas Gudang',en:'Warehouse Fitness and Access'},
 'karya-properti':{id:'PBG: Rencana dan Dokumen Tapak',en:'PBG: Plans and Site Documents'}
};
