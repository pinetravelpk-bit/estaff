import {LongForm} from '../../../../components/long-form';
import {jobRoleGuidesA} from '../../../../lib/longform/jobroles-a';
import {jobRoleGuidesB} from '../../../../lib/longform/jobroles-b';
import {jobRoleMore} from '../../../../lib/longform/jobroles-c';
import {jobRoleFinal} from '../../../../lib/longform/jobroles-d';
import {jobRoleAsk,jobRoleFaqsMore,remoteMore} from '../../../../lib/longform/jobroles-e';
import {jobRoleGrow,jobRoleFaqsLast,jobRoleFaqsTail} from '../../../../lib/longform/jobroles-f';
const jobRoleGuide=(s:string)=>{const b=jobRoleGuidesA[s]||jobRoleGuidesB[s];if(!b)return null;return {...b,sections:[...b.sections,...(jobRoleMore[s]||[]),...(remoteMore[s]||[]),...(jobRoleAsk[s]?[{h:'Questions to ask the employer',p:['Before you accept, ask:'],list:jobRoleAsk[s]}]:[]),...(jobRoleGrow[s]||[]),...(jobRoleFinal[s]||[])],faqs:[...b.faqs,...(jobRoleFaqsMore[s]||[]),...(jobRoleFaqsLast[s]||[]),...(jobRoleFaqsTail[s]||[])]};};
import {notFound} from 'next/navigation';
import {MapPin,ArrowRight} from 'lucide-react';
import {Header,Footer,PageHero} from '../../../../components/ui';
import {Breadcrumbs,StructuredData} from '../../../../components/seo';
import {JobTypeBlock} from '../../../../components/jobs-guides';
import {pageMetadata,faqSchema} from '../../../../lib/seo';
import {allCities} from '../../../../lib/pakistan';
import {jobTypes,jobType,jobRolePath,jobCityPath,jobsForCity} from '../../../../lib/jobs';
import {listJobs} from '../../../../lib/store';
import {JobCards} from '../../../../components/job-cards';
import {listPoolJobs} from '../../../../lib/pool';
import {anyCity} from '../../../../lib/pakistan';
export const revalidate=300;

export function generateStaticParams(){return jobTypes.map(j=>({role:j.slug}));}
export async function generateMetadata({params}:{params:Promise<{role:string}>}){const {role}=await params;const j=jobType(role);if(!j)return {title:'Not found',robots:{index:false,follow:false}};return pageMetadata(`${j.plural} in Pakistan – Lahore, Karachi, Islamabad & More`,`${j.plural} across Pakistan: duties, skills, documents, CV and interview tips, with guides for each city.`,jobRolePath(j.slug));}

export default async function Page({params}:{params:Promise<{role:string}>}){
  const {role}=await params;const j=jobType(role);if(!j)notFound();
  const cities=allCities.filter(c=>jobsForCity(c).some(x=>x.slug===j.slug));const path=jobRolePath(j.slug);const open=await listJobs({jobType:j.slug});const pool=listPoolJobs({jobType:j.slug});
  const faqs:[string,string][]=[
    [`How do I get ${j.title.toLowerCase()} work in Pakistan?`,`Prepare a short CV that shows your experience, keep your documents ready (${j.docs}), and apply to employers or agencies you can verify. ${j.cv}`],
    [`What does ${/^[aeiou]/i.test(j.title)?'an':'a'} ${j.title.toLowerCase()} do?`,`The work usually includes ${j.duties.join(', ')}.`],
    [`How should I prepare for ${/^[aeiou]/i.test(j.title)?'an':'a'} ${j.title.toLowerCase()} interview?`,j.interview],
  ];
  return <><Header/><main>
    <PageHero eyebrow={j.group==='household'?'Household jobs':j.group==='office'?'Office jobs':'Remote jobs'} title={`${j.plural} in Pakistan`} text={`What ${j.title.toLowerCase()} jobs involve, what employers ask for and how to prepare, with a guide for each city.`}/>
    <section className="container page-content">
      <Breadcrumbs items={[{name:'Home',path:'/'},{name:'Jobs',path:'/jobs'},{name:j.plural,path}]}/>
      <p className="answer-box lead-answer">{faqs[0][1]}</p>
      <h2>{j.title} jobs open now{pool.length?` in ${pool.length>1?pool.length+' cities':'Pakistan'}`:''}</h2>
      {open.length>0&&<JobCards jobs={open}/>}
      {pool.length>0&&<><p className="pool-note" style={{marginTop:open.length?28:undefined}}>We recruit {j.title.toLowerCase()} staff all year in every city below. Apply once for your city: when a client needs someone like you, we share your profile with them (only with your permission) and call you before any interview.</p>
        <JobCards jobs={pool.slice(0,24)}/>
        {pool.length>24&&<p style={{marginTop:20}}><a className="btn" href={'/jobs?type='+j.slug+'#ongoing'}>See all {pool.length} {j.title.toLowerCase()} jobs</a></p>}
        <h3 style={{marginTop:28}}>{j.title} jobs in other cities</h3>
        <div className="area-chips">{pool.slice(24).map(p=><a key={p.id} href={'/jobs/'+p.id}><MapPin size={13}/> {p.remote?'Remote (anywhere in Pakistan)':anyCity(p.city)?.name}</a>)}</div></>}
      {!open.length&&!pool.length&&<div className="empty-jobs"><p>No open {j.title.toLowerCase()} jobs right now. Submit your CV and we will contact you when one opens.</p><a className="btn glow" href={'/jobs/apply?role='+j.slug}>Submit your CV</a></div>}
      <div style={{marginTop:40}}><JobTypeBlock j={j} city="Pakistan"/></div>
      <h2 style={{marginTop:40}}>{j.plural} by city</h2>
      <div className="area-chips">{cities.map(c=><a key={c.slug} href={jobCityPath(c.slug)+'#'+j.slug}><MapPin size={13}/> {j.plural} in {c.name}</a>)}</div>
      <h2 style={{marginTop:40}}>Questions</h2>
      <div className="faqs">{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
      <p style={{marginTop:24}}>Are you an employer? See <a className="qa-link" href={j.employer}>how to recruit {/^[aeiou]/i.test(j.title)?'an':'a'} {j.title.toLowerCase()} <ArrowRight size={14}/></a></p>
      <p className="coverage-note">estaff.pk never charges job seekers to apply or to be placed.</p>
    </section>
    <StructuredData data={faqSchema([...faqs,...(jobRoleGuide(j.slug)?.faqs||[])])}/>
  {jobRoleGuide(j.slug)&&<section className="container page-content"><LongForm lf={jobRoleGuide(j.slug)!}/></section>}</main><Footer/></>;
}
