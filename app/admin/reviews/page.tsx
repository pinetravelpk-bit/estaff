import Link from 'next/link';
import {requireAdmin} from '../../../lib/admin-guard';
import {listReviews,KIND_LABEL} from '../../../lib/reviews';
import {listAgencies} from '../../../lib/users';
import {PageHead,Flash,Pill,Empty,Back,fmtDate} from '../../../components/admin-ui';

export const metadata={title:'Reviews'};
const STATUSES=['pending','approved','rejected'] as const;

export default async function ReviewsAdmin({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  await requireAdmin();const q=await searchParams;
  const [all,agencies]=await Promise.all([listReviews(),listAgencies()]);
  const agName=new Map(agencies.map(a=>[a.userId,a]));
  const status=(STATUSES as readonly string[]).includes(q.status||'')?q.status!:'pending';
  let rows=all.filter(r=>r.status===status);if(q.target==='estaff')rows=rows.filter(r=>r.target==='estaff');if(q.target==='agency')rows=rows.filter(r=>r.target==='agency');
  const here='/admin/reviews?'+new URLSearchParams({status,...(q.target?{target:q.target}:{})});
  const approved=all.filter(r=>r.status==='approved'&&r.target==='estaff');const avg=approved.length?(approved.reduce((s,r)=>s+r.rating,0)/approved.length).toFixed(1):'–';
  return <>
    <PageHead title="Reviews" sub={`Approve reviews before they appear on the website. estaff.pk average: ${avg} from ${approved.length} published reviews.`}><a className="adm-btn" href="/reviews" target="_blank">View reviews page</a></PageHead>
    <Flash msg={q.msg} map={{saved:'Saved.',deleted:'Review deleted.'}}/>
    <div className="adm-tabs">{STATUSES.map(s=><Link key={s} className={status===s?'on':''} href={'/admin/reviews?status='+s}>{s} <b>{all.filter(r=>r.status===s).length}</b></Link>)}</div>
    <form className="adm-filters" action="/admin/reviews"><input type="hidden" name="status" value={status}/><select name="target" defaultValue={q.target||''}><option value="">estaff.pk and agencies</option><option value="estaff">estaff.pk only</option><option value="agency">Agencies only</option></select><button className="adm-btn">Filter</button></form>
    <p className="adm-muted">Publish honest reviews whether they are positive or negative. Reject only spam, abuse, personal details, or reviews that are clearly not about a real experience. Never edit what the reviewer wrote; reply instead.</p>
    {rows.length===0?<Empty title={`No ${status} reviews`} text={status==='pending'?'New reviews appear here for approval.':'Nothing here yet.'}/>:
    <div className="adm-list">{rows.map(r=>{const ag=r.target==='agency'?agName.get(r.agencyId):null;return <article key={r.id} className={'adm-item'+(r.status==='pending'?' is-new':'')}>
      <div className="adm-item-main">
        <h3>{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)} {r.title||'(no headline)'} <Pill s={r.status}/></h3>
        <p className="adm-quote">{r.text}</p>
        <p className="adm-meta">{r.name} · <a href={'mailto:'+r.email}>{r.email}</a>{r.city?' · '+r.city:''} · {KIND_LABEL[r.kind]}{r.userId?' · account holder':''} · {fmtDate(r.createdAt)}</p>
        <p className="adm-meta">About: {r.target==='estaff'?'estaff.pk':ag?<a href={'/agencies/'+ag.slug} target="_blank">{ag.name}</a>:'deleted agency'}</p>
      </div>
      <form className="adm-item-side" method="post" action="/api/admin/reviews"><Back path={here}/><input type="hidden" name="id" value={r.id}/>
        <label>Status<select name="status" defaultValue={r.status}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></label>
        <label>Public reply{r.target==='agency'?' (from estaff.pk)':''}<textarea name="reply" rows={3} defaultValue={r.reply} placeholder="Optional. Shown under the review."/></label>
        <div className="adm-row"><button className="adm-btn primary" name="_action" value="save">Save</button>{r.status==='pending'&&<button className="adm-btn" name="_action" value="approve">Approve</button>}<button className="adm-btn danger" name="_action" value="delete" data-confirm="Delete this review permanently?">Delete</button></div>
      </form>
    </article>;})}</div>}
  </>;
}
