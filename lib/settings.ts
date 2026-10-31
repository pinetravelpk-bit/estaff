// Site settings and per-page SEO overrides, edited from the admin dashboard.
// Read synchronously (cached by file modification time) so any server render can use them.
import fs from 'fs';
import path from 'path';

const DIR=process.env.DATA_DIR||path.join(/*turbopackIgnore: true*/ process.cwd(),'.data');

export type Settings={
  contact:{phone:string;whatsapp:string;email:string;street:string;locality:string;postalCode:string;hours:string;gbp:string;facebook:string;instagram:string;linkedin:string};
  utility:{text:string;employersLabel:string;employersHref:string;seekersLabel:string;seekersHref:string};
  announcement:{enabled:boolean;text:string;href:string};
  hero:{eyebrow:string;title:string;subtitle:string;text:string;image:string};
  sections:{marquee:boolean;stats:boolean;quickAnswers:boolean;process:boolean;coverage:boolean;cities:boolean;editorial:boolean;business:boolean};
  seo:{googleVerification:string;bingVerification:string;defaultImage:string;titleSuffix:string};
  footer:{tagline:string};
  whatsappButton:boolean;
  notify:{email:string;applications:boolean;enquiries:boolean;agencies:boolean};
};
export type SeoOverride={title:string;description:string;noindex:boolean;image:string};

export const defaultSettings:Settings={
  contact:{phone:process.env.SITE_PHONE||'',whatsapp:'',email:process.env.SITE_EMAIL||'',street:process.env.SITE_STREET_ADDRESS||'',locality:process.env.SITE_ADDRESS_LOCALITY||'',postalCode:process.env.SITE_POSTAL_CODE||'',hours:'',gbp:process.env.SITE_GBP_URL||'',facebook:'',instagram:'',linkedin:''},
  utility:{text:'Serving families & businesses across Pakistan',employersLabel:'For employers',employersHref:'/hire',seekersLabel:'For job seekers',seekersHref:'/jobs'},
  announcement:{enabled:false,text:'',href:''},
  hero:{eyebrow:'PEOPLE DRIVE PROGRESS',title:'People. Payroll.\nPossibilities.',subtitle:'Staffing, HR & remote teams in Islamabad and Rawalpindi.',text:'Find the right people for your home, office and growing business.\nFrom recruitment to payroll and remote teams — all in one place.',image:'/images/hero-reference.webp'},
  sections:{marquee:true,stats:true,quickAnswers:true,process:true,coverage:true,cities:true,editorial:true,business:true},
  seo:{googleVerification:process.env.GOOGLE_SITE_VERIFICATION||'',bingVerification:process.env.BING_SITE_VERIFICATION||'',defaultImage:'/images/hero-reference.webp',titleSuffix:'estaff.pk'},
  footer:{tagline:'Thoughtful hiring. Local focus.'},
  whatsappButton:true,
  notify:{email:'',applications:true,enquiries:true,agencies:true},
};

const cache=new Map<string,{mtime:number;value:unknown}>();
function readJsonSync<T>(name:string,fallback:T):T{
  const file=path.join(/*turbopackIgnore: true*/ DIR,name);
  try{const st=fs.statSync(file);const hit=cache.get(file);if(hit&&hit.mtime===st.mtimeMs)return hit.value as T;const value=JSON.parse(fs.readFileSync(file,'utf8')) as T;cache.set(file,{mtime:st.mtimeMs,value});return value;}
  catch{return fallback;}
}
function writeJsonSync(name:string,value:unknown){fs.mkdirSync(DIR,{recursive:true});const file=path.join(/*turbopackIgnore: true*/ DIR,name);const tmp=file+'.tmp';fs.writeFileSync(tmp,JSON.stringify(value,null,1));fs.renameSync(tmp,file);cache.delete(file);}

const merge=<T extends object>(base:T,over:Partial<T>|undefined):T=>{const out={...base} as Record<string,unknown>;if(over)for(const [k,v] of Object.entries(over)){const b=(base as Record<string,unknown>)[k];out[k]=b&&typeof b==='object'&&!Array.isArray(b)&&v&&typeof v==='object'?{...b,...v}:v;}return out as T;};
export const getSettings=()=>merge(defaultSettings,readJsonSync<Partial<Settings>>('settings.json',{}));
export const saveSettings=(s:Settings)=>writeJsonSync('settings.json',s);

export const getSeoOverrides=()=>readJsonSync<Record<string,SeoOverride>>('seo.json',{});
export const getSeoOverride=(p:string)=>getSeoOverrides()[p.replace(/\/$/,'')||'/'];
export const saveSeoOverrides=(m:Record<string,SeoOverride>)=>writeJsonSync('seo.json',m);

// Public-facing subset handed to client components (header, footer, WhatsApp button).
export type PublicSettings=Pick<Settings,'utility'|'announcement'|'footer'|'whatsappButton'>&{contact:Settings['contact']};
export const publicSettings=():PublicSettings=>{const s=getSettings();return {utility:s.utility,announcement:s.announcement,footer:s.footer,whatsappButton:s.whatsappButton,contact:s.contact};};
export const waLink=(n:string)=>{const d=n.replace(/[^0-9]/g,'');return d?'https://wa.me/'+(d.startsWith('0')?'92'+d.slice(1):d):'';};
