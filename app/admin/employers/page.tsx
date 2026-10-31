import Link from 'next/link';
import {Plus} from 'lucide-react';
import {requireAdmin} from '../../../lib/admin-guard';
import {listEmployers,getEmployer,listEnquiries,normPhone,type Employer} from '../../../lib/store';
import {allCities,anyCity} from '../../../lib/pakistan';
import {PageHead,Flash,Pill,Empty,Contact,fmtDay} from '../../../components/admin-ui';

export const metadata={title:'Employers'};
const STATUSES=['lead','active','inactive'] as const;

function EmployerForm({e}:{e:Employer|null}){
  return <form className="adm-card adm-form" method="post" action="/api/admin/employers">
    {e&&<input type="hidden" name="id" value={e.id}/>}
    <header><h2>{e?'Edit employer':'Add an employer'}</h2><Link href="/admin/employers">Cancel</Link></header>
    <div className="adm-grid">
      <label>Contact name<input name="name" required defaultValue={e?.name}/></label>
      <label>Company / household<input name="company" defaultValue={e?.company}/></label>
      <label>Phone<input name="phone" required defaultValue={e?.phone}/></label>
      <label>Email<input name="email" type="email" defaultValue={e?.email}/></label>
      <label>City<select name="city" defaultValue={e?.city||''}><option value="">—</option>{allCities.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
      <label>Type<select name="type" defaultValue={e?.type||'household'}><option value="household">Household</option><option value="business">Business</option></select></label>
      <label>Status<select name="status" defaultValue={e?.status||'lead'}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></label>
      <label className="span4">Notes<textarea name="notes" rows={4} defaultValue={e?.notes} placeholder="Requirements, agreed fees, placements made, follow-up dates…"/></label>
    </div>
    <footer><button className="adm-btn primary" name="_action" value="save">Save employer</button>{e&&<button className="adm-btn danger" name="_action" value="delete" data-confirm="Delete this employer?">Delete</button>}</footer>
  </form>;
}

export default async function Employers({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  await requireAdmin();const q=await searchParams;
  const [all,enqs]=await Promise.all([listEmployers(),listEnquiries()]);
  const editing=q.edit?await getEmployer(q.edit):null;
  let rows=all;if(q.status)rows=rows.filter(e=>e.status===q.status);if(q.type)rows=rows.filter(e=>e.type===q.type);if(q.q){const t=q.q.toLowerCase();rows=rows.filter(e=>[e.name,e.company,e.phone,e.email,e.city,e.notes].join(' ').toLowerCase().includes(t));}
  return <>
    <PageHead title="Employers" sub="Families and businesses you work with. Everyone who sends a staff request is added here automatically as a lead.">{!(q.new||editing)&&<Link className="adm-btn primary" href="/admin/employers?new=1"><Plus size={16}/> Add employer</Link>}</PageHead>
    <Flash msg={q.msg} map={{saved:'Employer saved.',deleted:'Employer deleted.',invalid:'Please enter a name and a valid phone number.'}}/>
    {(q.new||editing)&&<EmployerForm e={editing}/>}
    <form className="adm-filters" action="/admin/employers"><input name="q" defaultValue={q.q} placeholder="Search name, company, phone…"/><select name="status" defaultValue={q.status||''}><option value="">All statuses</option>{STATUSES.map(s=><option key={s}>{s}</option>)}</select><select name="type" defaultValue={q.type||''}><option value="">Households & businesses</option><option value="household">Households</option><option value="business">Businesses</option></select><button className="adm-btn">Filter</button>{(q.q||q.status||q.type)&&<Link href="/admin/employers">Clear</Link>}</form>
    <section className="adm-card"><header><h2>{rows.length} employer{rows.length===1?'':'s'}</h2></header>
      {rows.length===0?<Empty title="No employers yet" text="They are added automatically from staff requests, or you can add one yourself."/>:
      <div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>Employer</th><th>Contact</th><th>City</th><th>Type</th><th>Requests</th><th>Status</th><th>Updated</th><th/></tr></thead><tbody>
        {rows.map(e=><tr key={e.id}><td><strong>{e.name}</strong>{e.company&&<small>{e.company}</small>}{e.notes&&<small className="adm-clip">{e.notes}</small>}</td><td><Contact phone={e.phone} email={e.email}/></td><td>{anyCity(e.city)?.name||e.city||'—'}</td><td>{e.type}</td><td><Link href={'/admin/enquiries?q='+encodeURIComponent(e.phone)}>{enqs.filter(x=>normPhone(x.phone)===normPhone(e.phone)).length}</Link></td><td><Pill s={e.status}/></td><td>{fmtDay(e.updatedAt)}</td><td className="adm-actions"><Link href={'/admin/employers?edit='+e.id}>Edit</Link></td></tr>)}
      </tbody></table></div>}
    </section>
  </>;
}
