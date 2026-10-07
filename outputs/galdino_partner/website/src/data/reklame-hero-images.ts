import tax from '../assets/service-heroes/pajak-reklame.webp';
import building from '../assets/service-heroes/pbg-reklame.webp';
import renewal from '../assets/service-heroes/perpanjangan-reklame.webp';
import permit from '../assets/service-heroes/izin-reklame.webp';
import audit from '../assets/service-heroes/audit-legalitas-reklame.webp';
import locations from '../assets/service-heroes/manajemen-reklame-multi-lokasi.webp';
import type {ImageMetadata} from 'astro';
import type {Locale} from './site';
export const reklameHeroImages:Record<string,{image:ImageMetadata;alt:Record<Locale,string>;lead:Record<Locale,string>}>= {
 'pajak-reklame':{image:tax,alt:{id:'Petugas meninjau reklame dengan berkas pajak dan kalkulator',en:'Workers reviewing signage with tax records and a calculator'},lead:{id:'Pemetaan objek, dokumen, dan kewajiban pajak reklame Anda.',en:'Map your advertising tax obligations and required records.'}},
 'pbg-reklame':{image:building,alt:{id:'Petugas meninjau reklame dengan gambar teknis struktur',en:'Workers reviewing signage with structural drawings'},lead:{id:'Persiapan dokumen teknis untuk struktur reklame Anda.',en:'Prepare the technical records for your advertising structure.'}},
 'perpanjangan-reklame':{image:renewal,alt:{id:'Petugas meninjau reklame dengan kalender masa berlaku',en:'Workers reviewing signage with a renewal calendar'},lead:{id:'Pantau masa berlaku dan siapkan perpanjangan reklame Anda.',en:'Track expiry dates and prepare your advertising permit renewal.'}},
 'izin-reklame':{image:permit,alt:{id:'Petugas meninjau lokasi reklame dengan berkas perizinan',en:'Workers reviewing an advertising site with permit records'},lead:{id:'Pendampingan izin pemasangan sesuai lokasi dan jenis reklame.',en:'Permit support tailored to your advertising site and format.'}},
 'audit-legalitas-reklame':{image:audit,alt:{id:'Profesional memeriksa reklame dengan berkas dan daftar pengecekan',en:'Professionals reviewing signage with records and a checklist'},lead:{id:'Tinjau izin, pajak, dan kelengkapan dokumen reklame Anda.',en:'Review your advertising permits, tax and supporting records.'}},
 'manajemen-reklame-multi-lokasi':{image:locations,alt:{id:'Petugas memantau titik reklame di beberapa lokasi dengan tablet',en:'A worker monitoring advertising sites across multiple locations on a tablet'},lead:{id:'Kelola dokumen dan masa berlaku reklame di berbagai lokasi.',en:'Manage advertising records and renewal dates across your sites.'}}
};
