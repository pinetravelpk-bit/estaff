import {revalidatePath} from 'next/cache';
import {go} from '../../../../lib/http';
import {apiUser,field,validEmail,validPhone} from '../../../../lib/account-guard';
import {getAgencyByUser,saveAgency,uniqueAgencySlug,stripLinks} from '../../../../lib/users';
import {addMedia,now} from '../../../../lib/store';
import {anyCity} from '../../../../lib/pakistan';
import {cityServices} from '../../../../lib/service-city';

export const dynamic='force-dynamic';
const SERVICES=new Set(['domestic-staff',...cityServices.map(s=>s.slug)]);

// Agency profile. No website field, and any links typed into the text are removed.
export async function POST(req:Request){
  const {user,deny}=await apiUser('agency');if(deny)return deny;
  const a=await getAgencyByUser(user.id);if(!a)return go('/account');
  const f=await req.formData();
  const name=stripLinks(field(f,'name',120));const phone=field(f,'phone',30);const email=field(f,'email',120).toLowerCase();const wa=field(f,'whatsapp',30);
  if(name.length<3)return go('/account?tab=profile&msg=agencyname');
  if(!validPhone(phone)||(wa&&!validPhone(wa)))return go('/account?tab=profile&msg=phone');
  if(!validEmail(email))return go('/account?tab=profile&msg=email');
  let logo=a.logo;const file=f.get('logo');
  if(file&&typeof file!=='string'&&file.size>0){if(file.size>2*1024*1024)return go('/account?tab=profile&msg=logosize');try{logo='/media/'+(await addMedia(file,'Logo: '+name)).file;}catch{return go('/account?tab=profile&msg=logotype');}}
  if(f.get('removeLogo')==='on')logo='';
  const next={...a,name,slug:a.status==='approved'?a.slug:await uniqueAgencySlug(name,user.id),logo,about:stripLinks(field(f,'about',3000)),phone,whatsapp:wa,email,address:stripLinks(field(f,'address',200)),city:anyCity(field(f,'city'))?field(f,'city'):'',regNo:field(f,'regNo',60),founded:/^\d{4}$/.test(field(f,'founded'))?field(f,'founded'):'',services:f.getAll('services').map(String).filter(x=>SERVICES.has(x)),cities:f.getAll('cities').map(String).filter(c=>anyCity(c)).slice(0,40),updatedAt:now()};
  await saveAgency(next);
  if(next.status==='approved'){revalidatePath('/agencies');revalidatePath('/agencies/'+next.slug);}
  return go('/account?tab=profile&msg=saved');
}
