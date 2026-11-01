import {notFound} from 'next/navigation';
import {MapPin,Clock,Wallet,Building2,CalendarDays,CheckCircle2,FileText} from 'lucide-react';
import {Header,Footer} from '../../../components/ui';
import {Breadcrumbs,StructuredData} from '../../../components/seo';
import ApplyForm from '../../../components/apply-form';
import {currentUser} from '../../../lib/users';
import {EMPLOYMENT,salaryText,jobPlace,JobCards} from '../../../components/job-cards';
import {pageMetadata,jobPostingSchema,faqSchema,speakablePageSchema,howToSchema} from '../../../lib/seo';
import {getJob,isJobOpen,listJobs,type Job} from '../../../lib/store';
import {anyCity,allCities,provinces,nearbyCities} from '../../../lib/pakistan';
import {jobType,jobCityPath,jobRolePath} from '../../../lib/jobs';
import {getPoolJob,poolRoleOfId,listPoolJobs,allTypeOptions,typeTitle,poolContent,poolId,roleName} from '../../../lib/pool';

const findJob=async(id:string)=>getPoolJob(id)||await getJob(id);
const year=()=>new Date().getFullYear();
const fmt=(d:string)=>new Date(d).toLocaleDateString('en-PK',{dateStyle:'medium'});

export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{id:string}>}){
  const {id}=await params;const j=await findJob(id);if(!j)return {title:'Job not found',robots:{index:false,follow:false}};
  const c=anyCity(j.city);
  if(j.pool){const r=poolRoleOfId(id)!;const k=poolContent(r,c||null);const n=roleName(r);
    return pageMetadata(`${j.title} ${year()} – Apply Online Free`,`Apply for ${n.name.toLowerCase()} jobs ${c?'in '+c.name:'from home in Pakistan'}: ${EMPLOYMENT[j.employmentType].toLowerCase()} work with ${r.clients.toLowerCase()}${k.areas.length?` in ${k.areas.slice(0,2).join(', ')} and ${k.areas[2]||'nearby areas'}`:''}. CNIC and references needed. Free for job seekers – apply in 2 minutes.`,'/jobs/'+j.id,false);}
  return pageMetadata(`${j.title} – ${jobPlace(j)} | ${EMPLOYMENT[j.employmentType]} Job`,`${typeTitle(j.jobType)} job in ${jobPlace(j)}: ${salaryText(j)}. ${j.description}`,'/jobs/'+j.id,isJobOpen(j));
}

export default async function Page({params}:{params:Promise<{id:string}>}){
  const cu=await currentUser();const me=cu?.role==='seeker'?{name:cu.name,phone:cu.phone,email:cu.email,cvName:cu.cvFile?(cu.cvName||'CV'):null}:null;
  const {id}=await params;const j=await findJob(id);if(!j)notFound();
  const c=anyCity(j.city);const t=jobType(j.jobType);const open=isJobOpen(j);const path='/jobs/'+j.id;
  const r=j.pool?poolRoleOfId(id):null;const k=r?poolContent(r,c||null):null;
  const more:Job[]=j.remote?[]:[...await listJobs({city:j.city}),...listPoolJobs({city:j.city}).filter(x=>!x.remote)].filter(x=>x.id!==j.id).slice(0,6);
  const nearby=r&&c?nearbyCities(c,8).map(n=>getPoolJob(poolId(r.slug,n.slug))).filter(Boolean) as Job[]:[];
  const crumbs=[{name:'Home',path:'/'},{name:'Jobs',path:'/jobs'},...(c?[{name:`Jobs in ${c.name}`,path:jobCityPath(c.slug)}]:[]),{name:j.title,path}];
  const region=c?provinces[c.province].name:'';
  const realAnswer=`This ${typeTitle(j.jobType).toLowerCase()} job is in ${jobPlace(j)} (${EMPLOYMENT[j.employmentType].toLowerCase()}${j.liveIn?', live-in':''}${j.remote?', work from home':''}). Pay: ${salaryText(j)}. Apply by ${fmt(j.validThrough)} using the form on this page. Applying is free.`;
  return <><Header/><main>
    <section className="page-hero job-hero"><div className="container"><span className="eyebrow">{j.pool?`Ongoing recruitment · ${c?`${c.name}, ${region}`:'Work from home'}`:`${typeTitle(j.jobType)} job · ${j.remote?'Remote':c?.name}`}</span><h1>{j.title}</h1>
      {k&&<p className="job-sub">{k.name.person.charAt(0).toUpperCase()+k.name.person.slice(1)} work for {r!.clients.toLowerCase()}{k.areas.length?` in ${k.areas.slice(0,4).join(', ')} and across ${c?.name}`:''}. Apply once, free of charge.</p>}
      <ul className="job-facts"><li><MapPin size={17}/> {jobPlace(j)}</li><li><Clock size={17}/> {EMPLOYMENT[j.employmentType]}{j.liveIn?' · Live-in':''}</li><li><Wallet size={17}/> {salaryText(j)}</li><li><Building2 size={17}/> {j.employer||'estaff.pk client'}</li><li><CalendarDays size={17}/> {j.pool?'Apply any time':'Apply by '+fmt(j.validThrough)}</li></ul></div></section>
    <section className="container page-content">
      <Breadcrumbs items={crumbs}/>
      <div className="job-layout">
        <article>
          {!open&&<p className="notice">This vacancy is closed and no longer accepting applications.</p>}
          <p className="answer-box lead-answer">{k?k.answer:realAnswer}</p>
          {j.pool&&<div className="pool-explain"><strong>How this listing works</strong><p>This is ongoing recruitment, not a single vacancy. You apply once and join our shortlist{c?' for '+c.name:''}. When a client needs {k?`${/^[aeiou]/i.test(k.name.person)?'an':'a'} ${k.name.person}`:'this role'}, we share your profile with them (only with your permission) and call you to confirm pay, hours and duties before any interview.</p></div>}
          <h2>{k?`About ${k.name.name.toLowerCase()} jobs ${c?'in '+c.name:'from home'}`:'About the job'}</h2><p>{j.description}</p>
          {j.duties.length>0&&<><h2>{k?`What ${/^[aeiou]/i.test(k.name.person)?'an':'a'} ${k.name.person} does`:'Duties'}</h2><ul className="check-list">{j.duties.map(x=><li key={x}><CheckCircle2 size={18}/> {x}</li>)}</ul></>}
          {j.requirements.length>0&&<><h2>{k?`Requirements for ${k.name.name.toLowerCase()} jobs`:'Requirements'}</h2><ul className="check-list">{j.requirements.map(x=><li key={x}><CheckCircle2 size={18}/> {x}</li>)}</ul></>}
          {j.benefits.length>0&&<><h2>{k?'What you can expect':'Benefits'}</h2><ul className="check-list">{j.benefits.map(x=><li key={x}><CheckCircle2 size={18}/> {x}</li>)}</ul></>}
          {k&&k.areas.length>0&&<><h2>Where the work is in {c?.name}</h2><p>Clients for this role are spread across {c?.name}. You can tell us which areas you can reach when we call.</p><div className="area-chips">{k.areas.map(a=><span key={a}><MapPin size={13}/> {a}</span>)}</div></>}
          {k&&<><h2>Documents to keep ready</h2><p><FileText size={17}/> {k.docs.replace(/\.$/,'')}. Make copies, and keep your references’ phone numbers handy.</p>
            <h2>How to apply</h2><ol className="steps-list">{k.steps.map((s,i)=><li key={s.title} id={'step-'+(i+1)}><strong>{s.title}.</strong> {s.text}</li>)}</ol></>}
          {!k&&t&&<><h2>Tips for this role</h2><p><strong>Documents:</strong> {t.docs}.</p><p><strong>CV:</strong> {t.cv}</p><p><strong>Interview:</strong> {t.interview}</p></>}
          {k&&<><h2>{k.name.name} jobs {c?'in '+c.name:'from home'}: questions</h2><div className="faqs">{k.faqs.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></>}
          <p className="coverage-note">estaff.pk never asks job seekers for a fee to apply or to be placed.</p>
        </article>
        <aside className="apply-panel" id="apply">
          {open?<><h2>{k?`Apply for ${k.name.name.toLowerCase()} jobs`:'Apply now'}</h2><ApplyForm me={me} jobId={j.id} jobTitle={j.title} cities={allCities.map(x=>({value:x.slug,label:x.name}))} roles={allTypeOptions()} defaultCity={c?.name} defaultRole={typeTitle(j.jobType)}/></>:<><h2>This job is closed</h2><p>You can still register your CV for similar roles.</p><a className="btn" href="/jobs/apply">Submit your CV</a></>}
        </aside>
      </div>
      {nearby.length>0&&<><h2 style={{marginTop:48}}>{k!.name.name} jobs in nearby cities</h2><div className="area-chips">{nearby.map(n=><a key={n.id} href={'/jobs/'+n.id}><MapPin size={13}/> {n.title}</a>)}</div></>}
      {more.length>0&&<><h2 style={{marginTop:48}}>More jobs in {c?.name}</h2><JobCards jobs={more}/></>}
      <div className="area-chips" style={{marginTop:32}}>{c&&<a href={jobCityPath(c.slug)}>All jobs in {c.name}</a>}{r&&<a href={r.menuHref}>Hire: {r.menu}</a>}{t&&<a href={jobRolePath(t.slug)}>{t.plural} in Pakistan</a>}<a href="/jobs">All jobs</a></div>
    </section>
    {j.pool&&k?<StructuredData data={[speakablePageSchema(j.title,k.answer,path,['.lead-answer']),faqSchema(k.faqs),howToSchema(`How to apply for ${j.title.toLowerCase()}`,k.answer,path,k.steps)]}/>
      :open?<StructuredData data={jobPostingSchema({...j,cityName:c?.name||j.city,region,occupation:typeTitle(j.jobType)})}/>:null}
  </main><Footer/></>;
}
