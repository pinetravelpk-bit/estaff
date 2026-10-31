import {ArrowRight,BookOpen} from 'lucide-react';
import {Header,Footer,PageHero} from '../../components/ui';
import {Breadcrumbs,StructuredData} from '../../components/seo';
import {pageMetadata,listSchema,typedPageSchema} from '../../lib/seo';
import {allArticles} from '../../lib/blog-store';

export const revalidate=3600;
const title='Hiring Guides & Blog – Domestic Staff, Recruitment, HR and Payroll in Pakistan';
const description='Practical guides on hiring cooks, drivers, maids, nannies and care staff, plus recruitment, HR outsourcing, payroll, screening and remote teams in Pakistan.';
export const generateMetadata=()=>pageMetadata(title,description,'/blog');

export default async function Page(){
  const articles=await allArticles();const cats=[...new Set(articles.map(a=>a.category))];
  return <><Header/><main>
    <PageHero eyebrow="estaff.pk blog" title="Hiring guides that answer real questions." text="Clear, practical advice for families, employers and job seekers across Pakistan."/>
    <section className="container page-content">
      <Breadcrumbs items={[{name:'Home',path:'/'},{name:'Blog',path:'/blog'}]}/>
      {cats.map(cat=><div key={cat} style={{marginBottom:48}}><h2>{cat}</h2><div className="qa-grid">{articles.filter(a=>a.category===cat).map(a=><a className="qa-card" key={a.slug} href={'/blog/'+a.slug}>{a.image?<img className="qa-card-img" src={a.image} alt="" loading="lazy"/>:<span className="qa-icon"><BookOpen size={20}/></span>}<h3>{a.title}</h3><p>{a.description}</p><span className="qa-link">Read · {a.readMins} min <ArrowRight size={15}/></span></a>)}</div></div>)}
    </section>
    <StructuredData data={[typedPageSchema('CollectionPage',title,description,'/blog'),listSchema('estaff.pk hiring guides',articles.map(a=>({name:a.title,path:'/blog/'+a.slug})))]}/>
  </main><Footer/></>;
}
