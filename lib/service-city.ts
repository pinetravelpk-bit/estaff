// Business service × city pages (e.g. /services/payroll-management/lahore).
// Each page combines the service's scope with the city's economy, areas and
// province, plus the city keyword variants from the keyword plan.
import {services} from './content';
import {businessServices} from './business';
import {type City,allCities,provinces,nearbyCities} from './pakistan';
import {pick} from './national';
import {serviceVariants} from './service-variants';

export type CityService={slug:string;name:string;phrase:string;summary:string;scope:string[];detail:string;deliverable:string;fit:RegExp;fitText:string;roman?:string;steps:string[]};

const core=(slug:string)=>services.find(s=>s.slug===slug)!;
const biz=(slug:string)=>businessServices.find(s=>s.slug===slug)!;
const fromBiz=(slug:string,phrase:string,fit:RegExp,fitText:string,steps:string[],roman?:string):CityService=>{const b=biz(slug);return {slug,name:b.name,phrase,summary:b.summary,scope:b.scope,detail:b.detail,deliverable:b.deliverable,fit,fitText,steps,roman};};
const fromCore=(slug:string,phrase:string,deliverable:string,fit:RegExp,fitText:string,steps:string[],roman?:string):CityService=>{const c=core(slug);return {slug,name:c.name,phrase,summary:c.text,scope:c.roles,detail:c.detail,deliverable,fit,fitText,steps,roman};};

const recruitSteps=['Agree the role, salary range and interview panel','Source and screen candidates against the brief','Present a shortlist with interview notes','Coordinate interviews, offers and joining'];
const hrSteps=['Map current HR and payroll processes','Agree scope, approvals and a monthly calendar','Set up records and reporting','Run, review and improve each cycle'];

export const cityServices:CityService[]=[
  fromCore('corporate-recruitment','Recruitment Agency','A role brief, a screened shortlist and a coordinated interview and offer process.',/./,'every kind of employer, from offices and shops to factories and schools',recruitSteps,'mulazim faraham karne wali agency'),
  fromCore('bulk-hiring','Bulk Recruitment Services','A shared hiring plan with headcount, priorities, interview capacity and joining dates.',/industr|textile|mill|manufactur|factor|port|cement|fertili|sugar|trade|retail|rice|logistic/i,'growing businesses that need several people at once',recruitSteps,'naukron ki agency'),
  fromBiz('executive-search','Executive Search Firm',/government|finance|industr|textile|export|port|services|IT/i,'leadership roles in established local and national companies',['Define the leadership mandate and scorecard','Map and approach candidates confidentially','Assess with structured interviews','Support offer and transition']),
  fromBiz('technical-recruitment','Technical Recruitment Agency',/IT|software|engineering|education|university|industr|power|energy|oil|gas|defence/i,'technology, engineering and technical teams',recruitSteps),
  fromBiz('industrial-staffing','Industrial Staffing Agency',/industr|textile|mill|manufactur|factor|cement|fertili|sugar|steel|ceramic|leather|oil|gas|power|mining|port|rice/i,'factories, mills, plants and project sites',['Agree shifts, safety rules and headcount','Recruit and verify workers','Plan joining and site induction','Review attendance and replacements']),
  fromCore('hr-outsourcing','HR Outsourcing Services','Consistent employee records, onboarding steps and a monthly HR routine you approve.',/./,'small and mid-sized businesses without a full HR team',hrSteps),
  fromCore('payroll-management','Payroll Outsourcing','A reviewed monthly payroll, payslips and reports, with an approval trail.',/./,'any business paying staff every month',hrSteps,'tankhwa processing services'),
  fromCore('staff-screening','Background Check Services','A screening scope agreed per role, with evidence you can review before deciding.',/./,'employers and households who want checks before someone starts',['Agree which checks the role needs','Collect candidate consent','Verify identity, references and documents','Share findings and limits clearly'],'staff ki tasdeeq aur mulazim ka background check'),
  fromCore('remote-staff','Remote Staffing Agency','Dedicated remote people with agreed outcomes, overlap hours and a reporting rhythm.',/IT|software|education|university|services|finance/i,'businesses that want dedicated people working remotely',['Define outcomes and overlap hours','Recruit and run a practical task','Onboard with tools and access','Set daily and weekly reporting']),
  fromBiz('business-process-outsourcing','Business Process Outsourcing',/IT|services|finance|port|trade|government|education/i,'back-office, data and customer-support work',['Document the process and volumes','Agree quality and turnaround measures','Set up the team and tools','Report and improve each month']),
  fromBiz('hr-consultancy','HR Consultancy Services',/./,'businesses formalising policies, structures and HR practice',['Review current policies and structure','Agree priorities and deliverables','Draft policies and frameworks','Support roll-out with managers']),
  fromBiz('hris-support','HRIS Implementation Support',/IT|services|industr|textile|finance|education|government/i,'businesses moving HR and attendance to software',['Map HR data and workflows','Configure the system and roles','Migrate and test records','Train users and go live']),
  fromBiz('training-development','Employee Training Services',/./,'teams that need practical skills and onboarding programmes',['Identify skills gaps','Design sessions around real work','Deliver and gather feedback','Measure and follow up']),
  fromBiz('facility-management','Facility Management Services',/government|services|education|university|finance|IT|port|trade/i,'offices, schools, clinics and commercial buildings',['Survey the site and service needs','Agree staffing levels and schedules','Recruit and deploy support staff','Supervise and review quality']),
];
export const cityService=(slug:string)=>cityServices.find(s=>s.slug===slug);
export const serviceCityPath=(service:string,city:string)=>`/services/${service}/${city}`;
export const cityForService=(slug:string)=>allCities.find(c=>c.slug===slug);

export function serviceCityContent(s:CityService,c:City){
  const p=provinces[c.province].name;const seed=s.slug+c.slug;
  const h1=`${s.phrase} in ${c.name}`;
  const variants=(serviceVariants[s.slug]||[]).map(v=>v.replace('{CITY}',c.name));
  const strong=s.fit.test(c.economy);
  const answer=pick(seed+'a',[
    `estaff.pk provides ${s.name.toLowerCase()} for employers in ${c.name}, ${p}. Share what you need, the size of your team and your timeline, and the scope, fees and deliverables are agreed in writing before work begins.`,
    `Looking for ${s.phrase.toLowerCase()} in ${c.name}? estaff.pk works with ${s.fitText} in ${c.name}: you share the brief, agree the scope and fee in writing, and receive ${s.deliverable.charAt(0).toLowerCase()+s.deliverable.slice(1)}`,
    `For businesses in ${c.name}, estaff.pk offers ${s.name.toLowerCase()} delivered to an agreed scope. ${s.summary}`,
  ]);
  const local=[
    strong
      ?pick(seed+'s',[`${c.name}’s economy is built on ${c.economy}, which makes ${s.name.toLowerCase()} especially relevant for ${s.fitText} here.`,`With ${c.economy} driving local business, employers in ${c.name} regularly need ${s.name.toLowerCase()} for ${s.fitText}.`,`In a city shaped by ${c.economy}, ${s.fitText} in ${c.name} often turn to ${s.name.toLowerCase()} as they grow.`])
      :pick(seed+'w',[`${c.name}’s economy centres on ${c.economy}. Businesses here that need ${s.name.toLowerCase()} are often smaller teams, so a clear, right-sized scope matters more than a large programme.`,`Even outside the largest business hubs, employers in ${c.name} benefit from ${s.name.toLowerCase()}, especially when the scope is matched to a smaller team and local working patterns.`]),
    pick(seed+'l',[`${c.local}`,`Local context: ${c.local.charAt(0).toLowerCase()+c.local.slice(1)}`]),
    pick(seed+'g',[`Work for ${c.name} employers is coordinated remotely and on site as agreed, covering businesses in areas such as ${c.areas.slice(0,3).join(', ')}.`,`Whether your business is in ${c.areas[0]} or ${c.areas[c.areas.length-1]}, tell us the exact workplace so travel and on-site needs are planned from the start.`,`Employers across ${c.name}, from ${c.areas[0]} to ${c.areas[Math.min(2,c.areas.length-1)]}, can start with a short brief and a call to agree scope.`]),
  ];
  const faqs:[string,string][]=[
    [`Does estaff.pk offer ${s.name.toLowerCase()} in ${c.name}?`,answer],
    [`How much does ${s.name.toLowerCase()} cost in ${c.name}?`,pick(seed+'c',[`Fees depend on the scope, headcount, seniority and timeline. estaff.pk agrees the fee and what is included in writing before starting; there is no fixed price list for ${c.name}.`,`It depends on what you need. For ${c.name} employers the fee is quoted after the scope is agreed, and it covers only what is written in that scope.`])],
    [`How long does it take in ${c.name}?`,pick(seed+'t',[`Timelines depend on the scope, the market for the skills involved in ${c.name} and how quickly decisions are made on your side. A realistic plan is agreed at the start.`,`There is no fixed timeline. Clear inputs and quick feedback from your team are what shorten it most for businesses in ${c.name}.`])],
    [`What do I need to share to get started in ${c.name}?`,`Your business name and location in ${c.name}, what you need done, team size, timeline, budget range and who will approve decisions.`],
    [`Can you support businesses in other cities of ${p} too?`,`Yes. Alongside ${c.name}, estaff.pk has guides for ${nearbyCities(c,4).map(n=>n.name).join(', ')} and other cities across Pakistan.`],
  ];
  if(s.roman)faqs.push([`${c.name} mein ${s.roman} chahiye?`,`Jee haan. Apni zaroorat, team ka size, waqt aur budget batayein. estaff.pk ${c.name} ke karobari idaron ke liye kaam ka daira aur fee pehle likh kar tay karta hai.`]);
  return {h1,answer,local,variants,faqs};
}
