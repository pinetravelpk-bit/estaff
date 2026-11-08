// Short, self-contained answers written to be quoted directly by search engines,
// voice assistants and AI answer engines. Lead with the answer, then the detail.
import {services,locations} from './content';
import {roles} from './roles';
import {careServices} from './home-care';
import {allCities,nationalCities} from './pakistan';
import {cityServices} from './service-city';

export const brand={
  name:'estaff.pk',
  alternateNames:['eStaff','estaff','eStaff Pakistan','estaff Pakistan'],
  slogan:'People. Payroll. Possibilities.',
  definition:'estaff.pk is a staffing and recruitment service for homes and businesses across Pakistan, with its strongest local focus on Islamabad and Rawalpindi. It helps families hire domestic staff such as cooks, drivers, maids, nannies and care attendants, and helps businesses with office recruitment, HR outsourcing, payroll management and remote staff.',
};

const islamabadAreas=locations.islamabad.areas;
const rawalpindiAreas=locations.rawalpindi.areas;
const listAreas=(a:string[])=>a.slice(0,-1).join(', ')+' and '+a[a.length-1];

export type QuickAnswer={q:string;a:string;href:string;link:string};
export const quickAnswers:QuickAnswer[]=[
  {q:'What is estaff.pk?',a:brand.definition,href:'/about',link:'About estaff.pk'},
  {q:'How do I hire a maid, cook or driver in Islamabad?',a:'Write down the duties, working hours, live-in or live-out arrangement, salary budget and your sector. Share that brief with estaff.pk, review the shortlisted candidates, interview them, check their CNIC and references, then agree the terms in writing before the start date.',href:'/how-it-works',link:'See the hiring process'},
  {q:'Which areas does estaff.pk cover?',a:`estaff.pk has guides for 106 cities across Pakistan, including Lahore, Karachi, Faisalabad, Multan, Peshawar and Quetta, with its most detailed local focus on Islamabad and Rawalpindi. In Islamabad that includes ${listAreas(islamabadAreas)}. In Rawalpindi it includes ${listAreas(rawalpindiAreas)}.`,href:'/areas',link:'Browse all areas'},
  {q:'What should I check before hiring household staff?',a:'Check the original CNIC against the copy you keep, call at least two previous employers, and ask for a police character certificate where the role involves access to your home, children or vehicle. Drivers should show a valid driving licence for the vehicle they will drive.',href:'/services/staff-screening',link:'Staff screening guide'},
  {q:'What is the difference between live-in and live-out staff?',a:'Live-in staff stay at your home and usually need a private room, meals and agreed rest hours and days off. Live-out staff travel in for fixed hours each day. Live-in suits early, late or childcare duties; live-out suits set daytime routines.',href:'/glossary',link:'Staffing terms explained'},
  {q:'How long does it take to hire domestic or office staff?',a:'It depends on the role, salary, location and how quickly you can interview. A complete brief with duties, hours, budget and area is the biggest factor in a faster hire. estaff.pk does not promise a fixed timeline because availability changes for every requirement.',href:'/hire',link:'Start a hiring brief'},
  {q:'Can businesses hire office or remote staff through estaff.pk?',a:'Yes. Businesses can recruit administration, accounts, sales, customer support and IT staff in Islamabad and Rawalpindi, or remote staff such as virtual assistants, bookkeepers and developers. Overlap hours, tools and contract terms are agreed for each role.',href:'/services/corporate-recruitment',link:'Corporate recruitment'},
  {q:'How much does estaff.pk charge?',a:'Fees depend on the role and the screening included. estaff.pk confirms the fee and payment timing in writing before you proceed, so there are no hidden charges, and every placement includes a 6-month free replacement.',href:'/faqs',link:'Read all questions'},
];

export type Step={title:string;text:string};
export const hiringSteps:Step[]=[
  {title:'Share your requirement',text:'Tell us the role, the city and sector or society, and whether it is for your home or business.'},
  {title:'Define a clear brief',text:'Agree the duties, working hours, live-in or live-out arrangement, salary budget and start date.'},
  {title:'Review a shortlist',text:'Look at suitable candidates with their experience, references and the screening completed so far.'},
  {title:'Interview and trial',text:'Meet candidates, ask role-specific questions and, where it makes sense, arrange a paid trial day.'},
  {title:'Confirm terms and start',text:'Put the salary, duties, leave, notice and any fees or replacement terms in writing before day one.'},
];

export const candidateSteps:Step[]=[
  {title:'Choose your role',text:'Pick the kind of work you want, from household roles to office, support and remote jobs.'},
  {title:'Prepare your CV',text:'List your previous employers, duties, years of experience and two people who can give a reference.'},
  {title:'Keep documents ready',text:'Have your CNIC, any driving licence or certificates, and a police character certificate if you have one.'},
  {title:'Interview with care',text:'Ask about duties, hours, salary, leave and accommodation before you accept an offer.'},
];

export type Term={term:string;definition:string};
export const glossary:Term[]=[
  {term:'Live-in staff',definition:'Household staff who stay at the employer’s home, usually with a private room, meals, agreed working hours, rest time and weekly days off.'},
  {term:'Live-out staff',definition:'Household or office staff who travel to work and return home each day after fixed working hours.'},
  {term:'Hiring brief',definition:'A short written description of a role: duties, working hours, location, salary budget, start date and any must-have skills or documents.'},
  {term:'Shortlist',definition:'A small group of candidates selected from all applicants because they match the hiring brief, ready for interview.'},
  {term:'Placement fee',definition:'The fee a recruitment service charges when a candidate is hired. The amount and timing should be confirmed in writing before you proceed.'},
  {term:'Replacement period',definition:'An agreed window after a hire during which a recruitment service may help find a replacement if the placement ends. Terms vary and must be written down.'},
  {term:'Trial day',definition:'A short paid working period where a candidate does the real duties so both sides can judge the fit before a longer commitment.'},
  {term:'CNIC',definition:'Computerised National Identity Card issued by NADRA in Pakistan. Employers commonly check the original card and keep a copy on file.'},
  {term:'Police character certificate',definition:'A certificate issued by the police in Pakistan stating whether a person has a criminal record in that jurisdiction. Often requested for household and driving roles.'},
  {term:'Reference check',definition:'Contacting a candidate’s previous employers to confirm their duties, length of service, reliability and reason for leaving.'},
  {term:'Probation period',definition:'An initial period of employment, often one to three months, used to confirm that the role and the person are a good fit.'},
  {term:'Notice period',definition:'The amount of time an employer or employee must give before ending employment, as agreed in the contract or offer letter.'},
  {term:'EOBI',definition:'Employees’ Old-Age Benefits Institution, the federal body in Pakistan that runs old-age pension contributions for registered employers and their eligible employees.'},
  {term:'HR outsourcing',definition:'Handing routine people operations such as employee records, onboarding, attendance and leave tracking to an external provider.'},
  {term:'Payroll management',definition:'Preparing monthly salaries from approved attendance, allowances and deductions, then producing payslips and payroll reports for approval.'},
  {term:'Remote staff',definition:'Employees or contractors who work from outside the employer’s office, often from another city or country, using agreed tools and overlap hours.'},
  {term:'Bulk hiring',definition:'Recruiting several people for the same or related roles at once, with a shared plan for interviews, start dates and onboarding.'},
  {term:'Employer of Record (EOR)',definition:'A company that legally employs staff on behalf of another business and handles contracts, payroll and compliance in that country.'},
];

export const extraFaqs:[string,string][]=[
  ['Which areas of Islamabad and Rawalpindi do you cover?',quickAnswers[2].a],
  ['What is the difference between live-in and live-out domestic staff?',quickAnswers[4].a],
  ['What documents should I check before hiring a maid or driver?',quickAnswers[3].a],
  ['How long does it take to hire domestic or office staff?',quickAnswers[5].a],
  ['Do you place staff in Lahore, Karachi or other cities?','estaff.pk currently focuses on Islamabad and Rawalpindi for household and office hiring. Remote roles such as virtual assistants, bookkeeping and customer support can be filled with people working from other cities.'],
  ['Can overseas businesses hire remote staff from Pakistan?','Yes, you can discuss remote roles with estaff.pk. Agree the working hours overlap with your time zone, the tools and access the person needs, and how the contract and payments will work before the hire.'],
];

// Real counts from the site's own content, used for the stats band.
const areaCount=islamabadAreas.length+rawalpindiAreas.length;
export const siteStats=[
  {value:allCities.length,suffix:'',label:'Cities served',note:'Across every province'},
  {value:areaCount+nationalCities.reduce((n,c)=>n+c.areas.length,0),suffix:'+',label:'Local areas',note:'Sectors, towns and societies'},
  {value:services.length,suffix:'',label:'Staffing services',note:'Home, business & remote'},
  {value:cityServices.length*allCities.length,suffix:'+',label:'City service pages',note:'Recruitment, HR, payroll & more'},
  {value:areaCount*careServices.length+nationalCities.length*careServices.length+nationalCities.reduce((n,c)=>n+c.areas.length,0),suffix:'+',label:'Local hiring guides',note:'Role by city and area'},
];

export const marqueeRoles=roles.map(r=>r.name);
export const marqueeAreas=[...islamabadAreas.map(a=>a+', Islamabad'),...rawalpindiAreas.map(a=>a+', Rawalpindi')];
