'use client';
import {useRef,useState} from 'react';
import {ArrowUpRight,Check} from './ui';

// Sidebar form on role pages. The form is always shown, but visitors must first choose
// "I'm hiring" or "I need a job" before it can be sent: hiring requests go to /api/enquiry
// (Admin → Staff requests); job seekers go to /api/apply (Admin → Applications only).
type Mode='hire'|'job'|null;
export default function SideHireForm({role,label}:{role:string;label:string}){
  const [mode,setMode]=useState<Mode>(null);
  const [state,setState]=useState<'idle'|'sending'|'done'>('idle');const [error,setError]=useState('');
  const choice=useRef<HTMLFieldSetElement>(null);
  const lower=label.toLowerCase();
  const pick=(m:Mode)=>{setMode(m);setError('');};
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(!mode){setError('Please choose “I’m hiring” or “I need a job” first.');choice.current?.querySelector('input')?.focus();return;}
    setError('');setState('sending');
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
    <p>{mode==='hire'?'Tell us what you need and we will call you back.':mode==='job'?'Send your details once and we will call you when a suitable job opens.':'Choose an option, then fill in your details.'}</p>
    <form className="side-form" onSubmit={submit}>
      <fieldset className={'side-mode'+(error&&!mode?' needs-choice':'')} ref={choice}><legend>Looking for a job or hiring? <span className="req">*</span></legend>
        <div role="radiogroup" aria-required="true">
          <label className={mode==='hire'?'on':''}><input type="radio" name="side-mode" value="hire" required checked={mode==='hire'} onChange={()=>pick('hire')}/>I’m hiring</label>
          <label className={mode==='job'?'on':''}><input type="radio" name="side-mode" value="job" required checked={mode==='job'} onChange={()=>pick('job')}/>I need a job</label>
        </div>
      </fieldset>
      <div className="hp" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
      <input type="hidden" name="role" value={role}/>
      <label>Your name<input required name="name" autoComplete="name" placeholder="Full name"/></label>
      <label>Phone / WhatsApp<input required type="tel" name="phone" autoComplete="tel" minLength={10} placeholder="03XX XXXXXXX"/></label>
      <div className="side-form-row">
        <label>City<select name="city" defaultValue="islamabad"><option value="islamabad">Islamabad</option><option value="rawalpindi">Rawalpindi</option><option value="other">Other city</option></select></label>
        {mode==='job'
          ?<label key="exp">Experience<select name="experience" defaultValue=""><option value="">Choose…</option>{['Less than 1 year','1–2 years','3–5 years','6–10 years','More than 10 years'].map(x=><option key={x}>{x}</option>)}</select></label>
          :<label key="area">Area<input name="area" placeholder="e.g. F-7, DHA"/></label>}
      </div>
      {mode!=='job'&&<label>Arrangement<select name="schedule"><option>Full-time, live-out</option><option>Full-time, live-in</option><option>Part-time</option><option>To be discussed</option></select></label>}
      <label>{mode==='job'?'About your experience':'What will they do?'}<textarea name={mode==='job'?'message':'details'} required={mode!=='job'} minLength={mode==='job'?undefined:10} rows={3} placeholder={mode==='job'?'Where you have worked and what you can do':'Duties, hours and any special needs'}/></label>
      {mode==='job'&&<>
        <label>CV (optional)<input type="file" name="cv" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png"/></label>
        <label className="side-consent"><input type="checkbox" name="consent" value="yes" required/> I agree that estaff.pk may contact me about jobs and share my profile with employers hiring for this work.</label>
      </>}
      {error&&<p className="form-error" role="alert">{error}</p>}
      <button className="btn" type="submit" disabled={state==='sending'}>{state==='sending'?'Sending…':mode==='job'?'Send my application':mode==='hire'?'Request Staff':'Send'}<ArrowUpRight size={17}/></button>
      <p className="side-form-note">{mode==='job'?'Free for job seekers. Never pay anyone for a job.':'Free to request. No payment is taken online.'}</p>
    </form>
  </div>;
}
