import {revalidatePath} from 'next/cache';
import {denyIfNotAdmin} from '../../../../lib/admin-guard';
import {go} from '../../../../lib/http';
import {getSeoOverrides,saveSeoOverrides} from '../../../../lib/settings';

export const dynamic='force-dynamic';
const t=(f:FormData,k:string,max=300)=>String(f.get(k)??'').trim().slice(0,max);

// Per-page SEO overrides.
export async function POST(req:Request){
  const deny=await denyIfNotAdmin();if(deny)return deny;
  const f=await req.formData();let p=t(f,'path',200).replace(/^https?:\/\/[^/]+/,'').split(/[?#]/)[0];
  if(!p.startsWith('/')||p.startsWith('/admin')||p.startsWith('/api'))return go('/admin/seo?msg=invalid');
  if(p.length>1)p=p.replace(/\/$/,'');
  const all=getSeoOverrides();
  if(t(f,'_action')==='remove'){delete all[p];saveSeoOverrides(all);revalidatePath(p);return go('/admin/seo?msg=removed');}
  const image=t(f,'image');
  all[p]={title:t(f,'title',90),description:t(f,'description',300),noindex:f.get('noindex')==='on',image:/^(\/|https:\/\/)/.test(image)?image:''};
  saveSeoOverrides(all);revalidatePath(p);
  return go('/admin/seo?msg=added');
}
