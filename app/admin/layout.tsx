import type {Metadata} from 'next';
import {isAdmin} from '../../lib/auth';
import {listApplications,listEnquiries} from '../../lib/store';
import {AdminShell} from '../../components/admin-ui';
import './admin.css';

export const dynamic='force-dynamic';
export const metadata:Metadata={title:{default:'Admin',template:'%s · estaff.pk admin'},robots:{index:false,follow:false}};

export default async function AdminLayout({children}:{children:React.ReactNode}){
  if(!(await isAdmin()))return <div className="adm-plain">{children}</div>;
  const [apps,enqs]=await Promise.all([listApplications(),listEnquiries()]);
  return <AdminShell badges={{applications:apps.filter(a=>a.status==='new').length,enquiries:enqs.filter(e=>e.status==='new').length}}>{children}</AdminShell>;
}
