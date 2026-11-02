import type {LongForm} from './types';

// Long-form content for core pages (part A): about, how it works, hire, post a job, contact, submit CV.
export const coreGuidesA:Record<string,LongForm>={

'/about':{
  title:'About estaff.pk: who we are and how we work',
  answer:'estaff.pk is a Pakistani staffing and recruitment service and job platform. It helps families hire household staff such as cooks, drivers, maids, nannies and care attendants; helps businesses hire office, technical, industrial and remote staff and manage HR and payroll; and helps job seekers find work in 106 cities. Job seekers are never charged, and every placement starts with a written brief.',
  sections:[
    {h:'Why estaff.pk exists',p:['Hiring in Pakistan still runs largely on word of mouth. Families ask neighbours for a reliable driver; businesses ask friends for an accountant; job seekers hand CVs to anyone who might know of a job. This works sometimes, but it is slow, depends on luck and often leaves both sides without clear terms. Households end up with staff whose references nobody checked; workers end up in jobs where hours, pay and days off were never agreed.','estaff.pk was set up to make that process clearer and fairer: a written brief before the search, honest information about the work, sensible checks, and a simple written agreement before anyone starts.']},
    {h:'What we do',p:[],list:['Household staffing: cooks, drivers, maids, nannies, care attendants, home nurses, gardeners, watchmen, domestic couples and personal attendants','Business recruitment: office, sales, finance, IT, technical, industrial and bulk hiring, plus executive search','HR and payroll: HR outsourcing, payroll management, HR consultancy, HRIS support and training','Remote staffing: virtual assistants, customer support, digital marketers and developers for local and international businesses','Jobs platform: real vacancies, ongoing recruitment in 106 cities, free accounts, CV storage and job alerts for job seekers','Agency directory: reviewed staffing and recruitment agencies that families and employers can contact directly']},
    {h:'How we work with families',p:['Families tell us about their home, routines and the help they need. We help turn that into a clear brief, shortlist suitable candidates, arrange interviews and trials, and share what was checked and what could not be confirmed. The family makes the decision. We encourage a written agreement covering duties, hours, rest, salary, leave and notice, because clarity at the start prevents most problems later.']},
    {h:'How we work with businesses',p:['Businesses share the role, team, pay range and timeline. We source and screen candidates, arrange assessments and coordinate interviews, and support offers and onboarding. For HR and payroll, we agree a defined scope and monthly calendar, and management keeps every decision.']},
    {h:'How we work with job seekers',p:['Job seekers create a free account, store their CV, apply to jobs and turn on alerts. We share profiles with employers only with the job seeker’s permission and call candidates before any interview to explain the job. We never charge job seekers for applying or being placed, and we ask anyone who is asked for money in our name to report it.']},
    {h:'Our principles',p:[],list:['Honesty: no fake jobs, no guaranteed placements, no invented claims','Fairness: clear terms for both sides, and no fees for job seekers','Respect: dignity for workers and privacy for families','Care: checks proportionate to the role, done with consent','Transparency: fees and scope agreed in writing before work starts']},
    {h:'Where we work',p:['estaff.pk is focused on Islamabad and Rawalpindi, where we know neighbourhoods, routes and local practice in depth, and recruits across 106 cities in Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, Islamabad Capital Territory, Azad Jammu and Kashmir and Gilgit-Baltistan. Remote roles can be filled from anywhere in Pakistan.']},
  ],
  faqs:[['Is estaff.pk an agency or a job site?','Both. estaff.pk recruits staff for families and businesses and runs a jobs platform and agency directory.'],['Does estaff.pk charge job seekers?','No. Job seekers never pay to apply or to be placed.'],['Where is estaff.pk based?','estaff.pk focuses on Islamabad and Rawalpindi and recruits across 106 cities in Pakistan.']],
},

'/how-it-works':{
  title:'How hiring with estaff.pk works, step by step',
  answer:'Hiring through estaff.pk takes five steps: share your requirement, agree a clear brief and terms, review a shortlist, interview and run a trial or test, then confirm the hire with a written agreement. For household staff this often takes days to a few weeks; for business and specialist roles, timelines depend on the role and market.',
  sections:[
    {h:'Step 1: Share your requirement',p:['Use the Request Staff form, call or message us with the role, city and area, working hours, live-in or live-out arrangement, salary range and preferred start date. If you are not sure what you need, describe the problem, for example “my mother needs help during the day” or “our accounts are always late”, and we will help shape the role.']},
    {h:'Step 2: Agree the brief and terms',p:['We turn your requirement into a short written brief: duties, hours, rest days, pay, checks, and anything specific such as cuisines, vehicle type, children’s ages or software. We also agree our service scope and any fee in writing before the search starts. A clear brief is the single biggest factor in a good hire.']},
    {h:'Step 3: Shortlist',p:['We search our candidate pool, ongoing recruitment applicants and wider channels, then screen candidates against the brief. You receive a shortlist with notes on experience, expectations and what was checked, such as CNIC seen, references called or licence category confirmed, and anything that could not yet be confirmed.']},
    {h:'Step 4: Interview and trial',p:['You meet shortlisted candidates. For household roles, a short paid trial at home is strongly recommended: a cooking day, a test drive, or a few supervised days with a nanny. For business roles, a practical test or assessment reveals real skills. We coordinate scheduling and collect feedback.']},
    {h:'Step 5: Confirm and start',p:['When you choose a candidate, agree the final terms in writing: duties, hours, rest, salary and payment date, leave and notice. Keep copies of documents. For household staff, register them with the police as your local procedure requires. We check in after the first weeks to see how things are going.']},
    {h:'For job seekers',p:['Create a free account, add your CV and choose your city and kind of work. Apply to vacancies or ongoing recruitment listings and turn on job alerts. When an employer needs someone like you, we call you, explain the job and, with your permission, share your profile. You are never charged.']},
    {h:'Typical timelines',p:['Common household roles in Islamabad and Rawalpindi can often be shortlisted within days if the brief and salary are clear. Live-in roles, specialist care and roles in smaller cities can take longer. Business roles depend on seniority, skills and notice periods; senior hires often take several weeks plus notice. We share realistic expectations at the start rather than promising instant results.']},
  ],
  table:{caption:'Who does what',head:['Step','You','estaff.pk'],rows:[['Requirement','Share needs','Ask questions, shape the role'],['Brief and terms','Approve','Write and agree scope'],['Shortlist','Review','Source and screen'],['Interview and trial','Decide','Coordinate and gather feedback'],['Start','Sign agreement','Check in after joining']]},
  faqs:[['Is there a fee to request staff?','Sharing a requirement is free. Any service fee is explained and agreed in writing before the search begins.'],['Can I hire without a trial?','You can, but a short paid trial is the most reliable way to check fit for household roles.'],['What if the person leaves early?','Replacement terms, if any, are agreed in writing at the start.']],
},

'/hire':{
  title:'How to write a good staff request',
  answer:'A good staff request tells us the role, the city and area, the daily duties, working hours and days off, whether the job is live-in, the salary range and when you need someone to start. The more specific you are, the better the shortlist. You can request household staff, office and business staff, remote staff or a whole team through this form.',
  sections:[
    {h:'What to include',p:[],list:['Role, for example family cook, driver, receptionist or accountant','City and area, such as F-10 Islamabad or Bahria Town Rawalpindi','Duties, listed as they happen in a normal day','Working hours, weekly day off and any night or weekend work','Live-in or live-out, and accommodation details','Salary range and any meals, transport or allowances','Must-have skills, languages, licences or qualifications','Preferred start date and how many people you need']},
    {h:'Examples of clear requests',p:['Household: “Live-in cook for a family of five in E-11 Islamabad. Pakistani home food and BBQ, guests most weekends. Grocery shopping with float. Sunday off. Start within two weeks.”','Business: “Accounts officer for a distribution company in Rawalpindi. Daily entries, bank reconciliations and monthly reports in QuickBooks. B.Com or above, two years’ experience. Office hours, Saturday half day.”','Remote: “Virtual assistant working UK office hours for a property consultant. Inbox, calendar, CRM updates and weekly reports. Strong written English.”']},
    {h:'What happens after you submit',p:['Our team reviews your request and calls you to confirm details, discuss the salary range and explain the process and any fee. Then we start the search and share a shortlist. You decide whom to interview and hire.']},
    {h:'Setting a realistic salary',p:['Salary expectations differ by city, role, experience, hours and arrangements such as live-in or meals. If you are unsure, tell us your budget and the duties; we will tell you honestly whether the market is likely to match it and what trade-offs may help, such as fewer duties or different hours.']},
    {h:'Privacy',p:['Your contact details and home address are used only to arrange your requirement and are never published. Candidates learn your exact address only when an interview is arranged.']},
  ],
  faqs:[['Can I request several roles at once?','Yes. Describe each role and the number of people needed; bulk requests are welcome.'],['Do you cover cities outside Islamabad and Rawalpindi?','Yes, estaff.pk recruits across 106 cities; mention your city in the form.'],['How quickly will you call me?','Usually within one working day of your request.']],
},

'/post-a-job':{
  title:'Writing a job post that attracts the right people',
  answer:'A strong job post states the job title, city and area, what the person will do each day, working hours, salary range, experience and education needed, and how to apply. Posts with a clear salary range and honest description attract more suitable applicants. Every job posted on estaff.pk is checked before it goes live.',
  sections:[
    {h:'Write a specific title',p:['Use a title people search for, with detail: “Live-in cook for a family in DHA Lahore” or “Accounts officer, QuickBooks, Rawalpindi” works better than “Staff required”. Avoid all capitals and vague words such as “urgent hiring”.']},
    {h:'Describe the real work',p:['List the duties as they happen in a normal day or week, the team or family the person will work with, and any physical demands such as lifting, standing or night shifts. Honest descriptions reduce early resignations.']},
    {h:'Show the salary range',p:['Jobs that show a salary range get more and better-matched applicants. Include allowances, meals, accommodation or incentives where relevant. If pay depends on experience, show the range.']},
    {h:'Experience and education',p:['State what is truly required, such as a licence category, nursing registration or degree, and what is preferred. Over-strict requirements shrink the pool without improving quality.']},
    {h:'What not to include',p:[],list:['Your phone number or exact address in the description','Requests for money from applicants','Discriminatory requirements unrelated to the job','Promises you cannot keep about pay or benefits']},
    {h:'After you post',p:['Our team checks every job before it goes live, usually within one working day, and may call you to confirm details. Approved jobs appear on estaff.pk, on the city and job-type pages, in job alerts to matching job seekers and can appear in Google Jobs. Applications reach you through estaff.pk.']},
  ],
  faqs:[['How long does a job stay live?','Until the closing date you choose, up to 90 days. You can ask us to close it early once you have hired.'],['Can I edit my job after posting?','Contact us and we will update it, or post it again with the changes.'],['Why was my job not approved?','Usually because details were missing or the post did not look like a real, open vacancy. We will contact you to fix it.']],
},

'/contact':{
  title:'How to reach estaff.pk and what to expect',
  answer:'You can reach estaff.pk through the Request Staff form for hiring, the Submit CV form or a free account for jobs, the Post a Job form for vacancies, and by phone or WhatsApp when listed on this page. Hiring requests are usually answered within one working day.',
  sections:[
    {h:'Which channel to use',p:[],list:['Hiring staff for your home or business: Request Staff form','Advertising a vacancy: Post a Job form','Looking for work: create a free account or Submit CV','Agencies wanting a listing: register an agency account','Questions about an existing request or application: reply to our message or call us','Complaints or concerns: write to us with details so we can investigate']},
    {h:'What information helps us respond quickly',p:['For hiring, mention the role, city, area and start date. For job applications, include your name, phone number, city and the kind of work you want. For questions about an application or request, mention the name and date used.']},
    {h:'Working hours',p:['Our team responds during normal working hours, Monday to Saturday. Messages received outside these hours are answered on the next working day. For urgent household needs, mention the urgency in your request.']},
    {h:'Reporting fraud',p:['estaff.pk never charges job seekers. If anyone asks you for money in exchange for a job in estaff.pk’s name, do not pay and report it to us with their details.']},
    {h:'Privacy',p:['Information you send us is used only to respond to you and to provide the service you asked for. We do not publish your contact details.']},
  ],
  faqs:[['Can I visit your office?','Meetings are arranged by appointment; contact us first so the right person is available.'],['Do you reply on WhatsApp?','Yes, when a WhatsApp number is listed on this page.'],['How do I update my CV?','Sign in to your account and upload a new CV under Profile & CV.']],
},

'/jobs/apply':{
  title:'Submitting your CV to estaff.pk: what happens next',
  answer:'When you submit your CV, estaff.pk saves your details securely, matches you to suitable jobs in your city and kind of work, and calls you when an employer needs someone like you. Your profile is shared with employers only with your permission. Submitting your CV is free, and estaff.pk never charges job seekers.',
  sections:[
    {h:'Who should submit a CV',p:['Anyone looking for household, office, technical, industrial or remote work in Pakistan: cooks, drivers, maids, nannies, care attendants, nurses, gardeners, watchmen, office boys, receptionists, accountants, sales staff, IT and technical staff, factory workers, security guards, call centre agents, hotel staff, delivery riders, teachers, virtual assistants and developers.']},
    {h:'Make your CV work for you',p:[],list:['Put your phone number and city at the top','Say clearly what kind of work you want','List previous jobs with dates and main duties','Mention licences, certificates and languages','Add two references with phone numbers']},
    {h:'After you submit',p:['Your CV is saved against your city and kind of work. When a matching vacancy or client requirement comes in, our team calls you to confirm your experience and interest, explains the job, pay and hours, and arranges an interview if you agree. Create a free account to track your applications and receive job alerts by email.']},
    {h:'Keeping your details up to date',p:['If you change your phone number, city or the kind of work you want, update your profile or submit again. Employers prefer candidates who are easy to reach and whose details are current.']},
    {h:'Stay safe',p:['Never pay anyone to get a job. Never hand over original documents. Confirm the address of any interview and tell someone where you are going. Report anyone who asks for money in estaff.pk’s name.']},
  ],
  faqs:[['How long is my CV kept?','Your CV stays on file so we can match you to future jobs. You can delete your account and CV at any time.'],['Can I apply for more than one kind of work?','Choose your main kind of work on the form, and mention others in the message box.'],['Will employers see my phone number?','Only when you have agreed to your profile being shared for a specific job.']],
},
};
