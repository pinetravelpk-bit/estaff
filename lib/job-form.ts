// Builds a Job from a submitted job form (used by the admin dashboard and agency accounts).
import {newId,now,type Job,type EmploymentType} from './store';
import {anyCity,slugify} from './pakistan';
import {jobType} from './jobs';
import {poolRole} from './pool';

const s=(f:FormData,k:string,max=200)=>String(f.get(k)??'').trim().slice(0,max);
const lines=(f:FormData,k:string)=>s(f,k,4000).split(/\r?\n/).map(x=>x.replace(/^[-•*]\s*/,'').trim()).filter(Boolean).slice(0,20);
const num=(f:FormData,k:string)=>{const n=parseInt(s(f,k).replace(/[^0-9]/g,''),10);return Number.isFinite(n)&&n>0?n:null;};
export const EDU=['','none','high school','associate degree','bachelor degree','postgraduate degree','professional certificate'];
export const EDU_LABEL:Record<string,string>={'':'Not stated',none:'No formal education required','high school':'Matric / Intermediate','associate degree':'Diploma (DAE / associate)','bachelor degree':'Bachelor’s degree','postgraduate degree':'Master’s or higher','professional certificate':'Professional certificate or licence'};
// Main post office codes, used when a job has no postal code of its own.
export const CITY_POSTAL:Record<string,string>={islamabad:'44000',rawalpindi:'46000',lahore:'54000',karachi:'74200',faisalabad:'38000',multan:'60000',peshawar:'25000',quetta:'87300',hyderabad:'71000',gujranwala:'52250',sialkot:'51310',bahawalpur:'63100'};
const TYPES:EmploymentType[]=['FULL_TIME','PART_TIME','CONTRACTOR','TEMPORARY'];

export function jobFromForm(f:FormData,existing:Job|null,extra:Partial<Job>={}):Job|null{
  const title=s(f,'title',120),type=s(f,'jobType'),city=s(f,'city'),description=s(f,'description',5000),validThrough=s(f,'validThrough',10);
  if(title.length<3||!(jobType(type)||poolRole(type))||!anyCity(city)||description.length<30||!/^\d{4}-\d{2}-\d{2}$/.test(validThrough))return null;
  const et=s(f,'employmentType') as EmploymentType;
  return {
    id:existing?.id||`${slugify(title).slice(0,50)}-${city}-${newId()}`,
    title,jobType:type,city,area:s(f,'area',80),employmentType:TYPES.includes(et)?et:'FULL_TIME',
    remote:f.get('remote')==='on',liveIn:f.get('liveIn')==='on',salaryMin:num(f,'salaryMin'),salaryMax:num(f,'salaryMax'),
    employer:s(f,'employer',120),description,experience:s(f,'experience',160),expMonths:Math.min(600,num(f,'expMonths')||0),education:s(f,'education',160),eduLevel:EDU.includes(s(f,'eduLevel'))?s(f,'eduLevel'):'',postalCode:s(f,'postalCode',10).replace(/[^0-9]/g,''),duties:lines(f,'duties'),requirements:lines(f,'requirements'),benefits:lines(f,'benefits'),
    datePosted:existing?.datePosted||new Date().toISOString().slice(0,10),validThrough,status:existing?.status||'open',
    createdAt:existing?.createdAt||now(),updatedAt:now(),...(existing?.ownerId?{ownerId:existing.ownerId}:{}),...extra,
  };
}
