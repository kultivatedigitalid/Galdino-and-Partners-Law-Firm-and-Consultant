# Blueprint Rancangan Website Galdino and Partner

**Tiga alternatif desain homepage, strategi SEO, UX, dan arsitektur Astro**  
Versi: 15 Juli 2026  
Status: rancangan untuk dipilih - belum merupakan website production

## 0. Ringkasan keputusan

Rancangan ini memakai dua sumber utama yang diberikan: `Strategi_Website_Galdino_and_Partner_Revisi_Perizinan.pdf` dan `Playbook SEO notebooklm (1).pdf`. File DOCX pendamping dan ekstrak teks SEO hanya dipakai untuk membantu analisis terstruktur atas materi PDF yang sama. Bila hasil ekstraksi berbeda atau kurang lengkap, PDF terkait menjadi rujukan otoritatif. Rekomendasi teknis yang mudah berubah diverifikasi ke dokumentasi resmi Astro, Google Search Central, web.dev, Schema.org, dan WCAG; sumber eksternal tersebut tidak dipakai untuk menambah klaim bisnis Galdino and Partner.

**Rekomendasi awal: pilih Mockup 1 - Modern Clarity sebagai baseline V1.** Arah ini paling dekat dengan keputusan sumber: putih-minimal-humanis, formal-modern, foto autentik, satu CTA dominan, dua pilar layanan setara, dan versi awal yang ringan. Ambil treatment profil/experience yang formal dari Mockup 2. Pertahankan Mockup 3 sebagai eksperimen opsional, bukan default V1, karena WebGL menambah risiko performance dan pemeliharaan.

### Hal yang dikunci oleh strategi

1. Segmen primer adalah korporasi Indonesia.
2. `Legal Services` dan `Konsultasi Perizinan` tampil sebagai dua pilar setara.
3. Tujuan website adalah membangun authority sekaligus mendorong konsultasi.
4. V1 harus sederhana, ringan, dan mudah dikelola.
5. Halaman inti: Home, Profile, Services, Projects/Experience, Blog, Contact, Privacy Policy, dan Disclaimer.
6. Perizinan diposisikan sebagai konsultasi, pemetaan kebutuhan, dan pendampingan proses - bukan “jasa urus cepat” atau jaminan terbit.
7. Trust harus berasal dari materi yang dapat dibuktikan: profil yang disetujui, pengalaman anonim, proses yang transparan, alamat/kontak legal, kebijakan privasi, dan disclaimer.
8. Konten awal berbahasa Indonesia, tetapi struktur harus siap untuk versi Inggris.
9. Blog berjalan satu artikel setiap tiga minggu setelah materi awal siap.
10. Foto autentik partner/tim/aktivitas kerja diutamakan; screenshot referensi pihak lain tidak boleh dipakai sebagai aset.

### Gate sebelum production

Belum tersedia: logo resmi, nama legal yang terkonfirmasi, domain, brand guideline, foto autentik, data kontak, profil partner, daftar layanan hukum final, sektor perizinan final, experience yang disetujui, privacy policy, disclaimer, dan izin publikasi. Semua preview sengaja memakai wordmark, palet, dan konten format sementara. Tidak ada angka pencapaian, award, badge, logo klien, testimoni, atau klaim hasil yang ditambahkan.

---

## 1. Fondasi bersama untuk ketiga rancangan

### 1.1 Target user

- Direksi/founder yang membutuhkan arah awal terkait kebutuhan hukum atau perizinan bisnis.
- In-house legal, corporate secretary, compliance, licensing, dan government relations yang sudah memiliki isu lebih spesifik.
- Tim operasional/investasi yang sedang menilai kesiapan usaha, OSS RBA, NIB, izin sektoral, atau kepatuhan pasca-perizinan.
- Pembaca insight yang datang dari pencarian informasional dan perlu diarahkan ke layanan yang relevan.

### 1.2 Jobs to be done

Pengunjung harus dapat menjawab lima pertanyaan dalam waktu singkat:

1. Apakah firma ini memahami konteks bisnis saya?
2. Apakah kebutuhan saya masuk layanan hukum atau konsultasi perizinan?
3. Siapa yang menangani dan bagaimana proses kerjanya?
4. Bukti pengalaman apa yang aman dan relevan untuk dilihat?
5. Bagaimana memulai konsultasi tanpa mengirim informasi sensitif?

### 1.3 Arsitektur informasi V1

| Prioritas | Halaman | Tujuan bisnis | Peran SEO |
|---|---|---|---|
| P0 | Home | Menjelaskan posisi, dua pilar, trust, dan CTA | Menargetkan kategori brand + law firm/perizinan secara luas; mendistribusikan internal link |
| P0 | Services / Layanan | Hub dua pilar dan jalur kebutuhan | Hub transactional; mengalirkan authority ke detail layanan |
| P0 | Detail Konsultasi Perizinan | Menjelaskan masalah, prasyarat, proses, deliverable, disclaimer | Money pages untuk intent spesifik |
| P0 | Profile / Tentang Firma | Menjelaskan firma, partner, pendekatan, dan governance konten | Entity/authority page |
| P0 | Contact | Menyediakan intake aman, email, telepon, WhatsApp, alamat | Local/entity trust dan conversion |
| P1 | Projects / Experience | Menampilkan pengalaman anonim yang disetujui | Relevance proof dan internal linking ke layanan |
| P1 | Blog / Insight | Menjawab intent informasional dan regulatory updates | Topical authority, GEO, dan jalur ke service pages |
| P1 | Privacy Policy + Disclaimer | Transparansi data dan batas informasi | Trust; bukan halaman akuisisi utama |
| P2 | Search, newsletter, direktori tim, resources, bilingual | Skalabilitas setelah konten/tim siap | Long-term discoverability |
| P3 | Portal tracking, pusat dokumen klien | Hanya setelah autentikasi, SOP, security, dan retensi data siap | Tidak untuk V1 publik |

### 1.4 Prinsip UX bersama

- **Focus on the user:** navigasi mengikuti kebutuhan pengunjung, bukan struktur internal firma.
- **Clarity before persuasion:** “masalah - ruang lingkup - proses - batas - CTA” tampil sebelum copy promosi.
- **Progressive disclosure:** homepage memberi orientasi; detail dan disclaimer ada di halaman layanan.
- **Recognition over recall:** dua pilar dan empat jalur perizinan terlihat jelas; pengguna tidak dipaksa menebak istilah.
- **One primary action:** first fold memakai satu CTA dominan, `Jadwalkan Konsultasi Awal`.
- **Feedback:** focus, hover, validation, loading, success, dan error state harus terlihat serta dapat dibaca screen reader.
- **Predictability:** menu konsisten, breadcrumb pada halaman dalam, CTA tidak berubah istilah tanpa alasan.
- **Safe intake:** form awal tidak meminta lampiran atau dokumen sensitif; persetujuan Privacy Policy wajib.
- **Accessibility by default:** semantic HTML, keyboard flow, target sentuh memadai, kontras, alt text, skip link, dan reduced motion.
- **Mobile-first:** copy, CTA, service selector, dan kontak tetap lengkap di perangkat sempit; tidak ada informasi inti yang hanya muncul saat hover.

### 1.5 Struktur SEO bersama

**Konvensi heading**

- Satu H1 deskriptif per halaman sebagai konvensi editorial.
- H2 untuk section/intent besar; H3 untuk layanan, tahap, experience, atau artikel.
- Heading tidak dipakai semata-mata untuk ukuran visual.
- Hero, navigation, CTA, dan visual tidak boleh menyisipkan H1 duplikat.

**URL ID yang direkomendasikan**

```text
/
/profil/
/layanan/
/layanan/hukum/[slug-yang-telah-divalidasi]/
/layanan/perizinan/kesiapan-usaha/
/layanan/perizinan/oss-rba-nib/
/layanan/perizinan/perizinan-sektoral/
/layanan/perizinan/kepatuhan-pembaruan/
/pengalaman/
/insight/
/insight/[slug]/
/kontak/
/privacy-policy/
/disclaimer/
```

Jika versi Inggris disetujui, gunakan `/en/` dan hreflang; jangan mencampur dua bahasa dalam satu URL.

**Seed keyword - harus diuji volume, difficulty, SERP, dan intent**

- Brand/entity: `Galdino and Partner`, variasi nama resmi setelah dikonfirmasi.
- Kategori: `law firm dan konsultan perizinan`, `konsultan hukum bisnis`, `konsultasi perizinan usaha`.
- Transactional licensing: `konsultan OSS RBA`, `konsultasi NIB perusahaan`, `pendampingan perizinan usaha`, `konsultan perizinan sektoral`, `kepatuhan pasca perizinan`.
- Informational: `apa itu OSS RBA`, `dokumen awal NIB`, `tingkat risiko kegiatan usaha`, `tahapan perizinan usaha`, `pembaruan data usaha`, `checklist konsultasi perizinan`.
- Legal-service keywords baru diterbitkan setelah daftar layanan dan kompetensi final disahkan.

Playbook meminta inventaris minimum 80 keyword yang dikelompokkan berdasarkan search intent. Daftar di atas hanya seed, bukan klaim volume atau peluang.

**Metadata**

- Title unik, jelas, dan target operasional 45-61 karakter sesuai Playbook; nama firma ditempatkan bila membantu konteks.
- Meta description unik, konkret, dan mengundang langkah berikutnya; bukan keyword stuffing atau janji ranking.
- Canonical absolut; Open Graph/Twitter metadata; `noindex` untuk preview/staging.
- Tanggal publikasi dan pembaruan nyata pada artikel; tidak mengubah tanggal tanpa perubahan substantif.

**Schema setelah data terverifikasi**

- Home/Profile/Contact: `LegalService` sebagai tipe Schema.org dan properti organisasi yang benar-benar tersedia.
- Service detail: `Service` + provider ke entity utama.
- Halaman dalam: `BreadcrumbList`.
- Article: `Article`/`BlogPosting`, author, reviewer bila relevan, datePublished, dateModified, citations.
- Profile partner: `Person` hanya untuk data yang disetujui.
- FAQ: markup hanya jika pertanyaan/jawaban benar-benar terlihat; tidak menjanjikan rich result.
- Jangan membuat `AggregateRating`, award, review, office, atau credential yang tidak terbukti.

**Internal linking**

```text
Home
  -> Services hub
      -> Detail layanan
          -> Experience terkait
          -> Insight terkait
          -> Contact
  -> Profile
  -> Experience
  -> Latest insights

Insight pillar
  -> Supporting articles
  -> Detail layanan relevan
  -> Contact
```

Tidak boleh ada orphan page. Halaman penting maksimal tiga klik dari Home. Anchor text harus deskriptif, bukan pengulangan `klik di sini`.

---

## 2. Mockup 1 - Modern Clarity (tanpa 3D)

[[MOCKUP_1_SCREENSHOT]]

### 2.1 Konsep utama desain

**Gaya:** modern, clean, asimetris, lapang, dengan off-white, hijau tua, teal, dan emas hangat provisional. Bentuk rounded terkontrol, hero copy besar, grid services kuat, dan foto autentik sebagai anchor visual.

**Kesan:** firma kontemporer yang kompeten, terbuka, dan mudah diajak berdiskusi tanpa kehilangan authority.

**Target utama:** owner/direksi, tim legal/compliance, dan calon klien yang ingin memahami relevansi layanan dengan cepat.

**Mengapa cocok:** paling dekat dengan arah putih-minimal-humanis pada strategi, menggabungkan kontras kartu secara terbatas, aksen editorial hangat, satu CTA utama, serta V1 ringan tanpa carousel atau animasi berat.

### 2.2 Struktur halaman dan prioritas

P0: Home, Profile, Services hub, empat jalur licensing yang telah divalidasi, Contact, Privacy, Disclaimer.  
P1: Experience, Blog index/detail, halaman legal services setelah daftar final disetujui.  
P2: English, search, partner directory, newsletter, resources.

### 2.3 Rancangan homepage

| Urutan | Section | Isi dan tujuan | Heading/CTA |
|---|---|---|---|
| 1 | Header | Logo sementara, Profile, Services, Experience, Blog, Contact | CTA `Konsultasi awal` |
| 2 | Hero split | Foto autentik di kanan; value proposition dan dua pilar | H1: `Pendampingan yang jelas untuk langkah bisnis Anda.` CTA: `Jadwalkan konsultasi awal` |
| 3 | Trust strip | Dua pilar setara, proses transparan, informasi dijaga | Tautan ke Profile/Experience |
| 4 | Company overview | Posisi firma sebagai penasihat dan pendamping proses | H2 tentang kejelasan hukum + operasional |
| 5 | Services preview | Dua kartu besar: Legal Services dan Konsultasi Perizinan | CTA berbeda per pilar tetapi tidak bersaing di first fold |
| 6 | Licensing pathways | Kesiapan usaha; OSS RBA/NIB; sektoral; kepatuhan/pembaruan | Internal link ke detail |
| 7 | Process | Lima tahap dengan disclaimer otoritas dan kelengkapan dokumen | H2 `Setiap tahap dapat dijelaskan` |
| 8 | Experience | Tiga format anonim; tidak memuat klaim aktual sampai disetujui | CTA `Lihat pengalaman` |
| 9 | Why us | Komunikasi jelas, ruang lingkup terukur, informasi terkendali | Tidak memakai angka spekulatif |
| 10 | Insight | Tiga tema awal dan link ke hub | CTA `Lihat semua insight` |
| 11 | Contact | Form minimum + pilihan WhatsApp/email setelah konfirmasi | CTA `Kirim permintaan awal` |
| 12 | Footer | Kontak, alamat, navigasi, Privacy, Disclaimer, Fraud Alert bila perlu | Entity consistency |

### 2.4 UX dan user flow

1. **Masalah belum terdefinisi:** Home -> dua pilar -> jalur kebutuhan -> konsultasi awal.
2. **Masalah sudah spesifik:** landing service -> prasyarat/tahapan -> experience -> contact.
3. **Masuk dari Google:** article -> jawaban ringkas -> service terkait -> contact.
4. **Mencari trust:** Home -> Profile/partner -> Experience anonim -> contact.

Hero memberi pilihan utama tanpa membuat pengunjung memilih dari banyak kartu. Section berikutnya mengubah “siapa firma ini?” menjadi “bagaimana firma bekerja?”, lalu “apa jalur saya?”, dan akhirnya “bagaimana memulai?”. Foto harus merupakan aktivitas nyata; bila aset belum siap, gunakan placeholder yang jujur, bukan stok legal generik.

### 2.5 SEO strategy khusus konsep

- H1 lebih conversational tetapi tetap mengandung konteks `pendampingan` dan bisnis; category keyword ditempatkan alami pada lede, H2 services, title, dan internal links.
- Service cards adalah HTML links, bukan click handler pada `div`.
- Foto hero memakai `<Picture>`/`<Image>` Astro, width/height eksplisit, alt text kontekstual; tidak menjadi satu-satunya pembawa pesan.
- Metadata Home contoh (final setelah domain/nama legal):  
  `Title: Pendampingan Hukum & Perizinan | Galdino and Partner`  
  `Description: Konsultasi hukum dan perizinan untuk kebutuhan bisnis, dengan ruang lingkup serta tahapan kerja yang jelas sejak konsultasi awal.`
- Schema entity di Home, breadcrumb di halaman dalam, Service pada detail, Article pada insight.
- Kekuatan SEO tertinggi di antara tiga opsi karena konten utama langsung HTML, visual ringan, dan struktur link terlihat jelas.

### 2.6 Content strategy

Tone: profesional, tenang, konkret, konsultatif. Gunakan `pahami`, `petakan`, `diskusikan`, `konsultasikan`, `tinjau`, dan `dampingi`. Hindari `pasti terbit`, `jalur cepat`, `beres tanpa repot`, `harga spesial`, dan urgensi artifisial.

Setiap service page berisi: definisi kebutuhan, siapa yang biasanya membutuhkan, ruang lingkup, di luar ruang lingkup, dokumen awal, lima tahap, deliverable, penanggung jawab/assignment method, FAQ, disclaimer, experience/insight terkait, CTA.

### 2.7 Arsitektur Astro dan best practice

- Mayoritas section sebagai `.astro` statis; JavaScript hanya menu mobile dan form state.
- Blog memakai content collection Markdown; MDX hanya jika artikel membutuhkan diagram interaktif.
- Shared components: `HeroSplit`, `TrustStrip`, `ServicePillars`, `ProcessRail`, `ExperienceCard`, `InsightCard`, `ContactPanel`, `SeoHead`, `SchemaGraph`.
- CSS tokens dan component styles; tidak ada ketergantungan UI berat.
- Risiko performance rendah; target LCP bergantung terutama pada foto hero dan font.
- Accessibility: foto tidak memakai teks embedded; CTA focus jelas; kartu tidak bersarang link; form memberi pesan error per field.

---

## 3. Mockup 2 - Institutional Trust (tanpa 3D)

[[MOCKUP_2_SCREENSHOT]]

### 3.1 Konsep utama desain

**Gaya:** formal-corporate, putih hangat, navy, burgundy, dan brass provisional; serif untuk heading, sans-serif untuk body; garis tipis, grid editorial, tombol rectangular, services register, dan experience matrix.

**Kesan:** institusional, berhati-hati, authoritative, dan dokumenter. Visual menarik lewat tipografi, alignment, dan whitespace, bukan dekorasi.

**Target utama:** in-house counsel, corporate secretary, compliance, board/executive, dan procurement yang mengutamakan kredibilitas serta scanability.

**Mengapa cocok:** menempatkan trust, profil partner, batas klaim, dan struktur informasi di depan. Sangat sesuai bila brand ingin terlihat lebih konservatif daripada lifestyle/creative.

### 3.2 Struktur halaman dan prioritas

Arsitektur halaman sama dengan fondasi bersama, tetapi urutan navigasi menonjolkan `The Firm`, `Services`, `Experience`, `Insights`, lalu `Contact`. Partner profile dan engagement process memperoleh bobot lebih tinggi. P2 dapat menambah downloadable credentials setelah materi dan izin siap.

### 3.3 Rancangan homepage

| Urutan | Section | Isi dan tujuan | Heading/CTA |
|---|---|---|---|
| 1 | Utility + header | Bahasa, status kontak, menu formal | CTA `Consultation` |
| 2 | Editorial hero | H1 besar kiri; mandate overview kanan | `Penasihat hukum dan perizinan untuk keputusan bisnis yang terukur.` |
| 3 | Credibility ledger | Profil terverifikasi, experience anonim, ruang lingkup nyata | Tidak memakai metrik kosong |
| 4 | The Firm + partner | Foto monokrom autentik, bio, focus, approach | CTA `Diskusikan kebutuhan Anda` |
| 5 | Services register | Daftar bernomor, deskripsi ringkas, internal link | Lebih mudah dibaca legal/procurement |
| 6 | Experience matrix | Label, matter type, ringkasan aman | Evidence tanpa visual marketing |
| 7 | Engagement process | Lima tahap dalam grid formal | Disclaimer eksplisit |
| 8 | Editorial register | Satu pillar insight + dua supporting topics | Tanggal, author, reviewer saat production |
| 9 | Initial inquiry | Form dan trust message | CTA formal |
| 10 | Footer | Office, notices, Privacy, Disclaimer | Data konsisten |

### 3.4 UX dan user flow

Homepage bekerja seperti executive brief. Pengunjung melihat posisi, standar kredibilitas, penanggung jawab, daftar layanan, bukti, proses, baru kemudian inquiry. Ini mengurangi rasa “salesy”, memudahkan pembaca yang ingin melakukan due diligence, dan cocok untuk pembacaan desktop yang lebih panjang.

Risiko UX: gaya terlalu formal dapat terasa berjarak bagi founder/SME dan CTA bisa kalah oleh density informasi. Mitigasi: ringkas paragraf, gunakan bahasa Indonesia yang jelas, tampilkan satu CTA berulang secara konsisten, dan jangan menjadikan setiap section seperti dokumen legal.

### 3.5 SEO strategy khusus konsep

- Services register memberi anchor text deskriptif dan link HTML yang kuat.
- Profile/partner lebih menonjol sehingga mendukung entity signals dan author/reviewer credibility setelah data valid.
- Heading serif hanya presentasional; semantic structure tetap H1/H2/H3.
- Metadata Home contoh:  
  `Title: Penasihat Hukum & Perizinan | Galdino and Partner`  
  `Description: Pendampingan hukum dan konsultasi perizinan bagi kebutuhan korporasi, dengan proses, ruang lingkup, dan komunikasi yang terstruktur.`
- Potensi SEO setara Mockup 1; conversion cenderung lebih lambat tetapi lead yang masuk dapat lebih teredukasi.

### 3.6 Content strategy

Tone: formal, presisi, restrained, tetapi tetap plain language. Paragraf pendek; fakta/credential disertai source-of-truth internal dan tanggal verifikasi. Gunakan matter descriptions anonim, `what we do / what we do not do`, dan editorial governance yang jelas.

Blog dapat tampil sebagai `Editorial Register`: category, title, one-sentence answer, author, reviewer, published/updated, sources. Ini membantu E-E-A-T dan kutipan answer engine tanpa mengubah website menjadi portal berita.

### 3.7 Arsitektur Astro dan best practice

- Komponen statis: `EditorialHero`, `MandateOverview`, `CredibilityLedger`, `PartnerFeature`, `ServicesRegister`, `ExperienceMatrix`, `EditorialRegister`.
- Hampir zero-JS; menu dan form saja.
- Typography self-hosted/subset; serif fallback harus tetap stabil agar CLS tidak naik.
- Tables hanya untuk data komparatif; pada mobile berubah menjadi labeled blocks, bukan horizontal scroll yang sulit dibaca. Maintainability tetap tinggi dengan risiko implementasi rendah-menengah.

---

## 4. Mockup 3 - Regulatory Constellation (3D/WebGL)

[[MOCKUP_3_SCREENSHOT]]

### 4.1 Konsep utama desain

**Gaya:** dark, immersive, data-informed, dengan canvas WebGL di hero. Teal menunjukkan koneksi; emas menandai node penting; teks utama tetap HTML.

**Kesan:** firma yang mampu memetakan kompleksitas regulasi secara modern dan sistematis.

**Target utama:** perusahaan digital, investasi, proyek kompleks, tim legal/compliance yang nyaman dengan visual interaktif, serta stakeholder yang mencari diferensiasi brand.

**Mengapa relevan:** visual bukan timbangan hukum dekoratif. Jaringan 3D memodelkan hubungan antara tujuan bisnis, dokumen, persyaratan, proses, dan otoritas. Pesannya konsisten dengan strategi perizinan: kebutuhan harus dipetakan, dependensi dijelaskan, status dikonfirmasi, dan keputusan akhir tetap pada otoritas.

### 4.2 Struktur halaman dan prioritas

Arsitektur informasi tetap sama agar 3D tidak mengubah SEO atau task flow. WebGL hanya ada di Home. Service detail, Blog, Profile, Experience, dan Contact tetap terang/tenang atau dark-light hybrid tanpa canvas kontinu.

### 4.3 Rancangan homepage

| Urutan | Section | Isi dan tujuan | Heading/CTA |
|---|---|---|---|
| 1 | Dark header | Menu ringkas dan CTA | `Konsultasi awal` |
| 2 | Hero + WebGL island | H1 HTML kiri; regulatory constellation kanan | `Kompleksitas dipetakan menjadi langkah yang jelas.` |
| 3 | Meaning band | Node, connection, core, dan batas visual | Menjelaskan relevansi; bukan alat diagnosis |
| 4 | Service architecture | Dua pilar besar | Link ke service hubs |
| 5 | Licensing nodes | Empat jalur perizinan | Internal link detail |
| 6 | Human-led process | Lima tahap di surface terang | Menegaskan teknologi tidak memberi kesimpulan legal |
| 7 | Evidence layer | Experience anonim | Format contoh sampai disetujui |
| 8 | Knowledge graph | Pillar/supporting content | Hub-and-spoke visual dan link nyata |
| 9 | Contact | Form statis, tidak berhubungan dengan WebGL | CTA utama |
| 10 | Footer | Fallback, legal, contact | HTML-first |

### 4.4 UX dan user flow

Alur inti sama dengan Mockup 1. Perbedaannya: 3D menciptakan orienting moment pada first fold dan memberi mnemonic tentang `pemetaan dependensi`. Pointer movement memberi parallax ringan; scroll hanya mengubah kedalaman secara halus; tidak ada informasi atau navigasi yang bergantung pada click di canvas.

Risiko UX muncul jika visual menarik perhatian lebih lama daripada value proposition atau terlihat seperti dashboard/AI tool. Mitigasi: H1/lede/CTA berada di kiri dengan kontras tinggi, label menjelaskan makna, canvas `aria-hidden`, tidak menerima keyboard focus, dan section berikutnya langsung kembali ke struktur layanan yang konkret.

### 4.5 SEO strategy khusus konsep

- Semua copy, heading, services, internal links, FAQ, dan CTA berada dalam HTML server-rendered.
- Canvas tidak menggantikan content atau anchor text dan tidak perlu di-crawl.
- Static poster/fallback memiliki alt description; canvas dekoratif `aria-hidden`.
- Metadata Home contoh:  
  `Title: Hukum & Perizinan Bisnis | Galdino and Partner`  
  `Description: Pemetaan kebutuhan hukum dan perizinan bisnis melalui konsultasi awal, ruang lingkup terukur, serta pembaruan status yang jelas.`
- Potensi SEO tetap baik, tetapi hanya jika initial bundle dan LCP tidak dikorbankan.

### 4.6 Content strategy

Tone sedikit lebih progressive tetapi tidak boleh berubah menjadi jargon teknologi. Istilah `network`, `node`, atau `intelligence` hanya dipakai untuk menjelaskan konsep visual; isi layanan tetap menggunakan bahasa konsultasi, pendampingan, prasyarat, tahapan, deliverable, dan batas kewenangan.

Konten knowledge graph menghubungkan satu pillar page dengan artikel pendukung. Visual graph tidak menjadi sitemap pengganti; semua link tetap terlihat sebagai HTML.

### 4.7 Konsep dan bentuk 3D/WebGL

- **Bentuk:** constellation/network 3D dengan beberapa ring. Node pusat merepresentasikan tujuan bisnis; node lain merepresentasikan kebutuhan, dokumen, komitmen, tahap, dan otoritas; garis merepresentasikan dependensi.
- **Penempatan:** kanan hero desktop; turun di bawah CTA pada mobile. Ukuran canvas disediakan sejak awal untuk mencegah CLS.
- **Mouse/pointer:** rotasi maksimum kecil; kembali ke posisi netral saat pointer keluar.
- **Scroll:** depth shift ringan pada hero saja, tanpa scroll hijacking.
- **Hover/click:** opsional untuk highlight label, tetapi bukan navigasi dan bukan konten eksklusif.
- **Reduced motion:** scene statis atau frame rate sangat rendah; kontrol dan informasi tetap lengkap.
- **Low-end:** tidak menginisialisasi WebGL; poster SVG/WebP/AVIF langsung tampil.

### 4.8 Pilihan teknologi

| Opsi | Kelebihan | Kekurangan | Keputusan |
|---|---|---|---|
| Pure WebGL ringan | Payload sangat kecil, kontrol penuh, cocok untuk points/lines | Math/shader bespoke dan bus factor lebih tinggi | **Cocok untuk constellation sederhana; dipakai pada preview** |
| Three.js | API matang, lebih mudah dikembangkan/dites, fleksibel untuk scene lebih kaya | Bundle tambahan; perlu tree-shaking dan disiplin render | **Rekomendasi production bila visual berkembang** |
| React Three Fiber | Declarative dan bagus jika ekosistem React 3D sudah ada | Membawa React runtime untuk satu hero; kompleksitas islands bertambah | Tidak direkomendasikan untuk V1 ini |
| Spline embed | Prototyping cepat, mudah bagi desainer | Vendor/embed dependency, kontrol SEO/performance/fallback lebih lemah | Hanya eksplorasi, bukan elemen critical production |

### 4.9 Implementasi Astro, lazy loading, dan fallback

1. Render hero copy serta poster fallback di server.
2. Sisakan aspect ratio/fixed block size untuk canvas.
3. Dynamic import modul 3D setelah hero mendekati viewport dan browser idle; bila framework island dipakai, gunakan strategi visible/idle yang setara.
4. Uji `prefers-reduced-motion`, WebGL support, device memory, viewport, dan context loss.
5. Cap device pixel ratio; pause saat tab hidden; batasi nodes/lines; hindari texture dan model bila tidak perlu.
6. Load chunk 3D setelah konten LCP; WebGL tidak boleh menjadi resource critical.
7. Static fallback adalah ilustrasi jaringan yang menyampaikan makna yang sama, plus teks penjelasan di HTML.
8. Hapus event listener dan renderer saat unmount/navigation.

### 4.10 Core Web Vitals dan risk test

Target lapangan pada persentil ke-75: LCP <= 2.5 detik, INP <= 200 ms, CLS <= 0.1. Playbook juga menetapkan page load di bawah 3 detik dan gambar di bawah 100 KB sebagai checklist operasional. Budget proyek untuk 3D harus ditetapkan sebelum coding; rekomendasi awal: tidak ada model GLB untuk constellation, chunk 3D terpisah, poster ringan, dan tidak ada third-party embed.

**Kill criteria:** hapus WebGL dari V1 bila (a) value proposition lebih lambat dipahami, (b) LCP/INP field data gagal, (c) reduced-motion/fallback tidak setara, (d) maintenance tidak memiliki owner, atau (e) user testing menyebutnya menarik tetapi tidak membantu memilih layanan. Dalam kondisi tersebut, 3D adalah gimmick.

---

## 5. Content strategy lintas desain

### 5.1 Tone of voice

**Karakter:** profesional, tenang, konkret, mudah dipahami, tidak hiperbolis. Kalimat mengutamakan konteks dan tindakan yang dapat diverifikasi.

**Gunakan**

- `Kami membantu memetakan kebutuhan perizinan dan mendampingi proses sesuai ruang lingkup yang disepakati.`
- `Jadwalkan konsultasi awal untuk menilai kebutuhan usaha, dokumen, dan tahapan yang relevan.`
- `Status pekerjaan disampaikan berdasarkan tahapan yang dapat dikonfirmasi.`
- `Persyaratan dapat berbeda berdasarkan kegiatan usaha, lokasi, risiko, dan regulasi yang berlaku.`

**Hindari**

- `Pasti jadi`, `jamin terbit`, `jalur cepat`, `orang dalam`, `tanpa dokumen`, `beres tanpa repot`.
- Countdown, promo, harga coret, badge palsu, atau CTA impulsif.
- Pernyataan `pantau real-time` sebelum portal, SOP, dan keamanan tersedia.
- Konten generik tanpa sudut pandang ahli, sumber, atau tanggal peninjauan.

### 5.2 Model konten per halaman

| Halaman | Konten wajib | Konten trust/conversion |
|---|---|---|
| Home | Positioning, dua pilar, process, service preview, experience, insight, contact | Profil/experience yang disetujui, disclaimer singkat, satu CTA first fold |
| Profile | Company introduction, visi/nilai, partner, fokus keahlian, approach | Bio dan credential terverifikasi; author/reviewer links |
| Services hub | Perbedaan dua pilar dan selector kebutuhan | Batas layanan, proses umum, CTA |
| Service detail | Masalah, ruang lingkup, out-of-scope, prasyarat, tahapan, deliverable, FAQ | Penanggung jawab/assignment, experience, article links, authority disclaimer |
| Experience | Matter type, konteks aman, kebutuhan, peran, ruang lingkup, hasil proses yang diizinkan | Metode anonimisasi dan izin publikasi |
| Blog index | Category, title, direct summary, date | Filter/search baru bila volume cukup |
| Article | Direct answer, key takeaways, penjelasan, sources, FAQ, author/reviewer, updated date | CTA ke service terkait; informational disclaimer |
| Contact | Minimal intake, email/phone/WhatsApp/address, privacy consent | `Jangan sertakan dokumen sensitif`; response expectation yang nyata |

### 5.3 Struktur artikel untuk SEO dan answer engine

1. H1 berupa pertanyaan/topik yang spesifik.
2. Ringkasan 40-60 kata yang menjawab intent secara langsung dan tidak overstated.
3. Key takeaways 3-5 butir.
4. Konteks dan definisi; siapa yang terdampak.
5. Proses/checklist/decision tree yang jelas.
6. Caveat: konteks, tanggal, dan kebutuhan verifikasi kasus spesifik.
7. Referensi resmi/primer yang dapat ditelusuri.
8. Author + reviewer yang benar-benar terlibat.
9. FAQ yang berasal dari pertanyaan pengguna, bukan keyword stuffing.
10. Internal link ke pillar, service, related article, dan Contact.

### 5.4 Ide konten awal - seed untuk riset, bukan judul final

| Cluster | Pillar / supporting idea | Intent | Jalur internal link |
|---|---|---|---|
| Kesiapan usaha | Panduan awal memetakan kebutuhan perizinan sebelum usaha berjalan | Informational | Services hub -> kesiapan usaha |
| Kesiapan usaha | Checklist konteks dan dokumen untuk konsultasi awal | Practical | Contact + kesiapan usaha |
| OSS RBA | Memahami hubungan kegiatan usaha, risiko, dan kebutuhan perizinan | Informational | OSS RBA/NIB |
| OSS RBA | Pertanyaan yang perlu dijawab sebelum memulai pengisian OSS | Informational/transactional | OSS RBA/NIB -> Contact |
| OSS RBA | Kapan data usaha perlu ditinjau atau diperbarui? | Informational | Kepatuhan/pembaruan |
| Sektoral | Cara menilai apakah suatu kegiatan membutuhkan izin sektoral | Informational | Perizinan sektoral |
| Sektoral | Mengapa daftar persyaratan dapat berbeda menurut lokasi dan kegiatan | Informational | Perizinan sektoral -> Contact |
| Kepatuhan | Memahami pemenuhan komitmen setelah izin awal | Informational | Kepatuhan/pembaruan |
| Kepatuhan | Cara membaca dan mengomunikasikan status proses secara bertanggung jawab | Informational | Process + Contact |
| Legal/business | Dokumen dan konteks yang membantu konsultasi hukum bisnis lebih efektif | Informational | Legal services hub setelah validasi |
| Governance | Cara kami menjaga kerahasiaan pada publikasi experience | Trust/navigational | Experience + Privacy |
| Regulatory update | Apa yang perlu diverifikasi sebelum mengandalkan perubahan regulasi | Informational/GEO | Relevant service + Contact |

Ritme production mengikuti strategi firma: tiga artikel awal yang telah direview, kemudian satu artikel setiap tiga minggu. Target generik Playbook sebanyak 5-10 artikel pendukung hanya diterapkan sebagai scale-up setelah kapasitas review ahli tersedia; kuantitas tidak boleh mengorbankan akurasi.

---

## 6. Arsitektur teknis Astro yang direkomendasikan

### 6.1 Prinsip arsitektur

- Static-first untuk seluruh halaman publik.
- Islands hanya untuk menu, form state, filter saat benar-benar dibutuhkan, dan WebGL opsional.
- Content dan firm data tidak tersebar sebagai hard-coded copy di banyak komponen.
- Type-safe content schema untuk mencegah artikel/service tanpa metadata penting.
- URL, canonical, schema, sitemap, robots, Open Graph, dan feed dibuat dari satu source of truth.
- Komponen berdasarkan fungsi konten, bukan nama halaman semata.

### 6.2 Struktur folder

```text
/
├─ astro.config.mjs
├─ package.json
├─ tsconfig.json
├─ public/
│  ├─ favicon.svg
│  ├─ robots-fallback.txt
│  └─ media/
│     └─ approved/                 # hanya aset dengan izin publikasi
└─ src/
   ├─ assets/
   │  ├─ images/                   # diproses Astro Image/Picture
   │  └─ illustrations/
   ├─ components/
   │  ├─ chrome/
   │  │  ├─ Header.astro
   │  │  ├─ MobileMenu.astro
   │  │  ├─ Footer.astro
   │  │  └─ Breadcrumbs.astro
   │  ├─ seo/
   │  │  ├─ SeoHead.astro
   │  │  ├─ SchemaGraph.astro
   │  │  └─ SocialMeta.astro
   │  ├─ blocks/
   │  │  ├─ Hero.astro
   │  │  ├─ ServicePillars.astro
   │  │  ├─ ProcessSteps.astro
   │  │  ├─ ExperiencePreview.astro
   │  │  ├─ InsightPreview.astro
   │  │  └─ ContactCta.astro
   │  ├─ cards/
   │  │  ├─ ServiceCard.astro
   │  │  ├─ ExperienceCard.astro
   │  │  └─ InsightCard.astro
   │  ├─ forms/
   │  │  ├─ InquiryForm.astro
   │  │  ├─ ConsentField.astro
   │  │  └─ FormStatus.astro
   │  └─ islands/
   │     └─ RegulatoryConstellation.ts   # hanya bila Mockup 3 dipilih
   ├─ layouts/
   │  ├─ BaseLayout.astro
   │  ├─ ContentLayout.astro
   │  └─ ArticleLayout.astro
   ├─ data/
   │  ├─ firm.ts
   │  ├─ navigation.ts
   │  ├─ services.ts
   │  └─ redirects.ts
   ├─ content.config.ts
   ├─ content/
   │  ├─ insights/*.md
   │  ├─ services/*.md
   │  ├─ experience/*.md
   │  └─ people/*.md
   ├─ pages/
   │  ├─ index.astro
   │  ├─ profil/index.astro
   │  ├─ layanan/index.astro
   │  ├─ layanan/hukum/[...slug].astro
   │  ├─ layanan/perizinan/[...slug].astro
   │  ├─ pengalaman/index.astro
   │  ├─ insight/index.astro
   │  ├─ insight/[...slug].astro
   │  ├─ kontak/index.astro
   │  ├─ privacy-policy.astro
   │  ├─ disclaimer.astro
   │  ├─ robots.txt.ts
   │  └─ api/inquiry.ts            # hanya bila adapter/serverless disetujui
   ├─ styles/
   │  ├─ tokens.css
   │  ├─ global.css
   │  └─ utilities.css
   └─ utils/
      ├─ seo.ts
      ├─ schema.ts
      ├─ dates.ts
      └─ contentLinks.ts
```

Nama/path content collection harus disesuaikan dengan Astro stable saat build dimulai; struktur di atas sengaja tidak mengunci versi package sebelum kickoff.

### 6.3 Content collections dan schema data

**Insight** minimal: `title`, `description`, `publishedAt`, `updatedAt`, `category`, `author`, `reviewer`, `sources`, `relatedServices`, `relatedInsights`, `draft`, `noindex`, `heroImage`, `heroAlt`.

**Service** minimal: `name`, `shortDescription`, `pillar`, `problems`, `scope`, `outOfScope`, `initialDocuments`, `steps`, `deliverables`, `responsiblePeople`, `relatedExperience`, `relatedInsights`, `disclaimer`, `draft`.

**Experience** minimal: `publicLabel`, `matterType`, `sectorOptional`, `need`, `teamRole`, `safeScope`, `safeOutcomeOptional`, `approvalOwner`, `approvedAt`, `relatedServices`, `draft`.

**People** minimal: `name`, `role`, `focus`, `bio`, `credentials`, `photo`, `photoAlt`, `publicationApproved`, `reviewedAt`.

Build harus gagal bila service live tidak memiliki disclaimer, article tidak memiliki description/author/sources policy, foto tidak memiliki alt, atau experience tidak memiliki approval metadata.

### 6.4 Layout dan reusable components

- `BaseLayout`: language, canonical, SEO, header, main, footer, consent hooks.
- `ContentLayout`: breadcrumbs, in-page navigation, related content.
- `ArticleLayout`: author/reviewer, dates, sources, disclaimer, related links.
- `SeoHead`: title template, description, canonical, robots, Open Graph, sitemap link.
- `SchemaGraph`: JSON-LD dari data tervalidasi; tidak menerima raw string dari editor.
- `InquiryForm`: field minimum, privacy consent, no attachment, status accessible.
- Visual components menerima data melalui props; konten tidak disalin di tiga tempat.

### 6.5 Full static atau dynamic

**Default yang direkomendasikan:** static site untuk seluruh konten publik + satu endpoint serverless/hybrid untuk contact form. Ini mempertahankan kecepatan/caching sambil memungkinkan validasi server, rate limiting, routing email, dan audit log minimum.

Alternatif full static dengan third-party form hanya dipilih setelah privacy/DPA, lokasi pemrosesan, retensi, spam protection, dan akses data disetujui. Portal klien, login, status pekerjaan, dan document center tidak masuk V1.

### 6.6 CMS, Markdown, dan MDX

- Mulai dengan Markdown content collections jika editor teknis tersedia.
- Gunakan MDX hanya untuk artikel yang membutuhkan komponen interaktif; jangan menjadikan MDX default tanpa kebutuhan.
- CMS tidak wajib untuk launch. Tambahkan headless CMS jika tim nonteknis perlu workflow draft-review-approve, scheduling, media library, dan role permissions.
- CMS harus menjaga validation schema, preview, revisions, dan publication approval untuk people/experience.

### 6.7 Asset management

- `src/assets` untuk gambar yang perlu transformasi; `public` hanya untuk file pass-through yang memang tidak perlu diproses.
- Nama file deskriptif, metadata izin publikasi, owner, tanggal approval, dan alt text.
- Astro Image/Picture menghasilkan responsive `srcset`, AVIF/WebP, width/height, dan lazy loading untuk non-LCP.
- Hero image diberi priority hanya jika benar-benar LCP; jangan preload semua visual.
- Tidak memakai screenshot referensi sebagai aset.
- Font self-hosted, subset karakter yang diperlukan, `font-display: swap`, dan fallback metrics diuji.

---

## 7. Best practice website building

### 7.1 Performance

- Static HTML dan CSS sebagai default; JavaScript per-island.
- Project performance budgets disepakati dan diuji pada build serta CI.
- LCP image memiliki ukuran/resolution yang sesuai viewport; gambar lain lazy-loaded.
- Tidak ada autoplay carousel, background video, chat widget berat, atau banyak tracker pada launch.
- Third-party script dimuat setelah consent/interaction bila memungkinkan.
- Cache immutable hashed assets; Brotli/Gzip; CDN; preconnect hanya untuk origin yang benar-benar dipakai.
- Uji Lighthouse lab, tetapi keputusan performance memakai field data GSC/CrUX setelah traffic cukup.

### 7.2 Accessibility

- Target WCAG 2.2 AA.
- Semantic landmarks, skip link, heading order logis, label form nyata, error summary, status `aria-live`.
- Kontras teks normal sekurang-kurangnya 4.5:1; focus indicator tidak tertutup sticky header.
- Target minimum WCAG dipenuhi; tombol utama ditargetkan sekitar 44x44 CSS px untuk kenyamanan.
- Tidak ada task yang hanya bisa mouse, hover, gesture drag, atau canvas.
- Reduced motion; pause animation; tidak ada flash; canvas 3D dekoratif.
- Alt text menjelaskan tujuan gambar, bukan mengulang caption.

### 7.3 Responsive design

- Breakpoint mengikuti titik rusak konten, bukan daftar device.
- Test minimum 320, 360, 390, 768, 1024, 1280, 1440 px.
- H1 dan CTA tidak overflow; navigation menjadi menu keyboard-accessible.
- Table/matrix menjadi labeled cards di mobile; tidak mengecilkan teks hingga sulit dibaca.
- Safe areas, orientation change, zoom 200%, dan reflow diuji.

### 7.4 Clean code, scalability, maintainability

- TypeScript strict, lint, formatting, content schema validation, component tests untuk logic kritis.
- Design tokens sebagai source of truth; tidak menyalin warna/spacing literal di banyak file.
- Komponen kecil tetapi tidak terlalu granular; satu komponen memiliki satu peran konten.
- Feature flags untuk bilingual, CMS, form provider, dan WebGL.
- Dependency review; lockfile; update cadence; changelog dan architecture decision records.
- Preview environment `noindex`; production domain/canonical dicek pada build.

### 7.5 Security dan privacy

- HTTPS, HSTS, Content-Security-Policy, Referrer-Policy, Permissions-Policy, dan secure headers sesuai hosting.
- Server-side validation, rate limit, honeypot/anti-bot, size limits, dan sanitasi output untuk form.
- CSRF protection bila endpoint memakai cookie/session; tidak diperlukan secara otomatis untuk semua stateless endpoint.
- Jangan menaruh API key, email credential, atau private endpoint di client bundle.
- Pesan inquiry diperlakukan sebagai data sensitif: least privilege, retensi terbatas, audit akses, dan tidak dicetak ke analytics/log publik.
- Tidak menerima attachment pada V1. Kanal aman untuk dokumen ditentukan setelah engagement.
- Analytics memakai consent dan data minimization sesuai kebijakan yang disahkan.

### 7.6 QA dan acceptance criteria

- Build tanpa broken link, duplicate title/description, missing canonical, missing alt, atau schema error.
- Sitemap hanya berisi canonical indexable pages; preview/draft/noindex tidak masuk.
- Robots tidak memblokir resource penting dan menunjuk sitemap production.
- Keyboard test dari header sampai submit; screen reader smoke test; axe/Lighthouse sebagai bantuan, bukan pengganti manual.
- Form success/error/spam/offline state diuji.
- Cross-browser: Chrome/Edge, Firefox, Safari; iOS Safari dan Android Chrome.
- WebGL: support, low-end fallback, reduced motion, context loss, resize, rotation, hidden tab, dan no-JS.

---

## 8. Perbandingan tiga rancangan

| Kriteria | Mockup 1 - Modern Clarity | Mockup 2 - Institutional Trust | Mockup 3 - Regulatory Constellation |
|---|---|---|---|
| Kelebihan | Balance terbaik antara authority, approachability, visual hierarchy, dan conversion | Trust, readability, dan struktur due-diligence paling kuat | Diferensiasi visual dan storytelling “pemetaan kompleksitas” paling kuat |
| Kekurangan | Memerlukan foto autentik berkualitas agar tidak terasa generik | Bisa terasa konservatif/berjarak; conversion lebih lambat | Dapat mengalihkan perhatian; maintenance dan QA lebih besar |
| Target paling cocok | Korporasi luas, founder/direksi, legal/compliance | In-house counsel, board, procurement, enterprise | Digital/innovation-led companies dan brand yang ingin eksperimen |
| Tingkat kesulitan | Menengah | Rendah-menengah | Tinggi |
| Potensi SEO | Sangat tinggi | Sangat tinggi | Tinggi bila HTML-first dan chunk 3D tertunda |
| Potensi conversion | Sangat tinggi | Tinggi untuk lead yang sudah teredukasi | Tinggi secara perhatian; kualitas conversion harus diuji |
| Dampak visual | Tinggi, modern, tetap tenang | Sedang-tinggi, formal dan premium | Sangat tinggi |
| Interaktivitas | Rendah-terukur | Rendah | Tinggi |
| Risiko performance | Rendah | Rendah | Menengah-tinggi |
| Kompleksitas implementasi | Component/CSS standar | Component/CSS standar dengan typographic QA | WebGL lifecycle, fallback, feature detection, profiling |
| Maintainability | Tinggi | Sangat tinggi | Menengah-rendah tanpa owner 3D |
| Kesesuaian strategi brand | **Sangat tinggi** - paling dekat white-minimal-humanist | Tinggi - trust kuat, sedikit lebih formal dari arah awal | Sedang - bertentangan sebagian dengan V1 simple/light |
| 3D meningkatkan UX? | Tidak relevan | Tidak relevan | Ya hanya jika membantu memahami dependensi; gimmick bila hanya “wow” |
| Rekomendasi | **Baseline V1** | Sumber treatment Profile/Experience atau alternatif bila sangat corporate | Comparison/controlled experiment |

### Keputusan rekomendasi

Gunakan **Mockup 1** sebagai design system utama. Ambil dari Mockup 2: services register untuk halaman layanan, profil partner yang formal, experience matrix, dan editorial governance. Jangan membawa WebGL ke V1 kecuali user testing, performance prototype, dan ownership menunjukkan manfaat. Jika dipakai, batasi ke satu hero island dengan fallback setara.

---

## 9. Roadmap implementasi yang menggabungkan kedua sumber

### Fase 0 - validasi sebelum coding

- Pilih desain dan arah brand.
- Konfirmasi nama legal/domain, logo, kontak, alamat, channel WhatsApp/email.
- Validasi daftar legal services, sektor perizinan, scope/out-of-scope.
- Siapkan profil partner, foto, experience anonim, Privacy Policy, Disclaimer.
- Tetapkan owner editorial, reviewer, response SOP, dan data retention form.

### Minggu 1 - foundation

- Final sitemap, URL, redirect plan, navigation, content schema.
- Setup Astro, static output default, design tokens, BaseLayout, SeoHead, schema utilities.
- Audit performance baseline; sitemap/robots scaffolding; staging noindex.

### Minggu 2 - research

- Keyword research minimal 80 kandidat; transactional vs informational; competitor/keyword gap.
- Prioritaskan low-hanging fruit hanya berdasarkan data nyata.
- Content mapping dari query -> page -> CTA -> internal links.

### Minggu 3 - money pages dan design system

- Build Home, Profile, Services hub, Contact, serta detail layanan prioritas yang sudah disetujui.
- Implement responsive components, accessibility, schema, image pipeline.
- Bila Mockup 3 dipilih, WebGL tetap feature flag dan diuji terpisah.

### Minggu 4 - content dan launch QA

- Publikasikan tiga artikel awal yang disetujui strategi firma.
- Siapkan backlog menuju 5-10 supporting articles hanya bila review capacity mencukupi.
- End-to-end QA: crawl, metadata, schema, form, privacy, performance, accessibility, responsive, security headers.
- Submit sitemap dan verifikasi GSC setelah production live.

### Bulan 2+

- GBP/local optimization hanya jika data kantor dan operasional memang relevan serta disetujui.
- Authority/link building melalui kontribusi ahli yang nyata; tidak membeli/manipulasi backlink.
- Monitoring GSC/GA4; dashboard query, landing page, qualified inquiry, dan conversion path.

### Bulan 3+

- Tinjau halaman posisi 9-15; perbarui answer, source, internal links, dan intent alignment.
- Audit indexing, canonical, orphan pages, schema, CWV field data.

### Bulan 4+

- Otomasi hanya untuk pekerjaan rutin dengan SOP dan human review.
- CMS, bilingual, search, newsletter, atau portal hanya berdasarkan kebutuhan tervalidasi.

---

## 10. KPI dan measurement plan

**Technical:** index coverage, crawl errors, valid canonical, sitemap coverage, LCP/INP/CLS, page load, JS/image budget, form error rate.

**Search:** non-brand impressions/clicks, query clusters, top 3/10/20 distribution, rich-result eligibility, cited/linked mentions yang dapat ditelusuri, internal link coverage.

**Content:** publishing cadence, articles reviewed on time, source completeness, update backlog, organic entrances, assisted conversions.

**Business:** qualified inquiries, service/category selected, inquiry-to-consultation rate, source attribution, response time yang benar-benar dapat dipenuhi.

Jangan memakai traffic sebagai satu-satunya KPI. Hasil utama adalah organic traffic yang berujung pada inquiry berkualitas, sesuai studi kasus Playbook.

---

## 11. Pertanyaan keputusan sebelum pembuatan Astro

Jawaban yang direkomendasikan ditandai **default**; pengguna dapat memilih lain.

1. Desain mana yang dipilih: Mockup 1, 2, atau 3? **Default: Mockup 1**, dengan treatment formal Mockup 2 untuk Profile/Experience.
2. Apakah website full static atau memerlukan dynamic feature? **Default: static pages + serverless inquiry endpoint**.
3. Apakah blog memakai Markdown atau MDX? **Default: Markdown; MDX hanya untuk kebutuhan interaktif**.
4. Apakah CMS diperlukan saat launch? **Default: tidak; tambah setelah editorial workflow jelas**. Jika editor nonteknis wajib publish, pilih headless CMS sejak awal.
5. Apakah contact form diperlukan? **Default: ya**, field minimum, consent, tanpa attachment.
6. Apakah WhatsApp/email diintegrasikan? **Default: ya setelah nomor/alamat terverifikasi**, tanpa prefilled sensitive data.
7. Apakah animasi diperlukan? **Default: microinteraction halus dan reduced-motion**, tanpa autoplay carousel.
8. Apakah multi-language diperlukan saat launch? **Default: Indonesia dulu, struktur siap English**.
9. Apakah sitemap dan robots otomatis? **Default: ya**, dengan production site URL dan draft/noindex filtering.
10. Deployment: Vercel, Netlify, Cloudflare, atau lain? Pilih berdasarkan form/adapter, region, log/privacy, preview workflow, dan owner. Tidak perlu diputuskan berdasarkan popularitas saja.
11. Apakah Mockup 3D/WebGL dipertahankan? **Default: opsi pembanding; jangan masuk V1 kecuali tes lulus**.
12. Jika 3D dipakai, pilih Three.js, React Three Fiber, Spline, atau WebGL ringan? **Default: pure WebGL untuk network sederhana; Three.js bila scope tumbuh; hindari R3F/Spline untuk satu hero**.
13. Styling preference: vanilla CSS/tokens, Tailwind, CSS modules? **Default: modern CSS + design tokens + component-scoped styles**.
14. Apakah analytics menggunakan GSC saja atau GSC + GA4? **Default: GSC + analytics minim data setelah consent/policy disahkan**.
15. Siapa owner untuk approval layanan, partner bio, experience, artikel, dan inquiry response?
16. Apa domain final, nama legal, alamat, nomor telepon, email, dan WhatsApp yang boleh dipublikasikan?
17. Legal services dan sektor perizinan mana yang benar-benar menjadi scope V1?
18. Apakah ada foto autentik yang sudah memiliki izin penggunaan dan alt-text context?
19. Apakah diperlukan Google Business Profile/local SEO dan apakah kantor menerima kunjungan sesuai informasi publik?
20. Berapa lama data inquiry disimpan, siapa yang dapat mengakses, dan kanal aman apa yang dipakai untuk dokumen setelah konsultasi?

Setelah jawaban di atas disetujui, tahap berikutnya adalah membuat Astro project dan implementation backlog. Preview sekarang sengaja tidak dijadikan proyek Astro agar keputusan desain/arsitektur tidak dikunci sebelum persetujuan.

---

## 12. Source map dan rujukan

### Sumber yang diberikan

Sumber keputusan desain, bisnis, dan SEO adalah `Strategi_Website_Galdino_and_Partner_Revisi_Perizinan.pdf` serta `Playbook SEO notebooklm (1).pdf`. Versi DOCX strategi dan ekstrak teks SEO hanya membantu analisis terstruktur; keduanya tidak digunakan untuk menambahkan materi di luar PDF.

| Keputusan | Rujukan strategi |
|---|---|
| Segmen korporasi, dua pilar setara, V1 ringan | Opening callout `Arah yang dikunci` |
| Feature priorities dan items yang ditunda | Bagian 2 - Fitur dan Prioritas Implementasi |
| Sitemap, navigation, conversion flows | Bagian 3 - Arsitektur Website dan Alur Pengguna |
| Page breakdown dan homepage | Bagian 4 dan 6 |
| Visual white-minimal-humanist, palette provisional, authentic photo | Bagian 5 - Arah UI/UX dan Sistem Visual |
| Content/material launch checklist | Bagian 7 |
| Licensing taxonomy, page structure, feature adaptation | Bagian 8 - Revisi Konsultan Perizinan |
| Guardrail anti-suspicious/calo dan copywriting | Bagian 8 - Guardrail + Copywriting |
| SEO sebagai sumber/answer engine dan 8 phases | SEO Playbook halaman 1-4 |
| Technical checklist, keyword research, silo, E-E-A-T, on-page/schema | SEO Playbook halaman 2-3 |
| Monitoring, schedule, low-hanging fruit | SEO Playbook halaman 4-5 |
| Satu CTA jelas pada first fold | SEO Playbook halaman 5 |

### Referensi teknis resmi

- Astro Islands: https://docs.astro.build/en/concepts/islands/
- Astro Content Collections/API: https://docs.astro.build/en/reference/modules/astro-content/
- Astro Images: https://docs.astro.build/en/guides/images/
- Astro Sitemap: https://docs.astro.build/en/guides/integrations-guide/sitemap/
- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Breadcrumb structured data: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- Google Organization structured data: https://developers.google.com/search/docs/appearance/structured-data/organization
- Core Web Vitals thresholds: https://web.dev/articles/defining-core-web-vitals-thresholds
- Schema.org LegalService: https://schema.org/LegalService
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Google Design - focus on the user / human-centered design: https://design.google/library/google-design-2019
