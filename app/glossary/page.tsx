import {Header,Footer,PageHero} from '../../components/ui';
import {Breadcrumbs,StructuredData} from '../../components/seo';
import {pageMetadata,glossarySchema,termId,typedPageSchema} from '../../lib/seo';
import {glossary} from '../../lib/answers';

const title='Staffing & Recruitment Glossary – Hiring Terms Explained';
const description='Plain-English definitions of hiring terms used in Pakistan: live-in and live-out staff, placement fee, police character certificate, CNIC, EOBI, probation and more.';
export const generateMetadata=()=>pageMetadata(title,description,'/glossary');

export default function Page(){const sorted=[...glossary].sort((a,b)=>a.term.localeCompare(b.term));return <><Header/><main>
  <PageHero eyebrow="Glossary" title="Staffing terms, explained simply." text="Quick definitions for the words you will meet when hiring household, office or remote staff in Pakistan."/>
  <section className="container page-content">
    <Breadcrumbs items={[{name:'Home',path:'/'},{name:'Glossary',path:'/glossary'}]}/>
    <dl className="glossary-list">{sorted.map(t=><div className="glossary-item" id={termId(t.term)} key={t.term}><dt>{t.term}</dt><dd className="speakable-answer">{t.definition}</dd></div>)}</dl>
    <p style={{marginTop:30}}>Ready to put these into practice? Read <a className="qa-link" href="/how-it-works">how hiring works</a> or browse <a className="qa-link" href="/faqs">common questions</a>.</p>
  </section>
  <StructuredData data={[typedPageSchema('CollectionPage',title,description,'/glossary'),glossarySchema('/glossary',glossary)]}/>
</main><Footer/></>}
