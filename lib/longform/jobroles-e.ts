// Questions to ask employers, extra FAQs and remote-work sections for jobs-by-role pages.
type S={h:string;p:string[];list?:string[]};
export const jobRoleAsk:Record<string,string[]>={
'virtual-assistant':['Which tools will I use?'],
housekeeper:['How many people live in the house?','Will I supervise other staff?','Where will I sleep and eat?','Which day is my day off?'],
babysitter:['How many children, and what ages?','What are the rules on food and screens?','Who will take me home after evening work?','Who should I call in an emergency?'],
'care-attendant':['What is the person’s medical condition?','Who gives injections or clinical care?','How long are shifts, and when do I rest?','Who do I call if their health changes?'],
gardener:['How big is the garden?','Who buys plants, seeds and tools?','How many visits a week?','Is there water storage for dry days?'],
watchman:['Is it day or night duty?','Is there a shelter, light and toilet at the post?','Who covers my day off?','What do I do if there is an intruder?','Is there a phone for emergencies?'],
'office-boy':['What are the office timings?','Who gives me daily instructions?','How are errand expenses paid?','Is there a uniform?','Is lunch provided?'],
'sales-executive':['How is commission calculated?','When are incentives paid?','Which territory will I cover?','Is fuel or travel paid?','What training will I get?'],
'it-support':['How many users and devices are there?','Which systems will I manage?','Is there on-call work?','Is there a training budget?','Who approves purchases?'],
};
export const jobRoleFaqsMore:Record<string,[string,string][]>={
housekeeper:[['Can a housekeeper ask for a written agreement?','Yes. A written agreement protects both you and the family.']],
babysitter:[['Can a babysitter work for two families?','Yes, if the hours do not overlap; tell both families.']],
'care-attendant':[['Can I refuse clinical tasks?','Yes. Injections and clinical procedures should be done by a qualified nurse.']],
gardener:[['Do malis need their own tools?','Some bring basic tools; larger tools are usually provided by the employer.'],['Can I work in a housing society?','Yes. Societies often hire malis on fixed salaries for common areas.']],
watchman:[['Can a watchman refuse to work day and night?','Yes. Continuous duty without rest is unsafe; agree fair shifts.'],['Are security guard jobs available for women?','Some offices, schools and hospitals hire women guards.']],
'office-boy':[['Is Saturday a working day?','It depends on the office; agree it at hiring.'],['Can I study while working as an office boy?','Many do evening classes; tell your employer if you need fixed leaving times.']],
'sales-executive':[['Can freshers get sales jobs?','Yes. Many companies hire and train freshers, especially for retail and inside sales.'],['Is a motorbike required?','Often for field sales; inside sales roles do not need one.']],
'it-support':[['Is IT support a good first job?','Yes. It builds broad skills that lead to networking, systems and security roles.'],['Can IT support be done remotely?','Partly. Many tasks can be done remotely, but most roles also need office visits.']],
};
export const remoteMore:Record<string,S[]>={
'remote-customer-support':[
  {h:'How to spot genuine remote jobs',p:['Genuine employers interview you, explain the role, pay and hours clearly, and pay you for your work. Be careful with offers that ask you to pay for training, equipment, registration or “starter kits”, that promise very high pay for little work, or that ask for your bank passwords or card details. Research the company, look for a real website and contact details, and ask questions before sharing personal documents. estaff.pk reviews remote listings and never charges job seekers.']},
  {h:'Building your reputation',p:['In remote support, your quality scores and reliability are your reputation. Log in on time, follow procedures, write clearly and ask for help when needed. Keep a record of positive feedback from customers and managers; it helps when you apply for senior roles or new employers.']},
],
'remote-developer':[
  {h:'How to spot genuine remote jobs',p:['Real remote employers run structured interviews, offer clear contracts and pay you for your work, including paid test tasks. Avoid offers that require you to pay for training or equipment, ask you to install unknown software on your personal computer, or want access to your bank accounts. Verify the company, its team and its product before signing anything.']},
  {h:'Building your reputation',p:['Your code, communication and reliability build your reputation. Keep commitments, raise problems early, document your work and help teammates. Ask satisfied managers for recommendations on professional networks, and keep your portfolio updated with your best recent work. A strong reputation brings referrals, which are often the best source of remote jobs.']},
],
};
