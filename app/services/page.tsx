import {services} from '../../lib/content';
import {Breadcrumbs,StructuredData} from '../../components/seo';import {listSchema} from '../../lib/seo';
import {pageMetadata} from '../../lib/seo';
import {Header,Footer,PageHero} from '../../components/ui';import {ServiceGrid} from '../../components/home';
export const generateMetadata=()=>pageMetadata('Staffing, HR & Recruitment Services','Explore domestic staffing, corporate recruitment, remote staffing, HR outsourcing, payroll, screening and bulk hiring services in Islamabad and Rawalpindi.','/services',true);
export default function Page(){return <><Header/><main><PageHero eyebrow="Our solutions" title="One partner for your people." text="Explore staffing, recruitment, HR and career support for the way you live and work."/><section className="container page-content"><Breadcrumbs items={[{name:"Home",path:"/"},{name:"Services",path:"/services"}]}/><ServiceGrid/><StructuredData data={listSchema("Staffing and HR services",services.map(s=>({name:s.name,path:"/services/"+s.slug})))}/></section></main><Footer/></>}
