import {BusinessExpansion} from '../components/business-expansion';
import {HomeEditorial} from '../components/editorial-sections';
import {pageMetadata} from '../lib/seo';
import {Header,Footer} from '../components/ui';
import HomeContent from '../components/home';import {StructuredData} from '../components/seo';import {webPageSchema,faqSchema} from '../lib/seo';import {faqs} from '../lib/content';
import {RoleMarquee,StatsBand,QuickAnswers,ProcessTimeline,LocalCoverage} from '../components/seo-sections';
import {quickAnswers,brand} from '../lib/answers';
import {speakablePageSchema,howToSchema} from '../lib/seo';
import {hiringSteps} from '../lib/answers';
export const metadata=pageMetadata('Hire Staff in Islamabad & Rawalpindi','Find household and office staff in Islamabad and Rawalpindi. Explore recruitment, HR outsourcing, payroll, remote teams and local hiring guides.','/');
export default function Home(){return <><Header/><main><HomeContent/><RoleMarquee/><StatsBand/><QuickAnswers/><ProcessTimeline/><BusinessExpansion/><LocalCoverage/><HomeEditorial/><StructuredData data={[speakablePageSchema("Hire Staff in Islamabad & Rawalpindi",brand.definition,"/",[".lead-answer",".speakable-answer"]),faqSchema([...faqs,...quickAnswers.map(x=>[x.q,x.a])]),howToSchema("How to hire staff in Islamabad and Rawalpindi","Five steps to hire household or office staff through estaff.pk.","/",hiringSteps)]}/></main><Footer/></>}
