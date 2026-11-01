import {NextResponse} from 'next/server';
import {rateLimited,clientIp} from '../../../lib/auth';
import {saveJob,newId,now,upsertEmployerFromEnquiry} from '../../../lib/store';
import {jobFromForm} from '../../../lib/job-form';
import {stripLinks} from '../../../lib/users';
import {notifyNewEmployerJob} from '../../../lib/notify';

export const dynamic='force-dynamic';
const clean=(v:FormDataEntryValue|null,max=200)=>String(v??'').replace(/[\u0000-\u0008\u000b-\u001f]/g,' ').trim().slice(0,max);
const bad=(error:string,status=400)=>NextResponse.json({ok:false,error},{status});

// Employers post a vacancy from the public "Post a Job" page. It is saved as "pending"
// and only goes live (and to Google Jobs) after the estaff.pk team approves it.
export async function POST(req:Request){
  if(rateLimited('postjob:'+clientIp(req),5,60*60*1000))return bad('Too many jobs from this connection. Please try again later.',429);
  let f:FormData;try{f=await req.formData();}catch{return bad('The form could not be read. Please try again.');}
  if(clean(f.get('website')))return NextResponse.json({ok:true});
  const company=clean(f.get('company'),120),name=clean(f.get('contactName'),80),phone=clean(f.get('phone'),30),email=clean(f.get('email'),120);
  if(company.length<2||name.length<2)return bad('Please enter your name and company or family name.');
  if(!/^[+0-9 ()-]{10,20}$/.test(phone))return bad('Please enter a valid phone number.');
  if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return bad('Please enter a valid email address or leave it empty.');
  if(f.get('real')!=='yes'||f.get('consent')!=='yes')return bad('Please confirm both boxes at the end of the form.');
  // Keep links and contact details out of the public text.
  for(const k of ['title','description','duties','requirements','benefits'])f.set(k,stripLinks(clean(f.get(k),5000)).replace(/(\+?92|0)3\d{2}[\s-]?\d{7}/g,'[phone removed]'));
  const today=new Date();const max=new Date(today.getTime()+90*86400000).toISOString().slice(0,10);
  if(clean(f.get('validThrough'),10)>max)f.set('validThrough',max);
  if(clean(f.get('description'),5000).length<60)return bad('Please describe the job in at least a few sentences (60 characters or more).');
  const job=jobFromForm(f,null,{status:'pending',source:'employer',employer:company,contact:{company,name,phone,email}});
  if(!job)return bad('Please fill in the job title, kind of work, city, description and closing date.');
  if(job.validThrough<today.toISOString().slice(0,10))return bad('The closing date is in the past.');
  await saveJob(job);
  await upsertEmployerFromEnquiry({id:job.id,name,company,email,phone,role:job.title,city:job.city,area:job.area,schedule:'',budget:job.salaryMax?String(job.salaryMax):'',start:'',details:'Posted a job on the website: '+job.title,status:'new',createdAt:now()});
  await notifyNewEmployerJob(job);
  return NextResponse.json({ok:true,id:newId()});
}
