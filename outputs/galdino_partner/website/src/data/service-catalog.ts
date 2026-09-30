import type {Locale} from './site';
export interface ServiceCategory {id:string;slug:Record<Locale,string>;number:string;content:Record<Locale,{title:string;description:string;audience:string[];triggers:string[];note:string}>}
export interface ServiceGroup {id:string;slug:Record<Locale,string>;title:Record<Locale,string>;category:string}
export const SERVICE_CATEGORIES:ServiceCategory[]=[
  {
    "id": "reklame",
    "slug": {
      "id": "reklame",
      "en": "advertising-permits"
    },
    "number": "01",
    "content": {
      "id": {
        "title": "Perizinan Reklame",
        "description": "Pajak, izin penempatan, struktur, dan masa berlaku reklame dalam satu rencana pengelolaan.",
        "audience": [
          "Pemilik retail",
          "Pengelola jaringan outlet",
          "Pemilik media luar ruang"
        ],
        "triggers": [
          "Rencana pemasangan reklame",
          "Masa berlaku mendekati akhir",
          "Perubahan ukuran atau lokasi"
        ],
        "note": "Ketentuan reklame, objek pajak, dan kewenangan berbeda menurut daerah. Pembayaran pajak tidak otomatis menggantikan izin pemasangan atau persetujuan struktur."
      },
      "en": {
        "title": "Advertising Permits",
        "description": "Coordinate advertising tax, placement permits, structures and renewal dates.",
        "audience": [
          "Retail owners",
          "Multi-site operators",
          "Outdoor media owners"
        ],
        "triggers": [
          "A new advertising installation",
          "An approaching expiry date",
          "A change of size or location"
        ],
        "note": "Local rules determine advertising tax, permitting and the responsible authority. Tax payment does not replace a placement permit or structural approval."
      }
    }
  },
  {
    "id": "tata-ruang",
    "slug": {
      "id": "tata-ruang",
      "en": "spatial-planning"
    },
    "number": "02",
    "content": {
      "id": {
        "title": "Perizinan Tata Ruang",
        "description": "Tinjau kesesuaian lokasi, rencana tapak, dan persyaratan ruang sebelum mengunci investasi.",
        "audience": [
          "Developer properti",
          "Pemilik pabrik dan gudang",
          "Tim ekspansi lokasi"
        ],
        "triggers": [
          "Sebelum pembelian atau sewa lahan",
          "Perubahan fungsi kegiatan",
          "Pengembangan tapak baru"
        ],
        "note": "Nama layanan dan dokumen daerah seperti KRK, IPPR, atau IPPT perlu diperiksa terhadap lokasi serta aturan yang berlaku. Dokumen tersebut tidak selalu diwajibkan bersama-sama."
      },
      "en": {
        "title": "Spatial Planning Approvals",
        "description": "Review location suitability, site plans and spatial requirements before committing investment.",
        "audience": [
          "Property developers",
          "Factory and warehouse owners",
          "Site expansion teams"
        ],
        "triggers": [
          "Before buying or leasing land",
          "A change of activity",
          "A new site development"
        ],
        "note": "Local documents such as KRK, IPPR and IPPT depend on the jurisdiction and current rules. These documents are not automatically required together."
      }
    }
  },
  {
    "id": "bangunan-konstruksi",
    "slug": {
      "id": "bangunan-konstruksi",
      "en": "buildings-construction"
    },
    "number": "03",
    "content": {
      "id": {
        "title": "Perizinan Bangunan & Konstruksi",
        "description": "Hubungkan rencana bangunan, kondisi teknis, instalasi, dan kesiapan badan usaha konstruksi.",
        "audience": [
          "Pemilik bangunan komersial",
          "Kontraktor dan pengembang",
          "Pengelola fasilitas"
        ],
        "triggers": [
          "Sebelum pembangunan atau renovasi",
          "Menjelang penggunaan bangunan",
          "Persiapan tender konstruksi"
        ],
        "note": "Penilaian teknis harus melibatkan tenaga dan lembaga yang berwenang sesuai pekerjaan. Pendampingan administratif tidak menggantikan pemeriksaan atau keputusan lembaga penerbit."
      },
      "en": {
        "title": "Building & Construction Approvals",
        "description": "Connect building plans, technical condition, installations and construction-business readiness.",
        "audience": [
          "Commercial building owners",
          "Contractors and developers",
          "Facility managers"
        ],
        "triggers": [
          "Before building or renovation",
          "Before occupancy",
          "Preparation for a construction tender"
        ],
        "note": "Technical assessment requires appropriately qualified professionals and authorised bodies. Administrative assistance does not replace inspection or the issuing body's decision."
      }
    }
  },
  {
    "id": "lingkungan",
    "slug": {
      "id": "lingkungan",
      "en": "environmental-approvals"
    },
    "number": "04",
    "content": {
      "id": {
        "title": "Perizinan Lingkungan",
        "description": "Dari penapisan dokumen hingga persetujuan teknis, pemantauan, dan penyelesaian kewajiban lingkungan.",
        "audience": [
          "Pelaku industri dan manufaktur",
          "Pengembang properti",
          "Pengelola fasilitas kesehatan dan hotel"
        ],
        "triggers": [
          "Rencana usaha atau ekspansi",
          "Perubahan kapasitas atau proses",
          "Evaluasi kepatuhan fasilitas berjalan"
        ],
        "note": "Instrumen yang tepat ditentukan oleh jenis, skala, lokasi, dampak, dan kondisi kegiatan. Persetujuan instansi, sampling, serta tenaga ahli harus mengikuti ketentuan yang berlaku."
      },
      "en": {
        "title": "Environmental Approvals",
        "description": "From document screening to technical approvals, monitoring and environmental compliance resolution.",
        "audience": [
          "Industrial and manufacturing operators",
          "Property developers",
          "Healthcare and hotel operators"
        ],
        "triggers": [
          "A new activity or expansion",
          "Capacity or process changes",
          "Review of an operating facility"
        ],
        "note": "The appropriate instrument depends on activity, scale, location, impact and operating status. Authority review, sampling and specialist involvement must follow applicable requirements."
      }
    }
  },
  {
    "id": "lalu-lintas-akses",
    "slug": {
      "id": "lalu-lintas-akses",
      "en": "traffic-road-access"
    },
    "number": "05",
    "content": {
      "id": {
        "title": "Lalu Lintas & Akses Jalan",
        "description": "Siapkan hubungan fasilitas dengan jaringan jalan, pergerakan kendaraan, dan kebutuhan akses.",
        "audience": [
          "Pengembang kawasan",
          "Operator gudang dan logistik",
          "Pengelola retail, rumah sakit, dan hotel"
        ],
        "triggers": [
          "Perencanaan akses tapak",
          "Penambahan kapasitas pengunjung",
          "Perubahan sirkulasi kendaraan"
        ],
        "note": "Kewenangan mengikuti status jalan dan karakter dampak kegiatan. Kajian tidak memberikan hak untuk membuka akses, memotong median, atau melakukan pekerjaan jalan tanpa persetujuan yang diperlukan."
      },
      "en": {
        "title": "Traffic & Road Access",
        "description": "Plan the connection between facilities, road networks, vehicle movements and access requirements.",
        "audience": [
          "Area developers",
          "Warehouse and logistics operators",
          "Retail, hospital and hotel managers"
        ],
        "triggers": [
          "Planning site access",
          "Increasing visitor capacity",
          "Changing vehicle circulation"
        ],
        "note": "Authority depends on road classification and the activity's impacts. A study does not authorise access works or median changes without the required approvals."
      }
    }
  },
  {
    "id": "iso",
    "slug": {
      "id": "iso",
      "en": "iso-management-systems"
    },
    "number": "06",
    "content": {
      "id": {
        "title": "Sertifikasi ISO & Sistem Manajemen",
        "description": "Bangun bukti penerapan sistem, kesiapan audit, dan kompetensi yang dapat ditelusuri.",
        "audience": [
          "Manajemen dan tim mutu",
          "Tim compliance dan operasional",
          "Laboratorium dan lembaga inspeksi"
        ],
        "triggers": [
          "Persyaratan pelanggan atau tender",
          "Penguatan sistem internal",
          "Persiapan audit atau asesmen"
        ],
        "note": "Kami mendampingi kesiapan sistem. Sertifikasi dilakukan lembaga sertifikasi independen dan akreditasi dilakukan badan akreditasi yang berwenang. ISO sendiri tidak menerbitkan sertifikat perusahaan."
      },
      "en": {
        "title": "ISO & Management Systems",
        "description": "Build evidence of system implementation, audit readiness and traceable competence.",
        "audience": [
          "Management and quality teams",
          "Compliance and operations teams",
          "Laboratories and inspection bodies"
        ],
        "triggers": [
          "Customer or tender requirements",
          "Strengthening internal systems",
          "Preparing for audit or assessment"
        ],
        "note": "We support system readiness. Independent certification bodies issue certificates; authorised accreditation bodies grant accreditation. ISO itself does not certify companies."
      }
    }
  }
];
export const SERVICE_GROUPS:ServiceGroup[]=[
  {
    "id": "dokumen-lingkungan",
    "slug": {
      "id": "dokumen-lingkungan",
      "en": "environmental-documents"
    },
    "title": {
      "id": "Dokumen Lingkungan",
      "en": "Environmental Documents"
    },
    "category": "lingkungan"
  },
  {
    "id": "persetujuan-teknis",
    "slug": {
      "id": "persetujuan-teknis",
      "en": "technical-approvals"
    },
    "title": {
      "id": "Persetujuan Teknis Lingkungan",
      "en": "Environmental Technical Approvals"
    },
    "category": "lingkungan"
  },
  {
    "id": "pelaporan-compliance",
    "slug": {
      "id": "pelaporan-compliance",
      "en": "reporting-compliance"
    },
    "title": {
      "id": "Pelaporan & Compliance Lingkungan",
      "en": "Environmental Reporting & Compliance"
    },
    "category": "lingkungan"
  },
  {
    "id": "penyelesaian-dokumen",
    "slug": {
      "id": "penyelesaian-dokumen",
      "en": "compliance-resolution"
    },
    "title": {
      "id": "Penyelesaian Dokumen Lingkungan",
      "en": "Environmental Document Resolution"
    },
    "category": "lingkungan"
  }
];
export const categoryById=(id:string)=>SERVICE_CATEGORIES.find(c=>c.id===id)!;
export const categoryUrl=(c:ServiceCategory,l:Locale)=>`/${l}/services/${c.slug[l]}/`;
export const groupUrl=(g:ServiceGroup,l:Locale)=>categoryUrl(categoryById(g.category),l)+'#'+g.slug[l];
