// Admin login: one password (ADMIN_PASSWORD) and a signing secret (ADMIN_SECRET),
// both set in the server environment file. The session is a signed, expiring cookie.
import crypto from 'crypto';
import {cookies} from 'next/headers';

export const COOKIE='estaff_admin';
const DAY=24*60*60*1000;
const secret=()=>process.env.ADMIN_SECRET||'';
const sign=(v:string)=>crypto.createHmac('sha256',secret()).update(v).digest('hex');
const safeEqual=(a:string,b:string)=>{const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&crypto.timingSafeEqual(x,y);};

export const adminConfigured=()=>Boolean(process.env.ADMIN_PASSWORD&&secret().length>=32);
export function checkPassword(p:string){const real=process.env.ADMIN_PASSWORD||'';return adminConfigured()&&safeEqual(sign('pw:'+p),sign('pw:'+real));}
export function sessionValue(){const exp=String(Date.now()+7*DAY);return exp+'.'+sign('session:'+exp);}
export function validSession(v:string|undefined){if(!v||!adminConfigured())return false;const [exp,sig]=v.split('.');if(!exp||!sig||Number(exp)<Date.now())return false;return safeEqual(sig,sign('session:'+exp));}
export async function isAdmin(){return validSession((await cookies()).get(COOKIE)?.value);}

// Simple in-memory rate limiter (per IP and bucket).
const hits=new Map<string,number[]>();
export function rateLimited(key:string,max:number,windowMs:number){const t=Date.now();const list=(hits.get(key)||[]).filter(x=>t-x<windowMs);list.push(t);hits.set(key,list);if(hits.size>5000)hits.clear();return list.length>max;}
export const clientIp=(req:Request)=>req.headers.get('x-real-ip')||req.headers.get('x-forwarded-for')?.split(',')[0].trim()||'local';
