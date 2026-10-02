import aboutBackdrop from '../assets/hero-about-layered-backdrop.webp';
import aboutCutout from '../assets/hero-about-layered-cutout.webp';
import insightsBackdrop from '../assets/hero-insights-layered-backdrop.webp';
import insightsCutout from '../assets/hero-insights-layered-cutout.webp';
import servicesBackdrop from '../assets/hero-services-layered-backdrop.webp';
import servicesCutout from '../assets/hero-services-layered-cutout.webp';
import industriesBackdrop from '../assets/hero-industries-layered-backdrop.webp';
import industriesCutout from '../assets/hero-industries-layered-cutout.webp';
import experiencesBackdrop from '../assets/hero-experiences-layered-backdrop.webp';
import experiencesCutout from '../assets/hero-experiences-layered-cutout.webp';

export const layeredHeroes = {
 services: {
  backdrop: servicesBackdrop, cutout: servicesCutout, destination: 'contact',
  content: {
   id: {kicker:'Layanan', titleStart:'Perizinan yang', titleLines:['Menopang Bisnis Anda'], lead:'Kami susun kebutuhan izin, kelola dokumen penting, dan dampingi proses agar langkah bisnis lebih siap.', cta:'Mulai Konsultasi', alt:'Lima profesional menelaah dokumen dan rencana bisnis bersama.', left:'Dokumen, proses, dan kepatuhan untuk pertumbuhan', right:'Solusi perizinan di setiap tahap bisnis'},
   en: {kicker:'Services', titleStart:'Permits that', titleLines:['Support Your Business'], lead:'We map your permit requirements, manage essential documents and guide the process so your business can move forward prepared.', cta:'Start a Consultation', alt:'Five professionals reviewing business plans and documents together.', left:'Documents, processes and compliance for growth', right:'Permit support at every business stage'}
  }
 },
 industries: {
  backdrop: industriesBackdrop, cutout: industriesCutout, destination: 'contact',
  content: {
   id: {kicker:'Industri', titleStart:'Perizinan yang Sesuai', titleLines:['dengan Industri Anda'], lead:'Setiap lokasi, fasilitas, dan kegiatan usaha membawa kebutuhan izin yang berbeda. Kami mulai dari konteks industrinya.', cta:'Jadwalkan Konsultasi', alt:'Seorang insinyur menjelaskan lokasi kepada dua profesional yang membawa dokumen.', left:'Sektor yang berkembang membutuhkan kepastian perizinan', right:'Dari industri untuk pertumbuhan berkelanjutan'},
   en: {kicker:'Industries', titleStart:'The Right Permits', titleLines:['for Your Industry'], lead:'Every location, facility and business activity brings different permit requirements. We start with your industry context.', cta:'Schedule a Consultation', alt:'An engineer explaining a site to two professionals carrying documents.', left:'Growing sectors need clarity on permits', right:'From industry to sustainable growth'}
  }
 },
 experiences: {
  backdrop: experiencesBackdrop, cutout: experiencesCutout, destination: '#experiences',
  content: {
   id: {kicker:'Our Experiences', titleStart:'Pendampingan yang', titleLines:['Menyesuaikan Kebutuhan Bisnis'], lead:'Dari pembacaan konteks hingga arahan proses, kami hadir untuk membantu langkah perizinan yang lebih terukur.', cta:'Jelajahi Pendekatan Kami', alt:'Empat profesional memeriksa gambar teknis dan rencana proyek bersama.', left:'Pemahaman konteks yang lebih mendalam', right:'Arahan proses yang terukur dan realistis'},
   en: {kicker:'Our Experiences', titleStart:'Support that', titleLines:['Adapts to Your Business Needs'], lead:'From understanding the context to guiding the process, we help you take more considered steps through your permit requirements.', cta:'Explore Our Approach', alt:'Four professionals reviewing technical drawings and project plans together.', left:'A deeper understanding of context', right:'Measured and realistic process guidance'}
  }
 },
 insights: {
  backdrop: insightsBackdrop, cutout: insightsCutout, destination: '#latest-insights',
  content: {
   id: {kicker:'', titleStart:'Insight Praktis', titleLines:['untuk Bisnis Anda'], lead:'Catatan, analisis, dan panduan dari tim kami untuk pemilik bisnis, pengelola fasilitas, dan tim legal dalam menghadapi isu perizinan dan regulasi secara lebih siap.', cta:'Baca Insight Kami', alt:'Dua profesional mendiskusikan buku panduan, dokumen dan tablet.', left:'Analisis praktis untuk keputusan lebih tepat', right:'Perspektif hukum untuk pertumbuhan bisnis'},
   en: {kicker:'', titleStart:'Practical Insights', titleLines:['for Your Business'], lead:'Notes, analysis and guidance from our team for business owners, facility managers and legal teams preparing to address permit and regulatory matters.', cta:'Read Our Insights', alt:'Two professionals discussing a reference book, documents and a tablet.', left:'Practical analysis for better decisions', right:'Legal perspectives for business growth'}
  }
 },
 about: {
  backdrop: aboutBackdrop, cutout: aboutCutout, destination: '#team',
  content: {
   id: {kicker:'', titleStart:'Tim Kami', titleLines:['untuk Perizinan dan','Dukungan Hukum Bisnis Anda'], lead:'Profesional, berpengalaman, dan berkomitmen membantu Anda mengurus perizinan serta menjawab kebutuhan hukum bisnis.', cta:'Kenali Tim Kami', alt:'Lima anggota tim berdiskusi bersama di sekitar laptop dan dokumen.', left:'Tim di balik pertumbuhan bisnis Anda', right:'Manusia, pengalaman, solusi berdampak'},
   en: {kicker:'', titleStart:'Our Team', titleLines:['for Permits and','Business Legal Support'], lead:'Experienced professionals committed to helping you manage permits and address the legal needs of your business.', cta:'Meet Our Team', alt:'Five team members discussing documents around a laptop.', left:'The team behind your business growth', right:'People, experience and meaningful solutions'}
  }
 }
} as const;
export type LayeredHeroPage = keyof typeof layeredHeroes;
