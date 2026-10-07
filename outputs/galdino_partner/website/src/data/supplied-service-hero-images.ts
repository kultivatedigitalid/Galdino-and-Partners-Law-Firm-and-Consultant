import traffic0 from '../assets/service-heroes/andalalin-supplied.webp';
import traffic1 from '../assets/service-heroes/mrll-supplied.webp';
import traffic2 from '../assets/service-heroes/inrit-supplied.webp';
import traffic3 from '../assets/service-heroes/bukaan-median-supplied.webp';
import isoShared from '../assets/service-heroes/iso-shared-supplied.webp';
import {SERVICES} from './services';
import environment0 from '../assets/service-heroes/sppl-supplied.webp';
import environment1 from '../assets/service-heroes/ukl-upl-supplied.webp';
import environment2 from '../assets/service-heroes/amdal-supplied.webp';
import environment3 from '../assets/service-heroes/pertek-air-limbah-supplied.webp';
import environment4 from '../assets/service-heroes/pertek-emisi-supplied.webp';
import environment5 from '../assets/service-heroes/slo-lingkungan-supplied.webp';
import environment6 from '../assets/service-heroes/rkl-rpl-supplied.webp';
import environment7 from '../assets/service-heroes/delh-supplied.webp';
import environment8 from '../assets/service-heroes/dplh-supplied.webp';
import image0 from '../assets/service-heroes/kkpr-supplied.webp';
import image1 from '../assets/service-heroes/krk-supplied.webp';
import image2 from '../assets/service-heroes/ippr-supplied.webp';
import image3 from '../assets/service-heroes/ippt-supplied.webp';
import image4 from '../assets/service-heroes/pbg-imb-supplied.webp';
import image5 from '../assets/service-heroes/slf-supplied.webp';
import image6 from '../assets/service-heroes/slo-kelistrikan-supplied.webp';
import image7 from '../assets/service-heroes/sbu-konstruksi-supplied.webp';
import {reklameHeroImages} from './reklame-hero-images';
import {SERVICE_HERO_LEADS} from './service-hero-copy';
import type {ImageMetadata} from 'astro';
import type {Locale} from './site';
export const suppliedServiceHeroImages:Record<string,{image:ImageMetadata;alt:Record<Locale,string>;lead:Record<Locale,string>}>= {
 ...reklameHeroImages,
 'kkpr':{image:image0,lead:SERVICE_HERO_LEADS['kkpr'],alt:{id:'Tim meninjau lokasi dan dokumen KKPR',en:'A team reviewing the site and records for KKPR'}},
 'krk':{image:image1,lead:SERVICE_HERO_LEADS['krk'],alt:{id:'Tim meninjau lokasi dan dokumen KRK',en:'A team reviewing the site and records for KRK'}},
 'ippr':{image:image2,lead:SERVICE_HERO_LEADS['ippr'],alt:{id:'Tim meninjau lokasi dan dokumen IPPR',en:'A team reviewing the site and records for IPPR'}},
 'ippt':{image:image3,lead:SERVICE_HERO_LEADS['ippt'],alt:{id:'Tim meninjau lokasi dan dokumen IPPT',en:'A team reviewing the site and records for IPPT'}},
 'pbg-imb':{image:image4,lead:SERVICE_HERO_LEADS['pbg-imb'],alt:{id:'Tim meninjau lokasi dan dokumen PBG-IMB',en:'A team reviewing the site and records for PBG-IMB'}},
 'slf':{image:image5,lead:SERVICE_HERO_LEADS['slf'],alt:{id:'Tim meninjau lokasi dan dokumen SLF',en:'A team reviewing the site and records for SLF'}},
 'slo-kelistrikan':{image:image6,lead:SERVICE_HERO_LEADS['slo-kelistrikan'],alt:{id:'Tim meninjau lokasi dan dokumen SLO-KELISTRIKAN',en:'A team reviewing the site and records for SLO-KELISTRIKAN'}},
 'sbu-konstruksi':{image:image7,lead:SERVICE_HERO_LEADS['sbu-konstruksi'],alt:{id:'Tim meninjau lokasi dan dokumen SBU-KONSTRUKSI',en:'A team reviewing the site and records for SBU-KONSTRUKSI'}},
 'sppl':{image:environment0,lead:SERVICE_HERO_LEADS['sppl'],alt:{id:"Tim memeriksa dokumen pernyataan pengelolaan lingkungan",en:"A team reviewing environmental management statement records"}},
 'ukl-upl':{image:environment1,lead:SERVICE_HERO_LEADS['ukl-upl'],alt:{id:"Tim memeriksa sampel air dan catatan lingkungan",en:"A team inspecting water samples and environmental records"}},
 'amdal':{image:environment2,lead:SERVICE_HERO_LEADS['amdal'],alt:{id:"Tim meninjau peta kawasan dan kajian dampak lingkungan",en:"A team reviewing a site map and environmental impact studies"}},
 'pertek-air-limbah':{image:environment3,lead:SERVICE_HERO_LEADS['pertek-air-limbah'],alt:{id:"Tim mengambil sampel di fasilitas pengolahan air limbah",en:"A team sampling water at a wastewater treatment facility"}},
 'pertek-emisi':{image:environment4,lead:SERVICE_HERO_LEADS['pertek-emisi'],alt:{id:"Tim memeriksa emisi dengan alat ukur pada cerobong",en:"A team measuring emissions at a chimney"}},
 'slo-lingkungan':{image:environment5,lead:SERVICE_HERO_LEADS['slo-lingkungan'],alt:{id:"Tim meninjau dokumen kelaikan operasi lingkungan",en:"A team reviewing environmental operational fitness records"}},
 'rkl-rpl':{image:environment6,lead:SERVICE_HERO_LEADS['rkl-rpl'],alt:{id:"Tim meninjau peta dan laporan pemantauan lingkungan",en:"A team reviewing maps and environmental monitoring reports"}},
 'delh':{image:environment7,lead:SERVICE_HERO_LEADS['delh'],alt:{id:"Tim memeriksa dokumen evaluasi lingkungan di fasilitas industri",en:"A team reviewing environmental evaluation records at an industrial facility"}},
 'dplh':{image:environment8,lead:SERVICE_HERO_LEADS['dplh'],alt:{id:"Tim memeriksa dokumen pengelolaan lingkungan di fasilitas pengolahan",en:"A team reviewing environmental management records at a treatment facility"}},
 'andalalin':{image:traffic0,lead:SERVICE_HERO_LEADS['andalalin'],alt:{id:"Tim meninjau lalu lintas dan rencana persimpangan",en:"A team surveying traffic and intersection plans"}},
 'mrll':{image:traffic1,lead:SERVICE_HERO_LEADS['mrll'],alt:{id:"Tim meninjau pengaturan lalu lintas pada pekerjaan jalan",en:"A team reviewing traffic management at roadworks"}},
 'inrit':{image:traffic2,lead:SERVICE_HERO_LEADS['inrit'],alt:{id:"Tim mengukur akses masuk bangunan dari jalan",en:"A team measuring building access from the road"}},
 'bukaan-median':{image:traffic3,lead:SERVICE_HERO_LEADS['bukaan-median'],alt:{id:"Tim mengukur dan meninjau bukaan median jalan",en:"A team measuring and reviewing a road median opening"}},
 ...Object.fromEntries(SERVICES.filter(service=>service.category==='iso').map(service=>[service.id,{image:isoShared,lead:SERVICE_HERO_LEADS[service.id],alt:{id:'Tim meninjau dokumen sistem manajemen dan sertifikasi di kawasan gedung modern',en:'A team reviewing management system and certification records at a modern campus'}}])),
};
