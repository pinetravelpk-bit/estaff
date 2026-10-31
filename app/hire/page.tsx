import {pageMetadata} from '../../lib/seo';
import {Header,Footer,PageHero,Check} from '../../components/ui';
import HiringForm from '../../components/hiring-form';
import {allCities} from '../../lib/pakistan';

export const generateMetadata=()=>pageMetadata('Request Staff – Domestic, Office & Remote Staff in Pakistan','Send your staffing requirement to estaff.pk: cooks, drivers, maids, nannies, care staff, office teams and remote staff in any city of Pakistan.','/hire');

export default function Page(){return <><Header/><main>
  <PageHero eyebrow="Let’s find your people" title="Tell us who you need." text="Share the role, location and working arrangement. The estaff.pk team will call you to discuss candidates and terms."/>
  <section className="container page-content two-col">
    <div className="panel"><HiringForm cities={allCities.map(c=>({slug:c.slug,name:c.name}))}/></div>
    <aside className="stack">
      <div className="panel tint"><h2 className="h3">A clear brief. A better fit.</h2><ul className="bullet-list">{['Define the role and daily duties','Choose your area and schedule','Set a realistic salary budget','Discuss the checks you need','Review written placement terms'].map(x=><li key={x}><Check size={17}/>{x}</li>)}</ul></div>
      <div className="panel"><h2 className="h3">Hiring more than one person?</h2><p>Include your total headcount, role priorities and preferred joining dates in the details field.</p></div>
      <div className="panel"><h2 className="h3">Looking for a job instead?</h2><p>See <a className="qa-link" href="/jobs">current jobs</a> or <a className="qa-link" href="/jobs/apply">submit your CV</a>.</p></div>
    </aside>
  </section>
</main><Footer/></>}
