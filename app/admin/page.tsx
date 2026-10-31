import type {Metadata} from 'next';
import {isAdmin,adminConfigured} from '../../lib/auth';
import {listJobs,getJob,listApplications,listEnquiries,isJobOpen,type Job} from '../../lib/store';
import {jobTypes,jobType} from '../../lib/jobs';
import {allCities,anyCity} from '../../lib/pakistan';

export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Admin',robots:{index:false,follow:false}};

const MSG:Record<string,string>={created:'Job published.',updated:'Job updated.',close:'Job closed.',open:'Job reopened.',delete:'Job deleted.',invalid:'Please fill in title, job type, city, a description of at least 30 characters and a closing date.',notfound:'Job not found.'};
const fmt=(iso:string)=>new Date(iso).toLocaleString('en-PK',{dateStyle:'medium',timeStyle:'short'});
const cityName=(s:string)=>anyCity(s)?.name||s;

function Login({error}:{error?:string}){return <main className="admin-shell"><div className="admin-login"><img src="/brand/logo.webp" alt="estaff.pk" width={180} height={49}/><h1>Admin sign in</h1>{!adminConfigured()&&<p className="admin-error">Admin access is not configured on this server yet.</p>}{error&&<p className="admin-error">{error==='locked'?'Too many attempts. Please wait 15 minutes.':'Incorrect password.'}</p>}<form method="post" action="/api/admin/login"><label>Password<input type="password" name="password" required autoComplete="current-password"/></label><button className="btn" type="submit">Sign in</button></form></div></main>;}

function JobForm({job}:{job:Job|null}){
  const v=(k:keyof Job)=>job?(Array.isArray(job[k])?(job[k] as string[]).join('\n'):String(job[k]??'')):'';
  const in60=new Date(Date.now()+60*86400000).toISOString().slice(0,10);
  return <form className="admin-form" method="post" action="/api/admin/jobs">
    {job&&<input type="hidden" name="id" value={job.id}/>}
    <h2>{job?'Edit job':'Post a new job'}</h2>
    <div className="admin-grid">
      <label className="full">Job title<input name="title" required defaultValue={v('title')} placeholder="e.g. Live-in family cook"/></label>
      <label>Job type<select name="jobType" required defaultValue={v('jobType')}><option value="">Choose…</option>{jobTypes.map(j=><option key={j.slug} value={j.slug}>{j.title}</option>)}</select></label>
      <label>City<select name="city" required defaultValue={v('city')}><option value="">Choose…</option>{allCities.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
      <label>Area (optional)<input name="area" defaultValue={v('area')} placeholder="e.g. DHA Phase 5"/></label>
      <label>Employment type<select name="employmentType" defaultValue={v('employmentType')||'FULL_TIME'}><option value="FULL_TIME">Full-time</option><option value="PART_TIME">Part-time</option><option value="CONTRACTOR">Contract</option><option value="TEMPORARY">Temporary</option></select></label>
      <label>Salary from (PKR / month)<input name="salaryMin" inputMode="numeric" defaultValue={v('salaryMin')}/></label>
      <label>Salary to (PKR / month)<input name="salaryMax" inputMode="numeric" defaultValue={v('salaryMax')}/></label>
      <label>Employer name shown<input name="employer" defaultValue={v('employer')} placeholder="Leave empty to show “estaff.pk client”"/></label>
      <label>Closing date<input type="date" name="validThrough" required defaultValue={v('validThrough')||in60}/></label>
      <label className="check"><input type="checkbox" name="liveIn" defaultChecked={job?.liveIn}/> Live-in job</label>
      <label className="check"><input type="checkbox" name="remote" defaultChecked={job?.remote}/> Remote job</label>
      <label className="full">Description<textarea name="description" required rows={5} defaultValue={v('description')}/></label>
      <label>Duties (one per line)<textarea name="duties" rows={5} defaultValue={v('duties')}/></label>
      <label>Requirements (one per line)<textarea name="requirements" rows={5} defaultValue={v('requirements')}/></label>
      <label className="full">Benefits (one per line)<textarea name="benefits" rows={3} defaultValue={v('benefits')} placeholder="e.g. Accommodation and meals"/></label>
    </div>
    <div className="admin-actions"><button className="btn" type="submit">{job?'Save changes':'Publish job'}</button><a href="/admin?tab=jobs">Cancel</a></div>
  </form>;
}

export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  const q=await searchParams;
  if(!(await isAdmin()))return <Login error={q.error}/>;
  const tab=q.tab||'jobs';
  const [jobs,apps,enqs]=await Promise.all([listJobs({status:'all'}),listApplications(),listEnquiries()]);
  const editing=q.edit?await getJob(q.edit):null;
  const newApps=apps.filter(a=>a.status==='new').length,newEnq=enqs.filter(e=>e.status==='new').length;
  return <main className="admin-shell">
    <header className="admin-bar"><a href="/admin"><img src="/brand/logo.webp" alt="estaff.pk" width={150} height={41}/></a><nav>
      <a className={tab==='jobs'?'on':''} href="/admin?tab=jobs">Jobs ({jobs.filter(isJobOpen).length} open)</a>
      <a className={tab==='applications'?'on':''} href="/admin?tab=applications">Applications{newApps?` (${newApps} new)`:''}</a>
      <a className={tab==='enquiries'?'on':''} href="/admin?tab=enquiries">Enquiries{newEnq?` (${newEnq} new)`:''}</a>
    </nav><form method="post" action="/api/admin/logout"><button type="submit">Sign out</button></form></header>
    <section className="admin-body">
      {q.msg&&<p className={q.msg==='invalid'||q.msg==='notfound'?'admin-error':'admin-ok'}>{MSG[q.msg]||''}</p>}
      {tab==='jobs'&&<>{(q.new||editing)?<JobForm job={editing}/>:<p><a className="btn" href="/admin?tab=jobs&new=1">+ Post a new job</a></p>}
        <h2>All jobs</h2>{jobs.length===0?<p>No jobs yet. Post your first real vacancy above.</p>:<table className="admin-table"><thead><tr><th>Job</th><th>City</th><th>Posted</th><th>Closes</th><th>Status</th><th>Applications</th><th></th></tr></thead><tbody>{jobs.map(j=><tr key={j.id}><td><a href={'/jobs/'+j.id} target="_blank">{j.title}</a><small>{jobType(j.jobType)?.title}</small></td><td>{cityName(j.city)}{j.area?', '+j.area:''}</td><td>{j.datePosted}</td><td>{j.validThrough}</td><td>{isJobOpen(j)?'Open':'Closed'}</td><td>{apps.filter(a=>a.jobId===j.id).length}</td><td className="admin-row-actions"><a href={'/admin?tab=jobs&edit='+j.id}>Edit</a><form method="post" action="/api/admin/jobs"><input type="hidden" name="id" value={j.id}/><button name="_action" value={j.status==='open'?'close':'open'}>{j.status==='open'?'Close':'Reopen'}</button><button name="_action" value="delete" className="danger">Delete</button></form></td></tr>)}</tbody></table>}</>}
      {tab==='applications'&&<><h2>Applications</h2>{apps.length===0?<p>No applications yet.</p>:<table className="admin-table"><thead><tr><th>Received</th><th>Applicant</th><th>For</th><th>City / role</th><th>CV</th><th>Status</th><th></th></tr></thead><tbody>{apps.map(a=><tr key={a.id} className={a.status==='new'?'is-new':''}><td>{fmt(a.createdAt)}</td><td><strong>{a.name}</strong><small><a href={'tel:'+a.phone}>{a.phone}</a>{a.email&&<> · <a href={'mailto:'+a.email}>{a.email}</a></>}</small><small><a href={'https://wa.me/'+a.phone.replace(/[^0-9]/g,'').replace(/^0/,'92')} target="_blank" rel="noopener">WhatsApp</a></small></td><td>{a.jobId?<a href={'/jobs/'+a.jobId} target="_blank">{a.jobTitle}</a>:a.jobTitle}</td><td>{a.city} · {a.role}<small>{a.experience}{a.message&&<> · {a.message}</>}</small></td><td>{a.cvFile?<a href={'/api/admin/cv/'+a.cvFile}>Download</a>:'—'}</td><td><form method="post" action="/api/admin/records"><input type="hidden" name="kind" value="application"/><input type="hidden" name="id" value={a.id}/><select name="status" defaultValue={a.status}>{['new','reviewed','shortlisted','rejected'].map(s=><option key={s}>{s}</option>)}</select><button name="_action" value="status">Save</button></form></td><td><form method="post" action="/api/admin/records"><input type="hidden" name="kind" value="application"/><input type="hidden" name="id" value={a.id}/><button name="_action" value="delete" className="danger">Delete</button></form></td></tr>)}</tbody></table>}</>}
      {tab==='enquiries'&&<><h2>Staffing enquiries</h2>{enqs.length===0?<p>No enquiries yet.</p>:<table className="admin-table"><thead><tr><th>Received</th><th>Client</th><th>Needs</th><th>Location</th><th>Details</th><th>Status</th><th></th></tr></thead><tbody>{enqs.map(e=><tr key={e.id} className={e.status==='new'?'is-new':''}><td>{fmt(e.createdAt)}</td><td><strong>{e.name}</strong><small>{e.company}</small><small><a href={'tel:'+e.phone}>{e.phone}</a>{e.email&&<> · <a href={'mailto:'+e.email}>{e.email}</a></>}</small><small><a href={'https://wa.me/'+e.phone.replace(/[^0-9]/g,'').replace(/^0/,'92')} target="_blank" rel="noopener">WhatsApp</a></small></td><td>{e.role}<small>{e.schedule}{e.budget&&<> · PKR {e.budget}</>}{e.start&&<> · from {e.start}</>}</small></td><td>{cityName(e.city)}{e.area?', '+e.area:''}</td><td className="admin-details">{e.details}</td><td><form method="post" action="/api/admin/records"><input type="hidden" name="kind" value="enquiry"/><input type="hidden" name="id" value={e.id}/><select name="status" defaultValue={e.status}>{['new','contacted','closed'].map(s=><option key={s}>{s}</option>)}</select><button name="_action" value="status">Save</button></form></td><td><form method="post" action="/api/admin/records"><input type="hidden" name="kind" value="enquiry"/><input type="hidden" name="id" value={e.id}/><button name="_action" value="delete" className="danger">Delete</button></form></td></tr>)}</tbody></table>}</>}
    </section>
  </main>;
}
