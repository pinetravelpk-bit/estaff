import {NextResponse} from 'next/server';
import {isAdmin} from '../../../../lib/auth';
import {getJob,saveJob,deleteJob,newId,now,type Job,type EmploymentType} from '../../../../lib/store';
import {revalidateJob} from '../../../../lib/revalidate';
import {anyCity,slugify} from '../../../../lib/pakistan';
import {jobType} from '../../../../lib/jobs';

export const dynamic='force-dynamic';
const s=(f:FormData,k:string,max=200)=>String(f.get(k)??'').trim().slice(0,max);
const lines=(f:FormData,k:string)=>s(f,k,4000).split(/\r?\n/).map(x=>x.replace(/^[-•*]\s*/,'').trim()).filter(Boolean).slice(0,20);
const num=(f:FormData,k:string)=>{const n=parseInt(s(f,k).replace(/[^0-9]/g,''),10);return Number.isFinite(n)&&n>0?n:null;};
const TYPES:EmploymentType[]=['FULL_TIME','PART_TIME','CONTRACTOR','TEMPORARY'];

export async function POST(req:Request){
  const back=(q:string)=>NextResponse.redirect(new URL('/admin?tab=jobs'+q,req.url),303);
  if(!(await isAdmin()))return NextResponse.redirect(new URL('/admin',req.url),303);
  const f=await req.formData();const action=s(f,'_action');const id=s(f,'id');
  if(action==='delete'||action==='close'||action==='open'){
    const job=await getJob(id);if(!job)return back('&msg=notfound');
    if(action==='delete')await deleteJob(id);else await saveJob({...job,status:action==='close'?'closed':'open',updatedAt:now()});
    revalidateJob(job);return back('&msg='+action);
  }
  const title=s(f,'title',120),type=s(f,'jobType'),city=s(f,'city'),description=s(f,'description',5000),validThrough=s(f,'validThrough',10);
  if(title.length<3||!jobType(type)||!anyCity(city)||description.length<30||!/^\d{4}-\d{2}-\d{2}$/.test(validThrough))return back('&msg=invalid'+(id?'&edit='+id:'&new=1'));
  const existing=id?await getJob(id):null;const et=s(f,'employmentType') as EmploymentType;
  const job:Job={
    id:existing?.id||`${slugify(title).slice(0,50)}-${city}-${newId()}`,
    title,jobType:type,city,area:s(f,'area',80),employmentType:TYPES.includes(et)?et:'FULL_TIME',
    remote:f.get('remote')==='on',liveIn:f.get('liveIn')==='on',salaryMin:num(f,'salaryMin'),salaryMax:num(f,'salaryMax'),
    employer:s(f,'employer',120),description,duties:lines(f,'duties'),requirements:lines(f,'requirements'),benefits:lines(f,'benefits'),
    datePosted:existing?.datePosted||new Date().toISOString().slice(0,10),validThrough,status:existing?.status||'open',
    createdAt:existing?.createdAt||now(),updatedAt:now(),
  };
  await saveJob(job);
  if(existing&&(existing.city!==job.city||existing.jobType!==job.jobType))revalidateJob(existing);
  revalidateJob(job);
  return back('&msg='+(existing?'updated':'created'));
}
