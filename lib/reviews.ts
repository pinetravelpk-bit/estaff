// Reviews of estaff.pk and of agencies in the directory. Every review is held for
// moderation and only appears on the website after the team approves it.
import {promises as fs} from 'fs';
import path from 'path';
import {DATA_DIR,newId,now} from './store';

export type Review={id:string;target:'estaff'|'agency';agencyId:string;name:string;email:string;city:string;kind:'employer'|'job-seeker'|'other';rating:number;title:string;text:string;userId:string;status:'pending'|'approved'|'rejected';reply:string;replyAt:string;createdAt:string};
export const KIND_LABEL:Record<Review['kind'],string>={employer:'Employer / family','job-seeker':'Job seeker',other:'Other'};

const FILE='reviews.json';
let queue:Promise<unknown>=Promise.resolve();
const serial=<T,>(fn:()=>Promise<T>)=>{const p=queue.then(fn,fn);queue=p.catch(()=>{});return p;};
async function read():Promise<Review[]>{try{return JSON.parse(await fs.readFile(path.join(/*turbopackIgnore: true*/ DATA_DIR,FILE),'utf8')) as Review[];}catch(e){if((e as NodeJS.ErrnoException).code==='ENOENT')return [];throw e;}}
async function write(rows:Review[]){await fs.mkdir(DATA_DIR,{recursive:true});const f=path.join(/*turbopackIgnore: true*/ DATA_DIR,FILE);const tmp=f+'.'+process.pid+'.tmp';await fs.writeFile(tmp,JSON.stringify(rows,null,1));await fs.rename(tmp,f);}
const update=(fn:(rows:Review[])=>Review[])=>serial(async()=>{const next=fn(await read());await write(next);return next;});

export async function listReviews(f:{status?:Review['status'];target?:Review['target'];agencyId?:string}={}){
  let rows=await read();
  if(f.status)rows=rows.filter(r=>r.status===f.status);
  if(f.target)rows=rows.filter(r=>r.target===f.target);
  if(f.agencyId)rows=rows.filter(r=>r.agencyId===f.agencyId);
  return rows.sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
}
export async function getReview(id:string){return (await read()).find(r=>r.id===id)||null;}
export async function addReview(r:Omit<Review,'id'|'status'|'reply'|'replyAt'|'createdAt'>){
  const row:Review={...r,id:newId('rev-'),status:'pending',reply:'',replyAt:'',createdAt:now()};
  await update(rows=>[...rows,row]);return row;
}
export async function setReview(id:string,patch:Partial<Pick<Review,'status'|'reply'|'replyAt'>>){await update(rows=>rows.map(r=>r.id===id?{...r,...patch}:r));}
export async function deleteReview(id:string){await update(rows=>rows.filter(r=>r.id!==id));}
export async function deleteAgencyReviews(agencyId:string){await update(rows=>rows.filter(r=>r.agencyId!==agencyId));}

export function summary(rows:Review[]){const n=rows.length;const avg=n?rows.reduce((s,r)=>s+r.rating,0)/n:0;const dist=[5,4,3,2,1].map(s=>({stars:s,count:rows.filter(r=>r.rating===s).length}));return {count:n,average:Math.round(avg*10)/10,dist};}
// "Ayesha Khan" → "Ayesha K." so reviewers' full names are not published.
export const publicName=(n:string)=>{const p=n.trim().split(/\s+/);return p.length>1?`${p[0]} ${p[p.length-1][0].toUpperCase()}.`:p[0];};
