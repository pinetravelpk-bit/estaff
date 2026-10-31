import {industries} from '../lib/business';
import {careServices,areaServicePath} from '../lib/home-care';
import type {MetadataRoute} from 'next';import {absolute} from '../lib/seo';import {services,locations,areaSlug} from '../lib/content';import {roles} from '../lib/roles';
export default function sitemap():MetadataRoute.Sitemap{const paths=['/industries',...industries.map(i=>'/industries/'+i.slug),'/','/services','/areas','/resources','/faqs','/site-map',...services.map(s=>'/services/'+s.slug),...roles.map(r=>`/services/${r.parent}/${r.slug}`),...Object.entries(locations).flatMap(([city,c])=>['/areas/'+city,...c.areas.flatMap(a=>[`/areas/${city}/${areaSlug(a)}`,...careServices.map(s=>areaServicePath(city,areaSlug(a),s.slug))])])];return paths.map(path=>({url:absolute(path)}));}
