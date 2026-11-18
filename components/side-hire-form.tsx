'use client';
import {useState} from 'react';
import {ArrowUpRight,Check} from './ui';

// Sidebar form on role pages. Visitors first say whether they are hiring or looking for a job:
// hiring requests go to /api/enquiry (Admin → Staff requests); job seekers go to /api/apply
// (Admin → Applications only), so CVs never mix with client requests.
type Mode='hire'|'job'|null;
export default function SideHireForm({role,label}:{role:string;label:string}){
  const [mode,setMode]=useState<Mode>(null);
  const [state,setState]=useState<'idle'|'sending'|'done'>('idle');const [error,setError]=useState('');
  const lower=label.toLowerCase();
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();setError('');setState('sending');
    try{
      const r=await fetch(mode==='hire'?'/api/enquiry':'/api/apply',{method:'POST',body:new FormData(e.currentTarget)});
      const j=await r.json().catch(()=>({ok:false}));
      if(!r.ok||!j.ok){setError(j.error||'Something went wrong. Please try again.');setState('idle');return;}
      setState('done');
    }catch{setError('Could not send. Check your internet connection and try again.');setState('idle');}
  }
  if(state==='done')return <div className="side-form-done" role="status"><Check size={26}/>
    {mode==='hire'?<><h3>Thank you, your request has been sent.</h3><p>Our team will call you on the number you gave to discuss the {lower} you need.</p></>
    :<><h3>Thank you, your application has been received.</h3><p>We will call you when a suitable job opens in this field. estaff.pk never charges job seekers.</p><a className="text-link" href="/jobs">See open jobs<ArrowUpRight size={15}/></a></>}
  </div>;
  return <div className="side-form-wrap">
    <h3>{mode==='hire'?`Request ${lower}`:mode==='job'?`Apply for jobs: ${label}`:`${label}: hire or apply`}</h3>
    <p>{mode==='hire'?'Tell us what you need and we will call you back.':mode==='job'?'Send your details once and we will call you when a suitable job opens.':'Choose one option to see the right form.'}</p>
    <fieldset className="side-mode"><legend>Looking for a job or hiring?</legend>
      <div role="radiogroup">
        <label className={mode==='hire'?'on':''}><input type="radio" name="side-mode" checked={mode==='hire'} onChange={()=>{setMode('hire');setError('');}}/>I’m hiring</label>
        <label className={mode==='job'?'on':''}><input type="radio" name="side-mode" checked={mode==='job'} onChange={()=>{setMode('job');setError('');}}/>I need a job</label>
      </div>
    </fieldset>
    {mode&&<form className="side-form" onSubmit={submit} key={mode}>
      <div className="hp" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
      <input type="hidden" name="role" value={role}/>
      <label>Your name<input required name="name" autoComplete="name" placeholder="Full name"/></label>
      <label>Phone / WhatsApp<input required type="tel" name="phone" autoComplete="tel" minLength={10} placeholder="03XX XXXXXXX"/></label>
      {mode==='hire'?<>
        <div className="side-form-row">
          <label>City<select name="city" defaultValue="islamabad"><option value="islamabad">Islamabad</option><option value="rawalpindi">Rawalpindi</option><option value="other">Other city</option></select></label>
          <label>Area<input name="area" placeholder="e.g. F-7, DHA"/></label>
        </div>
        <label>Arrangement<select name="schedule"><option>Full-time, live-out</option><option>Full-time, live-in</option><option>Part-time</option><option>To be discussed</option></select></label>
        <label>What will they do?<textarea name="details" required minLength={10} rows={3} placeholder="Duties, hours and any special needs"/></label>
      </>:<>
        <div className="side-form-row">
          <label>City<select name="city" defaultValue="islamabad"><option value="islamabad">Islamabad</option><option value="rawalpindi">Rawalpindi</option><option value="other">Other city</option></select></label>
          <label>Experience<select name="experience" defaultValue=""><option value="">Choose…</option>{['Less than 1 year','1–2 years','3–5 years','6–10 years','More than 10 years'].map(x=><option key={x}>{x}</option>)}</select></label>
        </div>
        <label>About your experience<textarea name="message" rows={3} placeholder="Where you have worked and what you can do"/></label>
        <label>CV (optional)<input type="file" name="cv" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png"/></label>
        <label className="side-consent"><input type="checkbox" name="consent" value="yes" required/> I agree that estaff.pk may contact me about jobs and share my profile with employers hiring for this work.</label>
      </>}
      {error&&<p className="form-error" role="alert">{error}</p>}
      <button className="btn" type="submit" disabled={state==='sending'}>{state==='sending'?'Sending…':mode==='hire'?'Request Staff':'Send my application'}<ArrowUpRight size={17}/></button>
      <p className="side-form-note">{mode==='hire'?'Free to request. No payment is taken online.':'Free for job seekers. Never pay anyone for a job.'}</p>
    </form>}
  </div>;
}
