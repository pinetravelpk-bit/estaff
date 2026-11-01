import {go} from '../../../../lib/http';
import {isAdmin} from '../../../../lib/auth';
import {getJob,saveJob,deleteJob,now,nextQueueSlot} from '../../../../lib/store';
import {revalidateJob} from '../../../../lib/revalidate';
import {jobFromForm} from '../../../../lib/job-form';
import {sendJobAlerts} from '../../../../lib/notify';

export const dynamic='force-dynamic';
export async function POST(req:Request){
  const back=(q:string)=>go('/admin/jobs'+(q?'?'+q.replace(/^&/,''):''));
  if(!(await isAdmin()))return go('/admin/login');
  const f=await req.formData();const action=String(f.get('_action')||'');const id=String(f.get('id')||'');
  if(action==='approve'||action==='queue'||action==='reject'){
    const job=await getJob(id);if(!job)return back('&msg=notfound');
    if(action==='reject'){await deleteJob(id);return back('&msg=rejected');}
    const at=action==='queue'?await nextQueueSlot():'';
    const live={...job,status:'open' as const,datePosted:(at||now()).slice(0,10),updatedAt:now(),...(at?{publishAt:at,announced:false}:{publishAt:undefined,announced:true})};
    await saveJob(live);revalidateJob(live);if(!at)await sendJobAlerts(live);
    return back('&msg='+(at?'queued':'approved'));
  }
  if(action==='delete'||action==='close'||action==='open'){
    const job=await getJob(id);if(!job)return back('&msg=notfound');
    if(action==='delete')await deleteJob(id);else await saveJob({...job,status:action==='close'?'closed':'open',updatedAt:now()});
    revalidateJob(job);return back('&msg='+action);
  }
  const existing=id?await getJob(id):null;
  const queued=!existing&&f.get('queue')==='on'?await nextQueueSlot():'';
  const job=jobFromForm(f,existing,queued?{publishAt:queued,announced:false,datePosted:queued.slice(0,10)}:existing?{}:{announced:true});
  if(!job)return back('&msg=invalid'+(id?'&edit='+id:'&new=1'));
  await saveJob(job);
  if(existing&&(existing.city!==job.city||existing.jobType!==job.jobType))revalidateJob(existing);
  revalidateJob(job);
  // New jobs go out to job seekers whose alerts match.
  if(!existing&&!queued)await sendJobAlerts(job);
  return back('&msg='+(existing?'updated':queued?'queued':'created'));
}
