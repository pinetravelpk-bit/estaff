// Merges built-in articles (lib/blog.ts) with posts and edits saved in the dashboard.
import {articles as builtIn,type Article} from './blog';
import {listPosts,type Post} from './store';
import {readMinutes} from './markdown';

export type BlogEntry=Article&{image:string;body:string;builtIn:boolean;status:Post['status']};

function fromBuiltIn(a:Article,o?:Post):BlogEntry{
  return {...a,title:o?.title||a.title,description:o?.description||a.description,category:o?.category||a.category,date:o?.date||a.date,image:o?.image||'',body:o?.body||'',builtIn:true,status:o?.status||'published',readMins:o?.body?readMinutes(o.body):a.readMins};
}
function fromPost(p:Post):BlogEntry{
  return {slug:p.slug,title:p.title,description:p.description,date:p.date,category:p.category||'Guides',readMins:readMinutes(p.body),intro:p.description,sections:[],faqs:[],related:[],image:p.image,body:p.body,builtIn:false,status:p.status};
}
// includeAll: for the dashboard (drafts and hidden too). Public pages only see published entries.
export async function allArticles(includeAll=false){
  const posts=await listPosts();const bySlug=new Map(posts.map(p=>[p.slug,p]));
  const list=[...builtIn.map(a=>fromBuiltIn(a,bySlug.get(a.slug))),...posts.filter(p=>!p.builtIn).map(fromPost)];
  return (includeAll?list:list.filter(a=>a.status==='published')).sort((a,b)=>b.date.localeCompare(a.date));
}
export async function findArticle(slug:string,includeAll=false){return (await allArticles(includeAll)).find(a=>a.slug===slug)||null;}
export const builtInSlugs=()=>builtIn.map(a=>a.slug);
