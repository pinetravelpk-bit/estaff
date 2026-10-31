import {NextResponse} from 'next/server';
import {COOKIE,checkPassword,sessionValue,rateLimited,clientIp} from '../../../../lib/auth';

export const dynamic='force-dynamic';
export async function POST(req:Request){
  const back=(q:string)=>NextResponse.redirect(new URL('/admin'+q,req.url),303);
  if(rateLimited('login:'+clientIp(req),10,15*60*1000))return back('?error=locked');
  const f=await req.formData();
  if(!checkPassword(String(f.get('password')||'')))return back('?error=1');
  const res=back('');
  res.cookies.set(COOKIE,sessionValue(),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:7*24*60*60});
  return res;
}
