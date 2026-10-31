import {currentUser} from '../../../../../lib/users';
import {readCv,listApplications,listJobs} from '../../../../../lib/store';

export const dynamic='force-dynamic';
const TYPES:Record<string,string>={pdf:'application/pdf',doc:'application/msword',docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',jpg:'image/jpeg',png:'image/png'};

// A job seeker can download their own CV; an agency can download CVs sent to its own jobs.
export async function GET(_req:Request,{params}:{params:Promise<{file:string}>}){
  const u=await currentUser();const {file}=await params;const nf=new Response('Not found',{status:404});
  if(!u)return nf;
  let allowed=u.role==='seeker'&&u.cvFile===file;
  if(!allowed){const apps=await listApplications();
    if(u.role==='seeker')allowed=apps.some(a=>a.userId===u.id&&a.cvFile===file);
    else{const mine=new Set((await listJobs({status:'all'})).filter(j=>j.ownerId===u.id).map(j=>j.id));allowed=apps.some(a=>a.cvFile===file&&a.jobId!==null&&mine.has(a.jobId));}}
  if(!allowed)return nf;
  const data=await readCv(file);if(!data)return nf;
  return new Response(new Uint8Array(data),{headers:{'Content-Type':TYPES[file.split('.').pop()||'']||'application/octet-stream','Content-Disposition':`attachment; filename="${file}"`,'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
}
