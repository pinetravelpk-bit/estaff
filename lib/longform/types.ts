// Long-form, page-specific guide content for Tier 1 pages.
export type LongForm={
  title:string;            // H2 for the guide
  answer:string;           // 40–80 word direct answer shown first
  sections:{h:string;p:string[];list?:string[]}[];
  table?:{caption:string;head:string[];rows:string[][]};
  checklist?:{title:string;items:string[]};
  faqTitle?:string;
  faqs:[string,string][];
};
