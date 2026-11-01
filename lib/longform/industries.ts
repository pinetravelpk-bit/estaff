import type {LongForm} from './types';

// Long-form guides for the eight industry pages.
export const industryGuides:Record<string,LongForm>={

'hospitality-tourism':{
  title:'Hospitality and tourism staffing in Pakistan',
  answer:'Hotels, restaurants, caterers and tourism operators in Pakistan hire chefs and kitchen teams, front desk and reservations staff, housekeeping, waiters and guest services. Plan staffing around guest flow and seasons, test practical skills (a cooking trial, a role-play at the front desk), confirm hygiene and service standards, and build a reliable pool for peak periods such as summer in the north and the wedding season in the plains.',
  sections:[
    {h:'The Pakistani hospitality landscape',p:['Hospitality in Pakistan ranges from international hotel brands in Islamabad, Lahore and Karachi to family restaurants, wedding halls and caterers in every city, and guesthouses and hotels in tourist areas such as Murree, Swat, Naran, Hunza and Skardu. Food delivery and cloud kitchens have added a fast-growing segment in the major cities.','Each part of the industry hires differently. Five-star hotels need staff who follow brand standards and speak English with international guests. Restaurants and caterers need fast, reliable kitchen and service teams for busy evenings and weekends. Northern tourism businesses need seasonal staff willing to live on-site for the summer.']},
    {h:'Seasons and peaks',p:['Hiring in hospitality follows the calendar. Tourist areas in the north peak in summer and close or slow down in winter. Wedding halls and caterers in Punjab and Sindh are busiest in the cooler wedding season. Ramadan changes restaurant patterns completely, with iftar and sehri rushes. Plan recruitment several weeks before each peak, and keep in touch with good seasonal staff so they return next year.']},
    {h:'Food safety and hygiene',p:['Provincial food authorities, such as the Punjab Food Authority, inspect restaurants and food businesses and can fine or seal premises for poor hygiene. Kitchen staff should understand handwashing, clean uniforms, safe storage, temperature control and pest prevention. Ask about food safety training at interview, and include a hygiene check in the kitchen trial.']},
    {h:'Service skills that matter',p:['Guests remember how they were treated more than the décor. Waiters and front desk staff need warmth, patience and the ability to fix problems quickly. Role-plays reveal more than CVs: ask a front desk candidate to handle a guest whose booking is missing, or a waiter to deal with a complaint about cold food.']},
  ],
  table:{caption:'Hospitality roles and how to test them',head:['Role','Key skills','Practical test'],rows:[
    ['Chef / cook','Menu, consistency, hygiene','Cooking trial during prep time'],
    ['Waiter / steward','Service, speed, menu knowledge','Mock service with a complaint'],
    ['Front desk','Courtesy, systems, languages','Check-in role-play'],
    ['Housekeeping','Standards, speed, detail','Room inspection test'],
    ['Guest services','Problem solving, local knowledge','Guest request scenario'],
  ]},
  checklist:{title:'Hospitality hiring checklist',items:['Map staffing to guest flow and seasons','Write role briefs with shifts and meals','Plan practical trials','Check food safety knowledge','Arrange accommodation for remote sites','Keep a seasonal talent pool']},
  faqTitle:'Hospitality staffing: common questions',
  faqs:[
    ['Can you supply staff for events and weddings?','Yes, waiters, kitchen helpers and supervisors can be recruited for events and the wedding season; give as much notice as possible.'],
    ['Do northern hotels need live-in staff?','Usually yes. Mention accommodation, meals and season dates in the brief.'],
    ['Can staff be trained for our brand standards?','Yes. Shortlisted candidates can be briefed on your standards before starting, followed by your own induction.'],
  ],
},

'it-technology':{
  title:'IT and technology hiring in Pakistan',
  answer:'Pakistani technology companies and in-house IT teams hire software developers, QA engineers, IT support, DevOps, product and project staff. Hire against the real stack and work, test skills with practical tasks, offer pay that competes with remote international work, and invest in growth paths, because experienced engineers in Lahore, Karachi and Islamabad have many options.',
  sections:[
    {h:'Pakistan’s technology sector',p:['Pakistan’s IT and IT-enabled services exports have grown steadily, supported by software houses, startups, freelancers and global companies with development centres in Lahore, Karachi, Islamabad and Rawalpindi. Technology parks and incubators have helped smaller cities such as Peshawar, Faisalabad and Multan build their own developer communities.','At the same time, many experienced engineers now work remotely for foreign companies. Local employers compete with those salaries and with the flexibility of remote work, which shapes how they must hire.']},
    {h:'Roles in demand',p:[],list:['Full-stack, frontend and backend developers (JavaScript/TypeScript, PHP, Python, Java, .NET)','Mobile developers (Flutter, React Native, Android, iOS)','QA engineers, manual and automation','DevOps and cloud engineers','UI/UX designers','Project managers and business analysts','IT support and network administrators']},
    {h:'Hiring that works for engineers',p:['Engineers dislike long, generic processes. A short screening call, one practical task close to real work and a technical conversation with the team usually beat multiple rounds of interviews. Be transparent about the salary range, stack, team and remote or hybrid options from the first conversation.']},
    {h:'Retention',p:['Clear growth paths, interesting work, modern tools, learning time, fair pay reviews and respectful management keep engineers. Many leave because of poor technical leadership or chaotic planning rather than pay alone. Exit interviews often reveal fixable problems.']},
  ],
  table:{caption:'Tech roles and assessments',head:['Role','Assessment'],rows:[
    ['Developer','Paid task or code review'],['QA engineer','Test plan for a sample feature'],['DevOps','Infrastructure scenario'],['UI/UX designer','Portfolio walkthrough and small task'],['IT support','Troubleshooting scenarios'],
  ]},
  checklist:{title:'Tech hiring checklist',items:['Define stack and responsibilities','Share salary range early','Design a short practical task','Limit interview rounds','Plan onboarding and mentoring','Review pay and growth yearly']},
  faqTitle:'IT hiring: common questions',
  faqs:[
    ['Can you hire for software houses and startups?','Yes, including developers, QA, DevOps, designers and project managers.'],
    ['Do you hire remote developers for foreign companies?','Yes, through the remote staffing service.'],
    ['How do you test developers?','With practical tasks and technical conversations agreed with your team.'],
  ],
},

'healthcare':{
  title:'Healthcare staffing in Pakistan: clinical and support roles',
  answer:'Hospitals, clinics, labs, pharmacies and home-care providers in Pakistan hire nurses, nursing attendants, technicians, receptionists, patient coordinators and administrative staff. Separate clinical roles, which need verified qualifications and registration with the relevant council, from support roles, plan shifts carefully and check references from previous healthcare employers.',
  sections:[
    {h:'Clinical and non-clinical roles',p:['Clinical roles such as nurses, midwives, lab technicians, radiographers and pharmacists need recognised qualifications and, where required, registration with bodies such as the Pakistan Nursing and Midwifery Council or the relevant pharmacy council. Doctors register with the Pakistan Medical and Dental Council. Non-clinical roles include receptionists, patient coordinators, billing, records, housekeeping and security. Mixing the two in one brief causes confusion; keep them separate.']},
    {h:'Verifying qualifications',p:['For clinical roles, see original certificates, verify registration where possible and speak to previous ward managers or medical directors. Ask about procedures performed, patient types and shift experience. For home-care nurses, check the specific skills the patient needs.']},
    {h:'Shifts and staffing levels',p:['Healthcare runs around the clock. Plan rotas with adequate rest, cover for leave and safe staffing levels for patient numbers. Night shifts need experienced staff and supervision. Burnout is a major cause of turnover, especially among nurses.']},
    {h:'Patient privacy and conduct',p:['Front desk and records staff handle sensitive information. Include confidentiality in contracts, train staff on not discussing patients in public areas, and control access to records. Professional conduct with patients and families matters as much as technical skill.']},
    {h:'Nursing workforce realities',p:['Pakistan has fewer nurses than it needs, and many qualified nurses seek opportunities abroad. Employers that offer safe workloads, respect, training and fair pay retain nurses better. Clear career steps from staff nurse to charge nurse and supervisor help.']},
  ],
  table:{caption:'Healthcare roles at a glance',head:['Role','Type','Key check'],rows:[
    ['Staff nurse','Clinical','Qualification and registration'],['Nursing attendant','Support','Training and references'],['Lab technician','Clinical','Qualification and practical skills'],['Receptionist','Non-clinical','Communication and privacy'],['Patient coordinator','Non-clinical','Organisation and empathy'],
  ]},
  checklist:{title:'Healthcare hiring checklist',items:['Separate clinical and support roles','Verify qualifications and registration','Check previous healthcare references','Plan safe shifts and rest','Include confidentiality terms','Plan induction and supervision']},
  faqTitle:'Healthcare staffing: common questions',
  faqs:[
    ['Can you recruit nurses for hospitals and home care?','Yes, with verification of qualifications and registration where required.'],
    ['Do you recruit doctors?','Doctor recruitment requires specialist verification; discuss the requirement and we will advise on the scope.'],
    ['Can clinic receptionists be trained in patient privacy?','Yes, include privacy training in induction and confidentiality in contracts.'],
  ],
},

'construction-engineering':{
  title:'Construction and engineering staffing in Pakistan',
  answer:'Construction and engineering projects in Pakistan need site engineers, supervisors, technical trades (electricians, plumbers, steel fixers, masons, welders), site administration and safety staff. Plan hiring around project milestones, verify trade skills with practical tests, confirm safety training and protective equipment, and arrange accommodation and transport for sites away from cities.',
  sections:[
    {h:'The project workforce',p:['Housing societies, commercial towers, roads, dams, power projects and industrial plants all run on project teams that grow and shrink with milestones. A typical site needs engineers for planning and quality, supervisors and foremen, skilled trades, helpers, storekeepers, site administrators, HSE officers and security.']},
    {h:'Plan by phase',p:['Hire in step with the project: civil works first, then structure, then MEP (mechanical, electrical and plumbing) and finishing. Over-hiring early wastes money; late hiring delays milestones. Share the schedule with the recruiter so trades are lined up before each phase begins.']},
    {h:'Testing trades',p:['Trade certificates from TEVTA, NAVTTC or equivalent bodies help, but a practical test on site is the best check: wiring a board, welding a joint, laying a course of blocks or reading a drawing. Engineers registered with the Pakistan Engineering Council should show their registration where required.']},
    {h:'Safety on site',p:['Construction is high-risk. Workers need helmets, safety shoes, harnesses for work at height and training before starting. Daily toolbox talks, an HSE officer on larger sites, clear incident reporting and first aid save lives. Employers are responsible for safe conditions; agree in writing how safety is managed when using contractors.']},
    {h:'Accommodation and welfare',p:['Remote sites need camps with clean water, safe food, sanitation, rest areas and transport. Good welfare lowers absenteeism and turnover, which directly affects project timelines.']},
  ],
  table:{caption:'Site roles and checks',head:['Role','Check'],rows:[
    ['Site engineer','Degree, PEC registration, project experience'],['Supervisor / foreman','Experience on similar projects'],['Electrician','Trade test and safety'],['Welder','Weld test'],['HSE officer','Safety qualification and site experience'],
  ]},
  checklist:{title:'Construction hiring checklist',items:['Map hiring to project phases','Define trades and numbers','Run trade tests','Confirm PPE and safety induction','Arrange camp and transport','Agree pay, overtime and contract length']},
  faqTitle:'Construction staffing: common questions',
  faqs:[
    ['Can you hire for projects outside major cities?','Yes, including remote project sites, with accommodation arranged by the employer.'],
    ['Do workers bring their own tools?','Agree this in the brief; many trades bring hand tools while employers provide power tools and PPE.'],
    ['How do you handle short projects?','Fixed-term contracts linked to the project are common; state the duration clearly.'],
  ],
},

'logistics-transport':{
  title:'Logistics and transport staffing in Pakistan',
  answer:'Logistics, courier and transport businesses in Pakistan hire drivers (LTV and HTV), delivery riders, dispatch coordinators, warehouse staff, loaders and inventory controllers. Check licences and driving records, test route knowledge and warehouse accuracy, plan shifts around delivery peaks, and set clear rules on cash handling, vehicle care and safety.',
  sections:[
    {h:'A growing sector',p:['E-commerce, food delivery, courier networks, freight forwarding and the movement of goods along routes such as the motorways and the CPEC corridors have made logistics one of Pakistan’s busiest hiring sectors. Karachi’s port, Lahore, Faisalabad and the twin cities are major hubs, with warehouses spreading along ring roads and motorway interchanges.']},
    {h:'Drivers and riders',p:['Drivers need the right licence category: LTV for cars and vans, HTV for trucks and buses. Riders need a motorbike licence and often their own bike. Check licences, ask about accidents and fines, test-drive or test-ride, and assess route knowledge. Rest rules and safe schedules prevent accidents on long-haul routes.']},
    {h:'Warehouse operations',p:['Warehouses need loaders, pickers, packers, forklift operators, storekeepers and inventory controllers. Accuracy matters as much as speed: test candidates on picking from a list, counting stock and recording entries. Forklift operators need training and safe practices.'],
      list:['Picking and packing accuracy','Stock counts and cycle checks','Inward and outward records','Forklift and equipment safety','Shift handovers']},
    {h:'Cash on delivery and trust',p:['Cash on delivery is still common in Pakistan, so riders handle money daily. Set clear cash deposit rules, daily reconciliation, receipts and limits. Fair, quick settlement of incentives builds trust in both directions.']},
  ],
  table:{caption:'Logistics roles',head:['Role','Key requirement'],rows:[
    ['Delivery rider','Bike licence, smartphone, city knowledge'],['LTV driver','LTV licence, route knowledge'],['HTV driver','HTV licence, long-haul experience'],['Warehouse picker','Accuracy, speed'],['Dispatch coordinator','Planning, communication'],
  ]},
  checklist:{title:'Logistics hiring checklist',items:['Confirm licence categories','Test route knowledge','Test warehouse accuracy','Set cash handling rules','Plan shifts around peaks','Agree vehicle care and fuel rules']},
  faqTitle:'Logistics staffing: common questions',
  faqs:[
    ['Can you supply riders quickly for a peak season?','Yes, for common roles in major cities; give notice for large numbers.'],
    ['Do riders need their own motorbikes?','Many employers ask for this and pay fuel or maintenance allowances; state it in the brief.'],
    ['Can you hire forklift operators?','Yes, with checks on training and experience.'],
  ],
},

'retail-fmcg':{
  title:'Retail and FMCG staffing in Pakistan',
  answer:'Retail chains, supermarkets, fashion brands and FMCG companies in Pakistan hire sales staff, cashiers, store supervisors, merchandisers, inventory staff and field sales teams. Plan staffing around footfall and seasons such as Eid and back-to-school, hire for customer service and honesty, train on products and systems, and set clear cash and stock controls.',
  sections:[
    {h:'Retail in Pakistan',p:['Organised retail has grown fast in Pakistan, with supermarket chains, fashion and lifestyle brands, electronics stores and malls in the major cities, alongside traditional markets and wholesale bazaars. FMCG companies employ large field forces to supply shops nationwide through distributors.']},
    {h:'Seasons and peaks',p:['Footfall peaks before Eid ul Fitr and Eid ul Adha, during wedding season, at the start of the school year and during sales events. Plan temporary staff and extended shifts weeks ahead. Ramadan changes shopping hours, with late-night peaks after iftar.']},
    {h:'Store roles',p:[],list:['Sales associates and cashiers','Store supervisors and managers','Visual merchandisers','Inventory and stockroom staff','Customer service desk','Security and loss prevention']},
    {h:'FMCG field forces',p:['FMCG companies hire order bookers, merchandisers, sales officers and area managers to cover routes of shops and distributors. Local market knowledge, regional language and reliability on daily routes matter most. Targets, incentives and route plans should be clear from day one.']},
    {h:'Controls',p:['Cash and stock losses hurt margins. Use cash counts at shift change, stock checks, clear discount authority and camera coverage. Treat staff fairly and investigate carefully; strong controls protect honest employees.']},
  ],
  table:{caption:'Retail and FMCG roles',head:['Role','Focus'],rows:[
    ['Sales associate','Customer service, product knowledge'],['Cashier','Accuracy, honesty, speed'],['Store manager','Team, sales, stock, compliance'],['Merchandiser','Displays and stock on shelves'],['Order booker','Shop visits and orders'],
  ]},
  checklist:{title:'Retail hiring checklist',items:['Plan staffing by footfall and season','Hire temporary staff before peaks','Train on products and POS','Set cash and stock controls','Define incentives clearly','Plan supervisor coverage']},
  faqTitle:'Retail staffing: common questions',
  faqs:[
    ['Can you hire for a new store opening?','Yes, through bulk hiring with assessment days and group induction.'],
    ['Do you hire FMCG field staff?','Yes, order bookers, merchandisers and sales officers for routes across Pakistan.'],
    ['Can temporary Eid staff become permanent?','Many employers retain their best seasonal staff; plan this into the process.'],
  ],
},

'manufacturing-energy':{
  title:'Manufacturing and energy staffing in Pakistan',
  answer:'Manufacturers and energy companies in Pakistan hire production operators, helpers, maintenance technicians, electricians, quality inspectors, supervisors, engineers and plant administration. Hire for task-specific competence with practical tests, put safety first, plan shift coverage with relief staff, and clarify statutory responsibilities when using contract labour.',
  sections:[
    {h:'Industrial clusters',p:['Pakistan’s manufacturing is concentrated in clusters: textiles and garments in Faisalabad, Lahore and Karachi; sports goods, surgical instruments and leather in Sialkot; light engineering and appliances in Gujranwala; food processing, cement, chemicals and pharmaceuticals across Punjab and Sindh; and energy projects from coal and gas plants to hydropower and solar in many provinces.']},
    {h:'Production and maintenance roles',p:[],list:['Machine operators and production helpers','Quality inspectors and lab staff','Maintenance mechanics and electricians','Boiler, utility and generator operators','Production supervisors and shift in-charges','Plant engineers and planners','Stores, dispatch and plant administration']},
    {h:'Safety and compliance',p:['Factories and plants carry risks from machines, electricity, heat, chemicals and heavy loads. Safety induction, protective equipment, machine guarding, lockout procedures and fire safety are essential. Employers must meet provincial labour, safety and social security obligations; when contract labour is used, agree in writing how these are handled.']},
    {h:'Energy sector specifics',p:['Power plants, grid stations and oil and gas sites need certified technicians and engineers, strict permit-to-work systems and shift teams able to respond to faults at any hour. Many sites are remote, so camps and rotation schedules are part of the offer.']},
    {h:'Productivity and retention',p:['Clear targets, fair overtime, on-time pay, decent canteens and transport, and supervisors who treat workers with respect improve productivity and reduce turnover. Skill training and promotion from within give workers a reason to stay.']},
  ],
  table:{caption:'Plant roles and checks',head:['Role','Check'],rows:[
    ['Machine operator','Practical test on similar machines'],['Maintenance electrician','Trade test, safety knowledge'],['Quality inspector','Measurement and standards test'],['Shift supervisor','Leadership and production experience'],['Plant engineer','Degree, registration, plant experience'],
  ]},
  checklist:{title:'Manufacturing hiring checklist',items:['Define skills per station','Run practical tests','Plan shifts with relief staff','Deliver safety induction','Clarify contract labour responsibilities','Arrange transport and canteen']},
  faqTitle:'Manufacturing staffing: common questions',
  faqs:[
    ['Can you staff a new production line?','Yes, from supervisors and technicians to operators, ideally hired before commissioning.'],
    ['Do you recruit for power and energy projects?','Yes, including technicians and engineers for plants and remote sites.'],
    ['Who is responsible for contract workers’ safety?','Site safety rests with the employer operating the site; agree responsibilities in writing with any contractor.'],
  ],
},

'education-professional-services':{
  title:'Staffing for schools, academies and professional service firms',
  answer:'Schools, colleges, academies, training institutes and professional service firms such as law, audit and consulting practices hire teachers, coordinators, administrators, receptionists, accounts staff and student or client support. Hire for subject knowledge and communication, verify degrees and experience, check references carefully for roles involving children, and plan hiring around the academic or business calendar.',
  sections:[
    {h:'Education hiring in Pakistan',p:['Private schools and academies educate a large share of children in Pakistani cities, from low-fee neighbourhood schools to premium school chains. Hiring peaks before the academic year begins and around mid-year transfers. Schools need teachers by subject and level, coordinators, admissions and front office staff, accounts, transport coordinators, guards and support staff.']},
    {h:'Teachers',p:['Look for subject knowledge, clear communication, classroom management and genuine care for students. A demo lesson with real students or colleagues reveals more than a CV. Verify degrees, B.Ed or teaching qualifications where required, and previous school references. For roles with access to children, check character references carefully.']},
    {h:'Safeguarding',p:['Schools and academies must protect children. Clear codes of conduct, supervision rules, safe recruitment checks, training on reporting concerns and rules for transport and one-to-one tutoring are essential. Parents increasingly ask schools how staff are checked.']},
    {h:'Professional service firms',p:['Law, audit, tax and consulting firms need associates, trainees, office administrators, receptionists, billing and accounts staff. Accuracy, confidentiality and professional presentation matter. Trainee hiring often follows exam calendars; plan intakes accordingly.'],
      list:['Associates and trainees by qualification stage','Office and practice administrators','Reception and client coordination','Billing, accounts and records','Document management and research support']},
  ],
  table:{caption:'Education and professional roles',head:['Role','Key check'],rows:[
    ['Teacher','Demo lesson, degree, references'],['Coordinator','Organisation and leadership'],['Admissions / front office','Communication with parents'],['Trainee associate','Exam stage, writing test'],['Practice administrator','Organisation, confidentiality'],
  ]},
  checklist:{title:'Education and services hiring checklist',items:['Plan around the academic or business calendar','Run demo lessons or writing tests','Verify degrees and teaching qualifications','Check references for roles with children','Include confidentiality terms','Plan induction and mentoring']},
  faqTitle:'Education and services staffing: common questions',
  faqs:[
    ['Can you hire teachers for specific subjects?','Yes, by subject and level, from primary to A-level and university entrance preparation.'],
    ['Do you recruit home tutors?','Yes, through ongoing teacher and tutor recruitment in major cities.'],
    ['Can you staff a new school campus?','Yes, from principal and coordinators to teachers and support staff, with hiring planned before the term begins.'],
  ],
},
};

import {industryMore} from './industries-more';
// Merge the extra depth into each industry guide.
for(const [k,m] of Object.entries(industryMore)){const g=industryGuides[k];if(!g)continue;
  g.sections.push({h:`Hiring by city: ${g.title.split(' staffing')[0].split(' hiring')[0]}`,p:m.cities},{h:'Pay and working terms',p:m.pay},{h:'Onboarding and retention',p:m.onboarding},{h:'Interview questions to ask',p:['Use questions like these to see how candidates handle the real work in this sector:'],list:m.questions},m.example,{h:'Mistakes to avoid',p:['These are the most common hiring mistakes in this sector:'],list:m.mistakes});
  g.faqs.push(...m.faqs);}
import {industryDepth} from './industries-depth';
for(const [k,secs] of Object.entries(industryDepth)){const g=industryGuides[k];if(g)g.sections.splice(1,0,...secs);}
import {industryDepth2} from './industries-depth2';
for(const [k,secs] of Object.entries(industryDepth2)){const g=industryGuides[k];if(g)g.sections.push(...secs);}
import {industryFinal} from './industries-final';
for(const [k,f] of Object.entries(industryFinal)){const g=industryGuides[k];if(!g)continue;g.sections.push({h:'Questions candidates will ask you',p:[f.intro],list:f.asks},{h:'Answering well',p:[f.close]});g.faqs.push(...f.faqs);}
import {industryExample2} from './industries-example2';
for(const [k,ex] of Object.entries(industryExample2)){const g=industryGuides[k];if(g)g.sections.push(ex);}
const extraFaqs:Record<string,[string,string][]>={
'construction-engineering':[['Can workers be verified before they travel to site?','Yes. Documents and references are checked and, where practical, trade tests are held near the candidate’s home before mobilisation.']],
'logistics-transport':[['How do you check a driver’s accident history?','We ask previous employers about accidents, fines and vehicle care, and discuss the driver’s record directly during the interview and test drive.'],['Can warehouse staff work night shifts?','Yes. Night shifts are common in distribution centres; agree transport, meals and rest breaks in advance.']],
'retail-fmcg':[['How many temporary staff should we hire for Eid?','Base it on last year’s footfall and sales by hour, then add cover for breaks and absence. Start hiring several weeks before the peak.'],['Can merchandisers cover several stores?','Yes, merchandisers often visit several outlets on a planned route; agree visit frequency and reporting.']],
'manufacturing-energy':[['How do you test machine operators?','Candidates operate or set up a similar machine under supervision, and are asked about safety checks, quality checks and common faults.'],['Can you supply workers for plant shutdowns?','Yes, short-term technicians and helpers for planned maintenance shutdowns, with safety induction before work starts.']],
'education-professional-services':[['Can you check teachers’ previous school references?','Yes. We contact previous principals or coordinators, with the candidate’s consent, about teaching quality and conduct.']],
};
for(const [k,f] of Object.entries(extraFaqs))industryGuides[k]?.faqs.push(...f);
const lastFaqs:Record<string,[string,string]>={
'logistics-transport':['Do riders need a smartphone?','Yes, most delivery operations use apps for orders, navigation and proof of delivery.'],
'retail-fmcg':['How do you reduce turnover among store staff?','Fair rosters, on-time pay, clear incentives, respectful supervisors and a visible path to senior roles keep store staff longer than pay rises alone.'],
'manufacturing-energy':['Do you recruit plant HR and admin staff?','Yes, including HR officers, timekeepers and plant administrators familiar with shift and attendance systems.'],
'education-professional-services':['Do you hire school admin and accounts staff?','Yes, including admissions officers, fee accounts staff and school receptionists.'],
};
for(const [k,f] of Object.entries(lastFaqs))industryGuides[k]?.faqs.push(f);
