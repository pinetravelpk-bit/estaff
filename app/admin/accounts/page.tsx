import Link from 'next/link';
import {requireAdmin} from '../../../lib/admin-guard';
import {listUsers,listAgencies} from '../../../lib/users';
import {listApplications,listJobs} from '../../../lib/store';
import {anyCity} from '../../../lib/pakistan';
import {jobType} from '../../../lib/jobs';
import {PageHead,Flash,Pill,Empty,Contact,fmtDay} from '../../../components/admin-ui';

export const metadata={title:'Accounts'};
const MSG={approved:'Agency approved. It is now listed and can post jobs.',suspended:'Account suspended.',activated:'Account re-activated.',deleted:'Account deleted.',verified:'Email marked as confirmed.'};

export default async function Accounts({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  await requireAdmin();const q=await searchParams;const tab=q.tab==='agencies'?'agencies':'seekers';
  const [users,agencies,apps,jobs]=await Promise.all([listUsers(),listAgencies(),listApplications(),listJobs({status:'all'})]);
  const seekers=users.filter(u=>u.role==='seeker');const byId=new Map(users.map(u=>[u.id,u]));
  const pending=agencies.filter(a=>a.status==='pending').length;
  const Act=({id,actions}:{id:string;actions:[string,string,boolean?][]})=><form method="post" action="/api/admin/accounts" className="adm-actions"><input type="hidden" name="id" value={id}/><input type="hidden" name="_back" value={'/admin/accounts?tab='+tab}/>{actions.map(([v,l,d])=><button key={v} name="_action" value={v} className={d?'danger':''} {...(d?{'data-confirm':'Are you sure? This cannot be undone.'}:{})}>{l}</button>)}</form>;
  return <>
    <PageHead title="Accounts" sub="Job seekers who registered on the website, and staffing / recruitment agencies in the directory."/>
    <Flash msg={q.msg} map={MSG}/>
    <div className="adm-tabs"><Link className={tab==='seekers'?'on':''} href="/admin/accounts">Job seekers <b>{seekers.length}</b></Link><Link className={tab==='agencies'?'on':''} href="/admin/accounts?tab=agencies">Agencies <b>{agencies.length}</b>{pending>0&&<> · {pending} waiting</>}</Link></div>
    {tab==='seekers'?<section className="adm-card">{seekers.length===0?<Empty title="No job seeker accounts yet" text="They appear when people sign up at /account/register."/>:
      <div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>Name</th><th>Contact</th><th>Work / city</th><th>CV</th><th>Alerts</th><th>Applied</th><th>Joined</th><th>Status</th><th/></tr></thead><tbody>
        {seekers.map(u=><tr key={u.id}><td><strong>{u.name}</strong><small>{u.emailVerified?'Email confirmed':'Email not confirmed'}</small></td><td><Contact phone={u.phone} email={u.email}/></td><td>{jobType(u.jobType)?.title||'—'}<small>{anyCity(u.city)?.name||''}</small></td><td>{u.cvFile?<a href={'/api/admin/cv/'+u.cvFile}>CV</a>:'—'}</td><td>{u.alerts.enabled?'On':'Off'}</td><td>{apps.filter(a=>a.userId===u.id).length}</td><td>{fmtDay(u.createdAt)}</td><td><Pill s={u.status}/></td>
          <td><Act id={u.id} actions={[...(!u.emailVerified?[['verify','Confirm email'] as [string,string]]:[]),u.status==='active'?['suspend','Suspend']:['activate','Activate'],['delete','Delete',true]]}/></td></tr>)}
      </tbody></table></div>}</section>:
    <section className="adm-card">{agencies.length===0?<Empty title="No agencies yet" text="Agencies appear when they sign up at /account/register?type=agency."/>:
      <div className="adm-list">{[...agencies].sort((a,b)=>(a.status==='pending'?-1:0)-(b.status==='pending'?-1:0)).map(a=>{const u=byId.get(a.userId);const nJobs=jobs.filter(j=>j.ownerId===a.userId).length;return <article key={a.userId} className={'adm-item'+(a.status==='pending'?' is-new':'')}>
        <div className="adm-item-main"><h3>{a.logo&&<img src={a.logo} alt="" className="adm-row-thumb"/>}{a.name} <Pill s={a.status==='approved'?'active':a.status==='pending'?'new':'inactive'}/></h3>
          <p><Contact phone={a.phone} email={a.email}/></p>
          <p className="adm-meta">Account: {u?.name} ({u?.email}{u?.emailVerified?', confirmed':', not confirmed'}) · {anyCity(a.city)?.name||'no city'} · {a.cities.length} cities · {a.services.length} services · {nJobs} jobs · joined {fmtDay(a.createdAt)}{a.regNo?` · Reg. ${a.regNo}`:''}</p>
          {a.about?<p className="adm-quote">{a.about}</p>:<p className="adm-muted">Profile not completed yet.</p>}
          {a.status==='approved'&&<a className="adm-btn small" href={'/agencies/'+a.slug} target="_blank">View listing</a>}
        </div>
        <div className="adm-item-side"><Act id={a.userId} actions={[...(a.status!=='approved'?[['approve','Approve & list'] as [string,string]]:[]),...(a.status!=='suspended'?[['suspend','Suspend'] as [string,string]]:[]),['delete','Delete',true]]}/></div>
      </article>;})}</div>}</section>}
  </>;
}
