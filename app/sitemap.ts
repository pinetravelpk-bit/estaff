import {industries} from '../lib/business';
import {careServices,areaServicePath} from '../lib/home-care';
import type {MetadataRoute} from 'next';
import {absolute} from '../lib/seo';
import {services,locations,areaSlug} from '../lib/content';
import {roles} from '../lib/roles';
import {nationalCities,allCities,slugify} from '../lib/pakistan';
import {roleSlugs} from '../lib/national';
import {jobTypes,jobCityPath,jobRolePath} from '../lib/jobs';
import {allArticles} from '../lib/blog-store';
import {cityServices,serviceCityPath} from '../lib/service-city';
import {listJobs} from '../lib/store';

export const revalidate=3600;

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  const openJobs=await listJobs();const articles=await allArticles();
  const paths=[
    '/','/about','/how-it-works','/glossary','/contact','/services','/areas','/resources','/faqs','/site-map','/jobs','/jobs/apply','/hire','/blog',
    ...openJobs.map(j=>'/jobs/'+j.id),
    '/industries',...industries.map(i=>'/industries/'+i.slug),
    ...services.map(s=>'/services/'+s.slug),
    ...roles.map(r=>`/services/${r.parent}/${r.slug}`),
    ...Object.entries(locations).flatMap(([city,c])=>['/areas/'+city,...c.areas.flatMap(a=>[`/areas/${city}/${areaSlug(a)}`,...careServices.map(s=>areaServicePath(city,areaSlug(a),s.slug))])]),
    ...nationalCities.flatMap(c=>['/areas/'+c.slug,...roleSlugs.map(r=>`/areas/${c.slug}/${r}`),...c.areas.map(a=>`/areas/${c.slug}/${slugify(a)}`)]),
    ...allCities.map(c=>jobCityPath(c.slug)),
    ...jobTypes.map(j=>jobRolePath(j.slug)),
    ...articles.map(a=>'/blog/'+a.slug),
    ...cityServices.flatMap(sv=>allCities.map(c=>serviceCityPath(sv.slug,c.slug))),
  ];
  const lastModified=new Date();
  const depth=(p:string)=>p.split('/').length;
  return [...new Set(paths)].map(path=>({url:absolute(path),lastModified,changeFrequency:path==='/'||path==='/blog'?'weekly':'monthly',priority:path==='/'?1:depth(path)<=2?0.8:depth(path)===3?0.7:0.6}));
}
