'use client';
import {useEffect,useState} from 'react';
import {services} from '../lib/content';
import {ArrowUpRight,Check} from './ui';

type City={slug:string;name:string};
export default function HiringForm({cities}:{cities:City[]}){
  const [city,setCity]=useState('islamabad');const [role,setRole]=useState('');const [area,setArea]=useState('');
  const [state,setState]=useState<'idle'|'sending'|'done'>('idle');const [error,setError]=useState('');
  useEffect(()=>{const p=new URLSearchParams(location.search);const c=p.get('city');if(c&&cities.some(x=>x.slug===c))setCity(c);setRole(p.get('role')||'');setArea(p.get('area')||'');},[cities]);
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();setError('');setState('sending');
    try{const r=await fetch('/api/enquiry',{method:'POST',body:new FormData(e.currentTarget)});const j=await r.json().catch(()=>({ok:false}));if(!r.ok||!j.ok){setError(j.error||'Something went wrong. Please try again.');setState('idle');return;}setState('done');}
    catch{setError('Could not send. Check your internet connection and try again.');setState('idle');}
  }
  if(state==='done')return <div className="success" role="status"><Check size={30}/><h3 style={{marginTop:15}}>Thank you, your requirement has been sent.</h3><p>The estaff.pk team will contact you on the phone number you gave to discuss the role, candidates and terms.</p><a className="text-link" href="/how-it-works">See what happens next<ArrowUpRight size={16}/></a></div>;
  return <form className="form-grid" onSubmit={submit}>
    <div className="hp" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <label>Your name<input required name="name" autoComplete="name" placeholder="Full name"/></label>
    <label>Company / household<input name="company" placeholder="Optional"/></label>
    <label>Phone / WhatsApp<input required type="tel" name="phone" autoComplete="tel" minLength={10} placeholder="03XX XXXXXXX"/></label>
    <label>Email address<input type="email" name="email" autoComplete="email" placeholder="Optional"/></label>
    <label>Staff or service required<select required name="role" value={role} onChange={e=>setRole(e.target.value)}><option value="">Choose a category</option>{role&&!services.find(s=>s.name===role)&&<option>{role}</option>}{services.map(s=><option key={s.slug}>{s.name}</option>)}</select></label>
    <label>Your city<select name="city" value={city} onChange={e=>setCity(e.target.value)}>{cities.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
    <label>Area / neighbourhood<input name="area" value={area} onChange={e=>setArea(e.target.value)} placeholder="e.g. DHA, Gulberg, F-7"/></label>
    <label>Working arrangement<select name="schedule"><option>Full-time, live-out</option><option>Full-time, live-in</option><option>Part-time</option><option>Remote</option><option>To be discussed</option></select></label>
    <label>Monthly salary budget (PKR)<input name="budget" type="number" min="0" placeholder="e.g. 50000"/></label>
    <label>Preferred start date<input name="start" type="date"/></label>
    <label className="full">What will this person do?<textarea name="details" required minLength={10} placeholder="Tell us about the duties, hours, skills and any special requirements."/></label>
    {error&&<p className="full form-error" role="alert">{error}</p>}
    <button className="btn full" type="submit" disabled={state==='sending'}>{state==='sending'?'Sending…':'Send My Requirement'}<ArrowUpRight size={18}/></button>
  </form>;
}
