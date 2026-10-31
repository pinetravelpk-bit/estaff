import {go} from '../../../../lib/http';
import {apiUser,field,validPhone} from '../../../../lib/account-guard';
import {saveUser,checkUserPassword,hashPassword,passwordProblem,deleteUser,USER_COOKIE,stripLinks,type User} from '../../../../lib/users';
import {saveCv} from '../../../../lib/store';
import {jobType} from '../../../../lib/jobs';
import {anyCity} from '../../../../lib/pakistan';

export const dynamic='force-dynamic';
// Profile, CV, job alerts, password and account deletion for signed-in users.
export async function POST(req:Request){
  const {user,deny}=await apiUser();if(deny)return deny;
  const f=await req.formData();const action=field(f,'_action');
  if(action==='alerts'&&user.role==='seeker'){
    const types=f.getAll('alertTypes').map(String).filter(t=>jobType(t)).slice(0,18);const cities=f.getAll('alertCities').map(String).filter(c=>anyCity(c)).slice(0,30);
    await saveUser({...user,alerts:{enabled:f.get('alertsOn')==='on',jobTypes:types,cities}});return go('/account?tab=alerts&msg=saved');
  }
  if(action==='password'){
    if(!checkUserPassword(user,String(f.get('current')||'')))return go('/account?tab=settings&msg=wrongpw');
    const pw=String(f.get('password')||'');if(passwordProblem(pw))return go('/account?tab=settings&msg=weakpw');
    await saveUser({...user,...hashPassword(pw)});return go('/account?tab=settings&msg=pwchanged');
  }
  if(action==='delete'){
    if(!checkUserPassword(user,String(f.get('current')||'')))return go('/account?tab=settings&msg=wrongpw');
    await deleteUser(user.id);const res=go('/?account=deleted');res.cookies.set(USER_COOKIE,'',{path:'/',maxAge:0});return res;
  }
  // profile (+ optional CV)
  const phone=field(f,'phone',30);if(!validPhone(phone))return go('/account?tab=profile&msg=phone');
  const next:User={...user,name:field(f,'name',100)||user.name,phone};
  if(user.role==='seeker'){
    Object.assign(next,{city:anyCity(field(f,'city'))?field(f,'city'):'',jobType:jobType(field(f,'jobType'))?field(f,'jobType'):'',experience:field(f,'experience',40),skills:stripLinks(field(f,'skills',400)),about:field(f,'about',1500)});
    const cv=f.get('cv');
    if(cv&&typeof cv!=='string'&&cv.size>0){try{next.cvFile=await saveCv(cv);next.cvName=field(f,'cvname',0)||cv.name.slice(0,120);}catch(e){return go('/account?tab=profile&msg='+((e as Error).message==='size'?'cvsize':'cvtype'));}}
    if(f.get('removeCv')==='on'){next.cvFile=null;next.cvName=null;}
  }
  await saveUser(next);
  return go('/account?tab=profile&msg=saved');
}
