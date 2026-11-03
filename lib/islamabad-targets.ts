// Search targets for the main household service pages (/services/domestic-staff/{role}).
// Each page leads with its primary Islamabad keyword and answers the related searches
// people make on Google (found through Google autocomplete for Islamabad, Nov 2026).
export type Target={
  keyword:string;      // primary keyword, used in title, H1 and schema
  title:string;        // meta title
  description:string;  // meta description
  hero:string;         // hero text under the H1
  h2:string;           // heading of the Islamabad section
  paras:string[];      // body copy that covers the related searches
  related:string[];    // related searches, shown as a short list
  faqs:[string,string][];
};

export const islamabadTargets:Record<string,Target>={
'care-attendants':{
  keyword:'Elder Care Services in Islamabad',
  title:'Elder Care Services in Islamabad – Home Care Attendants',
  description:'Elder care services in Islamabad and Rawalpindi: screened home care attendants for elderly parents, live-in or day shifts, in DHA, Bahria, F, G, E and I sectors.',
  hero:'Home care attendants for elderly parents in Islamabad and Rawalpindi: help with daily routines, mobility, meals, medicines reminders and companionship, at home rather than in a care home.',
  h2:'Elder care services in Islamabad: care at home',
  paras:[
    'Many families searching for an old age home or care home in Islamabad would prefer their parents to stay at home if dependable help were available. estaff.pk arranges home care attendants who support an elderly person in their own house: helping them get up and dressed, bathing and toileting with dignity, walking safely, eating well, taking medicines on time as the doctor has prescribed, and having someone to talk to through the day.',
    'Home care in Islamabad can be live-in, with an attendant who stays at the house and has a private room, a weekly day off and agreed rest hours, or day or night shifts for families who are at home part of the time. Families in DHA Islamabad, Bahria Enclave and the F, G, E and I sectors often combine a live-in attendant with a visiting home nurse for clinical tasks such as injections, wound dressing or catheter care.',
    'Attendants are not nurses. If your parent needs clinical care, see our patient care and home nursing service. For dementia, stroke recovery or bed-bound care, say so in your brief so we look for attendants with that experience. Every candidate’s CNIC and references are checked, and a police character certificate is requested for home-based roles.',
    'The cost of elder care at home in Islamabad depends on whether care is live-in or shift-based, the hours, the level of help needed and the attendant’s experience. estaff.pk does not publish fixed prices; the salary, any fee and payment dates are agreed in writing before the attendant starts.',
  ],
  related:['home care services in Islamabad','old age care at home in Islamabad','elderly care attendant Islamabad','live-in caregiver Islamabad','home health care services Islamabad','elder care in Rawalpindi'],
  faqs:[
    ['Is home care a good alternative to an old age home in Islamabad?','For many families, yes. A home care attendant lets your parent stay in familiar surroundings with family nearby. If round-the-clock medical supervision is needed, discuss it with their doctor first.'],
    ['Do you provide live-in elder care in Islamabad?','Yes. Live-in attendants are common in Islamabad and Rawalpindi. Agree the room, meals, rest hours and weekly day off in writing.'],
    ['How much do elder care services in Islamabad cost?','It depends on live-in or shift work, hours, the care needed and experience. Salary and any fee are agreed in writing before the start; there are no hidden charges.'],
    ['Can I get a female attendant for my mother?','Yes. State your preference in the brief; many families ask for a female attendant for personal care.'],
  ],
},
'home-nurses':{
  keyword:'Patient Care Services in Islamabad',
  title:'Patient Care Services in Islamabad – Home Nursing & Attendants',
  description:'Patient care services in Islamabad and Rawalpindi: qualified home nurses and patient attendants for post-surgery, stroke, bed-bound and long-term care at home.',
  hero:'Qualified home nurses and patient attendants for care at home in Islamabad and Rawalpindi: after surgery or hospital discharge, stroke recovery, bed-bound patients and long-term conditions.',
  h2:'Patient care services in Islamabad: nursing at home',
  paras:[
    'When a family member comes home from hospital in Islamabad, the care they need often continues: medicines, injections, drips, wound dressing, catheter or feeding-tube care, turning to prevent bedsores, and careful monitoring of blood pressure and sugar. estaff.pk helps families arrange home patient care through qualified nurses for clinical work and trained patient attendants for daily care.',
    'Home nursing services in Islamabad can be arranged for 12-hour or 24-hour shifts, as a live-in nurse, or as visits for specific procedures. Nurse candidates are asked for their nursing qualification and registration, which you can verify, along with their CNIC and references. Clinical work follows the treating doctor’s written instructions; nurses do not change prescriptions.',
    'Many families combine a patient attendant, who helps with bathing, feeding, mobility and companionship, with a home nurse who visits or covers clinical tasks. This keeps home health care in Islamabad affordable while making sure medical tasks are done by a qualified person. We arrange patient care across DHA Islamabad, Bahria Town, the F, G, E and I sectors, and Rawalpindi.',
    'Home nursing charges in Islamabad depend on the qualification needed, shift length, live-in or visiting care and the patient’s condition. The salary, any fee and payment dates are confirmed in writing before care begins.',
  ],
  related:['home nursing services in Islamabad','home patient care services Islamabad','patient attendant in Islamabad','home health care services Islamabad','nursing care at home in DHA Islamabad','home nursing in Rawalpindi'],
  faqs:[
    ['What is the difference between a home nurse and a patient attendant?','A home nurse is qualified for clinical tasks such as injections, drips and wound care. A patient attendant helps with daily care such as bathing, feeding and mobility. Many patients need both.'],
    ['Can I get a 24-hour nurse at home in Islamabad?','Yes. Round-the-clock care is usually arranged as two 12-hour shifts or a live-in nurse with agreed rest periods.'],
    ['How much do home nursing services cost in Islamabad?','It depends on the qualification, shift length and the patient’s needs. Charges are agreed in writing before the start.'],
    ['Do you provide patient care after surgery?','Yes. Share the discharge summary and the doctor’s instructions so we can match the right nurse or attendant.'],
  ],
},
drivers:{
  keyword:'Driver Hiring Service in Islamabad',
  title:'Driver Hiring Service in Islamabad – Personal & Family Drivers',
  description:'Driver hiring service in Islamabad and Rawalpindi: licence-checked personal, family and school-run drivers, full-time, part-time or live-in.',
  hero:'Personal, family and school-run drivers for homes in Islamabad and Rawalpindi, with licence, CNIC and reference checks before the first drive.',
  h2:'Driver hiring service in Islamabad: what we check',
  paras:[
    'Families in Islamabad hire drivers for school and office runs, errands, elderly parents’ hospital visits and trips between Islamabad and Rawalpindi. estaff.pk helps you hire a personal driver or family driver who knows the main routes, including Kashmir Highway, the Islamabad Expressway, Murree Road and the roads into Bahria Town and DHA, and who drives calmly in school-time traffic.',
    'Every driver candidate is asked for a valid driving licence of the right category, their CNIC and references from previous employers. We suggest a short test drive on your usual routes before you decide. For longer trips, such as to Murree, Lahore on the motorway or the airport, agree the rules on rest, overnight stays and allowances in advance.',
    'You can hire a full-time driver, a part-time driver for school runs only, or a live-in driver with accommodation. Some families ask for a driver who can also handle errands, car cleaning and basic maintenance. For business use or a chauffeur for executives and visiting guests, tell us the vehicle and the schedule.',
    'A driver’s salary in Islamabad depends on hours, overtime, whether the role is live-in and the driver’s experience. The salary, overtime rules and day off are agreed in writing before the start.',
  ],
  related:['driver service in Islamabad','hire a driver in Islamabad','personal driver Islamabad','family driver Islamabad','chauffeur service in Islamabad','driver in Rawalpindi'],
  faqs:[
    ['How do I hire a driver in Islamabad?','Share the vehicle, routes, hours and salary budget. We check licence, CNIC and references, and you interview and test-drive shortlisted drivers.'],
    ['Can I hire a part-time driver for school runs?','Yes. Part-time drivers for morning and afternoon school runs are common in Islamabad.'],
    ['Do you provide chauffeurs for executives?','Yes. Tell us the vehicle, schedule and dress or conduct expectations for a corporate or executive driver.'],
    ['What is a driver’s salary in Islamabad?','It depends on hours, overtime, live-in or live-out and experience. Agree it in writing before the start.'],
  ],
},
'cooks-chefs':{
  keyword:'Chef Services in Islamabad',
  title:'Chef Services in Islamabad – Home Cooks & Private Chefs',
  description:'Chef services in Islamabad and Rawalpindi: home cooks and private chefs for family meals, desi and continental cooking, live-in or part-time.',
  hero:'Home cooks and private chefs for families in Islamabad and Rawalpindi: daily desi meals, continental and BBQ, guests and special diets, chosen through a cooking trial.',
  h2:'Chef services in Islamabad: home cooks and private chefs',
  paras:[
    'Islamabad families hire cooks for very different needs: a home cook who makes daily desi meals for a family, a private chef who can handle continental, Chinese and BBQ for frequent guests, or a cook who follows a special diet for diabetes or heart health. estaff.pk helps you hire a cook in Islamabad who fits your kitchen, your menu and your family’s routine.',
    'The best test is a cooking trial: ask shortlisted cooks to prepare two or three dishes your family eats every week, and judge hygiene, taste and timing the same way for each. Agree whether the cook will also buy groceries, keep a kitchen account and clean the kitchen, and how guest days are handled.',
    'You can hire a live-in cook with a room and meals, a full-time cook who comes in daily, or a part-time cook for lunch or dinner only. Many families also ask for a female cook. Cook candidates are checked for CNIC and references from previous households or restaurants.',
    'A cook’s salary in Islamabad depends on cuisine skills, experience, hours, live-in or live-out and how many people the cook feeds. The salary and any fee are agreed in writing before the cook starts.',
  ],
  related:['cook services in Islamabad','hire a cook in Islamabad','home cook in Islamabad','female cook in Islamabad','part-time cook in Islamabad','cook in Rawalpindi'],
  faqs:[
    ['How do I hire a cook in Islamabad?','Write down your menu, family size, hours and budget. We shortlist cooks with checked references, and you hold a cooking trial before deciding.'],
    ['Can I hire a female cook in Islamabad?','Yes. State your preference in the brief.'],
    ['Do you provide part-time cooks?','Yes. Part-time cooks for lunch or dinner only are common, especially for working couples.'],
    ['What is a cook’s salary in Islamabad?','It depends on skills, hours, live-in or live-out and family size. Agree it in writing before the start.'],
  ],
},
'maids-housekeepers':{
  keyword:'House Maid Services in Islamabad',
  title:'House Maid Services in Islamabad – Live-in & Part-time Maids',
  description:'House maid services in Islamabad and Rawalpindi: screened live-in, full-time and part-time maids and housekeepers for cleaning, laundry and household help.',
  hero:'Screened live-in, full-time and part-time maids and housekeepers for homes in Islamabad and Rawalpindi, for cleaning, laundry, ironing and help around the house.',
  h2:'House maid services in Islamabad: finding the right maid',
  paras:[
    'Families searching for a house maid agency in Islamabad usually want two things: someone trustworthy, and someone who will stay. estaff.pk helps you hire a maid by starting with a clear list of the work: which rooms, laundry and ironing, dishes, help in the kitchen and any child or elderly support, plus hours, rest days and salary.',
    'You can hire a live-in maid, who stays at the house with her own room, meals, rest hours and a weekly day off; a full-time maid who comes in daily; or a part-time maid for a few hours a day or a few days a week. Larger homes in DHA, Bahria Enclave and the F-sectors often hire a housekeeper to manage the household and supervise other staff.',
    'Every maid candidate is checked for CNIC and references, and a police character certificate is requested for home-based roles. Meet candidates in person, explain the house rules and agree everything in writing. A short paid trial is a fair way to see whether the arrangement suits both sides.',
    'House maid costs in Islamabad depend on live-in or live-out work, hours, duties and experience. The salary, any fee and payment date are agreed in writing before the maid starts, so there are no surprises.',
  ],
  related:['home maid services in Islamabad','house maid agency Islamabad','live-in maid Islamabad','part-time maid Islamabad','housekeeper in Islamabad','maid in Rawalpindi'],
  faqs:[
    ['How much does a house maid cost in Islamabad?','It depends on live-in or live-out work, hours, duties and experience. The salary and any fee are agreed in writing before the start.'],
    ['Can I hire a live-in maid in Islamabad?','Yes. Provide a private room, meals, agreed rest hours and a weekly day off, and put these in writing.'],
    ['Do you provide part-time maids?','Yes. Part-time maids for a few hours a day or a few days a week are common in Islamabad.'],
    ['Do you offer one-time house cleaning?','Our focus is long-term household staff. For deep cleaning only, tell us the job; we will say if it fits our service.'],
  ],
},
'nannies-babysitters':{
  keyword:'Nanny Services in Islamabad',
  title:'Nanny Services in Islamabad – Nannies & Babysitters',
  description:'Nanny services in Islamabad and Rawalpindi: screened nannies and babysitters for babies, toddlers and school-age children, live-in or day nannies.',
  hero:'Screened nannies and babysitters for families in Islamabad and Rawalpindi: newborn and infant care, toddlers, school pick-ups and after-school care, live-in or by day.',
  h2:'Nanny services in Islamabad: care for your children',
  paras:[
    'Working parents in Islamabad often need a nanny they can trust completely. estaff.pk helps families find a nanny or babysitter by starting with your child’s age and routine: feeding, naps, bathing, play, school drop-offs and pick-ups, homework help and the house rules on food, screens and outings.',
    'You can hire a live-in nanny who stays with the family, a day nanny for working hours, or a babysitter for afternoons, evenings or occasional help. For newborns, look for experience with infant feeding, sterilising, sleep routines and safe bathing. For school-age children, a nanny who can help with homework in English and Urdu is a plus.',
    'Every nanny candidate is checked for CNIC and references from families they have worked for, and a police character certificate is requested. Ask about first-aid knowledge and how they would handle a fever, a fall or a choking emergency. A paid trial day, with a parent at home, is a good way to see how the nanny and children get on.',
    'Nanny costs in Islamabad depend on the number and ages of children, hours, live-in or live-out and experience. The salary and any fee are agreed in writing before the start.',
  ],
  related:['nanny in Islamabad','babysitter in Islamabad','live-in nanny Islamabad','newborn nanny Islamabad','nanny services cost','nanny in Rawalpindi'],
  faqs:[
    ['How do I find a reliable nanny in Islamabad?','Describe your child’s age, routine and hours. We check CNIC and references, and you interview and hold a paid trial day before deciding.'],
    ['Do you provide babysitters for evenings?','Yes. Babysitters for evenings and occasional help can be arranged; agree how they get home safely.'],
    ['Can I hire a nanny for a newborn?','Yes. Ask for experience with infant feeding, sleep routines and safe bathing.'],
    ['How much do nanny services cost in Islamabad?','It depends on the children’s ages, hours and live-in or live-out. Salary and any fee are agreed in writing before the start.'],
  ],
},
};
