import {go} from '../../../../lib/http';
import {apiUser,field} from '../../../../lib/account-guard';
import {listApplications,getJob,setApplicationStatus,type Application} from '../../../../lib/store';
import {sendApplicationStatus} from '../../../../lib/notify';

export const dynamic='force-dynamic';
const ST:Application['status'][]=['reviewed','shortlisted','rejected'];
// Agencies update the status of applications to their own jobs; the applicant gets an email.
export async function POST(req:Request){
  const {user,deny}=await apiUser('agency');if(deny)return deny;
  const f=await req.formData();const id=field(f,'id',80);const status=field(f,'status') as Application['status'];
  const a=(await listApplications()).find(x=>x.id===id);
  const job=a?.jobId?await getJob(a.jobId):null;
  if(!a||!job||job.ownerId!==user.id||!ST.includes(status))return go('/account?tab=applicants');
  if(a.status!==status){await setApplicationStatus(a.id,status);await sendApplicationStatus(a,status);}
  return go('/account?tab=applicants&msg=saved');
}
