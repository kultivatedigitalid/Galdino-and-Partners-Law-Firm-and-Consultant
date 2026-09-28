import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const sourcePath = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\outputs\\galdino_partner\\fase2\\GP_Fase2_Website_Content_Sheet_Mapping_Aligned_2026-08-14.xlsx";
const outputPath = "C:\\Users\\Joshua\\OneDrive\\Documents\\Law\\outputs\\galdino_partner\\fase2\\GP_Fase2_Website_Content_Sheet_Mapping_Checklist_Evidence_2026-08-14.xlsx";

const C = {
  black: "#0B0B0C", red: "#720D1C", gold: "#B18A4B", paper: "#F4F3F1", white: "#FFFFFF",
  ink: "#0B0B0C", muted: "#78716C", line: "#D6D3D1", amber: "#FEF3C7", amberText: "#92400E",
  redSoft: "#FEE2E2", redText: "#991B1B", greenSoft: "#DCFCE7", greenText: "#166534", blueSoft: "#DBEAFE", blueText: "#1E40AF",
};

const rows = [
  ["Langkah 05", "C22", "Buat Website Content Sheet", "â˜", "BISA DICENTANG SEKARANG", "Workbook content sudah tersedia dan tetap utuh dalam versi ini. Bukti: 01_GLOBAL s.d. 08_Source_Notes; khusus isi bilingual: 03_Content_ID!A4:Q48 dan 04_Content_EN!A4:Q48."],
  ["Langkah 05", "C23", "Tentukan pertanyaan yang perlu dijawab pada setiap halaman", "â˜", "BISA DICENTANG SEKARANG", "Pertanyaan utama per halaman telah didokumentasikan. Bukti: 02_Page_Questions!A4:I17 dan keterkaitannya dengan halaman pada 09_Page_Section_Mapping!D5:D50."],
  ["Langkah 05", "C24", "Tulis final copy secara langsung", "â˜", "BISA DICENTANG SEKARANG", "Copy ID/EN sudah ditulis pada level yang tersedia; bagian yang belum layak final tidak disamarkan dan diberi status blocked/placeholder. Bukti: 03_Content_ID!A4:Q48, 04_Content_EN!A4:Q48, serta 09_Page_Section_Mapping!U5:V50."],
  ["Langkah 05", "C25", "Masukkan headline, body, supporting points, bukti, dan CTA", "â˜", "BISA DICENTANG SEKARANG", "Komponen copy dan CTA telah dicatat dalam content sheet; bukti/dependensi ditautkan ke register. Bukti: 03_Content_ID!A4:Q48, 04_Content_EN!A4:Q48, 05_Proof_Placeholders, dan 09_Page_Section_Mapping!L5:X50."],
  ["Langkah 05", "C26", "Cantumkan sumber bukti atau Asset ID", "â˜", "BISA DICENTANG SEKARANG", "Setiap baris mapping memiliki Asset ID/N/A yang beralasan, Reference ID, dan Source Evidence. Bukti: 09_Page_Section_Mapping!O5:P50 serta AA5:AA50; inventaris lengkap di 10_Asset_Register dan 11_Reference_Register."],
  ["Langkah 05", "C27", "Tulis global copy satu kali pada bagian GLOBAL", "â˜", "BISA DICENTANG SEKARANG", "Global copy dipusatkan satu kali dan tidak diduplikasi per halaman. Bukti: 01_GLOBAL; keputusan global/legal/contact juga diringkas pada 00_Dashboard dan 08_Source_Notes."],
  ["Langkah 05", "C28", "Pastikan tidak ada fakta buatan, klaim tanpa bukti, atau placeholder", "â˜", "BELUM BISA DICENTANG", "Belum dapat dicentang karena dummy/placeholder memang masih ada untuk high-fidelity prototype dan beberapa bukti/consent belum tersedia. Bukti: 05_Proof_Placeholders; 10_Asset_Register!I5:O22 (DATA DUMMY, PLACEHOLDER INTERNAL, BLOCKED); 12_Mapping_QA!Q5:R17."],
  ["Langkah 05", "C29", "Copywriter melakukan self-check", "â˜", "BISA DICENTANG SEKARANG", "Self-check dokumenter telah dilakukan terhadap positioning, tone, dependensi, approval action, mapping, dan formula. Bukti: 06_Positioning_Tone_QA, 07_Approval_Actions, 12_Mapping_QA; hasil QA file mencatat 0 formula error."],
  ["Langkah 05", "C30", "Ubah status menjadi READY FOR FACT CHECK", "â˜", "BELUM BISA DICENTANG", "Status tersebut belum diterapkan. Bukti: 09_Page_Section_Mapping!U5:U50 berisi 29 READY FOR CONTENT APPROVAL dan sisanya blocked, bukan READY FOR FACT CHECK."],
  ["Langkah 05", "C31", "Klien memeriksa kebenaran fakta satu kali", "â˜", "BELUM BISA DICENTANG", "Belum ada bukti pemeriksaan fakta oleh klien, reviewer, atau tanggal review. Bukti kosong: 09_Page_Section_Mapping!AD5:AE50; approval actions masih terbuka pada 07_Approval_Actions."],
  ["Langkah 05", "C32", "Perbaiki fakta yang salah dan ubah status menjadi FACT CHECKED", "â˜", "BELUM BISA DICENTANG", "Tidak ada status FACT CHECKED dan masih ada fakta legal/contact/team/evidence yang menunggu verifikasi. Bukti: 05_Proof_Placeholders, 07_Approval_Actions, 12_Mapping_QA!Q5:R17."],
  ["Langkah 05", "C33", "Brand Manager memeriksa positioning, tone, dan kualitas pesan", "â˜", "BELUM BISA DICENTANG", "QA internal tersedia, tetapi belum ada sign-off Brand Manager/reviewer bertanggal. Bukti: 06_Positioning_Tone_QA dan kolom reviewer/tanggal yang masih kosong pada 09_Page_Section_Mapping!AD5:AE50."],
  ["Langkah 05", "C34", "Copywriter menyelesaikan perbaikan terakhir", "â˜", "BELUM BISA DICENTANG", "Perbaikan terakhir belum dapat dinyatakan selesai karena 15 dari 44 content block masih blocked/dependent. Bukti: ringkasan 12_Mapping_QA!A20:B25 dan blocker per halaman di Q5:R17."],
  ["Langkah 05", "C35", "Ubah seluruh halaman menjadi COPY APPROVED", "â˜", "BELUM BISA DICENTANG", "Tidak ada baris/page yang berstatus approved. Bukti: 09_Page_Section_Mapping!Z5:Z50 seluruhnya NOT APPROVED; 12_Mapping_QA!P5:P17 seluruhnya NOT APPROVED."],
  ["Langkah 05", "C36", "Gate 2", "â˜", "BELUM BISA DICENTANG", "Gate 2 bergantung pada fact check, Brand Manager review, perbaikan akhir, dan COPY APPROVED; prasyarat C30â€“C35 belum terpenuhi. Bukti: status approval pada 09_Page_Section_Mapping dan 12_Mapping_QA."],

  ["Langkah 06", "C37", "Kerjakan satu halaman sampai selesai", "â˜", "BISA DICENTANG SEKARANG", "Dapat dicentang sebagai metode kerja draft mapping: seluruh baris sudah dikelompokkan per Page dan diurutkan, dengan 46 mapping rows untuk 44 content block + 2 website-only. Bukti: 09_Page_Section_Mapping!A5:H50. Ini tidak berarti status final MAPPED."],
  ["Langkah 06", "C38", "Baca seluruh copy yang sudah COPY APPROVED", "â˜", "BELUM BISA DICENTANG", "Tidak ada copy yang berstatus COPY APPROVED, sehingga prasyarat literal item ini belum ada. Bukti: 09_Page_Section_Mapping!Z5:Z50 = NOT APPROVED; 12_Mapping_QA!B25 = 0 final MAPPED."],
  ["Langkah 06", "C39", "Kelompokkan copy berdasarkan tujuan pesan", "â˜", "BISA DICENTANG SEKARANG", "Copy telah dikelompokkan melalui Page, Section/Component, Section Family, Variant, dan catatan keputusan. Bukti: 09_Page_Section_Mapping!D5:Q50."],
  ["Langkah 06", "C40", "Beri nomor urutan section", "â˜", "BISA DICENTANG SEKARANG", "Kolom Order terisi pada seluruh 46 baris mapping. Bukti: 09_Page_Section_Mapping!H5:H50; QA per halaman: 12_Mapping_QA!K5:K17 = PASS."],
  ["Langkah 06", "C41", "Pilih Section Family", "â˜", "BISA DICENTANG SEKARANG", "Section Family terisi pada seluruh 46 baris. Bukti: 09_Page_Section_Mapping!J5:J50."],
  ["Langkah 06", "C42", "Pilih variant berdasarkan perbedaan struktur", "â˜", "BISA DICENTANG SEKARANG", "Variant struktural terisi pada seluruh 46 baris dan dibedakan berdasarkan bentuk section, bukan sekadar copy/warna. Bukti: 09_Page_Section_Mapping!K5:K50 serta Structure Note di Q5:Q50."],
  ["Langkah 06", "C43", "Cantumkan Asset ID", "â˜", "BISA DICENTANG SEKARANG", "Kolom Asset ID terisi pada seluruh 46 baris; N/A digunakan secara eksplisit bila media tidak diperlukan/masih diputuskan. Aset nyata terinventarisasi menjadi 18 ID. Bukti: 09_Page_Section_Mapping!O5:O50 dan 10_Asset_Register!A5:P22."],
  ["Langkah 06", "C44", "Cantumkan Reference ID jika menggunakan referensi", "â˜", "BISA DICENTANG SEKARANG", "Reference ID terisi pada seluruh 46 baris dan 27 sumber tercatat dengan lokasi, tujuan, status, serta keterbatasan. Bukti: 09_Page_Section_Mapping!P5:P50 dan 11_Reference_Register!A5:M31."],
  ["Langkah 06", "C45", "Isi Structure Note hanya untuk kebutuhan khusus", "â˜", "BISA DICENTANG SEKARANG", "Structure Note terisi sebagai catatan khusus untuk gap implementasi, batas prototype, keputusan merge/create/remove, approval, atau dependensiâ€”bukan sebagai spesifikasi styling. Bukti: 09_Page_Section_Mapping!Q5:Q50."],
  ["Langkah 06", "C46", "Jangan menentukan props, styling, atau struktur code", "â˜", "BISA DICENTANG SEKARANG", "Mapping tidak menetapkan props atau styling. Lokasi component/code hanya dicantumkan sebagai bukti kondisi aktual dan traceability. Bukti: header 09_Page_Section_Mapping tidak memiliki kolom props/styling; referensi implementasi berada di M5:N50."],
  ["Langkah 06", "C47", "Buat wireframe hanya jika struktur sulit dijelaskan", "â˜", "BELUM BISA DICENTANG", "Kebutuhan wireframe dan Wireframe ID sudah ditentukan, tetapi entri bertanda TO CREATE/FULL PAGE belum memiliki artefak wireframe final. Bukti: 09_Page_Section_Mapping!R5:S50 dan status Wireframe pada 12_Mapping_QA!N5:N17."],
  ["Langkah 06", "C48", "Pastikan tidak ada copy yang hilang atau terpasang dua kali", "â˜", "BISA DICENTANG SEKARANG", "Coverage dan keunikan sudah diaudit: 44 content block masing-masing dipetakan satu kali, ditambah 2 website-only yang dipisahkan; Mapping ID dan Content ID unik. Bukti: 09_Page_Section_Mapping!A5:C50 dan ringkasan 12_Mapping_QA!A20:B25."],
  ["Langkah 06", "C49", "UI/UX melakukan pemeriksaan mapping satu kali", "â˜", "BELUM BISA DICENTANG", "Belum ada review UI/UX. Bukti: 09_Page_Section_Mapping!Y5:Y50 seluruhnya NOT REVIEWED; 12_Mapping_QA!O5:O17 seluruhnya NOT REVIEWED; reviewer/tanggal kosong."],
  ["Langkah 06", "C50", "Ubah Website Content Sheet menjadi MAPPED", "â˜", "BELUM BISA DICENTANG", "Status final MAPPED sengaja belum diberikan karena copy approval dan UI/UX approval belum ada. Bukti: 12_Mapping_QA!B25 = 0 final MAPPED dan 12_Mapping_QA!B26 = 0 UI/UX approved page rows."],
];

await fs.mkdir(path.dirname(outputPath), { recursive: true });
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(sourcePath));
const old = workbook.worksheets.getItemOrNull("13_Checklist_Evidence");
if (old) old.delete();
const sheet = workbook.worksheets.add("13_Checklist_Evidence");
sheet.showGridLines = false;

sheet.mergeCells("A1:F1");
sheet.mergeCells("A2:F2");
sheet.mergeCells("A3:F3");
sheet.getRange("A1").values = [["CHECKLIST LANGKAH 05â€“06 / STATUS & EVIDENCE"]];
sheet.getRange("A2").values = [["Rekomendasi centang per 14 Agustus 2026: 17 item bisa dicentang, 12 item belum bisa. Semua kotak tetap dibiarkan kosong agar keputusan centang dilakukan oleh pemilik/reviewer."]];
sheet.getRange("A3").values = [["BISA DICENTANG tidak sama dengan COPY APPROVED atau MAPPED. C37 hanya menilai metode penyusunan draft mapping; C50 tetap ditahan sampai copy dan UI/UX memperoleh approval."]];
sheet.getRange("A1:F1").format = { fill: C.black, font: { typeface: "Carlito", fontSize: 20, bold: true, color: C.white }, verticalAlignment: "center" };
sheet.getRange("A2:F2").format = { fill: C.paper, font: { typeface: "Carlito", fontSize: 10, italic: true, color: C.muted }, wrapText: true, verticalAlignment: "center" };
sheet.getRange("A3:F3").format = { fill: C.amber, font: { typeface: "Carlito", fontSize: 9, bold: true, color: C.amberText }, wrapText: true, verticalAlignment: "center" };
sheet.getRange("A1:F1").format.rowHeightPx = 34;
sheet.getRange("A2:F2").format.rowHeightPx = 38;
sheet.getRange("A3:F3").format.rowHeightPx = 42;

const headers = ["Langkah", "Ref Checklist", "Mini-Step", "Kotak", "Bisa Dicentang Sekarang?", "Penjelasan & Keberadaan Bukti"];
sheet.getRange("A4:F4").values = [headers];
sheet.getRange(`A5:F${rows.length + 4}`).values = rows;
sheet.tables.add(`A4:F${rows.length + 4}`, true, "tblChecklistEvidence");
sheet.getRange("A4:F4").format = { fill: C.red, font: { typeface: "Carlito", fontSize: 10, bold: true, color: C.white }, wrapText: true, horizontalAlignment: "center", verticalAlignment: "center", borders: { preset: "all", style: "thin", color: C.gold } };
sheet.getRange("A4:F4").format.rowHeightPx = 42;
sheet.getRange(`A5:F${rows.length + 4}`).format = { font: { typeface: "Carlito", fontSize: 9, color: C.ink }, wrapText: true, verticalAlignment: "top", borders: { preset: "all", style: "hair", color: C.line } };
sheet.getRange(`A5:F${rows.length + 4}`).format.rowHeightPx = 76;
sheet.getRange(`A5:B${rows.length + 4}`).format.horizontalAlignment = "center";
sheet.getRange(`D5:E${rows.length + 4}`).format.horizontalAlignment = "center";
sheet.getRange(`D5:D${rows.length + 4}`).format.font = { typeface: "Carlito", fontSize: 14, color: C.ink };
sheet.getRange(`E5:E${rows.length + 4}`).conditionalFormats.add("containsText", { text: "BISA DICENTANG SEKARANG", format: { fill: C.greenSoft, font: { color: C.greenText, bold: true } } });
sheet.getRange(`E5:E${rows.length + 4}`).conditionalFormats.add("containsText", { text: "BELUM BISA DICENTANG", format: { fill: C.redSoft, font: { color: C.redText, bold: true } } });
for (const [column, width] of [["A", 105], ["B", 85], ["C", 300], ["D", 70], ["E", 190], ["F", 620]]) {
  sheet.getRange(`${column}1:${column}${rows.length + 4}`).format.columnWidthPx = width;
}
sheet.freezePanes.freezeRows(4);
sheet.freezePanes.freezeColumns(2);

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(JSON.stringify({ outputPath, sheetCount: workbook.worksheets.items.length, checklistRows: rows.length, canCheck: rows.filter((r) => r[4] === "BISA DICENTANG SEKARANG").length, cannotCheck: rows.filter((r) => r[4] === "BELUM BISA DICENTANG").length }, null, 2));
