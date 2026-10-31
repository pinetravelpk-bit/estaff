import {go} from '../../../../lib/http';
import {useToken,getUser,saveUser,currentUser} from '../../../../lib/users';
import {sendVerifyEmail} from '../../../../lib/notify';
import {rateLimited,clientIp} from '../../../../lib/auth';

export const dynamic='force-dynamic';
// Link from the confirmation email.
export async function GET(req:Request){
  const token=new URL(req.url).searchParams.get('token')||'';
  const id=await useToken(token,'verify');if(!id)return go('/account?msg=badlink');
  const u=await getUser(id);if(u)await saveUser({...u,emailVerified:true});
  return go('/account?msg=verified');
}
// "Send the email again" button.
export async function POST(req:Request){
  const u=await currentUser();if(!u)return go('/account/login');
  if(!u.emailVerified&&!rateLimited('verify:'+clientIp(req),3,60*60*1000))await sendVerifyEmail(u);
  return go('/account?msg=resent');
}
