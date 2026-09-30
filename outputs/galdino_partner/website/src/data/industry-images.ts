import property from '../assets/experience-investment-project.png';
import manufacturing from '../assets/industry-manufacturing.webp';
import warehouse from '../assets/industry-warehouse.webp';
import retail from '../assets/industry-retail.webp';
import healthcare from '../assets/industry-healthcare.webp';
import hotel from '../assets/industry-hotel.webp';
import type {ImageMetadata} from 'astro';
export const industryImages:Record<string,ImageMetadata>={'developer-properti':property,manufaktur:manufacturing,gudang:warehouse,'retail-multi-outlet':retail, 'fasilitas-kesehatan':healthcare,hotel};
export const categoryImages:Record<string,ImageMetadata>={reklame:retail,'tata-ruang':property,'bangunan-konstruksi':property,lingkungan:manufacturing,'lalu-lintas-akses':warehouse,iso:manufacturing};
