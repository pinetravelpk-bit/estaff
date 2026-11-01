import {MapPin,Clock,Wallet,ArrowRight,Home,Laptop} from 'lucide-react';
import type {Job} from '../lib/store';
import {anyCity} from '../lib/pakistan';
import {typeTitle} from '../lib/pool';

export const EMPLOYMENT:Record<string,string>={FULL_TIME:'Full-time',PART_TIME:'Part-time',CONTRACTOR:'Contract',TEMPORARY:'Temporary'};
export const salaryText=(j:Job)=>j.pool&&!j.salaryMin&&!j.salaryMax?'Pay agreed with the client before interview':j.salaryMin&&j.salaryMax?`PKR ${j.salaryMin.toLocaleString('en-PK')}–${j.salaryMax.toLocaleString('en-PK')} / month`:j.salaryMin?`From PKR ${j.salaryMin.toLocaleString('en-PK')} / month`:j.salaryMax?`Up to PKR ${j.salaryMax.toLocaleString('en-PK')} / month`:'Salary discussed at interview';
export const jobPlace=(j:Job)=>j.remote?'Remote':`${j.area?j.area+', ':''}${anyCity(j.city)?.name||j.city}`;

export function JobCards({jobs,empty}:{jobs:Job[];empty?:React.ReactNode}){
  if(!jobs.length)return <>{empty}</>;
  return <div className="live-jobs">{jobs.map(j=><a className="live-job" key={j.id} href={'/jobs/'+j.id}>
    <span className="live-job-type">{typeTitle(j.jobType)}{j.pool&&<em className="pool-tag">{j.hiringNow?'Hiring now':'Ongoing'}</em>}</span>
    <h3>{j.title}</h3>
    <ul><li><MapPin size={15}/> {jobPlace(j)}</li><li><Clock size={15}/> {EMPLOYMENT[j.employmentType]}{j.liveIn?' · Live-in':''}</li><li><Wallet size={15}/> {salaryText(j)}</li>{j.remote?<li><Laptop size={15}/> Work from home</li>:j.liveIn?<li><Home size={15}/> Accommodation provided</li>:null}</ul>
    <span className="qa-link">View & apply <ArrowRight size={15}/></span>
  </a>)}</div>;
}
