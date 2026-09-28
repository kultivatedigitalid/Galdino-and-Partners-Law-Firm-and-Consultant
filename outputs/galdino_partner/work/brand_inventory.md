# Inventaris Brand dan Aset — Galdino and Partner

Tanggal pemeriksaan: 15 Juli 2026  
Ruang lingkup: `outputs/galdino_partner`, workspace `Law`, dan file SEO yang disebutkan pengguna. Pemeriksaan dilakukan tanpa browsing internet dan tanpa mengubah dokumen sumber.

## Ringkasan eksekutif

- Belum tersedia paket identitas brand yang siap produksi. Tidak ditemukan logo resmi terpisah, brand guideline, kode warna resmi, font brand berlisensi, favicon, foto partner/kantor asli, video, atau aset 3D.
- Tiga gambar yang tertanam di dokumen strategi adalah screenshot komposit website pihak lain untuk referensi visual. Ketiganya identik di seluruh versi DOCX dan **bukan** aset Galdino and Partner yang boleh dipakai sebagai materi website.
- Identitas yang paling dapat dipercaya saat ini adalah arah verbal/strategis: nama kerja “Galdino and Partner”, positioning sebagai law firm sekaligus konsultan perizinan, target primer korporasi Indonesia, dua pilar layanan yang setara, dan tujuan membangun authority serta membuka konsultasi.
- Palet, tipografi, contoh headline, CTA, kategori layanan, dan warna presentasi dalam DOCX masih bersifat rekomendasi/provisional; jangan diperlakukan sebagai brand standard yang telah disetujui.
- Tidak ditemukan website/prototipe Astro lama. Tidak ada `package.json`, `astro.config.*`, `src/`, atau `public/` yang sudah ada sebelum pekerjaan saat ini; repositori Git juga belum memiliki commit.

## Daftar file relevan

### Dokumen strategi Galdino and Partner

| File | Ukuran | Peran | Status otoritas |
|---|---:|---|---|
| `Strategi_Website_Galdino_and_Partner_Revisi_Perizinan.docx` | 751.523 byte | Versi terbaru; menambahkan pemetaan konsultasi perizinan, trust, batas klaim, dan transparansi proses | Kandidat sumber utama untuk arah strategi. Saat pemeriksaan file sedang terbuka di Word; paket diperiksa dari salinan temporer read-only |
| `Strategi_Website_Galdino_and_Partner_Revisi_Rujukan.docx` | 769.506 byte | Strategi lengkap beserta rujukan dan tiga screenshot komposit | Sumber pendukung yang kuat; sebagian isi diteruskan ke versi Perizinan |
| `Strategi_Website_Galdino_and_Partner_Revisi_Rujukan.pdf` | 256.112 byte | Ekspor PDF versi Rujukan | Sumber pendamping untuk verifikasi tampilan/halaman |
| `Strategi_Website_Galdino_and_Partner.docx` | 745.374 byte | Versi awal strategi | Arsip; prioritas di bawah versi revisi |
| `Strategi_Website_Galdino_and_Partner.pdf` | 258.816 byte | Ekspor PDF versi awal | Arsip; prioritas di bawah versi revisi |
| `~$rategi_Website_Galdino_and_Partner_Revisi_Perizinan.docx` | 162 byte | File lock sementara Microsoft Word | Bukan dokumen/aset; jangan dipakai atau disalin ke deliverable |

### Referensi SEO dan riset kompetitor

| File/folder | Peran | Catatan |
|---|---|---|
| `C:/Users/Joshua/Downloads/Playbook SEO notebooklm (1).pdf` | Playbook SEO yang disebutkan pengguna | Ada, 119.195 byte, terakhir diubah 23 Juni 2026. Relevan untuk prinsip SEO, bukan sumber identitas brand |
| `outputs/seo_competitor_research_20260714/template_riset_kompetitor_seo.xlsx` | Riset struktur/SEO law firm | Berisi benchmark AHP, SSEK, SIP, ABNR, dan Dentons HPRP; berguna untuk IA/SEO, tetapi bukan bukti mengenai Galdino and Partner |
| `Riset_Kompetitor.png`, `Petunjuk.png`, `Audit_UI_UX.png`, `Daftar_Kategori.png` | Preview sheet workbook | Materi QA/preview, bukan aset website |
| `build_competitor_research.mjs` dan `.inspect.ndjson` | Builder dan hasil inspeksi workbook | Materi proses; jangan dikirim sebagai aset production |

### Artefak yang muncul selama pekerjaan saat ini

- `outputs/galdino_partner/mockups/assets/base.css` dan `ui.js` dibuat pada 15 Juli 2026 sekitar 10:25, setelah inventaris dimulai. Ini adalah artefak implementasi tugas saat ini, bukan prototipe lama atau sumber brand.
- Folder `outputs/galdino_partner/work/strategy_docx_extract/` dan `qa/` juga merupakan artefak ekstraksi/QA saat ini. Jangan menjadikannya bukti historis mengenai brand.
- Repositori Git memiliki nol commit; tidak ada riwayat lokal yang dapat digunakan untuk menemukan aset/prototipe terdahulu.

## Audit aset visual

### Tiga gambar tertanam dalam DOCX

Ketiga versi DOCX memuat set gambar yang sama persis (ukuran dan hash identik):

| Entry DOCX | Dimensi | Ukuran | Hash SHA-256 awal | Isi |
|---|---:|---:|---|---|
| `word/media/image1.png` | 505 × 375 px | 210.633 byte | `4DEA47B94BE74B2D` | Komposit referensi law-firm bergaya gelap/teal, kartu layanan, profil, peta |
| `word/media/image2.png` | 496 × 369 px | 230.291 byte | `C5B81B8D58BE76A9` | Komposit referensi krem/editorial, metrik, layanan, dan tim |
| `word/media/image3.png` | 501 × 388 px | 259.436 byte | `56BC1EE752B497AB` | Komposit referensi putih-minimal-humanis, visual kerja, layanan, pengalaman, CTA |

Klasifikasi: **referensi visual pihak lain, bukan aset brand**. Dokumen sendiri menyatakan pola hanya boleh diadaptasi secara etis dan tidak disalin mentah-mentah. Gambar, logo, orang, dan teks di dalam screenshot tidak memiliki bukti lisensi untuk publikasi Galdino and Partner.

### Aset yang tidak ditemukan

- Logo/wordmark resmi dalam SVG, AI, EPS, PDF vector, PNG transparan, atau format sumber lainnya.
- Brand guideline atau design-token sheet.
- Favicon, app icon, social/OG image, atau email signature.
- Foto asli partner, tim, aktivitas kerja, kantor, gedung, atau lokasi.
- Font web (`woff/woff2`) atau file font brand (`ttf/otf`) beserta lisensinya.
- Video, motion asset, Lottie, atau aset 3D (`glb/gltf/obj/fbx`).
- Icon set khusus, pola ilustrasi, peta, atau visual data milik firma.
- Website/prototipe lama, source Astro, source HTML/CSS, atau design source Figma/Sketch/XD/PSD.

## Identitas yang dapat dipercaya dari strategi

Poin berikut dinyatakan konsisten di dokumen revisi dan layak dijadikan constraint desain:

- Nama kerja publik: **Galdino and Partner**. Belum ada bukti bahwa ini adalah nama badan hukum lengkap; nama legal masih harus dikonfirmasi.
- Positioning: company profile untuk **law firm dan konsultan perizinan**.
- Segmen primer: **korporasi Indonesia**.
- Struktur penawaran: **Legal Services** dan **Konsultasi Perizinan** tampil setara.
- Tujuan website: membangun **authority/trust** dan mendorong **konsultasi**, dengan V1 yang sederhana serta ringan.
- Arah visual: **putih-minimal-humanis**, formal dan modern, tetapi tidak dingin atau dekoratif.
- Arah layout: container lapang, hierarki vertikal jelas, grid kartu sederhana, ruang putih cukup, dan satu CTA dominan per section.
- Arah fotografi: foto autentik partner, aktivitas kerja, atau lingkungan kantor yang telah disetujui; hindari stok legal generik.
- Arah motion: hover/transisi ringan dan focus state jelas; tidak ada animasi berat atau autoplay carousel.
- Tone of voice: profesional, ringkas, konkret, mudah dipahami; kata kerja konsultatif seperti “Pahami”, “Diskusikan”, dan “Konsultasikan”.
- Orientasi layanan perizinan: penasihat/pendamping proses berbasis regulasi; jelaskan ruang lingkup, prasyarat, tahapan, deliverable, dan penanggung jawab. Hindari janji “cepat/pasti jadi”.

## Arahan provisional — jangan dianggap brand final

### Palet

Strategi hanya mengunci kategori warna awal: putih/off-white sebagai dasar, hijau tua untuk authority, teal untuk CTA, dan emas hangat secukupnya sebagai aksen editorial. Teks secara eksplisit menyatakan palet harus divalidasi saat logo dibuat; tidak ada kode HEX resmi.

DOCX memakai warna presentasi langsung `#173F3B`, `#1D2524`, `#5D6866`, `#B4862B`, `#FFFFFF`, dengan fill `#173F3B`, `#EAF1EF`, dan `#F7F1E4`. Warna-warna ini boleh dipakai sebagai token sementara untuk mockup bila diberi label **provisional**, tetapi tidak boleh diklaim sebagai palet brand yang disetujui.

### Tipografi

Strategi menyarankan sans-serif modern untuk navigasi/body dan serif terukur untuk heading/editorial bila tetap mudah dibaca. Tidak ada nama font final atau lisensi font. DOCX memakai Calibri secara langsung, namun itu adalah format dokumen, bukan bukti bahwa Calibri adalah font brand.

### Copy dan layanan

- “Pendampingan hukum dan perizinan yang jelas untuk kebutuhan bisnis Anda” adalah contoh hero copy, bukan tagline resmi.
- “Konsultasikan Kebutuhan Anda” dan “Jadwalkan Konsultasi Awal” adalah CTA rekomendasi, bukan wording yang sudah disahkan.
- Corporate, compliance, licensing, dispute resolution, investasi, OSS, ketenagakerjaan, ekspor-impor, dan sektor lainnya disebut sebagai contoh/pemetaan. Dokumen secara eksplisit melarang memperlakukannya sebagai daftar layanan final sebelum validasi.

## Data brand/bisnis yang masih harus diminta

Sebelum website dianggap production-ready, perlu konfirmasi dan materi berikut:

1. Logo master vector, variasi horizontal/stacked/monochrome, clear space, minimum size, dan aturan latar.
2. Nama legal lengkap firma/badan usaha, penulisan singkat resmi, domain, dan akun sosial yang sah.
3. Kode warna resmi, font family/weights, lisensi font, serta aturan ikon/ilustrasi.
4. Alamat kantor, email, telepon, WhatsApp, jam operasional, dan pihak penerima inquiry.
5. Daftar layanan final, deskripsi, ruang lingkup, sektor yang benar-benar dikuasai, dan disclaimer perizinan.
6. Foto partner/tim/kantor resolusi tinggi, bio, jabatan, fokus keahlian, alt-text facts, serta persetujuan publikasi/model release.
7. Experience/case studies yang boleh dipublikasikan, bentuk anonimisasi, bukti hasil, dan persetujuan tertulis.
8. Penghargaan, afiliasi, testimoni, metrik, dan logo klien hanya bila dapat diverifikasi dan telah diberi izin.
9. Privacy Policy, Disclaimer, consent text form, retention policy, dan kemungkinan Fraud Alert.
10. Konten awal blog/insight beserta pemilik editorial dan proses legal review.

## Risiko bila aset belum tersedia

| Risiko | Dampak |
|---|---|
| Logo/palet/font belum final | Rework lintas header, favicon, OG image, komponen, dan dokumentasi desain; konsistensi brand rendah |
| Foto autentik tidak tersedia | Trust turun atau tim terdorong memakai stok legal generik yang bertentangan dengan strategi |
| Screenshot referensi dipakai sebagai aset | Risiko hak cipta, salah representasi, dan peniruan identitas kompetitor |
| Nama legal/kontak/domain belum dikonfirmasi | Local SEO, schema, footer legal, CTA, dan formulir tidak dapat dipublikasikan dengan aman |
| Layanan/experience belum divalidasi | Risiko klaim menyesatkan, scope yang salah, konflik kerahasiaan, dan trust loss |
| Izin foto/logo klien/testimoni tidak ada | Risiko privasi, publicity rights, kerahasiaan, dan reputasi |
| Aset 3D tidak ada | Mockup WebGL harus memakai geometri abstrak buatan sendiri; bila dipaksa realistis, mudah menjadi gimmick dan memperbesar beban performa |
| Font/web asset license tidak jelas | Risiko lisensi dan perubahan tipografi di tahap akhir |

## Guardrail untuk tiga mockup sekarang

- Gunakan wordmark teks “Galdino and Partner” sebagai placeholder yang jelas; jangan membuatnya seolah logo final.
- Pusatkan palet sementara dalam CSS variables agar dapat diganti sekali saat identitas resmi tersedia.
- Jangan mengekspor tiga screenshot referensi sebagai hero/background/asset website; gunakan placeholder netral, abstraksi editorial orisinal, atau area foto yang diberi label “foto autentik diperlukan”.
- Jangan menampilkan angka, award, client logo, testimonial, nama case, atau klaim hasil yang belum tersedia.
- Untuk mockup 3D, gunakan bentuk orisinal yang relevan dengan konsep pemetaan regulasi/alur izin, bukan palu hakim, timbangan, gedung pengadilan, atau simbol legal stok. Sediakan static fallback dan jadikan WebGL enhancement opsional.
- Pisahkan keputusan yang “dikunci strategi” dari keputusan “sementara untuk eksplorasi visual” pada dokumentasi mockup.

## Kesimpulan

Workspace menyediakan strategi yang cukup kuat untuk membuat tiga mockup dan arsitektur Astro, tetapi belum menyediakan paket brand/content yang cukup untuk peluncuran production. Mockup dapat berjalan dengan identitas provisional yang mudah diganti; fase production harus memiliki gate persetujuan logo, data legal/kontak, layanan, foto, bukti trust, izin publikasi, dan kebijakan privasi/disclaimer.
