import {denyIfNotAdmin} from '../../../../lib/admin-guard';
import {go} from '../../../../lib/http';
import {getCandidate,saveCandidate,deleteCandidate,now,type Candidate} from '../../../../lib/store';

export const dynamic='force-dynamic';
const s=(f:FormData,k:string,max=200)=>String(f.get(k)??'').trim().slice(0,max);
const ST:Candidate['status'][]=['new','screening','available','placed','inactive'];

export async function POST(req:Request){
  const deny=await denyIfNotAdmin();if(deny)return deny;
  const f=await req.formData();const id=s(f,'id');const c=await getCandidate(id);
  if(!c)return go('/admin/candidates');
  if(s(f,'_action')==='delete'){await deleteCandidate(id);return go('/admin/candidates?msg=deleted');}
  const st=s(f,'status') as Candidate['status'];
  await saveCandidate({...c,name:s(f,'name',100)||c.name,city:s(f,'city',60),role:s(f,'role',80),status:ST.includes(st)?st:c.status,notes:s(f,'notes',4000),updatedAt:now()});
  return go('/admin/candidates?view='+id+'&msg=saved');
}
