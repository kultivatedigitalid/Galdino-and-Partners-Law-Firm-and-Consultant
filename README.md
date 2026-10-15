# Galdino & Partner

Repository resmi handover: https://github.com/afinitasid/Galdino-Partner-Website (PRIVATE), branch `main`. Deadline handover: 8 Oktober 2026. Riwayat Git proyek Law dipertahankan.

Aplikasi website bilingual Indonesia/Inggris memakai **Astro**, adapter **Node standalone**, dan package manager **npm**. Versi Node yang diperlukan: **>=22.12.0**; lingkungan verifikasi menggunakan Node 24.11.1.

```sh
git clone https://github.com/afinitasid/Galdino-Partner-Website.git
cd Galdino-Partner-Website
cd outputs/galdino_partner/website
npm ci
npm run qa
npm run dev -- --background
```

Kelola development server dengan `npm exec astro dev status`, `npm exec astro dev logs`, dan `npm exec astro dev stop`. Untuk produksi: `npm run build`, lalu `npm start`. Endpoint `/api/contact/` memerlukan Node; hasil static saja tidak dapat menggantikan endpoint tersebut.

Lihat [README aplikasi](outputs/galdino_partner/website/README.md), [environment](outputs/galdino_partner/website/docs/ENVIRONMENT.md), [deployment](outputs/galdino_partner/website/docs/DEPLOYMENT.md), dan [laporan handover](outputs/galdino_partner/website/docs/HANDOVER.md). `.env.example` hanya berisi nama variabel dengan nilai kosong. Simpan environment nyata secara privat, jangan commit atau tampilkan credential.

`outputs/galdino_partner/website` adalah aplikasi yang dijalankan. Dokumen bisnis, brand, rencana, dan bukti historis di direktori lain tetap dipertahankan. File sementara di `tmp`, dependency, cache, build, log, dan eksperimen lokal dikecualikan; file yang sudah ada tetap berada di laptop.

## Vercel

Import repository ke Vercel dengan **Root Directory** `outputs/galdino_partner/website` dan **Node.js 24.x**. Konfigurasi `vercel.json` di direktori aplikasi memilih Astro, `npm ci`, dan `npm run build:vercel`. Panduan environment, verifikasi, dan deployment tersedia di [VERCEL.md](outputs/galdino_partner/website/docs/VERCEL.md). Build Node standalone tetap tersedia.

## Pending

Handover belum boleh dinyatakan Completed sebelum bukti fresh clone dan screen recording tersedia. Status terkini dan commit yang diuji dicatat dalam laporan handover. Peluncuran produksi memerlukan persetujuan konten provisional, verifikasi Hostinger/Node, SMTP nyata, GTM/GA, domain/HTTPS, dan Search Console. Indexing tetap dinonaktifkan.
