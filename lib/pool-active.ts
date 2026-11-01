// "Hiring now": recruitment listings the estaff.pk team has confirmed as actively hiring,
// with a real salary range set in Admin → Jobs. Only these listings carry JobPosting schema
// (Google Jobs). They are released through the publishing queue, 3 per hour, and expire on
// their closing date unless renewed.
import fs from 'fs';
import path from 'path';

const DIR=process.env.DATA_DIR||path.join(/*turbopackIgnore: true*/ process.cwd(),'.data');
const FILE=path.join(/*turbopackIgnore: true*/ DIR,'pool-active.json');

export type Active={id:string;role:string;city:string;salaryMin:number;salaryMax:number;datePosted:string;validThrough:string;publishAt:string;announced:boolean;createdAt:string};

let cache:{mtime:number;rows:Active[]}|null=null;
export function listActive():Active[]{
  try{const st=fs.statSync(FILE);if(cache&&cache.mtime===st.mtimeMs)return cache.rows;const rows=JSON.parse(fs.readFileSync(FILE,'utf8')) as Active[];cache={mtime:st.mtimeMs,rows};return rows;}
  catch{return [];}
}
export function saveActive(rows:Active[]){fs.mkdirSync(DIR,{recursive:true});const tmp=FILE+'.'+process.pid+'.tmp';fs.writeFileSync(tmp,JSON.stringify(rows,null,1));fs.renameSync(tmp,FILE);cache=null;}
let map:{rows:Active[];byId:Map<string,Active>}|null=null;
export function getActive(id:string){const rows=listActive();if(!map||map.rows!==rows)map={rows,byId:new Map(rows.map(r=>[r.id,r]))};return map.byId.get(id)||null;}
// Live = released by the queue and not past its closing date.
export const isLive=(a:Active)=>a.publishAt<=new Date().toISOString()&&a.validThrough>=new Date().toISOString().slice(0,10);

// Publishing queue shared by real jobs and hiring-now listings: at most PER_HOUR per clock hour, 20 minutes apart.
export const PER_HOUR=3;
export function allocateSlots(n:number,taken:string[]){
  const used=new Map<string,number>();const minutes=new Set<string>();
  for(const t of taken){if(!t)continue;used.set(t.slice(0,13),(used.get(t.slice(0,13))||0)+1);minutes.add(t.slice(0,16));}
  const out:string[]=[];const t=new Date();t.setUTCSeconds(0,0);t.setUTCMinutes(Math.ceil((t.getUTCMinutes()+1)/20)*20);
  for(let guard=0;out.length<n&&guard<200000;guard++){
    const iso=t.toISOString();const h=iso.slice(0,13);
    if(!minutes.has(iso.slice(0,16))&&(used.get(h)||0)<PER_HOUR){out.push(iso);used.set(h,(used.get(h)||0)+1);minutes.add(iso.slice(0,16));}
    t.setUTCMinutes(t.getUTCMinutes()+20);
  }
  return out;
}
