import {notFound} from 'next/navigation';
import {MapPin,Clock,Wallet,Building2,CalendarDays,CheckCircle2} from 'lucide-react';
import {Header,Footer} from '../../../components/ui';
import {Breadcrumbs,StructuredData} from '../../../components/seo';
import ApplyForm from '../../../components/apply-form';
import {currentUser} from '../../../lib/users';
import {EMPLOYMENT,salaryText,jobPlace,JobCards} from '../../../components/job-cards';
import {pageMetadata,jobPostingSchema} from '../../../lib/seo';
import {getJob,isJobOpen,listJobs} from '../../../lib/store';
import {anyCity,allCities,provinces} from '../../../lib/pakistan';
import {jobType,jobTypes,jobCityPath,jobRolePath} from '../../../lib/jobs';

export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const {id}=await params;const j=await getJob(id);if(!j)return {title:'Job not found',robots:{index:false,follow:false}};const c=anyCity(j.city);const m=pageMetadata(`${j.title} – ${j.remote?'Remote':c?.name} | ${EMPLOYMENT[j.employmentType]} Job`,`${j.title} job ${j.remote?'(remote)':'in '+jobPlace(j)}. ${salaryText(j)}. ${j.description}`,'/jobs/'+j.id,isJobOpen(j));return m;}

export default async function Page({params}:{params:Promise<{id:string}>}){
  const cu=await currentUser();const me=cu?.role==='seeker'?{name:cu.name,phone:cu.phone,email:cu.email,cvName:cu.cvFile?(cu.cvName||'CV'):null}:null;
  const {id}=await params;const j=await getJob(id);if(!j)notFound();
  const c=anyCity(j.city);const t=jobType(j.jobType);const open=isJobOpen(j);
  const more=(await listJobs({city:j.city})).filter(x=>x.id!==j.id).slice(0,3);
  return <><Header/><main>
    <section className="page-hero job-hero"><div className="container"><span className="eyebrow">{t?.title} job · {j.remote?'Remote':c?.name}</span><h1>{j.title}</h1>
      <ul className="job-facts"><li><MapPin size={17}/> {jobPlace(j)}</li><li><Clock size={17}/> {EMPLOYMENT[j.employmentType]}{j.liveIn?' · Live-in':''}</li><li><Wallet size={17}/> {salaryText(j)}</li><li><Building2 size={17}/> {j.employer||'estaff.pk client'}</li><li><CalendarDays size={17}/> Apply by {new Date(j.validThrough).toLocaleDateString('en-PK',{dateStyle:'medium'})}</li></ul></div></section>
    <section className="container page-content">
      <Breadcrumbs items={[{name:'Home',path:'/'},{name:'Jobs',path:'/jobs'},{name:j.title,path:'/jobs/'+j.id}]}/>
      <div className="job-layout">
        <article>
          {!open&&<p className="notice">This vacancy is closed and no longer accepting applications.</p>}
          <h2>About the job</h2><p>{j.description}</p>
          {j.duties.length>0&&<><h2>Duties</h2><ul className="check-list">{j.duties.map(x=><li key={x}><CheckCircle2 size={18}/> {x}</li>)}</ul></>}
          {j.requirements.length>0&&<><h2>Requirements</h2><ul className="check-list">{j.requirements.map(x=><li key={x}><CheckCircle2 size={18}/> {x}</li>)}</ul></>}
          {j.benefits.length>0&&<><h2>Benefits</h2><ul className="check-list">{j.benefits.map(x=><li key={x}><CheckCircle2 size={18}/> {x}</li>)}</ul></>}
          {t&&<><h2>Tips for this role</h2><p><strong>Documents:</strong> {t.docs}.</p><p><strong>CV:</strong> {t.cv}</p><p><strong>Interview:</strong> {t.interview}</p></>}
          <p className="coverage-note">estaff.pk never asks job seekers for a fee to apply or to be placed.</p>
        </article>
        <aside className="apply-panel" id="apply">
          {open?<><h2>Apply now</h2><ApplyForm me={me} jobId={j.id} jobTitle={j.title} cities={allCities.map(x=>({value:x.slug,label:x.name}))} roles={jobTypes.map(x=>({value:x.slug,label:x.title}))} defaultCity={c?.name} defaultRole={t?.title}/></>:<><h2>This job is closed</h2><p>You can still register your CV for similar roles.</p><a className="btn" href="/jobs/apply">Submit your CV</a></>}
        </aside>
      </div>
      {more.length>0&&<><h2 style={{marginTop:48}}>More jobs in {c?.name}</h2><JobCards jobs={more}/></>}
      <div className="area-chips" style={{marginTop:32}}>{c&&<a href={jobCityPath(c.slug)}>All jobs in {c.name}</a>}{t&&<a href={jobRolePath(t.slug)}>{t.plural} in Pakistan</a>}<a href="/jobs">All jobs</a></div>
    </section>
    {open&&<StructuredData data={jobPostingSchema({...j,cityName:c?.name||j.city,region:c?provinces[c.province].name:''})}/>}
  </main><Footer/></>;
}
