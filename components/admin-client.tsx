'use client';
import {useEffect} from 'react';

// Dashboard helpers: confirm before destructive buttons, copy-to-clipboard buttons,
// and filling an image field from the media picker.
export default function AdminClient(){
  useEffect(()=>{
    function onClick(e:MouseEvent){
      const t=e.target as HTMLElement;
      const c=t.closest<HTMLElement>('[data-confirm]');
      if(c&&!window.confirm(c.dataset.confirm||'Are you sure?')){e.preventDefault();return;}
      const cp=t.closest<HTMLElement>('[data-copy]');
      if(cp){e.preventDefault();navigator.clipboard?.writeText(cp.dataset.copy||'').then(()=>{const old=cp.textContent;cp.textContent='Copied ✓';setTimeout(()=>{cp.textContent=old;},1400);});}
      const pick=t.closest<HTMLElement>('[data-pick]');
      if(pick){e.preventDefault();const target=document.querySelector<HTMLInputElement>(pick.dataset.target||'');if(target){target.value=pick.dataset.pick||'';target.dispatchEvent(new Event('input',{bubbles:true}));}
        const prev=document.querySelector<HTMLImageElement>(pick.dataset.preview||'');if(prev){prev.src=pick.dataset.pick||'';prev.hidden=false;}
        pick.closest('details')?.removeAttribute('open');}
      const ins=t.closest<HTMLElement>('[data-insert]');
      if(ins){e.preventDefault();const ta=document.querySelector<HTMLTextAreaElement>(ins.dataset.target||'');if(ta){const s=ta.selectionStart;ta.setRangeText(ins.dataset.insert||'',s,ta.selectionEnd,'end');ta.focus();}}
    }
    document.addEventListener('click',onClick);return ()=>document.removeEventListener('click',onClick);
  },[]);
  return null;
}
