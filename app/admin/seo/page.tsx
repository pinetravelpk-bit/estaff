import Link from 'next/link';
import {requireAdmin} from '../../../lib/admin-guard';
import {getSettings,getSeoOverrides} from '../../../lib/settings';
import {listMedia} from '../../../lib/store';
import {PageHead,Flash,Empty} from '../../../components/admin-ui';
import {MediaPicker} from '../../../components/media-picker';

export const metadata={title:'SEO'};
const MSG={saved:'Saved. Pages update within a few seconds.',added:'Page override saved.',removed:'Override removed. The page uses its original title and description again.',invalid:'Enter a page address that starts with / (for example /about).'};
const COMMON=['/','/about','/contact','/how-it-works','/services','/areas','/jobs','/jobs/apply','/hire','/blog','/faqs','/glossary','/services/domestic-staff','/services/corporate-recruitment','/services/payroll-management','/services/hr-outsourcing','/areas/islamabad','/areas/rawalpindi','/areas/lahore','/areas/karachi'];

export default async function SeoAdmin({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  await requireAdmin();const q=await searchParams;const s=getSettings().seo;const overrides=getSeoOverrides();const media=await listMedia();
  const editing=q.edit?{path:q.edit,...(overrides[q.edit]||{title:'',description:'',noindex:false,image:''})}:null;
  return <>
    <PageHead title="SEO" sub="Search engine settings for the whole site, plus custom titles and descriptions for any page."/>
    <Flash msg={q.msg} map={MSG}/>
    <div className="adm-cols">
      <form className="adm-card adm-form" method="post" action="/api/admin/settings"><input type="hidden" name="_form" value="seo"/>
        <header><h2>Search engines</h2></header>
        <div className="adm-grid two">
          <label className="span2">Google Search Console verification code<input name="seo.googleVerification" defaultValue={s.googleVerification} placeholder="Paste the code or the whole meta tag"/></label>
          <label className="span2">Bing Webmaster verification code<input name="seo.bingVerification" defaultValue={s.bingVerification} placeholder="Paste the code or the whole meta tag"/></label>
          <label>Title ending<input name="seo.titleSuffix" defaultValue={s.titleSuffix}/></label>
          <label>Default share image<div className="adm-imgfield"><input id="seo-img" name="seo.defaultImage" defaultValue={s.defaultImage}/><MediaPicker media={media} target="#seo-img" preview="#seo-img-prev" label="Choose"/></div></label>
          <img id="seo-img-prev" className="adm-thumb span2" src={s.defaultImage} alt=""/>
        </div>
        <footer><button className="adm-btn primary">Save</button></footer>
      </form>
      <section className="adm-card"><header><h2>Checklist</h2></header>
        <ul className="adm-check-list">
          <li className={s.googleVerification?'ok':''}>Verify the site in <a href="https://search.google.com/search-console" target="_blank" rel="noopener">Google Search Console</a> and paste the code here.</li>
          <li>Submit your sitemap: <a href="/sitemap.xml" target="_blank">estaff.pk/sitemap.xml</a> <button type="button" className="adm-btn small" data-copy="https://estaff.pk/sitemap.xml">Copy</button></li>
          <li className={s.bingVerification?'ok':''}>Add the site to <a href="https://www.bing.com/webmasters" target="_blank" rel="noopener">Bing Webmaster Tools</a> (also feeds ChatGPT search and Copilot).</li>
          <li className={getSettings().contact.phone&&getSettings().contact.street?'ok':''}>Add your phone and address under <Link href="/admin/content#contact">Content → Contact details</Link>.</li>
          <li className={getSettings().contact.gbp?'ok':''}>Create a Google Business Profile and add its link under Contact details.</li>
          <li>AI assistants read <a href="/llms.txt" target="_blank">/llms.txt</a>; it updates automatically.</li>
        </ul>
      </section>
    </div>

    <section className="adm-card adm-form"><header><h2>{editing?'Edit page SEO':'Customise a page'}</h2>{editing&&<Link href="/admin/seo">Cancel</Link>}</header>
      <p className="adm-note">Override the Google title and description of any page. Leave a field empty to keep the page’s own text. Titles work best under 60 characters, descriptions between 120 and 160.</p>
      <form method="post" action="/api/admin/seo" className="adm-grid">
        <label className="span2">Page address<input name="path" list="paths" required defaultValue={editing?.path} placeholder="/about" readOnly={Boolean(editing)}/></label>
        <label className="adm-check span2"><input type="checkbox" name="noindex" defaultChecked={editing?.noindex}/> Hide this page from Google (noindex)</label>
        <label className="span4">Title<input name="title" defaultValue={editing?.title} maxLength={90}/></label>
        <label className="span4">Description<textarea name="description" rows={2} defaultValue={editing?.description} maxLength={300}/></label>
        <label className="span4">Share image<div className="adm-imgfield"><input id="ov-img" name="image" defaultValue={editing?.image}/><MediaPicker media={media} target="#ov-img" label="Choose"/></div></label>
        <div className="span4"><button className="adm-btn primary" name="_action" value="save">Save page SEO</button></div>
        <datalist id="paths">{COMMON.map(p=><option key={p} value={p}/>)}</datalist>
      </form>
    </section>
    <section className="adm-card"><header><h2>Customised pages ({Object.keys(overrides).length})</h2></header>
      {Object.keys(overrides).length===0?<Empty title="No customised pages" text="Every page uses its built-in SEO title and description."/>:
      <div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>Page</th><th>Title</th><th>Description</th><th>Google</th><th/></tr></thead><tbody>
        {Object.entries(overrides).map(([p,o])=><tr key={p}><td><a href={p} target="_blank">{p}</a></td><td>{o.title||<span className="adm-muted">original</span>}</td><td className="adm-clip">{o.description||<span className="adm-muted">original</span>}</td><td>{o.noindex?'Hidden':'Indexed'}</td><td className="adm-actions"><Link href={'/admin/seo?edit='+encodeURIComponent(p)}>Edit</Link><form method="post" action="/api/admin/seo"><input type="hidden" name="path" value={p}/><button name="_action" value="remove" className="danger">Remove</button></form></td></tr>)}
      </tbody></table></div>}
    </section>
  </>;
}
