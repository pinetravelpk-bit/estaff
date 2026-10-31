import {pageMetadata,faqSchema,listSchema} from '../../lib/seo';
import {Header,Footer,PageHero} from '../../components/ui';
import {StructuredData,Breadcrumbs} from '../../components/seo';
import {JobDirectory} from '../../components/jobs-guides';
import {JobCards} from '../../components/job-cards';
import {listJobs} from '../../lib/store';
import {allCities,anyCity} from '../../lib/pakistan';
import {jobTypes} from '../../lib/jobs';

export const dynamic='force-dynamic';
export const metadata=pageMetadata('Jobs in Pakistan – Household, Office & Remote Jobs by City','Current cook, driver, maid, nanny, home nurse, receptionist, accountant and virtual assistant jobs across Pakistan. Apply online or submit your CV.','/jobs');
const faqs:[string,string][]=[
  ['How do I apply for a job through estaff.pk?','Open a job, fill in the short form and upload your CV. If there is no suitable opening right now, submit your CV once and the team will contact you when a matching job opens in your city.'],
  ['Which jobs are covered?','Household jobs (cook, driver, maid, nanny, home nurse, housekeeper, babysitter, care attendant, gardener, watchman), office jobs (receptionist, accountant, office boy, sales executive, IT support) and remote jobs (virtual assistant, customer support, developer).'],
  ['Do I have to pay to get a job?','No. estaff.pk never charges job seekers to apply or to be placed. Never pay anyone who promises to guarantee a job.'],
];

export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  const q=await searchParams;
  const city=q.city&&anyCity(q.city)?q.city:'';
  const type=q.type||(q.role?jobTypes.find(j=>j.title.toLowerCase()===q.role!.toLowerCase()||j.slug===q.role)?.slug:'')||'';
  const jobs=await listJobs({city:city||undefined,jobType:type||undefined});
  const filtered=Boolean(city||type);
  return <><Header/><main>
    <PageHero eyebrow="Jobs in Pakistan" title="Find work that fits you, in your city." text="Current household, office and remote jobs. Apply online in two minutes, free of charge."/>
    <section className="container page-content">
      <Breadcrumbs items={[{name:'Home',path:'/'},{name:'Jobs',path:'/jobs'}]}/>
      <form className="job-filter" action="/jobs">
        <label>Job type<select name="type" defaultValue={type}><option value="">All jobs</option>{jobTypes.map(j=><option key={j.slug} value={j.slug}>{j.title}</option>)}</select></label>
        <label>City<select name="city" defaultValue={city}><option value="">All cities</option>{allCities.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
        <button className="btn" type="submit">Search jobs</button>
        {filtered&&<a className="qa-link" href="/jobs">Clear</a>}
      </form>
      <h2>{jobs.length?`${jobs.length} open ${jobs.length===1?'job':'jobs'}`:'Open jobs'}{city?` in ${anyCity(city)?.name}`:''}</h2>
      <JobCards jobs={jobs} empty={<div className="empty-jobs"><h3>No open jobs {filtered?'match your search':'right now'}.</h3><p>New jobs are added as employers send requirements. Submit your CV once and we will contact you when a suitable job opens.</p><a className="btn glow" href={`/jobs/apply${city||type?`?${new URLSearchParams({...(city?{city}:{}),...(type?{role:type}:{})})}`:''}`}>Submit your CV</a></div>}/>
      {jobs.length>0&&<p style={{marginTop:24}}>Don’t see the right job? <a className="qa-link" href="/jobs/apply">Submit your CV</a> and we will contact you when one opens.</p>}
      <div style={{marginTop:56}}><JobDirectory/></div>
      <h2 style={{marginTop:56}}>Questions from job seekers</h2>
      <div className="faqs">{faqs.map(([qq,a],i)=><details key={qq} open={i===0}><summary>{qq}<span>+</span></summary><p>{a}</p></details>)}</div>
    </section>
    <StructuredData data={[faqSchema(faqs),...(jobs.length?[listSchema('Open jobs',jobs.map(j=>({name:j.title,path:'/jobs/'+j.id})))]:[])]}/>
  </main><Footer/></>;
}
