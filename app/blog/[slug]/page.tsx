import {notFound} from 'next/navigation';
import {ArrowRight} from 'lucide-react';
import {Header,Footer} from '../../../components/ui';
import {Breadcrumbs,StructuredData} from '../../../components/seo';
import {pageMetadata,faqSchema,articleSchema,absolute} from '../../../lib/seo';
import {allArticles,findArticle,builtInSlugs} from '../../../lib/blog-store';
import {markdownToHtml,headingsOf} from '../../../lib/markdown';

export const revalidate=3600;
export function generateStaticParams(){return builtInSlugs().map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const a=await findArticle(slug);if(!a)return {title:'Not found',robots:{index:false,follow:false}};
  const m=pageMetadata(a.title,a.description,'/blog/'+a.slug);
  return {...m,openGraph:{...m.openGraph,type:'article',publishedTime:a.date,...(a.image?{images:[{url:absolute(a.image),alt:a.title}]}:{})}};
}

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const a=await findArticle(slug);if(!a)notFound();
  const more=(await allArticles()).filter(x=>x.slug!==a.slug&&x.category===a.category).slice(0,3);
  const toc=a.body?headingsOf(a.body).map((h)=>({id:h.id,text:h.text})):a.sections.map((s,i)=>({id:'s'+(i+1),text:s.h}));
  const published=new Date(a.date).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
  return <><Header/><main>
    <section className="page-hero"><div className="container"><span className="eyebrow">{a.category} · {a.readMins} min read</span><h1>{a.title}</h1><p>{a.description}</p><p className="muted-line">By the estaff.pk team · Published <time dateTime={a.date}>{published}</time></p></div></section>
    <article className="container page-content blog-article">
      <Breadcrumbs items={[{name:'Home',path:'/'},{name:'Blog',path:'/blog'},{name:a.title,path:'/blog/'+a.slug}]}/>
      {a.image&&<img className="blog-cover" src={a.image} alt={a.title}/>}
      {!a.body&&<p className="answer-box lead-answer">{a.intro}</p>}
      {toc.length>1&&<nav className="toc" aria-label="In this article"><strong>In this article</strong><ol>{toc.map(t=><li key={t.id}><a href={'#'+t.id}>{t.text}</a></li>)}</ol></nav>}
      {a.body?<div className="post-body" dangerouslySetInnerHTML={{__html:markdownToHtml(a.body)}}/>:a.sections.map((s,i)=><section key={s.h} id={'s'+(i+1)}><h2>{s.h}</h2>{s.p.map((t,j)=><p key={j}>{t}</p>)}{s.list&&<ul className="check-list">{s.list.map(x=><li key={x}>{x}</li>)}</ul>}</section>)}
      {a.faqs.length>0&&<><h2>Frequently asked questions</h2><div className="faqs">{a.faqs.map(([q,ans],i)=><details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{ans}</p></details>)}</div></>}
      {a.related.length>0&&<><h2 style={{marginTop:40}}>Related</h2><div className="area-chips">{a.related.map(r=><a key={r.href} href={r.href}>{r.label}</a>)}</div></>}
      {more.length>0&&<><h2 style={{marginTop:40}}>Keep reading</h2><div className="qa-grid">{more.map(m=><a className="qa-card" key={m.slug} href={'/blog/'+m.slug}><h3>{m.title}</h3><span className="qa-link">Read <ArrowRight size={15}/></span></a>)}</div></>}
    </article>
    <StructuredData data={[articleSchema(a),...(a.faqs.length?[faqSchema(a.faqs)]:[])]}/>
  </main><Footer/></>;
}
