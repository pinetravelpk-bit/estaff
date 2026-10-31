import {go} from '../../../../lib/http';
import {rateLimited,clientIp} from '../../../../lib/auth';
import {field,validEmail,validPhone} from '../../../../lib/account-guard';
import {createUser,findUserByEmail,passwordProblem,saveAgency,uniqueAgencySlug,stripLinks,USER_COOKIE,userSessionValue} from '../../../../lib/users';
import {sendVerifyEmail,notifyNewAgency} from '../../../../lib/notify';
import {now} from '../../../../lib/store';

export const dynamic='force-dynamic';
export async function POST(req:Request){
  const f=await req.formData();const role=field(f,'role')==='agency'?'agency':'seeker';
  const back=(e:string)=>go(`/account/register?type=${role}&error=${e}`);
  if(field(f,'website'))return go('/account');
  if(rateLimited('reg:'+clientIp(req),6,60*60*1000))return back('limit');
  const name=field(f,'name',100),email=field(f,'email',120).toLowerCase(),phone=field(f,'phone',30),pw=String(f.get('password')||'');
  if(name.length<2)return back('name');if(!validEmail(email))return back('email');if(!validPhone(phone))return back('phone');
  if(passwordProblem(pw))return back('password');if(pw!==String(f.get('password2')||''))return back('match');
  if(f.get('terms')!=='yes')return back('terms');
  if(await findUserByEmail(email))return back('exists');
  let agencyName='';
  if(role==='agency'){agencyName=stripLinks(field(f,'agencyName',120));if(agencyName.length<3)return back('agency');}
  const u=await createUser(role,email,name,phone,pw);
  if(role==='agency'){
    await saveAgency({userId:u.id,slug:await uniqueAgencySlug(agencyName,u.id),name:agencyName,logo:'',about:'',services:[],cities:[],phone,whatsapp:'',email,address:'',city:field(f,'city',60),regNo:'',founded:'',status:'pending',createdAt:now(),updatedAt:now()});
    await notifyNewAgency(agencyName,email);
  }
  await sendVerifyEmail(u);
  const res=go('/account?msg=welcome');
  res.cookies.set(USER_COOKIE,userSessionValue(u.id),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:30*86400});
  return res;
}
