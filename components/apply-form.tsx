'use client';
import {useState} from 'react';
import {CheckCircle2,Upload} from 'lucide-react';

type Option={value:string;label:string};
type Me={name:string;phone:string;email:string;cvName:string|null};
export default function ApplyForm({jobId,jobTitle,cities,roles,defaultCity='',defaultRole='',me}:{jobId?:string;jobTitle?:string;cities:Option[];roles:Option[];defaultCity?:string;defaultRole?:string;me?:Me|null}){
  const [state,setState]=useState<'idle'|'sending'|'done'>('idle');const [error,setError]=useState('');const [file,setFile]=useState('');
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();setError('');
    const data=new FormData(e.currentTarget);const cv=data.get('cv');
    if(cv instanceof File&&cv.size>5*1024*1024){setError('Your CV is larger than 5 MB.');return;}
    setState('sending');
    try{const r=await fetch('/api/apply',{method:'POST',body:data});const j=await r.json().catch(()=>({ok:false}));if(!r.ok||!j.ok){setError(j.error||'Something went wrong. Please try again.');setState('idle');return;}setState('done');}
    catch{setError('Could not send. Check your internet connection and try again.');setState('idle');}
  }
  if(state==='done')return <div className="apply-done" role="status"><CheckCircle2 size={34}/><h3>Application received</h3><p>Thank you. {jobTitle?<>Your application for <strong>{jobTitle}</strong> has been received.</>:'Your CV has been registered.'} If your profile matches, the estaff.pk team will contact you on the phone number you gave.</p>{me?<p><a className="btn" href="/account">Track it in my account</a></p>:<p className="muted-line"><a className="qa-link" href="/account/register">Create a free account</a> to follow your application status and get job alerts by email.</p>}<p className="muted-line">estaff.pk never charges job seekers a fee to apply.</p></div>;
  return <form className="apply-form" onSubmit={submit} noValidate>
    {jobId&&<input type="hidden" name="jobId" value={jobId}/>}
    <div className="hp" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    {me?<p className="full apply-me">Applying as <strong>{me.name}</strong> · <a href="/account?tab=profile">edit profile</a></p>:<p className="full apply-me">Have an account? <a href="/account/login">Sign in</a> to apply faster and track your status.</p>}<label>Full name *<input name="name" required autoComplete="name" minLength={2} defaultValue={me?.name}/></label>
    <label>Phone / WhatsApp *<input name="phone" required type="tel" autoComplete="tel" placeholder="03XX XXXXXXX" defaultValue={me?.phone}/></label>
    <label>Email<input name="email" type="email" autoComplete="email" placeholder="Optional" defaultValue={me?.email}/></label>
    <label>City *<select name="city" required defaultValue={defaultCity}><option value="">Choose your city</option>{cities.map(c=><option key={c.value} value={c.label}>{c.label}</option>)}</select></label>
    <label>Kind of work *<select name="role" required defaultValue={defaultRole}><option value="">Choose…</option>{roles.map(r=><option key={r.value} value={r.label}>{r.label}</option>)}</select></label>
    <label>Experience<select name="experience" defaultValue=""><option value="">Choose…</option>{['Less than 1 year','1–2 years','3–5 years','6–10 years','More than 10 years'].map(x=><option key={x}>{x}</option>)}</select></label>
    <label className="full">Short message<textarea name="message" rows={3} placeholder="Your previous jobs, skills, live-in or live-out preference…"/></label>
    <label className="full file-drop"><Upload size={20}/><span>{file||(me?.cvName?`Your saved CV (${me.cvName}) will be attached. Upload a different one to replace it.`:'Upload your CV (PDF, Word, JPG or PNG · max 5 MB)')}</span><input type="file" name="cv" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png" onChange={e=>setFile(e.target.files?.[0]?.name||'')}/></label>
    <label className="full check"><input type="checkbox" name="consent" value="yes" required/> I agree that estaff.pk may store my details and contact me about jobs.</label>
    {error&&<p className="full form-error" role="alert">{error}</p>}
    <button className="btn glow full" type="submit" disabled={state==='sending'}>{state==='sending'?'Sending…':jobId?'Apply for this job':'Submit my CV'}</button>
  </form>;
}
