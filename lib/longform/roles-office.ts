import type {LongForm} from './types';

// Long-form guides for office (corporate-recruitment) and remote (remote-staff) role pages.
export const officeRoleGuides:Record<string,LongForm>={

'administration-reception':{
  title:'Hiring administration and reception staff',
  answer:'To hire an administrator or receptionist, list the daily work (calls, visitors, appointments, filing, purchase requests, office supplies, coordinating maintenance), the software used, the language level needed and office hours. Test basic MS Office or Google Workspace and written communication, check references, and look for organised, polite people who stay calm when several things happen at once.',
  sections:[
    {h:'Receptionist, admin assistant or office manager',p:['A receptionist handles the front desk: greeting visitors, answering and routing calls, managing appointments and the visitor log. An admin assistant supports the office behind the scenes: documents, filing, purchase requests, travel bookings and records. An office manager runs the whole office, including vendors, facilities, petty cash and sometimes HR basics. Many small offices combine roles, so be clear about the mix.']},
    {h:'Skills to test',p:['Admin roles look simple until they are done badly. A short practical test filters well.'],
      list:['Writing a polite email and taking a phone message accurately','Formatting a letter in Word and a simple table in Excel','Scheduling meetings across several calendars','Handling two visitors and a ringing phone at once (role-play)','Filing and finding documents by a logical system','Spoken Urdu and English suited to your visitors']},
    {h:'Professional presentation',p:['The receptionist shapes visitors’ first impression. Discuss your dress code, greeting style and how to handle difficult or unannounced visitors. In clinics, schools and banks, the front desk also needs privacy awareness: not discussing clients’ details within earshot of others.']},
    {h:'Petty cash and vendors',p:['If the role handles petty cash or office purchases, set limits, approval steps and a monthly reconciliation. Clear records protect the employee and the business.']},
    {h:'Career path',p:['Good admin staff often move into office management, HR or operations. Mention growth in the job description; it attracts organised, ambitious candidates.']},
  ],
  table:{caption:'Admin roles compared',head:['Role','Main focus','Typical education'],rows:[
    ['Receptionist','Visitors, calls, appointments','Intermediate or graduate'],
    ['Admin assistant','Documents, records, coordination','Graduate'],
    ['Office manager','Whole-office operations, vendors','Graduate with experience'],
  ]},
  checklist:{title:'Admin hiring checklist',items:['Write the daily tasks','List software used','Prepare a short practical test','Set dress code and hours','Agree petty cash rules if relevant','Check references']},
  faqTitle:'Admin and reception: common questions',
  faqs:[
    ['Do receptionists need English?','For most offices, polite spoken English and Urdu are expected; the level depends on your visitors.'],
    ['Can one person do reception and admin?','In small offices, yes, if the front desk is not too busy. Busy offices need separate people.'],
    ['How long does hiring take?','For common admin roles in major cities, shortlisting is usually quick once the brief and salary are clear.'],
  ],
},

'accounts-finance':{
  title:'Hiring accounts and finance staff in Pakistan',
  answer:'To hire accounts staff, decide the level you need: an accounts assistant for entries and records, an accountant for reconciliations, payroll inputs and monthly reports, or a finance manager for reporting, tax, audits and controls. Specify the accounting software, transaction volume and qualifications (B.Com, M.Com, ACCA or CA modules), test with a practical reconciliation and check references carefully.',
  sections:[
    {h:'Choose the right level',p:['Over-hiring wastes money and under-hiring causes errors. A small business with a few hundred transactions a month may need an accounts assistant plus an external tax adviser. A growing company needs an accountant who can close the month and prepare reports. Companies with audits, bank financing or several entities need a finance manager.']},
    {h:'Skills and tests',p:['Accounting CVs look similar. A practical test separates them.'],
      list:['Bank reconciliation from a sample statement','Journal entries for common transactions','Excel: lookups, pivot tables, formulas','Understanding of withholding tax and sales tax basics','Experience with your software: QuickBooks, Peachtree, Xero, Odoo, SAP or custom ERP','Preparing a simple monthly management report']},
    {h:'Qualifications in Pakistan',p:['Common qualifications include B.Com and M.Com degrees, ACCA, and CA or ICMA studies at various stages. Part-qualified candidates can be excellent for accountant roles. For finance manager roles, a completed professional qualification and audit or reporting experience usually matter. Verify certificates and memberships where relevant.']},
    {h:'Controls and trust',p:['Finance staff handle money and sensitive data. Separate duties where possible: the person who records payments should not also approve them. Limit banking access, review reconciliations monthly and rotate checks. These controls protect honest employees as much as the business.']},
    {h:'Tax calendar awareness',p:['Ask candidates how they manage monthly and annual deadlines for withholding statements, sales tax returns and income tax filings that apply to businesses like yours. Someone who keeps a calendar and reminds management in advance saves penalties.']},
  ],
  table:{caption:'Accounts roles at a glance',head:['Role','Work','Typical qualification'],rows:[
    ['Accounts assistant','Entries, filing, petty cash','B.Com or equivalent'],
    ['Accountant','Reconciliations, payroll inputs, monthly reports','B.Com/M.Com, ACCA or CA modules'],
    ['Finance manager','Reporting, tax, audits, controls','ACCA, CA or ICMA qualified'],
  ]},
  checklist:{title:'Finance hiring checklist',items:['Choose the level of role','List software and volumes','Prepare a reconciliation test','Verify qualifications','Plan segregation of duties','Check references carefully']},
  faqTitle:'Accounts staff: common questions',
  faqs:[
    ['Can an accountant handle our tax filings?','An experienced accountant can prepare filings; complex tax matters should be reviewed by a tax adviser.'],
    ['Do we need a chartered accountant?','Not for every role. Many businesses do well with a capable accountant and an external adviser for audits and complex tax.'],
    ['Can accounts staff work remotely?','Bookkeeping can be done remotely with secure access; roles needing cash and documents are better on-site.'],
  ],
},

'sales-marketing':{
  title:'Hiring sales and marketing staff',
  answer:'To hire sales or marketing staff, define who your customers are, how you sell (field visits, phone, showroom, distributors or online) and which channels marketing uses. Set targets and incentives clearly, test candidates with a role-play or a short marketing task, and check results they achieved in previous jobs, not just their job titles.',
  sections:[
    {h:'Different kinds of sales roles',p:['Field sales executives visit shops, offices or homes; inside sales staff sell by phone and messaging; showroom staff handle walk-in customers; key account managers look after large clients; distributor managers handle dealer networks. Marketing roles range from social media and content to trade marketing, brand management and events. The right person for one is often wrong for another.']},
    {h:'Targets and incentives',p:['Be specific about targets: monthly sales, new customers, collections, calls or visits. Explain how commission or incentives are calculated and when they are paid. Many sales staff in Pakistan leave because incentives are unclear or paid late.'],
      list:['Basic salary and incentive structure','Monthly targets and how they are measured','Territory or customer list','Travel allowance, fuel or motorbike','Reporting: daily visits, CRM entries']},
    {h:'Testing sales skills',p:['A role-play reveals how a candidate listens, handles objections and closes. Give them a product brochure an hour before and ask them to sell to an interviewer. For marketing roles, ask for a short plan for a product launch with a given budget, or a review of your social media.']},
    {h:'Checking results',p:['Ask for numbers: targets versus achievement, customers won, campaigns run and their results. Speak to former managers about consistency, honesty with customers and teamwork.']},
  ],
  table:{caption:'Sales and marketing roles',head:['Role','Key skill','Useful test'],rows:[
    ['Field sales','Relationship building, persistence','Role-play visit'],
    ['Inside sales','Phone manner, follow-up','Call simulation'],
    ['Key account manager','Negotiation, planning','Account plan'],
    ['Digital marketer','Content, ads, analytics','Short campaign plan'],
  ]},
  checklist:{title:'Sales hiring checklist',items:['Describe customers and channels','Set targets and incentives','Prepare a role-play or task','Ask for past results','Check references','Plan training on your products']},
  faqTitle:'Sales and marketing: common questions',
  faqs:[
    ['Should sales staff have their own motorbike?','For field roles, many employers ask for a motorbike and pay fuel or maintenance allowances. State this in the job.'],
    ['How quickly should a new salesperson perform?','Give a realistic ramp-up period with interim goals, depending on your sales cycle.'],
  ],
},

'it-technical':{
  title:'Hiring IT and technical support staff',
  answer:'To hire IT staff, list the systems they will support (computers, printers, networks, Wi-Fi, servers, CCTV, software and accounts), the number of users and locations, and whether the role is hands-on support, network administration or development. Test troubleshooting with a practical scenario, check certifications where relevant and agree on-call expectations in writing.',
  sections:[
    {h:'Which IT role do you need?',p:['An IT support officer fixes everyday problems: laptops, printers, email, Wi-Fi and user accounts. A network administrator manages routers, firewalls, servers and backups. A systems or ERP administrator looks after business software. A developer builds or maintains applications. Small offices often need one practical support person plus an external vendor for complex work.']},
    {h:'Practical troubleshooting test',p:['Ask candidates how they would handle real situations.'],
      list:['A user cannot connect to Wi-Fi but others can','The printer prints blank pages','Email works on mobile but not on the laptop','The internet is slow in the afternoons','A virus warning appears on a shared computer','A new joiner needs accounts and a laptop by tomorrow']},
    {h:'Security basics',p:['IT staff hold the keys to your systems. Agree password policies, backup routines, who has admin access and how access is removed when staff leave. Ask candidates how they would protect the office from phishing and ransomware.']},
    {h:'Documentation and handover',p:['Ask the IT person to keep a list of devices, licences, passwords stored securely and network diagrams. Documentation protects you if they leave or fall ill.']},
  ],
  checklist:{title:'IT hiring checklist',items:['List systems and users','Choose the role level','Prepare troubleshooting scenarios','Check certifications if needed','Agree on-call and security rules','Require documentation']},
  faqTitle:'IT staff: common questions',
  faqs:[
    ['Do we need a full-time IT person?','Offices with many users or critical systems usually do; smaller offices may combine a part-time person with a vendor.'],
    ['Which certifications matter?','Vendor certifications in networking or cloud can help, but practical troubleshooting ability matters most for support roles.'],
  ],
},

'virtual-assistants':{
  title:'Hiring a virtual assistant from Pakistan',
  answer:'To hire a virtual assistant, list the recurring tasks (email, calendar, documents, research, data entry, customer replies, bookings), the tools you use, the hours that must overlap with yours and how you will review work. Test with a short paid task, check written English and reliability, and start with a defined scope and weekly check-ins.',
  sections:[
    {h:'Tasks virtual assistants handle well',p:[],list:['Inbox management and drafting replies','Calendar scheduling across time zones','Travel and meeting bookings','Document formatting, presentations and spreadsheets','Online research and lead lists','CRM updates and data entry','Social media scheduling and basic customer messages']},
    {h:'Writing the brief',p:['Describe tasks as outcomes: “inbox under 20 unread by 5 pm”, “weekly report every Monday”. State the tools (Google Workspace, Microsoft 365, Slack, Trello, HubSpot) and access you will give. Note the overlap hours with your time zone and how quickly messages should be answered.']},
    {h:'The paid test task',p:['Give a realistic task: organise a sample inbox, schedule five meetings across time zones, or research ten suppliers into a spreadsheet. Pay for the time. Judge accuracy, communication and whether instructions were followed.']},
    {h:'Working together',p:['Share processes in writing, start with limited access, and hold a short daily or weekly check-in. Use a shared task list so priorities are clear. Trust grows with consistent delivery; expand responsibilities gradually.']},
  ],
  checklist:{title:'VA hiring checklist',items:['List recurring tasks as outcomes','Note tools and access','Set overlap hours','Prepare a paid test','Interview by video','Start with limited access','Schedule check-ins']},
  faqTitle:'Virtual assistants: common questions',
  faqs:[
    ['Part-time or full-time VA?','Start with part-time hours if tasks are limited; many VAs work full-time once routines are established.'],
    ['How do I protect passwords?','Use a password manager with shared vaults and two-factor authentication rather than sending passwords in messages.'],
  ],
},

'remote-customer-support':{
  title:'Hiring remote customer support agents',
  answer:'To hire remote customer support, define the channels (chat, email, phone, social media), the hours and shifts, the languages and the service standards such as first response time and resolution rate. Test candidates on sample customer messages and a short call simulation, check equipment and internet backup, and onboard them with a knowledge base and quality reviews.',
  sections:[
    {h:'Define the support model',p:[],list:['Channels and tools (Zendesk, Freshdesk, Intercom, WhatsApp Business, phone)','Hours and shifts, including weekends and night shifts','Languages and tone of voice','Response and resolution targets','Escalation path to your team','Knowledge base and refund or replacement rules']},
    {h:'Testing support skills',p:['Ask candidates to reply to five realistic customer messages, including an angry customer and a question not covered by the guide. Run a short call simulation for phone roles. Look for empathy, accuracy and knowing when to escalate.']},
    {h:'Equipment and reliability',p:['Remote support needs a quiet workspace, a good headset, a reliable laptop and stable internet with a backup connection and power backup. Ask candidates to describe their setup and what they do during power cuts.']},
    {h:'Quality and coaching',p:['Review a sample of tickets or calls weekly, score them against a checklist and coach agents individually. Share positive customer feedback with the team. Most quality problems come from unclear policies; update the knowledge base whenever new questions appear.']},
  ],
  checklist:{title:'Remote support checklist',items:['Define channels and hours','Write service targets','Prepare sample tickets','Check equipment and backup','Build a knowledge base','Plan weekly quality reviews']},
  faqTitle:'Remote support: common questions',
  faqs:[
    ['Can agents support US or UK hours?','Yes. Many Pakistani agents work night shifts for overseas customers; state the hours in the brief.'],
    ['How many agents do I need?','Estimate from ticket volume, handle time and hours of coverage, then add cover for breaks and leave.'],
  ],
},

'remote-digital-marketing':{
  title:'Hiring a remote digital marketer',
  answer:'To hire a remote digital marketer, decide which channels matter most (social media, SEO, Google or Meta ads, email or content), the monthly deliverables and the results you will track. Review portfolios with real numbers, give a short paid task such as a campaign plan, and agree reporting, budgets and approvals before giving access to accounts.',
  sections:[
    {h:'Choose the specialism',p:['Digital marketing is broad. A social media manager plans and publishes content and manages communities; an SEO specialist improves search visibility; a performance marketer runs paid ads; a content writer produces articles and copy; an email marketer builds campaigns and automations. One generalist can cover a small business, but larger budgets need specialists.']},
    {h:'Deliverables and measures',p:[],list:['Posts, articles or campaigns per month','Ad budgets and who approves spend','Measures: reach, leads, sales, cost per lead, rankings','Reporting format and frequency','Brand guidelines and approval steps']},
    {h:'Reviewing portfolios',p:['Ask for work with results: before-and-after rankings, ad campaigns with spend and leads, social accounts they grew. Ask what did not work and what they learned. Be cautious of guaranteed results; no honest marketer can guarantee rankings.']},
    {h:'Access and ownership',p:['Keep ownership of your ad accounts, analytics, domain and social pages in your company’s name, and give the marketer user access. Remove access when the engagement ends.']},
  ],
  checklist:{title:'Digital marketer checklist',items:['Choose channels and specialism','Set deliverables and measures','Review portfolio results','Run a paid planning task','Keep account ownership','Agree reporting']},
  faqTitle:'Remote marketing: common questions',
  faqs:[
    ['Can a marketer also design graphics?','Many can create basic graphics; complex design is better handled by a designer.'],
    ['How soon will SEO show results?','SEO usually takes months; paid ads can show results sooner. Agree realistic timelines.'],
  ],
},

'remote-developers':{
  title:'Hiring remote developers in Pakistan',
  answer:'To hire a remote developer, describe the product, the technology stack, the work (new features, maintenance, integrations), how your team plans and reviews code and the overlap hours. Review GitHub or portfolio work, run a small paid coding task and a technical conversation, and start with clear access rules, a sprint plan and code review.',
  sections:[
    {h:'Define the engineering need',p:[],list:['Product and users','Stack: languages, frameworks, databases, cloud','Work type: new build, maintenance, integrations, mobile','Seniority: junior, mid, senior, lead','Process: Git workflow, code review, testing, deployment','Overlap hours and meeting rhythm']},
    {h:'Assessing developers',p:['Combine three things: a review of real code the candidate has written, a small paid task close to your work (fixing a bug, adding a feature to a sample app) and a conversation about design choices and trade-offs. Senior candidates should discuss architecture and mentoring.']},
    {h:'Security and access',p:['Give the minimum access needed, use your own repositories and cloud accounts, require two-factor authentication and protect secrets with a vault. Agree intellectual property ownership in the contract.']},
    {h:'Working rhythm',p:['Weekly planning, daily written updates, pull requests reviewed by another developer and regular demos keep remote work visible. Document decisions so the team does not depend on one person’s memory.']},
  ],
  table:{caption:'Developer levels',head:['Level','Typical work'],rows:[
    ['Junior','Well-defined tasks with review'],
    ['Mid-level','Features end to end, some design'],
    ['Senior','Architecture, reviews, mentoring'],
    ['Lead','Planning, team coordination, standards'],
  ]},
  checklist:{title:'Developer hiring checklist',items:['Describe product and stack','Choose seniority','Review real code','Run a paid task','Discuss design choices','Set access and IP terms','Plan sprint and review rhythm']},
  faqTitle:'Remote developers: common questions',
  faqs:[
    ['Which stacks are common in Pakistan?','JavaScript and TypeScript (React, Node), PHP (Laravel), Python, Java, .NET and mobile (Flutter, React Native, Kotlin, Swift) are widely available.'],
    ['Who owns the code?','State in the contract that code and intellectual property belong to your company.'],
  ],
},
};
