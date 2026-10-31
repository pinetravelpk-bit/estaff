import {Header,Footer,PageHero} from '../../../components/ui';
import {Breadcrumbs} from '../../../components/seo';
import ApplyForm from '../../../components/apply-form';
import {currentUser} from '../../../lib/users';
import {pageMetadata} from '../../../lib/seo';
import {allCities,anyCity} from '../../../lib/pakistan';
import {jobTypes,jobType} from '../../../lib/jobs';

export const generateMetadata=()=>pageMetadata('Submit Your CV – Register for Jobs in Pakistan','Register your CV with estaff.pk for cook, driver, maid, nanny, nurse, office and remote jobs in any city of Pakistan. Free for job seekers.','/jobs/apply');

export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  const cu=await currentUser();const me=cu?.role==='seeker'?{name:cu.name,phone:cu.phone,email:cu.email,cvName:cu.cvFile?(cu.cvName||'CV'):null}:null;
  const q=await searchParams;const city=q.city?anyCity(q.city)?.name:undefined;const role=q.role?jobType(q.role)?.title:undefined;
  return <><Header/><main>
    <PageHero eyebrow="Job seekers" title="Submit your CV." text="Register once and we will contact you when a suitable job opens in your city. It is free for job seekers."/>
    <section className="container page-content">
      <Breadcrumbs items={[{name:'Home',path:'/'},{name:'Jobs',path:'/jobs'},{name:'Submit your CV',path:'/jobs/apply'}]}/>
      <div className="job-layout">
        <article><h2>What happens next</h2><ul className="check-list"><li>Your details and CV are saved securely with the estaff.pk team.</li><li>When an employer’s requirement matches your work and city, we call or WhatsApp you.</li><li>Before any interview you will be told the duties, hours and salary.</li><li>We never charge job seekers to apply or to be placed.</li></ul><p>Looking for a specific opening? See <a className="qa-link" href="/jobs">current jobs</a>.</p></article>
        <aside className="apply-panel"><h2>Your details</h2><ApplyForm me={me} cities={allCities.map(c=>({value:c.slug,label:c.name}))} roles={jobTypes.map(j=>({value:j.slug,label:j.title}))} defaultCity={city} defaultRole={role}/></aside>
      </div>
    </section>
  </main><Footer/></>;
}
