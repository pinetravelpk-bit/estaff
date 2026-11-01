import type {LongForm} from './types';
import {serviceExtras} from './services-extra';

// Long-form guides for the eight core service pages. Written for each service; legal and
// statutory points are stated as things to confirm, never as fixed figures.
export const coreServiceGuides:Record<string,LongForm>={

'domestic-staff':{
  title:'The complete guide to hiring domestic staff in Pakistan',
  answer:'To hire domestic staff in Pakistan, decide which household tasks matter most, choose the role that covers them (cook, driver, maid, nanny, care attendant or a domestic couple), set hours, days off and a monthly salary in writing, verify the CNIC and two references, run a paid trial of a few days and agree a written arrangement before the start date.',
  sections:[
    {h:'Start with the work, not the job title',p:[
      'Most households in Islamabad, Rawalpindi, Lahore and Karachi do not need “a maid” or “a cook” so much as a set of tasks done reliably every day. Write those tasks down first: breakfast and lunch for six people, the school run at 7:15, laundry three times a week, an elderly parent who needs help moving around in the afternoon. Once the list is on paper, the right role usually becomes obvious, and so does the point where one person cannot cover everything.',
      'A common mistake is asking one employee to cook, clean a large house, drive and look after a child. That worker is stretched, quality drops and they leave. If the list is long, consider a domestic couple (one cooks and manages the house, the other drives or gardens) or a full-time maid plus a part-time cook. Splitting work this way usually costs less than repeated rehiring.'],
      list:['Cooking: number of people, cuisines, dietary needs, who buys groceries','Cleaning and laundry: size of the house, frequency, ironing','Driving: daily routes, school and office timings, car type, out-of-city trips','Childcare: ages, routines, school pick-ups, whether the nanny travels with the family','Elderly or patient care: mobility help, medicine reminders, night duty, medical training needed']},
    {h:'Live-in or live-out',p:[
      'Live-in staff stay at your home, which suits families with early mornings, late evenings or round-the-clock care. You need a private, safe room with a fan or heater depending on the season, access to a washroom, meals and clear off-duty hours. Live-out staff come for fixed hours and go home, which suits smaller households and part-time roles.',
      'Whichever you choose, write the daily hours, the weekly day off and the annual leave arrangement into the agreement. Disputes with household staff in Pakistan most often start over unpaid extra hours or unclear leave, not over the salary itself.']},
    {h:'Setting a fair salary',p:[
      'Pay depends on the city, the role, experience, hours, whether the job is live-in and whether meals and accommodation are provided. A trained cook who manages a kitchen for a large family earns more than a helper; a driver for a family with several daily routes earns more than one who drives once a day. Ask candidates their current pay and expectations, and compare a few before you decide.',
      'Check the minimum wage notified by your provincial government for the current year, and remember that some provinces and the federal capital now have laws that apply specifically to domestic workers. Agree whether salary is paid monthly in cash or by bank transfer, on which date, and how overtime or extra guests are handled.']},
    {h:'Checks before anyone enters your home',p:[
      'Verification protects both your family and the worker. At minimum, see the original CNIC and keep a copy, speak to at least two previous employers yourself, and ask the candidate to explain any long gaps. For nannies, drivers and live-in staff, many families also ask for a police character certificate from the candidate’s district. Drivers must show a valid licence for the category of vehicle they will drive.',
      'estaff.pk screening covers identity, references and role-specific checks agreed with you in advance, and the result is shared with you before you meet the candidate. No check can predict the future perfectly, so a short paid trial and a written agreement remain essential.']},
    {h:'The first two weeks',p:[
      'Plan the first days carefully. Show the house routines, the rules about guests and phones, where cleaning supplies and first-aid items are kept and who to call in an emergency. A paid trial of three to seven days lets both sides check the fit. After two weeks, sit down for ten minutes, give honest feedback and fix small issues early.']},
  ],
  table:{caption:'Which household role fits your needs?',head:['Role','Best for','Typical arrangement','Key check'],rows:[
    ['Cook','Daily meals for a family, entertaining','Live-in or day shift','Trial cooking day, hygiene'],
    ['Driver','School and office runs, errands','Fixed day hours, overtime agreed','Licence category, route knowledge'],
    ['Maid / housekeeper','Cleaning, laundry, house routines','Live-in, full-day or part-time','References from previous homes'],
    ['Nanny / babysitter','Infants and young children','Live-in or day','Childcare references, character certificate'],
    ['Care attendant','Elderly parents, recovery at home','Day, night or 24-hour shifts','Patient-care experience, patience'],
    ['Domestic couple','Large homes needing two people','Live-in','References for both partners'],
  ]},
  checklist:{title:'Your domestic staff hiring checklist',items:['Write the daily task list and choose the role','Decide live-in or live-out, hours and weekly day off','Set a salary range and payment date','Share the brief with estaff.pk or post a job','Interview at least two shortlisted candidates','Verify CNIC, references and, where relevant, licence or certificate','Run a paid trial of a few days','Sign a written agreement and keep copies of documents']},
  faqTitle:'Domestic staff: common questions',
  faqs:[
    ['How long does it take to find domestic staff?','It depends on the role, area, hours and salary. Common roles in Islamabad and Rawalpindi are usually quicker to shortlist than specialist care roles or live-in staff for smaller cities. A clear brief and a realistic salary are the two things that shorten the search most.'],
    ['Do I need a written agreement with my maid or driver?','Yes. A short written agreement covering duties, hours, salary, payment date, day off, leave and notice protects both sides and avoids most disputes. Several Pakistani jurisdictions now have domestic worker laws, so check what applies where you live.'],
    ['Can estaff.pk replace a worker who leaves?','Replacement terms, if any, are agreed in writing before the placement. Ask for them at the start so you know the period and conditions.'],
    ['Is it free for workers?','Yes. estaff.pk never charges job seekers to apply or to be placed.'],
  ],
},

'corporate-recruitment':{
  title:'How corporate recruitment works with estaff.pk',
  answer:'Corporate recruitment with estaff.pk starts with a written brief: the role, team, salary range, location and the skills that are essential versus nice to have. We source and screen candidates against that brief, share a shortlist with notes, coordinate interviews and help with the offer, while your managers make every hiring decision.',
  sections:[
    {h:'Write a brief your managers agree on',p:[
      'Most slow hires in Pakistani companies trace back to a vague brief. Before sourcing starts, the hiring manager, HR and whoever approves the budget should agree on four things: the outcomes the person must deliver in the first six months, the skills and qualifications that are truly essential, the salary range including allowances, and who will interview at each stage.',
      'Separate “must have” from “nice to have”. Requiring ACCA for a role that mainly needs accurate bookkeeping, or ten years’ experience for a mid-level post, shrinks the candidate pool without improving quality.'],
      list:['Job title, department and reporting line','Key outcomes for the first 6 months','Essential skills, qualifications and certifications','Salary range, allowances and benefits','Work location, hours, hybrid or on-site','Interview stages and decision makers','Target joining date and notice periods you can accept']},
    {h:'Sourcing and screening',p:[
      'Once the brief is agreed we search our candidate database, advertise the role on estaff.pk and in the relevant job channels, and approach passive candidates for specialist or senior roles. Screening checks the CV against the brief, confirms current salary and notice period, and tests the essential skills through a short phone or video conversation.',
      'For accounts, IT, sales and administrative roles, a practical exercise is often more useful than another interview round. We can arrange simple tests, for example an Excel reconciliation, a short writing task or a technical question set prepared with your team.']},
    {h:'Shortlist, interviews and decisions',p:[
      'You receive a shortlist with a short note on each candidate: why they fit, any gaps, their expectations and availability. We schedule interviews around your managers’ calendars, collect feedback after each round and keep candidates informed so strong people do not drop out while waiting.',
      'Your managers decide whom to hire. Our job is to make that decision easier with organised information and a fair process.']},
    {h:'Offer, references and joining',p:[
      'Before an offer, references and documents are checked as agreed: identity, education, previous employment and any professional registration. We help present the offer, handle questions about salary and benefits, and stay in touch through the notice period, which is when many accepted offers in Pakistan are lost to counter-offers.',
      'After joining, a short check-in at the end of the first month helps catch early problems. Replacement terms, if any, are agreed in writing before the search starts.']},
  ],
  table:{caption:'Choosing the right recruitment approach',head:['Situation','Best approach','Why'],rows:[
    ['One office role, common skills','Corporate recruitment','Focused shortlist from active candidates'],
    ['10+ similar roles at once','Bulk hiring','Group screening and assessment days'],
    ['Senior or confidential role','Executive search','Discreet approach to passive candidates'],
    ['Engineers, IT, technical specialists','Technical recruitment','Skills-based screening by role'],
    ['Factory or project workforce','Industrial staffing','Shift and site requirements built in'],
  ]},
  checklist:{title:'Before you start a corporate search',items:['Agree the brief with the hiring manager and HR','Confirm the approved salary range','Decide interview stages and who attends','Prepare a practical task if useful','Block interview time in managers’ calendars','Agree how quickly feedback will be given']},
  faqTitle:'Corporate recruitment: common questions',
  faqs:[
    ['Which roles does corporate recruitment cover?','Administration and reception, accounts and finance, sales and marketing, HR, IT and technical staff, customer service and supervisory roles. Senior leadership roles are handled through executive search.'],
    ['How are fees agreed?','Fees depend on the role, seniority and scope and are agreed in writing before the search starts. Candidates are never charged.'],
    ['Can you recruit outside Islamabad and Rawalpindi?','Yes. estaff.pk recruits across Pakistan, including Lahore, Karachi, Faisalabad, Multan and Peshawar, and for remote roles anywhere in the country.'],
    ['Do you check references and documents?','Yes, as agreed in the brief: identity, education, previous employment and any role-specific certificates or registrations.'],
  ],
},

'hr-outsourcing':{
  title:'HR outsourcing for Pakistani businesses: what it covers and how to set it up',
  answer:'HR outsourcing means an outside team handles agreed HR tasks for your business, such as employee records, onboarding paperwork, attendance and leave tracking, HR letters and monthly reports, while you keep control of decisions. It suits companies that are growing but do not yet need a full HR department.',
  sections:[
    {h:'When outsourcing HR makes sense',p:[
      'Small and mid-sized businesses in Pakistan often reach a point where the owner or an accountant is handling HR “on the side”: offer letters in Word, leave in a notebook, attendance in WhatsApp messages. That works for ten people. At thirty or fifty, mistakes start to cost money and staff trust. Outsourcing gives you organised, consistent HR without hiring a full team.',
      'It also helps companies opening a new branch or city, startups with remote teams and overseas businesses employing people in Pakistan through a local partner.']},
    {h:'What can be included',p:['Every scope is agreed in writing. Typical elements are:'],
      list:['Employee files: CNIC copies, contracts, emergency contacts, bank details','Onboarding: offer and appointment letters, joining checklist, policy acknowledgement','Attendance and leave tracking with monthly summaries for payroll','HR letters: experience, salary certificates, warnings drafted for your approval','Exit process: resignation records, clearance and final settlement inputs','Policy handbook drafting and updates','Monthly HR reports: headcount, joiners, leavers, leave balances']},
    {h:'What stays with you',p:[
      'Decisions about hiring, pay rises, promotions, warnings and terminations stay with your management. The outsourced team prepares information, drafts documents and follows the process you approve. Statutory registrations, such as social security and pensions, remain the employer’s legal responsibility even when the paperwork is handled by a partner, so agree clearly who files what and when.']},
    {h:'Setting it up in four steps',p:[
      'First, map what exists today: staff list, contracts, policies and where records are kept. Second, agree the scope, monthly calendar and who approves what. Third, clean and organise the records into a secure, consistent format. Fourth, run the first month together and review what needs adjusting.',
      'Access to employee data should be limited to named people and protected. Agree how records are shared, stored and returned if the engagement ends.']},
  ],
  table:{caption:'In-house HR vs outsourced HR',head:['Point','In-house HR','Outsourced HR'],rows:[
    ['Cost','Salary, benefits, office space','Agreed monthly fee for a defined scope'],
    ['Coverage','Depends on one person being available','Team cover, defined service levels'],
    ['Expertise','Varies by hire','Process and templates already in place'],
    ['Control','Full daily control','Decisions stay with you; tasks are delegated'],
  ]},
  checklist:{title:'Information to prepare',items:['Current staff list with joining dates and salaries','Existing contracts and policies','Leave and attendance rules','Who approves what in the business','Your payroll calendar','Any open HR issues to resolve first']},
  faqTitle:'HR outsourcing: common questions',
  faqs:[
    ['Is HR outsourcing the same as payroll outsourcing?','No. Payroll covers salary calculation and payment. HR outsourcing covers records, documents, onboarding, leave and reports. Many businesses combine both so attendance flows straight into payroll.'],
    ['Will our employee data be safe?','Access is limited to named people, and storage, sharing and return of records are agreed in writing at the start.'],
    ['Can you write our HR policy?','Yes, a policy handbook can be drafted for your approval, covering working hours, leave, conduct, IT use and grievances. Legal review for complex matters should be done by your lawyer.'],
  ],
},

'payroll-management':{
  title:'Payroll management in Pakistan: a practical guide',
  answer:'Payroll management means calculating each employee’s pay every month from approved attendance, salary, allowances and deductions, applying income tax withholding and other statutory deductions that apply to your business, getting management approval, paying salaries and issuing payslips. estaff.pk runs this cycle for you on an agreed calendar, with your team approving before payment.',
  sections:[
    {h:'The monthly payroll cycle',p:['A reliable payroll follows the same calendar every month. A typical cycle looks like this:'],
      list:['Collect inputs: attendance, leave, overtime, new joiners, leavers, salary changes','Calculate gross pay, allowances, deductions and net pay for each employee','Apply income tax withholding on salaries and any other statutory deductions that apply','Review exceptions with your HR or finance contact','Management approval of the payroll register','Salary transfers through your bank and payslips to employees','Monthly reports and records kept for audits and filings']},
    {h:'Statutory points to confirm for your business',p:[
      'Employers in Pakistan withhold income tax on salaries under the Income Tax Ordinance and must deposit and report it on time. Depending on your size, sector and province, other obligations can apply, such as old-age benefits contributions, provincial employees’ social security and minimum wage notifications that change each year.',
      'These rules differ by province and business type and are updated regularly, so we confirm the settings that apply to your organisation at the start rather than assuming them from a template. Your tax adviser or legal counsel should confirm anything unusual.']},
    {h:'Common payroll mistakes we help prevent',p:[
      'Late or missing attendance inputs, overtime approved verbally but never recorded, joiners paid for a full month, final settlements calculated without leave balances, and tax certificates that do not match what was deducted. Each of these causes complaints, rework or penalties. A fixed input deadline, a short exceptions report and a sign-off step remove most of them.']},
    {h:'Confidentiality',p:[
      'Salary information is sensitive. Access is limited to named people on both sides, files are shared securely and payslips go only to the employee concerned. Agree at the start how records are stored and returned if the arrangement ends.']},
  ],
  table:{caption:'Who does what in an outsourced payroll',head:['Task','Your team','estaff.pk'],rows:[
    ['Approve attendance and overtime','Yes','Collects and checks'],
    ['Salary changes, joiners, leavers','Approves','Updates records'],
    ['Calculation and tax withholding','Reviews','Prepares'],
    ['Final payroll approval','Yes','Provides register'],
    ['Bank transfer','Yes, or as agreed','Prepares the file'],
    ['Payslips and reports','Receives','Issues'],
  ]},
  checklist:{title:'To start outsourced payroll',items:['Employee list with CNIC, bank details and salary structure','Allowances and deduction rules','Attendance and leave policy','Your tax and statutory registrations','Payroll calendar and approval contacts','Last three months’ payroll for reference']},
  faqTitle:'Payroll: common questions',
  faqs:[
    ['How many employees do you need to outsource payroll?','There is no minimum. Businesses with a handful of staff and those with hundreds both use outsourced payroll; the scope and fee are set accordingly.'],
    ['Do you handle final settlements?','Yes. When an employee leaves, the final settlement is calculated from the agreed inputs, including leave balances and any dues, for your approval.'],
    ['Can payroll work with our attendance system?','Usually yes. We agree a format for exporting attendance from your system or sheet each month.'],
    ['Will employees receive payslips?','Yes, every month, showing earnings, deductions and net pay.'],
  ],
},

'remote-staff':{
  title:'Hiring remote staff from Pakistan: a guide for local and overseas businesses',
  answer:'To hire remote staff in Pakistan, define the outcomes you need, the hours that must overlap with your team, the tools you use and how work will be reviewed. estaff.pk then shortlists candidates tested for those skills, such as virtual assistants, customer support agents, digital marketers and developers, and helps you onboard them with clear routines.',
  sections:[
    {h:'Why businesses hire remote talent in Pakistan',p:[
      'Pakistan has a large, young, English-speaking workforce, many of whom already work with clients in the Gulf, UK, US and Europe. Cities such as Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad and Peshawar have strong graduate pools in IT, business and communications, and many skilled people outside the big cities now work from home.',
      'Remote hiring works best for roles with clear outputs: managing inboxes and calendars, answering support tickets, running social media, building websites or apps, bookkeeping and research.']},
    {h:'Define the role properly',p:['Remote roles fail when the brief describes a person instead of the work. Write down:'],
      list:['The weekly outputs you expect and how you will measure them','Working hours and the overlap needed with your time zone','Tools: email, CRM, project boards, design or coding tools','Language level for written and spoken communication','Equipment and internet requirements, including a backup connection','Who the person reports to and how often you will meet']},
    {h:'Testing skills before hiring',p:[
      'For remote work, a short paid test task is the most useful filter: answer five sample customer emails, draft a social media plan, or fix a small bug. It shows writing quality, attention to detail and how the candidate follows instructions. Combine it with a video interview to check communication and reliability.']},
    {h:'Onboarding and managing remote staff',p:[
      'Give access only to the systems needed, document key processes and set a daily or weekly check-in. Many problems with remote staff come from unclear priorities, not lack of effort. Agree how leave and public holidays work, especially if Pakistani and your local holidays differ, and how power or internet outages are reported.',
      'Payment and contract structure depend on where your business is based. Some companies contract directly; others use a local employer or payroll partner. Discuss the right structure with your advisers before the first hire.']},
  ],
  table:{caption:'Common remote roles and how to test them',head:['Role','Typical work','Useful test'],rows:[
    ['Virtual assistant','Email, calendars, documents, research','Organise a sample inbox and schedule'],
    ['Customer support','Chat, email and phone support','Reply to sample tickets'],
    ['Digital marketing','Social media, SEO, ads','Short campaign plan from a brief'],
    ['Developer','Web, app or backend work','Small paid coding task'],
    ['Bookkeeper','Entries, reconciliations, reports','Reconcile a sample statement'],
  ]},
  checklist:{title:'Remote hire checklist',items:['Write outputs and overlap hours','Set equipment and internet requirements','Prepare a short paid test task','Interview by video','Agree contract and payment structure','Document onboarding and access','Book weekly check-ins for the first month']},
  faqTitle:'Remote staff: common questions',
  faqs:[
    ['Can overseas companies hire through estaff.pk?','Yes. We recruit remote staff for businesses in Pakistan and abroad. The contract and payment structure should be confirmed with your own advisers.'],
    ['What about power cuts and internet outages?','Ask candidates about backup power and a second connection, and agree how outages are reported. Many experienced remote workers already have both.'],
    ['Can remote staff work night shifts for US clients?','Many do. State the required hours clearly in the brief so only candidates comfortable with them are shortlisted.'],
  ],
},

'staff-screening':{
  title:'Staff screening and background checks in Pakistan',
  answer:'Staff screening checks that a candidate is who they say they are and can do the job: identity (CNIC), references from previous employers, employment history, education or licences, and skills relevant to the role. The checks are agreed with you before they start, done with the candidate’s consent, and reported to you before you make a decision.',
  sections:[
    {h:'Why screening matters',p:[
      'For household staff, screening protects your family and home. For businesses, it protects money, data and reputation. Most hiring problems that could have been avoided come from skipped basics: nobody called the previous employer, nobody checked the driving licence category, nobody asked why the last job ended after two months.']},
    {h:'Checks you can include',p:['Choose the checks that match the role. More is not always better; relevant is better.'],
      list:['Identity: original CNIC seen and copy kept; NADRA verification where available','References: conversations with previous employers about duties, reliability and reason for leaving','Employment history: dates and gaps explained','Education and certificates: degrees, diplomas, nursing registration, trade certificates','Driving licence: valid, correct category, expiry date','Character certificate: from the police in the candidate’s district, where relevant','Skills: cooking trial, driving test drive, Excel test, typing or language check']},
    {h:'Consent and fairness',p:[
      'Screening is done with the candidate’s knowledge and consent. Information is used only for the hiring decision and kept securely. A gap in employment or a short job is not automatically a red flag; ask and listen. Candidates who are treated fairly during checks are more likely to stay.']},
    {h:'Reading the results',p:[
      'You receive a short report: what was checked, how, and what was found. Where something cannot be confirmed, the report says so rather than guessing. Combine the report with your own interview and a trial period. No background check can guarantee future behaviour, but it removes avoidable risks.']},
  ],
  table:{caption:'Suggested checks by role',head:['Role','Essential checks','Often added'],rows:[
    ['Driver','CNIC, licence, references','Test drive, character certificate'],
    ['Nanny','CNIC, family references','Character certificate, first-aid'],
    ['Home nurse','CNIC, nursing registration, references','Hospital reference'],
    ['Accountant','CNIC, degree, references','Excel or accounting test'],
    ['Security guard','CNIC, character certificate','Training certificate, ex-service record'],
  ]},
  checklist:{title:'Screening checklist',items:['Agree the checks for the role','Get the candidate’s consent','See original CNIC and documents','Call at least two references yourself or through us','Confirm licence or registration where needed','Run a practical test','Review the report before making an offer']},
  faqTitle:'Screening: common questions',
  faqs:[
    ['How long do checks take?','Identity and references usually take a few days. Certificates from other cities or institutions can take longer, depending on how quickly they respond.'],
    ['Can I screen a worker I found myself?','Yes. Screening can be ordered for a candidate you sourced, with their consent.'],
    ['What if a reference cannot be reached?','The report says so. You can ask the candidate for another reference or rely more on the trial period.'],
  ],
},

'bulk-hiring':{
  title:'Bulk hiring in Pakistan: recruiting many people at once',
  answer:'Bulk hiring means recruiting many people for similar roles in a short time, for example 30 call centre agents, 50 factory workers or 20 retail staff for a new branch. It works through one clear role profile, group screening, structured assessments and an organised joining plan, so quality stays consistent while volumes are high.',
  sections:[
    {h:'When you need bulk hiring',p:[
      'New branches, seasonal peaks, factory expansions, new call centre campaigns and project start-ups all create sudden demand for many people. Recruiting them one by one is slow and inconsistent. A bulk process uses the same criteria, tests and onboarding for everyone.']},
    {h:'Plan the numbers',p:['Start with a hiring plan that covers:'],
      list:['How many people, in which roles and shifts','Joining date or a phased schedule','Location and transport arrangements','Minimum requirements: education, language, physical fitness, experience','Salary, overtime and incentives','Documents needed on day one']},
    {h:'Screening at volume',p:[
      'For volume roles, advertise widely, then screen by phone against a short checklist, invite shortlisted people to a group assessment day and finish with brief interviews. Assessment days can include a short written test, a typing or language check, a role-play for customer-facing roles or a practical task for production roles.',
      'Expect some drop-outs between offer and joining. Plan for it by keeping a ranked reserve list rather than over-hiring.']},
    {h:'Joining and the first month',p:[
      'Group induction, clear shift rosters and a named supervisor for each batch keep early attrition low. Collect documents and bank details before day one so the first payroll runs smoothly.']},
  ],
  table:{caption:'Bulk hiring timeline (example)',head:['Stage','What happens'],rows:[
    ['Week 1','Role profile, advertising, phone screening starts'],
    ['Week 2','Assessment days and interviews'],
    ['Week 3','Offers, documents, reserve list'],
    ['Week 4','Group induction and joining'],
  ]},
  checklist:{title:'Bulk hiring checklist',items:['Fix the number of roles and joining dates','Write one role profile per role type','Decide assessment tasks','Book an assessment venue or video slots','Prepare offer letters and document lists','Plan induction and supervisors','Keep a reserve list']},
  faqTitle:'Bulk hiring: common questions',
  faqs:[
    ['Can you hire in several cities at once?','Yes. Bulk drives can run in parallel in different cities, using the same criteria everywhere.'],
    ['How do you keep quality consistent?','By using one role profile, the same tests for everyone and clear pass marks agreed with you.'],
    ['Is there a minimum number?','There is no fixed minimum; bulk hiring usually makes sense from around ten similar roles.'],
  ],
},

'jobs-careers':{
  title:'Finding a job through estaff.pk: a guide for job seekers',
  answer:'To find a job through estaff.pk, create a free account, add your CV and the kind of work and cities you want, apply to open jobs and ongoing recruitment listings, and turn on job alerts. The team calls you when a matching employer needs someone like you. estaff.pk never charges job seekers any fee.',
  sections:[
    {h:'Jobs available',p:[
      'estaff.pk recruits for households and businesses across 106 cities in Pakistan: cooks, drivers, maids, nannies, care attendants, home nurses, gardeners and watchmen; office boys, receptionists, accountants, sales staff, IT support, HR officers, call centre agents, technicians, factory workers, security guards, hotel staff, delivery riders and teachers; and remote jobs such as virtual assistant, customer support, digital marketing and development.']},
    {h:'Prepare a CV that gets calls',p:['Employers read CVs quickly. Make yours easy to scan:'],
      list:['Your name, phone/WhatsApp, city and area at the top','The kind of work you want, in one line','Previous jobs with dates, employer type and main duties','Skills: cooking styles, vehicle types, software, languages','Education and certificates','Two references with phone numbers']},
    {h:'Documents to keep ready',p:[
      'Keep your original CNIC and copies, educational certificates, any licence or registration for your work, and the phone numbers of previous employers. Household roles often ask for a police character certificate; it helps to apply for one early.']},
    {h:'Stay safe while job hunting',p:[
      'Never pay anyone who promises to “guarantee” a job. Real employers and agencies do not ask job seekers for registration fees, training fees or visa fees in exchange for a job. Before an interview, confirm the address and tell a family member where you are going. If anything feels wrong, contact estaff.pk before you go.']},
  ],
  table:{caption:'How to apply on estaff.pk',head:['Step','What to do'],rows:[
    ['1. Account','Create a free account with your phone and email'],
    ['2. Profile','Add your CV, kind of work, experience and city'],
    ['3. Apply','Apply to open jobs or the ongoing listing for your city'],
    ['4. Alerts','Turn on email alerts for new jobs'],
    ['5. Track','See the status of each application in your account'],
  ]},
  checklist:{title:'Job seeker checklist',items:['Update your CV','Create a free account','Upload your CV once','Apply to jobs in your city','Turn on job alerts','Keep documents ready','Never pay for a job']},
  faqTitle:'Job seekers: common questions',
  faqs:[
    ['Do I have to pay to get a job?','No. estaff.pk never charges job seekers. Report anyone who asks you for money in estaff.pk’s name.'],
    ['How will I know if I am shortlisted?','Your account shows the status of every application, and the team calls you on your phone number. You also get an email if you added one.'],
    ['Can I apply without a CV?','Yes, you can apply with your details, but a CV improves your chances. A clear photo of a handwritten CV is accepted.'],
  ],
},
};

for(const [k,v] of Object.entries(serviceExtras))if(coreServiceGuides[k]){coreServiceGuides[k].sections.push(...v.sections);coreServiceGuides[k].faqs.push(...v.faqs);}
