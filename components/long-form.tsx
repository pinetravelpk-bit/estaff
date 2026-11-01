import {CheckCircle2} from 'lucide-react';
import type {LongForm as LF} from '../lib/longform/types';
import {StructuredData} from './seo';
import {faqSchema} from '../lib/seo';

// Long-form guide shown on Tier 1 pages: a short answer first (for search and AI answers),
// then sections, an optional comparison table, a checklist and page-specific questions.
export function LongForm({lf,faqSchemaToo=false}:{lf:LF;faqSchemaToo?:boolean}){
  return <section className="longform" aria-label={lf.title}>
    <h2>{lf.title}</h2>
    <p className="answer-box lead-answer">{lf.answer}</p>
    {lf.sections.map(s=><div key={s.h} className="longform-section"><h3>{s.h}</h3>{s.p.map((x,i)=><p key={i}>{x}</p>)}{s.list&&<ul className="check-list">{s.list.map(x=><li key={x}><CheckCircle2 size={18}/> {x}</li>)}</ul>}</div>)}
    {lf.table&&<div className="longform-table"><h3>{lf.table.caption}</h3><div className="table-scroll"><table><thead><tr>{lf.table.head.map(h=><th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{lf.table.rows.map(r=><tr key={r[0]}>{r.map((c,i)=>i===0?<th key={i} scope="row">{c}</th>:<td key={i}>{c}</td>)}</tr>)}</tbody></table></div></div>}
    {lf.checklist&&<div className="longform-checklist"><h3>{lf.checklist.title}</h3><ol>{lf.checklist.items.map(x=><li key={x}>{x}</li>)}</ol></div>}
    {lf.faqs.length>0&&<><h3>{lf.faqTitle||'More questions'}</h3><div className="faqs">{lf.faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></>}
    {faqSchemaToo&&lf.faqs.length>0&&<StructuredData data={faqSchema(lf.faqs)}/>}
  </section>;
}
