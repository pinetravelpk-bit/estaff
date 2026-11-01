import {revalidatePath} from 'next/cache';
import {denyIfNotAdmin,backTo} from '../../../../lib/admin-guard';
import {getReview,setReview,deleteReview,type Review} from '../../../../lib/reviews';
import {getAgencyByUser} from '../../../../lib/users';
import {now} from '../../../../lib/store';

export const dynamic='force-dynamic';
const STATUSES:Review['status'][]=['pending','approved','rejected'];

// Approve, reject, reply to or delete a review, then refresh the pages that show it.
export async function POST(req:Request){
  const deny=await denyIfNotAdmin();if(deny)return deny;
  const f=await req.formData();const id=String(f.get('id')||'');const action=String(f.get('_action')||'save');
  const r=await getReview(id);if(!r)return backTo(f,'/admin/reviews');
  if(action==='delete')await deleteReview(id);
  else{
    const status=action==='approve'?'approved':String(f.get('status'));const reply=String(f.get('reply')??'').trim().slice(0,1500);
    await setReview(id,{...(STATUSES.includes(status as Review['status'])?{status:status as Review['status']}:{}),reply,replyAt:reply&&reply!==r.reply?now():r.replyAt});
  }
  revalidatePath('/reviews');revalidatePath('/agencies');
  if(r.target==='agency'){const a=await getAgencyByUser(r.agencyId);if(a)revalidatePath('/agencies/'+a.slug);}
  return backTo(f,'/admin/reviews',action==='delete'?'msg=deleted':'msg=saved');
}
