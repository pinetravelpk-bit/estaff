import {MapPin,BadgeCheck,ArrowRight,Building2} from 'lucide-react';
import {Header,Footer,PageHero} from '../../components/ui';
import {Breadcrumbs,StructuredData} from '../../components/seo';
import {pageMetadata,listSchema,faqSchema} from '../../lib/seo';
import {listAgencies} from '../../lib/users';
import {allCities,anyCity} from '../../lib/pakistan';
import {AGENCY_SERVICES} from '../../components/account-agency';

export const revalidate=600;
export const generateMetadata=()=>pageMetadata('Staffing & Recruitment Agency Directory Pakistan','Find staffing, recruitment and domestic staff agencies across Pakistan. Compare services and cities, then contact agencies directly by phone or WhatsApp.','/agencies');
const svcName=(s:string)=>AGENCY_SERVICES.find(x=>x[0]===s)?.[1]||s;
const faqs:[string,string][]=[
  ['How do I choose a staffing or recruitment agency in Pakistan?','Check which roles and cities the agency covers, how it screens candidates (CNIC, references, police character certificate), what it charges employers, and whether replacement terms are written down. Never pay a job seeker fee.'],
  ['Are agencies in this directory checked?','Every agency account is reviewed by the estaff.pk team before it appears here. Always confirm fees, screening and terms in writing with the agency directly.'],
  ['How can my agency be listed?','Create a free agency account, complete your profile and wait for approval. Approved agencies can also post jobs on estaff.pk.'],
];

export default async function Agencies({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  const q=await searchParams;const all=await listAgencies('approved');
  let rows=all;if(q.city)rows=rows.filter(a=>a.cities.includes(q.city!)||a.city===q.city);if(q.service)rows=rows.filter(a=>a.services.includes(q.service!));
  const city=q.city?anyCity(q.city)?.name:'';
  return <><Header/><main>
    <PageHero eyebrow="Agency directory" title={city?`Staffing & recruitment agencies in ${city}`:'Staffing & recruitment agencies in Pakistan'} text="Domestic staff agencies, recruitment firms and hiring partners, reviewed by estaff.pk. Contact them directly by phone, WhatsApp or email."/>
    <section className="container page-content">
      <Breadcrumbs items={[{name:'Home',path:'/'},{name:'Agency directory',path:'/agencies'}]}/>
      <form className="job-filter" action="/agencies">
        <label>City<select name="city" defaultValue={q.city||''}><option value="">All cities</option>{allCities.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
        <label>Service<select name="service" defaultValue={q.service||''}><option value="">All services</option>{AGENCY_SERVICES.map(([s,n])=><option key={s} value={s}>{n}</option>)}</select></label>
        <button className="btn">Search</button>{(q.city||q.service)&&<a className="qa-link" href="/agencies">Clear</a>}
      </form>
      {rows.length===0?<div className="empty-jobs"><h3>{all.length?'No agencies match this search yet.':'The directory is opening.'}</h3><p>Are you a staffing or recruitment agency? List your agency for free and receive enquiries and job applications.</p><a className="btn glow" href="/account/register?type=agency">List your agency</a></div>:
      <div className="agency-grid">{rows.map(a=><a key={a.userId} className="agency-card" href={'/agencies/'+a.slug}>
        <div className="agency-card-top">{a.logo?<img src={a.logo} alt={a.name+' logo'} loading="lazy"/>:<span className="agency-ph"><Building2 size={22}/></span>}<div><h3>{a.name} <BadgeCheck size={17} className="agency-check" aria-label="Reviewed by estaff.pk"/></h3>{a.city&&<small><MapPin size={13}/> {anyCity(a.city)?.name}</small>}</div></div>
        <p>{a.about.slice(0,160)}{a.about.length>160?'…':''}</p>
        <div className="agency-tags">{a.services.slice(0,4).map(s=><span key={s}>{svcName(s)}</span>)}</div>
        <span className="qa-link">View agency <ArrowRight size={15}/></span>
      </a>)}</div>}
      <section className="agency-cta"><div><h2>Run a staffing or recruitment agency?</h2><p>Create a free profile, appear in this directory and post your jobs to job seekers across Pakistan.</p></div><a className="btn glow" href="/account/register?type=agency">List your agency</a></section>
      <h2 style={{marginTop:48}}>Questions about agencies</h2>
      <div className="faqs">{faqs.map(([qq,a],i)=><details key={qq} open={i===0}><summary>{qq}<span>+</span></summary><p>{a}</p></details>)}</div>
    </section>
    <StructuredData data={[faqSchema(faqs),...(rows.length?[listSchema('Staffing and recruitment agencies',rows.map(a=>({name:a.name,path:'/agencies/'+a.slug})))]:[])]}/>
  </main><Footer/></>;
}
