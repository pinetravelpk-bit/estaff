import type {LongForm} from './types';

// Long-form content for core pages (part B): resources, FAQs, agencies, services, industries, glossary.
export const coreGuidesB:Record<string,LongForm>={

'/resources':{
  title:'Using these hiring guides',
  answer:'These resources help families, employers and job seekers make better hiring decisions in Pakistan: how to write a brief, screen candidates, plan budgets, prepare interviews and write CVs. Start with the guide that matches your situation, then use the service and city pages for detail about specific roles and locations.',
  sections:[
    {h:'Start here if you are a family',p:['Begin with the household hiring guide to decide which role you need and whether it should be live-in. Use the screening section for checks, then the budget section to plan salary, meals and leave. Each household role page explains duties, interview questions and a first-week plan. The blog has detailed, local guides for hiring cooks, drivers, maids, nannies, nurses and other staff in Islamabad and Rawalpindi.']},
    {h:'Start here if you are an employer',p:['Use the interview section to plan structured interviews and practical tests, and the remote hiring section if you are building a remote team. Service pages for corporate recruitment, bulk hiring, payroll and HR outsourcing explain how each engagement works. Industry pages cover sector-specific issues, from food safety in hospitality to safety on construction sites.']},
    {h:'Start here if you are looking for work',p:['Read the CV guide, prepare your documents and create a free account. Job guides by city and role explain what employers ask for, which documents to keep ready and how to prepare for interviews.']},
    {h:'Good hiring in five principles',p:[],list:['Write down the work before choosing a person','Be honest about pay, hours and conditions','Check what matters for the role, with consent','Test real skills with a trial or practical task','Agree terms in writing and review them regularly']},
    {h:'How these guides are written',p:['Our guides are written from practical experience of hiring in Pakistan. Where laws or official procedures are mentioned, we describe them in general terms and ask you to confirm current rules, because requirements change and differ by province. We do not publish fixed salary figures because pay varies widely by city, role and arrangement.']},
  ],
  faqs:[['Are these guides free?','Yes, all guides on estaff.pk are free to read.'],['Can I suggest a topic?','Yes. Contact us with the hiring question you would like answered.']],
},

'/faqs':{
  title:'More answers to common questions',
  answer:'These additional answers cover the questions families, employers and job seekers ask most often about estaff.pk: fees, timelines, checks, replacements, cities covered, job applications and agencies. If your question is not answered here, contact us and we will help.',
  sections:[
    {h:'For families',p:['Families most often ask how quickly staff can be found, what checks are done, whether staff can live in and what happens if someone leaves. Timelines depend on the role, area and salary; checks are agreed for each role; live-in arrangements need a proper room and clear rest hours; and every placement includes a 6-month free replacement, written into your agreement.']},
    {h:'For businesses',p:['Businesses ask about fees, how candidates are assessed, confidentiality and whether we cover other cities. Fees are agreed in writing for each search; assessments include practical tests where useful; senior searches can be confidential; and we recruit across 106 cities and remotely.']},
    {h:'For job seekers',p:['Job seekers ask whether they must pay, how to apply, how they will be contacted and how to track applications. Applying is free, you can apply online in a few minutes, the team calls when there is a match, and your account shows the status of each application.']},
    {h:'For agencies',p:['Agencies ask how to be listed, whether listing is free and whether they can post jobs. Agencies create a free account and profile; after review they appear in the directory and can post jobs and see their applicants.']},
  ],
  faqs:[
    ['Do you provide staff on the same day?','Same-day placements are rare and usually not wise; a short process with checks and a trial protects you. Urgent requests are prioritised.'],
    ['Can I interview candidates by video?','Yes. Video interviews work well for first rounds, especially for remote and business roles.'],
    ['Do you help with salary negotiation?','We share market expectations and help both sides reach fair, written terms.'],
    ['Do you place staff outside Pakistan?','No. Overseas employment must go through licensed Overseas Employment Promoters; we can explain the process.'],
    ['Can I leave a review?','Yes, on the Reviews page. Reviews are checked before they appear.'],
    ['How do I delete my account?','Sign in, open Settings and choose delete account. Your CV and data are removed.'],
  ],
},

'/agencies':{
  title:'Choosing and working with a staffing agency',
  answer:'This directory lists staffing, recruitment and domestic staff agencies reviewed by estaff.pk. To choose one, check which roles and cities it covers, how it screens candidates, what it charges employers and whether replacement terms are written down. Legitimate agencies never charge job seekers a fee.',
  sections:[
    {h:'How agencies are reviewed',p:['Every agency account is checked by the estaff.pk team before it appears in the directory. We look at the information provided, contact details and services described. A listing is not an endorsement or a guarantee; always confirm fees, screening and terms in writing with the agency directly.']},
    {h:'Questions to ask an agency',p:[],list:['Which roles and cities do you place most often?','How do you find and check candidates?','What is your fee, and when is it paid?','What happens if the person leaves early?','Do you charge candidates anything?','Can you give references from recent clients?']},
    {h:'Red flags',p:['Be cautious of agencies that promise instant placements, refuse to put fees in writing, cannot explain their checks, ask workers for money or pressure you to hire without meeting the candidate. Report concerns about any listed agency to estaff.pk.']},
    {h:'For job seekers',p:['Agencies in this directory may contact you about jobs. Legitimate agencies are paid by employers, not by you. Ask for the employer’s details, salary and hours, never hand over original documents and report anyone who asks for money.']},
    {h:'List your agency',p:['Staffing, recruitment and domestic staff agencies can create a free profile with their services, cities and contact details. After review, the agency appears in the directory, can post jobs on estaff.pk and see applicants. Website links are not included in listings.']},
    {h:'Leaving a review',p:['If you have worked with a listed agency, you can leave a review on its page. Reviews are checked before they appear and help other families and employers choose.']},
  ],
  faqs:[['Is listing free for agencies?','Yes, creating an agency profile is free.'],['Why can’t agencies add a website link?','Listings focus on direct contact details so families and employers can reach agencies easily.']],
},

'/services':{
  title:'Choosing the right estaff.pk service',
  answer:'Choose domestic staffing for help at home, corporate recruitment for individual office and business hires, bulk hiring for many similar roles, executive search for senior positions, remote staffing for work-from-home roles, HR outsourcing and payroll management for ongoing administration, and staff screening when you need checks on a candidate you already found.',
  sections:[
    {h:'Services for your home',p:['Domestic staffing covers cooks, drivers, maids, nannies, care attendants, home nurses, gardeners, watchmen, domestic couples and personal attendants. Staff screening can check a worker you found yourself.']},
    {h:'Services for hiring',p:['Corporate recruitment fills office, sales, finance and IT roles. Technical recruitment focuses on engineers and skilled trades. Industrial staffing supplies factory, warehouse and project workforces. Bulk hiring handles many similar roles at once. Executive search finds senior leaders confidentially. Remote staffing places work-from-home staff for local and international businesses.']},
    {h:'Services for running your people',p:['HR outsourcing handles records, onboarding, leave and HR documents. Payroll management runs monthly salaries, deductions and payslips. HR consultancy designs structures, salary bands and policies. HRIS support helps choose and set up HR software. Training and development builds skills. Facility management staffing provides cleaners, guards and support staff.']},
    {h:'Not sure which you need?',p:['Describe your situation in the Request Staff form or call us. Many clients combine services, for example recruitment followed by payroll, or domestic staffing with screening. We will suggest the simplest arrangement that solves your problem.']},
  ],
  table:{caption:'Quick guide',head:['Your need','Service'],rows:[['Help at home','Domestic staffing'],['One office hire','Corporate recruitment'],['Many similar hires','Bulk hiring'],['Senior leader','Executive search'],['Work-from-home staff','Remote staffing'],['Monthly salaries','Payroll management'],['HR records and policies','HR outsourcing'],['Check a candidate','Staff screening']]},
  faqs:[['Can I combine services?','Yes, many clients combine recruitment with screening, HR or payroll.'],['Are services available outside Islamabad?','Yes, across 106 cities, with remote services available nationwide.']],
},

'/industries':{
  title:'How sector knowledge improves hiring',
  answer:'Each industry has its own roles, seasons, regulations and working conditions. Hiring with sector knowledge means writing briefs that reflect real conditions, testing the skills that matter in that sector and planning around peaks such as the wedding season, Eid or project milestones. estaff.pk supports hospitality, IT, healthcare, construction, logistics, retail, manufacturing and education.',
  sections:[
    {h:'Why industry matters in hiring',p:['A receptionist in a hospital, a hotel and a law firm do different jobs. A driver for a family, a courier company and a construction project needs different licences and skills. Industry context shapes what to look for, what to test and what candidates expect. Generic hiring misses these differences and leads to poor matches.']},
    {h:'Sector patterns in Pakistan',p:[],list:['Hospitality: seasonal peaks in the north and the wedding season in the plains','IT and technology: competition with remote international work','Healthcare: nursing shortages and strict qualification checks','Construction: hiring in phases with project milestones','Logistics: growth in e-commerce and last-mile delivery','Retail and FMCG: Eid and festival peaks, large field forces','Manufacturing and energy: industrial clusters and safety requirements','Education: hiring around the academic calendar']},
    {h:'Compliance differs by sector',p:['Food businesses deal with food authorities, hospitals with healthcare commissions, factories with labour and safety laws, schools with education regulators and construction with development authorities. Each industry page highlights the main points to confirm with your advisers.']},
    {h:'Getting started',p:['Choose your industry below to read the detailed guide, then share your requirement. If your sector is not listed, contact us; the same principles of clear briefs, practical testing and fair terms apply everywhere.']},
  ],
  faqs:[['Do you work with industries not listed?','Yes. Contact us with your requirement and we will advise.'],['Can you handle hiring across several sites?','Yes, including multi-city and multi-site hiring with consistent criteria.']],
},

'/glossary':{
  title:'More staffing and HR terms explained',
  answer:'These additional terms explain words families, employers and job seekers meet when hiring in Pakistan, from live-in staff and probation to EOBI, final settlement and talent pool. Each definition is short and practical.',
  sections:[
    {h:'Household hiring terms',p:[],list:['Live-in: a worker who lives at the employer’s home, with agreed rest hours and a weekly day off.','Live-out: a worker who comes for fixed hours and returns home.','Domestic couple: a husband and wife who live in and share household work, each with their own duties and pay.','Trial day: a short paid period in which a candidate does the real work before a hiring decision.','Character certificate: a document from the police in the candidate’s district stating whether there is a criminal record.','Khansama: a traditional term for a cook who manages the household kitchen.','Chowkidar: a watchman who guards the gate and property.','Mali: a gardener who maintains lawns, plants and outdoor spaces.']},
    {h:'Employment and HR terms',p:[],list:['Appointment letter: a written document confirming the job, pay, hours and terms.','Probation: an initial period during which employer and employee check the fit.','Notice period: the time either side must give before ending employment.','Final settlement: the calculation of all dues owed when someone leaves, including salary, leave and deductions.','Gross and net salary: pay before and after deductions such as income tax.','Withholding tax: income tax deducted by the employer from salary and deposited with the tax authority.','EOBI: the Employees’ Old-Age Benefits Institution, which runs a pension scheme funded by employer and employee contributions where it applies.','Provincial social security: schemes such as PESSI in Punjab and SESSI in Sindh providing medical and other benefits to covered workers.','HRIS: a human resource information system for employee records, attendance and leave.']},
    {h:'Recruitment terms',p:[],list:['Brief: a written description of the role, duties, pay and requirements.','Shortlist: the small group of screened candidates presented for interview.','Talent pool: a set of candidates who have applied for ongoing recruitment and can be matched to future roles.','Executive search: confidential, targeted recruitment for senior roles.','Bulk hiring: recruiting many people for similar roles at once.','Employer of Record: a company that legally employs people on behalf of another business.','Overseas Employment Promoter: a recruiter licensed in Pakistan to recruit workers for jobs abroad.']},
  ],
  faqs:[['Is EOBI registration required for every employer?','It depends on the business and number of employees; confirm with EOBI or your adviser.'],['What is the difference between a trial day and probation?','A trial day happens before hiring; probation is the first period after hiring.']],
},
};
