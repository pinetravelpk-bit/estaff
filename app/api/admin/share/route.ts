import {denyIfNotAdmin,backTo} from '../../../../lib/admin-guard';
import {listApplications,addApplicationShare,readCv,now} from '../../../../lib/store';
import {sendMail,emailHtml,mailConfigured} from '../../../../lib/mail';
import {profileLines} from '../../../../lib/candidate-share';
import {getSettings} from '../../../../lib/settings';

export const dynamic='force-dynamic';

// Send an applicant's profile (and optionally their CV) to a client by email.
export async function POST(req:Request){
  const deny=await denyIfNotAdmin();if(deny)return deny;
  const f=await req.formData();const id=String(f.get('id')||'');
  const to=String(f.get('to')||'').trim().slice(0,160),client=String(f.get('client')||'').trim().slice(0,120),note=String(f.get('note')||'').trim().slice(0,1500);
  const withPhone=f.get('phone')==='yes',withCv=f.get('cv')==='yes';
  const a=(await listApplications()).find(x=>x.id===id);
  if(!a)return backTo(f,'/admin/applications','msg=notfound');
  if(!/^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/.test(to))return backTo(f,'/admin/applications','msg=bademail');
  if(!a.shareConsent&&f.get('confirmed')!=='yes')return backTo(f,'/admin/applications','msg=noconsent');
  if(!mailConfigured())return backTo(f,'/admin/applications','msg=nomail');
  const cv=withCv&&a.cvFile?await readCv(a.cvFile):null;
  const ext=a.cvFile?.split('.').pop()||'pdf';
  const lines=[...(client?[`Dear ${client},`]:[]),...(note?[note]:[`Please find below a candidate profile for your requirement.`]),...profileLines(a,withPhone),...(cv?['The candidate’s CV is attached.']:[]),'Please verify the CNIC and references before you hire. Reply to this email to arrange an interview through estaff.pk.'];
  const reply=getSettings().notify.email||getSettings().contact.email||undefined;
  const ok=await sendMail(to,`Candidate for your requirement: ${a.role||a.jobTitle} – ${a.name}`,emailHtml('Candidate profile',lines),lines.join('\n'),cv?[{filename:`${a.name.replace(/[^A-Za-z0-9 ]/g,'').trim().replace(/\s+/g,'-')||'candidate'}-CV.${ext}`,content:cv}]:undefined,reply);
  if(!ok)return backTo(f,'/admin/applications','msg=sendfail');
  await addApplicationShare(id,{to,client,at:now(),phone:withPhone,cv:Boolean(cv)});
  return backTo(f,'/admin/applications','msg=shared');
}
