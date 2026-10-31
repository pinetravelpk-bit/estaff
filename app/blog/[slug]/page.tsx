import {notFound} from 'next/navigation';
import {ArrowRight} from 'lucide-react';
import {Header,Footer} from '../../../components/ui';
import {Breadcrumbs,StructuredData} from '../../../components/seo';
import {pageMetadata,faqSchema,articleSchema} from '../../../lib/seo';
import {articles,article} from '../../../lib/blog';

export function generateStaticParams(){return articles.map(a=>({slug:a.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const a=article(slug);if(!a)return {title:'Not found',robots:{index:false,follow:false}};const m=pageMetadata(a.title,a.description,'/blog/'+a.slug);return {...m,openGraph:{...m.openGraph,type:'article',publishedTime:a.date}};}

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const a=article(slug);if(!a)notFound();
  const more=articles.filter(x=>x.slug!==a.slug&&x.category===a.category).slice(0,3);
  return <><Header/><main>
    <section className="page-hero"><div className="container"><span className="eyebrow">{a.category} · {a.readMins} min read</span><h1>{a.title}</h1><p>{a.description}</p><p className="muted-line">By the estaff.pk team · Published <time dateTime={a.date}>1 November 2026</time></p></div></section>
    <article className="container page-content blog-article">
      <Breadcrumbs items={[{name:'Home',path:'/'},{name:'Blog',path:'/blog'},{name:a.title,path:'/blog/'+a.slug}]}/>
      <p className="answer-box lead-answer">{a.intro}</p>
      <nav className="toc" aria-label="In this article"><strong>In this article</strong><ol>{a.sections.map((s,i)=><li key={s.h}><a href={'#s'+(i+1)}>{s.h}</a></li>)}</ol></nav>
      {a.sections.map((s,i)=><section key={s.h} id={'s'+(i+1)}><h2>{s.h}</h2>{s.p.map((t,j)=><p key={j}>{t}</p>)}{s.list&&<ul className="check-list">{s.list.map(x=><li key={x}>{x}</li>)}</ul>}</section>)}
      <h2>Frequently asked questions</h2>
      <div className="faqs">{a.faqs.map(([q,ans],i)=><details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{ans}</p></details>)}</div>
      <h2 style={{marginTop:40}}>Related</h2>
      <div className="area-chips">{a.related.map(r=><a key={r.href} href={r.href}>{r.label}</a>)}</div>
      {more.length>0&&<><h2 style={{marginTop:40}}>Keep reading</h2><div className="qa-grid">{more.map(m=><a className="qa-card" key={m.slug} href={'/blog/'+m.slug}><h3>{m.title}</h3><span className="qa-link">Read <ArrowRight size={15}/></span></a>)}</div></>}
    </article>
    <StructuredData data={[articleSchema(a),faqSchema(a.faqs)]}/>
  </main><Footer/></>;
}
