import {pageMetadata,faqSchema,listSchema} from '../../lib/seo';
import {Header,Footer,PageHero} from '../../components/ui';
import {StructuredData,Breadcrumbs} from '../../components/seo';
import {JobDirectory} from '../../components/jobs-guides';
import {JobCards} from '../../components/job-cards';
import {listJobs} from '../../lib/store';
import {allCities,anyCity} from '../../lib/pakistan';
import {jobTypes} from '../../lib/jobs';
import {listPoolJobs,allTypeOptions,poolRoles} from '../../lib/pool';

export const dynamic='force-dynamic';
export const generateMetadata=()=>pageMetadata('Jobs in Pakistan – Household, Office & Remote Jobs by City','Current cook, driver, maid, nanny, home nurse, office, factory, security and remote jobs across 106 cities in Pakistan. Apply online free of charge.','/jobs');
const faqs:[string,string][]=[
  ['How do I apply for a job through estaff.pk?','Open a job, fill in the short form and upload your CV. It takes about two minutes and is free. Create a free account to track your application status and get job alerts by email.'],
  ['What is an “ongoing recruitment” listing?','estaff.pk recruits all year for roles such as cooks, drivers, maids, nurses, office staff, factory workers and security guards in every city we cover. These listings are not a single vacancy: you join the shortlist for your city, and when a client needs that role we share your profile (only with your permission) and call you before any interview.'],
  ['Which jobs are covered?','Household and care jobs (cook, driver, maid, nanny, care attendant, home nurse, gardener, watchman, domestic couple, personal attendant), business jobs (office boy, receptionist, accountant, sales, IT, managers, technicians, factory workers, retail staff, HR and payroll, cleaners, security guards, call centre agents, hotel staff, delivery riders, teachers) and remote jobs.'],
  ['Do I have to pay to get a job?','No. estaff.pk never charges job seekers to apply or to be placed. Never pay anyone who promises to guarantee a job.'],
];
const PER=24;

export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  const q=await searchParams;
  const city=q.city&&anyCity(q.city)?q.city:'';
  const type=q.type||(q.role?jobTypes.find(j=>j.title.toLowerCase()===q.role!.toLowerCase()||j.slug===q.role)?.slug||poolRoles.find(r=>r.slug===q.role)?.slug:'')||'';
  const jobs=await listJobs({city:city||undefined,jobType:type||undefined});
  const pool=listPoolJobs({city:city||undefined,jobType:type||undefined});
  const pages=Math.max(1,Math.ceil(pool.length/PER));const page=Math.min(pages,Math.max(1,Number(q.page)||1));
  const shown=pool.slice((page-1)*PER,page*PER);
  const filtered=Boolean(city||type);const cityName=city?anyCity(city)?.name:'';
  const link=(p:number)=>'/jobs?'+new URLSearchParams({...(city?{city}:{}),...(type?{type}:{}),...(p>1?{page:String(p)}:{})})+'#ongoing';
  return <><Header/><main>
    <PageHero eyebrow="Jobs in Pakistan" title="Find work that fits you, in your city." text="Household, office, factory and remote jobs in 106 cities. Apply online in two minutes, free of charge."/>
    <section className="container page-content">
      <Breadcrumbs items={[{name:'Home',path:'/'},{name:'Jobs',path:'/jobs'}]}/>
      <form className="job-filter" action="/jobs">
        <label>Job type<select name="type" defaultValue={type}><option value="">All jobs</option>{allTypeOptions().map(j=><option key={j.value} value={j.value}>{j.label}</option>)}</select></label>
        <label>City<select name="city" defaultValue={city}><option value="">All cities</option>{allCities.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
        <button className="btn" type="submit">Search jobs</button>
        {filtered&&<a className="qa-link" href="/jobs">Clear</a>}
      </form>
      {jobs.length>0&&<><h2>{jobs.length} {jobs.length===1?'vacancy':'vacancies'} from employers{cityName?` in ${cityName}`:''}</h2><JobCards jobs={jobs}/></>}
      <h2 id="ongoing" style={{marginTop:jobs.length?48:0}}>Ongoing recruitment{cityName?` in ${cityName}`:''} <small className="count-chip">{pool.length.toLocaleString('en-PK')} roles</small></h2>
      <p className="pool-note">We recruit all year for these roles. Apply once for your city and role: when a household or business needs someone like you, we share your profile with them (only with your permission) and call you before any interview.</p>
      <JobCards jobs={shown} empty={<div className="empty-jobs"><h3>No jobs match your search.</h3><p>Submit your CV once and we will contact you when a suitable job opens.</p><a className="btn glow" href="/jobs/apply">Submit your CV</a></div>}/>
      {pages>1&&<nav className="pager" aria-label="More jobs">{page>1&&<a href={link(page-1)} rel="prev">← Previous</a>}<span>Page {page} of {pages}</span>{page<pages&&<a href={link(page+1)} rel="next">Next →</a>}</nav>}
      <p style={{marginTop:24}}>Don’t see the right job? <a className="qa-link" href="/jobs/apply">Submit your CV</a> and we will contact you when one opens.</p>
      <div style={{marginTop:56}}><JobDirectory/></div>
      <h2 style={{marginTop:56}}>Questions from job seekers</h2>
      <div className="faqs">{faqs.map(([qq,a],i)=><details key={qq} open={i===0}><summary>{qq}<span>+</span></summary><p>{a}</p></details>)}</div>
    </section>
    <StructuredData data={[faqSchema(faqs),...(jobs.length?[listSchema('Open jobs',jobs.map(j=>({name:j.title,path:'/jobs/'+j.id})))]:[])]}/>
  </main><Footer/></>;
}
