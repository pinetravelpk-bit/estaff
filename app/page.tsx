import {BusinessExpansion} from '../components/business-expansion';
import {HomeEditorial} from '../components/editorial-sections';
import {pageMetadata} from '../lib/seo';
import {Header,Footer} from '../components/ui';
import HomeContent from '../components/home';import {StructuredData} from '../components/seo';import {webPageSchema,faqSchema} from '../lib/seo';import {faqs} from '../lib/content';
import {CityDirectory} from '../components/city-directory';
import {RoleMarquee,StatsBand,QuickAnswers,ProcessTimeline,LocalCoverage} from '../components/seo-sections';
import {quickAnswers,brand} from '../lib/answers';
import {speakablePageSchema,howToSchema} from '../lib/seo';
import {hiringSteps} from '../lib/answers';
export const metadata=pageMetadata('Domestic Staff Agency & Recruitment Services in Pakistan','Cooks, drivers, maids, nannies and care staff for homes, plus recruitment, HR outsourcing, payroll and remote teams for businesses across Pakistan.','/');
export default function Home(){return <><Header/><main><HomeContent/><RoleMarquee/><StatsBand/><QuickAnswers/><ProcessTimeline/><BusinessExpansion/><LocalCoverage/><section className="container home-cities"><CityDirectory/><p><a className="qa-link" href="/areas">See every city and area →</a></p></section><HomeEditorial/><StructuredData data={[speakablePageSchema("Domestic Staff Agency & Recruitment Services in Pakistan",brand.definition,"/",[".lead-answer",".speakable-answer"]),faqSchema([...faqs,...quickAnswers.map(x=>[x.q,x.a])]),howToSchema("How to hire domestic staff in Pakistan","Five steps to hire household or office staff through estaff.pk.","/",hiringSteps)]}/></main><Footer/></>}
