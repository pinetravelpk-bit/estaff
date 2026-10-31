import {requireAdmin} from '../../../lib/admin-guard';
import {getSettings} from '../../../lib/settings';
import {listMedia} from '../../../lib/store';
import {PageHead,Flash} from '../../../components/admin-ui';
import {MediaPicker} from '../../../components/media-picker';

export const metadata={title:'Content & sections'};
const SECTIONS:[keyof ReturnType<typeof getSettings>['sections'],string,string][]=[
  ['marquee','Roles & areas ticker','The two moving rows of roles and areas under the hero'],
  ['stats','Numbers band','Colourful counters: cities, areas, services…'],
  ['quickAnswers','Quick answers','Eight short answers for Google and AI assistants'],
  ['process','How it works','The five-step hiring process on a dark band'],
  ['business','Business services','Recruitment, HR, payroll and industries showcase'],
  ['coverage','Islamabad & Rawalpindi areas','Sector and neighbourhood links'],
  ['cities','All cities','Every city by province'],
  ['editorial','Local hiring guide','The long “better brief” section near the bottom'],
];

export default async function ContentAdmin({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  await requireAdmin();const q=await searchParams;const s=getSettings();const media=await listMedia();
  return <>
    <PageHead title="Content & sections" sub="Change what visitors see across the whole website. Saving updates every page within a few seconds."/>
    <Flash msg={q.msg} map={{saved:'Saved. The website has been updated.'}}/>
    <form method="post" action="/api/admin/settings" className="adm-stack">
      <section className="adm-card adm-form" id="contact"><header><h2>Contact details</h2></header>
        <p className="adm-note">Shown in the header, footer, contact page and in the business information Google reads. Fill in everything you can; real contact details are the single most important local-SEO signal.</p>
        <div className="adm-grid">
          <label>Phone<input name="contact.phone" defaultValue={s.contact.phone} placeholder="0300 1234567"/></label>
          <label>WhatsApp<input name="contact.whatsapp" defaultValue={s.contact.whatsapp} placeholder="0300 1234567"/></label>
          <label>Email<input name="contact.email" type="email" defaultValue={s.contact.email} placeholder="info@estaff.pk"/></label>
          <label>Opening hours<input name="contact.hours" defaultValue={s.contact.hours} placeholder="Mon–Sat, 9am–7pm"/></label>
          <label className="span2">Office address (street)<input name="contact.street" defaultValue={s.contact.street} placeholder="Office 12, Blue Area"/></label>
          <label>City<input name="contact.locality" defaultValue={s.contact.locality} placeholder="Islamabad"/></label>
          <label>Postal code<input name="contact.postalCode" defaultValue={s.contact.postalCode}/></label>
          <label className="span2">Google Business Profile link<input name="contact.gbp" defaultValue={s.contact.gbp} placeholder="https://maps.app.goo.gl/…"/></label>
          <label>Facebook page<input name="contact.facebook" defaultValue={s.contact.facebook}/></label>
          <label>Instagram<input name="contact.instagram" defaultValue={s.contact.instagram}/></label>
          <label>LinkedIn<input name="contact.linkedin" defaultValue={s.contact.linkedin}/></label>
          <label className="adm-check span3"><input type="checkbox" name="whatsappButton" defaultChecked={s.whatsappButton}/> Show the floating WhatsApp button on every page (needs a WhatsApp number)</label>
        </div>
      </section>

      <section className="adm-card adm-form"><header><h2>Top bar & announcement</h2></header>
        <div className="adm-grid">
          <label className="span4">Top bar text<input name="utility.text" defaultValue={s.utility.text}/></label>
          <label>“For employers” label<input name="utility.employersLabel" defaultValue={s.utility.employersLabel}/></label>
          <label>“For employers” link<input name="utility.employersHref" defaultValue={s.utility.employersHref}/></label>
          <label>“For job seekers” label<input name="utility.seekersLabel" defaultValue={s.utility.seekersLabel}/></label>
          <label>“For job seekers” link<input name="utility.seekersHref" defaultValue={s.utility.seekersHref}/></label>
          <label className="adm-check span4"><input type="checkbox" name="announcement.enabled" defaultChecked={s.announcement.enabled}/> Show an announcement bar above the header</label>
          <label className="span3">Announcement text<input name="announcement.text" defaultValue={s.announcement.text} placeholder="e.g. Now hiring drivers in Lahore – apply today"/></label>
          <label>Announcement link<input name="announcement.href" defaultValue={s.announcement.href} placeholder="/jobs"/></label>
        </div>
      </section>

      <section className="adm-card adm-form"><header><h2>Homepage hero</h2></header>
        <div className="adm-grid">
          <label>Small heading<input name="hero.eyebrow" defaultValue={s.hero.eyebrow}/></label>
          <label className="span3">Main headline (new line = line break)<textarea name="hero.title" rows={2} defaultValue={s.hero.title}/></label>
          <label className="span4">Sub-headline<input name="hero.subtitle" defaultValue={s.hero.subtitle}/></label>
          <label className="span4">Intro text<textarea name="hero.text" rows={3} defaultValue={s.hero.text}/></label>
          <label className="span4">Hero image<div className="adm-imgfield"><input id="hero-image" name="hero.image" defaultValue={s.hero.image}/><MediaPicker media={media} target="#hero-image" preview="#hero-prev"/></div><img id="hero-prev" className="adm-thumb" src={s.hero.image} alt=""/></label>
        </div>
      </section>

      <section className="adm-card adm-form"><header><h2>Homepage sections</h2></header>
        <p className="adm-note">Turn sections on or off. The hero, services, jobs and FAQ sections always show.</p>
        <div className="adm-toggles">{SECTIONS.map(([k,label,help])=><label key={k} className="adm-toggle"><input type="checkbox" name={'sections.'+k} defaultChecked={s.sections[k]}/><span className="adm-switch"/><span><strong>{label}</strong><small>{help}</small></span></label>)}</div>
      </section>

      <section className="adm-card adm-form"><header><h2>Footer</h2></header>
        <div className="adm-grid"><label className="span4">Footer tagline<input name="footer.tagline" defaultValue={s.footer.tagline}/></label></div>
      </section>
      <div className="adm-savebar"><button className="adm-btn primary">Save all changes</button></div>
    </form>
  </>;
}
