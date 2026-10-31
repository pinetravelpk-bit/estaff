import {requireAdmin} from '../../../lib/admin-guard';
import {listMedia} from '../../../lib/store';
import {PageHead,Flash,Empty,fmtDay} from '../../../components/admin-ui';

export const metadata={title:'Images'};
const MSG={uploaded:'Image uploaded.',saved:'Description saved.',deleted:'Image deleted.',type:'Please upload a JPG, PNG, WebP or GIF image.',size:'That image is larger than 5 MB. Please resize it first.',invalid:'Please choose an image to upload.'};

export default async function MediaAdmin({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  await requireAdmin();const q=await searchParams;const media=await listMedia();
  return <>
    <PageHead title="Images" sub="Upload photos for blog posts, the homepage and social sharing. Copy an image’s address to use it anywhere on the site."/>
    <Flash msg={q.msg} map={MSG}/>
    <form className="adm-card adm-upload" method="post" action="/api/admin/media" encType="multipart/form-data">
      <input type="hidden" name="_action" value="upload"/>
      <label className="adm-drop"><input type="file" name="file" accept="image/jpeg,image/png,image/webp,image/gif" required/><span><strong>Choose an image</strong> JPG, PNG, WebP or GIF, up to 5 MB. Landscape images around 1600×900 work best.</span></label>
      <label>Description (alt text, helps SEO and accessibility)<input name="alt" placeholder="e.g. Family cook preparing lunch in a Lahore kitchen" maxLength={200}/></label>
      <button className="adm-btn primary">Upload</button>
    </form>
    {media.length===0?<Empty title="No images yet" text="Upload your first image above."/>:
    <section className="adm-media">{media.map(m=>{const url='/media/'+m.file;return <figure key={m.file} className="adm-card">
      <a href={url} target="_blank"><img src={url} alt={m.alt}/></a>
      <figcaption><small>{m.name} · {(m.size/1024).toFixed(0)} KB · {fmtDay(m.createdAt)}</small>
        <form method="post" action="/api/admin/media"><input type="hidden" name="file" value={m.file}/><input name="alt" defaultValue={m.alt} placeholder="Description (alt text)"/><div className="adm-row"><button className="adm-btn small" name="_action" value="alt">Save</button><button type="button" className="adm-btn small" data-copy={url}>Copy address</button><button className="adm-btn small danger" name="_action" value="delete" data-confirm="Delete this image? Pages using it will show a broken image.">Delete</button></div></form>
      </figcaption></figure>;})}</section>}
  </>;
}
