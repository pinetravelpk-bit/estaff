import {revalidatePath} from 'next/cache';
import {denyIfNotAdmin,backTo} from '../../../../lib/admin-guard';
import {deleteAgencyReviews} from '../../../../lib/reviews';
import {getUser,saveUser,deleteUser,getAgencyByUser,saveAgency} from '../../../../lib/users';
import {listJobs,saveJob,now} from '../../../../lib/store';
import {revalidateJob} from '../../../../lib/revalidate';
import {sendAgencyApproved} from '../../../../lib/notify';
import {pingIndexNow} from '../../../../lib/indexnow';

export const dynamic='force-dynamic';
// Approve / suspend / delete agencies and job seeker accounts.
export async function POST(req:Request){
  const deny=await denyIfNotAdmin();if(deny)return deny;
  const f=await req.formData();const id=String(f.get('id')||'');const action=String(f.get('_action')||'');
  const u=await getUser(id);if(!u)return backTo(f,'/admin/accounts');
  const ag=u.role==='agency'?await getAgencyByUser(id):null;
  const refreshAgency=()=>{revalidatePath('/agencies');if(ag)revalidatePath('/agencies/'+ag.slug);revalidatePath('/sitemap.xml');void pingIndexNow(['/agencies',...(ag?['/agencies/'+ag.slug]:[])]);};
  // An agency's jobs only stay open while the agency is approved.
  const closeAgencyJobs=async()=>{for(const j of (await listJobs({status:'all'})).filter(j=>j.ownerId===id&&j.status==='open')){await saveJob({...j,status:'closed',updatedAt:now()});revalidateJob(j);}};
  if(action==='verify'){await saveUser({...u,emailVerified:true});return backTo(f,'/admin/accounts','msg=verified');}
  if(action==='approve'&&ag){await saveAgency({...ag,status:'approved',updatedAt:now()});if(u.status!=='active')await saveUser({...u,status:'active'});refreshAgency();await sendAgencyApproved(ag.email||u.email,ag.name,ag.slug);return backTo(f,'/admin/accounts','msg=approved');}
  if(action==='suspend'){await saveUser({...u,status:'suspended'});if(ag){await saveAgency({...ag,status:'suspended',updatedAt:now()});await closeAgencyJobs();refreshAgency();}return backTo(f,'/admin/accounts','msg=suspended');}
  if(action==='activate'){await saveUser({...u,status:'active'});return backTo(f,'/admin/accounts','msg=activated');}
  if(action==='delete'){if(ag){await closeAgencyJobs();await deleteAgencyReviews(id);}await deleteUser(id);refreshAgency();return backTo(f,'/admin/accounts','msg=deleted');}
  return backTo(f,'/admin/accounts');
}
