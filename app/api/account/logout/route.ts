import {go} from '../../../../lib/http';
import {USER_COOKIE} from '../../../../lib/users';

export const dynamic='force-dynamic';
export async function POST(){const res=go('/account/login?msg=out');res.cookies.set(USER_COOKIE,'',{path:'/',maxAge:0});return res;}
