import type {ImageMetadata} from 'astro';
import type {Locale} from './site';
import photo0 from '../assets/service-heroes/akreditasi-iso-15189.webp';
import photo1 from '../assets/service-heroes/akreditasi-iso-17020.webp';
import photo2 from '../assets/service-heroes/akreditasi-iso-17025.webp';
import photo3 from '../assets/service-heroes/amdal.webp';
import photo4 from '../assets/service-heroes/andalalin.webp';
import photo5 from '../assets/service-previews/audit-legalitas-reklame.webp';
import photo6 from '../assets/service-heroes/bukaan-median.webp';
import photo7 from '../assets/service-heroes/delh.webp';
import photo8 from '../assets/service-heroes/dplh.webp';
import photo9 from '../assets/service-heroes/inrit.webp';
import photo10 from '../assets/service-heroes/ippr.webp';
import photo11 from '../assets/service-heroes/ippt.webp';
import photo12 from '../assets/service-previews/izin-reklame.webp';
import photo13 from '../assets/service-heroes/kkpr.webp';
import photo14 from '../assets/service-heroes/krk.webp';
import photo15 from '../assets/service-previews/manajemen-reklame-multi-lokasi.webp';
import photo16 from '../assets/service-heroes/mrll.webp';
import photo17 from '../assets/service-previews/pajak-reklame.webp';
import photo18 from '../assets/service-heroes/pbg-imb.webp';
import photo19 from '../assets/service-previews/pbg-reklame.webp';
import photo20 from '../assets/service-previews/perpanjangan-reklame.webp';
import photo21 from '../assets/service-heroes/pertek-air-limbah.webp';
import photo22 from '../assets/service-heroes/pertek-emisi.webp';
import photo23 from '../assets/service-heroes/rkl-rpl.webp';
import photo24 from '../assets/service-heroes/sbu-konstruksi.webp';
import photo25 from '../assets/service-heroes/sertifikasi-iso-13485.webp';
import photo26 from '../assets/service-heroes/sertifikasi-iso-14001.webp';
import photo27 from '../assets/service-heroes/sertifikasi-iso-22000.webp';
import photo28 from '../assets/service-heroes/sertifikasi-iso-27001.webp';
import photo29 from '../assets/service-heroes/sertifikasi-iso-37001.webp';
import photo30 from '../assets/service-heroes/sertifikasi-iso-45001.webp';
import photo31 from '../assets/service-heroes/sertifikasi-iso-50001.webp';
import photo32 from '../assets/service-heroes/sertifikasi-iso-9001.webp';
import photo33 from '../assets/service-heroes/slf.webp';
import photo34 from '../assets/service-heroes/slo-kelistrikan.webp';
import photo35 from '../assets/service-heroes/slo-lingkungan.webp';
import photo36 from '../assets/service-heroes/sppl.webp';
import photo37 from '../assets/service-heroes/ukl-upl.webp';
// Stock photos for service previews. Source records: reports/service-stock-sources.json.
export const serviceStockImages:Record<string,{image:ImageMetadata;alt:Record<Locale,string>}>={
 'akreditasi-iso-15189':{image:photo0,alt:{"id":"Peneliti menggunakan mikroskop untuk memeriksa sampel","en":"A researcher using a microscope to examine samples"}},
 'akreditasi-iso-17020':{image:photo1,alt:{"id":"Insinyur dan pemeriksa meninjau instalasi panel surya","en":"An engineer and inspector reviewing a solar panel installation"}},
 'akreditasi-iso-17025':{image:photo2,alt:{"id":"Dua peneliti bekerja dengan peralatan laboratorium","en":"Two researchers working with laboratory equipment"}},
 'amdal':{image:photo3,alt:{"id":"Infrastruktur industri yang melintasi kawasan hutan","en":"Industrial infrastructure passing through a forested area"}},
 'andalalin':{image:photo4,alt:{"id":"Lalu lintas jalan raya dilihat dari udara","en":"Highway traffic seen from above"}},
 'audit-legalitas-reklame':{image:photo5,alt:{"id":"Tim memeriksa dan mengisi dokumen bersama","en":"A team reviewing and completing documents together"}},
 'bukaan-median':{image:photo6,alt:{"id":"Jaringan persimpangan dan pergerakan kendaraan","en":"An intersection network and vehicle movements"}},
 'delh':{image:photo7,alt:{"id":"Tinjauan dokumen dalam pertemuan profesional","en":"Document review during a professional meeting"}},
 'dplh':{image:photo8,alt:{"id":"Dua profesional meninjau berkas di kantor","en":"Two professionals reviewing records in an office"}},
 'inrit':{image:photo9,alt:{"id":"Persimpangan dan akses jalan di kawasan perkotaan","en":"A junction and road access in an urban area"}},
 'ippr':{image:photo10,alt:{"id":"Dua insinyur membahas rencana pembangunan di lokasi","en":"Two engineers discussing development plans on site"}},
 'ippt':{image:photo11,alt:{"id":"Lahan dan fasilitas industri dalam lanskap kawasan","en":"Industrial facilities within the surrounding landscape"}},
 'izin-reklame':{image:photo12,alt:{"id":"Pekerja memasang struktur reklame di luar ruangan","en":"Workers installing an outdoor advertising structure"}},
 'kkpr':{image:photo13,alt:{"id":"Pemandangan kawasan perkotaan dari udara","en":"Aerial view of an urban neighbourhood"}},
 'krk':{image:photo14,alt:{"id":"Gambar dan sketsa perencanaan arsitektur","en":"Architectural drawings and planning sketches"}},
 'manajemen-reklame-multi-lokasi':{image:photo15,alt:{"id":"Petugas dengan clipboard memeriksa lokasi konstruksi","en":"A worker with a clipboard inspecting a construction site"}},
 'mrll':{image:photo16,alt:{"id":"Arus kendaraan pada jalan raya perkotaan","en":"Vehicle movement on an urban highway"}},
 'pajak-reklame':{image:photo17,alt:{"id":"Kalkulator dan kaca pembesar di atas dokumen keuangan","en":"A calculator and magnifying glass on financial documents"}},
 'pbg-imb':{image:photo18,alt:{"id":"Dua pekerja meninjau gambar konstruksi bangunan","en":"Two workers reviewing building construction drawings"}},
 'pbg-reklame':{image:photo19,alt:{"id":"Petugas konstruksi membuat catatan pada gambar teknis","en":"A construction worker making notes on technical drawings"}},
 'perpanjangan-reklame':{image:photo20,alt:{"id":"Profesional mengatur folder dan berkas administrasi","en":"A professional organising folders and administrative records"}},
 'pertek-air-limbah':{image:photo21,alt:{"id":"Fasilitas pengolahan air limbah dilihat dari udara","en":"A wastewater treatment facility seen from above"}},
 'pertek-emisi':{image:photo22,alt:{"id":"Cerobong dan emisi pada fasilitas industri","en":"Stacks and emissions at an industrial facility"}},
 'rkl-rpl':{image:photo23,alt:{"id":"Tim membahas dokumen dan catatan pekerjaan","en":"A team discussing documents and work records"}},
 'sbu-konstruksi':{image:photo24,alt:{"id":"Tim insinyur meninjau rencana bangunan bersama","en":"An engineering team reviewing building plans together"}},
 'sertifikasi-iso-13485':{image:photo25,alt:{"id":"Peneliti dengan perlengkapan pelindung di laboratorium","en":"Researchers wearing protective equipment in a laboratory"}},
 'sertifikasi-iso-14001':{image:photo26,alt:{"id":"Turbin angin dan panel surya dalam lanskap kawasan","en":"Wind turbines and solar panels within the surrounding landscape"}},
 'sertifikasi-iso-22000':{image:photo27,alt:{"id":"Mesin pada lini pengolahan pangan","en":"Machinery on a food processing line"}},
 'sertifikasi-iso-27001':{image:photo28,alt:{"id":"Teknisi mengelola sistem di ruang server","en":"A technician managing systems in a server room"}},
 'sertifikasi-iso-37001':{image:photo29,alt:{"id":"Profesional membahas dan menandatangani dokumen","en":"Professionals discussing and signing documents"}},
 'sertifikasi-iso-45001':{image:photo30,alt:{"id":"Pekerja dengan perlengkapan keselamatan memeriksa material","en":"Workers wearing safety equipment inspecting materials"}},
 'sertifikasi-iso-50001':{image:photo31,alt:{"id":"Turbin angin dan panel surya pada fasilitas energi","en":"Wind turbines and solar panels at an energy facility"}},
 'sertifikasi-iso-9001':{image:photo32,alt:{"id":"Pekerja memeriksa kualitas bahan di pabrik","en":"A worker inspecting material quality in a factory"}},
 'slf':{image:photo33,alt:{"id":"Insinyur memeriksa kondisi lokasi konstruksi","en":"Engineers inspecting conditions at a construction site"}},
 'slo-kelistrikan':{image:photo34,alt:{"id":"Teknisi memeriksa panel kelistrikan","en":"A technician inspecting an electrical panel"}},
 'slo-lingkungan':{image:photo35,alt:{"id":"Peneliti memeriksa sampel air di laboratorium","en":"A researcher examining water samples in a laboratory"}},
 'sppl':{image:photo36,alt:{"id":"Profesional meninjau dokumen usaha bersama","en":"Professionals reviewing business documents together"}},
 'ukl-upl':{image:photo37,alt:{"id":"Petugas mengumpulkan sampel untuk kajian lingkungan","en":"A field worker collecting samples for environmental assessment"}}
};
