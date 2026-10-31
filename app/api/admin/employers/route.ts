import {denyIfNotAdmin,backTo} from '../../../../lib/admin-guard';
import {go} from '../../../../lib/http';
import {getEmployer,saveEmployer,deleteEmployer,newId,now,type Employer} from '../../../../lib/store';

export const dynamic='force-dynamic';
const s=(f:FormData,k:string,max=200)=>String(f.get(k)??'').trim().slice(0,max);

export async function POST(req:Request){
  const deny=await denyIfNotAdmin();if(deny)return deny;
  const f=await req.formData();const id=s(f,'id');
  if(s(f,'_action')==='delete'&&id){await deleteEmployer(id);return go('/admin/employers?msg=deleted');}
  const name=s(f,'name',100),phone=s(f,'phone',30);
  if(name.length<2||!/^[+0-9 ()-]{7,20}$/.test(phone))return go('/admin/employers?msg=invalid'+(id?'&edit='+id:'&new=1'));
  const old=id?await getEmployer(id):null;
  const type=s(f,'type')==='business'?'business':'household';const st=s(f,'status') as Employer['status'];
  await saveEmployer({id:old?.id||newId('emp-'),name,company:s(f,'company',120),phone,email:s(f,'email',120),city:s(f,'city',60),type,status:['lead','active','inactive'].includes(st)?st:'lead',notes:s(f,'notes',4000),source:old?.source||'manual',createdAt:old?.createdAt||now(),updatedAt:now()});
  return backTo(f,'/admin/employers','msg=saved');
}
