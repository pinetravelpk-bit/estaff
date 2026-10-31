import {ArrowRight,MapPin,Briefcase,CheckCircle2,FileText} from 'lucide-react';
import {provinces,allCities,type Province} from '../lib/pakistan';
import {jobTypes,jobCityPath,jobRolePath} from '../lib/jobs';

export function JobDirectory(){
  const groups:Province[]=['ict','punjab','sindh','kp','balochistan','ajk','gb'];
  return <>
    <h2>Jobs by type</h2>
    <div className="qa-grid">{jobTypes.map(j=><a className="qa-card" key={j.slug} href={jobRolePath(j.slug)}><span className="qa-icon"><Briefcase size={20}/></span><h3>{j.plural} in Pakistan</h3><p>{j.duties[0].charAt(0).toUpperCase()+j.duties[0].slice(1)}.</p><span className="qa-link">See {j.title.toLowerCase()} jobs <ArrowRight size={15}/></span></a>)}</div>
    <h2 style={{marginTop:56}} id="jobs-by-city">Jobs by city</h2>
    {groups.map(g=>{const list=allCities.filter(c=>c.province===g);return list.length?<div key={g} className="province-block"><h3>{provinces[g].name}</h3><div className="area-chips">{list.map(c=><a key={c.slug} href={jobCityPath(c.slug)}><MapPin size={13}/> Jobs in {c.name}</a>)}</div></div>:null})}
  </>;
}

export function JobTypeBlock({j,city}:{j:(typeof jobTypes)[number];city:string}){
  return <article className="job-guide" id={j.slug}>
    <h3>{j.plural} in {city}</h3>
    <p><strong>What the work involves:</strong> {j.duties.join('; ')}.</p>
    <p><strong>Skills employers look for:</strong> {j.skills.join(', ')}.</p>
    <p><strong>Documents:</strong> {j.docs}.</p>
    <p><FileText size={16}/> <strong>CV tip:</strong> {j.cv}</p>
    <p><CheckCircle2 size={16}/> <strong>Interview tip:</strong> {j.interview}</p>
    <p className="muted-line">Also searched as “{j.roman} {city}”. <a className="qa-link" href={jobRolePath(j.slug)}>{j.title} jobs in other cities <ArrowRight size={14}/></a></p>
  </article>;
}
