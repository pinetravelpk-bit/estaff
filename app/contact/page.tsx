import {Header,Footer,PageHero} from '../../components/ui';
import {Breadcrumbs,StructuredData} from '../../components/seo';
import {pageMetadata,typedPageSchema,getBusiness,faqSchema,absolute,orgId} from '../../lib/seo';
import {locations} from '../../lib/content';

const title='Contact estaff.pk – Staffing & Recruitment in Pakistan';
const description='Contact estaff.pk by phone, WhatsApp or email to hire domestic staff, office teams or remote staff anywhere in Pakistan, or to ask about jobs and agency listings.';
export const generateMetadata=()=>pageMetadata(title,description,'/contact');
const faqs:[string,string][]=[
  ['How quickly will estaff.pk reply?','Staff requests sent during working hours are usually answered the same or next working day. Including the role, city, hours and salary budget helps us reply with useful next steps.'],
  ['Can I contact you about a job?','Yes. The quickest way is to apply to a job on the jobs page or submit your CV. You can also create a free account to follow your applications.'],
  ['I run an agency. How do I get listed?','Create a free agency account. Our team reviews new agencies and lists approved ones in the agency directory.'],
  ['Do you charge job seekers?','No. estaff.pk never charges job seekers to apply or to be placed.'],
];

export default function Page(){
  const b=getBusiness();const hasDirect=Boolean(b.phone||b.email||b.street||b.whatsapp);
  const wa=b.whatsapp?'https://wa.me/'+b.whatsapp.replace(/[^0-9]/g,'').replace(/^0/,'92'):'';
  return <><Header/><main>
  <PageHero eyebrow="Contact" title="Contact estaff.pk" text="Tell us the role, the area and the schedule. We will help you work out the next step."/>
  <section className="container page-content">
    <Breadcrumbs items={[{name:'Home',path:'/'},{name:'Contact',path:'/contact'}]}/>
    <p className="answer-box lead-answer">{hasDirect?`Call or WhatsApp estaff.pk${b.phone?' on '+b.phone:''}${b.email?', email '+b.email:''}, or send your staffing requirement online. `:'Send your staffing requirement online and the estaff.pk team will call you back. '}Job seekers can apply to jobs or submit a CV; agencies can create a free directory listing.</p>
    <div className="contact-grid">
      <div>
        <span className="live-dot">Taking new requirements</span>
        <h2>Families and employers</h2>
        <p>Write down the role, your city and area, working hours, live-in or live-out arrangement and your salary budget. A complete brief makes the first conversation much faster.</p>
        <p><a className="btn glow" href="/hire">Send your staffing requirement</a></p>
        <h2 style={{marginTop:34}}>Job seekers</h2>
        <p>Apply on the <a className="qa-link" href="/jobs">jobs page</a>, <a className="qa-link" href="/jobs/apply">submit your CV</a>, or <a className="qa-link" href="/account/register">create a free account</a> to track your applications and get job alerts.</p>
        <h2 style={{marginTop:34}}>Staffing and recruitment agencies</h2>
        <p>Get listed in the <a className="qa-link" href="/agencies">agency directory</a> and post jobs: <a className="qa-link" href="/account/register?type=agency">create an agency account</a>.</p>
      </div>
      <aside className="contact-card">
        <h2>estaff.pk</h2>
        {hasDirect?<ul>{b.phone&&<li>Phone: <a href={'tel:'+b.phone.replace(/[^0-9+]/g,'')}>{b.phone}</a></li>}{wa&&<li>WhatsApp: <a href={wa}>{b.whatsapp}</a></li>}{b.hours&&<li>Hours: {b.hours}</li>}{b.email&&<li>Email: <a href={'mailto:'+b.email}>{b.email}</a></li>}{b.street&&<li>Office: {b.street}, {b.locality}{b.postalCode?' '+b.postalCode:''}, Pakistan</li>}</ul>:<p>Use the forms on this page to reach the team.</p>}
        <h3 style={{marginTop:22}}>Most detailed local coverage</h3>
        {Object.entries(locations).map(([city,c])=><p key={city}><a href={'/areas/'+city}>{c.name}</a>: {c.areas.join(', ')}</p>)}
        <p><a href="/areas">All 106 cities →</a></p>
      </aside>
    </div>
    <h2 style={{marginTop:48}}>Contact questions</h2>
    <div className="faqs">{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
  </section>
  <StructuredData data={[{...typedPageSchema('ContactPage',title,description,'/contact'),mainEntity:{'@id':orgId},url:absolute('/contact')},faqSchema(faqs)]}/>
</main><Footer/></>;
}
