import type {Locale} from './site';
export interface Experience {slug:string;company:string;imageKey:string;location:string;year:string;provisional:boolean;services:string[];content:Record<Locale,{industry:string;stage:string;title:string;challengeTitle:string;challenge:string;approachTitle:string;approach:string;deliverablesTitle:string;deliverables:string[];duration:string;outcome:string}>;}
export const EXPERIENCES:Experience[]=[
  {
    "slug": "aruna-pangan",
    "company": "PT Aruna Pangan Nusantara",
    "imageKey": "manufacturing",
    "location": "Tangerang",
    "year": "2025",
    "provisional": true,
    "services": [
      "ukl-upl",
      "pertek-air-limbah",
      "pertek-emisi"
    ],
    "content": {
      "id": {
        "industry": "Manufaktur pangan",
        "stage": "Ekspansi produksi",
        "title": "UKL-UPL: menyiapkan ekspansi fasilitas pangan.",
        "challenge": "Penambahan lini produksi membutuhkan pembacaan ulang kegiatan, kapasitas, serta keterkaitan dokumen lingkungan dan bangunan. Data operasional tersebar di beberapa tim.",
        "approach": "Tim memulai dari diagram proses dan daftar produk, kemudian mencocokkannya dengan kegiatan terdaftar. Setiap persyaratan diberikan pemilik dokumen dan urutan tindak lanjut.",
        "deliverables": [
          "Matriks izin fasilitas",
          "Register data produksi",
          "Daftar kekurangan dokumen",
          "Jadwal tindak lanjut"
        ],
        "duration": "6 minggu",
        "outcome": "Jalur perizinan diperjelas dan dokumen lintas tim terkonsolidasi untuk persiapan pengajuan.",
        "challengeTitle": "Data Ekspansi Produksi Belum Terpadu.",
        "approachTitle": "Mencocokkan Proses dan Data Produksi.",
        "deliverablesTitle": "Matriks Izin dan Register Produksi."
      },
      "en": {
        "industry": "Food manufacturing",
        "stage": "Production expansion",
        "title": "UKL-UPL: preparing a food-facility expansion.",
        "challenge": "An additional production line required a fresh review of activities, capacity and environmental and building documents. Operating data were held by several teams.",
        "approach": "The team started with process diagrams and product lists, then mapped them to registered activities. Each requirement was assigned a document owner and next-step sequence.",
        "deliverables": [
          "Facility permit matrix",
          "Production data register",
          "Document gap list",
          "Follow-up schedule"
        ],
        "duration": "6 weeks",
        "outcome": "The licensing pathway was clarified and cross-team documents consolidated for submission preparation.",
        "challengeTitle": "Expansion Records Were Fragmented.",
        "approachTitle": "Aligning Processes and Production Records.",
        "deliverablesTitle": "Permit Matrix and Production Register."
      }
    }
  },
  {
    "slug": "nusa-teknologi",
    "company": "PT Nusa Teknologi Integrasi",
    "imageKey": "compliance",
    "location": "Jakarta",
    "year": "2025",
    "provisional": true,
    "services": [
      "sertifikasi-iso-27001",
      "sertifikasi-iso-9001"
    ],
    "content": {
      "id": {
        "industry": "Teknologi",
        "stage": "Penguatan sistem manajemen",
        "title": "Kesiapan sistem keamanan informasi untuk tim teknologi.",
        "challenge": "Dokumen keamanan informasi tersebar di tim produk, operasional, dan manajemen. Ruang lingkup sistem serta bukti pengendalian belum dipetakan bersama.",
        "approach": "Tim menyusun inventaris proses dan aset, menetapkan pemilik risiko, serta meninjau bukti kontrol terhadap ruang lingkup yang disepakati.",
        "deliverables": [
          "Peta ruang lingkup sistem",
          "Register risiko informasi",
          "Daftar bukti kontrol",
          "Rencana audit internal"
        ],
        "duration": "3 minggu",
        "outcome": "Tim memperoleh prioritas perbaikan dan daftar bukti yang perlu disiapkan sebelum proses audit independen.",
        "challengeTitle": "Dokumen Keamanan Informasi Tersebar.",
        "approachTitle": "Memetakan Aset, Risiko, dan Kontrol.",
        "deliverablesTitle": "Prioritas Perbaikan Sebelum Audit."
      },
      "en": {
        "industry": "Technology",
        "stage": "Management-system development",
        "title": "Information-security readiness for a technology team.",
        "challenge": "Security documents were distributed across product, operations and management teams. System scope and control evidence had not been mapped together.",
        "approach": "The team created process and asset inventories, assigned risk owners and reviewed control evidence against the agreed scope.",
        "deliverables": [
          "System scope map",
          "Information-risk register",
          "Control evidence list",
          "Internal-audit plan"
        ],
        "duration": "3 weeks",
        "outcome": "The team received improvement priorities and an evidence list to prepare before an independent audit.",
        "challengeTitle": "Information Security Records Were Scattered.",
        "approachTitle": "Mapping Assets, Risks, and Controls.",
        "deliverablesTitle": "Improvement Priorities Before the Audit."
      }
    }
  },
  {
    "slug": "prima-distribusi",
    "company": "PT Prima Distribusi Indonesia",
    "imageKey": "retail",
    "location": "Bekasi",
    "year": "2026",
    "provisional": true,
    "services": [
      "pajak-reklame",
      "izin-reklame",
      "manajemen-reklame-multi-lokasi"
    ],
    "content": {
      "id": {
        "industry": "Retail dan distribusi",
        "stage": "Pengelolaan jaringan outlet",
        "title": "Pajak Reklame: menyatukan data lintas outlet.",
        "challenge": "Ukuran media, masa berlaku izin, dan arsip pajak beberapa outlet tidak tersimpan dalam format yang sama. Tim pusat kesulitan membandingkan data objek dengan kondisi lokasi.",
        "approach": "Foto dan ukuran reklame dicocokkan dengan dokumen setiap outlet. Tim memisahkan kewajiban pajak, izin pemasangan, serta kebutuhan pembaruan, lalu menetapkan penanggung jawab.",
        "deliverables": [
          "Inventaris objek per outlet",
          "Rekonsiliasi arsip pajak",
          "Kalender perpanjangan",
          "Matriks tindak lanjut"
        ],
        "duration": "5 minggu",
        "outcome": "Status setiap titik dapat ditelusuri dan prioritas pembaruan tersusun untuk koordinasi kantor pusat serta cabang.",
        "challengeTitle": "Arsip Reklame Antar-Outlet Tidak Seragam.",
        "approachTitle": "Mencocokkan Media dengan Arsip Outlet.",
        "deliverablesTitle": "Inventaris Reklame dan Kalender Perpanjangan."
      },
      "en": {
        "industry": "Retail and distribution",
        "stage": "Outlet-network management",
        "title": "Advertising Tax: consolidating outlet records.",
        "challenge": "Media dimensions, permit expiry dates and tax records across outlets used inconsistent formats. The central team struggled to compare recorded objects with site conditions.",
        "approach": "Photographs and dimensions were reconciled with each outlet's records. Tax obligations, placement permits and renewal needs were separated and assigned to owners.",
        "deliverables": [
          "Per-outlet object inventory",
          "Tax-record reconciliation",
          "Renewal calendar",
          "Follow-up matrix"
        ],
        "duration": "5 weeks",
        "outcome": "Each location's status became traceable, with renewal priorities established for coordination between head office and branches.",
        "challengeTitle": "Outlet Advertising Records Were Inconsistent.",
        "approachTitle": "Reconciling Advertising Media and Outlet Records.",
        "deliverablesTitle": "Advertising Inventory and Renewal Calendar."
      }
    }
  },
  {
    "slug": "vertex-konstruksi",
    "company": "PT Vertex Konstruksi Utama",
    "imageKey": "licensing",
    "location": "Tangerang Selatan",
    "year": "2026",
    "provisional": true,
    "services": [
      "sbu-konstruksi",
      "sertifikasi-iso-9001",
      "sertifikasi-iso-37001"
    ],
    "content": {
      "id": {
        "industry": "Konstruksi",
        "stage": "Persiapan prakualifikasi",
        "title": "Merapikan bukti kesiapan badan usaha konstruksi.",
        "challenge": "Perusahaan menata subklasifikasi pekerjaan dan bukti kapasitas personel. Daftar peralatan dan pengalaman perlu disajikan konsisten dengan lingkup yang ditawarkan.",
        "approach": "Review dimulai dari jenis pekerjaan, diikuti pemetaan kompetensi dan kelengkapan badan usaha. Dokumen disusun dalam register dengan status yang mudah ditelusuri.",
        "deliverables": [
          "Matriks subklasifikasi",
          "Register tenaga ahli",
          "Checklist LSBU",
          "Arsip kelengkapan"
        ],
        "duration": "4 minggu",
        "outcome": "Kesenjangan dokumen teridentifikasi dan paket administratif dipersiapkan untuk proses sertifikasi.",
        "challengeTitle": "Bukti Kapasitas Konstruksi Belum Selaras.",
        "approachTitle": "Menyelaraskan Lingkup dan Kompetensi.",
        "deliverablesTitle": "Register Kelengkapan Badan Usaha."
      },
      "en": {
        "industry": "Construction",
        "stage": "Prequalification preparation",
        "title": "Organising construction-business readiness evidence.",
        "challenge": "The company was organising work classifications and personnel capability evidence. Equipment and experience records needed to match the proposed scope.",
        "approach": "The review began with work types, followed by competence and entity document mapping. Records were organised in a register with traceable status.",
        "deliverables": [
          "Classification matrix",
          "Specialist register",
          "LSBU checklist",
          "Completeness archive"
        ],
        "duration": "4 weeks",
        "outcome": "Document gaps were identified and an administrative pack prepared for certification.",
        "challengeTitle": "Construction Capability Evidence Needed Alignment.",
        "approachTitle": "Aligning Scope and Competence.",
        "deliverablesTitle": "Business Readiness Register."
      }
    }
  },
  {
    "slug": "lintas-logistik",
    "company": "PT Lintas Logistik Nusantara",
    "imageKey": "warehouse",
    "location": "Surabaya",
    "year": "2026",
    "provisional": true,
    "services": [
      "slf",
      "slo-kelistrikan",
      "andalalin",
      "inrit"
    ],
    "content": {
      "id": {
        "industry": "Gudang dan logistik",
        "stage": "Persiapan penggunaan fasilitas",
        "title": "Kesiapan dokumen kelaikan dan akses fasilitas gudang.",
        "challenge": "Arsip bangunan, gambar terbangun, dan rencana pergerakan truk dimiliki pihak yang berbeda. Tim membutuhkan kejelasan dokumen untuk menilai kesiapan fasilitas.",
        "approach": "Tim mengonsolidasikan arsip bangunan serta instalasi dan memetakan dokumen pemeriksaan teknis. Akses truk, ruang bongkar muat, dan tindak lanjut dikaji bersama pengelola.",
        "deliverables": [
          "Register arsip bangunan",
          "Daftar kebutuhan pemeriksaan",
          "Peta akses dan sirkulasi",
          "Rencana penutupan kekurangan data"
        ],
        "duration": "3 minggu",
        "outcome": "Kebutuhan dokumen serta pemeriksaan lanjutan terpetakan sebelum pengajuan dan keputusan penggunaan fasilitas.",
        "challengeTitle": "Arsip Gudang dan Akses Terpisah.",
        "approachTitle": "Mengonsolidasikan Bangunan dan Sirkulasi Truk.",
        "deliverablesTitle": "Kebutuhan Pemeriksaan dan Data Lanjutan."
      },
      "en": {
        "industry": "Warehousing and logistics",
        "stage": "Facility occupancy preparation",
        "title": "Building-fitness and access readiness for a warehouse.",
        "challenge": "Building archives, as-built drawings and truck-movement plans were held by different parties. The team needed a clear view of evidence required to assess readiness.",
        "approach": "Building and installation records were consolidated and inspection-document requirements mapped. Truck access, loading space and follow-up were reviewed with the operator.",
        "deliverables": [
          "Building archive register",
          "Inspection requirements list",
          "Access and circulation map",
          "Information-gap closure plan"
        ],
        "duration": "3 weeks",
        "outcome": "Document and inspection requirements were clarified before applications and decisions about facility use.",
        "challengeTitle": "Warehouse and Access Records Were Separate.",
        "approachTitle": "Consolidating Building and Truck-Access Records.",
        "deliverablesTitle": "Inspection and Further Information Requirements."
      }
    }
  },
  {
    "slug": "karya-properti",
    "company": "PT Karya Properti Sentosa",
    "imageKey": "investment",
    "location": "Bogor",
    "year": "2026",
    "provisional": true,
    "services": [
      "kkpr",
      "pbg-imb",
      "slf",
      "andalalin"
    ],
    "content": {
      "id": {
        "industry": "Properti",
        "stage": "Perencanaan investasi",
        "title": "PBG: menyelaraskan rencana bangunan dan dokumen tapak.",
        "challenge": "Rencana pengembangan fasilitas membutuhkan koordinasi lokasi, lingkungan, dan bangunan. Keputusan investasi perlu membedakan pekerjaan yang dapat berjalan paralel dan yang bergantung pada persetujuan lain.",
        "approach": "Tim menghubungkan jadwal proyek dengan kebutuhan dokumen teknis, mencatat asumsi lokasi, dan menyusun urutan keputusan untuk dibahas bersama pengembang.",
        "deliverables": [
          "Roadmap perizinan",
          "Matriks dependensi",
          "Daftar data teknis",
          "Register isu terbuka"
        ],
        "duration": "5 minggu",
        "outcome": "Kebutuhan kajian dan dependensi regulasi dipetakan sebelum ruang lingkup pengembangan ditetapkan.",
        "challengeTitle": "Prioritas Izin Proyek Belum Jelas.",
        "approachTitle": "Menghubungkan Dokumen dengan Jadwal Proyek.",
        "deliverablesTitle": "Roadmap Izin dan Matriks Dependensi."
      },
      "en": {
        "industry": "Property",
        "stage": "Investment planning",
        "title": "PBG: aligning building plans and site documents.",
        "challenge": "A planned facility development required coordination of site, environmental and building requirements. Investment decisions needed to distinguish parallel work from approval-dependent tasks.",
        "approach": "The team connected the project schedule to technical document needs, recorded site assumptions and sequenced decisions for discussion with the developer.",
        "deliverables": [
          "Licensing roadmap",
          "Dependency matrix",
          "Technical data list",
          "Open issue register"
        ],
        "duration": "5 weeks",
        "outcome": "Study requirements and regulatory dependencies were mapped before the development scope was fixed.",
        "challengeTitle": "Project Approval Priorities Needed Clarity.",
        "approachTitle": "Connecting Documents to the Project Schedule.",
        "deliverablesTitle": "Permit Roadmap and Dependency Matrix."
      }
    }
  }
];
export const experienceUrl=(e:Experience,l:Locale)=>`/${l}/projects/${e.slug}/`;
