import {go} from '../../../../lib/http';
import {COOKIE,checkPassword,sessionValue,rateLimited,clientIp} from '../../../../lib/auth';

export const dynamic='force-dynamic';
export async function POST(req:Request){
  if(rateLimited('login:'+clientIp(req),10,15*60*1000))return go('/admin/login?error=locked');
  const f=await req.formData();
  if(!checkPassword(String(f.get('password')||'')))return go('/admin/login?error=1');
  const res=go('/admin');
  res.cookies.set(COOKIE,sessionValue(),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:7*24*60*60});
  return res;
}
