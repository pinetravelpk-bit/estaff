import {Header,Footer,PageHero} from '../../components/ui';
import {Breadcrumbs,StructuredData} from '../../components/seo';
import {pageMetadata,typedPageSchema,business} from '../../lib/seo';
import {locations} from '../../lib/content';

const title='Contact estaff.pk – Hire Staff in Islamabad & Rawalpindi';
const description='Contact estaff.pk to hire domestic staff, office teams or remote staff in Islamabad and Rawalpindi. Share your requirement and get the next step.';
export const metadata=pageMetadata(title,description,'/contact');

export default function Page(){const hasDirect=Boolean(business.phone||business.email||business.street);return <><Header/><main>
  <PageHero eyebrow="Contact" title="Let’s talk about your next hire." text="Tell us the role, the area and the schedule. We will help you work out the next step."/>
  <section className="container page-content">
    <Breadcrumbs items={[{name:'Home',path:'/'},{name:'Contact',path:'/contact'}]}/>
    <div className="contact-grid">
      <div>
        <span className="live-dot">Taking new requirements</span>
        <h2>Get your requirement ready</h2>
        <p>Before you get in touch, write down the role, your city and sector or society, working hours, live-in or live-out arrangement and your salary budget. A complete brief makes the first conversation much faster.</p>
        <p><a className="btn glow" href="/hire">Prepare your hiring brief</a></p>
        <h3 style={{marginTop:34}}>Looking for work?</h3>
        <p>Browse the kinds of roles we cover on the <a className="qa-link" href="/jobs">jobs page</a> and prepare your CV with the checklist in <a className="qa-link" href="/how-it-works#candidate-step-1">how it works</a>.</p>
      </div>
      <aside className="contact-card">
        <h3>estaff.pk</h3>
        {hasDirect?<ul>{business.phone&&<li>Phone: <a href={'tel:'+business.phone}>{business.phone}</a></li>}{business.email&&<li>Email: <a href={'mailto:'+business.email}>{business.email}</a></li>}{business.street&&<li>Office: {business.street}, {business.locality}{business.postalCode?' '+business.postalCode:''}, Pakistan</li>}</ul>:<p>Direct phone, WhatsApp and email details are being added to this page.</p>}
        <h4 style={{marginTop:22}}>Areas we serve</h4>
        {Object.entries(locations).map(([city,c])=><p key={city}><a href={'/areas/'+city}>{c.name}</a>: {c.areas.join(', ')}</p>)}
      </aside>
    </div>
  </section>
  <StructuredData data={typedPageSchema('ContactPage',title,description,'/contact')}/>
</main><Footer/></>}
