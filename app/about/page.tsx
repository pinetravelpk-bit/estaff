import {Home,Building2,Laptop,ShieldCheck,MapPin,Handshake} from 'lucide-react';
import {Header,Footer,PageHero} from '../../components/ui';
import {Breadcrumbs,StructuredData} from '../../components/seo';
import {StatsBand,LocalCoverage} from '../../components/seo-sections';
import {pageMetadata,typedPageSchema} from '../../lib/seo';
import {brand} from '../../lib/answers';

const title='About estaff.pk – Staffing & Recruitment in Islamabad and Rawalpindi';
const description='estaff.pk helps families and businesses in Islamabad and Rawalpindi hire domestic staff, office teams and remote staff, with HR and payroll support.';
export const metadata=pageMetadata(title,description,'/about');

const pillars=[
  {icon:Home,title:'Staff for your home',text:'Cooks, drivers, maids, nannies, home nurses, care attendants, gardeners and domestic couples, live-in or live-out.'},
  {icon:Building2,title:'Teams for your business',text:'Administration, accounts, sales, customer support, IT and office support staff, from one hire to a full team.'},
  {icon:Laptop,title:'Remote staff',text:'Virtual assistants, bookkeepers, developers and support agents who work remotely with agreed overlap hours.'},
  {icon:ShieldCheck,title:'Screening you can review',text:'Identity, reference, licence and document checks agreed for each role, with the evidence shared before you decide.'},
  {icon:Handshake,title:'Terms in writing',text:'Salary, duties, leave, notice, fees and any replacement support confirmed in writing before the start date.'},
  {icon:MapPin,title:'Local focus',text:'Sectors across Islamabad, from F-6 to DHA, and neighbourhoods across Rawalpindi, from Saddar to Bahria Town.'},
];

export default function Page(){return <><Header/><main>
  <PageHero eyebrow="About estaff.pk" title="People for your home. Teams for your business." text="A local staffing and recruitment partner for Islamabad and Rawalpindi."/>
  <section className="container page-content">
    <Breadcrumbs items={[{name:'Home',path:'/'},{name:'About',path:'/about'}]}/>
    <h2>What is estaff.pk?</h2>
    <p className="answer-box lead-answer">{brand.definition}</p>
    <p>Hiring the right person starts with a clear understanding of the work. That is why every estaff.pk requirement begins with a hiring brief: the duties, working hours, location, salary budget and start date. With that brief in place, families and employers can compare candidates fairly, ask better interview questions and agree terms that both sides understand.</p>
    <p>estaff.pk focuses on two neighbouring cities, Islamabad and Rawalpindi, so its guides can speak to local realities: commuting between sectors, live-in arrangements in larger homes, and the documents households commonly ask for before someone starts work.</p>
    <div className="about-grid">{pillars.map(({icon:I,title,text})=><div className="about-card" key={title}><I/><h3>{title}</h3><p>{text}</p></div>)}</div>
    <h2>How estaff.pk keeps information honest</h2>
    <p>The guides on this site explain hiring requirements, service scopes and good practice. They do not promise immediate availability, guaranteed placements or fixed timelines, because these depend on every individual requirement. Fees, screening scope and replacement terms are always confirmed in writing for your role. Images on the site are illustrative and are not photographs of real candidates.</p>
    <p><a className="btn glow" href="/hire">Share your requirement</a></p>
  </section>
  <StatsBand/>
  <LocalCoverage/>
  <StructuredData data={typedPageSchema('AboutPage',title,description,'/about')}/>
</main><Footer/></>}
