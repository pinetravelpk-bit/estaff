import {Header,Footer,PageHero} from '../../components/ui';
import {Breadcrumbs,StructuredData} from '../../components/seo';
import {StepList} from '../../components/seo-sections';
import {pageMetadata,howToSchema,faqSchema} from '../../lib/seo';
import {hiringSteps,candidateSteps,quickAnswers} from '../../lib/answers';

const title='How to Hire Domestic & Office Staff in Pakistan – Step by Step';
const description='A simple five-step process to hire a maid, cook, driver, nanny or office staff in Islamabad and Rawalpindi, plus a checklist for job seekers.';
export const generateMetadata=()=>pageMetadata(title,description,'/how-it-works');
const faq=[quickAnswers[1],quickAnswers[3],quickAnswers[4],quickAnswers[5],quickAnswers[7]];

export default function Page(){return <><Header/><main>
  <PageHero eyebrow="How it works" title="How to hire the right person, step by step." text="One clear process for household, office and remote roles in Islamabad and Rawalpindi."/>
  <section className="container page-content page-steps">
    <Breadcrumbs items={[{name:'Home',path:'/'},{name:'How it works',path:'/how-it-works'}]}/>
    <p className="answer-box lead-answer">To hire domestic or office staff in Pakistan, share your requirement, agree a clear brief with duties, hours and budget, review a shortlist, interview candidates and then confirm salary, duties and terms in writing before the start date.</p>
    <h2>For families and employers</h2>
    <StepList steps={hiringSteps}/>
    <h2 style={{marginTop:60}}>For job seekers</h2>
    <p>Looking for work as a cook, driver, housekeeper, nanny, office assistant or remote professional? Prepare these four things first.</p>
    <StepList steps={candidateSteps} prefix="candidate-step"/>
    <h2 style={{marginTop:60}}>Common questions about the process</h2>
    <div className="faqs">{faq.map((x,i)=><details key={x.q} open={i===0}><summary>{x.q}<span>+</span></summary><p>{x.a}</p></details>)}</div>
    <p style={{marginTop:30}}><a className="btn glow" href="/hire">Start your hiring brief</a></p>
  </section>
  <StructuredData data={[howToSchema('How to hire domestic staff in Pakistan',description,'/how-it-works',hiringSteps),faqSchema(faq.map(x=>[x.q,x.a]))]}/>
</main><Footer/></>}
