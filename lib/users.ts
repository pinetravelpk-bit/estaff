// Website accounts: job seekers and agencies (staffing / recruitment / hiring agencies).
// Passwords are hashed with scrypt; sessions are signed, expiring cookies.
import crypto from 'crypto';
import {cookies} from 'next/headers';
import {promises as fs} from 'fs';
import path from 'path';
import {DATA_DIR,newId,now} from './store';
import {slugify} from './pakistan';

export type Role='seeker'|'agency';
export type Alerts={enabled:boolean;jobTypes:string[];cities:string[]};
export type User={id:string;role:Role;email:string;name:string;phone:string;passHash:string;salt:string;emailVerified:boolean;status:'active'|'suspended';createdAt:string;lastLogin:string;
  // Job seeker profile
  city:string;jobType:string;experience:string;skills:string;about:string;cvFile:string|null;cvName:string|null;alerts:Alerts;
};
export type Agency={userId:string;slug:string;name:string;logo:string;about:string;services:string[];cities:string[];phone:string;whatsapp:string;email:string;address:string;city:string;regNo:string;founded:string;status:'pending'|'approved'|'suspended';createdAt:string;updatedAt:string};
type Token={token:string;userId:string;kind:'verify'|'reset';expires:number};

// ---------- small file store (shared queue keeps writes in order) ----------
let queue:Promise<unknown>=Promise.resolve();
const serial=<T,>(fn:()=>Promise<T>)=>{const p=queue.then(fn,fn);queue=p.catch(()=>{});return p;};
async function read<T>(name:string):Promise<T[]>{try{return JSON.parse(await fs.readFile(path.join(/*turbopackIgnore: true*/ DATA_DIR,name),'utf8')) as T[];}catch(e){if((e as NodeJS.ErrnoException).code==='ENOENT')return [];throw e;}}
async function write<T>(name:string,rows:T[]){await fs.mkdir(DATA_DIR,{recursive:true});const f=path.join(/*turbopackIgnore: true*/ DATA_DIR,name);const tmp=f+'.'+process.pid+'.tmp';await fs.writeFile(tmp,JSON.stringify(rows,null,1));await fs.rename(tmp,f);}
const update=<T,>(name:string,fn:(rows:T[])=>T[])=>serial(async()=>{const rows=await read<T>(name);const next=fn(rows);await write(name,next);return next;});

// ---------- passwords ----------
export const hashPassword=(pw:string,salt=crypto.randomBytes(16).toString('hex'))=>({salt,passHash:crypto.scryptSync(pw,salt,64).toString('hex')});
export function checkUserPassword(u:User,pw:string){const h=crypto.scryptSync(pw,u.salt,64);const real=Buffer.from(u.passHash,'hex');return h.length===real.length&&crypto.timingSafeEqual(h,real);}
export const passwordProblem=(pw:string)=>pw.length<8?'Use at least 8 characters.':!/[A-Za-z]/.test(pw)||!/[0-9]/.test(pw)?'Use letters and at least one number.':'';
export const normEmail=(e:string)=>e.trim().toLowerCase();

// ---------- users ----------
export async function listUsers(){return (await read<User>('users.json')).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));}
export async function getUser(id:string){return (await read<User>('users.json')).find(u=>u.id===id)||null;}
export async function findUserByEmail(email:string){const e=normEmail(email);return (await read<User>('users.json')).find(u=>u.email===e)||null;}
export async function saveUser(u:User){await update<User>('users.json',rows=>{const i=rows.findIndex(r=>r.id===u.id);if(i>=0)rows[i]=u;else rows.push(u);return rows;});return u;}
export async function deleteUser(id:string){await update<User>('users.json',rows=>rows.filter(r=>r.id!==id));await update<Agency>('agencies.json',rows=>rows.filter(r=>r.userId!==id));}
export async function createUser(role:Role,email:string,name:string,phone:string,pw:string){
  const {salt,passHash}=hashPassword(pw);
  const u:User={id:newId(role==='agency'?'ag-':'js-'),role,email:normEmail(email),name,phone,passHash,salt,emailVerified:false,status:'active',createdAt:now(),lastLogin:'',city:'',jobType:'',experience:'',skills:'',about:'',cvFile:null,cvName:null,alerts:{enabled:true,jobTypes:[],cities:[]}};
  return saveUser(u);
}

// ---------- agencies ----------
export async function listAgencies(status?:Agency['status']){const rows=await read<Agency>('agencies.json');return (status?rows.filter(a=>a.status===status):rows).sort((a,b)=>a.name.localeCompare(b.name));}
export async function getAgencyByUser(userId:string){return (await read<Agency>('agencies.json')).find(a=>a.userId===userId)||null;}
export async function getAgencyBySlug(slug:string){return (await read<Agency>('agencies.json')).find(a=>a.slug===slug)||null;}
export async function saveAgency(a:Agency){await update<Agency>('agencies.json',rows=>{const i=rows.findIndex(r=>r.userId===a.userId);if(i>=0)rows[i]=a;else rows.push(a);return rows;});return a;}
export async function uniqueAgencySlug(name:string,userId:string){const base=slugify(name).slice(0,60)||'agency';const rows=await read<Agency>('agencies.json');let s=base,n=2;while(rows.some(r=>r.slug===s&&r.userId!==userId))s=base+'-'+n++;return s;}
// Agencies may not link to their own websites: strip URLs, domains and "www." from free text.
export const stripLinks=(t:string)=>t.replace(/https?:\/\/\S+/gi,'').replace(/\bwww\.\S+/gi,'').replace(/\b[a-z0-9-]+\.(com|pk|net|org|co|io|biz|info|online|site|store|xyz|me)(\.[a-z]{2})?\b\S*/gi,'').replace(/[ \t]{2,}/g,' ').trim();

// ---------- tokens (email verification, password reset) ----------
export async function makeToken(userId:string,kind:Token['kind'],hours:number){const token=crypto.randomBytes(24).toString('hex');await update<Token>('tokens.json',rows=>[...rows.filter(t=>t.expires>Date.now()&&!(t.userId===userId&&t.kind===kind)),{token,userId,kind,expires:Date.now()+hours*3600000}]);return token;}
export async function useToken(token:string,kind:Token['kind']){let found:Token|undefined;await update<Token>('tokens.json',rows=>{found=rows.find(t=>t.token===token&&t.kind===kind&&t.expires>Date.now());return rows.filter(t=>t.token!==token&&t.expires>Date.now());});return found?.userId||null;}

// ---------- sessions ----------
export const USER_COOKIE='estaff_user';
const secret=()=>process.env.USER_SECRET||(process.env.ADMIN_SECRET?process.env.ADMIN_SECRET+':users':'');
const sign=(v:string)=>crypto.createHmac('sha256',secret()).update(v).digest('hex');
export const userSessionValue=(id:string)=>{const exp=String(Date.now()+30*86400000);return `${id}.${exp}.${sign(id+'.'+exp)}`;};
export async function currentUser(){
  const v=(await cookies()).get(USER_COOKIE)?.value;if(!v||!secret())return null;
  const [id,exp,sig]=v.split('.');if(!id||!exp||!sig||Number(exp)<Date.now())return null;
  const good=sign(id+'.'+exp);if(good.length!==sig.length||!crypto.timingSafeEqual(Buffer.from(good),Buffer.from(sig)))return null;
  const u=await getUser(id);return u&&u.status==='active'?u:null;
}
// Signed one-click unsubscribe link for job alert emails.
export const unsubscribeSig=(id:string)=>sign('unsub:'+id).slice(0,32);
