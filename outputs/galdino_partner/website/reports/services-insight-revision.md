# Layanan dan Insight — 6 Oktober 2026

## Gambar hero

38 foto Pexels yang berbeda digunakan pada kartu preview detail layanan di halaman kategori. Sesuai koreksi pengguna, foto stock layanan tidak digunakan pada banner detail. Foto preview ditampilkan dengan saturasi rendah melalui CSS; sumber tidak diubah selain pengaturan ukuran dan konversi WebP. Sumber setiap foto, nomor foto, tanggal akses, dan tautan lisensi dicatat di [service-stock-sources.json](service-stock-sources.json). Lisensi: https://www.pexels.com/license/.

Enam gambar reklame diberikan langsung oleh pengguna:

| Berkas sumber di Downloads | Layanan |
| --- | --- |
| ChatGPT Image Oct 6, 2026, 12_44_29 PM-1.png | Pajak Reklame |
| ChatGPT Image Oct 6, 2026, 12_44_31 PM-2.png | PBG Reklame |
| ChatGPT Image Oct 6, 2026, 12_44_32 PM-3.png | Perpanjangan Reklame |
| ChatGPT Image Oct 6, 2026, 12_44_34 PM-4.png | Izin Reklame |
| ChatGPT Image Oct 6, 2026, 12_44_36 PM-5.png | Audit Legalitas Reklame |
| ChatGPT Image Oct 6, 2026, 12_44_37 PM-6.png | Manajemen Reklame Multi-Lokasi |

Semua hero detail memakai judul, subheadline ringkas, dan CTA Konsultasi Gratis centered. Hero muat dalam satu viewport desktop. Detail selain reklame memakai kembali background dan orang dari kategori masing-masing di bawah copy; background tersedia dahulu dan orang masuk setelah 500 ms. Enam detail reklame memakai gambar pengguna sesuai tabel di atas sebagai layer sepanjang hero, dengan objek di kanan bawah dan ruang kosong di kiri. Gambar ditampilkan dengan object-fit: contain agar seluruh komposisi terlihat. Hero kategori dan Home mempertahankan visual masing-masing.

## Insight

Referensi layout: https://www.hostinger.com/blog/ dan https://www.hostinger.com/blog/working-with-ai-at-hostinger/.

Hero orang pada index Insight dipertahankan. Di bawahnya tersedia navigasi topik, artikel unggulan dengan foto besar, filter pencarian/kategori/tag, serta grid artikel berdasarkan kategori. Halaman artikel memiliki metadata di atas judul, foto utama setelah deskripsi, kolom baca, daftar isi, sumber, berbagi tautan, penulis, dan artikel terkait. Konten, sumber artikel, penerjemahan, dan jalur konsultasi tetap tersedia.

## Spacing yang telah disetujui

- Home: Tentang Perusahaan, Industri, Layanan, Mengapa Galdino.
- Kategori layanan: Daftar Layanan, Pendampingan, Proses, FAQ.
- Padding section 80–112 px desktop; 48–64 px mobile. Warna ruang kosong mengikuti background section, tanpa panel atau warna pemisah tambahan.

Kartu pada halaman kategori hanya menampilkan foto, judul, dan CTA Detail. Pencarian Semua Layanan dan informasi biaya di detail layanan tetap tersedia.

## Validasi

- Astro check: 0 error, 0 warning, 0 hint.
- Build produksi berhasil; validasi konten mencakup 167 halaman, 38 layanan, 6 kategori, dan 6 industri.
- 144 pemeriksaan browser lulus pada bahasa ID/EN, desktop, tablet, dan mobile. Seluruh 38 detail layanan serta 28 artikel diperiksa; headline desktop maksimal dua baris dan tidak ada overflow horizontal pada viewport yang diuji.
- Filter pencarian, reset, topik Insight, daftar isi artikel, kartu kategori, dan pengisian pilihan layanan dari CTA konsultasi berhasil.
- Axe tidak menemukan pelanggaran WCAG A/AA pada index Insight dan contoh artikel yang diuji. Tidak ada error JavaScript yang tertangkap.
- Spacing tambahan di halaman detail layanan serta halaman Industri, Our Experiences, About Us, dan Insight belum diterapkan karena masih menunggu pilihan pengguna.

## Validasi koreksi hero dan preview

- Peninjauan layout dan pemindaian mekanis dijalankan melalui dua sub-agent paralel. Temuan hierarki SplitHero diperbaiki pada detail layanan; pemindaian mekanis tidak menemukan pelanggaran layout.
- 241 pemeriksaan browser lulus: seluruh 38 detail pada ID/EN dan viewport 1440×900, 1280×631, 375×812; kartu pada enam kategori ID/EN; serta pemilihan layanan dari CTA konsultasi.
- Hero desktop muat satu layar, headline maksimal dua baris, subheadline satu baris, gambar memakai contain, dan tidak ada overflow horizontal. Tidak ada foto stock pada hero selain reklame; sumber hero reklame tetap enam gambar pengguna.
- Seluruh 38 kartu kategori memiliki foto stock berbeda dengan saturasi 0.35, tanpa deskripsi atau harga. Tidak ada error JavaScript yang tertangkap.

## Revisi gambar melebar, CTA, dan warna whitespace

- Gambar reklame kini memakai canvas seluas hero dan object-position kanan bawah; judul, subheadline, serta CTA hero tetap centered. Gambar asli tidak dipotong.
- Sesuai screenshot klarifikasi, CTA pada section Pahami kebutuhan berada rata kiri di kolom kedua pada seluruh 38 detail. Penempatan CTA hero tetap sama.
- Kartu kategori menampilkan judul dan Detail pada satu row. Foto stock, judul lengkap, dan tautan detail dipertahankan.
- Estimasi biaya dan harga di kartu Home dihapus. Tinggi minimum kartu disesuaikan dengan konten yang tersisa. Informasi biaya pada detail layanan dipertahankan.
- Whitespace hero terang mengikuti background kontennya: paper #f4f3f1 pada Home, kategori, detail layanan, Industri, Experiences, dan About Us; putih pada Insight karena kontennya putih. Layer gambar dengan bidang putih memakai multiply agar menyatu dengan background.
- Dua peninjauan paralel (layout dan pemindaian mekanis) selesai. 200 pemeriksaan browser lulus pada viewport 1280×631 dan 375×812, ID/EN, seluruh detail dan kategori, serta enam halaman utama. Tidak ada error JavaScript atau pelanggaran Axe pada contoh detail yang diuji.
- Astro check bersih: 0 error, 0 warning, 0 hint. Server preview disegarkan untuk memastikan CSS terbaru berlaku.

## Revision 6 October: image mapping, backgrounds and hero framing
- User confirmed only white section backgrounds should match paper gray #f4f3f1; black/red sections remain. Removed section-boundary rules, preserving cards, list rows and artwork lines.
- Individual service hero copy moved lower. Eight supplied files map in numeric order to KKPR, KRK, IPPR, IPPT, PBG-IMB, SLF, SLO Kelistrikan and SBU Konstruksi.
- Home category cards use categoryActivityImage, the same principal category imagery used by ServicesPage. Added paper-gray space before CompanyVideo / Cara kami bekerja.
- Related headings and service links receive red hover and keyboard-focus states. Layered foreground people use normal blending and no side mask.
- Built-in imagegen repaired source clipping for Services, Experiences and About. Final assets: src/assets/hero-services-layered-cutout-v4.webp, src/assets/hero-experiences-layered-cutout-v4.webp, src/assets/hero-about-layered-cutout-v4.webp. Original assets remain available.
- Final image prompt: Precise framing correction of the transparent team photo. Zoom out and shrink the entire team by 25 percent. Add at least 150 pixels transparent side gutters for every person. Complete outer jacket/hip/back silhouettes naturally behind the desk. Preserve faces, count, poses, clothing and desk objects. Fully opaque people, genuine transparent background, no fading. Keep the outer silhouettes inside the frame. Black and white photographic cutout; preserve transparent space above. The CSS retains grayscale for Services, Experiences and About.
- Two independent read-only layout/mechanical reviews informed selector scope and verified original alpha framing; source crop repair was then visually inspected.
- Verification before final asset replacement: 200 page/language/viewport checks passed, no browser errors; related hover changes to brand red, section separators absent. Final asset-specific inspection performed separately.

## Environmental detail hero assets
Installed supplied 03_47 PNG files in numeric order: 1 SPPL, 2 UKL-UPL, 3 AMDAL, 4 PERTEK Air Limbah/IPLC, 5 PERTEK Emisi, 6 SLO Lingkungan, 7 RKL-RPL, 8 DELH, 9 DPLH. Optimized to 1600px WebP at quality 88; preserved artwork and existing individual-service hero layout. Updated localized alt text and reused short hero leads. All 36 desktop/mobile and Indonesian/English checks passed with no browser errors, verifying the correct image, CTA service parameter, contain framing, desktop height and text line limits.

## Traffic and ISO hero assets
Installed supplied traffic artwork: intersection survey for Andalalin, roadworks for MRLL, entrance measurements for INRIT, median inspection for Izin Bukaan Median. Every individual ISO & Management Systems service uses Engineers Reviewing Plans at a Modern Campus (attachment 5), stored once as iso-shared-supplied.webp and shared across all eleven ISO category records. Preserved individual hero text, consultation route, framing and animation. 60 page/language/viewport checks passed with no browser errors. Astro check: 177 files, zero errors/warnings/hints.

## Consistent adaptation of all individual-service banners
User confirmed visual tone/people placement/whitespace/transitions should be unified, with centered text and CTA whose vertical spacing may adjust. Shared hero scene now uses 70% of desktop hero height, anchored right-bottom with contain framing and the source aspect ratio. The fade is applied to the actual image-sized canvas, removing the left seam. Gentle saturate(.35)/contrast(.98) preserves restrained color. Copy top spacing is 12svh with existing short-height override, while mobile retains a full-width image flowing below centered copy and a 1.5rem gap. Original source images preserved. Two independent layout/mechanical reviews completed. Verification: 304 service/language/viewport checks (38 services, ID/EN, 1280x631, 1440x900, 768x600, 375x812) passed, no browser errors. Astro check: 178 files, zero errors/warnings/hints. Build passed.
