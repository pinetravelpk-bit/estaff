import {getUser,saveUser,unsubscribeSig} from '../../../../lib/users';

export const dynamic='force-dynamic';
// One-click "stop job alerts" link from the bottom of every alert email.
export async function GET(req:Request){
  const q=new URL(req.url).searchParams;const id=q.get('u')||'';const s=q.get('s')||'';
  const u=await getUser(id);
  const ok=Boolean(u&&s.length===32&&s===unsubscribeSig(id));
  if(ok&&u)await saveUser({...u,alerts:{...u.alerts,enabled:false}});
  const msg=ok?'You will not receive any more job alert emails. You can switch them back on from your account at any time.':'This link is not valid. Sign in to your account to manage job alerts.';
  return new Response(`<!doctype html><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex"><title>Job alerts</title><body style="font-family:Arial;max-width:520px;margin:12vh auto;padding:0 20px;color:#142d35"><h1 style="font-size:22px">${ok?'Job alerts turned off':'Link not valid'}</h1><p>${msg}</p><p><a href="/account?tab=alerts" style="color:#007f65;font-weight:bold">Manage my alerts</a></p></body>`,{headers:{'Content-Type':'text/html; charset=utf-8'}});
}
