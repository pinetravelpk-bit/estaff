import Link from 'next/link';
import {requireAdmin} from '../../../lib/admin-guard';
import {listApplications,listJobs} from '../../../lib/store';
import {PageHead,Flash,Pill,Empty,Back,Contact,fmtDate} from '../../../components/admin-ui';

export const metadata={title:'Applications'};
const STATUSES=['new','reviewed','shortlisted','rejected'] as const;

export default async function Applications({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  await requireAdmin();const q=await searchParams;
  const [all,jobs]=await Promise.all([listApplications(),listJobs({status:'all'})]);
  let rows=all;if(q.status)rows=rows.filter(a=>a.status===q.status);if(q.job)rows=rows.filter(a=>a.jobId===q.job);if(q.q){const t=q.q.toLowerCase();rows=rows.filter(a=>[a.name,a.phone,a.email,a.city,a.role,a.jobTitle].join(' ').toLowerCase().includes(t));}
  const here='/admin/applications'+(q.status||q.job||q.q?'?'+new URLSearchParams(Object.entries(q).filter(([k,v])=>v&&k!=='msg') as [string,string][]):'');
  return <>
    <PageHead title="Applications" sub="Everyone who applied for a job or submitted a CV. Each applicant also appears under Candidates."/>
    <Flash msg={q.msg} map={{saved:'Saved.',deleted:'Application deleted.'}}/>
    <form className="adm-filters" action="/admin/applications">
      <input name="q" defaultValue={q.q} placeholder="Search name, phone, city, role…"/>
      <select name="status" defaultValue={q.status||''}><option value="">All statuses</option>{STATUSES.map(s=><option key={s}>{s}</option>)}</select>
      <select name="job" defaultValue={q.job||''}><option value="">All jobs & CVs</option>{jobs.map(j=><option key={j.id} value={j.id}>{j.title}</option>)}</select>
      <button className="adm-btn">Filter</button>{(q.q||q.status||q.job)&&<Link href="/admin/applications">Clear</Link>}
    </form>
    <div className="adm-tabs">{['',...STATUSES].map(s=><Link key={s} className={(q.status||'')===s?'on':''} href={'/admin/applications'+(s?'?status='+s:'')}>{s||'All'} <b>{s?all.filter(a=>a.status===s).length:all.length}</b></Link>)}</div>
    {rows.length===0?<Empty title="No applications" text={all.length?'Nothing matches this filter.':'Applications appear here when job seekers apply or submit their CV.'}/>:
    <div className="adm-list">{rows.map(a=><article key={a.id} className={'adm-item'+(a.status==='new'?' is-new':'')}>
      <div className="adm-item-main">
        <h3>{a.name} <Pill s={a.status}/></h3>
        <p><Contact phone={a.phone} email={a.email}/></p>
        <p className="adm-meta">{a.jobId?<a href={'/jobs/'+a.jobId} target="_blank">{a.jobTitle}</a>:a.jobTitle} · {a.city||'—'} · {a.role||'—'} · {a.experience||'experience not given'} · {fmtDate(a.createdAt)}</p>
        {a.message&&<p className="adm-quote">{a.message}</p>}
        {a.cvFile?<a className="adm-btn small" href={'/api/admin/cv/'+a.cvFile}>Download CV{a.cvName?` (${a.cvName})`:''}</a>:<span className="adm-muted">No CV attached</span>}
      </div>
      <form className="adm-item-side" method="post" action="/api/admin/records"><Back path={here}/><input type="hidden" name="kind" value="application"/><input type="hidden" name="id" value={a.id}/>
        <label>Status<select name="status" defaultValue={a.status}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></label>
        <label>Private notes<textarea name="notes" rows={3} defaultValue={a.notes||''} placeholder="Interview date, feedback…"/></label>
        <div className="adm-row"><button className="adm-btn primary" name="_action" value="save">Save</button><button className="adm-btn danger" name="_action" value="delete" data-confirm="Delete this application and its CV?">Delete</button></div>
      </form>
    </article>)}</div>}
  </>;
}
