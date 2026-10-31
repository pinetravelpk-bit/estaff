import {services} from '../../lib/content';
import {Breadcrumbs,StructuredData} from '../../components/seo';
import {listSchema,faqSchema,pageMetadata,speakablePageSchema} from '../../lib/seo';
import {Header,Footer,PageHero} from '../../components/ui';
import {ServiceGrid} from '../../components/home';
import {cityServices,serviceCityPath} from '../../lib/service-city';

export const generateMetadata=()=>pageMetadata('Staffing, HR & Recruitment Services in Pakistan','Domestic staffing, corporate recruitment, remote staff, HR outsourcing, payroll, screening and bulk hiring for homes and businesses across Pakistan.','/services');
const answer='estaff.pk offers domestic staffing for homes (cooks, drivers, maids, nannies, care staff), recruitment and bulk hiring for businesses, remote staff, HR outsourcing, payroll management, staff screening and specialist services such as executive search and industrial staffing, across 106 cities in Pakistan.';
const faqs:[string,string][]=[
  ['Which staffing services does estaff.pk offer?',answer],
  ['Do you work with households and businesses?','Yes. Households hire cooks, drivers, maids, nannies, elderly care attendants, home nurses, gardeners and caretakers. Businesses use recruitment, bulk hiring, executive search, HR outsourcing, payroll and remote staffing.'],
  ['Which cities do you cover?','Guides and services cover 106 cities across Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, Islamabad, Azad Jammu and Kashmir and Gilgit-Baltistan, with the most detailed local coverage in Islamabad and Rawalpindi.'],
  ['How are fees agreed?','Fees depend on the service, the role and the scope. They are agreed in writing before work starts, and job seekers are never charged.'],
];

export default function Page(){return <><Header/><main>
  <PageHero eyebrow="Our solutions" title="Staffing, recruitment and HR services in Pakistan" text="One partner for the people in your home and your business, from a single cook to a whole team."/>
  <section className="container page-content">
    <Breadcrumbs items={[{name:'Home',path:'/'},{name:'Services',path:'/services'}]}/>
    <p className="answer-box lead-answer">{answer}</p>
    <ServiceGrid/>
    <h2 style={{marginTop:56}}>Popular services by city</h2>
    <div className="area-chips">{cityServices.slice(0,6).flatMap(s=>['lahore','karachi','islamabad'].map(c=><a key={s.slug+c} href={serviceCityPath(s.slug,c)}>{s.phrase} in {c[0].toUpperCase()+c.slice(1)}</a>))}</div>
    <h2 style={{marginTop:48}}>Questions about our services</h2>
    <div className="faqs">{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
  </section>
  <StructuredData data={[speakablePageSchema('Staffing, HR & Recruitment Services in Pakistan',answer,'/services',['.lead-answer']),listSchema('Staffing and HR services',services.map(s=>({name:s.name,path:'/services/'+s.slug}))),faqSchema(faqs)]}/>
</main><Footer/></>}
