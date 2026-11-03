'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowRight,ArrowUpRight,Pause,Play} from 'lucide-react';

// Home hero: three animated scenes in the style of short motion videos.
// 1) a rotating 3D wall of staff photos, 2) a professional with workplace tiles popping in,
// 3) a moving 2×2 collage of household staff. The headline, copy and buttons change with
// each scene; the first scene's headline is the H1 crawlers see. Auto-plays every 8 seconds, pauses on hover, focus or the
// pause button, and never auto-plays for visitors who prefer reduced motion.
type Hero={eyebrow:string;title:string;subtitle:string;text:string};
type Tile={img:string;label:string;href:string};
const img=(n:string)=>`/images/hero/${n}.webp`;

const WALL:Tile[]=[
  {img:'cook',label:'Cooks',href:'/services/domestic-staff/cooks-chefs'},{img:'manager',label:'Managers',href:'/services/executive-search'},{img:'driver',label:'Drivers',href:'/services/domestic-staff/drivers'},{img:'call-centre',label:'Call centre',href:'/services/business-process-outsourcing'},
  {img:'nanny',label:'Nannies',href:'/services/domestic-staff/nannies-babysitters'},{img:'accountant',label:'Accountants',href:'/services/corporate-recruitment/accounts-finance'},{img:'engineers',label:'Technical teams',href:'/services/technical-recruitment'},{img:'home-nurse',label:'Home nurses',href:'/services/domestic-staff/home-nurses'},
  {img:'coordinator',label:'Office staff',href:'/services/corporate-recruitment'},{img:'guard',label:'Watchmen',href:'/services/domestic-staff/watchmen-caretakers'},{img:'maid',label:'Maids',href:'/services/domestic-staff/maids-housekeepers'},{img:'hr-officer',label:'HR & payroll',href:'/services/hr-outsourcing'},
];
const BUSINESS:Tile[]=[
  {img:'engineers',label:'Industrial & technical',href:'/services/industrial-staffing'},
  {img:'call-centre',label:'Call centre & remote',href:'/services/remote-staff'},
  {img:'accountant',label:'Accounts & payroll',href:'/services/payroll-management'},
  {img:'hr-officer',label:'HR outsourcing',href:'/services/hr-outsourcing'},
];
const HOME:Tile[]=[
  {img:'cook',label:'Cook',href:'/services/domestic-staff/cooks-chefs'},
  {img:'driver',label:'Driver',href:'/services/domestic-staff/drivers'},
  {img:'nanny',label:'Nanny',href:'/services/domestic-staff/nannies-babysitters'},
  {img:'home-nurse',label:'Home nurse',href:'/services/domestic-staff/home-nurses'},
];

const lines=(t:string)=>t.split('\n').map((l,i,a)=><span key={i}>{l}{i<a.length-1&&<>{' '}<br/></>}</span>);

export default function HeroSlider({hero}:{hero:Hero}){
  const slides=[
    {key:'all',title:hero.title,eyebrow:hero.eyebrow,heading:hero.subtitle,text:hero.text,ctas:[['Find Staff','/hire'],['Find a Job','/jobs']] as [string,string][],label:'Staff for homes and businesses'},
    {key:'business',title:'Hiring. HR.\nPayroll.',eyebrow:'FOR BUSINESSES',heading:'Recruitment, HR and payroll that keep your team running.',text:'From one office hire to a whole production team: corporate and technical recruitment, bulk hiring, HR outsourcing and monthly payroll across Pakistan.',ctas:[['Business solutions','/services/corporate-recruitment'],['Payroll & HR','/services/payroll-management']] as [string,string][],label:'Recruitment and HR for businesses'},
    {key:'home',title:'Cooks. Drivers.\nCare.',eyebrow:'FOR YOUR HOME',heading:'Trusted cooks, drivers, maids, nannies and care staff.',text:'Tell us the duties, hours and area. We shortlist checked household staff and help you agree clear, written terms before anyone starts.',ctas:[['Hire household staff','/services/domestic-staff'],['Post a job free','/post-a-job']] as [string,string][],label:'Household staff for families'},
  ];
  const [i,setI]=useState(0);const [paused,setPaused]=useState(false);const [hold,setHold]=useState(false);const [reduced,setReduced]=useState(false);
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{const m=window.matchMedia('(prefers-reduced-motion: reduce)');setReduced(m.matches);if(m.matches)setPaused(true);},[]);
  useEffect(()=>{if(paused||hold)return;const t=setTimeout(()=>setI(x=>(x+1)%slides.length),8000);return ()=>clearTimeout(t);},[i,paused,hold,slides.length]);
  const s=slides[i];
  // Swipe left or right on phones to change scene.
  const touch=useRef<{x:number;y:number}|null>(null);
  const tStart=(e:React.TouchEvent)=>{touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY};};
  const tEnd=(e:React.TouchEvent)=>{const t=touch.current;touch.current=null;if(!t)return;const dx=e.changedTouches[0].clientX-t.x,dy=e.changedTouches[0].clientY-t.y;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.4){setI(x=>(x+(dx<0?1:slides.length-1))%slides.length);}};
  return <div ref={root} className={'hero-slider'+(reduced?' is-reduced':'')} onMouseEnter={()=>setHold(true)} onMouseLeave={()=>setHold(false)} onFocusCapture={()=>setHold(true)} onBlurCapture={e=>{if(!root.current?.contains(e.relatedTarget as Node))setHold(false);}} aria-roledescription="carousel" aria-label="estaff.pk services">
    <div className="container reference-hero-grid">
      <div className="reference-hero-copy">
        <h1 key={'title-'+s.key} className="hero-title-swap">{lines(s.title)}</h1>
        <div className="hero-slide-copy" key={s.key} aria-live={paused?'polite':'off'}>
          <span className="eyebrow">{s.eyebrow}</span>
          <h2>{s.heading}</h2>
          <p>{lines(s.text)}</p>
          <div className="hero-actions">{s.ctas.map(([t,href],k)=><a key={href} className={'btn'+(k?' outline':'')} href={href}>{t} <ArrowRight size={17}/></a>)}</div>
        </div>
        <div className="hero-controls">
          {slides.map((x,k)=><button key={x.key} type="button" className={'hero-dot'+(k===i?' on':'')} aria-label={`Show slide ${k+1}: ${x.label}`} aria-current={k===i} onClick={()=>setI(k)}><span style={{animationPlayState:paused||hold?'paused':'running'}}/></button>)}
          <button type="button" className="hero-pause" onClick={()=>setPaused(p=>!p)} aria-label={paused?'Play slides':'Pause slides'}>{paused?<Play size={14}/>:<Pause size={14}/>}</button>
        </div>
      </div>
      <div className="hero-stage" onTouchStart={tStart} onTouchEnd={tEnd}>
        {slides.map((x,k)=><div key={x.key} className={'hero-scene scene-'+x.key+(k===i?' is-on':'')} aria-hidden={k!==i} inert={k!==i} role="group" aria-roledescription="slide" aria-label={`${k+1} of ${slides.length}: ${x.label}`}>
          {x.key==='all'&&<Wall eager={k===0}/>}
          {x.key==='business'&&<Presenter/>}
          {x.key==='home'&&<Collage/>}
        </div>)}
      </div>
    </div>
  </div>;
}

function Wall({eager}:{eager:boolean}){
  return <div className="wall3d"><div className="wall3d-plane">{WALL.map((t,k)=><a key={t.img+k} href={t.href} className="wall-tile" style={{['--k' as string]:k}}><img src={img(t.img)} alt={t.label} width={360} height={480} loading={eager&&k<8?'eager':'lazy'} fetchPriority={k<2&&eager?'high':'auto'}/><span>{t.label}</span></a>)}</div><a className="wall-badge" href="/areas">106 cities across Pakistan <ArrowUpRight size={14}/></a></div>;
}
function Presenter(){
  return <div className="presenter"><a className="presenter-person" href="/services/hr-consultancy"><img src={img('consultant')} alt="HR and recruitment consultant" width={360} height={480} loading="lazy"/><span>Talk to a recruitment consultant <ArrowUpRight size={13}/></span></a>
    <div className="presenter-grid">{BUSINESS.map((t,k)=><a key={t.img} href={t.href} className="pop-tile" style={{['--k' as string]:k}}><img src={img(t.img)} alt={t.label} width={360} height={480} loading="lazy"/><span>{t.label} <ArrowUpRight size={12}/></span></a>)}</div></div>;
}
function Collage(){
  return <div className="collage">{HOME.map((t,k)=><a key={t.img} href={t.href} className="collage-tile" style={{['--k' as string]:k}}><img src={img(t.img)} alt={t.label} width={360} height={480} loading="lazy"/><span>{t.label} <ArrowUpRight size={12}/></span></a>)}<a className="collage-centre" href="/services/domestic-staff">Household staff</a></div>;
}
