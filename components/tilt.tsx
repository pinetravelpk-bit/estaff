'use client';
import {useRef} from 'react';

// 3D tilt: the card leans towards the pointer and its layers (data-depth) float at different depths.
// Idle cards drift slowly; everything stays still for visitors who prefer reduced motion.
export default function Tilt({children,className='',max=10}:{children:React.ReactNode;className?:string;max?:number}){
  const ref=useRef<HTMLDivElement>(null);
  function move(e:React.PointerEvent<HTMLDivElement>){
    if(e.pointerType==='touch')return;const el=ref.current;if(!el)return;
    const r=el.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    el.style.setProperty('--ry',(x*max*2).toFixed(2)+'deg');el.style.setProperty('--rx',(-y*max*2).toFixed(2)+'deg');
    el.style.setProperty('--gx',((x+.5)*100).toFixed(0)+'%');el.style.setProperty('--gy',((y+.5)*100).toFixed(0)+'%');el.classList.add('is-tilting');
  }
  function leave(){const el=ref.current;if(!el)return;el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg');el.classList.remove('is-tilting');}
  return <div ref={ref} className={'tilt3d '+className} onPointerMove={move} onPointerLeave={leave}><div className="tilt3d-inner">{children}<span className="tilt3d-glare" aria-hidden="true"/></div></div>;
}
