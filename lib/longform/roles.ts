import type {LongForm} from './types';
import {householdRoleGuides} from './roles-household';
import {officeRoleGuides} from './roles-office';
import {roleInterview} from './roles-interview';
import {roleExamples,officeTerms} from './roles-examples';
import {roleMore} from './roles-more';
import {roleFinal} from './roles-final';
import {roleFinal2} from './roles-final2';
import {roleFinal3} from './roles-final3';
import {roleFaqsExtra} from './roles-faqs';

// Full guide for a service role page: the written guide plus interview questions,
// first-week plan, a worked example and (for office and remote roles) pay and terms.
export function roleGuide(slug:string):LongForm|null{
  const base=householdRoleGuides[slug]||officeRoleGuides[slug];if(!base)return null;
  const iv=roleInterview[slug],ex=roleExamples[slug],terms=officeTerms[slug];
  const sections=[...base.sections];
  if(terms)sections.push({h:'Pay, hours and contract terms',p:terms});
  if(iv)sections.push({h:'Interview questions to ask',p:['Use these questions to see how candidates think about the real work, not just their CV.'],list:iv.questions},{h:'A good first week',p:[iv.note],list:iv.firstWeek});
  if(ex)sections.push(ex);
  const m=roleMore[slug];
  if(m?.market)sections.push(m.market);
  if(roleFinal[slug])sections.push(...roleFinal[slug]);
  if(roleFinal2[slug])sections.push(...roleFinal2[slug]);
  if(roleFinal3[slug])sections.push(...roleFinal3[slug]);
  if(m)sections.push({h:'Mistakes to avoid',p:['These are the most common reasons this kind of hire goes wrong:'],list:m.mistakes});
  return {...base,sections,faqs:[...base.faqs,...(m?.faqs||[]),...(roleFaqsExtra[slug]||[])]};
}
