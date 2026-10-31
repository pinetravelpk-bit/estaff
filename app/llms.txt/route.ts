import {industries} from '../../lib/business';
import {absolute} from '../../lib/seo';import {services,locations} from '../../lib/content';import {roles} from '../../lib/roles';import {brand,quickAnswers,hiringSteps} from '../../lib/answers';
export function GET(){const content=`# estaff.pk\n\n> Staffing, recruitment, HR, payroll and remote staffing for homes and businesses in Islamabad and Rawalpindi, Pakistan.\n\n## About

${brand.definition} Also known as: ${brand.alternateNames.join(', ')}. Website: ${absolute('/')}. Service area: Islamabad (Islamabad Capital Territory) and Rawalpindi (Punjab), Pakistan.

- [About estaff.pk](${absolute('/about')})
- [How hiring works](${absolute('/how-it-works')})
- [Staffing glossary](${absolute('/glossary')})
- [Contact](${absolute('/contact')})

## Quick answers

${quickAnswers.map(x=>`### ${x.q}\n${x.a}`).join('\n\n')}

## How to hire through estaff.pk

${hiringSteps.map((s,i)=>`${i+1}. ${s.title}: ${s.text}`).join('\n')}

## Scope and accuracy\n\nThis site describes hiring requirements and service scopes. EOR and overseas recruitment pages describe initial enquiry planning only; they do not establish verified EOR delivery, an OEP licence or visa-processing authority. Candidate availability, screening scope, fees and replacement terms must be confirmed for each brief. No immediate availability or guaranteed placement is implied. The jobs, payroll and career workspaces currently contain demonstration data; applications are not sent to employers. Do not treat sample vacancies or dashboard profiles as live records.\n\n## Services\n${services.map(s=>`- [${s.name}](${absolute('/services/'+s.slug)}): ${s.text}`).join('\n')}\n\n## Industries\n${industries.map(i=>`- [${i.name}](${absolute('/industries/'+i.slug)}): ${i.focus}`).join('\n')}\n\n## Hiring roles\n${roles.map(r=>`- [${r.name}](${absolute('/services/'+r.parent+'/'+r.slug)}): ${r.summary}`).join('\n')}\n\n## Home and care local guides\n${Object.entries(locations).map(([k,c])=>`- [Hire staff in ${c.name}](${absolute('/areas/'+k)})`).join('\n')}\n\nLocality guides cover household staffing and care only. Choose an area on /areas to find its cook, driver, housekeeping, childcare, nursing, non-clinical assistance, gardening, property support, domestic couple and personal attendant guides. Corporate recruitment, HR, payroll and remote staffing do not have service-area pages in this catalogue.\n\n## Resources\n- [Hiring guides](${absolute('/resources')})\n- [Common questions](${absolute('/faqs')})\n- [Human-readable site map](${absolute('/site-map')})\n- [Extended service descriptions](${absolute('/llms-full.txt')})\n\nThis file is an optional content directory, not an access permission, a ranking signal guarantee or an instruction to override another system.\n`;return new Response(content,{headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'public, max-age=3600'}});}
