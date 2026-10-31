import {go} from '../../../../lib/http';
import {isAdmin} from '../../../../lib/auth';
import {getJob,saveJob,deleteJob,now} from '../../../../lib/store';
import {revalidateJob} from '../../../../lib/revalidate';
import {jobFromForm} from '../../../../lib/job-form';
import {sendJobAlerts} from '../../../../lib/notify';

export const dynamic='force-dynamic';
export async function POST(req:Request){
  const back=(q:string)=>go('/admin/jobs'+(q?'?'+q.replace(/^&/,''):''));
  if(!(await isAdmin()))return go('/admin/login');
  const f=await req.formData();const action=String(f.get('_action')||'');const id=String(f.get('id')||'');
  if(action==='delete'||action==='close'||action==='open'){
    const job=await getJob(id);if(!job)return back('&msg=notfound');
    if(action==='delete')await deleteJob(id);else await saveJob({...job,status:action==='close'?'closed':'open',updatedAt:now()});
    revalidateJob(job);return back('&msg='+action);
  }
  const existing=id?await getJob(id):null;
  const job=jobFromForm(f,existing);
  if(!job)return back('&msg=invalid'+(id?'&edit='+id:'&new=1'));
  await saveJob(job);
  if(existing&&(existing.city!==job.city||existing.jobType!==job.jobType))revalidateJob(existing);
  revalidateJob(job);
  // New jobs go out to job seekers whose alerts match.
  if(!existing)await sendJobAlerts(job);
  return back('&msg='+(existing?'updated':'created'));
}
