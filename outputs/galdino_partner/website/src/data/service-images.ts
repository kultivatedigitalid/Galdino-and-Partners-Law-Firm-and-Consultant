import type {ImageMetadata} from 'astro';
import type {Service} from './services';
import type {Locale} from './site';
import signage from '../assets/service-signage.webp';
import building from '../assets/service-building.webp';
import environment from '../assets/service-environment.webp';
import traffic from '../assets/service-traffic.webp';
import audit from '../assets/service-audit.webp';
import laboratory from '../assets/service-laboratory.webp';
import electrical from '../assets/service-electrical.webp';
import emissions from '../assets/service-emissions.webp';
import security from '../assets/service-security.webp';
import planning from '../assets/experience-investment-project.png';
import documents from '../assets/experience-compliance-review.png';
type Activity={image:ImageMetadata;alt:Record<Locale,string>};
// Illustrative activity photography, not photographs of client engagements.
const activities:Record<string,Activity>={
 signage:{image:signage,alt:{id:'Teknisi meninjau ukuran dan lokasi pemasangan reklame toko',en:'Technicians reviewing the size and location of shop signage'}},
 building:{image:building,alt:{id:'Arsitek dan pemeriksa bangunan meninjau denah di lokasi',en:'An architect and building inspector reviewing plans on site'}},
 planning:{image:planning,alt:{id:'Tim proyek meninjau rencana tapak pembangunan',en:'A project team reviewing development site plans'}},
 environment:{image:environment,alt:{id:'Teknisi lingkungan mengambil sampel air di fasilitas pengolahan',en:'Environmental technicians sampling water at a treatment facility'}},
 traffic:{image:traffic,alt:{id:'Surveyor mengamati lalu lintas di akses kawasan industri',en:'Surveyors observing traffic at an industrial estate entrance'}},
 audit:{image:audit,alt:{id:'Auditor dan supervisor memeriksa proses produksi pangan',en:'An auditor and supervisor reviewing food production processes'}},
 laboratory:{image:laboratory,alt:{id:'Analis laboratorium memeriksa sampel dan peralatan pengujian',en:'Laboratory analysts checking samples and testing equipment'}},
 electrical:{image:electrical,alt:{id:'Teknisi memeriksa instalasi kelistrikan bangunan',en:'Technicians inspecting a building electrical installation'}},
 emissions:{image:emissions,alt:{id:'Teknisi lingkungan memeriksa kualitas udara di fasilitas industri',en:'Environmental technicians monitoring air quality at an industrial facility'}},
 security:{image:security,alt:{id:'Auditor keamanan informasi meninjau akses sistem bersama tim IT',en:'An information security auditor reviewing system access with an IT engineer'}},
 documents:{image:documents,alt:{id:'Tim meninjau dokumen dan catatan kepatuhan usaha',en:'A team reviewing business compliance documents and records'}}
};
const categoryActivity:Record<string,string>={reklame:'signage','tata-ruang':'planning','bangunan-konstruksi':'building',lingkungan:'environment','lalu-lintas-akses':'traffic',iso:'audit'};
const serviceActivity:Record<string,string>={
 'slo-kelistrikan':'electrical','pertek-emisi':'emissions','rkl-rpl':'documents','delh':'documents','dplh':'documents',
 'sertifikasi-iso-14001':'environment','sertifikasi-iso-45001':'building','sertifikasi-iso-27001':'security',
 'sertifikasi-iso-37001':'documents','sertifikasi-iso-50001':'electrical','sertifikasi-iso-13485':'laboratory',
 'akreditasi-iso-17025':'laboratory','akreditasi-iso-15189':'laboratory','akreditasi-iso-17020':'building'
};
export const serviceActivityImage=(service:Service)=>activities[serviceActivity[service.id]||categoryActivity[service.category]];
export const categoryActivityImage=(category:string)=>activities[categoryActivity[category]];
