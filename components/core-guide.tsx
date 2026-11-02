import {LongForm} from './long-form';
import {coreGuidesA} from '../lib/longform/core-a';
import {coreGuidesB} from '../lib/longform/core-b';
import {coreMore} from '../lib/longform/core-more';
import {coreMore2} from '../lib/longform/core-more2';
import {coreMore3} from '../lib/longform/core-more3';
import {coreFaqs} from '../lib/longform/core-faqs';
import {coreMore4} from '../lib/longform/core-more4';

// Long-form guide for a core page, shown below the page's main content.
export function CoreGuide({path,schema=true}:{path:string;schema?:boolean}){
  const base=coreGuidesA[path]||coreGuidesB[path];if(!base)return null;
  const extras=[coreMore[path],coreMore2[path],coreMore3[path],coreMore4[path]].filter(Boolean) as {sections:typeof base.sections;faqs?:[string,string][]}[];
  const lf={...base,sections:[...base.sections,...extras.flatMap(e=>e.sections)],faqs:[...base.faqs,...extras.flatMap(e=>e.faqs||[]),...(coreFaqs[path]||[])]};
  return <section className="container page-content core-guide"><LongForm lf={lf} faqSchemaToo={schema}/></section>;
}
