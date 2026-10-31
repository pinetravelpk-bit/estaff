import {AdminDashboard} from '../../components/admin-dashboard';
import {pageMetadata} from '../../lib/seo';
export const metadata={...pageMetadata('Admin workspace','Private administrative workspace demonstration for estaff.pk.','/admin',false),robots:{index:false,follow:false}};
export default function AdminPage(){return <AdminDashboard/>}
