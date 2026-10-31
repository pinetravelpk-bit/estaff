import {revalidatePath} from 'next/cache';
import {denyIfNotAdmin} from '../../../../lib/admin-guard';
import {go} from '../../../../lib/http';
import {savePost,deletePost,getPost,type Post} from '../../../../lib/store';
import {builtInSlugs,allArticles} from '../../../../lib/blog-store';
import {slugify} from '../../../../lib/pakistan';
import {pingIndexNow} from '../../../../lib/indexnow';

export const dynamic='force-dynamic';
const s=(f:FormData,k:string,max=300)=>String(f.get(k)??'').trim().slice(0,max);
const refresh=(...slugs:string[])=>{revalidatePath('/blog');revalidatePath('/sitemap.xml');for(const x of slugs)if(x)revalidatePath('/blog/'+x);void pingIndexNow(['/blog',...slugs.filter(Boolean).map(x=>'/blog/'+x)]);};

export async function POST(req:Request){
  const deny=await denyIfNotAdmin();if(deny)return deny;
  const f=await req.formData();const action=s(f,'_action');const oldSlug=s(f,'oldSlug',120);
  const builtIn=builtInSlugs().includes(oldSlug);
  if(action==='delete'&&oldSlug&&!builtIn){await deletePost(oldSlug);refresh(oldSlug);return go('/admin/blog?msg=deleted');}
  if(action==='reset'&&builtIn){await deletePost(oldSlug);refresh(oldSlug);return go('/admin/blog?msg=reset');}
  const title=s(f,'title',140),description=s(f,'description',300),body=s(f,'body',60000);
  const slug=builtIn?oldSlug:(slugify(s(f,'slug',120)||title).slice(0,90));
  const back='/admin/blog?'+(oldSlug?'edit='+oldSlug:'new=1');
  if(title.length<5||description.length<50||(!builtIn&&body.length<50)||!slug)return go(back+'&msg=invalid');
  if(slug!==oldSlug&&((await allArticles(true)).some(a=>a.slug===slug)))return go(back+'&msg=exists');
  const st=s(f,'status') as Post['status'];
  const date=/^\d{4}-\d{2}-\d{2}$/.test(s(f,'date'))?s(f,'date'):new Date().toISOString().slice(0,10);
  const image=s(f,'image',300);const safeImage=/^(\/|https:\/\/)/.test(image)?image:'';
  const existing=oldSlug?await getPost(oldSlug):null;
  await savePost({slug,title,description,category:s(f,'category',60)||'Guides',date,image:safeImage,body,status:['published','draft','hidden'].includes(st)?st:'published',builtIn,updatedAt:new Date().toISOString()},existing?oldSlug:undefined);
  refresh(slug,oldSlug);
  return go('/admin/blog?edit='+slug+'&msg=saved');
}
