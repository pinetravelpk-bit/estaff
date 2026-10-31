import {go} from '../../../../lib/http';
import {rateLimited,clientIp} from '../../../../lib/auth';
import {findUserByEmail} from '../../../../lib/users';
import {sendResetEmail} from '../../../../lib/notify';

export const dynamic='force-dynamic';
// Always gives the same answer, so nobody can test which emails have accounts.
export async function POST(req:Request){
  const f=await req.formData();
  if(!rateLimited('forgot:'+clientIp(req),5,60*60*1000)){const u=await findUserByEmail(String(f.get('email')||''));if(u&&u.status==='active')await sendResetEmail(u);}
  return go('/account/forgot?sent=1');
}
