import aboutBackdrop from '../assets/hero-about-layered-backdrop.webp';
import aboutCutout from '../assets/hero-about-layered-cutout-v3.webp';
import insightsBackdrop from '../assets/hero-insights-layered-backdrop.webp';
import insightsCutout from '../assets/hero-insights-layered-cutout.webp';
import servicesBackdrop from '../assets/hero-services-layered-backdrop-v3.webp';
import servicesCutout from '../assets/hero-services-layered-cutout-v3.webp';
import industriesBackdrop from '../assets/hero-industries-layered-backdrop.webp';
import industriesCutout from '../assets/hero-industries-layered-cutout.webp';
import experiencesBackdrop from '../assets/hero-experiences-layered-backdrop.webp';
import experiencesCutout from '../assets/hero-experiences-layered-cutout.webp';

// Source-space framing excludes transparent top padding, with an 8px visible-pixel reserve.
export const layeredHeroes = {
 services: {
  backdrop: servicesBackdrop, cutout: servicesCutout, photoTop: 159, destination: 'contact',
  content: {
   id: {titleStart:'Layanan Jasa', titleLines:['yang Dibutuhkan Bisnis Anda'], lead:'Kami bantu memetakan kebutuhan izin, menyiapkan dokumen, dan mengawal proses hingga tindak lanjut.', cta:'Mulai Konsultasi', alt:'Empat profesional menelaah dokumen perizinan bersama di meja konsultasi.', left:'Dari perencanaan hingga izin berjalan', right:'Solusi perizinan untuk pertumbuhan bisnis'},
   en: {titleStart:'Business Services', titleLines:['for Your Business Needs'], lead:'We help map permit requirements, prepare documents and guide the process through follow-up.', cta:'Start a Consultation', alt:'Four professionals reviewing permit documents together at a consultation desk.', left:'From planning to permits in place', right:'Permit support for business growth'}
  }
 },
 industries: {
  backdrop: industriesBackdrop, cutout: industriesCutout, photoTop: 27, destination: 'contact',
  content: {
   id: {titleStart:'Cakupan Industri', titleLines:['yang kami Dukung'], lead:'Setiap lokasi, fasilitas, dan kegiatan usaha membawa kebutuhan izin yang berbeda. Kami mulai dari konteks industrinya.', cta:'Jadwalkan Konsultasi', alt:'Seorang insinyur menjelaskan lokasi kepada dua profesional yang membawa dokumen.', left:'Sektor yang berkembang membutuhkan kepastian perizinan', right:'Dari industri untuk pertumbuhan berkelanjutan'},
   en: {titleStart:'Industry Sectors', titleLines:['We Support'], lead:'Every location, facility and business activity brings different permit requirements. We start with your industry context.', cta:'Schedule a Consultation', alt:'An engineer explaining a site to two professionals carrying documents.', left:'Growing sectors need clarity on permits', right:'From industry to sustainable growth'}
  }
 },
 experiences: {
  backdrop: experiencesBackdrop, cutout: experiencesCutout, photoTop: 138, destination: '#experiences',
  content: {
   id: {titleStart:'Pengalaman Kami', titleLines:['dalam Berbagai Kebutuhan'], lead:'Pengalaman yang membantu kami memahami kebutuhan bisnis Anda.', cta:'Jelajahi Pendekatan Kami', alt:'Empat profesional memeriksa gambar teknis dan rencana proyek bersama.', left:'Pemahaman konteks yang lebih mendalam', right:'Arahan proses yang terukur dan realistis'},
   en: {titleStart:'Our Experience', titleLines:['Across Business Needs'], lead:'Experience that helps us understand your business needs.', cta:'Explore Our Approach', alt:'Four professionals reviewing technical drawings and project plans together.', left:'A deeper understanding of context', right:'Measured and realistic process guidance'}
  }
 },
 insights: {
  backdrop: insightsBackdrop, cutout: insightsCutout, photoTop: 56, destination: '#latest-insights',
  content: {
   id: {titleStart:'Informasi Relevan', titleLines:['untuk Bisnis Anda'], lead:'Catatan, analisis, dan panduan dari tim kami untuk pemilik bisnis, pengelola fasilitas, dan tim legal dalam menghadapi isu perizinan dan regulasi secara lebih siap.', cta:'Baca Insight Kami', alt:'Dua profesional mendiskusikan buku panduan, dokumen dan tablet.', left:'Analisis praktis untuk keputusan lebih tepat', right:'Perspektif hukum untuk pertumbuhan bisnis'},
   en: {titleStart:'Relevant Information', titleLines:['for Your Business'], lead:'Notes, analysis and guidance from our team for business owners, facility managers and legal teams preparing to address permit and regulatory matters.', cta:'Read Our Insights', alt:'Two professionals discussing a reference book, documents and a tablet.', left:'Practical analysis for better decisions', right:'Legal perspectives for business growth'}
  }
 },
 about: {
  backdrop: aboutBackdrop, cutout: aboutCutout, photoTop: 148, destination: '#team',
  content: {
   id: {titleStart:'Tim Kami', titleLines:['untuk Perizinan dan','Dukungan Hukum Bisnis Anda'], lead:'Profesional, berpengalaman, dan berkomitmen membantu Anda mengurus perizinan serta menjawab kebutuhan hukum bisnis.', cta:'Kenali Tim Kami', alt:'Lima anggota tim berdiskusi bersama di sekitar laptop dan dokumen.', left:'Tim di balik pertumbuhan bisnis Anda', right:'Manusia, pengalaman, solusi berdampak'},
   en: {titleStart:'Our Team', titleLines:['for Permits and','Business Legal Support'], lead:'Experienced professionals committed to helping you manage permits and address the legal needs of your business.', cta:'Meet Our Team', alt:'Five team members discussing documents around a laptop.', left:'The team behind your business growth', right:'People, experience and meaningful solutions'}
  }
 }
} as const;
export type LayeredHeroPage = keyof typeof layeredHeroes;
