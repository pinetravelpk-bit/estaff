import {notFound} from 'next/navigation';
import {Phone,Mail,MapPin,BadgeCheck,Building2,CalendarDays,FileBadge} from 'lucide-react';
import {Header,Footer} from '../../../components/ui';
import {Breadcrumbs,StructuredData} from '../../../components/seo';
import {JobCards} from '../../../components/job-cards';
import {pageMetadata,absolute} from '../../../lib/seo';
import {getAgencyBySlug,listAgencies} from '../../../lib/users';
import {listJobs} from '../../../lib/store';
import {anyCity} from '../../../lib/pakistan';
import {AGENCY_SERVICES} from '../../../components/account-agency';
import ReviewForm from '../../../components/review-form';
import {ReviewSummary,ReviewList,reviewSchemaParts,Stars} from '../../../components/reviews';
import {listReviews,summary} from '../../../lib/reviews';

export const revalidate=600;
export async function generateStaticParams(){return (await listAgencies('approved')).map(a=>({slug:a.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const a=await getAgencyBySlug(slug);if(!a||a.status!=='approved')return {title:'Agency not found',robots:{index:false,follow:false}};const c=anyCity(a.city)?.name;return pageMetadata(`${a.name}${c?' – '+c:''} | Staffing Agency`,`${a.name}${c?' in '+c:''}: ${a.about.slice(0,140)||'staffing and recruitment agency listed on estaff.pk.'}`,'/agencies/'+a.slug);}

const svcName=(s:string)=>AGENCY_SERVICES.find(x=>x[0]===s)?.[1]||s;
const wa=(p:string)=>{const d=p.replace(/[^0-9]/g,'');return 'https://wa.me/'+(d.startsWith('0')?'92'+d.slice(1):d);};

export default async function AgencyPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const a=await getAgencyBySlug(slug);if(!a||a.status!=='approved')notFound();
  const jobs=(await listJobs()).filter(j=>j.ownerId===a.userId);
  const reviews=await listReviews({status:'approved',agencyId:a.userId});const rs=summary(reviews);
  const cities=a.cities.map(c=>anyCity(c)).filter(Boolean);
  const schema={'@context':'https://schema.org','@type':'EmploymentAgency','@id':absolute('/agencies/'+a.slug+'#agency'),name:a.name,url:absolute('/agencies/'+a.slug),description:a.about.slice(0,500),telephone:a.phone,email:a.email,...(a.logo?{logo:absolute(a.logo),image:absolute(a.logo)}:{}),...(a.founded?{foundingDate:a.founded}:{}),...(a.address||a.city?{address:{'@type':'PostalAddress',...(a.address?{streetAddress:a.address}:{}),...(a.city?{addressLocality:anyCity(a.city)?.name}:{}),addressCountry:'PK'}}:{}),areaServed:cities.map(c=>({'@type':'City',name:c!.name})),knowsAbout:a.services.map(svcName),...reviewSchemaParts(reviews)};
  return <><Header/><main>
    <section className="page-hero agency-hero"><div className="container"><div className="agency-hero-row">{a.logo?<img src={a.logo} alt={a.name+' logo'} className="agency-logo-lg"/>:<span className="agency-ph lg"><Building2 size={34}/></span>}<div><span className="eyebrow">Staffing & recruitment agency</span><h1>{a.name}</h1><p className="agency-badge"><BadgeCheck size={17}/> Reviewed by estaff.pk{rs.count>0&&<> · <Stars value={rs.average}/> {rs.average.toFixed(1)} ({rs.count})</>}{a.city&&<> · <MapPin size={15}/> {anyCity(a.city)?.name}</>}</p></div></div></div></section>
    <section className="container page-content">
      <Breadcrumbs items={[{name:'Home',path:'/'},{name:'Agency directory',path:'/agencies'},{name:a.name,path:'/agencies/'+a.slug}]}/>
      <div className="job-layout">
        <article>
          {a.about&&<><h2>About {a.name}</h2>{a.about.split(/\n+/).map((p,i)=><p key={i}>{p}</p>)}</>}
          {a.services.length>0&&<><h2>Services</h2><div className="agency-tags big">{a.services.map(s=><span key={s}>{svcName(s)}</span>)}</div></>}
          {cities.length>0&&<><h2>Cities served</h2><div className="area-chips">{cities.map(c=><a key={c!.slug} href={'/agencies?city='+c!.slug}><MapPin size={13}/> {c!.name}</a>)}</div></>}
          <h2 style={{marginTop:36}}>Open jobs from {a.name}</h2>
          <JobCards jobs={jobs} empty={<p>No open jobs right now. You can still <a className="qa-link" href="/jobs/apply">submit your CV</a> to estaff.pk.</p>}/>
          <h2 style={{marginTop:36}} id="reviews">Reviews of {a.name}</h2>
          {reviews.length?<><ReviewSummary rows={reviews}/><ReviewList rows={reviews}/></>:<p>No reviews yet. Worked with {a.name}? Share your experience below.</p>}
          <details className="review-write"><summary className="btn">Write a review of {a.name}</summary><ReviewForm agency={a.slug} agencyName={a.name}/></details>
          <p className="coverage-note">Listing on estaff.pk is not an endorsement. Confirm fees, screening and terms in writing with the agency directly. Job seekers should never pay a fee to apply.</p>
        </article>
        <aside className="apply-panel"><h2>Contact {a.name}</h2>
          <ul className="agency-contact">
            {a.phone&&<li><Phone size={17}/><a href={'tel:'+a.phone.replace(/[^0-9+]/g,'')}>{a.phone}</a></li>}
            {a.whatsapp&&<li><svg viewBox="0 0 32 32" width="17" height="17" aria-hidden="true"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3z"/></svg><a href={wa(a.whatsapp)} target="_blank" rel="noopener nofollow">WhatsApp {a.whatsapp}</a></li>}
            {a.email&&<li><Mail size={17}/><a href={'mailto:'+a.email}>{a.email}</a></li>}
            {a.address&&<li><MapPin size={17}/><span>{a.address}</span></li>}
            {a.founded&&<li><CalendarDays size={17}/><span>Since {a.founded}</span></li>}
            {a.regNo&&<li><FileBadge size={17}/><span>Reg./licence: {a.regNo}</span></li>}
          </ul>
          {a.phone&&<a className="btn glow" href={'tel:'+a.phone.replace(/[^0-9+]/g,'')}>Call now</a>}
        </aside>
      </div>
    </section>
    <StructuredData data={schema}/>
  </main><Footer/></>;
}
