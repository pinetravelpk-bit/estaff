// Ongoing recruitment listings: one per role and city, for every role estaff.pk recruits
// for (Home & Care and Business Solutions menus). These are not single vacancies. Applicants
// join the shortlist that is shared, with their consent, with clients hiring for that role.
// Because they are not individual vacancies, these pages are noindex and never emit
// JobPosting schema (Google Jobs does not allow "talent pool" listings).
import type {Job,EmploymentType} from './store';
import {allCities,anyCity,provinces,type City} from './pakistan';
import {jobTypes} from './jobs';
import {pick} from './national';
import {getSettings} from './settings';
import {locations} from './content';
import {getActive,isLive} from './pool-active';

export type PoolRole={slug:string;title:string;sector:'home'|'business'|'remote';employmentType:EmploymentType;liveIn?:boolean;clients:string;menu:string;menuHref:string;duties:string[];requirements:string[];benefits:string[]};

const HOME='Households';
export const poolRoles:PoolRole[]=[
  // ---------- Home & Care ----------
  {slug:'cook',title:'Cook',sector:'home',employmentType:'FULL_TIME',clients:HOME,menu:'Cooks & Chefs',menuHref:'/services/domestic-staff/cooks-chefs',duties:['Cook daily family meals (Pakistani and, where you can, continental dishes)','Plan weekly menus and grocery lists with the family','Keep the kitchen, fridge and stores clean and safe'],requirements:['At least 1 year of cooking for a household, hotel or restaurant','CNIC and at least one reference you can share','Good hygiene and punctuality'],benefits:['Live-in or live-out options, depending on the family','Meals on duty days']},
  {slug:'driver',title:'Driver',sector:'home',employmentType:'FULL_TIME',clients:HOME+' and offices',menu:'Drivers',menuHref:'/services/domestic-staff/drivers',duties:['Drive family members or staff on school, office and personal routes','Keep the vehicle clean and arrange routine servicing','Keep a simple fuel and expense log'],requirements:['Valid driving licence for the vehicle type','CNIC and references from previous employers','Good knowledge of local routes'],benefits:['Fixed duty hours agreed before joining','Overtime for late or out-of-city trips, as agreed with the client']},
  {slug:'maid',title:'Maid / Housekeeper',sector:'home',employmentType:'FULL_TIME',clients:HOME,menu:'Maids & Housekeepers',menuHref:'/services/domestic-staff/maids-housekeepers',duties:['Clean rooms, kitchen and bathrooms on a set routine','Wash, iron and fold laundry','Help keep the house tidy and organised'],requirements:['Experience cleaning homes or offices','CNIC and household references','Honest, careful and reliable'],benefits:['Full-day, part-time or live-in options','Weekly day off agreed in writing']},
  {slug:'nanny',title:'Nanny / Babysitter',sector:'home',employmentType:'FULL_TIME',clients:HOME,menu:'Nannies & Babysitters',menuHref:'/services/domestic-staff/nannies-babysitters',duties:['Care for children’s feeding, bathing, play and sleep','Follow the parents’ routines and school timings','Give parents a short daily update'],requirements:['Experience caring for children','CNIC, family references and a police character certificate','Patient, gentle and alert'],benefits:['Live-in or day options','Clear duty hours agreed before joining']},
  {slug:'care-attendant',title:'Care Attendant (Elderly Care)',sector:'home',employmentType:'FULL_TIME',clients:HOME,menu:'Care Attendants',menuHref:'/services/domestic-staff/care-attendants',duties:['Help an elderly or recovering person with daily living','Give medicine reminders as prescribed by their doctor','Help with walking, bathing and meals safely'],requirements:['Experience with elderly or patient care','CNIC and references; caregiver training is a plus','Kind, patient and physically fit'],benefits:['Day, night or 24-hour shifts','Duties agreed with the family before joining']},
  {slug:'home-nurse',title:'Home Nurse',sector:'home',employmentType:'FULL_TIME',clients:HOME+' and care providers',menu:'Home Nurses',menuHref:'/services/domestic-staff/home-nurses',duties:['Give care set out by the treating doctor','Check vital signs and give medicines where qualified','Keep a simple daily care record for the family'],requirements:['Nursing diploma or degree; PNMC registration where needed','CNIC and references from hospitals or families','Calm, careful and discreet'],benefits:['Shift or live-in duty options','Care plan agreed with the family and doctor']},
  {slug:'gardener',title:'Gardener (Mali)',sector:'home',employmentType:'PART_TIME',clients:HOME+' and offices',menu:'Gardeners',menuHref:'/services/domestic-staff/gardeners',duties:['Maintain lawns, beds and pots','Seasonal planting, pruning and watering','Keep tools and the garden tidy'],requirements:['Experience maintaining gardens','CNIC and references','Hard-working and regular'],benefits:['Full-time or visit-based work','Several homes in one area can be combined']},
  {slug:'watchman',title:'Watchman / Caretaker',sector:'home',employmentType:'FULL_TIME',clients:HOME+', plazas and offices',menu:'Watchmen & Caretakers',menuHref:'/services/domestic-staff/watchmen-caretakers',duties:['Gate duty and visitor log','Night rounds and basic property checks','Report problems to the owner promptly'],requirements:['CNIC and a police character certificate','References from previous properties','Alert, honest and disciplined'],benefits:['Day or night duty','Quarters at some properties']},
  {slug:'domestic-couple',title:'Domestic Couple',sector:'home',employmentType:'FULL_TIME',liveIn:true,clients:HOME,menu:'Domestic Couples',menuHref:'/services/domestic-staff/domestic-couples',duties:['Share household work, for example cooking, cleaning, driving or gardening','Look after the home together on a live-in basis','Follow a written duty list agreed with the family'],requirements:['Married couple with household work experience','CNICs and references for both','A stable, respectful working style'],benefits:['Live-in quarters','Duties and pay for each person agreed in writing']},
  {slug:'personal-attendant',title:'Personal Attendant',sector:'home',employmentType:'FULL_TIME',clients:HOME,menu:'Personal Attendants',menuHref:'/services/domestic-staff/personal-attendants',duties:['Assist one person with daily tasks, errands and appointments','Help with mobility and personal routines where needed','Keep the person’s schedule and belongings in order'],requirements:['Experience as an attendant, helper or caregiver','CNIC and references','Respectful, discreet and dependable'],benefits:['Day or live-in options','Clear duty list before joining']},
  // ---------- Business Solutions ----------
  {slug:'office-boy',title:'Office Boy / Helper',sector:'business',employmentType:'FULL_TIME',clients:'Offices and businesses',menu:'Office Boys & Helpers',menuHref:'/services/domestic-staff/office-boys-helpers',duties:['Serve tea and refreshments','Keep the office tidy','Deliver documents and run errands'],requirements:['CNIC and references','Punctual, clean and courteous','Basic reading of Urdu'],benefits:['Office hours with weekly off','Overtime as agreed with the employer']},
  {slug:'receptionist',title:'Receptionist / Admin Assistant',sector:'business',employmentType:'FULL_TIME',clients:'Offices, clinics and schools',menu:'Corporate Recruitment',menuHref:'/services/corporate-recruitment/administration-reception',duties:['Greet visitors and answer calls','Manage appointments, records and the front desk','Handle routine office admin'],requirements:['Intermediate or graduate','Spoken Urdu and English; MS Office','Professional, organised manner'],benefits:['Office hours','Growth into admin roles']},
  {slug:'accountant',title:'Accountant / Accounts Officer',sector:'business',employmentType:'FULL_TIME',clients:'Businesses',menu:'Corporate Recruitment',menuHref:'/services/corporate-recruitment/accounts-finance',duties:['Record transactions and reconcile accounts','Prepare payroll inputs and monthly reports','Support tax and audit work'],requirements:['B.Com, M.Com, ACCA or CA modules','Excel and accounting software','Accounts experience is preferred'],benefits:['Office hours','Salary based on qualification and experience']},
  {slug:'sales-executive',title:'Sales Executive',sector:'business',employmentType:'FULL_TIME',clients:'Businesses',menu:'Corporate Recruitment',menuHref:'/services/corporate-recruitment/sales-marketing',duties:['Find and visit customers','Meet monthly sales targets','Report sales and follow-ups'],requirements:['Intermediate or graduate','Good communication and negotiation','Field work; a motorbike is a plus'],benefits:['Basic salary plus commission where offered','Travel allowance as agreed']},
  {slug:'it-support',title:'IT Support Officer',sector:'business',employmentType:'FULL_TIME',clients:'Businesses',menu:'Technical Recruitment',menuHref:'/services/corporate-recruitment/it-technical',duties:['Set up and fix computers, printers and networks','Support staff with software issues','Keep IT assets and records'],requirements:['Degree, diploma or IT certifications','Windows, networking and troubleshooting','Customer-friendly attitude'],benefits:['Office hours','Hands-on technical growth']},
  {slug:'operations-manager',title:'Manager / Senior Professional',sector:'business',employmentType:'FULL_TIME',clients:'Businesses (executive search)',menu:'Executive Search',menuHref:'/services/executive-search',duties:['Lead a team, branch or function','Own targets, budgets and reporting','Work with senior management on plans'],requirements:['Relevant degree and several years of experience','Proven results in a similar role','Strong leadership and communication'],benefits:['Senior package agreed with the employer','Confidential process']},
  {slug:'technician',title:'Technician / Electrician',sector:'business',employmentType:'FULL_TIME',clients:'Businesses, factories and facilities',menu:'Technical Recruitment',menuHref:'/services/technical-recruitment',duties:['Install, maintain and repair electrical or mechanical equipment','Follow safety procedures on site','Keep maintenance records'],requirements:['DAE, trade certificate or proven experience','CNIC and references','Safety-minded and reliable'],benefits:['Overtime as agreed','Work at offices, plants or sites']},
  {slug:'factory-worker',title:'Factory Worker / Machine Operator',sector:'business',employmentType:'FULL_TIME',clients:'Factories and plants',menu:'Industrial Staffing',menuHref:'/services/industrial-staffing',duties:['Operate machines or help on the production line','Pack, label and move goods safely','Follow shift, quality and safety rules'],requirements:['CNIC; experience is a plus but not always needed','Physically fit for shift work','Disciplined and punctual'],benefits:['Shift work with overtime where offered','Many openings at once during bulk hiring']},
  {slug:'retail-sales-staff',title:'Shop Salesperson / Retail Staff',sector:'business',employmentType:'FULL_TIME',clients:'Shops, outlets and retail chains',menu:'Bulk Hiring',menuHref:'/services/bulk-hiring',duties:['Help customers and make sales','Keep shelves stocked and tidy','Handle billing or stock counts where trained'],requirements:['Matric or intermediate','Polite and presentable','Ready for evening or weekend shifts'],benefits:['Shift work','Sales incentives where offered']},
  {slug:'hr-officer',title:'HR & Payroll Officer',sector:'business',employmentType:'FULL_TIME',clients:'Businesses',menu:'HR Outsourcing',menuHref:'/services/hr-outsourcing',duties:['Maintain employee records and attendance','Prepare payroll inputs and leave records','Support hiring and onboarding'],requirements:['Graduate; HR or business degree preferred','MS Excel; HR software is a plus','Discreet with confidential information'],benefits:['Office hours','HR and payroll experience']},
  {slug:'cleaner',title:'Cleaner / Janitorial Staff',sector:'business',employmentType:'FULL_TIME',clients:'Offices, plazas, schools and hospitals',menu:'Facility Support',menuHref:'/services/facility-management',duties:['Clean offices, washrooms and common areas','Use cleaning chemicals and machines safely','Report repairs and shortages'],requirements:['CNIC and references','Punctual and careful','Experience is a plus'],benefits:['Shift work','Uniform where provided']},
  {slug:'security-guard',title:'Security Guard',sector:'business',employmentType:'FULL_TIME',clients:'Offices, plazas, factories and events',menu:'Facility Support',menuHref:'/services/facility-management',duties:['Guard premises and control entry','Keep visitor and vehicle logs','Respond to incidents and report to supervisors'],requirements:['CNIC and police character certificate','Ex-servicemen or trained guards preferred','Fit, alert and disciplined'],benefits:['Day or night shifts','Overtime as agreed']},
  {slug:'call-centre-agent',title:'Call Centre / CSR Agent',sector:'business',employmentType:'FULL_TIME',clients:'Call centres and BPO teams',menu:'Business Process Outsourcing',menuHref:'/services/business-process-outsourcing',duties:['Handle inbound or outbound customer calls','Log queries and follow up','Meet quality and call targets'],requirements:['Intermediate or graduate','Clear Urdu; English for international campaigns','Basic computer skills'],benefits:['Day or night shifts','Incentives where offered']},
  {slug:'hotel-staff',title:'Hotel & Restaurant Staff',sector:'business',employmentType:'FULL_TIME',clients:'Hotels, restaurants and caterers',menu:'Hospitality & Tourism',menuHref:'/industries/hospitality-tourism',duties:['Serve guests as a waiter, steward or front-desk staff','Keep service areas clean and ready','Follow hygiene and service standards'],requirements:['Hospitality experience is a plus','Presentable and polite','Ready for shift work'],benefits:['Meals on duty','Service charges or tips where applicable']},
  {slug:'delivery-rider',title:'Delivery Rider / Logistics Helper',sector:'business',employmentType:'FULL_TIME',clients:'Couriers, logistics and e-commerce',menu:'Logistics & Transport',menuHref:'/industries/logistics-transport',duties:['Deliver parcels or orders on assigned routes','Collect payments and keep delivery records','Load and unload goods safely'],requirements:['Valid motorbike licence for riders','CNIC and smartphone','Good knowledge of the city'],benefits:['Per-delivery or monthly pay as offered','Fuel allowance where offered']},
  {slug:'teacher-tutor',title:'Teacher / Home Tutor',sector:'business',employmentType:'PART_TIME',clients:'Schools, academies and families',menu:'Education & Professional Services',menuHref:'/industries/education-professional-services',duties:['Teach assigned subjects and classes','Plan lessons and check homework','Share progress with parents or the school'],requirements:['Graduate or master’s in the subject','Teaching or tutoring experience','Clear communication'],benefits:['School or home-tuition timings','Part-time or full-time options']},
  // ---------- Remote (nationwide, one listing each) ----------
  {slug:'virtual-assistant',title:'Virtual Assistant (Remote)',sector:'remote',employmentType:'FULL_TIME',clients:'Local and international clients',menu:'Remote Teams',menuHref:'/services/remote-staff/virtual-assistants',duties:['Manage email, calendars and documents','Data entry, research and admin support','Work with clients across time zones'],requirements:['Strong written English','Google Workspace or Microsoft 365','Reliable internet and a laptop'],benefits:['Work from home','Full-time or part-time options']},
  {slug:'remote-customer-support',title:'Remote Customer Support',sector:'remote',employmentType:'FULL_TIME',clients:'Local and international clients',menu:'Remote Teams',menuHref:'/services/remote-staff/remote-customer-support',duties:['Answer customers by chat, email or phone','Log and resolve support tickets','Escalate complex issues'],requirements:['Fluent spoken and written English','Typing speed and patience','Quiet workspace, internet and laptop'],benefits:['Work from home','Shift options including night shifts']},
  {slug:'remote-digital-marketing',title:'Remote Digital Marketer',sector:'remote',employmentType:'FULL_TIME',clients:'Local and international clients',menu:'Remote Teams',menuHref:'/services/remote-staff/remote-digital-marketing',duties:['Run social media, SEO or paid campaigns','Create and schedule content','Report results each week'],requirements:['Portfolio of past campaigns','Knowledge of Meta, Google or SEO tools','Good written English'],benefits:['Work from home','Project or monthly pay']},
  {slug:'remote-developer',title:'Remote Developer',sector:'remote',employmentType:'FULL_TIME',clients:'Local and international clients',menu:'Remote Teams',menuHref:'/services/remote-staff/remote-developers',duties:['Build and maintain software','Work in a distributed team with Git','Write clear progress updates'],requirements:['A main stack (for example JavaScript, Python, PHP or mobile)','Code portfolio or GitHub','Good written communication'],benefits:['Work from home','Salary based on skill and stack']},
];

// Search-friendly names: "Cook Jobs in Islamabad", plus the Roman Urdu phrase people type.
export const ROLE_NAMES:Record<string,{name:string;urdu:string;person:string}>={
  cook:{name:'Cook',urdu:'cook / khansama ki naukri',person:'household cook'},
  driver:{name:'Driver',urdu:'driver ki naukri',person:'family or office driver'},
  maid:{name:'Maid & Housekeeper',urdu:'maid / kaam wali ki naukri',person:'maid or housekeeper'},
  nanny:{name:'Nanny & Babysitter',urdu:'nanny / aya ki naukri',person:'nanny or babysitter'},
  'care-attendant':{name:'Elderly Care Attendant',urdu:'attendant / care giver ki naukri',person:'elderly care attendant'},
  'home-nurse':{name:'Home Nurse',urdu:'home nurse ki naukri',person:'home nurse'},
  gardener:{name:'Gardener (Mali)',urdu:'mali ki naukri',person:'gardener (mali)'},
  watchman:{name:'Watchman & Chowkidar',urdu:'chowkidar ki naukri',person:'watchman or caretaker'},
  'domestic-couple':{name:'Domestic Couple',urdu:'miyan biwi ke liye ghar ki naukri',person:'live-in domestic couple'},
  'personal-attendant':{name:'Personal Attendant',urdu:'personal attendant ki naukri',person:'personal attendant'},
  'office-boy':{name:'Office Boy',urdu:'office boy ki naukri',person:'office boy or helper'},
  receptionist:{name:'Receptionist & Admin',urdu:'receptionist ki naukri',person:'receptionist or admin assistant'},
  accountant:{name:'Accountant',urdu:'accountant ki naukri',person:'accountant or accounts officer'},
  'sales-executive':{name:'Sales Executive',urdu:'sales ki naukri',person:'sales executive'},
  'it-support':{name:'IT Support',urdu:'IT ki naukri',person:'IT support officer'},
  'operations-manager':{name:'Manager',urdu:'manager ki naukri',person:'manager or senior professional'},
  technician:{name:'Technician & Electrician',urdu:'electrician / technician ki naukri',person:'technician or electrician'},
  'factory-worker':{name:'Factory Worker',urdu:'factory ki naukri',person:'factory worker or machine operator'},
  'retail-sales-staff':{name:'Salesman & Shop Staff',urdu:'shop / salesman ki naukri',person:'salesperson or shop staff'},
  'hr-officer':{name:'HR & Payroll Officer',urdu:'HR ki naukri',person:'HR and payroll officer'},
  cleaner:{name:'Cleaner & Janitor',urdu:'safai / janitor ki naukri',person:'cleaner or janitorial staff'},
  'security-guard':{name:'Security Guard',urdu:'security guard ki naukri',person:'security guard'},
  'call-centre-agent':{name:'Call Centre (CSR)',urdu:'call center ki naukri',person:'call centre agent'},
  'hotel-staff':{name:'Hotel & Restaurant',urdu:'hotel / waiter ki naukri',person:'hotel or restaurant staff'},
  'delivery-rider':{name:'Delivery Rider',urdu:'rider ki naukri',person:'delivery rider'},
  'teacher-tutor':{name:'Teacher & Home Tutor',urdu:'teacher / tutor ki naukri',person:'teacher or home tutor'},
  'virtual-assistant':{name:'Virtual Assistant',urdu:'online / ghar baith kar naukri',person:'virtual assistant'},
  'remote-customer-support':{name:'Customer Support',urdu:'ghar baith kar customer support ki naukri',person:'remote customer support agent'},
  'remote-digital-marketing':{name:'Digital Marketing',urdu:'online digital marketing ki naukri',person:'remote digital marketer'},
  'remote-developer':{name:'Developer',urdu:'online developer ki naukri',person:'remote developer'},
};
export const roleName=(r:PoolRole)=>ROLE_NAMES[r.slug]||{name:r.title,urdu:r.title.toLowerCase()+' ki naukri',person:r.title.toLowerCase()};
// Other names people search for each role (used to vary page titles).
export const ROLE_ALT:Record<string,string[]>={
  cook:['Khansama','Household Cook','Home Chef','Family Cook'],driver:['Family Driver','Car Driver','LTV Driver','Personal Driver'],
  maid:['Housemaid','Housekeeper','Domestic Helper','Cleaning Maid'],nanny:['Babysitter','Aya','Child Carer','Governess'],
  'care-attendant':['Elderly Caregiver','Patient Attendant','Caregiver','Old Age Carer'],'home-nurse':['Staff Nurse (Home)','Nursing Attendant','Private Nurse','Home Care Nurse'],
  gardener:['Mali','Garden Helper','Lawn Keeper','Landscaping Helper'],watchman:['Chowkidar','Caretaker','Night Watchman','Gatekeeper'],
  'domestic-couple':['Live-in Couple','Husband & Wife Staff','Couple Housekeeper','Household Couple'],'personal-attendant':['Personal Assistant (Home)','Attendant','Personal Helper','Companion Carer'],
  'office-boy':['Office Helper','Peon','Tea Boy','Office Assistant'],receptionist:['Front Desk Officer','Admin Assistant','Office Receptionist','Front Office Executive'],
  accountant:['Accounts Officer','Bookkeeper','Accounts Assistant','Finance Officer'],'sales-executive':['Sales Officer','Field Sales','Sales Representative','Marketing Executive'],
  'it-support':['IT Officer','Computer Operator','Network Support','Helpdesk Technician'],'operations-manager':['Branch Manager','Operations Manager','Team Manager','Senior Manager'],
  technician:['Electrician','Maintenance Technician','AC Technician','Electrical Technician'],'factory-worker':['Machine Operator','Production Worker','Factory Helper','Packing Staff'],
  'retail-sales-staff':['Salesman','Shop Assistant','Store Staff','Sales Boy / Girl'],'hr-officer':['HR Assistant','Payroll Officer','HR Executive','Admin & HR Officer'],
  cleaner:['Janitor','Sweeper','Housekeeping Staff','Cleaning Staff'],'security-guard':['Guard','Security Officer','Gunman','Armed Guard'],
  'call-centre-agent':['CSR','Call Center Agent','Telesales Agent','Customer Service Rep'],'hotel-staff':['Waiter','Restaurant Staff','Hotel Steward','Kitchen Helper'],
  'delivery-rider':['Bike Rider','Courier Rider','Delivery Boy','Food Delivery Rider'],'teacher-tutor':['Home Tutor','School Teacher','Tuition Teacher','Subject Teacher'],
  'virtual-assistant':['Online Assistant','VA','Remote Admin Assistant','Online Admin'],'remote-customer-support':['Work From Home CSR','Chat Support','Online Support Agent','Remote CSR'],
  'remote-digital-marketing':['Social Media Manager','SEO Specialist','Online Marketer','Digital Marketer'],'remote-developer':['Web Developer','Software Developer','App Developer','Programmer'],
};
const PROV_SHORT:Record<string,string>={ict:'ICT',punjab:'Punjab',sindh:'Sindh',kp:'KP',balochistan:'Balochistan',ajk:'AJK',gb:'GB'};
// A distinct, keyword-rich page title for every listing (kept within ~65 characters).
export function poolMetaTitle(r:PoolRole,c:City|null,j:Job){
  const n=roleName(r).name;const alt=ROLE_ALT[r.slug]||[n];const y=new Date().getFullYear();
  // Rotate styles: neighbouring cities for one role, and roles within one city, get different patterns.
  const ci=c?Math.max(0,allCities.findIndex(x=>x.slug===c.slug)):0,ri=Math.max(0,poolRoles.indexOf(r));const h=ci+ri*3;
  const a1=alt[(ci+ri)%alt.length],a2=alt[(ci+ri+1)%alt.length];
  const et=({FULL_TIME:'Full-Time',PART_TIME:'Part-Time',CONTRACTOR:'Contract',TEMPORARY:'Temporary'} as Record<string,string>)[r.employmentType];
  if(j.hiringNow){const pay=`PKR ${(j.salaryMin||0).toLocaleString('en-PK')}–${(j.salaryMax||0).toLocaleString('en-PK')}`;
    const opts=c?[`${n} Jobs in ${c.name} – Hiring Now, ${pay}`,`Hiring Now: ${a1} in ${c.name} (${pay})`,`${c.name} ${a1} Jobs ${y} – ${pay} a Month`]:[`Remote ${n} Jobs – Hiring Now, ${pay}`,`Hiring Now: Remote ${a1} (${pay})`];
    for(let i=0;i<opts.length;i++){const t=opts[(h+i)%opts.length];if(t.length<=65)return t;}return opts[0];}
  if(!c){const opts=[`Remote ${n} Jobs in Pakistan ${y} – Work From Home`,`Work From Home ${a1} Jobs Pakistan – Apply Online`,`Online ${a1} Jobs in Pakistan (Remote, ${et})`];
    for(let i=0;i<opts.length;i++){const t=opts[(h+i)%opts.length];if(t.length<=65)return t;}return opts[0];}
  const areas=cityAreas(c);const ar1=areas[h%Math.max(1,areas.length)]||c.name,ar2=areas[(h+2)%Math.max(1,areas.length)]||'';const pv=PROV_SHORT[c.province]||'';
  const live=r.liveIn?'Live-in':r.sector==='home'?'Live-in & Day':et;
  const opts=[
    `${n} Jobs in ${c.name} ${y} – Apply Online Free`,
    `${a1} Jobs in ${c.name} – ${ar1}${ar2&&ar2!==ar1?' & '+ar2:''}`,
    `${c.name} ${n} Jobs – ${live} Vacancies, No Fee`,
    `${a1} & ${a2} Jobs in ${c.name}, ${pv}`,
    `Latest ${n} Jobs in ${c.name} – Apply Today (${y})`,
    `${n} Vacancies in ${c.name} – ${live} Work, Free to Apply`,
    `${a2} Jobs ${c.name} ${y} | ${et} Positions`,
    `New ${a1} Jobs in ${c.name}, ${pv} – Apply in 2 Minutes`,
  ];
  for(let i=0;i<opts.length;i++){const t=opts[(h+i)%opts.length];if(t.length<=65&&t.length>=30)return t;}
  return opts[0];
}
export const poolTitle=(r:PoolRole,c:City|null)=>c?`${roleName(r).name} Jobs in ${c.name}`:`Remote ${roleName(r).name} Jobs in Pakistan`;

// Experience and education asked for each role (shown on listings and used for real job schema).
export const ROLE_REQ:Record<string,{exp:string;months:number;edu:string;cred:string}>={
  cook:{exp:'At least 1 year of cooking for a household, hotel or restaurant',months:12,edu:'No formal education required',cred:''},
  driver:{exp:'At least 2 years of driving with a valid licence',months:24,edu:'No formal education required; able to read road signs',cred:''},
  maid:{exp:'Experience preferred, freshers considered',months:0,edu:'No formal education required',cred:''},
  nanny:{exp:'At least 1 year of childcare',months:12,edu:'Middle or matric preferred',cred:''},
  'care-attendant':{exp:'At least 1 year of elderly or patient care',months:12,edu:'Matric preferred; caregiver course is a plus',cred:''},
  'home-nurse':{exp:'At least 1 year of nursing after qualification',months:12,edu:'Nursing diploma or BSc Nursing; PNMC registration where needed',cred:'professional certificate'},
  gardener:{exp:'Experience maintaining gardens',months:6,edu:'No formal education required',cred:''},
  watchman:{exp:'Experience as a guard or watchman preferred',months:6,edu:'No formal education required',cred:''},
  'domestic-couple':{exp:'Household work experience for both',months:12,edu:'No formal education required',cred:''},
  'personal-attendant':{exp:'Experience as an attendant or helper',months:6,edu:'Middle or matric preferred',cred:''},
  'office-boy':{exp:'Experience preferred, freshers considered',months:0,edu:'Primary or middle; able to read Urdu',cred:''},
  receptionist:{exp:'At least 1 year at a front desk or in admin',months:12,edu:'Intermediate or bachelor’s degree',cred:'high school'},
  accountant:{exp:'At least 1 year in accounts',months:12,edu:'B.Com, M.Com, ACCA or CA (part qualified)',cred:'bachelor degree'},
  'sales-executive':{exp:'At least 1 year in sales preferred',months:12,edu:'Intermediate or bachelor’s degree',cred:'high school'},
  'it-support':{exp:'At least 1 year in IT support',months:12,edu:'DAE, BS IT/CS or IT certifications',cred:'associate degree'},
  'operations-manager':{exp:'At least 5 years, including team leadership',months:60,edu:'Bachelor’s or master’s degree in a relevant field',cred:'bachelor degree'},
  technician:{exp:'At least 2 years of hands-on work',months:24,edu:'DAE or trade certificate (TEVTA / NAVTTC)',cred:'professional certificate'},
  'factory-worker':{exp:'No experience needed for helper roles',months:0,edu:'No formal education required',cred:''},
  'retail-sales-staff':{exp:'Experience preferred, freshers considered',months:0,edu:'Matric or intermediate',cred:'high school'},
  'hr-officer':{exp:'At least 1 year in HR or payroll',months:12,edu:'BBA, MBA (HR) or a relevant degree',cred:'bachelor degree'},
  cleaner:{exp:'Experience preferred, freshers considered',months:0,edu:'No formal education required',cred:''},
  'security-guard':{exp:'At least 1 year as a guard, or armed forces service',months:12,edu:'Middle or matric; guard training certificate preferred',cred:''},
  'call-centre-agent':{exp:'Freshers welcome; call centre experience is a plus',months:0,edu:'Intermediate or bachelor’s degree',cred:'high school'},
  'hotel-staff':{exp:'Hospitality experience preferred',months:6,edu:'Matric preferred; hospitality course is a plus',cred:''},
  'delivery-rider':{exp:'Riding experience with a valid licence',months:6,edu:'No formal education required; smartphone use needed',cred:''},
  'teacher-tutor':{exp:'At least 1 year of teaching or tutoring',months:12,edu:'Bachelor’s or master’s degree in the subject',cred:'bachelor degree'},
  'virtual-assistant':{exp:'At least 1 year of admin or VA work',months:12,edu:'Intermediate or bachelor’s degree',cred:'high school'},
  'remote-customer-support':{exp:'Customer support experience preferred',months:6,edu:'Intermediate or bachelor’s degree',cred:'high school'},
  'remote-digital-marketing':{exp:'At least 1 year with a portfolio',months:12,edu:'Bachelor’s degree or marketing certifications',cred:'bachelor degree'},
  'remote-developer':{exp:'At least 2 years of professional development',months:24,edu:'BS CS/SE or equivalent skills',cred:'bachelor degree'},
};
const OUTDOOR=new Set(['driver','gardener','watchman','security-guard','delivery-rider','technician','factory-worker','cleaner']);
const CLIMATE:Record<string,[string,string]>={
  plains:['hot summers and cold winters','ask whether staff quarters have a fan in summer and heating in winter'],
  south:['very hot, long summers','confirm cool quarters, drinking water and rest breaks in the hottest months'],
  coastal:['a humid coastal climate','ask about ventilation in staff quarters and travel during monsoon rain'],
  hills:['cool summers and cold winters with snow in places','ask about warm quarters and winter clothing'],
  mountain:['long, cold winters','ask about heating and how work changes in winter'],
  arid:['a dry climate with hot days','confirm shade, water and rest breaks'],
};
export const poolRole=(slug:string)=>poolRoles.find(r=>r.slug===slug);
// Labels for any job type slug (core job guides plus the extra recruitment roles).
export const typeTitle=(slug:string)=>jobTypes.find(j=>j.slug===slug)?.title||poolRole(slug)?.title||slug;
export const allTypeOptions=()=>{const seen=new Set(jobTypes.map(j=>j.slug));return [...jobTypes.map(j=>({value:j.slug,label:j.title})),...poolRoles.filter(r=>!seen.has(r.slug)).map(r=>({value:r.slug,label:r.title}))];};
// Pool role slug → core job type slug used by filters and job alerts.
const TYPE_MAP:Record<string,string>={maid:'maid',nanny:'nanny'};
const typeOf=(r:PoolRole)=>TYPE_MAP[r.slug]||r.slug;

// Job guides without their own recruitment role share the closest one.
const ALIAS:Record<string,string>={housekeeper:'maid',babysitter:'nanny'};
export const POOL_SINCE='2026-11-01';
export const poolId=(role:string,city:string)=>`hiring-${role}-${city}`;
export const isPoolId=(id:string)=>id.startsWith('hiring-');

// Areas used for local wording: detailed sector lists for Islamabad and Rawalpindi, main areas elsewhere.
export const cityAreas=(c:City)=>[...new Set([...(locations[c.slug]?.areas||[]),...c.areas])];
const a_an=(w:string)=>/^[aeiou]/i.test(w)?'an':'a';

function description(r:PoolRole,c:City|null){
  const n=roleName(r);
  if(!c)return `estaff.pk is recruiting ${n.person}s who work from home anywhere in Pakistan, for ${r.clients.toLowerCase()}. You need a laptop, reliable internet and the skills listed below. This is ongoing recruitment rather than a single vacancy: you apply once and join our shortlist, and when a client needs this role we share your profile (only with your permission) and call you to confirm pay, hours and duties before any interview. Applying is free.`;
  const p=provinces[c.province].name;const areas=cityAreas(c).slice(0,5).join(', ');
  const why=r.sector==='home'?pick(r.slug+c.slug,[`Families in ${c.name} regularly ask us for a reliable, checked ${n.person}.`,`Households across ${c.name}, ${p} need a trustworthy ${n.person} throughout the year.`,`Busy families, working couples and elderly parents in ${c.name} ask us for ${a_an(n.person)} ${n.person}.`]):pick(r.slug+c.slug,[`Employers in ${c.name}, where the local economy is driven by ${c.economy}, hire ${n.person}s through us.`,`${c.name}'s economy (${c.economy}) creates steady demand for ${n.person}s.`,`Businesses in ${c.name} (${c.economy}) send us requirements for ${n.person}s.`]);
  const local=pick(c.slug+r.slug,[`Work is usually in and around ${areas}.`,`Clients in ${c.name} are spread across areas such as ${areas}.`,`Most requirements in ${c.name} come from ${areas}.`]);
  return `estaff.pk is recruiting ${n.person}s in ${c.name}, ${p} for ${r.clients.toLowerCase()}. ${why} ${local} This is ongoing recruitment rather than a single vacancy: you apply once and join our ${c.name} shortlist, and when a client needs ${a_an(n.person)} ${n.person} we share your profile (only with your permission) and call you to confirm pay, hours and duties before any interview. Applying is free.`;
}

// Extra page content for a listing: the short answer, documents, steps and FAQs.
export function poolContent(r:PoolRole,c:City|null){
  const n=roleName(r);const where=c?`in ${c.name}`:'from home in Pakistan';
  const jt=jobTypes.find(j=>j.slug===typeOf(r));
  const docs=jt?.docs||(r.requirements.find(x=>/CNIC/.test(x))?r.requirements.find(x=>/CNIC/.test(x))!:'CNIC and references from previous employers');
  const answer=`To get ${a_an(n.name)} ${n.name.toLowerCase()} job ${where}, apply on this page with your name, phone number and CV. Keep your ${docs.replace(/[.]$/,'')} ready. estaff.pk adds you to the shortlist for ${c?c.name:'remote work'} and calls you when a ${r.sector==='home'?'family':'client'} needs ${a_an(n.person)} ${n.person}. It is free: estaff.pk never charges job seekers.`;
  const steps=[
    {title:'Apply online',text:'Fill in the short form on this page with your phone number, experience and CV (PDF, Word or a photo). It takes about two minutes.'},
    {title:'Short call from estaff.pk',text:`We call or WhatsApp you to check your experience, ${c?'the areas of '+c.name+' you can work in':'your working hours and equipment'} and your expected pay.`},
    {title:'Your profile goes to a client',text:'When a client needs this role, we share your profile with them, only with the permission you give on the form.'},
    {title:'Interview and joining',text:'Pay, hours, duties and days off are confirmed with you before the interview. Keep your documents ready.'},
  ];
  const faqs:[string,string][]=[
    [`How can I get ${a_an(n.name)} ${n.name.toLowerCase()} job ${where}?`,answer],
    [`What does ${a_an(n.person)} ${n.person} do?`,`The work usually includes: ${r.duties.map(d=>d.charAt(0).toLowerCase()+d.slice(1)).join('; ')}.`],
    [`What do I need to apply for ${n.name.toLowerCase()} jobs ${where}?`,`${r.requirements.join('. ')}. Keep ${docs.replace(/[.]$/,'')} ready for the interview.`],
    [`What is the salary for ${n.name.toLowerCase()} jobs ${where}?`,`Pay depends on the client, the duties, the hours${r.sector==='home'?', live-in or live-out arrangement':''} and your experience. It is agreed with you before the interview, and you are never asked to pay anything to estaff.pk.`],
    [`Is this a single vacancy?`,`No. It is ongoing recruitment: estaff.pk recruits ${n.person}s ${where} all year. Your application stays on our shortlist and is shared with clients who need this role.`],
    ...(c?[[`${c.name} mein ${n.urdu} kaise milegi?`,`Is page par apna naam, phone number aur CV bhej dein. CNIC aur references tayyar rakhein. Jab ${c.name} mein kisi ${r.sector==='home'?'ghar':'company'} ko ${n.name.toLowerCase()} chahiye hoga, estaff.pk aap ko call karega. Apply karna bilkul muft hai.`] as [string,string]]:[[`${n.urdu} kaise milegi?`,`Is page par apna naam, phone number aur CV bhej dein. Jab kisi client ko yeh kaam chahiye hoga, estaff.pk aap ko call karega. Apply karna muft hai.`] as [string,string]]),
  ];
  const req=ROLE_REQ[r.slug]||{exp:'Experience preferred',months:0,edu:'No formal education required',cred:''};
  let local='';
  if(c){const [clim,tip]=CLIMATE[c.climate]||CLIMATE.plains;const p=provinces[c.province].name;const lc=c.local.charAt(0).toLowerCase()+c.local.slice(1);const care=OUTDOOR.has(r.slug)||r.sector==='home';
    local=pick('L'+c.slug+r.slug,[
      `${c.local} Most people here speak ${c.languages}, so speaking at least one of these helps at interview. ${c.name} has ${clim}; ${care?tip+'.':'office roles usually follow normal working hours.'} Candidates from ${c.near} can also apply if they can travel to or live in ${c.name}.`,
      `About ${c.name}: ${lc} Employers here often look for staff who speak ${c.languages}. With ${clim} in ${c.name}, ${care?tip:'most offices work regular hours'}. People living near ${c.near} are welcome to apply too.`,
      `${c.name}, ${p}: ${lc} Useful languages are ${c.languages}. Because ${c.name} has ${clim}, ${care?tip:'check the office timings when we call'}. You can also apply from nearby ${c.near}.`,
    ]);}
  const summary:[string,string][]=[
    ['Job',n.name],['Location',c?`${c.name}, ${provinces[c.province].name}, Pakistan`:'Remote, anywhere in Pakistan'],['Region',c?provinces[c.province].name:'Pakistan'],
    ['Employment',({FULL_TIME:'Full-time',PART_TIME:'Part-time',CONTRACTOR:'Contract',TEMPORARY:'Temporary'} as Record<string,string>)[r.employmentType]+(r.liveIn?', live-in':'')],
    ['Experience',req.exp],['Education',req.edu],['Who hires',r.clients],['Pay','Agreed with the client before interview'],['Fee for job seekers','None, applying is free'],
    ...(c?[['Languages',c.languages] as [string,string]]:[]),
  ];
  return {answer,steps,faqs,docs,areas:c?cityAreas(c):[],name:n,req,local,summary};
}

function build(r:PoolRole,c:City|null):Job{
  const base=buildBase(r,c);const a=getActive(base.id);
  if(!a||!isLive(a))return base;
  const n=roleName(r);
  return {...base,hiringNow:true,salaryMin:a.salaryMin,salaryMax:a.salaryMax,datePosted:a.datePosted,validThrough:a.validThrough,updatedAt:a.publishAt,employer:'estaff.pk (employer details shared once you are shortlisted)',
    description:`estaff.pk is hiring now for ${n.person} positions ${c?'in '+c.name+', '+provinces[c.province].name:'working from home anywhere in Pakistan'} on behalf of ${r.clients.toLowerCase()}. Pay is PKR ${a.salaryMin.toLocaleString('en-PK')}–${a.salaryMax.toLocaleString('en-PK')} a month depending on experience and duties. The employer’s name and exact location are shared with you once your application is shortlisted. `+base.description.replace(/^estaff\.pk is recruiting[^.]*\.\s*/,'')};
}
function buildBase(r:PoolRole,c:City|null):Job{
  return {id:poolId(r.slug,c?c.slug:'pakistan'),pool:true,title:poolTitle(r,c),jobType:typeOf(r),city:c?c.slug:'',area:'',employmentType:r.employmentType,remote:!c,liveIn:Boolean(r.liveIn),salaryMin:null,salaryMax:null,employer:`estaff.pk clients (${r.clients})`,description:description(r,c),duties:r.duties,requirements:r.requirements,benefits:[...r.benefits,'Free for job seekers: estaff.pk never charges a fee'],datePosted:POOL_SINCE,validThrough:'2099-12-31',status:'open',createdAt:POOL_SINCE,updatedAt:POOL_SINCE};
}

export function poolEnabled(){return getSettings().pool.enabled;}
function visible(r:PoolRole,city:string){const s=getSettings().pool;return s.enabled&&!s.hiddenRoles.includes(r.slug)&&!(city&&s.hiddenCities.includes(city));}

export function poolRoleOfId(id:string){if(!isPoolId(id))return null;const rest=id.slice(7);return [...poolRoles].sort((a,b)=>b.slug.length-a.slug.length).find(x=>rest.startsWith(x.slug+'-'))||null;}
export function getPoolJob(id:string):Job|null{
  const r=poolRoleOfId(id);if(!r)return null;const rest=id.slice(7);
  const city=rest.slice(r.slug.length+1);
  if(r.sector==='remote')return city==='pakistan'&&visible(r,'')?build(r,null):null;
  const c=anyCity(city);if(!c||city==='pakistan'||!visible(r,c.slug))return null;return build(r,c);
}

// All open recruitment listings, optionally filtered by city and job type.
export function listPoolJobs(f:{city?:string;jobType?:string}={}):Job[]{
  const out:Job[]=[];
  for(const r of poolRoles){
    if(f.jobType&&typeOf(r)!==(ALIAS[f.jobType]||f.jobType))continue;
    if(r.sector==='remote'){if(visible(r,''))out.push(build(r,null));continue;}
    for(const c of f.city?[anyCity(f.city)].filter(Boolean) as City[]:allCities)if(visible(r,c.slug))out.push(build(r,c));
  }
  return out;
}
// Listings shown in Google search: every city (default) or the cities chosen in Admin → Jobs, plus remote.
// They never carry JobPosting schema, so they stay out of Google Jobs.
export const isIndexablePool=(j:Job)=>{const s=getSettings().pool;return j.remote||s.indexAll||s.indexCities.includes(j.city);};
export const indexablePoolJobs=()=>listPoolJobs().filter(isIndexablePool);
export const poolCount=()=>listPoolJobs().length;
export const poolCities=allCities;
