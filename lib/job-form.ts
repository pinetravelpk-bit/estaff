// Builds a Job from a submitted job form (used by the admin dashboard and agency accounts).
import {newId,now,type Job,type EmploymentType} from './store';
import {anyCity,slugify} from './pakistan';
import {jobType} from './jobs';

const s=(f:FormData,k:string,max=200)=>String(f.get(k)??'').trim().slice(0,max);
const lines=(f:FormData,k:string)=>s(f,k,4000).split(/\r?\n/).map(x=>x.replace(/^[-•*]\s*/,'').trim()).filter(Boolean).slice(0,20);
const num=(f:FormData,k:string)=>{const n=parseInt(s(f,k).replace(/[^0-9]/g,''),10);return Number.isFinite(n)&&n>0?n:null;};
const TYPES:EmploymentType[]=['FULL_TIME','PART_TIME','CONTRACTOR','TEMPORARY'];

export function jobFromForm(f:FormData,existing:Job|null,extra:Partial<Job>={}):Job|null{
  const title=s(f,'title',120),type=s(f,'jobType'),city=s(f,'city'),description=s(f,'description',5000),validThrough=s(f,'validThrough',10);
  if(title.length<3||!jobType(type)||!anyCity(city)||description.length<30||!/^\d{4}-\d{2}-\d{2}$/.test(validThrough))return null;
  const et=s(f,'employmentType') as EmploymentType;
  return {
    id:existing?.id||`${slugify(title).slice(0,50)}-${city}-${newId()}`,
    title,jobType:type,city,area:s(f,'area',80),employmentType:TYPES.includes(et)?et:'FULL_TIME',
    remote:f.get('remote')==='on',liveIn:f.get('liveIn')==='on',salaryMin:num(f,'salaryMin'),salaryMax:num(f,'salaryMax'),
    employer:s(f,'employer',120),description,duties:lines(f,'duties'),requirements:lines(f,'requirements'),benefits:lines(f,'benefits'),
    datePosted:existing?.datePosted||new Date().toISOString().slice(0,10),validThrough,status:existing?.status||'open',
    createdAt:existing?.createdAt||now(),updatedAt:now(),...(existing?.ownerId?{ownerId:existing.ownerId}:{}),...extra,
  };
}
