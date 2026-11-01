// Candidate profile text used when the team sends an applicant's details to a client,
// by email (with optional CV) or by copying it into WhatsApp.
import type {Application} from './store';

export function profileLines(a:Application,includePhone:boolean){
  return [
    `Candidate: ${a.name}`,
    `Applied for: ${a.jobTitle}`,
    `Kind of work: ${a.role||'—'}`,
    `City: ${a.city||'—'}`,
    `Experience: ${a.experience||'not given'}`,
    ...(a.message?[`About: ${a.message.slice(0,600)}`]:[]),
    ...(includePhone?[`Phone / WhatsApp: ${a.phone}`,...(a.email?[`Email: ${a.email}`]:[])]:['Contact: through estaff.pk']),
  ];
}
export function whatsappText(a:Application,includePhone:boolean){
  return ['*Candidate profile from estaff.pk*',...profileLines(a,includePhone),'',a.cvFile?'CV available on request.':'','Please verify CNIC and references before hiring.'].filter(Boolean).join('\n');
}
