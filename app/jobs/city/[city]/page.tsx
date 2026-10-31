import {notFound} from 'next/navigation';
import {MapPin} from 'lucide-react';
import {Header,Footer,PageHero} from '../../../../components/ui';
import {Breadcrumbs,StructuredData} from '../../../../components/seo';
import {JobTypeBlock} from '../../../../components/jobs-guides';
import {pageMetadata,faqSchema,speakablePageSchema} from '../../../../lib/seo';
import {anyCity,allCities,provinces,nearbyCities} from '../../../../lib/pakistan';
import {jobCityContent,jobsForCity,jobCityPath} from '../../../../lib/jobs';

export function generateStaticParams(){return allCities.map(c=>({city:c.slug}));}
export async function generateMetadata({params}:{params:Promise<{city:string}>}){const {city}=await params;const c=anyCity(city);if(!c)return {title:'Not found',robots:{index:false,follow:false}};const list=jobsForCity(c).slice(0,5).map(j=>j.title.toLowerCase()).join(', ');return pageMetadata(`Jobs in ${c.name} – ${jobsForCity(c).slice(0,3).map(j=>j.title).join(', ')} & More`,`Find ${list} and other jobs in ${c.name}, ${provinces[c.province].name}. CV tips, documents and interview advice for each role.`,jobCityPath(c.slug));}

export default async function Page({params}:{params:Promise<{city:string}>}){
  const {city}=await params;const c=anyCity(city);if(!c)notFound();
  const k=jobCityContent(c);const list=jobsForCity(c);const path=jobCityPath(c.slug);
  return <><Header/><main>
    <PageHero eyebrow={`Jobs · ${c.name}`} title={`Jobs in ${c.name}`} text={`Household, office and remote jobs in ${c.name}: what employers ask for, which documents to keep ready and how to prepare your CV.`}/>
    <section className="container page-content">
      <Breadcrumbs items={[{name:'Home',path:'/'},{name:'Jobs',path:'/jobs'},{name:c.name,path}]}/>
      <p className="answer-box lead-answer">{k.answer}</p>
      <p>{k.intro}</p>
      <div className="area-chips">{list.map(j=><a key={j.slug} href={'#'+j.slug}>{j.plural}</a>)}</div>
      <div className="job-guides">{list.map(j=><JobTypeBlock key={j.slug} j={j} city={c.name}/>)}</div>
      <h2 style={{marginTop:48}}>Job questions in {c.name}</h2>
      <div className="faqs">{k.faqs.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
      <h2 style={{marginTop:40}}>Jobs in nearby cities</h2>
      <div className="area-chips">{nearbyCities(c,8).map(n=><a key={n.slug} href={jobCityPath(n.slug)}><MapPin size={13}/> Jobs in {n.name}</a>)}</div>
      <p className="coverage-note">This is a job-seeker guide, not a vacancy list. estaff.pk publishes a vacancy only when an employer has a real, active opening. Never pay a fee to anyone who promises a job.</p>
    </section>
    <StructuredData data={[speakablePageSchema(`Jobs in ${c.name}`,k.answer,path,['.lead-answer']),faqSchema(k.faqs)]}/>
  </main><Footer/></>;
}
