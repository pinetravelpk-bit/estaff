import Link from 'next/link';
import {Clock,CheckCircle2,ShieldAlert,Plus} from 'lucide-react';
import type {User,Agency} from '../lib/users';
import {isJobOpen,type Application,type Job} from '../lib/store';
import {allTypeOptions,typeTitle} from '../lib/pool';
import {allCities,anyCity,provinces} from '../lib/pakistan';
import {cityServices} from '../lib/service-city';

const day=(iso:string)=>new Date(iso).toLocaleDateString('en-PK',{dateStyle:'medium',timeZone:'Asia/Karachi'});
const wa=(p:string)=>{const d=p.replace(/[^0-9]/g,'');return 'https://wa.me/'+(d.startsWith('0')?'92'+d.slice(1):d);};
export const AGENCY_SERVICES:[string,string][]=[['domestic-staff','Domestic staff'],...cityServices.map(s=>[s.slug,s.name] as [string,string])];

export function AgencyStatus({a}:{a:Agency}){
  if(a.status==='approved')return <p className="acc-flash"><CheckCircle2 size={17}/> Your agency is approved and listed in the <a href={'/agencies/'+a.slug}>agency directory</a>. You can post jobs.</p>;
  if(a.status==='suspended')return <p className="acc-flash bad"><ShieldAlert size={17}/> Your listing is suspended. Please contact estaff.pk.</p>;
  return <p className="acc-flash warn"><Clock size={17}/> Your agency is waiting for approval. Complete your profile below; our team usually reviews new agencies within 1–2 working days. You can post jobs once approved.</p>;
}

export function AgencyOverview({a,jobs,apps}:{a:Agency;jobs:Job[];apps:Application[]}){
  const open=jobs.filter(isJobOpen).length;
  return <>
    <AgencyStatus a={a}/>
    <div className="acc-stats"><div><strong>{open}</strong><span>Open jobs</span></div><div><strong>{apps.length}</strong><span>Applicants</span></div><div><strong>{apps.filter(x=>x.status==='new').length}</strong><span>New applicants</span></div><div><strong>{a.cities.length}</strong><span>Cities served</span></div></div>
    <section className="acc-card"><h2>Latest applicants</h2>{apps.length===0?<p>No applicants yet. {a.status==='approved'?<Link href="/account?tab=jobs&new=1">Post a job</Link>:'You can post jobs once approved.'}</p>:<ul className="acc-list">{apps.slice(0,6).map(x=><li key={x.id}><strong>{x.name}</strong> applied for {x.jobTitle}<small>{day(x.createdAt)}</small></li>)}</ul>}<Link className="btn" href="/account?tab=applicants">All applicants</Link></section>
  </>;
}

export function AgencyProfile({a,u}:{a:Agency;u:User}){
  const groups=['ict','punjab','sindh','kp','balochistan','ajk','gb'] as const;
  return <form className="acc-card acc-form grid" method="post" action="/api/account/agency" encType="multipart/form-data">
    <h2 className="full">Agency profile</h2>
    <p className="full acc-note">This is what people see in the directory. Websites and web links are not allowed on estaff.pk; any links in the text are removed automatically. People contact you by phone, WhatsApp or email.</p>
    <label className="full">Agency name<input name="name" defaultValue={a.name} required/></label>
    <div className="full acc-logo">{a.logo?<img src={a.logo} alt=""/>:<span className="acc-logo-ph">{a.name.slice(0,1)}</span>}<label className="file-drop"><span>{a.logo?'Replace logo':'Upload logo'} (JPG, PNG or WebP · max 2 MB)</span><input type="file" name="logo" accept="image/jpeg,image/png,image/webp"/></label>{a.logo&&<label className="check inline"><input type="checkbox" name="removeLogo"/> Remove logo</label>}</div>
    <label className="full">About the agency<textarea name="about" rows={6} defaultValue={a.about} placeholder="What you do, which roles you place, how you screen candidates, your fees policy for employers…"/></label>
    <label>Phone<input name="phone" defaultValue={a.phone} required/></label>
    <label>WhatsApp<input name="whatsapp" defaultValue={a.whatsapp}/></label>
    <label>Public email<input name="email" type="email" defaultValue={a.email||u.email} required/></label>
    <label>Main city<select name="city" defaultValue={a.city}><option value="">Choose…</option>{allCities.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
    <label className="full">Office address<input name="address" defaultValue={a.address}/></label>
    <label>Registration / licence no. (optional)<input name="regNo" defaultValue={a.regNo}/></label>
    <label>Year founded<input name="founded" inputMode="numeric" defaultValue={a.founded} placeholder="2015"/></label>
    <fieldset className="full"><legend>Services</legend><div className="acc-chips">{AGENCY_SERVICES.map(([s,n])=><label key={s}><input type="checkbox" name="services" value={s} defaultChecked={a.services.includes(s)}/><span>{n}</span></label>)}</div></fieldset>
    <fieldset className="full"><legend>Cities you serve</legend>{groups.map(g=><details key={g} open={allCities.some(c=>c.province===g&&a.cities.includes(c.slug))}><summary>{provinces[g].name}</summary><div className="acc-chips">{allCities.filter(c=>c.province===g).map(c=><label key={c.slug}><input type="checkbox" name="cities" value={c.slug} defaultChecked={a.cities.includes(c.slug)}/><span>{c.name}</span></label>)}</div></details>)}</fieldset>
    <button className="btn glow full">Save profile</button>
  </form>;
}

function JobForm({job}:{job:Job|null}){
  const v=(k:keyof Job)=>job?(Array.isArray(job[k])?(job[k] as string[]).join('\n'):String(job[k]??'')):'';
  const in60=new Date(Date.now()+60*86400000).toISOString().slice(0,10);
  return <form className="acc-card acc-form grid" method="post" action="/api/account/jobs">
    {job&&<input type="hidden" name="id" value={job.id}/>}
    <h2 className="full">{job?'Edit job':'Post a job'}</h2>
    <label className="full">Job title<input name="title" required defaultValue={v('title')}/></label>
    <label>Job type<select name="jobType" required defaultValue={v('jobType')}><option value="">Choose…</option>{allTypeOptions().map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select></label>
    <label>City<select name="city" required defaultValue={v('city')}><option value="">Choose…</option>{allCities.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
    <label>Area<input name="area" defaultValue={v('area')}/></label>
    <label>Employment type<select name="employmentType" defaultValue={v('employmentType')||'FULL_TIME'}><option value="FULL_TIME">Full-time</option><option value="PART_TIME">Part-time</option><option value="CONTRACTOR">Contract</option><option value="TEMPORARY">Temporary</option></select></label>
    <label>Salary from (PKR/month)<input name="salaryMin" inputMode="numeric" defaultValue={v('salaryMin')}/></label>
    <label>Salary to (PKR/month)<input name="salaryMax" inputMode="numeric" defaultValue={v('salaryMax')}/></label>
    <label>Closing date<input type="date" name="validThrough" required defaultValue={v('validThrough')||in60}/></label>
    <label className="check"><input type="checkbox" name="liveIn" defaultChecked={job?.liveIn}/> Live-in</label>
    <label className="check"><input type="checkbox" name="remote" defaultChecked={job?.remote}/> Remote</label>
    <label className="full">Description<textarea name="description" rows={5} required defaultValue={v('description')}/></label>
    <label>Duties (one per line)<textarea name="duties" rows={4} defaultValue={v('duties')}/></label>
    <label>Requirements (one per line)<textarea name="requirements" rows={4} defaultValue={v('requirements')}/></label>
    <label className="full">Benefits (one per line)<textarea name="benefits" rows={2} defaultValue={v('benefits')}/></label>
    <div className="full acc-row"><button className="btn glow">{job?'Save job':'Publish job'}</button><Link href="/account?tab=jobs">Cancel</Link></div>
  </form>;
}

export function AgencyJobs({a,jobs,apps,editing,showForm}:{a:Agency;jobs:Job[];apps:Application[];editing:Job|null;showForm:boolean}){
  if(a.status!=='approved')return <><AgencyStatus a={a}/></>;
  return <>
    {showForm?<JobForm job={editing}/>:<p><Link className="btn glow" href="/account?tab=jobs&new=1"><Plus size={16}/> Post a job</Link></p>}
    <section className="acc-card"><h2>Your jobs ({jobs.length})</h2>
      {jobs.length===0?<p>No jobs yet.</p>:<div className="acc-table"><table><thead><tr><th>Job</th><th>City</th><th>Closes</th><th>Status</th><th>Applicants</th><th/></tr></thead><tbody>
        {jobs.map(j=><tr key={j.id}><td><a href={'/jobs/'+j.id} target="_blank"><strong>{j.title}</strong></a><small>{typeTitle(j.jobType)}</small></td><td>{j.remote?'Remote':anyCity(j.city)?.name}</td><td>{day(j.validThrough)}</td><td><span className={'acc-pill p-'+(isJobOpen(j)?'open':'closed')}>{isJobOpen(j)?'Open':'Closed'}</span></td><td>{apps.filter(x=>x.jobId===j.id).length}</td>
          <td className="acc-actions"><Link href={'/account?tab=jobs&edit='+j.id}>Edit</Link><form method="post" action="/api/account/jobs"><input type="hidden" name="id" value={j.id}/><button name="_action" value={j.status==='open'?'close':'open'}>{j.status==='open'?'Close':'Reopen'}</button><button name="_action" value="delete" className="danger">Delete</button></form></td></tr>)}
      </tbody></table></div>}
    </section>
  </>;
}

export function AgencyApplicants({apps}:{apps:Application[]}){
  return <section className="acc-card"><h2>Applicants ({apps.length})</h2>
    <p className="acc-note">Only people who applied to your jobs are shown. Changing a status sends the applicant an email update.</p>
    {apps.length===0?<p>No applicants yet.</p>:<ul className="acc-applicants">{apps.map(x=><li key={x.id}>
      <div><strong>{x.name}</strong> <span className={'acc-pill p-'+x.status}>{x.status}</span><small>{x.jobTitle} · applied {day(x.createdAt)}</small><small><a href={'tel:'+x.phone}>{x.phone}</a> · <a href={wa(x.phone)} target="_blank" rel="noopener">WhatsApp</a>{x.email&&<> · <a href={'mailto:'+x.email}>{x.email}</a></>}</small><small>{x.city} · {x.role} · {x.experience}</small>{x.message&&<p>{x.message}</p>}</div>
      <div className="acc-app-side">{x.cvFile&&<a className="btn" href={'/api/account/cv/'+x.cvFile}>Download CV</a>}<form method="post" action="/api/account/applications"><input type="hidden" name="id" value={x.id}/><select name="status" defaultValue={x.status==='new'?'reviewed':x.status}><option value="reviewed">Reviewed</option><option value="shortlisted">Shortlisted</option><option value="rejected">Not selected</option></select><button className="btn">Update</button></form></div>
    </li>)}</ul>}
  </section>;
}
