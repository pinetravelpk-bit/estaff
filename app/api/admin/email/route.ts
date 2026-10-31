import {denyIfNotAdmin} from '../../../../lib/admin-guard';
import {go} from '../../../../lib/http';
import {getSettings,saveSettings} from '../../../../lib/settings';
import {sendMail,emailHtml} from '../../../../lib/mail';

export const dynamic='force-dynamic';
const valid=(e:string)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
export async function POST(req:Request){
  const deny=await denyIfNotAdmin();if(deny)return deny;
  const f=await req.formData();const action=String(f.get('_action')||'');
  if(action==='test'){const to=String(f.get('to')||'').trim();if(!valid(to))return go('/admin/email?msg=invalid');
    const ok=await sendMail(to,'estaff.pk test email',emailHtml('Email is working',['This is a test email from your estaff.pk dashboard. Account emails, job alerts and notices will be delivered like this.']));
    return go('/admin/email?msg='+(ok?'sent':'failed'));}
  const email=String(f.get('email')||'').trim();if(email&&!valid(email))return go('/admin/email?msg=invalid');
  const s=getSettings();s.notify={email,applications:f.get('applications')==='on',enquiries:f.get('enquiries')==='on',agencies:f.get('agencies')==='on'};saveSettings(s);
  return go('/admin/email?msg=saved');
}
