import {pageMetadata,faqSchema} from '../../lib/seo';
import {Header,Footer,PageHero} from '../../components/ui';
import {StructuredData,Breadcrumbs} from '../../components/seo';
import {JobBrowser} from '../../components/jobs';
import {JobDirectory} from '../../components/jobs-guides';

export const metadata=pageMetadata('Jobs in Pakistan – Household, Office & Remote Jobs by City','Cook, driver, maid, nanny, home nurse, receptionist, accountant and virtual assistant jobs across Pakistan. City guides, CV tips and interview advice.','/jobs');
const faqs:[string,string][]=[
  ['How do I find a job through estaff.pk?','Choose your city and the kind of work you want, prepare a short CV with references, and keep your CNIC ready. estaff.pk publishes a vacancy only when an employer has a real, active opening.'],
  ['Which jobs are covered?','Household jobs (cook, driver, maid, nanny, home nurse, housekeeper, babysitter, care attendant, gardener, watchman), office jobs (receptionist, accountant, office boy, sales executive, IT support) and remote jobs (virtual assistant, customer support, developer).'],
  ['Do I have to pay to get a job?','No. Never pay anyone who promises to guarantee a job. Real employers and agencies explain the role, salary and terms before you start.'],
];
export default function Page(){return <><Header/><main>
  <PageHero eyebrow="Jobs in Pakistan" title="Find work that fits you, in your city." text="Household, office and remote jobs across Pakistan, with practical guides for every city and role."/>
  <section className="container page-content">
    <Breadcrumbs items={[{name:'Home',path:'/'},{name:'Jobs',path:'/jobs'}]}/>
    <p className="answer-box lead-answer">{faqs[0][1]}</p>
    <JobDirectory/>
    <h2 style={{marginTop:56}}>Questions from job seekers</h2>
    <div className="faqs">{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
    <h2 style={{marginTop:56}}>Sample career portal</h2>
    <div className="notice">Demonstration listings only · These are sample roles, not live vacancies.</div>
    <JobBrowser/>
  </section>
  <StructuredData data={faqSchema(faqs)}/>
</main><Footer/></>}
