import {TrustSection} from '../components/trust';
import {BusinessExpansion} from '../components/business-expansion';
import {HomeEditorial} from '../components/editorial-sections';
import {Header,Footer} from '../components/ui';
import HomeContent from '../components/home';
import {StructuredData} from '../components/seo';
import {CityDirectory} from '../components/city-directory';
import {RoleMarquee,StatsBand,QuickAnswers,ProcessTimeline,LocalCoverage} from '../components/seo-sections';
import {pageMetadata,speakablePageSchema,howToSchema,faqSchema} from '../lib/seo';
import {faqs} from '../lib/content';
import {quickAnswers,brand,hiringSteps} from '../lib/answers';
import {getSettings} from '../lib/settings';

export const generateMetadata=()=>pageMetadata('Domestic Staff Agency & Recruitment Services in Pakistan','Cooks, drivers, maids, nannies and care staff for homes, plus recruitment, HR outsourcing, payroll and remote teams for businesses across Pakistan.','/');

// Hero text/image and which sections show are controlled from the dashboard (Content).
export default function Home(){
  const {hero,sections:on}=getSettings();
  return <><Header/><main>
    <HomeContent hero={hero} trust={<TrustSection/>}/>
    {on.marquee&&<RoleMarquee/>}
    {on.stats&&<StatsBand/>}
    {on.quickAnswers&&<QuickAnswers/>}
    {on.process&&<ProcessTimeline/>}
    {on.business&&<BusinessExpansion/>}
    {on.coverage&&<LocalCoverage/>}
    {on.cities&&<section className="container home-cities"><CityDirectory/><p><a className="qa-link" href="/areas">See every city and area →</a></p></section>}
    {on.editorial&&<HomeEditorial/>}
    <StructuredData data={[speakablePageSchema('Domestic Staff Agency & Recruitment Services in Pakistan',brand.definition,'/',['.lead-answer','.speakable-answer']),faqSchema([...faqs,...(on.quickAnswers?quickAnswers.map(x=>[x.q,x.a]):[])]),howToSchema('How to hire domestic staff in Pakistan','Five steps to hire household or office staff through estaff.pk.','/',hiringSteps)]}/>
  </main><Footer/></>;
}
