import {go} from '../../../../lib/http';
import {rateLimited,clientIp} from '../../../../lib/auth';
import {findUserByEmail,checkUserPassword,saveUser,USER_COOKIE,userSessionValue} from '../../../../lib/users';
import {now} from '../../../../lib/store';

export const dynamic='force-dynamic';
export async function POST(req:Request){
  if(rateLimited('ulogin:'+clientIp(req),12,15*60*1000))return go('/account/login?error=locked');
  const f=await req.formData();const u=await findUserByEmail(String(f.get('email')||''));
  if(!u||!checkUserPassword(u,String(f.get('password')||'')))return go('/account/login?error=1');
  if(u.status!=='active')return go('/account/login?error=suspended');
  await saveUser({...u,lastLogin:now()});
  const next=String(f.get('next')||'');
  const res=go(next.startsWith('/')&&!next.startsWith('//')?next:'/account');
  res.cookies.set(USER_COOKIE,userSessionValue(u.id),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:30*86400});
  return res;
}
