import {notFound} from 'next/navigation';
import {MapPin,ArrowRight} from 'lucide-react';
import {Header,Footer,PageHero} from '../../../../components/ui';
import {Breadcrumbs,StructuredData} from '../../../../components/seo';
import {JobTypeBlock} from '../../../../components/jobs-guides';
import {pageMetadata,faqSchema} from '../../../../lib/seo';
import {allCities} from '../../../../lib/pakistan';
import {jobTypes,jobType,jobRolePath,jobCityPath,jobsForCity} from '../../../../lib/jobs';

export function generateStaticParams(){return jobTypes.map(j=>({role:j.slug}));}
export async function generateMetadata({params}:{params:Promise<{role:string}>}){const {role}=await params;const j=jobType(role);if(!j)return {title:'Not found',robots:{index:false,follow:false}};return pageMetadata(`${j.plural} in Pakistan – Lahore, Karachi, Islamabad & More`,`${j.plural} across Pakistan: duties, skills, documents, CV and interview tips, with guides for each city.`,jobRolePath(j.slug));}

export default async function Page({params}:{params:Promise<{role:string}>}){
  const {role}=await params;const j=jobType(role);if(!j)notFound();
  const cities=allCities.filter(c=>jobsForCity(c).some(x=>x.slug===j.slug));const path=jobRolePath(j.slug);
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
      <JobTypeBlock j={j} city="Pakistan"/>
      <h2 style={{marginTop:40}}>{j.plural} by city</h2>
      <div className="area-chips">{cities.map(c=><a key={c.slug} href={jobCityPath(c.slug)+'#'+j.slug}><MapPin size={13}/> {j.plural} in {c.name}</a>)}</div>
      <h2 style={{marginTop:40}}>Questions</h2>
      <div className="faqs">{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
      <p style={{marginTop:24}}>Are you an employer? See <a className="qa-link" href={j.employer}>how to recruit {/^[aeiou]/i.test(j.title)?'an':'a'} {j.title.toLowerCase()} <ArrowRight size={14}/></a></p>
      <p className="coverage-note">This is a job-seeker guide, not a vacancy list. Vacancies are published only for real, active openings.</p>
    </section>
    <StructuredData data={faqSchema(faqs)}/>
  </main><Footer/></>;
}
