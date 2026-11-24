'use client';
import {createContext,useContext} from 'react';
import type {PublicSettings} from '../lib/settings';

const Ctx=createContext<PublicSettings|null>(null);
export function SiteSettingsProvider({value,children}:{value:PublicSettings;children:React.ReactNode}){return <Ctx.Provider value={value}>{children}</Ctx.Provider>;}
export const useSiteSettings=()=>useContext(Ctx);
export const waHref=(n:string)=>{const d=n.replace(/[^0-9]/g,'');return d?'https://wa.me/'+(d.startsWith('0')?'92'+d.slice(1):d):'';};

// Floating "Call now" button, shown when a phone number is set and the floating button is on.
export function WhatsAppButton(){
  const s=useSiteSettings();const tel=s?.whatsappButton?(s.contact.phone||'').replace(/[^0-9+]/g,''):'';
  if(!tel)return null;
  return <a className="call-float" href={'tel:'+tel} aria-label={'Call estaff.pk on '+s!.contact.phone}><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"/></svg><span>Call now</span></a>;
}
