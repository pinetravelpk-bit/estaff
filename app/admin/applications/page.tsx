import Link from 'next/link';
import {requireAdmin} from '../../../lib/admin-guard';
import {listApplications,listJobs,listEmployers} from '../../../lib/store';
import {isPoolId} from '../../../lib/pool';
import {whatsappText} from '../../../lib/candidate-share';
import {mailConfigured} from '../../../lib/mail';
import {PageHead,Flash,Pill,Empty,Back,Contact,fmtDate} from '../../../components/admin-ui';

export const metadata={title:'Applications'};
const STATUSES=['new','reviewed','shortlisted','rejected'] as const;
const MSG={saved:'Saved.',deleted:'Application deleted.',shared:'Profile sent to the client.',bademail:'Please enter a valid client email address.',noconsent:'This person applied before the sharing permission was added. Confirm with them first, then tick the confirmation box.',nomail:'Email is not connected yet, so nothing was sent. Use “Copy for WhatsApp” instead, or connect a mailbox under Email.',sendfail:'The email could not be sent. Check Admin → Email.',notfound:'Application not found.'};

export default async function Applications({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  await requireAdmin();const q=await searchParams;
  const [all,jobs,emps]=await Promise.all([listApplications(),listJobs({status:'all'}),listEmployers()]);
  let rows=all;
  if(q.status)rows=rows.filter(a=>a.status===q.status);
  if(q.job==='pool')rows=rows.filter(a=>a.jobId&&isPoolId(a.jobId));else if(q.job==='cv')rows=rows.filter(a=>!a.jobId);else if(q.job)rows=rows.filter(a=>a.jobId===q.job);
  if(q.city)rows=rows.filter(a=>a.city===q.city);
  if(q.role)rows=rows.filter(a=>a.role===q.role);
  if(q.q){const t=q.q.toLowerCase();rows=rows.filter(a=>[a.name,a.phone,a.email,a.city,a.role,a.jobTitle,a.message].join(' ').toLowerCase().includes(t));}
  const cities=[...new Set(all.map(a=>a.city).filter(Boolean))].sort();const roles=[...new Set(all.map(a=>a.role).filter(Boolean))].sort();
  const here='/admin/applications'+(Object.keys(q).some(k=>k!=='msg'&&q[k])?'?'+new URLSearchParams(Object.entries(q).filter(([k,v])=>v&&k!=='msg') as [string,string][]):'');
  const clients=emps.filter(e=>e.email);const mail=mailConfigured();
  return <>
    <PageHead title="Applications" sub="Everyone who applied for a job, an ongoing recruitment listing or submitted a CV. Filter by city and kind of work to find candidates for a client, then send their profile."/>
    <Flash msg={q.msg} map={MSG}/>
    <form className="adm-filters" action="/admin/applications">
      <input name="q" defaultValue={q.q} placeholder="Search name, phone, skills…"/>
      <select name="city" defaultValue={q.city||''}><option value="">All cities</option>{cities.map(c=><option key={c}>{c}</option>)}</select>
      <select name="role" defaultValue={q.role||''}><option value="">All kinds of work</option>{roles.map(r=><option key={r}>{r}</option>)}</select>
      <select name="status" defaultValue={q.status||''}><option value="">All statuses</option>{STATUSES.map(s=><option key={s}>{s}</option>)}</select>
      <select name="job" defaultValue={q.job||''}><option value="">All jobs & CVs</option><option value="pool">Ongoing recruitment</option><option value="cv">CV registrations</option>{jobs.map(j=><option key={j.id} value={j.id}>{j.title}</option>)}</select>
      <button className="adm-btn">Filter</button>{Object.keys(q).some(k=>k!=='msg'&&q[k])&&<Link href="/admin/applications">Clear</Link>}
    </form>
    <div className="adm-tabs">{['',...STATUSES].map(s=><Link key={s} className={(q.status||'')===s?'on':''} href={'/admin/applications'+(s?'?status='+s:'')}>{s||'All'} <b>{s?all.filter(a=>a.status===s).length:all.length}</b></Link>)}</div>
    <datalist id="client-emails">{clients.map(e=><option key={e.id} value={e.email}>{e.company||e.name}</option>)}</datalist>
    {rows.length===0?<Empty title="No applications" text={all.length?'Nothing matches this filter.':'Applications appear here when job seekers apply or submit their CV.'}/>:
    <><p className="adm-muted">{rows.length} {rows.length===1?'applicant':'applicants'}</p>
    <div className="adm-list">{rows.map(a=><article key={a.id} className={'adm-item'+(a.status==='new'?' is-new':'')}>
      <div className="adm-item-main">
        <h3>{a.name} <Pill s={a.status}/>{a.shareConsent?<span className="adm-pill p-active" title="Agreed on the form that their profile may be shared with employers">can share</span>:<span className="adm-pill p-pending" title="Applied before the sharing permission existed">ask before sharing</span>}</h3>
        <p><Contact phone={a.phone} email={a.email}/></p>
        <p className="adm-meta">{a.jobId?<a href={'/jobs/'+a.jobId} target="_blank">{a.jobTitle}</a>:a.jobTitle} · {a.city||'—'} · {a.role||'—'} · {a.experience||'experience not given'} · {fmtDate(a.createdAt)}</p>
        {a.message&&<p className="adm-quote">{a.message}</p>}
        <div className="adm-row">{a.cvFile?<a className="adm-btn small" href={'/api/admin/cv/'+a.cvFile}>Download CV{a.cvName?` (${a.cvName})`:''}</a>:<span className="adm-muted">No CV attached</span>}
          <button type="button" className="adm-btn small" data-copy={whatsappText(a,false)}>Copy for WhatsApp</button>
          <button type="button" className="adm-btn small" data-copy={whatsappText(a,true)}>Copy with phone</button></div>
        {(a.shares||[]).length>0&&<p className="adm-meta">Sent to: {a.shares!.map(s=>`${s.client||s.to} (${fmtDate(s.at)}${s.cv?', CV':''}${s.phone?', phone':''})`).join(' · ')}</p>}
        <details className="adm-share"><summary>Send profile to a client</summary>
          <form method="post" action="/api/admin/share"><Back path={here}/><input type="hidden" name="id" value={a.id}/>
            {!mail&&<p className="adm-muted">Email is not connected yet. Use “Copy for WhatsApp” above, or connect a mailbox under Email.</p>}
            <label>Client email<input name="to" type="email" list="client-emails" required placeholder="client@example.com"/></label>
            <label>Client name<input name="client" placeholder="e.g. Mr Ahmed / ABC Foods"/></label>
            <label>Message<textarea name="note" rows={2} placeholder="Optional note to the client"/></label>
            <label className="adm-check"><input type="checkbox" name="cv" value="yes" defaultChecked={Boolean(a.cvFile)} disabled={!a.cvFile}/> Attach CV</label>
            <label className="adm-check"><input type="checkbox" name="phone" value="yes"/> Include the candidate’s phone and email</label>
            {!a.shareConsent&&<label className="adm-check"><input type="checkbox" name="confirmed" value="yes"/> I confirmed with the candidate that we may share their profile</label>}
            <button className="adm-btn primary" disabled={!mail}>Send to client</button>
          </form>
        </details>
      </div>
      <form className="adm-item-side" method="post" action="/api/admin/records"><Back path={here}/><input type="hidden" name="kind" value="application"/><input type="hidden" name="id" value={a.id}/>
        <label>Status<select name="status" defaultValue={a.status}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></label>
        <label>Private notes<textarea name="notes" rows={3} defaultValue={a.notes||''} placeholder="Interview date, feedback…"/></label>
        <div className="adm-row"><button className="adm-btn primary" name="_action" value="save">Save</button><button className="adm-btn danger" name="_action" value="delete" data-confirm="Delete this application and its CV?">Delete</button></div>
      </form>
    </article>)}</div></>}
  </>;
}
