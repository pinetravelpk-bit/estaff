import Link from 'next/link';
import {Plus} from 'lucide-react';
import {requireAdmin} from '../../../lib/admin-guard';
import {allArticles,findArticle,type BlogEntry} from '../../../lib/blog-store';
import {listMedia} from '../../../lib/store';
import {PageHead,Flash,Pill,Empty,fmtDay} from '../../../components/admin-ui';
import {MediaPicker} from '../../../components/media-picker';

export const metadata={title:'Blog'};
const MSG={saved:'Post saved.',deleted:'Post deleted.',reset:'Article restored to its original text.',invalid:'Please add a title, a description of at least 50 characters and, for new posts, some content.',exists:'Another post already uses that web address. Choose a different one.'};

function Editor({a,media}:{a:BlogEntry|null;media:Awaited<ReturnType<typeof listMedia>>}){
  const isNew=!a;const builtIn=a?.builtIn;
  return <form className="adm-card adm-form" method="post" action="/api/admin/posts">
    <input type="hidden" name="oldSlug" value={a?.slug||''}/><input type="hidden" name="builtIn" value={builtIn?'1':''}/>
    <header><h2>{isNew?'Write a new post':builtIn?'Edit built-in article':'Edit post'}</h2><Link href="/admin/blog">Cancel</Link></header>
    {builtIn&&<p className="adm-note">This article came with the website. You can change its title, description, category, date, cover image and visibility. If you write new content below, it replaces the original sections; leave it empty to keep them.</p>}
    <div className="adm-grid">
      <label className="span3">Title<input name="title" required defaultValue={a?.title} maxLength={140}/></label>
      <label>Status<select name="status" defaultValue={a?.status||'published'}><option value="published">Published</option><option value="draft">Draft</option><option value="hidden">Hidden</option></select></label>
      <label className="span2">Web address<div className="adm-prefix"><span>/blog/</span><input name="slug" defaultValue={a?.slug} readOnly={builtIn} placeholder="Leave empty to create from title" pattern="[a-z0-9-]*"/></div></label>
      <label>Category<input name="category" defaultValue={a?.category||'Guides'} list="cats"/></label>
      <label>Date<input type="date" name="date" defaultValue={a?.date||new Date().toISOString().slice(0,10)}/></label>
      <label className="span4">Description (shown on Google and the blog list, 50–170 characters)<textarea name="description" rows={2} required defaultValue={a?.description} maxLength={300}/></label>
      <label className="span4">Cover image<div className="adm-imgfield"><input id="post-image" name="image" defaultValue={a?.image} placeholder="/media/… or leave empty"/><MediaPicker media={media} target="#post-image" preview="#post-image-prev"/></div><img id="post-image-prev" className="adm-thumb" src={a?.image||''} alt="" hidden={!a?.image}/></label>
      <label className="span4">Content<span className="adm-help">Use <code>## Heading</code>, <code>### Sub-heading</code>, <code>- list item</code>, <code>**bold**</code>, <code>[link text](/jobs)</code>. Leave an empty line between paragraphs.</span><textarea id="post-body" name="body" rows={18} defaultValue={a?.body} className="adm-mono"/></label>
      <div className="span4"><MediaPicker media={media} target="#post-body" insert label="Insert image into content"/></div>
    </div>
    <datalist id="cats">{['Household hiring','Recruitment','HR','Payroll','Staff screening','Remote teams','Careers','Guides','News'].map(c=><option key={c} value={c}/>)}</datalist>
    <footer><button className="adm-btn primary" name="_action" value="save">{isNew?'Publish':'Save changes'}</button>
      {a&&!builtIn&&<button className="adm-btn danger" name="_action" value="delete" data-confirm="Delete this post permanently?">Delete</button>}
      {a&&builtIn&&<button className="adm-btn" name="_action" value="reset" data-confirm="Undo all your edits to this article?">Restore original</button>}
      {a&&a.status==='published'&&<a className="adm-btn" href={'/blog/'+a.slug} target="_blank">View on site</a>}
    </footer>
  </form>;
}

export default async function BlogAdmin({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  await requireAdmin();const q=await searchParams;
  const [list,media]=await Promise.all([allArticles(true),listMedia()]);
  const editing=q.edit?await findArticle(q.edit,true):null;
  return <>
    <PageHead title="Blog" sub="Write new articles and edit the existing guides. Published posts appear on /blog and in the sitemap.">{!(q.new||editing)&&<Link className="adm-btn primary" href="/admin/blog?new=1"><Plus size={16}/> New post</Link>}</PageHead>
    <Flash msg={q.msg} map={MSG}/>
    {(q.new||editing)&&<Editor a={editing} media={media}/>}
    <section className="adm-card"><header><h2>{list.length} articles</h2></header>
      {list.length===0?<Empty title="No posts"/>:<div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Type</th><th>Status</th><th/></tr></thead><tbody>
        {list.map(a=><tr key={a.slug}><td>{a.image&&<img className="adm-row-thumb" src={a.image} alt=""/>}<strong>{a.title}</strong><small>/blog/{a.slug}</small></td><td>{a.category}</td><td>{fmtDay(a.date)}</td><td>{a.builtIn?'Built-in':'Your post'}</td><td><Pill s={a.status}/></td><td className="adm-actions"><Link href={'/admin/blog?edit='+a.slug}>Edit</Link>{a.status==='published'&&<a href={'/blog/'+a.slug} target="_blank">View</a>}</td></tr>)}
      </tbody></table></div>}
    </section>
  </>;
}
