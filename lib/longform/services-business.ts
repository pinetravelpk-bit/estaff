import type {LongForm} from './types';
import {serviceExtras} from './services-extra';

// Long-form guides for the ten business service pages.
export const businessServiceGuides:Record<string,LongForm>={

'executive-search':{
  title:'Executive search in Pakistan: how senior hiring works',
  answer:'Executive search is a confidential, targeted way to hire senior leaders such as general managers, finance heads, country managers and plant directors. Instead of advertising, the search team maps the market, approaches suitable people who are usually not looking for a job, assesses them in depth and presents a small shortlist for the board or owner to decide.',
  sections:[
    {h:'Why senior roles need a different approach',p:[
      'The best candidates for leadership roles in Pakistan are usually employed, performing well and not reading job boards. Many will only talk if the approach is discreet and the opportunity is explained properly. Advertising a CFO or general manager role publicly can also unsettle your current team, competitors and customers. Executive search solves both problems.']},
    {h:'The search process',p:['A typical search runs through these stages:'],
      list:['Briefing with the owner or board: the mandate, challenges and success measures','Position profile and compensation range agreed in writing','Market mapping: target companies, sectors and individuals','Confidential approaches and first conversations','In-depth interviews and, where useful, case discussions','Shortlist report with assessments, motivations and risks','Client interviews, references and offer negotiation','Follow-up through notice period and the first months']},
    {h:'Assessing leaders',p:[
      'For senior hires, track record matters more than credentials. Interviews focus on decisions the candidate has made, teams built, results achieved and how they handled failure. Referencing is done carefully, often with former bosses and peers, and always with the candidate’s permission so their current employer is not alerted.']},
    {h:'Confidentiality on both sides',p:[
      'Your company name can be kept confidential until a candidate is seriously interested. Candidate identities are shared only with the people you name. Documents and notes are stored securely and not passed on for other searches without consent.']},
  ],
  table:{caption:'Executive search vs advertised recruitment',head:['Point','Executive search','Advertised recruitment'],rows:[
    ['Candidate pool','Approached, mostly passive','Active applicants'],
    ['Confidentiality','High','Low'],
    ['Depth of assessment','Detailed, with referencing','Standard interviews'],
    ['Best for','Leadership and rare skills','Junior and mid-level roles'],
  ]},
  checklist:{title:'Before starting a senior search',items:['Agree the mandate and reporting line','Define success in the first year','Set the full compensation range','Decide who sees candidate names','Plan interview panel and dates','Prepare an honest picture of the challenges']},
  faqTitle:'Executive search: common questions',
  faqs:[
    ['Which roles suit executive search?','General managers, heads of finance, sales, operations, HR and IT, plant and project directors, country managers and other roles with few qualified candidates.'],
    ['Can the search stay confidential?','Yes. The company name, role and candidate identities are disclosed only as agreed with you.'],
    ['How are fees structured?','Fees for senior searches are agreed in writing before the search starts, based on the role and scope.'],
  ],
},

'technical-recruitment':{
  title:'Technical recruitment for engineering, IT and skilled trades',
  answer:'Technical recruitment finds people whose skills can be tested: software developers, network engineers, electrical and mechanical engineers, technicians, electricians and maintenance staff. The brief lists the exact skills, tools and certifications, and candidates are screened through technical questions or practical tests before you meet them.',
  sections:[
    {h:'Getting the technical brief right',p:[
      'Technical roles are easy to over-specify. A long list of every technology the team has ever used scares good candidates away. Separate the core stack or trade skills the person will use daily from the tools they can learn on the job. Note the certifications that are legally or contractually required, such as electrical licences, safety cards or professional engineering registration.'],
      list:['Core skills and tools used daily','Required certifications or registration','Equipment, systems or machinery involved','Site or office work, travel, shifts','Safety requirements for the work environment','Seniority: hands-on, supervisor or lead']},
    {h:'Screening skills, not keywords',p:[
      'CVs in technical fields are full of keywords. Screening goes further: short technical conversations, practical tasks or trade tests prepared with your engineers. For software roles this can be a small coding task; for technicians, a hands-on check of fault-finding, wiring or maintenance procedures; for engineers, a discussion of projects they actually delivered.']},
    {h:'Where technical talent is in Pakistan',p:[
      'Software and IT talent is concentrated in Lahore, Karachi, Islamabad and Rawalpindi, with growing pools in Peshawar, Faisalabad and Multan. Industrial and electrical engineering talent is spread around manufacturing and energy hubs such as Faisalabad, Sialkot, Gujranwala, Karachi’s industrial zones, Hub and the power plants of southern Punjab. Many technicians are willing to relocate for the right role with accommodation.']},
    {h:'Safety and site readiness',p:[
      'For site and plant roles, confirm medical fitness requirements, personal protective equipment, shift patterns and accommodation before offers are made. Candidates who know the conditions in advance are more likely to stay.']},
  ],
  table:{caption:'Practical tests by technical role',head:['Role','Test'],rows:[
    ['Software developer','Small paid coding task or code review'],
    ['Network / IT support','Troubleshooting scenario'],
    ['Electrician','Wiring and safety practical'],
    ['Maintenance technician','Fault-finding on equipment'],
    ['Mechanical engineer','Project walkthrough and calculations'],
  ]},
  checklist:{title:'Technical hiring checklist',items:['List core skills vs learnable tools','Confirm required certifications','Prepare a practical test with your team','Agree site conditions and safety needs','Set salary and allowances for shifts or travel','Plan onboarding and induction']},
  faqTitle:'Technical recruitment: common questions',
  faqs:[
    ['Can you test candidates before I interview them?','Yes. Technical questions or practical tests are agreed with you and run before the shortlist.'],
    ['Do you recruit for factories and project sites?','Yes, including technicians, electricians, supervisors and engineers for plants, construction and energy projects.'],
    ['Can you hire remote developers?','Yes, through the remote staffing service, with paid test tasks and video interviews.'],
  ],
},

'industrial-staffing':{
  title:'Industrial and contract staffing for factories, warehouses and projects',
  answer:'Industrial staffing supplies workers for production lines, warehouses, packing units and project sites, either as permanent hires or for a defined contract period. The plan covers numbers, shifts, skills, safety training, accommodation and transport, so workers arrive ready to start and the site stays compliant.',
  sections:[
    {h:'What industrial staffing covers',p:[
      'Textile mills, garment units, food processing plants, packaging, pharmaceuticals, warehouses, logistics hubs and construction or energy projects all need dependable workers in numbers. Roles include machine operators, helpers, packers, loaders, store keepers, quality inspectors, supervisors, electricians and maintenance technicians.']},
    {h:'Plan the workforce',p:['A good industrial staffing plan answers:'],
      list:['How many workers per shift and role','Contract length or permanent hiring','Skills, experience and trade certificates needed','Medical fitness and age requirements','Safety training and personal protective equipment','Accommodation, meals and transport','Pay, overtime rates and payment schedule']},
    {h:'Safety and compliance',p:[
      'Industrial sites carry real risks. Workers should receive site induction and safety briefing before starting, the right protective equipment, and clear instructions on machine safety. Employers remain responsible for workplace safety and for statutory obligations such as social security registrations, minimum wage and working-hour rules that apply in their province. Agree in writing which party handles which responsibilities in any contract staffing arrangement.']},
    {h:'Keeping workers',p:[
      'Turnover in factory roles is costly. Paying on time, accurate overtime, decent accommodation where provided and a supervisor who explains targets fairly do more for retention than any bonus. Short check-ins in the first month help spot problems early.']},
  ],
  table:{caption:'Permanent vs contract industrial staff',head:['Need','Option'],rows:[
    ['Long-term production roles','Permanent hiring'],
    ['Seasonal peak or a single order','Fixed-term contract staffing'],
    ['New plant start-up','Phased hiring with supervisors first'],
    ['Project site for months','Project contracts with accommodation'],
  ]},
  checklist:{title:'Industrial staffing checklist',items:['Confirm numbers and shifts','Define skills and fitness needs','Prepare safety induction','Arrange PPE, accommodation and transport','Agree pay and overtime in writing','Clarify statutory responsibilities','Plan supervisor support for new batches']},
  faqTitle:'Industrial staffing: common questions',
  faqs:[
    ['Can workers relocate to our site?','Many do, especially when accommodation and transport are provided. Mention this in the brief.'],
    ['Which cities do you cover for industrial hiring?','Industrial hubs including Faisalabad, Lahore, Sialkot, Gujranwala, Karachi, Hub, Multan and others across Pakistan.'],
    ['Who handles social security and other obligations?','This is agreed in writing for each arrangement. Statutory obligations ultimately rest with the employer of record.'],
  ],
},

'business-process-outsourcing':{
  title:'Business process outsourcing (BPO) with Pakistani teams',
  answer:'Business process outsourcing moves a defined, repeatable process, such as customer support, data entry, back-office processing or appointment setting, to a dedicated team that follows your procedures and service levels. Success depends on documenting the process, agreeing quality measures and starting with a pilot before scaling.',
  sections:[
    {h:'Processes that outsource well',p:[
      'Processes with clear steps and measurable output work best: inbound and outbound calls, chat and email support, order processing, data entry and cleansing, invoice and document processing, lead qualification and appointment setting. Work that needs constant judgement from senior people, or deep access to confidential systems, is harder to outsource and should be scoped carefully.']},
    {h:'Document before you move',p:['Before a BPO team starts, prepare:'],
      list:['Step-by-step process guides and examples','Scripts, templates and escalation rules','Systems and access levels needed','Volumes by day and hour','Service levels: response times, accuracy, resolution','Quality checks and reporting format']},
    {h:'Pilot first',p:[
      'Start with a small team and a limited scope for a few weeks. Measure the agreed indicators, review recordings or samples, and refine the scripts. Scale only when the pilot meets the targets. This avoids discovering problems after a large team has been hired.']},
    {h:'Data protection',p:[
      'Customer data must be protected. Limit system access to what each role needs, use secure connections, and agree how data is stored, retained and deleted. If your customers are in regions with strict privacy laws, check the requirements with your advisers before sharing data.']},
  ],
  table:{caption:'Key BPO measures',head:['Process','Typical measures'],rows:[
    ['Customer support','Response time, resolution rate, satisfaction'],
    ['Data entry','Accuracy, volume per day'],
    ['Appointment setting','Calls made, appointments booked, show rate'],
    ['Back office','Turnaround time, error rate'],
  ]},
  checklist:{title:'BPO setup checklist',items:['Choose one process to start','Document steps and scripts','Define service levels','Plan access and data protection','Run a pilot','Review and scale']},
  faqTitle:'BPO: common questions',
  faqs:[
    ['Can the team work in our time zone?','Yes. Night and split shifts for international clients are common in Pakistani BPO teams; state the hours in the brief.'],
    ['Do you provide the office and equipment?','The scope is agreed per project: some clients need a staffed team only, others a complete managed setup.'],
    ['How quickly can a pilot start?','After the process is documented and the team recruited and trained; timing depends on volume and skills needed.'],
  ],
},

'hr-consultancy':{
  title:'HR consultancy: building the people side of your business',
  answer:'HR consultancy helps owners and managers design how people are organised, paid, managed and developed: organisation charts, job descriptions, salary structures, performance reviews, policies and HR processes. The result is a practical plan your team can run, written for your company’s size and stage rather than copied from a template.',
  sections:[
    {h:'Signs you need HR advice',p:[
      'Staff asking why colleagues in similar roles earn different amounts, managers unsure who reports to whom, reviews that never happen, high turnover in one department or a founder still approving every leave request: these are signs that the business has outgrown informal HR.']},
    {h:'What a consultancy project can cover',p:[],
      list:['Organisation design and reporting lines','Job descriptions and role levels','Salary bands and allowance policy','Performance review process and templates','Employee handbook and core HR policies','Hiring process and interview guides','Exit interviews and turnover analysis']},
    {h:'How the work is done',p:[
      'A project usually starts with interviews of the owner and key managers, a review of current documents and a short staff survey if useful. Recommendations are discussed in draft so they fit how your business really works. Templates and policies are then finalised and handed over with a short briefing for managers.',
      'Legal matters such as disputes, terminations with legal risk or complex contracts should also be reviewed by your lawyer.']},
    {h:'Making changes stick',p:[
      'New salary bands or review processes fail when they are announced and forgotten. Plan the rollout: explain the why to managers first, communicate clearly to staff, and review after the first cycle.']},
  ],
  table:{caption:'Typical HR consultancy outputs',head:['Area','Output'],rows:[
    ['Structure','Organisation chart and role levels'],
    ['Pay','Salary bands and allowance rules'],
    ['Performance','Review form, calendar and guidance'],
    ['Policies','Employee handbook'],
    ['Hiring','Interview guides and scorecards'],
  ]},
  checklist:{title:'Before an HR consultancy project',items:['List the problems to solve','Gather current contracts and policies','Share the staff list and salaries confidentially','Name a project owner','Agree timeline and deliverables']},
  faqTitle:'HR consultancy: common questions',
  faqs:[
    ['Is this suitable for small businesses?','Yes. Small businesses often benefit most because a few simple policies and clear roles prevent problems as they grow.'],
    ['Will you implement the changes?','Implementation support can be included in the scope, or combined with HR outsourcing for ongoing administration.'],
  ],
},

'hris-support':{
  title:'HRIS and HR systems support',
  answer:'HRIS support helps you choose, set up and run an HR information system for employee records, attendance, leave and payroll inputs. It covers mapping your processes, cleaning employee data, configuring the system, training users and checking the first payroll and reports, so the software actually reduces manual work.',
  sections:[
    {h:'Do you need an HRIS?',p:[
      'If attendance is collected on paper or WhatsApp, leave balances live in spreadsheets and payroll needs days of manual checking, a simple HR system can save time and errors. Very small teams may manage well with good spreadsheets; growing teams with several locations usually benefit from a system.']},
    {h:'Choosing a system',p:['Compare options against your real needs:'],
      list:['Employee records and document storage','Attendance: biometric, mobile or manual','Leave requests and approvals','Payroll inputs or integrated payroll','Reports needed by management','Number of users, locations and languages','Data security, backups and access control','Cost, support and exit options']},
    {h:'Setting it up',p:[
      'Implementation starts with process mapping, because software should follow your agreed rules, not invent them. Employee data is then cleaned and imported, settings for leave and attendance configured, and test cases run. Users are trained by role: employees, managers and HR.',
      'Run the old and new processes in parallel for one payroll cycle where possible, and compare results before switching off spreadsheets.']},
    {h:'After go-live',p:[
      'Plan who maintains the system, how changes are approved and how often data is checked. Most systems that fail do so because nobody owns them after launch.']},
  ],
  checklist:{title:'HRIS project checklist',items:['Map current HR processes','List must-have features','Shortlist and demo systems','Clean employee data','Configure and test','Train users by role','Run one parallel payroll','Assign a system owner']},
  faqTitle:'HRIS: common questions',
  faqs:[
    ['Do you sell HR software?','No. estaff.pk helps you choose and implement a system that fits; the software licence is between you and the provider.'],
    ['Can our biometric machines connect?','Often yes. Compatibility is checked during selection.'],
  ],
},

'training-development':{
  title:'Employee training and development',
  answer:'Employee training and development builds the skills your teams need: induction for new joiners, customer service, communication, supervisory skills, workplace safety and role-specific training. Good training starts from a skills gap, sets clear outcomes and checks afterwards whether people use what they learned at work.',
  sections:[
    {h:'Start with the gap',p:[
      'Training is most useful when it fixes a real problem: complaints about service, mistakes in a process, new supervisors who were promoted for technical skill but never taught to manage people. Talk to managers and staff, look at complaints or error data and agree what should be different after the training.']},
    {h:'Common programmes',p:[],
      list:['Induction for new joiners','Customer service and complaint handling','Communication and business English','First-line supervisor and team leader skills','Workplace safety and fire awareness','Household staff training: hygiene, cooking basics, childcare routines','Role-specific technical or software training']},
    {h:'Make it practical',p:[
      'Short sessions with role-play, real examples from your workplace and practice beat long lectures. For household staff, practical demonstrations in Urdu or the worker’s language are far more effective than handouts.']},
    {h:'Measure the result',p:[
      'Check a few weeks later: are complaints down, errors fewer, supervisors holding team meetings? Ask participants and their managers. Training that changes nothing should be redesigned, not repeated.']},
  ],
  checklist:{title:'Training planning checklist',items:['Identify the problem or skill gap','Set two or three clear outcomes','Choose format and language','Schedule around shifts','Run the training with practice','Follow up after a few weeks']},
  faqTitle:'Training: common questions',
  faqs:[
    ['Can training be delivered in Urdu?','Yes. Delivering in the language people are most comfortable with makes training far more effective.'],
    ['Can you train household staff?','Basic training in hygiene, routines and safety can be arranged; specialised care training should come from qualified providers.'],
  ],
},

'facility-management':{
  title:'Facility and workplace support staffing',
  answer:'Facility support staffing provides the people who keep buildings running: cleaners and janitorial staff, office boys, security guards, receptionists, maintenance technicians, gardeners and supervisors. A clear scope covers duties, shifts, uniforms, supervision and quality checks so the workplace stays clean, safe and welcoming.',
  sections:[
    {h:'Roles in facility support',p:[
      'Offices, plazas, schools, hospitals, hotels, banks and housing societies all need a mix of support staff. The most common are janitorial staff, office boys, security guards, front desk staff, electricians and general maintenance technicians, and gardeners for grounds.']},
    {h:'Define the service',p:['Write the scope for each area of the building:'],
      list:['Areas and frequency of cleaning','Security posts, hours and patrol routes','Reception duties and visitor management','Maintenance tasks and response times','Shifts, weekly off and cover for absence','Uniforms, equipment and consumables','Supervisor and reporting arrangements']},
    {h:'Security staff',p:[
      'Security guards should have a CNIC, a police character certificate and appropriate training. Armed guards are subject to licensing and legal requirements that the security provider must meet; check these carefully before engaging armed security.']},
    {h:'Quality checks',p:[
      'Simple daily checklists, a weekly walkround with the supervisor and a channel for staff complaints keep standards up. Agree how issues are reported and fixed.']},
  ],
  table:{caption:'Facility roles and key requirements',head:['Role','Key requirements'],rows:[
    ['Janitorial staff','Reliability, hygiene training'],
    ['Security guard','CNIC, character certificate, training'],
    ['Receptionist','Communication, visitor log'],
    ['Maintenance technician','Trade skills, safety awareness'],
    ['Office boy','Punctuality, courtesy'],
  ]},
  checklist:{title:'Facility staffing checklist',items:['Map areas and tasks','Set shifts and cover','Decide uniforms and equipment','Confirm checks for each role','Appoint a supervisor','Agree quality checks and reporting']},
  faqTitle:'Facility support: common questions',
  faqs:[
    ['Can you provide staff for housing societies?','Yes: guards, cleaners, gardeners and maintenance staff for societies and residential buildings.'],
    ['Who supervises the staff?','This is agreed in the scope: your facility manager, an on-site supervisor or both.'],
  ],
},

'employer-of-record':{
  title:'Employer of Record in Pakistan: what to check before you decide',
  answer:'An Employer of Record (EOR) is a company that legally employs people on your behalf in a country where you have no entity, handling contracts, payroll, tax withholding and statutory registrations while the employee works for you day to day. estaff.pk helps you review whether an EOR, a contractor model or your own entity fits your situation before you commit.',
  sections:[
    {h:'When businesses consider an EOR',p:[
      'Overseas companies that want to hire one or a few people in Pakistan, without registering a local company, often look at EOR providers. It can also suit businesses testing the market before setting up an office.']},
    {h:'Questions to answer first',p:[],
      list:['How many people will you hire, and for how long?','Will they work only for you, under your direction?','Where will they work, and with what equipment?','How will salary and benefits compare with local practice?','Who handles income tax withholding and statutory contributions?','What happens to intellectual property and confidential data?','How are termination and notice handled?']},
    {h:'EOR, contractor or own entity',p:[
      'Engaging people as independent contractors is simpler, but if they work like employees, the arrangement can carry legal and tax risks. An EOR shifts the employment administration to the provider. Registering your own entity gives full control but takes time and ongoing compliance work. The right choice depends on headcount, timeline and risk appetite.',
      'This page is a planning guide, not legal or tax advice. Confirm the structure with qualified advisers in Pakistan and your home country before signing any agreement.']},
    {h:'What estaff.pk can do',p:[
      'We can help you define the roles, recruit the people and prepare the information an EOR provider or your advisers will need. Where a licensed or registered provider is required for the employment itself, the agreement is between you and that provider.']},
  ],
  checklist:{title:'EOR scope review checklist',items:['List roles, headcount and duration','Decide employee vs contractor nature of work','Get local salary and benefit benchmarks','Review EOR provider contracts and fees','Confirm tax and statutory handling','Check IP and data clauses','Take legal and tax advice']},
  faqTitle:'Employer of Record: common questions',
  faqs:[
    ['Is estaff.pk an Employer of Record?','estaff.pk helps you plan the scope and recruit the people. Formal employment through an EOR is handled under an agreement with the provider you choose.'],
    ['Can I hire contractors instead?','Possibly, if the work is genuinely independent. Take advice, because treating employees as contractors can create risks.'],
  ],
},

'overseas-recruitment':{
  title:'Overseas employment from Pakistan: planning an enquiry safely',
  answer:'Recruiting Pakistani workers for jobs abroad is regulated. Only Overseas Employment Promoters licensed under Pakistan’s emigration law may recruit workers for overseas employment, and workers must complete official emigration procedures. estaff.pk helps employers plan the requirement and explains the steps, and the recruitment itself must go through a properly licensed promoter.',
  sections:[
    {h:'Why licensing matters',p:[
      'Pakistan regulates overseas recruitment to protect workers from fraud and exploitation. Licensed Overseas Employment Promoters are registered with the Bureau of Emigration and Overseas Employment, and workers going abroad for employment are processed through the Protector of Emigrants. Unlicensed “agents” who take money for foreign jobs are a serious problem; workers lose savings and sometimes end up stranded.']},
    {h:'For employers abroad',p:['Before you start, prepare:'],
      list:['Job titles, numbers and the work location','Contract length, salary, accommodation, food and transport','Qualifications, trade tests and medical requirements','Visa and work permit sponsorship in your country','Who pays recruitment, travel and visa costs','A licensed Pakistani promoter to handle recruitment']},
    {h:'For workers',p:[
      'If someone offers you a job abroad, ask for their licence number and check it with the Bureau of Emigration and Overseas Employment. Never hand over your passport or pay large sums to an unlicensed person. Make sure you receive a written contract with salary, hours and conditions before you travel, and that your emigration is registered officially.']},
    {h:'How estaff.pk helps',p:[
      'We help overseas employers turn their needs into a clear requirement and understand the process and timelines. Recruitment for overseas employment is carried out only through licensed promoters, in line with Pakistani law.']},
  ],
  checklist:{title:'Overseas hiring enquiry checklist',items:['Define roles, numbers and terms','Confirm visa and work permit route','Choose a licensed Overseas Employment Promoter','Agree costs in writing','Plan trade tests and medicals','Give workers written contracts before travel']},
  faqTitle:'Overseas employment: common questions',
  faqs:[
    ['Does estaff.pk send workers abroad?','No. estaff.pk helps plan the requirement. Recruitment for overseas employment must go through an Overseas Employment Promoter licensed in Pakistan.'],
    ['How do I check if an agent is licensed?','Ask for the licence number and verify it with the Bureau of Emigration and Overseas Employment before paying anything or handing over documents.'],
  ],
},
};

for(const [k,v] of Object.entries(serviceExtras))if(businessServiceGuides[k]){businessServiceGuides[k].sections.push(...v.sections);businessServiceGuides[k].faqs.push(...v.faqs);}
