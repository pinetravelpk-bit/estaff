import Link from 'next/link';
import {getPoolJob} from '../../lib/pool';
import {LayoutDashboard,UserRound,Bell,Settings,Building2,Briefcase,Users,MailWarning} from 'lucide-react';
import {requireUser} from '../../lib/account-guard';
import {getAgencyByUser} from '../../lib/users';
import {listApplications,listJobs,getJob,type Job} from '../../lib/store';
import {mailConfigured} from '../../lib/mail';
import {SeekerOverview,SeekerProfile,SeekerAlerts} from '../../components/account-seeker';
import {AgencyOverview,AgencyProfile,AgencyJobs,AgencyApplicants} from '../../components/account-agency';

export const metadata={title:'My account'};
const MSG:Record<string,[string,boolean]>={
  welcome:['Welcome! Your account is ready. Please confirm your email using the link we sent you.',true],verified:['Thank you, your email is confirmed.',true],resent:['A new confirmation email is on its way.',true],badlink:['That confirmation link has expired or was already used.',false],
  saved:['Saved.',true],phone:['Please enter a valid phone number.',false],email:['Please enter a valid email address.',false],cvsize:['Your CV is larger than 5 MB.',false],cvtype:['Please upload your CV as PDF, Word, JPG or PNG.',false],
  wrongpw:['Your current password is not correct.',false],weakpw:['New password must be at least 8 characters with letters and a number.',false],pwchanged:['Your password has been changed.',true],
  agencyname:['Please enter your agency’s name.',false],logosize:['Logo must be under 2 MB.',false],logotype:['Logo must be JPG, PNG or WebP.',false],
  created:['Job published. Matching job seekers are being emailed.',true],updated:['Job updated.',true],close:['Job closed.',true],open:['Job reopened.',true],delete:['Job deleted.',true],invalid:['Please complete the job title, type, city, closing date and a description of at least 30 characters.',false],notapproved:['You can post jobs once your agency is approved.',false],
};

export default async function Account({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  const u=await requireUser();const q=await searchParams;const tab=q.tab||'overview';
  const msg=q.msg?MSG[q.msg]:undefined;
  const [apps,jobs]=await Promise.all([listApplications(),listJobs({status:'all'})]);
  const jobMap=new Map<string,Job>(jobs.map(j=>[j.id,j]));for(const a of apps){if(a.jobId&&!jobMap.has(a.jobId)){const pj=getPoolJob(a.jobId);if(pj)jobMap.set(pj.id,pj);}}
  const isAgency=u.role==='agency';const agency=isAgency?await getAgencyByUser(u.id):null;
  const tabs=isAgency?[['overview','Overview',LayoutDashboard],['profile','Agency profile',Building2],['jobs','Jobs',Briefcase],['applicants','Applicants',Users],['settings','Settings',Settings]] as const:[['overview','My applications',LayoutDashboard],['profile','Profile & CV',UserRound],['alerts','Job alerts',Bell],['settings','Settings',Settings]] as const;
  let body:React.ReactNode=null;
  if(!isAgency){
    const mine=apps.filter(a=>a.userId===u.id||(u.emailVerified&&a.email&&a.email.toLowerCase()===u.email));
    const open=(await listJobs()).filter(j=>!mine.some(a=>a.jobId===j.id));
    const rec=open.filter(j=>(!u.jobType||j.jobType===u.jobType)&&(!u.city||j.city===u.city||j.remote)).slice(0,6);
    body=tab==='profile'?<SeekerProfile u={u}/>:tab==='alerts'?<SeekerAlerts u={u}/>:tab==='settings'?null:<SeekerOverview u={u} apps={mine} jobs={jobMap} recommended={rec}/>;
  }else if(agency){
    const own=jobs.filter(j=>j.ownerId===u.id);const ids=new Set(own.map(j=>j.id));const theirApps=apps.filter(a=>a.jobId&&ids.has(a.jobId));
    const editing=q.edit?await getJob(q.edit):null;
    body=tab==='profile'?<AgencyProfile a={agency} u={u}/>:tab==='jobs'?<AgencyJobs a={agency} jobs={own} apps={theirApps} editing={editing&&editing.ownerId===u.id?editing:null} showForm={Boolean(q.new||editing)}/>:tab==='applicants'?<AgencyApplicants apps={theirApps}/>:tab==='settings'?null:<AgencyOverview a={agency} jobs={own} apps={theirApps}/>;
  }
  return <div className="container acc-wrap">
    <header className="acc-head">
      <div><span className="acc-role">{isAgency?'Agency account':'Job seeker account'}</span><h1>{isAgency?agency?.name:`Hello, ${u.name.split(' ')[0]}`}</h1><p>{u.email}{u.emailVerified?' · email confirmed':''}</p></div>
      <form method="post" action="/api/account/logout"><button className="btn">Sign out</button></form>
    </header>
    {!u.emailVerified&&<div className="acc-flash warn"><MailWarning size={18}/> Please confirm your email address. {mailConfigured()?<form method="post" action="/api/account/verify" style={{display:'inline'}}><button className="acc-linkbtn">Send the email again</button></form>:<span>Confirmation emails will start once estaff.pk switches on email.</span>}</div>}
    {msg&&<p className={'acc-flash'+(msg[1]?'':' bad')}>{msg[0]}</p>}
    <nav className="acc-tabs">{tabs.map(([k,label,I])=><Link key={k} href={'/account?tab='+k} className={tab===k?'on':''}><I size={17}/> {label}</Link>)}</nav>
    {tab==='settings'?<div className="acc-cols">
      <form className="acc-card acc-form" method="post" action="/api/account/profile"><input type="hidden" name="_action" value="password"/><h2>Change password</h2><label>Current password<input type="password" name="current" required autoComplete="current-password"/></label><label>New password<input type="password" name="password" required minLength={8} autoComplete="new-password"/></label><button className="btn glow">Change password</button></form>
      <form className="acc-card acc-form danger" method="post" action="/api/account/profile"><input type="hidden" name="_action" value="delete"/><h2>Delete account</h2><p>This permanently deletes your account{isAgency?' and agency listing':', profile and saved CV'}. Applications already sent stay with the employer.</p><label>Current password<input type="password" name="current" required autoComplete="current-password"/></label><button className="btn danger">Delete my account</button></form>
    </div>:body}
  </div>;
}
