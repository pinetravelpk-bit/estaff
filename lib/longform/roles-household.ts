import type {LongForm} from './types';

// Long-form guides for the household role pages (/services/domestic-staff/...).
export const householdRoleGuides:Record<string,LongForm>={

'cooks-chefs':{
  title:'Hiring a home cook in Pakistan: a complete guide',
  answer:'To hire a home cook, decide how many people eat at home, which cuisines and meals you want, whether the cook will also shop and clean the kitchen, and whether the job is live-in. Shortlist cooks with references from households or restaurants, hold a paid cooking trial, and agree salary, hours, day off and kitchen rules in writing.',
  sections:[
    {h:'Family cook, khansama or chef?',p:['A family cook prepares daily Pakistani meals for the household and keeps the kitchen running. A khansama traditionally manages the whole kitchen, including stock and sometimes other kitchen help, and often cooks for guests. A chef usually has restaurant or hotel training, can cook continental, Chinese or baking, and expects higher pay. Most families need a reliable family cook who can also handle guests a few times a month.']},
    {h:'Write the kitchen brief',p:['Describe a normal week in your kitchen. Cooks decide whether to apply based on these details, and the right cook appreciates honesty about the workload.'],
      list:['Number of people and meals per day (breakfast, lunch, dinner, school lunch boxes)','Cuisines: Pakistani home food, BBQ, continental, Chinese, baking, diet meals','Special needs: diabetic, low-salt, children, elderly, allergies','Guests and parties: how often and how many people','Shopping: who buys groceries and how expenses are recorded','Kitchen cleaning, dishes and fridge management','Live-in or day shift, and timings around family meals']},
    {h:'The cooking trial',p:['A trial day tells you more than any interview. Ask the cook to prepare two or three dishes your family eats often, plus one dish they are proud of. Watch how they plan, use ingredients, keep the kitchen clean and manage time. Pay for the trial day and for the ingredients. Ask family members, especially elders and children, what they thought.']},
    {h:'Hygiene and food safety',p:['Good cooks wash hands often, keep raw meat separate from vegetables, store cooked food properly and clean as they go. Discuss your expectations on day one: aprons, hair covered, nails short, no phone use while handling food, and how leftovers are stored. For larger households, a simple weekly fridge and pantry clean prevents waste.']},
    {h:'Pay, extras and expenses',p:['Cooks’ pay depends on the city, experience, cuisines, family size and live-in arrangements. Cooking for large parties or extra cuisines usually earns more. If the cook shops, give a fixed weekly float, ask for receipts or a notebook record and settle it on the same day each week; most trust problems with cooks start with unclear grocery money.']},
  ],
  table:{caption:'Choosing the right cook',head:['Need','Best fit','Notes'],rows:[
    ['Daily family meals','Family cook','Pakistani home cooking, reliable routine'],
    ['Large family and frequent guests','Experienced khansama','Can plan menus and manage stock'],
    ['Continental, baking, diet food','Trained chef or cook with hotel experience','Higher pay, check specific skills'],
    ['Cooking plus cleaning in a small home','Cook-cum-maid','Keep the list realistic'],
  ]},
  checklist:{title:'Cook hiring checklist',items:['Write meals, cuisines and family size','Decide live-in or day shift','Set salary range and grocery process','Check references from previous households or restaurants','Run a paid cooking trial','Agree hygiene rules','Sign a written agreement']},
  faqTitle:'Hiring a cook: common questions',
  faqs:[
    ['Can a cook also clean the house?','Many cooks will keep the kitchen clean, but full house cleaning on top of cooking for a family is usually too much for one person. Consider a separate part-time maid.'],
    ['How do I check a cook’s skills before hiring?','A paid trial cooking day, where the cook prepares dishes your family eats regularly, is the most reliable test.'],
    ['Should a cook be live-in?','Live-in suits families who want early breakfast and late dinners. Live-out works for lunch and dinner shifts.'],
    ['Can estaff.pk find a cook for a restaurant?','Yes. For commercial kitchens, state the cuisine, covers per day and shifts so the shortlist matches restaurant experience.'],
  ],
},

'drivers':{
  title:'Hiring a family or company driver: a complete guide',
  answer:'To hire a driver, list the daily routes and timings, the vehicle and licence category needed, whether the driver will also run errands or wash the car, and the working hours including late or out-of-city trips. Check the licence and CNIC, speak to previous employers, take a test drive in your car and agree salary, overtime and fuel records in writing.',
  sections:[
    {h:'What kind of driver do you need?',p:['A family driver handles school runs, office drops, shopping and family visits. A company or executive driver drives managers, guests or staff on business routes and must be punctual and discreet. A delivery or pick-up driver moves goods and documents. Each needs different strengths, so describe the job before looking at candidates.']},
    {h:'Licence and documents',p:['In Pakistan, driving licences are issued for vehicle categories, such as motor car or LTV for cars and jeeps and HTV for heavy vehicles. Check that the licence matches your vehicle, that it has not expired and that the photo matches the candidate. Keep a copy of the CNIC and licence. For families, many also ask for a police character certificate.']},
    {h:'The test drive',p:['Sit beside the candidate for at least twenty minutes in normal traffic in your car. Watch how they start, check mirrors, use indicators, keep distance, handle roundabouts and park. Ask them to explain a route to a place you know. A calm, careful driver is worth more than one who is fast.']},
    {h:'Working hours and overtime',p:['Drivers often work long, irregular days. Write the normal hours, the weekly day off, how late-night trips and out-of-city trips are paid and whether meals are provided on long days. Agree rest breaks; a tired driver is a risk to your family.'],
      list:['Morning and afternoon school runs','Office timings for the working family members','Evening outings and weekend use','Out-of-city trips and overnight stays','Car washing, fuel and maintenance duties']},
    {h:'Fuel, maintenance and logbooks',p:['Agree how fuel is paid for, by card, cash float or reimbursement, and keep a simple logbook of mileage, fuel and maintenance. Ask the driver to report warning lights, tyre problems or unusual noises the same day. Clear records protect the driver as much as the owner.']},
  ],
  table:{caption:'Driver types at a glance',head:['Type','Typical work','Key strength'],rows:[
    ['Family driver','School, office, shopping','Patience, route knowledge'],
    ['Executive driver','Managers and guests','Punctuality, discretion, presentation'],
    ['Pick-up / delivery driver','Goods and documents','Navigation, careful loading'],
    ['Heavy vehicle driver','Trucks, buses','HTV licence, long-route experience'],
  ]},
  checklist:{title:'Driver hiring checklist',items:['List routes, timings and vehicle','Confirm licence category and expiry','Check CNIC and references','Take a test drive in your car','Agree hours, overtime and day off','Set fuel and logbook rules','Sign a written agreement']},
  faqTitle:'Hiring a driver: common questions',
  faqs:[
    ['Which licence does a family driver need?','For cars, jeeps and similar vehicles, a licence for that category (commonly called LTV or motor car). Check the category printed on the licence.'],
    ['Can a driver also do household errands?','Yes, if agreed. List errands such as shopping or bill payments in the brief so expectations are clear.'],
    ['How should overtime be handled?','Agree an hourly or per-trip rate for work beyond normal hours and out-of-city trips, and record it in the logbook.'],
    ['Is a police character certificate necessary?','Not legally required for private hiring, but many families ask for one for drivers who carry children.'],
  ],
},

'maids-housekeepers':{
  title:'Hiring a maid or housekeeper: what to know',
  answer:'To hire a maid or housekeeper, list the rooms and tasks (cleaning, laundry, ironing, dishes, helping in the kitchen), decide whether you need a daily part-time maid, a full-day maid or a live-in housekeeper, check the CNIC and references from previous households, and agree hours, salary, day off and house rules in writing before a short trial.',
  sections:[
    {h:'Part-time, full-day or live-in',p:['A part-time maid comes for a few hours to clean and do laundry, sometimes working in several homes. A full-day maid handles cleaning, laundry, dishes and helping in the kitchen. A live-in housekeeper stays at the home and runs the household routine, often supervising other staff in larger homes. Choose based on house size and how much help you need each day.']},
    {h:'Write a cleaning routine',p:['A written routine prevents arguments about what was or was not done.'],
      list:['Daily: sweeping and mopping, dusting, bathrooms, dishes, making beds','Weekly: windows, fans, kitchen cabinets, fridge, bed linen','Laundry: washing, drying, ironing and folding, and on which days','Rooms off limits or needing special care','Cleaning products to use on marble, wood and glass','Help in the kitchen: chopping, serving, washing up']},
    {h:'House rules and privacy',p:['Agree rules on phone use, visitors, entering bedrooms and handling valuables at the start. Keep jewellery and cash locked away; this protects both you and the maid from misunderstandings. Treat the worker with respect, and explain rules kindly; people stay where they feel trusted.']},
    {h:'Supplies and safety',p:['Provide gloves, safe cleaning products and proper tools. Never ask a worker to mix bleach with other chemicals, and keep chemicals away from children. Check that ladders are stable for fan and window cleaning.']},
    {h:'Supervising a housekeeper',p:['In larger homes, a housekeeper may manage other staff, plan weekly cleaning, track supplies and coordinate with the cook and driver. Give them authority to organise work and a budget for supplies with a simple record. Meet weekly for ten minutes to review.']},
  ],
  table:{caption:'Which maid arrangement fits?',head:['Home','Arrangement'],rows:[
    ['Small flat, working couple','Part-time daily maid'],
    ['Family home, 3–4 bedrooms','Full-day maid'],
    ['Large home, several staff','Live-in housekeeper'],
    ['Need cooking too','Separate cook, or cook-cum-maid for small homes'],
  ]},
  checklist:{title:'Maid hiring checklist',items:['List rooms and tasks','Choose part-time, full-day or live-in','Set hours, day off and salary','Check CNIC and references','Explain house rules kindly','Provide gloves and safe products','Agree a short trial','Write the agreement']},
  faqTitle:'Hiring a maid: common questions',
  faqs:[
    ['Can a maid work in more than one house?','Part-time maids often do. Agree fixed hours so their schedule works for everyone.'],
    ['Should I provide meals?','For full-day and live-in maids, meals during working hours are customary; agree this in advance.'],
    ['What if valuables go missing?','Keep valuables locked from the start. If something is missing, stay calm, check carefully and seek advice before accusing anyone.'],
  ],
},

'nannies-babysitters':{
  title:'Hiring a nanny or babysitter: a parent’s guide',
  answer:'To hire a nanny or babysitter, describe your child’s age, routine and needs, decide the hours and whether the nanny lives in, and look for real childcare experience with families you can call. Check the CNIC, references and preferably a police character certificate, watch a supervised trial with your child and agree routines, rules and pay in writing.',
  sections:[
    {h:'Nanny, babysitter or aya?',p:['A nanny cares for children every day, often full-time or live-in, and follows the family’s routines for feeding, sleep, play and school. A babysitter looks after children for set hours, such as evenings or while parents are at work. In many Pakistani homes, the traditional aya combines childcare with some household help. Be clear which you need.']},
    {h:'Describe your child’s day',p:['A nanny can only follow routines she knows.'],
      list:['Age of each child and any special needs or allergies','Feeding, naps and bedtime routines','School and tuition pick-ups and drops','Play, outdoor time and screen-time rules','Bathing, dressing and laundry for the children','What to do if the child is unwell']},
    {h:'Safety first',p:['Ask about first-aid knowledge and how the candidate would handle a fever, a fall or choking. Show the nanny where medicines and emergency numbers are, and agree who to call first. Never leave a new nanny alone with a baby until you have watched her care for the child for a few days.']},
    {h:'The supervised trial',p:['During a paid trial of a few days, stay at home and watch. Does she talk to the child, notice when they are hungry or tired, stay calm when they cry, keep them safe around stairs and the kitchen? Children’s reactions over several days are a good guide.']},
    {h:'Building trust',p:['Agree how she will update you during the day, perhaps a message at lunch and nap time. Be consistent with rules, back her up in front of the children and discuss disagreements privately. A respected nanny stays longer, and stability matters for children.']},
  ],
  table:{caption:'Childcare arrangements',head:['Situation','Arrangement'],rows:[
    ['Newborn and both parents working','Live-in or full-day nanny'],
    ['School-age children, afternoons','Babysitter for set hours'],
    ['Occasional evenings out','Trusted babysitter on call'],
    ['Child with special needs','Experienced carer, discuss training'],
  ]},
  checklist:{title:'Nanny hiring checklist',items:['Write your child’s routine','Decide hours and live-in or not','Check childcare references','Ask about first aid','Ask for a character certificate','Run a supervised paid trial','Agree updates, rules and pay in writing']},
  faqTitle:'Hiring a nanny: common questions',
  faqs:[
    ['Should I use a camera at home?','Some parents do. If you use cameras, be open about it and never place them in private areas such as the nanny’s room or bathrooms.'],
    ['Can the nanny travel with us?','Many do. Agree travel arrangements, accommodation and extra pay before trips.'],
    ['What age should a nanny be?','Experience, patience and reliability matter more than age. Pakistani domestic worker laws set minimum ages for domestic work; never employ a child.'],
  ],
},

'care-attendants':{
  title:'Hiring a care attendant for an elderly parent',
  answer:'To hire a care attendant, describe the person’s daily needs (moving around, bathing, eating, medicine reminders, company), the hours or shifts required, and any medical conditions. Look for patience and real experience with elderly or recovering patients, check references, and agree duties, shifts, pay and what the attendant must report to the family. Clinical tasks need a qualified nurse.',
  sections:[
    {h:'Attendant or nurse?',p:['A care attendant helps with daily living: getting up, walking, toileting, bathing, dressing, eating, medicine reminders and companionship. A nurse is qualified to give injections, manage drips, dress wounds and monitor clinical conditions. Many families hire an attendant for daily care and a visiting nurse for clinical tasks. Ask the treating doctor what level of care is needed.']},
    {h:'Shifts and cover',p:['Elderly care often needs day and night cover. One attendant cannot work 24 hours every day without rest. Options include two attendants on 12-hour shifts, a live-in attendant with family members covering nights, or a day attendant plus help at night when needed. Plan for weekly offs and leave from the start.']},
    {h:'Daily care routine',p:['Write the routine with the doctor’s advice.'],
      list:['Waking, toileting and bathing support','Mobility: walking aids, transfers from bed to chair','Meals, fluids and special diets','Medicine reminders exactly as prescribed','Exercises advised by a physiotherapist','Changing position to prevent bed sores','Company: conversation, prayers, reading, short walks']},
    {h:'Dignity and patience',p:['Older people can feel embarrassed needing help. A good attendant explains what they are doing, protects privacy and is patient with confusion or frustration. Watch how candidates speak to your parent during the trial.']},
    {h:'What the family should hear',p:['Ask the attendant to report changes the same day: less eating or drinking, new pain, confusion, falls, skin redness or breathlessness. Keep a simple notebook of medicines, meals and observations that visiting doctors and family can read.']},
  ],
  table:{caption:'Care levels',head:['Need','Who helps'],rows:[
    ['Company and help with routines','Care attendant'],
    ['Bed-bound, needs turning and hygiene care','Trained attendant, nurse visits'],
    ['Injections, drips, wound care','Qualified home nurse'],
    ['Night supervision','Second attendant or family rota'],
  ]},
  checklist:{title:'Care attendant checklist',items:['Ask the doctor about care level','Write the daily routine','Plan day and night cover','Check elderly-care references','Watch a trial with your parent','Set reporting and notebook routine','Agree pay, shifts and days off']},
  faqTitle:'Elderly care: common questions',
  faqs:[
    ['Can an attendant give medicines?','An attendant can give reminders and help with tablets as prescribed. Injections and clinical procedures need a qualified nurse.'],
    ['Male or female attendant?','Choose based on your parent’s comfort, especially for bathing and toileting. Many families prefer a same-gender attendant.'],
    ['What if care needs increase?','Review the plan with the doctor and adjust shifts or add nursing visits.'],
  ],
},

'home-nurses':{
  title:'Hiring a home nurse in Pakistan',
  answer:'To hire a home nurse, start with the doctor’s care plan: which clinical tasks are needed (injections, drips, wound dressing, catheter or tube care, vital signs) and for how many hours. Look for a qualified nurse with a nursing diploma or degree and registration with the Pakistan Nursing and Midwifery Council where required, check hospital or family references and agree duties, shifts and reporting in writing.',
  sections:[
    {h:'When a nurse is needed at home',p:['Families hire home nurses after surgery, during cancer treatment, for patients with strokes, diabetes complications, wounds or tubes, and for end-of-life care. The treating doctor should confirm the care plan and which tasks need a qualified nurse rather than an attendant.']},
    {h:'Qualifications and registration',p:['Ask for nursing certificates and, where applicable, current registration with the Pakistan Nursing and Midwifery Council. Ask what hospitals or wards the nurse worked in and which procedures they perform confidently. A nurse experienced in ICU or surgical wards may suit post-operative care; one from a medical ward may suit chronic conditions.']},
    {h:'Clinical tasks to agree',p:['Only tasks within the nurse’s training and the doctor’s orders should be done at home.'],
      list:['Vital signs: blood pressure, pulse, temperature, oxygen, sugar','Injections and medicines as prescribed','IV lines and drips where ordered','Wound dressing and pressure-sore care','Catheter, tube feeding or tracheostomy care','Record keeping and reporting to the doctor']},
    {h:'Emergencies',p:['Agree what the nurse should do in an emergency: who to call, which hospital to go to and when to call an ambulance. Keep the doctor’s number, the nearest hospital and an ambulance number written on the fridge.']},
    {h:'Shifts and rest',p:['Nursing shifts are commonly 8 or 12 hours. For 24-hour care, plan two or three nurses or a nurse plus an attendant. Tired staff make mistakes with medicines, so protect rest periods.']},
  ],
  table:{caption:'Nurse or attendant?',head:['Task','Nurse','Attendant'],rows:[
    ['Injections, drips','Yes','No'],['Wound dressing','Yes','Basic help only'],['Bathing, toileting','Can help','Yes'],['Medicine reminders','Yes','Yes'],['Vital signs and records','Yes','Basic, if trained'],
  ]},
  checklist:{title:'Home nurse checklist',items:['Get the doctor’s care plan','Confirm clinical tasks','Check qualifications and registration','Check hospital or family references','Plan shifts and rest','Agree emergency steps','Keep a care record at home']},
  faqTitle:'Home nursing: common questions',
  faqs:[
    ['Can a home nurse change prescriptions?','No. Nurses follow the doctor’s orders and report changes; only the doctor changes treatment.'],
    ['Do you provide male nurses?','Yes, male and female nurses can be requested depending on the patient’s needs and comfort.'],
    ['Is a home nurse cheaper than a hospital stay?','Often, for stable patients, but the decision should be medical. Ask the doctor whether home care is safe.'],
  ],
},

'office-boys-helpers':{
  title:'Hiring an office boy or office helper',
  answer:'To hire an office boy or helper, list the daily tasks such as serving tea, keeping the office tidy, carrying documents, banking errands and helping with photocopies, set office hours and who supervises him, and check CNIC and references. Look for punctuality, honesty and good manners with visitors, and agree salary, overtime and errand expenses in writing.',
  sections:[
    {h:'What an office boy does',p:['In Pakistani offices, the office boy keeps daily life running: tea and refreshments for staff and visitors, cleaning desks and the pantry, opening and closing the office, delivering documents, bank and courier errands, photocopying and helping during meetings. In small offices he may also handle basic filing.']},
    {h:'Write the duty list',p:[],list:['Office opening and closing times','Tea, water and visitor refreshments','Cleaning desks, pantry, meeting rooms','Errands: bank, courier, utility bills, documents','Photocopying, scanning and filing','Who gives instructions and approves errands']},
    {h:'Errand money and trust',p:['Office boys often handle cash for errands. Give a small float, ask for receipts and settle it daily or weekly in a simple register. Never send large cash amounts with one person without arrangements; use bank transfers where possible.']},
    {h:'Manners with visitors',p:['The office boy is often the first person visitors meet. Neat clothes or a uniform, polite greetings and quick service create a good impression. A short briefing on how to receive guests and serve tea in meetings goes a long way.']},
    {h:'Growth',p:['Reliable office boys who learn computer basics often grow into office assistants or admin roles. Encouraging this builds loyalty.']},
  ],
  checklist:{title:'Office boy checklist',items:['List duties and supervisor','Set hours and overtime','Check CNIC and references','Agree errand float and records','Provide uniform if needed','Brief on visitor etiquette']},
  faqTitle:'Office boys: common questions',
  faqs:[
    ['Should an office boy clean the washrooms?','Agree this clearly. Many offices hire separate janitorial staff for washrooms.'],
    ['Does he need to read and write?','Basic reading of Urdu helps with documents and errands; English is a bonus.'],
  ],
},

'gardeners':{
  title:'Hiring a gardener (mali) for your home',
  answer:'To hire a gardener, describe the size of your lawn and beds, pots, trees and any kitchen garden, how often you need care (daily, a few days a week or monthly visits), who provides tools, seeds and fertiliser, and seasonal tasks like planting and pruning. Check references from homes where the mali worked and agree visits and pay in writing.',
  sections:[
    {h:'Full-time or visiting mali',p:['Large houses and farmhouses often keep a full-time mali who also helps around the property. Most city homes use a visiting mali who comes daily for an hour or a few times a week, and many malis care for several houses in one neighbourhood.']},
    {h:'Seasonal garden work in Pakistan',p:['Gardening follows the seasons. In most of Punjab and Islamabad, winter flowers are sown in autumn, summer bedding in early spring, and lawns need more water and mowing in the hot months. Hill areas and the south have different calendars, so ask the mali how they plan the year in your city.'],
      list:['Watering schedule by season','Lawn mowing and edging','Weeding and hoeing beds','Seasonal planting and pots','Pruning hedges and trees','Fertiliser and pest control, used safely','Kitchen garden care']},
    {h:'Tools and materials',p:['Agree who provides tools, hoses, mowers, seeds, plants, manure and sprays. If you pay for materials, ask for receipts. Store chemicals safely away from children and pets.']},
    {h:'Saving water',p:['Ask the mali to water early morning or evening, fix leaking pipes and use mulch around plants. Water shortages are common in many Pakistani cities, and a careful mali saves both water and money.']},
  ],
  checklist:{title:'Gardener checklist',items:['Describe garden size and features','Decide visits per week','Agree who buys tools and materials','Check references','Plan seasonal work','Agree pay and timings']},
  faqTitle:'Gardeners: common questions',
  faqs:[
    ['Can a mali also wash cars or clean outdoors?','Often yes, if agreed and paid for. List extra tasks clearly.'],
    ['How do I know the mali is skilled?','Ask to see gardens they maintain, or ask them to explain how they would plan your garden through the year.'],
  ],
},

'watchmen-caretakers':{
  title:'Hiring a watchman, chowkidar or caretaker',
  answer:'To hire a watchman or chowkidar, define the property, the hours of duty (day, night or both), gate and visitor rules, patrol duties and who to call in an emergency. Check the CNIC, references and a police character certificate, provide a safe post with lighting and shelter, and agree shifts, rest and pay in writing. Armed guards need licensed security arrangements.',
  sections:[
    {h:'Watchman, caretaker or security guard',p:['A chowkidar or watchman guards a home’s gate, keeps a visitor log and makes night rounds. A caretaker looks after an empty house, farmhouse or plot: checking for damage, paying small bills, arranging repairs and keeping it clean. A trained security guard from a security company is usually needed for commercial premises and armed security.']},
    {h:'Duties to write down',p:[],list:['Gate duty hours and who may enter','Visitor and vehicle log','Night rounds and lights','Parcel and delivery handling','Water tank, generator or pump checks','Emergency contacts and actions','Quarters, meals and rest breaks']},
    {h:'Night duty and rest',p:['Night duty is tiring. A watchman working nights should rest during the day and have a weekly off with cover. Provide a proper post with shade, lighting, a fan or heater, water and a toilet. A guard sleeping at night is usually a sign of exhaustion from working day and night.']},
    {h:'Caretakers for empty properties',p:['For houses or farmhouses that stay empty, a caretaker should send photos weekly, report leaks and damage immediately, keep utilities paid and prevent encroachment. Agree a monthly budget for small repairs with records.']},
    {h:'Armed security',p:['Armed guards are subject to weapon licensing and security regulations. Use a licensed security company rather than arming a private watchman.']},
  ],
  checklist:{title:'Watchman checklist',items:['Define property and duty hours','Write gate and visitor rules','Check CNIC, references and character certificate','Provide a proper post and quarters','Plan rest and weekly off','Agree emergency steps','Sign an agreement']},
  faqTitle:'Watchmen: common questions',
  faqs:[
    ['Can a watchman also garden or clean?','Light extra duties can be agreed during the day, but not at the cost of rest needed for night duty.'],
    ['Do you provide guards for housing societies?','Yes, guards for societies and plazas are available through facility staffing.'],
  ],
},

'domestic-couples':{
  title:'Hiring a domestic couple: two roles, one household',
  answer:'A domestic couple is a husband and wife who live in and share household work, for example one cooks and keeps house while the other drives, gardens or handles maintenance. To hire one, write two clear job descriptions, provide private family accommodation, check references for both, and agree each person’s duties, hours and pay separately in writing.',
  sections:[
    {h:'Why families hire couples',p:['Couples suit large homes, farmhouses and families who want reliable live-in help. Couples tend to settle well when they have proper accommodation, and their combined skills cover more of the household. They are especially common for homes outside city centres where daily commuting is hard for staff.']},
    {h:'Two job descriptions',p:['The most common problem with couples is unclear division of work. Write each person’s duties and hours separately, and decide who reports to whom in the family.'],
      list:['Partner one: cooking, cleaning, laundry, house routine','Partner two: driving, gardening, maintenance, errands, security','Shared tasks and when each is off duty','Rules if one partner is unwell or on leave']},
    {h:'Accommodation',p:['Provide a private room or quarter with a lock, a bathroom and cooking or meal arrangements. If the couple has children, discuss this openly before hiring: schooling, space and safety. Never hire a couple expecting their children to work.']},
    {h:'Pay',p:['Pay each person separately for their role, even if salaries are transferred together, so both are recognised as workers. Agree leave so both partners can visit family together.']},
  ],
  checklist:{title:'Couple hiring checklist',items:['Write two job descriptions','Prepare private accommodation','Check references for both','Discuss children and family visits','Agree separate pay and duties','Plan leave and cover']},
  faqTitle:'Domestic couples: common questions',
  faqs:[
    ['Can a couple bring their children?','Discuss it openly before hiring. Many families accommodate young children; children must never be expected to work.'],
    ['What if one partner leaves the job?','Agree in advance how this is handled, since both usually live on the property.'],
  ],
},

'personal-attendants':{
  title:'Hiring a personal attendant',
  answer:'A personal attendant helps one person with daily life: moving around, errands, appointments, organising belongings, accompanying them outside and sometimes basic personal care. To hire one, describe the person’s routine and needs, agree boundaries and duties in writing, check references and choose someone whose temperament suits the person they will support.',
  sections:[
    {h:'Who needs a personal attendant',p:['Elderly people who are independent but need company and help outside, people with disabilities, patients recovering from surgery and busy professionals who need daily help with errands all hire personal attendants. The role sits between a care attendant and a personal assistant.']},
    {h:'Duties to agree',p:[],list:['Accompanying to appointments, mosque, markets or family visits','Help with walking, wheelchair or transport','Organising medicines, papers and belongings','Errands, bills and shopping','Basic personal care if agreed','Company and conversation']},
    {h:'Choosing the right person',p:['Temperament matters as much as experience. Some people want a quiet attendant, others someone talkative. Language, gender, age and interests can all affect comfort. Let the person being supported meet candidates and have a say.']},
    {h:'Boundaries',p:['Agree clearly what the attendant should not do: handling large sums of money, signing documents, making decisions on medical care. Keep expenses recorded. Good boundaries protect both the attendant and the person they support.']},
  ],
  checklist:{title:'Personal attendant checklist',items:['Describe daily routine and needs','List duties and boundaries','Involve the person being supported','Check references','Agree hours, travel and pay','Set an expense record']},
  faqTitle:'Personal attendants: common questions',
  faqs:[
    ['Is a personal attendant the same as a nurse?','No. Attendants help with daily life; clinical care needs a qualified nurse.'],
    ['Can an attendant drive?','If they hold the right licence and it is agreed, yes. Check the licence and take a test drive.'],
  ],
},
};
