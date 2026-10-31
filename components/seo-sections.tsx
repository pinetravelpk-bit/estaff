import {ArrowRight,MapPin,Sparkles,MessageCircleQuestion,ClipboardList,Users,Search,Handshake,FileCheck2} from 'lucide-react';
import {locations,areaSlug} from '../lib/content';
import {quickAnswers,hiringSteps,siteStats,marqueeRoles,marqueeAreas,type Step} from '../lib/answers';

export function RoleMarquee(){
  const row=(items:string[],reverse=false)=><div className={'marquee'+(reverse?' reverse':'')} aria-hidden="true"><div className="marquee-track">{[...items,...items].map((x,i)=><span className="chip" key={i}>{x}</span>)}</div></div>;
  return <section className="marquee-band" aria-label="Roles and areas we cover"><p className="sr-only">estaff.pk helps you hire {marqueeRoles.join(', ')} across {marqueeAreas.length} areas of Islamabad and Rawalpindi.</p>{row(marqueeRoles)}{row(marqueeAreas,true)}</section>;
}

export function StatsBand(){
  return <section className="container stats-band" aria-label="estaff.pk at a glance">{siteStats.map(s=><div className="stat" key={s.label}><strong><span data-count={s.value}>{s.value}</span>{s.suffix}</strong><span className="stat-label">{s.label}</span><small>{s.note}</small></div>)}</section>;
}

export function QuickAnswers(){
  return <section className="container quick-answers" id="quick-answers" aria-labelledby="quick-answers-title">
    <div className="fx-head"><span className="fx-eyebrow"><Sparkles size={15}/> Quick answers</span><h2 id="quick-answers-title">Hiring staff in Islamabad &amp; Rawalpindi, <span className="fx-gradient">answered in seconds.</span></h2><p>Short, direct answers to the questions families and businesses ask most before they hire.</p></div>
    <div className="qa-grid">{quickAnswers.map((x,i)=><article className="qa-card" key={x.q}><span className="qa-icon"><MessageCircleQuestion size={20}/></span><h3>{x.q}</h3><p className={i===0?'speakable-answer lead-answer':'speakable-answer'}>{x.a}</p><a className="qa-link" href={x.href}>{x.link} <ArrowRight size={15}/></a></article>)}</div>
  </section>;
}

const stepIcons=[ClipboardList,FileCheck2,Users,Search,Handshake];
export function StepList({steps,prefix='step'}:{steps:Step[];prefix?:string}){
  return <ol className="step-flow">{steps.map((st,i)=>{const I=stepIcons[i%stepIcons.length];return <li className="step-card" id={`${prefix}-${i+1}`} key={st.title}><span className="step-badge"><I size={22}/><b>{i+1}</b></span><h3>{st.title}</h3><p>{st.text}</p></li>})}</ol>;
}

export function ProcessTimeline(){
  return <section className="process-band" aria-labelledby="process-title"><div className="container">
    <div className="fx-head light"><span className="fx-eyebrow"><Sparkles size={15}/> How it works</span><h2 id="process-title">From first message to <span className="fx-gradient">first day</span> in five clear steps.</h2><p>The same simple process works for a live-in cook in F-7 or an accountant for your office in Saddar.</p></div>
    <StepList steps={hiringSteps}/>
    <div className="center-cta"><a className="btn glow" href="/hire">Start your hiring brief <ArrowRight size={17}/></a><a className="btn ghost-light" href="/how-it-works">See the full process</a></div>
  </div></section>;
}

export function LocalCoverage(){
  return <section className="container local-coverage" aria-labelledby="coverage-title">
    <div className="fx-head"><span className="fx-eyebrow"><MapPin size={15}/> Local coverage</span><h2 id="coverage-title">Hire staff near you in <span className="fx-gradient">Islamabad and Rawalpindi.</span></h2><p>Choose your sector or society to see local guides for cooks, drivers, maids, nannies, nurses and more.</p></div>
    <div className="coverage-grid">{Object.entries(locations).map(([city,c])=><div className={'coverage-city '+city} key={city}><h3><MapPin size={20}/> Staff in {c.name}</h3><p>{c.description}</p><ul>{c.areas.map(a=><li key={a}><a href={`/areas/${city}/${areaSlug(a)}`}>{a}</a></li>)}</ul><a className="qa-link" href={'/areas/'+city}>All {c.name} areas <ArrowRight size={15}/></a></div>)}</div>
  </section>;
}
