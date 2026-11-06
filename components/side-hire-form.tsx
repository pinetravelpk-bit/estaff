'use client';
import {useState} from 'react';
import {ArrowUpRight,Check} from './ui';

// Short request form for the sidebar of role pages. Posts to the same endpoint as /hire,
// so requests appear in Admin → Enquiries with the role already filled in.
export default function SideHireForm({role,label}:{role:string;label:string}){
  const [state,setState]=useState<'idle'|'sending'|'done'>('idle');const [error,setError]=useState('');
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();setError('');setState('sending');
    try{
      const r=await fetch('/api/enquiry',{method:'POST',body:new FormData(e.currentTarget)});
      const j=await r.json().catch(()=>({ok:false}));
      if(!r.ok||!j.ok){setError(j.error||'Something went wrong. Please try again.');setState('idle');return;}
      setState('done');
    }catch{setError('Could not send. Check your internet connection and try again.');setState('idle');}
  }
  if(state==='done')return <div className="side-form-done" role="status"><Check size={26}/><h3>Thank you, your request has been sent.</h3><p>Our team will call you on the number you gave to discuss the {label.toLowerCase()} you need.</p></div>;
  return <form className="side-form" onSubmit={submit}>
    <div className="hp" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <input type="hidden" name="role" value={role}/>
    <label>Your name<input required name="name" autoComplete="name" placeholder="Full name"/></label>
    <label>Phone / WhatsApp<input required type="tel" name="phone" autoComplete="tel" minLength={10} placeholder="03XX XXXXXXX"/></label>
    <div className="side-form-row">
      <label>City<select name="city" defaultValue="islamabad"><option value="islamabad">Islamabad</option><option value="rawalpindi">Rawalpindi</option><option value="other">Other city</option></select></label>
      <label>Area<input name="area" placeholder="e.g. F-7, DHA"/></label>
    </div>
    <label>Arrangement<select name="schedule"><option>Full-time, live-out</option><option>Full-time, live-in</option><option>Part-time</option><option>To be discussed</option></select></label>
    <label>What will they do?<textarea name="details" required minLength={10} rows={3} placeholder="Duties, hours and any special needs"/></label>
    {error&&<p className="form-error" role="alert">{error}</p>}
    <button className="btn" type="submit" disabled={state==='sending'}>{state==='sending'?'Sending…':'Request Staff'}<ArrowUpRight size={17}/></button>
    <p className="side-form-note">Free to request. No payment is taken online.</p>
  </form>;
}
