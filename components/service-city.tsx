import {ArrowRight,CheckCircle2,MapPin,Briefcase} from 'lucide-react';
import {Header,Footer} from './ui';
import {Breadcrumbs,StructuredData} from './seo';
import {type City,provinces,nearbyCities} from '../lib/pakistan';
import {type CityService,cityServices,serviceCityContent,serviceCityPath} from '../lib/service-city';
import {serviceSchema,faqSchema,speakablePageSchema} from '../lib/seo';

export function ServiceCityPage({s,city:c}:{s:CityService;city:City}){
  const k=serviceCityContent(s,c);const path=serviceCityPath(s.slug,c.slug);
  const crumbs=[{name:'Home',path:'/'},{name:'Services',path:'/services'},{name:s.name,path:'/services/'+s.slug},{name:c.name,path}];
  return <><Header/><main>
    <section className="page-hero"><div className="container"><span className="eyebrow">{s.name} · {c.name}, {provinces[c.province].name}</span><h1>{k.h1}</h1><p>{s.summary}</p></div></section>
    <section className="container page-content">
      <Breadcrumbs items={crumbs}/>
      <p className="answer-box lead-answer">{k.answer}</p>
      <h2>What’s included</h2>
      <ul className="check-list">{s.scope.map(x=><li key={x}><CheckCircle2 size={18}/> {x}</li>)}</ul>
      <p>{s.detail}</p>
      <p><strong>What you receive:</strong> {s.deliverable}</p>

      <h2>{s.name} for employers in {c.name}</h2>
      {k.local.map((t,i)=><p key={i}>{t}</p>)}
      {k.variants.length>0&&<p>Businesses in {c.name} look for this as {k.variants.slice(0,-1).join(', ')}{k.variants.length>1?' or ':''}{k.variants[k.variants.length-1]}. Whatever the name, the work starts with an agreed scope.</p>}

      <h2>How it works</h2>
      <ol className="step-flow page-steps-inline">{s.steps.map((st,i)=><li className="step-card" key={st}><span className="step-badge"><Briefcase size={20}/><b>{i+1}</b></span><h3>{st}</h3></li>)}</ol>

      <h2 style={{marginTop:48}}>Questions about {s.name.toLowerCase()} in {c.name}</h2>
      <div className="faqs">{k.faqs.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>

      <h2 style={{marginTop:40}}>Other business services in {c.name}</h2>
      <div className="area-chips">{cityServices.filter(x=>x.slug!==s.slug).map(x=><a key={x.slug} href={serviceCityPath(x.slug,c.slug)}>{x.phrase} in {c.name}</a>)}</div>
      <h2 style={{marginTop:40}}>{s.phrase} in nearby cities</h2>
      <div className="area-chips">{nearbyCities(c,8).map(n=><a key={n.slug} href={serviceCityPath(s.slug,n.slug)}><MapPin size={13}/> {n.name}</a>)}</div>
      <p style={{marginTop:24}}>See the national <a className="qa-link" href={'/services/'+s.slug}>{s.name} page</a> or <a className="qa-link" href={'/areas/'+c.slug}>household staff in {c.name} <ArrowRight size={14}/></a></p>
      <p className="coverage-note">Scope, fees and timelines are agreed in writing for each requirement. A city page explains how the service works for local employers; it is not a claim of a branch office in every city.</p>
    </section>
    <StructuredData data={[speakablePageSchema(k.h1,k.answer,path,['.lead-answer']),serviceSchema(k.h1,k.answer,path,c.name),faqSchema(k.faqs)]}/>
  </main><Footer/></>;
}

export function ServiceCityList({s}:{s:CityService}){
  const groups=['ict','punjab','sindh','kp','balochistan','ajk','gb'] as const;
  return <section className="city-directory" style={{marginTop:56}}><h2>{s.phrase} by city</h2>{groups.map(g=>{const list=allCitiesByProvince(g);return <div className="province-block" key={g}><h3>{provinces[g].name}</h3><div className="area-chips">{list.map(c=><a key={c.slug} href={serviceCityPath(s.slug,c.slug)}><MapPin size={13}/> {s.phrase} in {c.name}</a>)}</div></div>})}</section>;
}
import {allCities} from '../lib/pakistan';
const allCitiesByProvince=(p:string)=>allCities.filter(c=>c.province===p);
