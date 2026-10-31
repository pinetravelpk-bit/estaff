import Link from 'next/link';
import {CheckCircle2,Circle,FileText,Bell,Briefcase,MapPin} from 'lucide-react';
import type {User} from '../lib/users';
import type {Application,Job} from '../lib/store';
import {jobTypes,jobType} from '../lib/jobs';
import {allCities,anyCity,provinces} from '../lib/pakistan';

const STATUS:Record<string,{label:string;text:string}>={
  new:{label:'Received',text:'Your application has been received.'},
  reviewed:{label:'Reviewed',text:'The team has reviewed your application.'},
  shortlisted:{label:'Shortlisted',text:'You are shortlisted. Expect a call about the next step.'},
  rejected:{label:'Not selected',text:'Not selected this time. Your CV stays on file for future jobs.'},
};
const STEPS=['new','reviewed','shortlisted'];
const day=(iso:string)=>new Date(iso).toLocaleDateString('en-PK',{dateStyle:'medium',timeZone:'Asia/Karachi'});

export function seekerCompleteness(u:User){const items:[string,boolean][]=[['Email confirmed',u.emailVerified],['Phone number',Boolean(u.phone)],['City',Boolean(u.city)],['Kind of work',Boolean(u.jobType)],['Experience',Boolean(u.experience)],['CV uploaded',Boolean(u.cvFile)],['About you',u.about.length>30]];return {items,pct:Math.round(items.filter(i=>i[1]).length/items.length*100)};}

export function SeekerOverview({u,apps,jobs,recommended}:{u:User;apps:Application[];jobs:Map<string,Job>;recommended:Job[]}){
  const {items,pct}=seekerCompleteness(u);
  return <>
    <div className="acc-cols">
      <section className="acc-card"><h2>My applications ({apps.length})</h2>
        {apps.length===0?<div className="acc-empty"><p>You have not applied for any jobs yet.</p><Link className="btn glow" href="/jobs">Browse jobs</Link></div>:
        <ul className="acc-apps">{apps.map(a=>{const st=STATUS[a.status]||STATUS.new;const j=a.jobId?jobs.get(a.jobId):undefined;const idx=STEPS.indexOf(a.status);return <li key={a.id} className={'st-'+a.status}>
          <div className="acc-app-head"><div><strong>{j?<a href={'/jobs/'+j.id}>{a.jobTitle}</a>:a.jobTitle}</strong><small>Applied {day(a.createdAt)}{j?` · ${j.remote?'Remote':anyCity(j.city)?.name}`:''}</small></div><span className={'acc-pill p-'+a.status}>{st.label}</span></div>
          {a.status!=='rejected'&&<ol className="acc-track">{STEPS.map((s,i)=><li key={s} className={i<=idx?'done':''}>{STATUS[s].label}</li>)}</ol>}
          <p>{st.text}</p>
        </li>;})}</ul>}
      </section>
      <aside className="acc-card"><h2>Profile strength</h2>
        <div className="acc-meter"><i style={{width:pct+'%'}}/></div><p className="acc-meter-num">{pct}% complete</p>
        <ul className="acc-checks">{items.map(([k,ok])=><li key={k} className={ok?'ok':''}>{ok?<CheckCircle2 size={17}/>:<Circle size={17}/>} {k}</li>)}</ul>
        <Link className="btn" href="/account?tab=profile">Update profile & CV</Link>
      </aside>
    </div>
    {recommended.length>0&&<section className="acc-card"><h2>Jobs for you</h2><div className="acc-jobs">{recommended.map(j=><a key={j.id} href={'/jobs/'+j.id}><Briefcase size={16}/><span><strong>{j.title}</strong><small><MapPin size={12}/> {j.remote?'Remote':anyCity(j.city)?.name}</small></span></a>)}</div></section>}
  </>;
}

export function SeekerProfile({u}:{u:User}){
  return <form className="acc-card acc-form grid" method="post" action="/api/account/profile" encType="multipart/form-data">
    <h2 className="full">Profile & CV</h2>
    <label>Full name<input name="name" defaultValue={u.name} required/></label>
    <label>Phone / WhatsApp<input name="phone" defaultValue={u.phone} required/></label>
    <label>Email<input value={u.email} disabled/></label>
    <label>City<select name="city" defaultValue={u.city}><option value="">Choose…</option>{allCities.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
    <label>Kind of work<select name="jobType" defaultValue={u.jobType}><option value="">Choose…</option>{jobTypes.map(j=><option key={j.slug} value={j.slug}>{j.title}</option>)}</select></label>
    <label>Experience<select name="experience" defaultValue={u.experience}><option value="">Choose…</option>{['Less than 1 year','1–2 years','3–5 years','6–10 years','More than 10 years'].map(x=><option key={x}>{x}</option>)}</select></label>
    <label className="full">Skills<input name="skills" defaultValue={u.skills} placeholder="e.g. Pakistani & Chinese cooking, baking, driving licence LTV"/></label>
    <label className="full">About you<textarea name="about" rows={4} defaultValue={u.about} placeholder="Your previous jobs, how long you worked there, live-in or live-out preference…"/></label>
    <div className="full acc-cv"><FileText size={22}/>{u.cvFile?<span>Current CV: <a href={'/api/account/cv/'+u.cvFile}>{u.cvName||'Download'}</a> <label className="check inline"><input type="checkbox" name="removeCv"/> Remove</label></span>:<span>No CV uploaded yet.</span>}</div>
    <label className="full file-drop"><span>{u.cvFile?'Upload a new CV to replace it':'Upload your CV'} (PDF, Word, JPG or PNG · max 5 MB)</span><input type="file" name="cv" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"/></label>
    <button className="btn glow full">Save profile</button>
  </form>;
}

export function SeekerAlerts({u}:{u:User}){
  const groups=['ict','punjab','sindh','kp','balochistan','ajk','gb'] as const;
  return <form className="acc-card acc-form" method="post" action="/api/account/profile"><input type="hidden" name="_action" value="alerts"/>
    <h2><Bell size={20}/> Job alerts by email</h2>
    <p>We email you when a new job matching these choices is posted. Leave a list empty to get every job type or every city.</p>
    {!u.emailVerified&&<p className="acc-flash warn">Confirm your email address first; alerts are only sent to confirmed emails.</p>}
    <label className="acc-switch"><input type="checkbox" name="alertsOn" defaultChecked={u.alerts.enabled}/> <span>Send me job alerts</span></label>
    <h3>Kinds of work</h3>
    <div className="acc-chips">{jobTypes.map(j=><label key={j.slug}><input type="checkbox" name="alertTypes" value={j.slug} defaultChecked={u.alerts.jobTypes.includes(j.slug)}/><span>{j.title}</span></label>)}</div>
    <h3>Cities</h3>
    {groups.map(g=><details key={g} open={allCities.some(c=>c.province===g&&u.alerts.cities.includes(c.slug))||g==='ict'}><summary>{provinces[g].name}</summary><div className="acc-chips">{allCities.filter(c=>c.province===g).map(c=><label key={c.slug}><input type="checkbox" name="alertCities" value={c.slug} defaultChecked={u.alerts.cities.includes(c.slug)}/><span>{c.name}</span></label>)}</div></details>)}
    <p className="muted-line">Currently: {u.alerts.enabled?`${u.alerts.jobTypes.length?u.alerts.jobTypes.map(t=>jobType(t)?.title).join(', '):'all jobs'} in ${u.alerts.cities.length?u.alerts.cities.map(c=>anyCity(c)?.name).join(', '):'all cities'}`:'alerts are off'}.</p>
    <button className="btn glow">Save alerts</button>
  </form>;
}
