import {redirect} from 'next/navigation';
import {currentUser,type Role} from './users';
import {go} from './http';

export async function requireUser(role?:Role){const u=await currentUser();if(!u)redirect('/account/login');if(role&&u.role!==role)redirect('/account');return u;}
export async function apiUser(role?:Role){const u=await currentUser();if(!u||(role&&u.role!==role))return {user:null,deny:go('/account/login')};return {user:u,deny:null};}
export const field=(f:FormData,k:string,max=200)=>String(f.get(k)??'').replace(/[\u0000-\u0008\u000b-\u001f]/g,' ').trim().slice(0,max);
export const validPhone=(p:string)=>/^[+0-9 ()-]{10,20}$/.test(p);
export const validEmail=(e:string)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
