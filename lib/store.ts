// File-based storage for jobs, job applications and staffing enquiries.
// Data lives in DATA_DIR (on the server: /var/lib/estaff), outside each release,
// so it survives deploys. Writes are serialised and written atomically.
import {promises as fs} from 'fs';
import path from 'path';
import crypto from 'crypto';

export const DATA_DIR=process.env.DATA_DIR||path.join(/*turbopackIgnore: true*/ process.cwd(),'.data');
const CV_DIR=path.join(/*turbopackIgnore: true*/ DATA_DIR,'cvs');

export type EmploymentType='FULL_TIME'|'PART_TIME'|'CONTRACTOR'|'TEMPORARY';
export type Job={id:string;title:string;jobType:string;city:string;area:string;employmentType:EmploymentType;remote:boolean;liveIn:boolean;salaryMin:number|null;salaryMax:number|null;employer:string;description:string;duties:string[];requirements:string[];benefits:string[];datePosted:string;validThrough:string;status:'open'|'closed';createdAt:string;updatedAt:string};
export type Application={id:string;jobId:string|null;jobTitle:string;name:string;phone:string;email:string;city:string;role:string;experience:string;message:string;cvFile:string|null;cvName:string|null;status:'new'|'reviewed'|'shortlisted'|'rejected';createdAt:string};
export type Enquiry={id:string;name:string;company:string;email:string;phone:string;role:string;city:string;area:string;schedule:string;budget:string;start:string;details:string;status:'new'|'contacted'|'closed';createdAt:string};

let queue:Promise<unknown>=Promise.resolve();
const serial=<T,>(fn:()=>Promise<T>)=>{const p=queue.then(fn,fn);queue=p.catch(()=>{});return p;};

async function read<T>(name:string):Promise<T[]>{try{return JSON.parse(await fs.readFile(path.join(/*turbopackIgnore: true*/ DATA_DIR,name),'utf8')) as T[];}catch(e){if((e as NodeJS.ErrnoException).code==='ENOENT')return [];throw e;}}
async function write<T>(name:string,rows:T[]){await fs.mkdir(DATA_DIR,{recursive:true});const file=path.join(/*turbopackIgnore: true*/ DATA_DIR,name);const tmp=file+'.'+process.pid+'.tmp';await fs.writeFile(tmp,JSON.stringify(rows,null,1));await fs.rename(tmp,file);}
const update=<T,>(name:string,fn:(rows:T[])=>T[])=>serial(async()=>{const rows=await read<T>(name);const next=fn(rows);await write(name,next);return next;});

export const newId=(prefix='')=>prefix+crypto.randomBytes(4).toString('hex');
export const now=()=>new Date().toISOString();

// ---------- Jobs ----------
export async function listJobs(filter:{status?:'open'|'closed'|'all';city?:string;jobType?:string}={}){
  const today=new Date().toISOString().slice(0,10);
  let rows=await read<Job>('jobs.json');
  if((filter.status||'open')==='open')rows=rows.filter(j=>j.status==='open'&&j.validThrough>=today);
  else if(filter.status==='closed')rows=rows.filter(j=>j.status==='closed'||j.validThrough<today);
  if(filter.city)rows=rows.filter(j=>j.city===filter.city);
  if(filter.jobType)rows=rows.filter(j=>j.jobType===filter.jobType);
  return rows.sort((a,b)=>b.datePosted.localeCompare(a.datePosted));
}
export async function getJob(id:string){return (await read<Job>('jobs.json')).find(j=>j.id===id)||null;}
export const isJobOpen=(j:Job)=>j.status==='open'&&j.validThrough>=new Date().toISOString().slice(0,10);
export async function saveJob(job:Job){await update<Job>('jobs.json',rows=>{const i=rows.findIndex(r=>r.id===job.id);if(i>=0)rows[i]=job;else rows.push(job);return rows;});return job;}
export async function deleteJob(id:string){await update<Job>('jobs.json',rows=>rows.filter(r=>r.id!==id));}

// ---------- Applications ----------
export async function listApplications(){return (await read<Application>('applications.json')).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));}
export async function addApplication(a:Application){await update<Application>('applications.json',rows=>[...rows,a]);return a;}
export async function setApplicationStatus(id:string,status:Application['status']){await update<Application>('applications.json',rows=>rows.map(r=>r.id===id?{...r,status}:r));}
export async function deleteApplication(id:string){let file:string|null=null;await update<Application>('applications.json',rows=>{file=rows.find(r=>r.id===id)?.cvFile||null;return rows.filter(r=>r.id!==id);});if(file)await fs.rm(path.join(/*turbopackIgnore: true*/ CV_DIR,file),{force:true});}

// ---------- Enquiries ----------
export async function listEnquiries(){return (await read<Enquiry>('enquiries.json')).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));}
export async function addEnquiry(e:Enquiry){await update<Enquiry>('enquiries.json',rows=>[...rows,e]);return e;}
export async function setEnquiryStatus(id:string,status:Enquiry['status']){await update<Enquiry>('enquiries.json',rows=>rows.map(r=>r.id===id?{...r,status}:r));}
export async function deleteEnquiry(id:string){await update<Enquiry>('enquiries.json',rows=>rows.filter(r=>r.id!==id));}

// ---------- CV files ----------
export const CV_TYPES:Record<string,string>={'application/pdf':'.pdf','application/msword':'.doc','application/vnd.openxmlformats-officedocument.wordprocessingml.document':'.docx','image/jpeg':'.jpg','image/png':'.png'};
export const CV_MAX=5*1024*1024;
export async function saveCv(file:File){const ext=CV_TYPES[file.type];if(!ext)throw new Error('type');if(file.size>CV_MAX)throw new Error('size');await fs.mkdir(CV_DIR,{recursive:true});const name=newId('cv-')+ext;await fs.writeFile(path.join(/*turbopackIgnore: true*/ CV_DIR,name),Buffer.from(await file.arrayBuffer()));return name;}
export async function readCv(name:string){if(!/^cv-[a-f0-9]{8}\.(pdf|docx?|jpg|png)$/.test(name))return null;try{return await fs.readFile(path.join(/*turbopackIgnore: true*/ CV_DIR,name));}catch{return null;}}
