'use client';
import {createContext,useContext} from 'react';
import type {PublicSettings} from '../lib/settings';

const Ctx=createContext<PublicSettings|null>(null);
export function SiteSettingsProvider({value,children}:{value:PublicSettings;children:React.ReactNode}){return <Ctx.Provider value={value}>{children}</Ctx.Provider>;}
export const useSiteSettings=()=>useContext(Ctx);
export const waHref=(n:string)=>{const d=n.replace(/[^0-9]/g,'');return d?'https://wa.me/'+(d.startsWith('0')?'92'+d.slice(1):d):'';};

// Floating WhatsApp button, shown when a WhatsApp number is set in the dashboard.
export function WhatsAppButton(){
  const s=useSiteSettings();const href=s?.whatsappButton?waHref(s.contact.whatsapp||''):'';
  if(!href)return null;
  return <a className="wa-float" href={href+'?text='+encodeURIComponent('Assalam o Alaikum, I found estaff.pk and need help with staffing.')} target="_blank" rel="noopener" aria-label="Chat with estaff.pk on WhatsApp"><svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.7c-2 0-4-.5-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.7 10.7 0 1 1 16 26.7zm5.9-8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.8 8.8 0 0 1-4.4-3.8c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.4 6.4 0 0 0 1.3 3.4 14.6 14.6 0 0 0 5.6 4.9c2.1.9 2.9 1 4 .8.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg></a>;
}
