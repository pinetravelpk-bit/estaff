import Link from 'next/link';
import {requireAdmin} from '../../../lib/admin-guard';
import {listEnquiries,listEmployers,normPhone} from '../../../lib/store';
import {anyCity} from '../../../lib/pakistan';
import {PageHead,Flash,Pill,Empty,Back,Contact,fmtDate} from '../../../components/admin-ui';

export const metadata={title:'Staff requests'};
const STATUSES=['new','contacted','closed'] as const;

export default async function Enquiries({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  await requireAdmin();const q=await searchParams;
  const [all,emps]=await Promise.all([listEnquiries(),listEmployers()]);
  let rows=all;if(q.status)rows=rows.filter(e=>e.status===q.status);if(q.q){const t=q.q.toLowerCase();rows=rows.filter(e=>[e.name,e.company,e.phone,e.email,e.city,e.area,e.role,e.details].join(' ').toLowerCase().includes(t));}
  const here='/admin/enquiries'+(q.status||q.q?'?'+new URLSearchParams(Object.entries(q).filter(([k,v])=>v&&k!=='msg') as [string,string][]):'');
  const empOf=(phone:string)=>emps.find(e=>normPhone(e.phone)===normPhone(phone));
  return <>
    <PageHead title="Staff requests" sub="Requirements sent by families and businesses through the “Request Staff” form. Each sender is added to Employers."/>
    <Flash msg={q.msg} map={{saved:'Saved.',deleted:'Request deleted.'}}/>
    <form className="adm-filters" action="/admin/enquiries"><input name="q" defaultValue={q.q} placeholder="Search name, phone, city, service…"/><select name="status" defaultValue={q.status||''}><option value="">All statuses</option>{STATUSES.map(s=><option key={s}>{s}</option>)}</select><button className="adm-btn">Filter</button>{(q.q||q.status)&&<Link href="/admin/enquiries">Clear</Link>}</form>
    <div className="adm-tabs">{['',...STATUSES].map(s=><Link key={s} className={(q.status||'')===s?'on':''} href={'/admin/enquiries'+(s?'?status='+s:'')}>{s||'All'} <b>{s?all.filter(e=>e.status===s).length:all.length}</b></Link>)}</div>
    {rows.length===0?<Empty title="No staff requests" text={all.length?'Nothing matches this filter.':'Requests appear here when someone uses the Request Staff form.'}/>:
    <div className="adm-list">{rows.map(e=>{const emp=empOf(e.phone);return <article key={e.id} className={'adm-item'+(e.status==='new'?' is-new':'')}>
      <div className="adm-item-main">
        <h3>{e.name}{e.company&&<span className="adm-sub"> · {e.company}</span>} <Pill s={e.status}/></h3>
        <p><Contact phone={e.phone} email={e.email}/></p>
        <p className="adm-meta"><strong>{e.role}</strong> · {anyCity(e.city)?.name||e.city}{e.area?', '+e.area:''} · {e.schedule}{e.budget?` · PKR ${Number(e.budget).toLocaleString('en-PK')}/month`:''}{e.start?` · from ${e.start}`:''} · {fmtDate(e.createdAt)}</p>
        <p className="adm-quote">{e.details}</p>
        {emp&&<Link className="adm-btn small" href={'/admin/employers?edit='+emp.id}>Employer profile</Link>}
      </div>
      <form className="adm-item-side" method="post" action="/api/admin/records"><Back path={here}/><input type="hidden" name="kind" value="enquiry"/><input type="hidden" name="id" value={e.id}/>
        <label>Status<select name="status" defaultValue={e.status}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></label>
        <label>Private notes<textarea name="notes" rows={3} defaultValue={e.notes||''} placeholder="Call notes, candidates sent, fee agreed…"/></label>
        <div className="adm-row"><button className="adm-btn primary" name="_action" value="save">Save</button><button className="adm-btn danger" name="_action" value="delete" data-confirm="Delete this request?">Delete</button></div>
      </form>
    </article>;})}</div>}
  </>;
}
