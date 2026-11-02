import {industries} from '../lib/business';
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
import {listReviews} from '../lib/reviews';
import {indexablePoolJobs} from '../lib/pool';
import {listAgencies} from '../lib/users';

export const revalidate=3600;
// Bump when the site's built-in page content changes.
const CONTENT_UPDATED='2026-11-02';

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  const openJobs=await listJobs();const articles=await allArticles();const agencies=await listAgencies('approved');
  const paths=[
    '/','/about','/how-it-works','/glossary','/contact','/services','/areas','/resources','/faqs','/site-map','/jobs','/jobs/apply','/hire','/blog','/agencies','/reviews','/post-a-job',...agencies.map(a=>'/agencies/'+a.slug),
    ...openJobs.map(j=>'/jobs/'+j.id),
    ...indexablePoolJobs().map(j=>'/jobs/'+j.id),
    '/industries',...industries.map(i=>'/industries/'+i.slug),
    ...services.map(s=>'/services/'+s.slug),
    ...roles.map(r=>`/services/${r.parent}/${r.slug}`),
    // Area × role pages in Islamabad and Rawalpindi stay live for visitors but are not indexed (near-duplicates of each other).
    ...Object.entries(locations).flatMap(([city,c])=>['/areas/'+city,...c.areas.map(a=>`/areas/${city}/${areaSlug(a)}`)]),
    ...nationalCities.flatMap(c=>['/areas/'+c.slug,...roleSlugs.map(r=>`/areas/${c.slug}/${r}`),...c.areas.map(a=>`/areas/${c.slug}/${slugify(a)}`)]),
    ...allCities.map(c=>jobCityPath(c.slug)),
    ...jobTypes.map(j=>jobRolePath(j.slug)),
    ...articles.map(a=>'/blog/'+a.slug),
    ...cityServices.flatMap(sv=>allCities.map(c=>serviceCityPath(sv.slug,c.slug))),
  ];
  // Real "last changed" dates: content pages use the date their content last changed;
  // job, blog and agency pages use their own dates; listing pages use their newest item.
  const newest=(d:string[])=>d.filter(Boolean).sort().pop()||CONTENT_UPDATED;
  const dates=new Map<string,string>();
  for(const j of openJobs)dates.set('/jobs/'+j.id,j.updatedAt);
  for(const j of indexablePoolJobs())if(j.hiringNow)dates.set('/jobs/'+j.id,j.updatedAt);
  for(const a of articles)dates.set('/blog/'+a.slug,a.date);
  for(const a of agencies)dates.set('/agencies/'+a.slug,a.updatedAt);
  dates.set('/jobs',newest([CONTENT_UPDATED,...openJobs.map(j=>j.updatedAt)]));
  dates.set('/blog',newest([CONTENT_UPDATED,...articles.map(a=>a.date)]));
  const revs=await listReviews({status:'approved',target:'estaff'});dates.set('/reviews',newest([CONTENT_UPDATED,...revs.map(r=>r.createdAt)]));
  dates.set('/agencies',newest([CONTENT_UPDATED,...agencies.map(a=>a.updatedAt)]));
  const depth=(p:string)=>p.split('/').length;
  return [...new Set(paths)].map(path=>({url:absolute(path),lastModified:new Date(dates.get(path)||CONTENT_UPDATED),changeFrequency:path==='/'||path==='/blog'||path==='/jobs'?'daily':path.startsWith('/jobs/')||path==='/agencies'?'weekly':'monthly',priority:path==='/'?1:depth(path)<=2?0.8:depth(path)===3?0.7:0.6}));
}
