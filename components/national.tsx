import {LongForm} from './long-form';
import {cityGuides} from '../lib/longform/cities';
import {ArrowRight,MapPin,CheckCircle2,Languages,Briefcase,Home,Sparkles} from 'lucide-react';
import {Header,Footer} from './ui';
import {Breadcrumbs,StructuredData} from './seo';
import {type City,provinces,nearbyCities} from '../lib/pakistan';
import {cityHubContent,cityRoleContent,cityAreaContent,roleInfo,roleSlugs,care,cityRolePath,cityAreaPath,businessKeywords,areaRoleLine} from '../lib/national';
import {serviceSchema,faqSchema,listSchema,speakablePageSchema} from '../lib/seo';
import {jobCityPath} from '../lib/jobs';

function Hero({eyebrow,title,text}:{eyebrow:string;title:string;text:string}){return <section className="page-hero"><div className="container"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div></section>}
function Faqs({items}:{items:[string,string][]}){return <div className="faqs">{items.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>}
const Note=()=> <p className="coverage-note">Availability, screening scope, salary and any fees are confirmed for each requirement. A city or area page is a planning guide, not a claim of an office or ready candidate in every locality.</p>;

export function NationalCityHub({city:c}:{city:City}){
  const k=cityHubContent(c);const p=provinces[c.province];const path='/areas/'+c.slug;
  const crumbs=[{name:'Home',path:'/'},{name:'Areas',path:'/areas'},{name:c.name,path}];
  return <><Header/><main>
    <Hero eyebrow={`${c.name} · ${p.name}`} title={`Domestic Staff Agency in ${c.name}`} text={`Cooks, drivers, maids, nannies, elderly care and caretakers for homes in ${c.name}, plus recruitment, HR and payroll support for local businesses.`}/>
    <section className="container page-content">
      <Breadcrumbs items={crumbs}/>
      <p className="answer-box lead-answer">{k.answer}</p>
      <p>{k.intro}</p>
      <div className="city-facts">{k.context.map((t,i)=><div className="about-card" key={i}>{[<Sparkles key="a"/>,<Languages key="b"/>,<Briefcase key="c"/>][i]}<p>{t}</p></div>)}</div>

      <h2>Household roles in {c.name}</h2>
      <div className="qa-grid">{roleSlugs.map(s=>{const r=roleInfo[s];const svc=care(s);return <a className="qa-card" key={s} href={cityRolePath(c,s)}><span className="qa-icon"><Home size={20}/></span><h3>{r.agency} in {c.name}</h3><p>{svc.summary}</p><span className="qa-link">{svc.name} in {c.name} <ArrowRight size={15}/></span></a>})}</div>

      <h2 style={{marginTop:56}}>Areas of {c.name}</h2>
      <p>Choose your locality to see household roles for that area.</p>
      <div className="coverage-city"><ul>{c.areas.map(a=><li key={a}><a href={cityAreaPath(c,a)}>{a}</a></li>)}</ul></div>

      <h2 style={{marginTop:56}}>Business staffing services in {c.name}</h2>
      <p>For employers in {c.name}, estaff.pk’s business services are delivered nationally and scoped for each requirement.</p>
      <div className="biz-list">{businessKeywords.map(b=><a key={b.slug} href={'/services/'+b.slug+'/'+c.slug}><strong>{b.phrase} in {c.name}</strong><span>{b.text}</span></a>)}</div>

      <h2 style={{marginTop:56}}>Jobs in {c.name}</h2>
      <p>Looking for work as a cook, driver, maid, nanny, home nurse, receptionist, accountant or virtual assistant in {c.name}? See <a className="qa-link" href={jobCityPath(c.slug)}>jobs in {c.name} <ArrowRight size={15}/></a></p>

      <h2 style={{marginTop:56}}>Questions about domestic staff in {c.name}</h2>
      <Faqs items={k.faqs}/>
      <h2 style={{marginTop:56}}>Nearby cities</h2>
      <div className="area-chips">{nearbyCities(c,8).map(n=><a key={n.slug} href={'/areas/'+n.slug}><MapPin size={13}/> {n.name}</a>)}</div>
      <Note/>
    </section>
    <StructuredData data={[speakablePageSchema(`Domestic Staff Agency in ${c.name}`,k.answer,path,['.lead-answer']),serviceSchema(`Domestic staffing in ${c.name}`,k.answer,path,c.name),faqSchema([...k.faqs,...(cityGuides[c.slug]?.faqs||[])]),listSchema(`${c.name} household roles`,roleSlugs.map(s=>({name:`${care(s).name} in ${c.name}`,path:cityRolePath(c,s)})))]}/>
  {cityGuides[c.slug]&&<section className="container page-content"><LongForm lf={cityGuides[c.slug]}/></section>}</main><Footer/></>;
}

export function NationalCityRole({city:c,role}:{city:City;role:string}){
  const k=cityRoleContent(c,role);const r=k.r;const svc=k.svc;const path=cityRolePath(c,role);
  const crumbs=[{name:'Home',path:'/'},{name:'Areas',path:'/areas'},{name:c.name,path:'/areas/'+c.slug},{name:svc.name,path}];
  return <><Header/><main>
    <Hero eyebrow={`${svc.name} · ${c.name}`} title={`${svc.name} in ${c.name}`} text={`${svc.summary} A practical guide to arranging ${r.article} ${r.person} in ${c.name}, ${provinces[c.province].name}.`}/>
    <section className="container page-content">
      <Breadcrumbs items={crumbs}/>
      <p className="answer-box lead-answer">{k.answer}</p>
      <h2>What {r.article} {r.person} does in a {c.name} home</h2>
      <ul className="check-list">{r.duties.map(d=><li key={d}><CheckCircle2 size={18}/> {d}</li>)}</ul>

      <h2>Hiring {r.article} {r.one} in {c.name}: local points to plan</h2>
      {k.local.map((t,i)=><p key={i}>{t}</p>)}
      <p>{k.areaPara}</p>
      <p>{k.econPara}</p>

      <h2>Live-in, part-time or full-time {r.one} in {c.name}</h2>
      <p>{k.variants}</p>

      <h2>How to assess candidates</h2>
      <p>{svc.assessment} For the full planning checklist, see the <a className="qa-link" href={'/services/domestic-staff/'+role}>{svc.name} guide</a>.</p>

      <h2>Frequently asked questions: {r.one} in {c.name}</h2>
      <Faqs items={k.faqs}/>

      <div className="roman-box" lang="ur-Latn"><h2>{c.name} mein {r.roman[0]} chahiye?</h2><p>{k.roman}</p></div>

      <h2 style={{marginTop:48}}>{svc.name} by area in {c.name}</h2>
      <div className="area-chips">{c.areas.map(a=><a key={a} href={cityAreaPath(c,a)}>{a}</a>)}</div>
      <h2 style={{marginTop:40}}>Other household roles in {c.name}</h2>
      <div className="area-chips">{roleSlugs.filter(s=>s!==role).map(s=><a key={s} href={cityRolePath(c,s)}>{care(s).name}</a>)}</div>
      <h2 style={{marginTop:40}}>{svc.name} in nearby cities</h2>
      <div className="area-chips">{nearbyCities(c,8).map(n=><a key={n.slug} href={cityRolePath(n,role)}>{svc.name} in {n.name}</a>)}</div>
      <p style={{marginTop:24}}>Read the full <a className="qa-link" href={'/services/domestic-staff/'+role}>{svc.name} hiring guide</a> or <a className="qa-link" href={jobCityPath(c.slug)}>see jobs in {c.name}</a>.</p>
      <Note/>
    </section>
    <StructuredData data={[speakablePageSchema(`${svc.name} in ${c.name}`,k.answer,path,['.lead-answer']),serviceSchema(`${svc.name} in ${c.name}`,k.answer,path,c.name),faqSchema(k.faqs)]}/>
  </main><Footer/></>;
}

export function NationalCityArea({city:c,area}:{city:City;area:string}){
  const k=cityAreaContent(c,area);const path=cityAreaPath(c,area);
  const crumbs=[{name:'Home',path:'/'},{name:'Areas',path:'/areas'},{name:c.name,path:'/areas/'+c.slug},{name:area,path}];
  return <><Header/><main>
    <Hero eyebrow={`${area} · ${c.name}`} title={`Domestic Staff in ${area}, ${c.name}`} text={`Cooks, drivers, maids, nannies, care attendants and caretakers for homes in ${area}.`}/>
    <section className="container page-content">
      <Breadcrumbs items={crumbs}/>
      <p className="answer-box lead-answer">{k.intro}</p>
      <p>{k.travel}</p>
      {k.near&&<p>{k.near}</p>}
      <h2>Household roles for {area}</h2>
      <div className="qa-grid">{roleSlugs.map(s=>{const r=roleInfo[s];return <a className="qa-card" key={s} href={cityRolePath(c,s)}><span className="qa-icon"><Home size={20}/></span><h3>{care(s).name} in {area}</h3><p>{areaRoleLine(c.name,area,r.one,r.duties[0])}</p><span className="qa-link">{care(s).name} in {c.name} <ArrowRight size={15}/></span></a>})}</div>
      <h2 style={{marginTop:48}}>Questions about household staff in {area}</h2>
      <Faqs items={k.faqs}/>
      <div className="roman-box" lang="ur-Latn"><p>{k.roman}</p></div>
      <h2 style={{marginTop:40}}>Other areas of {c.name}</h2>
      <div className="area-chips">{c.areas.filter(a=>a!==area).map(a=><a key={a} href={cityAreaPath(c,a)}>{a}</a>)}<a href={'/areas/'+c.slug}>All of {c.name}</a></div>
      <Note/>
    </section>
    <StructuredData data={[speakablePageSchema(`Domestic Staff in ${area}, ${c.name}`,k.intro,path,['.lead-answer']),serviceSchema(`Domestic staffing in ${area}, ${c.name}`,k.intro,path,c.name),faqSchema(k.faqs)]}/>
  </main><Footer/></>;
}
