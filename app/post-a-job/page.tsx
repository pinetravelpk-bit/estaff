import {Header,Footer,PageHero} from '../../components/ui';
import {Breadcrumbs,StructuredData} from '../../components/seo';
import PostJobForm from '../../components/post-job-form';
import {pageMetadata,faqSchema,speakablePageSchema} from '../../lib/seo';
import {allCities} from '../../lib/pakistan';
import {allTypeOptions} from '../../lib/pool';
import {EDU,EDU_LABEL} from '../../lib/job-form';

export const generateMetadata=()=>pageMetadata('Post a Job Free – Hire Staff Anywhere in Pakistan','Post a job on estaff.pk for free: household staff, office, factory, security and remote roles in 106 cities. Approved jobs appear on estaff.pk and in Google Jobs.','/post-a-job');
const answer='To post a job on estaff.pk, fill in the form with the job title, city, salary range, experience and a short description. The estaff.pk team checks it, usually within one working day, then publishes it on estaff.pk, where it can also appear in Google Jobs. Posting is free, and job seekers are never charged.';
const faqs:[string,string][]=[
  ['How do I post a job on estaff.pk?',answer],
  ['Is it free to post a job?','Yes. Posting a vacancy is free. If you want estaff.pk to shortlist, screen or place candidates for you, the service fee is agreed with you in writing first.'],
  ['Will my job appear in Google Jobs?','Approved vacancies are published with the job details Google needs (location, salary, experience, education and closing date), so they can appear in Google’s job search. Google decides what it shows.'],
  ['Will my phone number be public?','No. Your contact details stay private with the estaff.pk team. Applicants apply through estaff.pk, and we pass their details to you.'],
  ['Why does my job need approval?','Every job is checked so that only real, open vacancies with fair terms are published, which protects job seekers and keeps your listing trusted.'],
];

export default function Page(){
  return <><Header/><main>
    <PageHero eyebrow="For employers" title="Post a job, free." text="Hiring a cook, driver, office team, factory staff or remote worker? Post your vacancy and receive applications from across Pakistan."/>
    <section className="container page-content">
      <Breadcrumbs items={[{name:'Home',path:'/'},{name:'Post a job',path:'/post-a-job'}]}/>
      <p className="answer-box lead-answer">{answer}</p>
      <div className="panel post-job-panel"><h2>Your vacancy</h2><PostJobForm cities={allCities.map(c=>({value:c.slug,label:c.name}))} types={allTypeOptions()} edu={EDU.map(e=>({value:e,label:EDU_LABEL[e]}))}/></div>
      <div className="post-job-info">
        <article>
          <h2>How it works</h2>
          <ol className="steps-list"><li><strong>Fill in the form.</strong> Title, city, salary range, experience, education and duties.</li><li><strong>We check it.</strong> Usually within one working day; we may call you to confirm details.</li><li><strong>It goes live.</strong> On estaff.pk, the city and job-type pages, job alerts by email, and Google Jobs.</li><li><strong>You get applicants.</strong> We send you the applicants’ details and CVs, or shortlist them for you if you prefer.</li></ol>
          <h2>Tips for a good job post</h2>
          <ul className="check-list"><li>Give a clear title, for example “Live-in cook for a family of five”.</li><li>Show a salary range. Jobs with pay listed get more and better applicants.</li><li>Write working hours, days off and whether it is live-in.</li><li>Do not include your exact address or phone number in the description.</li></ul>
          <p>Prefer us to find the right person for you? <a className="qa-link" href="/hire">Request staff</a> instead.</p>
          <h2>Questions about posting a job</h2>
          <div className="faqs">{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
        </article>
      </div>
    </section>
    <StructuredData data={[speakablePageSchema('Post a job on estaff.pk',answer,'/post-a-job',['.lead-answer']),faqSchema(faqs)]}/>
  </main><Footer/></>;
}
