import {BusinessExpansion} from '../components/business-expansion';
import {HomeEditorial} from '../components/editorial-sections';
import {pageMetadata} from '../lib/seo';
import {Header,Footer} from '../components/ui';
import HomeContent from '../components/home';import {StructuredData} from '../components/seo';import {webPageSchema,faqSchema} from '../lib/seo';import {faqs} from '../lib/content';
export const metadata=pageMetadata('Hire Staff in Islamabad & Rawalpindi','Find household and office staff in Islamabad and Rawalpindi. Explore recruitment, HR outsourcing, payroll, remote teams and local hiring guides.','/');
export default function Home(){return <><Header/><main><HomeContent/><BusinessExpansion/><HomeEditorial/><StructuredData data={[webPageSchema("Hire Staff in Islamabad & Rawalpindi","Staffing, recruitment, HR, payroll and remote staff for homes and businesses in Islamabad and Rawalpindi.","/"),faqSchema(faqs)]}/></main><Footer/></>}
