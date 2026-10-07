import type {ImageMetadata} from 'astro';
import signageBackdrop from '../assets/category-heroes/reklame-backdrop.webp';
import signagePeople from '../assets/category-heroes/reklame-people.webp';
import planningBackdrop from '../assets/category-heroes/tata-ruang-backdrop.webp';
import planningPeople from '../assets/category-heroes/tata-ruang-people.webp';
import buildingBackdrop from '../assets/category-heroes/bangunan-konstruksi-backdrop.webp';
import buildingPeople from '../assets/category-heroes/bangunan-konstruksi-people.webp';
import environmentBackdrop from '../assets/category-heroes/lingkungan-backdrop.webp';
import environmentPeople from '../assets/category-heroes/lingkungan-people.webp';
import trafficBackdrop from '../assets/category-heroes/lalu-lintas-akses-backdrop.webp';
import trafficPeople from '../assets/category-heroes/lalu-lintas-akses-people.webp';
import auditBackdrop from '../assets/category-heroes/iso-backdrop.webp';
import auditPeople from '../assets/category-heroes/iso-people.webp';

// Each location is visible independently of its transparent foreground people.
export const categoryHeroAssets:Record<string,{backdrop:ImageMetadata;people:ImageMetadata}>={
 reklame:{backdrop:signageBackdrop,people:signagePeople},
 'tata-ruang':{backdrop:planningBackdrop,people:planningPeople},
 'bangunan-konstruksi':{backdrop:buildingBackdrop,people:buildingPeople},
 lingkungan:{backdrop:environmentBackdrop,people:environmentPeople},
 'lalu-lintas-akses':{backdrop:trafficBackdrop,people:trafficPeople},
 iso:{backdrop:auditBackdrop,people:auditPeople}
};
