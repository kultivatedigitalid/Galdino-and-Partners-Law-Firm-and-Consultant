import type {Locale} from './site';
export interface Industry{id:string;slug:Record<Locale,string>;services:string[];caseSlug:string;content:Record<Locale,{title:string;short:string;description:string;issues:string[];documents:string[]}>}
export const INDUSTRIES:Industry[]=[
  {
    "id": "developer-properti",
    "slug": {
      "id": "developer-properti",
      "en": "property-developers"
    },
    "services": [
      "kkpr",
      "krk",
      "pbg-imb",
      "slf",
      "amdal",
      "andalalin"
    ],
    "caseSlug": "karya-properti",
    "content": {
      "id": {
        "title": "Perizinan untuk Developer Properti",
        "short": "Developer Properti",
        "description": "Rencanakan izin sejak pemilihan lahan, desain tapak, hingga kesiapan bangunan digunakan.",
        "issues": [
          "Kesesuaian ruang sebelum transaksi",
          "Konsistensi gambar dan fungsi bangunan",
          "Ketergantungan lingkungan dan akses jalan"
        ],
        "documents": [
          "Rencana tapak",
          "Data penguasaan lahan",
          "Tahapan pembangunan",
          "Perkiraan kapasitas penghuni"
        ]
      },
      "en": {
        "title": "Licensing for Property Developers",
        "short": "Property Developers",
        "description": "Plan approvals from land selection and site design through readiness for occupancy.",
        "issues": [
          "Spatial suitability before transactions",
          "Consistent drawings and building use",
          "Environmental and road-access dependencies"
        ],
        "documents": [
          "Site plan",
          "Land control records",
          "Development stages",
          "Expected occupancy"
        ]
      }
    }
  },
  {
    "id": "manufaktur",
    "slug": {
      "id": "manufaktur",
      "en": "manufacturing"
    },
    "services": [
      "ukl-upl",
      "amdal",
      "pertek-air-limbah",
      "pertek-emisi",
      "slo-lingkungan",
      "sertifikasi-iso-9001",
      "sertifikasi-iso-45001"
    ],
    "caseSlug": "aruna-pangan",
    "content": {
      "id": {
        "title": "Perizinan untuk Pabrik / Manufaktur",
        "short": "Pabrik / Manufaktur",
        "description": "Hubungkan kapasitas produksi, sarana pengolahan, bangunan, dan pengendalian lingkungan dalam satu urutan kerja.",
        "issues": [
          "Perubahan proses atau kapasitas",
          "Kebutuhan pengendalian air limbah dan emisi",
          "Kesiapan sistem mutu serta keselamatan kerja"
        ],
        "documents": [
          "Diagram proses produksi",
          "Kapasitas dan daftar peralatan",
          "Neraca air dan energi",
          "Arsip persetujuan lingkungan"
        ]
      },
      "en": {
        "title": "Licensing for Factories & Manufacturing",
        "short": "Factories & Manufacturing",
        "description": "Connect production capacity, treatment facilities, buildings and environmental controls in one work sequence.",
        "issues": [
          "Process or capacity changes",
          "Wastewater and emission controls",
          "Quality and workplace-safety system readiness"
        ],
        "documents": [
          "Production process flow",
          "Capacity and equipment register",
          "Water and energy balance",
          "Environmental approval records"
        ]
      }
    }
  },
  {
    "id": "gudang",
    "slug": {
      "id": "gudang",
      "en": "warehouses"
    },
    "services": [
      "kkpr",
      "pbg-imb",
      "slf",
      "slo-kelistrikan",
      "andalalin",
      "inrit"
    ],
    "caseSlug": "lintas-logistik",
    "content": {
      "id": {
        "title": "Perizinan untuk Gudang",
        "short": "Gudang",
        "description": "Siapkan kesesuaian lokasi, fungsi bangunan, keselamatan instalasi, dan pergerakan kendaraan barang.",
        "issues": [
          "Perubahan fungsi bangunan menjadi gudang",
          "Akses truk dan ruang bongkar muat",
          "Kelaikan bangunan serta instalasi listrik"
        ],
        "documents": [
          "Site plan dan luas penyimpanan",
          "Jenis barang dan kebutuhan penanganan",
          "Pola pergerakan kendaraan",
          "Gambar as-built dan utilitas"
        ]
      },
      "en": {
        "title": "Licensing for Warehouses",
        "short": "Warehouses",
        "description": "Prepare location conformity, building function, installation safety and freight movements.",
        "issues": [
          "Conversion of a building into a warehouse",
          "Truck access and loading space",
          "Building fitness and electrical safety"
        ],
        "documents": [
          "Site plan and storage area",
          "Goods and handling requirements",
          "Vehicle-movement patterns",
          "As-built and utility drawings"
        ]
      }
    }
  },
  {
    "id": "retail-multi-outlet",
    "slug": {
      "id": "retail-multi-outlet",
      "en": "retail-multi-outlet"
    },
    "services": [
      "pajak-reklame",
      "izin-reklame",
      "perpanjangan-reklame",
      "audit-legalitas-reklame",
      "manajemen-reklame-multi-lokasi",
      "sppl"
    ],
    "caseSlug": "prima-distribusi",
    "content": {
      "id": {
        "title": "Perizinan untuk Retail & Multi-Outlet",
        "short": "Retail & Multi-Outlet",
        "description": "Jaga konsistensi izin antaroutlet dengan inventaris reklame, status lokasi, dan kalender kewajiban.",
        "issues": [
          "Perbedaan persyaratan tiap daerah",
          "Masa berlaku reklame yang tersebar",
          "Pembukaan outlet dengan tenggat berbeda"
        ],
        "documents": [
          "Daftar outlet dan koordinat",
          "Foto serta ukuran reklame",
          "Arsip izin dan ketetapan pajak",
          "Jadwal pembukaan outlet"
        ]
      },
      "en": {
        "title": "Licensing for Retail & Multi-Outlet",
        "short": "Retail & Multi-Outlet",
        "description": "Maintain consistency across outlets with advertising inventories, location status and obligation calendars.",
        "issues": [
          "Different local requirements",
          "Advertising permits with multiple expiry dates",
          "Outlet openings with different deadlines"
        ],
        "documents": [
          "Outlet list and coordinates",
          "Advertising photographs and dimensions",
          "Permit and tax-assessment records",
          "Outlet-opening schedule"
        ]
      }
    }
  },
  {
    "id": "fasilitas-kesehatan",
    "slug": {
      "id": "fasilitas-kesehatan",
      "en": "healthcare"
    },
    "services": [
      "pbg-imb",
      "slf",
      "ukl-upl",
      "pertek-air-limbah",
      "andalalin",
      "akreditasi-iso-15189"
    ],
    "caseSlug": "aruna-pangan",
    "content": {
      "id": {
        "title": "Perizinan untuk Klinik / Rumah Sakit",
        "short": "Klinik / Rumah Sakit",
        "description": "Koordinasikan kebutuhan bangunan, lingkungan, akses, dan sistem pendukung pelayanan kesehatan.",
        "issues": [
          "Fungsi dan kelaikan bangunan pelayanan",
          "Pengelolaan air limbah dan dampak kegiatan",
          "Kompetensi laboratorium medik"
        ],
        "documents": [
          "Jenis layanan dan kapasitas fasilitas",
          "Denah ruang serta utilitas",
          "Data air limbah dan pengolahan",
          "Ruang lingkup laboratorium bila ada"
        ]
      },
      "en": {
        "title": "Licensing for Clinics & Hospitals",
        "short": "Clinics & Hospitals",
        "description": "Coordinate building, environmental, access and healthcare-support system requirements.",
        "issues": [
          "Healthcare building function and fitness",
          "Wastewater and activity-impact management",
          "Medical-laboratory competence"
        ],
        "documents": [
          "Service types and facility capacity",
          "Room layouts and utilities",
          "Wastewater and treatment information",
          "Laboratory scope where relevant"
        ]
      }
    }
  },
  {
    "id": "hotel",
    "slug": {
      "id": "hotel",
      "en": "hotels"
    },
    "services": [
      "kkpr",
      "pbg-imb",
      "slf",
      "ukl-upl",
      "pertek-air-limbah",
      "andalalin",
      "sertifikasi-iso-22000",
      "sertifikasi-iso-50001"
    ],
    "caseSlug": "karya-properti",
    "content": {
      "id": {
        "title": "Perizinan untuk Hotel",
        "short": "Hotel",
        "description": "Selaraskan kesiapan gedung, sistem lingkungan, akses tamu, dan standar operasional sebelum pembukaan.",
        "issues": [
          "Kesesuaian fungsi dan kapasitas bangunan",
          "Dampak kegiatan dapur serta penggunaan air",
          "Sirkulasi tamu, parkir, dan keselamatan"
        ],
        "documents": [
          "Jumlah kamar dan fasilitas pendukung",
          "Gambar bangunan serta utilitas",
          "Data dapur, air, dan energi",
          "Rencana akses serta parkir"
        ]
      },
      "en": {
        "title": "Licensing for Hotels",
        "short": "Hotels",
        "description": "Align building readiness, environmental systems, guest access and operating standards before opening.",
        "issues": [
          "Building use and capacity conformity",
          "Kitchen operations and water-use impacts",
          "Guest circulation, parking and safety"
        ],
        "documents": [
          "Room count and supporting facilities",
          "Building and utility drawings",
          "Kitchen, water and energy data",
          "Access and parking plan"
        ]
      }
    }
  }
];
export const industryUrl=(i:Industry,l:Locale)=>`/${l}/industries/${i.slug[l]}/`;
