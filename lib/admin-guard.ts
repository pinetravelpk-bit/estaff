import {redirect} from 'next/navigation';
import {revalidatePath} from 'next/cache';
import {isAdmin} from './auth';
import {go} from './http';

// Every dashboard page calls this; it sends signed-out visitors to the login page.
export async function requireAdmin(){if(!(await isAdmin()))redirect('/admin/login');}

// For dashboard form posts: returns a redirect response when not signed in.
export async function denyIfNotAdmin(){return (await isAdmin())?null:go('/admin/login');}

// Only allow redirects back into the dashboard.
export function backTo(f:FormData,fallback:string,extra=''){const b=String(f.get('_back')||'');const base=b.startsWith('/admin')&&!b.startsWith('//')?b:fallback;return go(base+(extra?(base.includes('?')?'&':'?')+extra:''));}

// Settings, contact details and SEO appear on every page, so refresh them all.
export function refreshWholeSite(){revalidatePath('/','layout');}
