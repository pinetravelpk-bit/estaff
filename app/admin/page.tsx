import Link from 'next/link';
import {Briefcase,FileText,Inbox,UserSearch,Building2,Newspaper,Image as ImageIcon,Plus,PenLine,Upload,PanelsTopLeft,ArrowRight} from 'lucide-react';
import {requireAdmin} from '../../lib/admin-guard';
import {listJobs,listApplications,listEnquiries,listCandidates,listEmployers,listMedia,isJobOpen} from '../../lib/store';
import {allArticles} from '../../lib/blog-store';
import {getSettings} from '../../lib/settings';
import {PageHead,Pill,fmtDate,Contact} from '../../components/admin-ui';

export const metadata={title:'Dashboard'};
const DAY=86400000;

function Bars({rows}:{rows:[string,number][]}){const max=Math.max(1,...rows.map(r=>r[1]));return <ul className="adm-bars">{rows.map(([k,v])=><li key={k}><span>{k}</span><i style={{width:(v/max*100)+'%'}}/><b>{v}</b></li>)}</ul>;}
const countBy=<T,>(rows:T[],f:(r:T)=>string)=>{const m=new Map<string,number>();rows.forEach(r=>{const k=f(r)||'—';m.set(k,(m.get(k)||0)+1);});return [...m.entries()].sort((a,b)=>b[1]-a[1]);};

export default async function Dashboard(){
  await requireAdmin();
  const [jobs,apps,enqs,cands,emps,media,posts]=await Promise.all([listJobs({status:'all'}),listApplications(),listEnquiries(),listCandidates(),listEmployers(),listMedia(),allArticles(true)]);
  const s=getSettings();const week=Date.now()-7*DAY;
  const kpis=[
    {label:'Open jobs',value:jobs.filter(isJobOpen).length,sub:`${jobs.length} total`,href:'/admin/jobs',icon:Briefcase,tone:'green'},
    {label:'New applications',value:apps.filter(a=>a.status==='new').length,sub:`${apps.filter(a=>+new Date(a.createdAt)>week).length} this week`,href:'/admin/applications',icon:FileText,tone:'blue'},
    {label:'New staff requests',value:enqs.filter(e=>e.status==='new').length,sub:`${enqs.filter(e=>+new Date(e.createdAt)>week).length} this week`,href:'/admin/enquiries',icon:Inbox,tone:'violet'},
    {label:'Candidates',value:cands.length,sub:`${cands.filter(c=>c.status==='available').length} available`,href:'/admin/candidates',icon:UserSearch,tone:'coral'},
    {label:'Employers',value:emps.length,sub:`${emps.filter(e=>e.status==='active').length} active`,href:'/admin/employers',icon:Building2,tone:'sun'},
    {label:'Blog posts',value:posts.filter(p=>p.status==='published').length,sub:`${posts.filter(p=>p.status==='draft').length} drafts`,href:'/admin/blog',icon:Newspaper,tone:'teal'},
  ];
  const missing=[!s.contact.phone&&'phone number',!s.contact.whatsapp&&'WhatsApp number',!s.contact.email&&'email',!s.contact.street&&'office address'].filter(Boolean) as string[];
  return <>
    <PageHead title="Dashboard" sub={'Assalam o Alaikum. Here is what is happening on estaff.pk today.'}/>
    {missing.length>0&&<Link href="/admin/content#contact" className="adm-alert">Add your {missing.join(', ')} so visitors can reach you and Google can show your business. <ArrowRight size={15}/></Link>}
    <section className="adm-kpis">{kpis.map(k=>{const I=k.icon;return <Link key={k.label} href={k.href} className={'adm-kpi t-'+k.tone}><span className="adm-kpi-icon"><I size={20}/></span><strong>{k.value}</strong><span>{k.label}</span><small>{k.sub}</small></Link>;})}</section>
    <section className="adm-quick">
      <Link href="/admin/jobs?new=1"><Plus size={18}/> Post a job</Link>
      <Link href="/admin/blog?new=1"><PenLine size={18}/> Write a blog post</Link>
      <Link href="/admin/media"><Upload size={18}/> Upload images</Link>
      <Link href="/admin/content"><PanelsTopLeft size={18}/> Edit homepage</Link>
      <span className="adm-quick-note"><ImageIcon size={16}/> {media.length} images in library</span>
    </section>
    <div className="adm-cols">
      <section className="adm-card"><header><h2>Latest staff requests</h2><Link href="/admin/enquiries">View all</Link></header>
        {enqs.length===0?<p className="adm-muted">No staff requests yet. They appear here when someone uses the “Request Staff” form.</p>:<ul className="adm-feed">{enqs.slice(0,6).map(e=><li key={e.id}><div><strong>{e.name}</strong> needs <em>{e.role}</em><small>{e.city}{e.area?', '+e.area:''} · {fmtDate(e.createdAt)}</small><Contact phone={e.phone} email={e.email}/></div><Pill s={e.status}/></li>)}</ul>}
      </section>
      <section className="adm-card"><header><h2>Latest applications</h2><Link href="/admin/applications">View all</Link></header>
        {apps.length===0?<p className="adm-muted">No applications yet. They appear here when job seekers apply or submit a CV.</p>:<ul className="adm-feed">{apps.slice(0,6).map(a=><li key={a.id}><div><strong>{a.name}</strong> · {a.role||'—'}<small>{a.jobTitle} · {a.city} · {fmtDate(a.createdAt)}</small><Contact phone={a.phone} email={a.email}/></div><Pill s={a.status}/></li>)}</ul>}
      </section>
    </div>
    <div className="adm-cols three">
      <section className="adm-card"><header><h2>Candidate pipeline</h2></header><Bars rows={(['new','screening','available','placed','inactive'] as const).map(k=>[k,cands.filter(c=>c.status===k).length])}/></section>
      <section className="adm-card"><header><h2>Applications by city</h2></header>{apps.length?<Bars rows={countBy(apps,a=>a.city).slice(0,6)}/>:<p className="adm-muted">No data yet.</p>}</section>
      <section className="adm-card"><header><h2>Requests by service</h2></header>{enqs.length?<Bars rows={countBy(enqs,e=>e.role).slice(0,6)}/>:<p className="adm-muted">No data yet.</p>}</section>
    </div>
  </>;
}
