// File-based storage for jobs, job applications and staffing enquiries.
// Data lives in DATA_DIR (on the server: /var/lib/estaff), outside each release,
// so it survives deploys. Writes are serialised and written atomically.
import {promises as fs} from 'fs';
import path from 'path';
import crypto from 'crypto';

export const DATA_DIR=process.env.DATA_DIR||path.join(/*turbopackIgnore: true*/ process.cwd(),'.data');
const CV_DIR=path.join(/*turbopackIgnore: true*/ DATA_DIR,'cvs');

export type EmploymentType='FULL_TIME'|'PART_TIME'|'CONTRACTOR'|'TEMPORARY';
export type Job={ownerId?:string;id:string;title:string;jobType:string;city:string;area:string;employmentType:EmploymentType;remote:boolean;liveIn:boolean;salaryMin:number|null;salaryMax:number|null;employer:string;description:string;duties:string[];requirements:string[];benefits:string[];datePosted:string;validThrough:string;status:'open'|'closed';createdAt:string;updatedAt:string};
export type Application={userId?:string;notes?:string;id:string;jobId:string|null;jobTitle:string;name:string;phone:string;email:string;city:string;role:string;experience:string;message:string;cvFile:string|null;cvName:string|null;status:'new'|'reviewed'|'shortlisted'|'rejected';createdAt:string};
export type Enquiry={notes?:string;id:string;name:string;company:string;email:string;phone:string;role:string;city:string;area:string;schedule:string;budget:string;start:string;details:string;status:'new'|'contacted'|'closed';createdAt:string};

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

export async function setApplicationNotes(id:string,notes:string){await update<Application>('applications.json',rows=>rows.map(r=>r.id===id?{...r,notes}:r));}
export async function setEnquiryNotes(id:string,notes:string){await update<Enquiry>('enquiries.json',rows=>rows.map(r=>r.id===id?{...r,notes}:r));}
export const normPhone=(p:string)=>{const d=p.replace(/[^0-9]/g,'');return d.startsWith('92')?'0'+d.slice(2):d;};

// ---------- Employers (CRM) ----------
export type Employer={id:string;name:string;company:string;phone:string;email:string;city:string;type:'household'|'business';status:'lead'|'active'|'inactive';notes:string;source:string;createdAt:string;updatedAt:string};
export async function listEmployers(){return (await read<Employer>('employers.json')).sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt));}
export async function getEmployer(id:string){return (await read<Employer>('employers.json')).find(e=>e.id===id)||null;}
export async function saveEmployer(e:Employer){await update<Employer>('employers.json',rows=>{const i=rows.findIndex(r=>r.id===e.id);if(i>=0)rows[i]=e;else rows.push(e);return rows;});return e;}
export async function deleteEmployer(id:string){await update<Employer>('employers.json',rows=>rows.filter(r=>r.id!==id));}
// Every enquiry creates or refreshes an employer lead, matched by phone number.
export async function upsertEmployerFromEnquiry(q:Enquiry){
  await update<Employer>('employers.json',rows=>{const key=normPhone(q.phone);const i=rows.findIndex(r=>normPhone(r.phone)===key);
    if(i>=0){rows[i]={...rows[i],email:rows[i].email||q.email,company:rows[i].company||q.company,updatedAt:now()};return rows;}
    return [...rows,{id:newId('emp-'),name:q.name,company:q.company,phone:q.phone,email:q.email,city:q.city,type:q.company?'business':'household',status:'lead',notes:'',source:q.id,createdAt:now(),updatedAt:now()}];});
}

// ---------- Job seekers (candidates) ----------
export type Candidate={id:string;name:string;phone:string;email:string;city:string;role:string;experience:string;cvFile:string|null;cvName:string|null;status:'new'|'screening'|'available'|'placed'|'inactive';notes:string;applications:number;createdAt:string;updatedAt:string};
export async function listCandidates(){return (await read<Candidate>('candidates.json')).sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt));}
export async function getCandidate(id:string){return (await read<Candidate>('candidates.json')).find(c=>c.id===id)||null;}
export async function saveCandidate(c:Candidate){await update<Candidate>('candidates.json',rows=>rows.map(r=>r.id===c.id?c:r));return c;}
export async function deleteCandidate(id:string){await update<Candidate>('candidates.json',rows=>rows.filter(r=>r.id!==id));}
// Every application creates or refreshes a job-seeker profile, matched by phone number.
export async function upsertCandidateFromApplication(a:Application){
  await update<Candidate>('candidates.json',rows=>{const key=normPhone(a.phone);const i=rows.findIndex(r=>normPhone(r.phone)===key);
    if(i>=0){const c=rows[i];rows[i]={...c,name:a.name||c.name,email:a.email||c.email,city:a.city||c.city,role:a.role||c.role,experience:a.experience||c.experience,cvFile:a.cvFile||c.cvFile,cvName:a.cvName||c.cvName,applications:c.applications+1,updatedAt:now()};return rows;}
    return [...rows,{id:newId('can-'),name:a.name,phone:a.phone,email:a.email,city:a.city,role:a.role,experience:a.experience,cvFile:a.cvFile,cvName:a.cvName,status:'new',notes:'',applications:1,createdAt:now(),updatedAt:now()}];});
}

// ---------- Blog posts (new posts and edits to built-in articles) ----------
export type Post={slug:string;title:string;description:string;category:string;date:string;image:string;body:string;status:'published'|'draft'|'hidden';builtIn:boolean;updatedAt:string};
export async function listPosts(){return read<Post>('posts.json');}
export async function getPost(slug:string){return (await read<Post>('posts.json')).find(p=>p.slug===slug)||null;}
export async function savePost(p:Post,oldSlug?:string){await update<Post>('posts.json',rows=>{const key=oldSlug||p.slug;const i=rows.findIndex(r=>r.slug===key);if(i>=0)rows[i]=p;else rows.push(p);return rows;});return p;}
export async function deletePost(slug:string){await update<Post>('posts.json',rows=>rows.filter(r=>r.slug!==slug));}

// ---------- Media library ----------
export type Media={file:string;name:string;alt:string;size:number;type:string;createdAt:string};
const MEDIA_DIR=path.join(/*turbopackIgnore: true*/ DATA_DIR,'media');
const MEDIA_RE=/^img-[a-f0-9]{8}\.(jpg|png|webp|gif)$/;
export const MEDIA_TYPES:Record<string,string>={'image/jpeg':'.jpg','image/png':'.png','image/webp':'.webp','image/gif':'.gif'};
export async function listMedia(){return (await read<Media>('media.json')).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));}
export async function addMedia(file:File,alt:string){const ext=MEDIA_TYPES[file.type];if(!ext)throw new Error('type');if(file.size>5*1024*1024)throw new Error('size');await fs.mkdir(MEDIA_DIR,{recursive:true});const name=newId('img-')+ext;await fs.writeFile(path.join(/*turbopackIgnore: true*/ MEDIA_DIR,name),Buffer.from(await file.arrayBuffer()));const m:Media={file:name,name:file.name.slice(0,120),alt:alt.slice(0,200),size:file.size,type:file.type,createdAt:now()};await update<Media>('media.json',rows=>[...rows,m]);return m;}
export async function updateMediaAlt(file:string,alt:string){await update<Media>('media.json',rows=>rows.map(r=>r.file===file?{...r,alt:alt.slice(0,200)}:r));}
export async function deleteMedia(file:string){await update<Media>('media.json',rows=>rows.filter(r=>r.file!==file));if(MEDIA_RE.test(file))await fs.rm(path.join(/*turbopackIgnore: true*/ MEDIA_DIR,file),{force:true});}
export async function readMedia(file:string){if(!MEDIA_RE.test(file))return null;try{return await fs.readFile(path.join(/*turbopackIgnore: true*/ MEDIA_DIR,file));}catch{return null;}}
