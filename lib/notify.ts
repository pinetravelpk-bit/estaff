// Every email the site sends: account emails, job alerts, status updates and
// notices to the estaff.pk team and to agencies.
import {sendMail,emailHtml} from './mail';
import {absolute} from './seo';
import {getSettings} from './settings';
import {listUsers,makeToken,unsubscribeSig,getAgencyByUser,getUser,type User} from './users';
import {getJob,type Job,type Application,type Enquiry} from './store';
import {anyCity} from './pakistan';
import {jobType} from './jobs';

const place=(j:Job)=>j.remote?'Remote':(anyCity(j.city)?.name||j.city)+(j.area?', '+j.area:'');
const salary=(j:Job)=>j.salaryMin&&j.salaryMax?`PKR ${j.salaryMin.toLocaleString('en-PK')}–${j.salaryMax.toLocaleString('en-PK')} a month`:j.salaryMin?`From PKR ${j.salaryMin.toLocaleString('en-PK')} a month`:'Salary discussed at interview';

export async function sendVerifyEmail(u:User){
  const t=await makeToken(u.id,'verify',72);
  return sendMail(u.email,'Confirm your email for estaff.pk',emailHtml(`Welcome to estaff.pk, ${u.name.split(' ')[0]}`,['Please confirm your email address so we can send you account updates'+(u.role==='seeker'?' and job alerts.':'.'),'This link is valid for 3 days.'],{label:'Confirm my email',href:absolute('/api/account/verify?token='+t)}));
}
export async function sendResetEmail(u:User){
  const t=await makeToken(u.id,'reset',2);
  return sendMail(u.email,'Reset your estaff.pk password',emailHtml('Reset your password',['Someone (hopefully you) asked to reset the password for your estaff.pk account.','This link is valid for 2 hours. If you did not ask for this, you can ignore this email.'],{label:'Choose a new password',href:absolute('/account/reset?token='+t)}));
}

// Email every job seeker whose alert settings match a newly published job.
export async function sendJobAlerts(j:Job){
  const users=(await listUsers()).filter(u=>u.role==='seeker'&&u.status==='active'&&u.emailVerified&&u.alerts.enabled&&(!u.alerts.jobTypes.length||u.alerts.jobTypes.includes(j.jobType))&&(!u.alerts.cities.length||j.remote||u.alerts.cities.includes(j.city)));
  let sent=0;
  for(const u of users){
    const unsub=absolute(`/api/alerts/unsubscribe?u=${u.id}&s=${unsubscribeSig(u.id)}`);
    if(await sendMail(u.email,`New job: ${j.title} – ${place(j)}`,emailHtml(`New job: ${j.title}`,[`${jobType(j.jobType)?.title||'Job'} · ${place(j)}`,salary(j),j.description.slice(0,300)+(j.description.length>300?'…':''),'You are receiving this because it matches your job alert on estaff.pk.'],{label:'View and apply',href:absolute('/jobs/'+j.id)},`Manage alerts: ${absolute('/account?tab=alerts')} · Stop all alerts: ${unsub}`)))sent++;
  }
  return sent;
}

const STATUS_TEXT:Record<string,string>={reviewed:'Your application has been reviewed.',shortlisted:'Good news: you have been shortlisted. The team will contact you about the next step.',rejected:'Thank you for applying. This time the employer has chosen other candidates. We will keep your CV for future openings.'};
export async function sendApplicationStatus(a:Application,status:string){
  const text=STATUS_TEXT[status];if(!text)return false;
  const to=a.email||(a.userId?(await getUser(a.userId))?.email:'')||'';
  return sendMail(to,`Update on your application: ${a.jobTitle}`,emailHtml('Application update',[`Hello ${a.name.split(' ')[0]},`,`About: ${a.jobTitle}`,text],{label:'See my applications',href:absolute('/account')}));
}

// Notices to the estaff.pk team (address set in Admin → Email) and to the agency that owns a job.
export async function notifyNewApplication(a:Application){
  const n=getSettings().notify;
  if(n.email&&n.applications)await sendMail(n.email,`New application: ${a.name} – ${a.jobTitle}`,emailHtml('New application',[`${a.name} · ${a.phone}${a.email?' · '+a.email:''}`,`For: ${a.jobTitle}`,`${a.city} · ${a.role} · ${a.experience}`,a.message||'',a.cvFile?'CV attached in the dashboard.':'No CV attached.'],{label:'Open applications',href:absolute('/admin/applications')}));
  if(a.jobId){const job=await getJob(a.jobId);if(job?.ownerId){const ag=await getAgencyByUser(job.ownerId);const owner=await getUser(job.ownerId);const to=ag?.email||owner?.email;if(to)await sendMail(to,`New applicant for ${job.title}`,emailHtml('You have a new applicant',[`${a.name} applied for ${job.title}.`,'Sign in to see their details and CV.'],{label:'View applicants',href:absolute('/account?tab=applicants')}));}}
}
export async function notifyNewEnquiry(e:Enquiry){
  const n=getSettings().notify;if(!n.email||!n.enquiries)return;
  await sendMail(n.email,`New staff request: ${e.role} – ${e.name}`,emailHtml('New staff request',[`${e.name}${e.company?' ('+e.company+')':''} · ${e.phone}${e.email?' · '+e.email:''}`,`Needs: ${e.role} · ${e.city}${e.area?', '+e.area:''} · ${e.schedule}`,e.details],{label:'Open staff requests',href:absolute('/admin/enquiries')}));
}
export async function notifyNewAgency(name:string,email:string){
  const n=getSettings().notify;if(!n.email||!n.agencies)return;
  await sendMail(n.email,`Agency waiting for approval: ${name}`,emailHtml('New agency sign-up',[`${name} (${email}) created an agency profile and is waiting for approval.`],{label:'Review agencies',href:absolute('/admin/accounts?tab=agencies')}));
}
export async function sendAgencyApproved(email:string,name:string,slug:string){
  return sendMail(email,'Your agency is now listed on estaff.pk',emailHtml(`${name} is approved`,['Your agency profile is now live in the estaff.pk agency directory, and you can post jobs.'],{label:'View my listing',href:absolute('/agencies/'+slug)}));
}
export async function notifyNewReview(r:{name:string;rating:number;title:string;text:string;target:string},agencySlug:string){
  const n=getSettings().notify;if(!n.email||!n.reviews)return;
  await sendMail(n.email,`New ${r.rating}-star review waiting for approval`,emailHtml('New review',[`${r.name} gave ${r.rating} out of 5${r.target==='agency'?` to the agency ${agencySlug}`:' to estaff.pk'}.`,r.title,r.text.slice(0,500)],{label:'Review it',href:absolute('/admin/reviews')}));
}
export async function notifyNewEmployerJob(j:Job){
  const n=getSettings().notify;if(!n.email||!n.enquiries)return;
  await sendMail(n.email,`New job posted by an employer: ${j.title}`,emailHtml('Job waiting for approval',[`${j.contact?.company||j.employer} · ${j.contact?.name||''} · ${j.contact?.phone||''}${j.contact?.email?' · '+j.contact.email:''}`,`${j.title} · ${place(j)}`,j.description.slice(0,400)],{label:'Review the job',href:absolute('/admin/jobs?status=pending')}));
}
