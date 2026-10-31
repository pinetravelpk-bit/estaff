import {NextResponse} from 'next/server';
import {go} from '../../../../lib/http';
import {isAdmin} from '../../../../lib/auth';
import {setApplicationStatus,deleteApplication,setEnquiryStatus,deleteEnquiry,type Application,type Enquiry} from '../../../../lib/store';

export const dynamic='force-dynamic';
const APP:Application['status'][]=['new','reviewed','shortlisted','rejected'];
const ENQ:Enquiry['status'][]=['new','contacted','closed'];

// Status changes and deletions for applications and enquiries.
export async function POST(req:Request){
  if(!(await isAdmin()))return go('/admin');
  const f=await req.formData();const kind=String(f.get('kind')),id=String(f.get('id')),action=String(f.get('_action')),status=String(f.get('status'));
  if(kind==='application'){if(action==='delete')await deleteApplication(id);else if(APP.includes(status as Application['status']))await setApplicationStatus(id,status as Application['status']);return go('/admin?tab=applications');}
  if(kind==='enquiry'){if(action==='delete')await deleteEnquiry(id);else if(ENQ.includes(status as Enquiry['status']))await setEnquiryStatus(id,status as Enquiry['status']);return go('/admin?tab=enquiries');}
  return go('/admin');
}
