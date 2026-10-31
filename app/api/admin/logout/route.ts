import {go} from '../../../../lib/http';
import {COOKIE} from '../../../../lib/auth';

export const dynamic='force-dynamic';
export async function POST(){const res=go('/admin/login');res.cookies.set(COOKIE,'',{path:'/',maxAge:0});return res;}
