import type {Locale} from "./site";
const records:Record<string,string[][]>={
  "reklame": [
    [
      "Tinjau titik dan media",
      "Review site and media",
      "Cek alamat pemasangan, ukuran, desain, dan masa berlaku izin yang ada.",
      "Check placement address, dimensions, design and existing permit expiry."
    ],
    [
      "Susun izin dan pajak",
      "Plan permits and tax",
      "Pisahkan kebutuhan pajak, izin penempatan, dan persetujuan struktur sesuai daerah.",
      "Separate tax, placement and structural requirements for the location."
    ],
    [
      "Siapkan dan koordinasikan",
      "Prepare and coordinate",
      "Lengkapi data media serta struktur, lalu kawal pengajuan dan perbaikan dokumen.",
      "Complete media and structural records, then coordinate filing and corrections."
    ],
    [
      "Pantau masa berlaku",
      "Track validity",
      "Catat izin terbit, kewajiban pajak, serta jadwal perpanjangan tiap lokasi.",
      "Record issued permits, tax obligations and each site’s renewal dates."
    ]
  ],
  "tata-ruang": [
    [
      "Periksa bidang tanah",
      "Review the land parcel",
      "Tinjau sertifikat, koordinat, rencana tapak, dan kegiatan yang direncanakan.",
      "Review title, coordinates, site plans and planned activities."
    ],
    [
      "Petakan kesesuaian ruang",
      "Map spatial suitability",
      "Periksa fungsi ruang serta dokumen KKPR dan persyaratan daerah yang relevan.",
      "Review spatial use, KKPR and relevant local requirements."
    ],
    [
      "Lengkapi rencana tapak",
      "Complete site plans",
      "Koordinasikan data lahan, pemilik dokumen, dan koreksi sebelum pengajuan.",
      "Coordinate land data, document owners and corrections before filing."
    ],
    [
      "Tindak lanjuti hasil",
      "Follow up the outcome",
      "Arsipkan dokumen ruang dan hubungkan hasilnya ke kebutuhan izin berikutnya.",
      "Archive spatial records and connect the outcome to subsequent permits."
    ]
  ],
  "bangunan-konstruksi": [
    [
      "Tinjau fungsi bangunan",
      "Review building use",
      "Baca data tanah, gambar bangunan, kondisi terbangun, serta fungsi yang dituju.",
      "Review land records, drawings, existing conditions and intended use."
    ],
    [
      "Tentukan lingkup teknis",
      "Define technical scope",
      "Petakan kebutuhan PBG, SLF, SLO, atau SBU beserta tenaga teknis terkait.",
      "Map PBG, SLF, SLO or SBU requirements and relevant technical specialists."
    ],
    [
      "Koordinasikan pemeriksaan",
      "Coordinate assessments",
      "Lengkapi gambar, kajian, dan bukti pemeriksaan sesuai layanan yang dibutuhkan.",
      "Complete drawings, studies and assessment evidence for the required service."
    ],
    [
      "Kawal pengajuan dan arsip",
      "Coordinate filing and records",
      "Tindak lanjuti perbaikan, simpan hasil, dan catat kewajiban pemeliharaan.",
      "Follow up corrections, retain outcomes and record maintenance obligations."
    ]
  ],
  "lingkungan": [
    [
      "Pahami kegiatan dan dampak",
      "Understand activities and impacts",
      "Kumpulkan alur produksi, kapasitas, lokasi, serta data limbah dan emisi.",
      "Gather process flow, capacity, location, wastewater and emission data."
    ],
    [
      "Pilih dokumen yang relevan",
      "Identify relevant documents",
      "Tinjau kebutuhan SPPL, UKL-UPL, AMDAL, PERTEK, atau penyesuaian dokumen.",
      "Review SPPL, UKL-UPL, AMDAL, technical approvals or document updates."
    ],
    [
      "Susun kajian dan pengajuan",
      "Prepare studies and filing",
      "Koordinasikan data teknis, pengujian yang diperlukan, dan tindak lanjut evaluasi.",
      "Coordinate technical data, required testing and evaluation follow-up."
    ],
    [
      "Catat kewajiban pelaporan",
      "Record reporting obligations",
      "Susun arsip persetujuan dan jadwal pemantauan serta pelaporan yang berlaku.",
      "Organise approval records and applicable monitoring and reporting schedules."
    ]
  ],
  "lalu-lintas-akses": [
    [
      "Tinjau akses dan kegiatan",
      "Review access and activities",
      "Baca rencana tapak, kapasitas kegiatan, arus kendaraan, dan status jalan.",
      "Review site plans, activity capacity, vehicle flow and road status."
    ],
    [
      "Petakan kajian dan izin",
      "Map studies and approvals",
      "Tentukan kebutuhan Andalalin, MRLL, INRIT, atau bukaan median.",
      "Identify traffic impact, management, driveway or median-access requirements."
    ],
    [
      "Koordinasikan rencana teknis",
      "Coordinate technical plans",
      "Lengkapi survei dan rancangan akses bersama tim teknis sesuai ruang lingkup.",
      "Complete surveys and access designs with technical specialists within scope."
    ],
    [
      "Tindak lanjuti rekomendasi",
      "Follow up recommendations",
      "Kawal evaluasi dan arsipkan kewajiban pelaksanaan serta pemantauannya.",
      "Coordinate evaluation and record implementation and monitoring obligations."
    ]
  ],
  "iso": [
    [
      "Tentukan standar dan lingkup",
      "Define standard and scope",
      "Identifikasi standar, lokasi, proses, serta status sistem manajemen saat ini.",
      "Identify the standard, sites, processes and current management system."
    ],
    [
      "Tinjau kesenjangan sistem",
      "Review system gaps",
      "Petakan kebijakan, prosedur, kompetensi, dan bukti pengendalian yang perlu disiapkan.",
      "Map policies, procedures, competence and required control evidence."
    ],
    [
      "Siapkan penerapan dan audit",
      "Prepare implementation and audits",
      "Dampingi dokumentasi, audit internal, tinjauan manajemen, dan koreksi temuan.",
      "Support documentation, internal audits, management review and corrective actions."
    ],
    [
      "Koordinasikan asesmen lembaga",
      "Coordinate external assessment",
      "Siapkan proses sertifikasi atau akreditasi serta tindak lanjut temuan lembaga.",
      "Prepare certification or accreditation assessment and external findings follow-up."
    ]
  ]
};
export const categoryProcess=(category:string,locale:Locale)=>records[category].map(row=>({title:row[locale==="id"?0:1],description:row[locale==="id"?2:3]}));
