import {go} from '../../../../lib/http';
import {useToken,getUser,saveUser,hashPassword,passwordProblem} from '../../../../lib/users';

export const dynamic='force-dynamic';
export async function POST(req:Request){
  const f=await req.formData();const token=String(f.get('token')||'');const pw=String(f.get('password')||'');
  if(passwordProblem(pw))return go(`/account/reset?token=${encodeURIComponent(token)}&error=password`);
  if(pw!==String(f.get('password2')||''))return go(`/account/reset?token=${encodeURIComponent(token)}&error=match`);
  const id=await useToken(token,'reset');const u=id?await getUser(id):null;
  if(!u)return go('/account/forgot?error=expired');
  await saveUser({...u,...hashPassword(pw),emailVerified:true});
  return go('/account/login?msg=reset');
}
