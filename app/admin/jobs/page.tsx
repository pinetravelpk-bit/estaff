import Link from 'next/link';
import {Plus} from 'lucide-react';
import {requireAdmin} from '../../../lib/admin-guard';
import {listJobs,getJob,listApplications,listEnquiries,isJobOpen,type Job} from '../../../lib/store';
import {jobTypes,jobType} from '../../../lib/jobs';
import {allCities,anyCity} from '../../../lib/pakistan';
import {poolRoles,listPoolJobs,isPoolId,allTypeOptions,typeTitle} from '../../../lib/pool';
import {getSettings} from '../../../lib/settings';
import {PageHead,Flash,Pill,Empty,fmtDay} from '../../../components/admin-ui';

export const metadata={title:'Jobs'};
const MSG={pool:'Ongoing recruitment settings saved.',created:'Job published. It is now live on the website.',updated:'Job updated.',close:'Job closed. It no longer accepts applications.',open:'Job reopened.',delete:'Job deleted.',invalid:'Please fill in the title, job type, city, a description of at least 30 characters and a closing date.',notfound:'Job not found.'};

// Turns a staff request into a job draft: best-guess job type, city, area, hours, budget and brief.
async function draftFromEnquiry(id:string):Promise<Partial<Job>|null>{
  const e=(await listEnquiries()).find(x=>x.id===id);if(!e)return null;
  const text=(e.role+' '+e.details).toLowerCase();
  const opt=allTypeOptions().map(o=>({...o,words:o.label.toLowerCase().split(/[^a-z]+/).filter(w=>w.length>3)})).find(o=>o.words.some(w=>text.includes(w)));
  const c=anyCity(e.city)||allCities.find(x=>x.name.toLowerCase()===e.city.toLowerCase());
  const label=opt?.label||e.role;const place=e.area||c?.name||e.city;const budget=parseInt(String(e.budget).replace(/[^0-9]/g,''),10);
  return {title:`${label} needed in ${place}`,jobType:opt?.value||'',city:c?.slug||'',area:e.area,employmentType:/part/i.test(e.schedule)?'PART_TIME':'FULL_TIME',liveIn:/live-?in/i.test(e.schedule+' '+e.details),salaryMax:Number.isFinite(budget)&&budget>0?budget:null,
    description:`A ${e.company?'business':'family'} in ${place}${c&&e.area?', '+c.name:''} needs ${/^[aeiou]/i.test(label)?'an':'a'} ${label.toLowerCase()}. Working pattern: ${e.schedule||'to be agreed'}.${e.start?' Start: '+e.start+'.':''}\n\n${e.details}`};
}

function JobForm({job,draft}:{job:Job|null;draft?:Partial<Job>|null}){
  const src=(job||draft||null) as Partial<Job>|null;
  const v=(k:keyof Job)=>src&&src[k]!=null?(Array.isArray(src[k])?(src[k] as string[]).join('\n'):String(src[k])):'';
  const in60=new Date(Date.now()+60*86400000).toISOString().slice(0,10);
  return <form className="adm-card adm-form" method="post" action="/api/admin/jobs">
    {job&&<input type="hidden" name="id" value={job.id}/>}
    <header><h2>{job?'Edit job':draft?'Post a job from a staff request':'Post a new job'}</h2><Link href="/admin/jobs">Cancel</Link></header>
    {draft&&<p className="adm-flash">Filled in from the staff request. Check the title, salary and description, and remove private details (client name, phone number, exact address) before publishing. Real vacancies like this one go to Google Jobs.</p>}
    <div className="adm-grid">
      <label className="span2">Job title<input name="title" required defaultValue={v('title')} placeholder="e.g. Live-in family cook"/></label>
      <label>Job type<select name="jobType" required defaultValue={v('jobType')}><option value="">Choose…</option>{allTypeOptions().map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select></label>
      <label>City<select name="city" required defaultValue={v('city')}><option value="">Choose…</option>{allCities.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
      <label>Area<input name="area" defaultValue={v('area')} placeholder="e.g. DHA Phase 5"/></label>
      <label>Employment type<select name="employmentType" defaultValue={v('employmentType')||'FULL_TIME'}><option value="FULL_TIME">Full-time</option><option value="PART_TIME">Part-time</option><option value="CONTRACTOR">Contract</option><option value="TEMPORARY">Temporary</option></select></label>
      <label>Salary from (PKR/month)<input name="salaryMin" inputMode="numeric" defaultValue={v('salaryMin')}/></label>
      <label>Salary to (PKR/month)<input name="salaryMax" inputMode="numeric" defaultValue={v('salaryMax')}/></label>
      <label>Employer name shown<input name="employer" defaultValue={v('employer')} placeholder="Empty = “estaff.pk client”"/></label>
      <label>Closing date<input type="date" name="validThrough" required defaultValue={v('validThrough')||in60}/></label>
      <label className="adm-check"><input type="checkbox" name="liveIn" defaultChecked={src?.liveIn}/> Live-in job</label>
      <label className="adm-check"><input type="checkbox" name="remote" defaultChecked={src?.remote}/> Remote job</label>
      <label className="span4">Description<textarea name="description" required rows={5} defaultValue={v('description')} placeholder="Who the employer is (no private details), what the job is, working hours, location."/></label>
      <label className="span2">Duties (one per line)<textarea name="duties" rows={5} defaultValue={v('duties')}/></label>
      <label className="span2">Requirements (one per line)<textarea name="requirements" rows={5} defaultValue={v('requirements')}/></label>
      <label className="span4">Benefits (one per line)<textarea name="benefits" rows={3} defaultValue={v('benefits')} placeholder="e.g. Accommodation and meals"/></label>
    </div>
    <footer><button className="adm-btn primary" type="submit">{job?'Save changes':'Publish job'}</button></footer>
  </form>;
}

export default async function JobsAdmin({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  await requireAdmin();const q=await searchParams;
  const [jobs,apps]=await Promise.all([listJobs({status:'all'}),listApplications()]);
  const editing=q.edit?await getJob(q.edit):null;const draft=!editing&&q.from?await draftFromEnquiry(q.from):null;const showForm=Boolean(q.new||editing||draft);
  return <>
    <PageHead title="Jobs" sub="Post real vacancies. Each job gets its own page, appears on its city and job-type pages and can show in Google Jobs.">{!showForm&&<Link className="adm-btn primary" href="/admin/jobs?new=1"><Plus size={16}/> Post a job</Link>}</PageHead>
    <Flash msg={q.msg} map={MSG}/>
    {showForm&&<JobForm job={editing} draft={draft}/>}
    <section className="adm-card"><header><h2>All jobs ({jobs.length})</h2></header>
      {jobs.length===0?<Empty title="No jobs yet" text="Post your first real vacancy and it goes live straight away."><Link className="adm-btn primary" href="/admin/jobs?new=1">Post a job</Link></Empty>:
      <div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>Job</th><th>Location</th><th>Posted</th><th>Closes</th><th>Status</th><th>Applicants</th><th/></tr></thead><tbody>
        {jobs.map(j=><tr key={j.id}><td><a href={'/jobs/'+j.id} target="_blank"><strong>{j.title}</strong></a><small>{typeTitle(j.jobType)}</small></td><td>{j.remote?'Remote':anyCity(j.city)?.name}{j.area?<small>{j.area}</small>:null}</td><td>{fmtDay(j.datePosted)}</td><td>{fmtDay(j.validThrough)}</td><td><Pill s={isJobOpen(j)?'open':'closed'}/></td><td><Link href={'/admin/applications?job='+j.id}>{apps.filter(a=>a.jobId===j.id).length}</Link></td>
          <td className="adm-actions"><Link href={'/admin/jobs?edit='+j.id}>Edit</Link><form method="post" action="/api/admin/jobs"><input type="hidden" name="id" value={j.id}/><button name="_action" value={j.status==='open'?'close':'open'}>{j.status==='open'?'Close':'Reopen'}</button><button name="_action" value="delete" className="danger" data-confirm="Delete this job permanently?">Delete</button></form></td></tr>)}
      </tbody></table></div>}
    </section>
    <PoolSettings apps={apps.filter(a=>a.jobId&&isPoolId(a.jobId)).length}/>
  </>;
}

function PoolSettings({apps}:{apps:number}){
  const s=getSettings().pool;const count=listPoolJobs().length;
  const groups=[['home','Home & Care'],['business','Business Solutions'],['remote','Remote (one listing for all of Pakistan)']] as const;
  return <form className="adm-card adm-form" method="post" action="/api/admin/settings" id="ongoing"><input type="hidden" name="_form" value="pool"/>
    <header><h2>Ongoing recruitment ({count.toLocaleString('en-PK')} listings live)</h2><Link href="/admin/applications?job=pool">{apps} applicants</Link></header>
    <p className="adm-muted">One listing per role in every city, so job seekers can apply any day and you can send their profiles to clients. They are clearly labelled “ongoing recruitment”. Listings in the cities chosen below appear in Google search; none of them go to Google Jobs (which does not allow talent-pool listings), and they do not trigger job alert emails. Post a normal job above whenever a client gives you a specific vacancy.</p>
    <label className="adm-check"><input type="checkbox" name="enabled" defaultChecked={s.enabled}/> Show ongoing recruitment listings on the website</label>
    {groups.map(([g,label])=><fieldset key={g} className="adm-fieldset"><legend>{label}</legend><div className="adm-checks">{poolRoles.filter(r=>r.sector===g).map(r=><label key={r.slug} className="adm-check"><input type="checkbox" name="show" value={r.slug} defaultChecked={!s.hiddenRoles.includes(r.slug)}/> {r.title}</label>)}</div></fieldset>)}
    <label>Show in Google search for these cities (hold Ctrl to choose several). Listings in other cities stay on the website but out of Google search; remote listings are always shown. None of them go to Google Jobs.<select name="indexCity" multiple size={8} defaultValue={s.indexCities}>{allCities.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
    <label>Hide these cities (hold Ctrl to choose several)<select name="hideCity" multiple size={8} defaultValue={s.hiddenCities}>{allCities.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
    <footer><button className="adm-btn primary">Save</button></footer>
  </form>;
}
