import {LongForm} from './long-form';
import type {LongForm as LF} from '../lib/longform/types';
import type {CityProfile} from '../lib/longform/cp-types';
import {cpPunjabA} from '../lib/longform/cp-punjab-a';
import {cpPunjabB} from '../lib/longform/cp-punjab-b';
import {cpSindh} from '../lib/longform/cp-sindh';
import {cpNorth} from '../lib/longform/cp-north';
import {cpKp} from '../lib/longform/cp-kp';
import {cpMore as cpMore1} from '../lib/longform/cp-more';
import {cpMore2} from '../lib/longform/cp-more2';
import {cpMore3} from '../lib/longform/cp-more3';
import {cityLiving} from '../lib/longform/cities4';
const cpMore:Record<string,string>={...cpMore2,...cpMore3,...cpMore1};
import {cityGuides} from '../lib/longform/cities';
import {type City,provinces} from '../lib/pakistan';

const profiles:Record<string,CityProfile>={...cpPunjabA,...cpPunjabB,...cpSindh,...cpKp,...cpNorth};
export const cityProfile=(slug:string)=>profiles[slug];

// Local guide for a city hub (/areas/{city}): households, work, travel, seasons and advice.
export function hubLocalGuide(c:City):LF|null{
  const k=profiles[c.slug];if(!k)return null;const p=provinces[c.province].name;
  return {
    title:`Hiring household staff in ${c.name}: a local guide`,
    answer:`${k.homes} estaff.pk helps families across ${c.areas.slice(0,3).join(', ')} and the rest of ${c.name} with screened staff, and helps local employers with recruitment.`,
    sections:[
      ...(cpMore[c.slug]?[{h:`${c.name} at a glance`,p:[cpMore[c.slug]]}]:[]),
      {h:`Where people work in ${c.name}`,p:[k.work]},
      {h:`Getting around ${c.name}`,p:[k.move,`Candidates from ${c.near} and nearby villages often travel in for work, so agree travel time and costs at the interview.`]},
      {h:`Seasons and timing in ${c.name}`,p:[k.season]},
      {h:`Advice for families hiring in ${c.name}`,p:[k.family,`Check the CNIC and references of every candidate, and for roles with access to children, elderly relatives or your car, ask for a police character certificate issued in ${p}.`]},
      {h:`Advice for job seekers in ${c.name}`,p:[k.seeker]},
    ],
    faqTitle:`More about ${c.name}`,
    faqs:[k.faq],
  };
}

// Local guide for jobs in a city (/jobs/city/{city}): where the jobs are and how to get them.
export function jobsLocalGuide(c:City):LF|null{
  const k=profiles[c.slug];
  if(k)return {
    title:`Working in ${c.name}: where the jobs are`,
    answer:`${k.work} Household jobs are steady too, and estaff.pk lists both kinds of work in ${c.name} on this page.`,
    sections:[
      ...(cpMore[c.slug]?[{h:`About ${c.name}`,p:[cpMore[c.slug]]}]:[]),
      {h:`Household jobs in ${c.name}`,p:[k.homes,`Household work is found across ${c.areas.join(', ')}, and in towns near ${c.name} such as ${c.near}.`]},
      {h:`Getting to work in ${c.name}`,p:[k.move]},
      {h:`Busy seasons for work in ${c.name}`,p:[k.season]},
      {h:`Tips for job seekers in ${c.name}`,p:[k.seeker,`Apply with a short CV that names the areas of ${c.name} you can reach, such as ${c.areas.slice(0,2).join(' or ')}, and whether you can live in.`]},
      {h:`What employers in ${c.name} expect`,p:[k.family]},
    ],
    faqTitle:`Working in ${c.name}: more questions`,
    faqs:[k.faq],
  };
  // Main cities: reuse the job-related parts of their full local guide.
  const g=cityGuides[c.slug];if(!g)return null;
  const sections=g.sections.filter(s=>/job market|Industry and jobs|Getting around|job seekers|Seasons/i.test(s.h));
  if(!sections.length)return null;
  return {title:`Working in ${c.name}: where the jobs are`,answer:g.answer,sections:[...(cityLiving[c.slug]?[{h:`Living and working in ${c.name}`,p:[cityLiving[c.slug]]}]:[]),...sections.map(s=>({...s,h:/in |of /.test(s.h)?s.h:`${s.h} in ${c.name}`}))],faqs:[]};
}

export function CityLocal({lf}:{lf:LF|null}){
  if(!lf)return null;
  return <section className="container page-content"><LongForm lf={lf}/></section>;
}
