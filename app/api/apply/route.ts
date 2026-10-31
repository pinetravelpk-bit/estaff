import {NextResponse} from 'next/server';
import {upsertCandidateFromApplication,addApplication,getJob,isJobOpen,newId,now,saveCv} from '../../../lib/store';
import {rateLimited,clientIp} from '../../../lib/auth';
import {currentUser} from '../../../lib/users';
import {listApplications} from '../../../lib/store';
import {notifyNewApplication} from '../../../lib/notify';

export const dynamic='force-dynamic';
const clean=(v:FormDataEntryValue|null,max=200)=>String(v??'').replace(/[\u0000-\u001f]/g,' ').trim().slice(0,max);

export async function POST(req:Request){
  if(rateLimited('apply:'+clientIp(req),8,60*60*1000))return NextResponse.json({ok:false,error:'Too many applications from this connection. Please try again later.'},{status:429});
  let f:FormData;try{f=await req.formData();}catch{return NextResponse.json({ok:false,error:'The form could not be read. Please try again.'},{status:400});}
  if(clean(f.get('website')))return NextResponse.json({ok:true}); // spam trap
  const name=clean(f.get('name'),100),phone=clean(f.get('phone'),30),email=clean(f.get('email'),120);
  if(name.length<2||!/^[+0-9 ()-]{10,20}$/.test(phone))return NextResponse.json({ok:false,error:'Please enter your full name and a valid phone number.'},{status:400});
  if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return NextResponse.json({ok:false,error:'Please enter a valid email address or leave it empty.'},{status:400});
  if(f.get('consent')!=='yes')return NextResponse.json({ok:false,error:'Please confirm that we may contact you about this application.'},{status:400});
  const jobId=clean(f.get('jobId'),80)||null;let jobTitle='General CV registration';
  if(jobId){const job=await getJob(jobId);if(!job||!isJobOpen(job))return NextResponse.json({ok:false,error:'This vacancy is no longer open.'},{status:410});jobTitle=job.title;}
  let cvFile:string|null=null,cvName:string|null=null;const cv=f.get('cv');
  if(cv&&typeof cv!=='string'&&cv.size>0){try{cvFile=await saveCv(cv);cvName=clean(cv.name,120);}catch(e){return NextResponse.json({ok:false,error:(e as Error).message==='size'?'Your CV is larger than 5 MB.':'Please upload your CV as PDF, Word, JPG or PNG.'},{status:400});}}
  // Signed-in job seekers: link the application to their account and reuse their saved CV.
  const user=await currentUser();const seeker=user?.role==='seeker'?user:null;
  if(seeker&&!cvFile&&seeker.cvFile&&f.get('useProfileCv')!=='no'){cvFile=seeker.cvFile;cvName=seeker.cvName;}
  if(jobId&&seeker&&(await listApplications()).some(a=>a.userId===seeker.id&&a.jobId===jobId))return NextResponse.json({ok:false,error:'You have already applied for this job. You can follow its status in your account.'},{status:409});
  const app=await addApplication({id:newId('app-'),jobId,jobTitle,name,phone,email:email||seeker?.email||'',city:clean(f.get('city'),60),role:clean(f.get('role'),80),experience:clean(f.get('experience'),40),message:clean(f.get('message'),2000),cvFile,cvName,status:'new',createdAt:now(),...(seeker?{userId:seeker.id}:{})});
  await upsertCandidateFromApplication(app);
  await notifyNewApplication(app);
  return NextResponse.json({ok:true,account:Boolean(seeker)});
}
