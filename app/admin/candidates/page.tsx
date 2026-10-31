import Link from 'next/link';
import {requireAdmin} from '../../../lib/admin-guard';
import {listCandidates,getCandidate,listApplications,normPhone} from '../../../lib/store';
import {jobTypes} from '../../../lib/jobs';
import {PageHead,Flash,Pill,Empty,Contact,fmtDay,fmtDate} from '../../../components/admin-ui';

export const metadata={title:'Candidates'};
const STATUSES=['new','screening','available','placed','inactive'] as const;

export default async function Candidates({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  await requireAdmin();const q=await searchParams;
  const [all,apps]=await Promise.all([listCandidates(),listApplications()]);
  const c=q.view?await getCandidate(q.view):null;
  let rows=all;if(q.status)rows=rows.filter(x=>x.status===q.status);if(q.role)rows=rows.filter(x=>x.role===q.role);if(q.city){const t=q.city.toLowerCase();rows=rows.filter(x=>x.city.toLowerCase().includes(t));}if(q.q){const t=q.q.toLowerCase();rows=rows.filter(x=>[x.name,x.phone,x.email,x.city,x.role,x.notes].join(' ').toLowerCase().includes(t));}
  return <>
    <PageHead title="Candidates" sub="Your job-seeker database. Everyone who applies or submits a CV gets a profile here, matched by phone number."/>
    <Flash msg={q.msg} map={{saved:'Candidate saved.',deleted:'Candidate deleted.'}}/>
    {c&&<form className="adm-card adm-form" method="post" action="/api/admin/candidates"><input type="hidden" name="id" value={c.id}/>
      <header><h2>{c.name}</h2><Link href="/admin/candidates">Close</Link></header>
      <p><Contact phone={c.phone} email={c.email}/></p>
      <p className="adm-meta">{c.role||'—'} · {c.city||'—'} · {c.experience||'experience not given'} · first seen {fmtDay(c.createdAt)} · {c.applications} application{c.applications===1?'':'s'}</p>
      {c.cvFile&&<p><a className="adm-btn small" href={'/api/admin/cv/'+c.cvFile}>Download latest CV</a></p>}
      <div className="adm-grid">
        <label>Name<input name="name" defaultValue={c.name}/></label>
        <label>City<input name="city" defaultValue={c.city}/></label>
        <label>Kind of work<select name="role" defaultValue={c.role}><option value="">—</option>{jobTypes.map(j=><option key={j.slug}>{j.title}</option>)}</select></label>
        <label>Status<select name="status" defaultValue={c.status}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></label>
        <label className="span4">Private notes<textarea name="notes" rows={4} defaultValue={c.notes} placeholder="Interview feedback, references checked, salary expectation, availability…"/></label>
      </div>
      <h3 style={{marginTop:18}}>Applications</h3>
      <ul className="adm-feed">{apps.filter(a=>normPhone(a.phone)===normPhone(c.phone)).map(a=><li key={a.id}><div><strong>{a.jobTitle}</strong><small>{fmtDate(a.createdAt)}{a.message?' · '+a.message:''}</small></div><Pill s={a.status}/></li>)}</ul>
      <footer><button className="adm-btn primary" name="_action" value="save">Save candidate</button><button className="adm-btn danger" name="_action" value="delete" data-confirm="Delete this candidate profile? Their applications stay under Applications.">Delete profile</button></footer>
    </form>}
    <form className="adm-filters" action="/admin/candidates"><input name="q" defaultValue={q.q} placeholder="Search name, phone, notes…"/><select name="role" defaultValue={q.role||''}><option value="">All kinds of work</option>{jobTypes.map(j=><option key={j.slug}>{j.title}</option>)}</select><input name="city" defaultValue={q.city} placeholder="City"/><select name="status" defaultValue={q.status||''}><option value="">All statuses</option>{STATUSES.map(s=><option key={s}>{s}</option>)}</select><button className="adm-btn">Filter</button>{(q.q||q.role||q.city||q.status)&&<Link href="/admin/candidates">Clear</Link>}</form>
    <div className="adm-tabs">{['',...STATUSES].map(s=><Link key={s} className={(q.status||'')===s?'on':''} href={'/admin/candidates'+(s?'?status='+s:'')}>{s||'All'} <b>{s?all.filter(x=>x.status===s).length:all.length}</b></Link>)}</div>
    <section className="adm-card">
      {rows.length===0?<Empty title="No candidates" text={all.length?'Nothing matches this filter.':'Candidates appear here when job seekers apply or submit their CV.'}/>:
      <div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>Candidate</th><th>Contact</th><th>Work</th><th>City</th><th>Applied</th><th>CV</th><th>Status</th><th/></tr></thead><tbody>
        {rows.map(x=><tr key={x.id}><td><strong>{x.name}</strong>{x.notes&&<small className="adm-clip">{x.notes}</small>}</td><td><Contact phone={x.phone} email={x.email}/></td><td>{x.role||'—'}<small>{x.experience}</small></td><td>{x.city||'—'}</td><td>{x.applications}<small>{fmtDay(x.updatedAt)}</small></td><td>{x.cvFile?<a href={'/api/admin/cv/'+x.cvFile}>CV</a>:'—'}</td><td><Pill s={x.status}/></td><td className="adm-actions"><Link href={'/admin/candidates?view='+x.id}>Open</Link></td></tr>)}
      </tbody></table></div>}
    </section>
  </>;
}
