'use client';
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import {Home,LayoutGrid,BriefcaseBusiness,Search,Menu,X,UserRound,FilePlus2,FileText,HeartHandshake,Building2,Wallet,Laptop,MapPin,Users,Star,Newspaper,HelpCircle,Phone,MessageCircle,ChevronRight,Bell} from 'lucide-react';
import {useSiteSettings,waHref} from './site-settings';

// Mobile app shell: bottom tab bar with a raised "Hire" button, a "More" bottom sheet,
// and a header that slides away while scrolling down. Shown only on screens up to 900px.
const TABS=[
  {href:'/',label:'Home',icon:Home,match:(p:string)=>p==='/'},
  {href:'/services',label:'Services',icon:LayoutGrid,match:(p:string)=>p.startsWith('/services')||p.startsWith('/industries')||p.startsWith('/areas')},
  {href:'/hire',label:'Hire',icon:BriefcaseBusiness,match:(p:string)=>p==='/hire',fab:true},
  {href:'/jobs',label:'Jobs',icon:Search,match:(p:string)=>p.startsWith('/jobs')},
];
const QUICK:[string,string,React.ComponentType<{size?:number}>][]=[
  ['Home & care','/services/domestic-staff',HeartHandshake],['Business hiring','/services/corporate-recruitment',Building2],['Payroll & HR','/services/payroll-management',Wallet],
  ['Remote teams','/services/remote-staff',Laptop],['Cities','/areas',MapPin],['Job alerts','/account?tab=alerts',Bell],
  ['Agencies','/agencies',Users],['Reviews','/reviews',Star],['Blog','/blog',Newspaper],
  ['How it works','/how-it-works',ChevronRight],['FAQs','/faqs',HelpCircle],['Contact','/contact',Phone],
];

export default function AppShell(){
  const path=usePathname()||'/';const site=useSiteSettings();
  const [open,setOpen]=useState(false);const sheet=useRef<HTMLDivElement>(null);const drag=useRef<{y:number;dy:number}|null>(null);
  // Hide the header while scrolling down, bring it back when scrolling up.
  useEffect(()=>{
    let last=window.scrollY,ticking=false;const root=document.documentElement;
    const onScroll=()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{const y=window.scrollY;const menuOpen=document.querySelector('.mega-nav.mobile-open');
      if(y<90||y<last-6||menuOpen)root.classList.remove('hdr-hidden');else if(y>last+6)root.classList.add('hdr-hidden');last=y;ticking=false;});};
    window.addEventListener('scroll',onScroll,{passive:true});return ()=>{window.removeEventListener('scroll',onScroll);root.classList.remove('hdr-hidden');};
  },[]);
  useEffect(()=>{setOpen(false);},[path]);
  useEffect(()=>{
    document.documentElement.classList.toggle('sheet-open',open);
    if(!open)return;const esc=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false);};window.addEventListener('keydown',esc);
    sheet.current?.querySelector<HTMLElement>('a,button')?.focus();
    return ()=>window.removeEventListener('keydown',esc);
  },[open]);
  const tel=site?.contact.phone?.replace(/[^0-9+]/g,'');const wa=site?.contact.whatsapp?waHref(site.contact.whatsapp):'';
  // Swipe the sheet down to close it.
  const start=(e:React.TouchEvent)=>{drag.current={y:e.touches[0].clientY,dy:0};};
  const move=(e:React.TouchEvent)=>{if(!drag.current||!sheet.current)return;const dy=Math.max(0,e.touches[0].clientY-drag.current.y);drag.current.dy=dy;sheet.current.style.transform=`translateY(${dy}px)`;};
  const end=()=>{if(!sheet.current||!drag.current)return;sheet.current.style.transform='';if(drag.current.dy>90)setOpen(false);drag.current=null;};
  return <>
    <nav className="app-tabbar" aria-label="App navigation">
      {TABS.map(t=>{const I=t.icon;const on=t.match(path);return <a key={t.href} href={t.href} className={(t.fab?'app-fab':'app-tab')+(on?' on':'')} aria-current={on?'page':undefined}><span className="app-tab-icon"><I size={t.fab?24:21}/></span><span className="app-tab-label">{t.label}</span></a>;})}
      <button type="button" className={'app-tab'+(open?' on':'')} onClick={()=>setOpen(o=>!o)} aria-expanded={open} aria-controls="app-sheet"><span className="app-tab-icon">{open?<X size={21}/>:<Menu size={21}/>}</span><span className="app-tab-label">More</span></button>
    </nav>
    <div className={'app-sheet-backdrop'+(open?' on':'')} onClick={()=>setOpen(false)} aria-hidden="true"/>
    <div id="app-sheet" ref={sheet} className={'app-sheet'+(open?' on':'')} role="dialog" aria-modal="true" aria-label="More options" aria-hidden={!open} inert={!open} onTouchStart={start} onTouchMove={move} onTouchEnd={end}>
      <span className="app-sheet-handle" aria-hidden="true"/>
      <div className="app-sheet-top">
        <a href="/account" className="app-sheet-account"><UserRound size={20}/><span><strong>My account</strong><small>Sign in or create a free account</small></span><ChevronRight size={18}/></a>
        <div className="app-sheet-actions"><a href="/post-a-job" className="btn"><FilePlus2 size={17}/> Post a job</a><a href="/jobs/apply" className="btn outline"><FileText size={17}/> Submit CV</a></div>
      </div>
      <div className="app-sheet-grid">{QUICK.map(([label,href,I])=><a key={href} href={href} className={path===href?'on':''}><span><I size={20}/></span>{label}</a>)}</div>
      {(tel||wa)&&<div className="app-sheet-contact">{tel&&<a href={'tel:'+tel}><Phone size={18}/> Call us</a>}{wa&&<a href={wa} target="_blank" rel="noopener"><MessageCircle size={18}/> WhatsApp</a>}</div>}
      <button type="button" className="app-sheet-close" onClick={()=>setOpen(false)}>Close</button>
    </div>
  </>;
}
