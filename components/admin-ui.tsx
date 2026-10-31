import Link from 'next/link';
import AdminClient from './admin-client';
import {LayoutDashboard,Briefcase,Users,Building2,FileText,Inbox,Newspaper,Image as ImageIcon,PanelsTopLeft,SearchCheck,ExternalLink,LogOut,UserSearch} from 'lucide-react';

export const NAV=[
  {group:'Overview',items:[{href:'/admin',label:'Dashboard',icon:LayoutDashboard}]},
  {group:'Employers',items:[{href:'/admin/enquiries',label:'Staff requests',icon:Inbox,badge:'enquiries'},{href:'/admin/employers',label:'Employers',icon:Building2}]},
  {group:'Job seekers',items:[{href:'/admin/jobs',label:'Jobs',icon:Briefcase},{href:'/admin/applications',label:'Applications',icon:FileText,badge:'applications'},{href:'/admin/candidates',label:'Candidates',icon:UserSearch}]},
  {group:'Website',items:[{href:'/admin/content',label:'Content & sections',icon:PanelsTopLeft},{href:'/admin/blog',label:'Blog',icon:Newspaper},{href:'/admin/media',label:'Images',icon:ImageIcon},{href:'/admin/seo',label:'SEO',icon:SearchCheck}]},
] as const;

export function AdminShell({children,badges}:{children:React.ReactNode;badges:Record<string,number>}){
  return <div className="adm">
    <input type="checkbox" id="adm-nav" className="adm-nav-toggle" aria-label="Toggle menu"/>
    <aside className="adm-side">
      <Link href="/admin" className="adm-brand"><img src="/brand/logo-white.webp" alt="estaff.pk" width={140} height={38}/><span>Admin</span></Link>
      <nav>{NAV.map(g=><div key={g.group} className="adm-group"><p>{g.group}</p>{g.items.map(i=>{const I=i.icon;const n='badge' in i?badges[i.badge]||0:0;return <Link key={i.href} href={i.href}><I size={18}/><span>{i.label}</span>{n>0&&<b>{n}</b>}</Link>;})}</div>)}</nav>
      <div className="adm-side-foot"><a href="/" target="_blank"><ExternalLink size={16}/> View website</a><form method="post" action="/api/admin/logout"><button type="submit"><LogOut size={16}/> Sign out</button></form></div>
    </aside>
    <label htmlFor="adm-nav" className="adm-burger" aria-hidden="true"><span/><span/><span/></label>
    <main className="adm-main">{children}</main><AdminClient/>
  </div>;
}

export function PageHead({title,sub,children}:{title:string;sub?:string;children?:React.ReactNode}){return <header className="adm-head"><div><h1>{title}</h1>{sub&&<p>{sub}</p>}</div>{children&&<div className="adm-head-actions">{children}</div>}</header>;}
export function Flash({msg,map}:{msg?:string;map:Record<string,string>}){if(!msg||!map[msg])return null;const bad=/invalid|error|notfound|type|size|exists/.test(msg);return <p className={bad?'adm-flash bad':'adm-flash'}>{map[msg]}</p>;}
export function Pill({s}:{s:string}){return <span className={'adm-pill p-'+s}>{s}</span>;}
export function Empty({title,text,children}:{title:string;text?:string;children?:React.ReactNode}){return <div className="adm-empty"><h3>{title}</h3>{text&&<p>{text}</p>}{children}</div>;}
export function Back({path}:{path:string}){return <input type="hidden" name="_back" value={path}/>;}
export const fmtDate=(iso:string)=>new Date(iso).toLocaleString('en-PK',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Karachi'});
export const fmtDay=(iso:string)=>new Date(iso).toLocaleDateString('en-PK',{dateStyle:'medium',timeZone:'Asia/Karachi'});
export const wa=(p:string)=>{const d=p.replace(/[^0-9]/g,'');return 'https://wa.me/'+(d.startsWith('0')?'92'+d.slice(1):d);};
export function Contact({phone,email}:{phone:string;email?:string}){return <span className="adm-contact"><a href={'tel:'+phone}>{phone}</a> · <a href={wa(phone)} target="_blank" rel="noopener">WhatsApp</a>{email&&<> · <a href={'mailto:'+email}>{email}</a></>}</span>;}
