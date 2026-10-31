'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

// Things that fade and rise into view as the visitor scrolls.
const REVEAL='main section:not(.reference-hero):not(.page-hero), .service-card, .qa-card, .step-card, .stat, .coverage-city, .domestic-card, .job-card, .glossary-item, .about-card';

export default function MotionLayer(){
  const path=usePathname();
  useEffect(()=>{
    const bar=document.querySelector<HTMLElement>('.scroll-progress');
    const onScroll=()=>{const h=document.documentElement;const max=h.scrollHeight-h.clientHeight;bar?.style.setProperty('--p',String(max>0?h.scrollTop/max:0));};
    onScroll();window.addEventListener('scroll',onScroll,{passive:true});
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced||!('IntersectionObserver' in window))return ()=>window.removeEventListener('scroll',onScroll);

    const io=new IntersectionObserver(entries=>{for(const e of entries){if(!e.isIntersecting)continue;const el=e.target as HTMLElement;el.classList.add('in');io.unobserve(el);
      el.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp);}},{rootMargin:'0px 0px -8% 0px',threshold:.08});
    document.querySelectorAll<HTMLElement>(REVEAL).forEach((el,i)=>{
      if(el.dataset.reveal)return;
      // Leave anything already on screen alone so the first paint never blinks.
      if(el.getBoundingClientRect().top<window.innerHeight*.9){el.dataset.reveal='done';return;}
      el.dataset.reveal='1';el.style.setProperty('--d',(i%4)*70+'ms');io.observe(el);
    });
    document.querySelectorAll<HTMLElement>('.stats-band').forEach(s=>{if(s.getBoundingClientRect().top<window.innerHeight)s.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp);});
    return ()=>{window.removeEventListener('scroll',onScroll);io.disconnect();};
  },[path]);
  return <div className="scroll-progress" aria-hidden="true"/>;
}

function countUp(el:HTMLElement){
  if(el.dataset.done)return;el.dataset.done='1';
  const target=Number(el.dataset.count||0);const start=performance.now();const dur=1400;
  const tick=(t:number)=>{const k=Math.min(1,(t-start)/dur);el.textContent=String(Math.round(target*(1-Math.pow(1-k,3))));if(k<1)requestAnimationFrame(tick);};
  el.textContent='0';requestAnimationFrame(tick);
}
