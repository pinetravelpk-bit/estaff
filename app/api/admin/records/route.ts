import {denyIfNotAdmin,backTo} from '../../../../lib/admin-guard';
import {setApplicationStatus,setApplicationNotes,deleteApplication,setEnquiryStatus,setEnquiryNotes,deleteEnquiry,type Application,type Enquiry} from '../../../../lib/store';

export const dynamic='force-dynamic';
const APP:Application['status'][]=['new','reviewed','shortlisted','rejected'];
const ENQ:Enquiry['status'][]=['new','contacted','closed'];

// Status, notes and deletion for applications and staff requests.
export async function POST(req:Request){
  const deny=await denyIfNotAdmin();if(deny)return deny;
  const f=await req.formData();const kind=String(f.get('kind')),id=String(f.get('id')),action=String(f.get('_action')),status=String(f.get('status')),notes=String(f.get('notes')??'').slice(0,3000);
  if(kind==='application'){
    if(action==='delete'){await deleteApplication(id);return backTo(f,'/admin/applications','msg=deleted');}
    if(APP.includes(status as Application['status']))await setApplicationStatus(id,status as Application['status']);
    if(f.has('notes'))await setApplicationNotes(id,notes);
    return backTo(f,'/admin/applications','msg=saved');
  }
  if(kind==='enquiry'){
    if(action==='delete'){await deleteEnquiry(id);return backTo(f,'/admin/enquiries','msg=deleted');}
    if(ENQ.includes(status as Enquiry['status']))await setEnquiryStatus(id,status as Enquiry['status']);
    if(f.has('notes'))await setEnquiryNotes(id,notes);
    return backTo(f,'/admin/enquiries','msg=saved');
  }
  return backTo(f,'/admin');
}
