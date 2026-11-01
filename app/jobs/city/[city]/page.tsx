import {notFound} from 'next/navigation';
import {MapPin} from 'lucide-react';
import {Header,Footer,PageHero} from '../../../../components/ui';
import {Breadcrumbs,StructuredData} from '../../../../components/seo';
import {JobTypeBlock} from '../../../../components/jobs-guides';
import {pageMetadata,faqSchema,speakablePageSchema} from '../../../../lib/seo';
import {anyCity,allCities,provinces,nearbyCities} from '../../../../lib/pakistan';
import {jobCityContent,jobsForCity,jobCityPath} from '../../../../lib/jobs';
import {listJobs} from '../../../../lib/store';
import {JobCards} from '../../../../components/job-cards';
import {listPoolJobs} from '../../../../lib/pool';
export const revalidate=300;

export function generateStaticParams(){return allCities.map(c=>({city:c.slug}));}
export async function generateMetadata({params}:{params:Promise<{city:string}>}){const {city}=await params;const c=anyCity(city);if(!c)return {title:'Not found',robots:{index:false,follow:false}};const list=jobsForCity(c).slice(0,5).map(j=>j.title.toLowerCase()).join(', ');return pageMetadata(`Jobs in ${c.name} – ${jobsForCity(c).slice(0,3).map(j=>j.title).join(', ')} & More`,`Find ${list} and other jobs in ${c.name}, ${provinces[c.province].name}. CV tips, documents and interview advice for each role.`,jobCityPath(c.slug));}

export default async function Page({params}:{params:Promise<{city:string}>}){
  const {city}=await params;const c=anyCity(city);if(!c)notFound();
  const k=jobCityContent(c);const list=jobsForCity(c);const path=jobCityPath(c.slug);const open=await listJobs({city:c.slug});const pool=listPoolJobs({city:c.slug});
  return <><Header/><main>
    <PageHero eyebrow={`Jobs · ${c.name}`} title={`Jobs in ${c.name}`} text={`Household, office and remote jobs in ${c.name}: what employers ask for, which documents to keep ready and how to prepare your CV.`}/>
    <section className="container page-content">
      <Breadcrumbs items={[{name:'Home',path:'/'},{name:'Jobs',path:'/jobs'},{name:c.name,path}]}/>
      <p className="answer-box lead-answer">{k.answer}</p>
      <p>{k.intro}</p>
      {open.length>0&&<><h2>Vacancies from employers in {c.name}</h2><JobCards jobs={open}/></>}
      {pool.length>0&&<><h2 style={{marginTop:open.length?40:undefined}}>Ongoing recruitment in {c.name}</h2><p className="pool-note">We recruit all year for these roles in {c.name}. Apply once: when a household or business needs someone like you, we share your profile with them (only with your permission) and call you before any interview.</p><JobCards jobs={pool}/></>}
      {!open.length&&!pool.length&&<div className="empty-jobs"><p>There are no open jobs in {c.name} right now. Submit your CV and we will contact you when one opens.</p><a className="btn glow" href={'/jobs/apply?city='+c.slug}>Submit your CV</a></div>}
      <h2 style={{marginTop:48}}>Job guides for {c.name}</h2>
      <div className="area-chips">{list.map(j=><a key={j.slug} href={'#'+j.slug}>{j.plural}</a>)}</div>
      <div className="job-guides">{list.map(j=><JobTypeBlock key={j.slug} j={j} city={c.name}/>)}</div>
      <h2 style={{marginTop:48}}>Job questions in {c.name}</h2>
      <div className="faqs">{k.faqs.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
      <h2 style={{marginTop:40}}>Jobs in nearby cities</h2>
      <div className="area-chips">{nearbyCities(c,8).map(n=><a key={n.slug} href={jobCityPath(n.slug)}><MapPin size={13}/> Jobs in {n.name}</a>)}</div>
      <p className="coverage-note">estaff.pk never charges job seekers to apply or to be placed. Never pay anyone who promises to guarantee a job.</p>
    </section>
    <StructuredData data={[speakablePageSchema(`Jobs in ${c.name}`,k.answer,path,['.lead-answer']),faqSchema(k.faqs)]}/>
  </main><Footer/></>;
}
