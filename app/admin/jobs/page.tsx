import Link from 'next/link';
import {Plus} from 'lucide-react';
import {requireAdmin} from '../../../lib/admin-guard';
import {listJobs,getJob,listApplications,isJobOpen,type Job} from '../../../lib/store';
import {jobTypes,jobType} from '../../../lib/jobs';
import {allCities,anyCity} from '../../../lib/pakistan';
import {poolRoles,listPoolJobs,isPoolId} from '../../../lib/pool';
import {getSettings} from '../../../lib/settings';
import {PageHead,Flash,Pill,Empty,fmtDay} from '../../../components/admin-ui';

export const metadata={title:'Jobs'};
const MSG={pool:'Ongoing recruitment settings saved.',created:'Job published. It is now live on the website.',updated:'Job updated.',close:'Job closed. It no longer accepts applications.',open:'Job reopened.',delete:'Job deleted.',invalid:'Please fill in the title, job type, city, a description of at least 30 characters and a closing date.',notfound:'Job not found.'};

function JobForm({job}:{job:Job|null}){
  const v=(k:keyof Job)=>job?(Array.isArray(job[k])?(job[k] as string[]).join('\n'):String(job[k]??'')):'';
  const in60=new Date(Date.now()+60*86400000).toISOString().slice(0,10);
  return <form className="adm-card adm-form" method="post" action="/api/admin/jobs">
    {job&&<input type="hidden" name="id" value={job.id}/>}
    <header><h2>{job?'Edit job':'Post a new job'}</h2><Link href="/admin/jobs">Cancel</Link></header>
    <div className="adm-grid">
      <label className="span2">Job title<input name="title" required defaultValue={v('title')} placeholder="e.g. Live-in family cook"/></label>
      <label>Job type<select name="jobType" required defaultValue={v('jobType')}><option value="">Choose…</option>{jobTypes.map(j=><option key={j.slug} value={j.slug}>{j.title}</option>)}</select></label>
      <label>City<select name="city" required defaultValue={v('city')}><option value="">Choose…</option>{allCities.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
      <label>Area<input name="area" defaultValue={v('area')} placeholder="e.g. DHA Phase 5"/></label>
      <label>Employment type<select name="employmentType" defaultValue={v('employmentType')||'FULL_TIME'}><option value="FULL_TIME">Full-time</option><option value="PART_TIME">Part-time</option><option value="CONTRACTOR">Contract</option><option value="TEMPORARY">Temporary</option></select></label>
      <label>Salary from (PKR/month)<input name="salaryMin" inputMode="numeric" defaultValue={v('salaryMin')}/></label>
      <label>Salary to (PKR/month)<input name="salaryMax" inputMode="numeric" defaultValue={v('salaryMax')}/></label>
      <label>Employer name shown<input name="employer" defaultValue={v('employer')} placeholder="Empty = “estaff.pk client”"/></label>
      <label>Closing date<input type="date" name="validThrough" required defaultValue={v('validThrough')||in60}/></label>
      <label className="adm-check"><input type="checkbox" name="liveIn" defaultChecked={job?.liveIn}/> Live-in job</label>
      <label className="adm-check"><input type="checkbox" name="remote" defaultChecked={job?.remote}/> Remote job</label>
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
  const editing=q.edit?await getJob(q.edit):null;const showForm=Boolean(q.new||editing);
  return <>
    <PageHead title="Jobs" sub="Post real vacancies. Each job gets its own page, appears on its city and job-type pages and can show in Google Jobs.">{!showForm&&<Link className="adm-btn primary" href="/admin/jobs?new=1"><Plus size={16}/> Post a job</Link>}</PageHead>
    <Flash msg={q.msg} map={MSG}/>
    {showForm&&<JobForm job={editing}/>}
    <section className="adm-card"><header><h2>All jobs ({jobs.length})</h2></header>
      {jobs.length===0?<Empty title="No jobs yet" text="Post your first real vacancy and it goes live straight away."><Link className="adm-btn primary" href="/admin/jobs?new=1">Post a job</Link></Empty>:
      <div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>Job</th><th>Location</th><th>Posted</th><th>Closes</th><th>Status</th><th>Applicants</th><th/></tr></thead><tbody>
        {jobs.map(j=><tr key={j.id}><td><a href={'/jobs/'+j.id} target="_blank"><strong>{j.title}</strong></a><small>{jobType(j.jobType)?.title}</small></td><td>{j.remote?'Remote':anyCity(j.city)?.name}{j.area?<small>{j.area}</small>:null}</td><td>{fmtDay(j.datePosted)}</td><td>{fmtDay(j.validThrough)}</td><td><Pill s={isJobOpen(j)?'open':'closed'}/></td><td><Link href={'/admin/applications?job='+j.id}>{apps.filter(a=>a.jobId===j.id).length}</Link></td>
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
    <p className="adm-muted">One listing per role in every city, so job seekers can apply any day and you can send their profiles to clients. They are clearly labelled “ongoing recruitment”, kept out of Google search results and Google Jobs (which do not allow talent-pool listings), and do not trigger job alert emails. Post a normal job above whenever a client gives you a specific vacancy.</p>
    <label className="adm-check"><input type="checkbox" name="enabled" defaultChecked={s.enabled}/> Show ongoing recruitment listings on the website</label>
    {groups.map(([g,label])=><fieldset key={g} className="adm-fieldset"><legend>{label}</legend><div className="adm-checks">{poolRoles.filter(r=>r.sector===g).map(r=><label key={r.slug} className="adm-check"><input type="checkbox" name="show" value={r.slug} defaultChecked={!s.hiddenRoles.includes(r.slug)}/> {r.title}</label>)}</div></fieldset>)}
    <label>Hide these cities (hold Ctrl to choose several)<select name="hideCity" multiple size={8} defaultValue={s.hiddenCities}>{allCities.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
    <footer><button className="adm-btn primary">Save</button></footer>
  </form>;
}
