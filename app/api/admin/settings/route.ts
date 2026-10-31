import {denyIfNotAdmin,refreshWholeSite} from '../../../../lib/admin-guard';
import {go} from '../../../../lib/http';
import {getSettings,saveSettings,type Settings} from '../../../../lib/settings';

export const dynamic='force-dynamic';
const txt=(f:FormData,k:string,max=300)=>String(f.get(k)??'').trim().slice(0,max);
const url=(v:string)=>!v||/^(\/|https:\/\/|http:\/\/|#)/.test(v)?v:'https://'+v;

// Saves the Content & sections form (and the SEO page's global settings).
export async function POST(req:Request){
  const deny=await denyIfNotAdmin();if(deny)return deny;
  const f=await req.formData();const s:Settings=getSettings();const form=String(f.get('_form')||'content');
  if(form==='seo'){
    s.seo={googleVerification:txt(f,'seo.googleVerification',120).replace(/^.*content="([^"]+)".*$/,'$1'),bingVerification:txt(f,'seo.bingVerification',120).replace(/^.*content="([^"]+)".*$/,'$1'),defaultImage:url(txt(f,'seo.defaultImage')),titleSuffix:txt(f,'seo.titleSuffix',40)||'estaff.pk'};
    saveSettings(s);refreshWholeSite();return go('/admin/seo?msg=saved');
  }
  for(const k of Object.keys(s.contact) as (keyof Settings['contact'])[])s.contact[k]=txt(f,'contact.'+k,200);
  for(const k of ['gbp','facebook','instagram','linkedin'] as const)s.contact[k]=url(s.contact[k]);
  s.utility={text:txt(f,'utility.text',120),employersLabel:txt(f,'utility.employersLabel',40)||'For employers',employersHref:url(txt(f,'utility.employersHref'))||'/hire',seekersLabel:txt(f,'utility.seekersLabel',40)||'For job seekers',seekersHref:url(txt(f,'utility.seekersHref'))||'/jobs'};
  s.announcement={enabled:f.get('announcement.enabled')==='on',text:txt(f,'announcement.text',160),href:url(txt(f,'announcement.href'))};
  s.hero={eyebrow:txt(f,'hero.eyebrow',60),title:txt(f,'hero.title',120)||'People. Payroll.\nPossibilities.',subtitle:txt(f,'hero.subtitle',160),text:txt(f,'hero.text',400),image:url(txt(f,'hero.image'))||'/images/hero-reference.webp'};
  for(const k of Object.keys(s.sections) as (keyof Settings['sections'])[])s.sections[k]=f.get('sections.'+k)==='on';
  s.footer={tagline:txt(f,'footer.tagline',120)};
  s.whatsappButton=f.get('whatsappButton')==='on';
  saveSettings(s);refreshWholeSite();
  return go('/admin/content?msg=saved');
}
