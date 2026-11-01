import {denyIfNotAdmin} from '../../../../lib/admin-guard';
import {go} from '../../../../lib/http';
import {listJobs} from '../../../../lib/store';
import {poolRoles,poolId} from '../../../../lib/pool';
import {allCities} from '../../../../lib/pakistan';
import {listActive,saveActive,allocateSlots,type Active} from '../../../../lib/pool-active';
import {getSettings,saveSettings} from '../../../../lib/settings';

export const dynamic='force-dynamic';
const num=(v:FormDataEntryValue|null)=>{const n=parseInt(String(v??'').replace(/[^0-9]/g,''),10);return Number.isFinite(n)&&n>0?n:0;};
const day=(d:number)=>new Date(Date.now()+d*86400000).toISOString().slice(0,10);

// Turn recruitment listings into "hiring now" Google Jobs listings, renew them, or stop them.
export async function POST(req:Request){
  const deny=await denyIfNotAdmin();if(deny)return deny;
  const f=await req.formData();const action=String(f.get('_action')||'');
  let rows=listActive();
  if(action==='stop'){const role=String(f.get('role')||'');saveActive(rows.filter(r=>r.role!==role));return go('/admin/jobs?msg=active#hiring');}
  if(action==='renew'){const until=day(Math.min(60,num(f.get('days'))||30));saveActive(rows.map(r=>({...r,validThrough:until})));return go('/admin/jobs?msg=active#hiring');}
  if(action!=='activate')return go('/admin/jobs#hiring');
  if(f.get('confirm')!=='yes')return go('/admin/jobs?msg=confirm#hiring');
  const s=getSettings();const hidden=new Set(s.pool.hiddenCities);
  const days=Math.min(60,num(f.get('days'))||30);const until=day(days);
  const cities=f.get('allCities')==='on'?allCities.map(c=>c.slug):f.getAll('city').map(String).filter(c=>allCities.some(x=>x.slug===c));
  const salaries={...s.pool.salaries};let bad=false;const wanted:{role:string;city:string;min:number;max:number}[]=[];
  for(const r of poolRoles){
    const min=num(f.get('min-'+r.slug)),max=num(f.get('max-'+r.slug));
    if(min||max)salaries[r.slug]=[min,max];
    if(f.get('role-'+r.slug)!=='on'||s.pool.hiddenRoles.includes(r.slug))continue;
    if(!min||!max||min>max||max>5000000){bad=true;continue;}
    for(const c of r.sector==='remote'?['pakistan']:cities.filter(c=>!hidden.has(c)))wanted.push({role:r.slug,city:c,min,max});
  }
  s.pool={...s.pool,salaries};saveSettings(s);
  if(bad&&!wanted.length)return go('/admin/jobs?msg=salary#hiring');
  const byId=new Map(rows.map(r=>[r.id,r]));const fresh:typeof wanted=[];
  for(const w of wanted){const id=poolId(w.role,w.city);const ex=byId.get(id);if(ex){byId.set(id,{...ex,salaryMin:w.min,salaryMax:w.max,validThrough:until});}else fresh.push(w);}
  // Main cities first (Islamabad, Rawalpindi, Lahore, Karachi…), then the rest.
  fresh.sort((a,b)=>allCities.findIndex(c=>c.slug===a.city)-allCities.findIndex(c=>c.slug===b.city)||a.role.localeCompare(b.role));
  const jobs=await listJobs({status:'all'});
  const slots=allocateSlots(fresh.length,[...jobs.map(j=>j.publishAt||''),...rows.map(r=>r.publishAt)]);
  const created=new Date().toISOString();
  fresh.forEach((w,i)=>{const at=slots[i];byId.set(poolId(w.role,w.city),{id:poolId(w.role,w.city),role:w.role,city:w.city,salaryMin:w.min,salaryMax:w.max,datePosted:at.slice(0,10),validThrough:new Date(Date.parse(at)+days*86400000).toISOString().slice(0,10),publishAt:at,announced:false,createdAt:created} as Active);});
  rows=[...byId.values()];saveActive(rows);
  return go(`/admin/jobs?msg=active${bad?'-partial':''}#hiring`);
}
