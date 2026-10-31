import {revalidatePath} from 'next/cache';
import {go} from '../../../../lib/http';
import {apiUser,field} from '../../../../lib/account-guard';
import {getAgencyByUser} from '../../../../lib/users';
import {getJob,saveJob,deleteJob,now} from '../../../../lib/store';
import {jobFromForm} from '../../../../lib/job-form';
import {revalidateJob} from '../../../../lib/revalidate';
import {sendJobAlerts} from '../../../../lib/notify';

export const dynamic='force-dynamic';
// Agencies manage only their own jobs, and only once the agency is approved.
export async function POST(req:Request){
  const {user,deny}=await apiUser('agency');if(deny)return deny;
  const ag=await getAgencyByUser(user.id);if(!ag||ag.status!=='approved')return go('/account?tab=jobs&msg=notapproved');
  const f=await req.formData();const action=field(f,'_action');const id=field(f,'id',120);
  const existing=id?await getJob(id):null;
  if(existing&&existing.ownerId!==user.id)return go('/account?tab=jobs');
  const refresh=()=>{revalidatePath('/agencies/'+ag.slug);};
  if(existing&&['close','open','delete'].includes(action)){
    if(action==='delete')await deleteJob(existing.id);else await saveJob({...existing,status:action==='close'?'closed':'open',updatedAt:now()});
    revalidateJob(existing);refresh();return go('/account?tab=jobs&msg='+action);
  }
  const job=jobFromForm(f,existing,{ownerId:user.id,employer:ag.name});
  if(!job)return go('/account?tab=jobs&msg=invalid'+(id?'&edit='+id:'&new=1'));
  await saveJob(job);revalidateJob(job);refresh();
  if(!existing)await sendJobAlerts(job);
  return go('/account?tab=jobs&msg='+(existing?'updated':'created'));
}
