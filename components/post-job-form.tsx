'use client';
import {useState} from 'react';
import {CheckCircle2} from 'lucide-react';

type Option={value:string;label:string};
export default function PostJobForm({cities,types,edu}:{cities:Option[];types:Option[];edu:Option[]}){
  const [state,setState]=useState<'idle'|'sending'|'done'>('idle');const [error,setError]=useState('');
  const in30=new Date(Date.now()+30*86400000).toISOString().slice(0,10);const max=new Date(Date.now()+90*86400000).toISOString().slice(0,10);
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();setError('');setState('sending');
    try{const r=await fetch('/api/post-job',{method:'POST',body:new FormData(e.currentTarget)});const j=await r.json().catch(()=>({ok:false}));if(!r.ok||!j.ok){setError(j.error||'Something went wrong. Please try again.');setState('idle');return;}setState('done');window.scrollTo({top:0,behavior:'smooth'});}
    catch{setError('Could not send. Check your internet connection and try again.');setState('idle');}
  }
  if(state==='done')return <div className="apply-done" role="status"><CheckCircle2 size={34}/><h3>Your job has been received</h3><p>The estaff.pk team will check it, usually within one working day, and may call you to confirm the details. Once approved it goes live on estaff.pk and can appear in Google Jobs.</p><p><a className="btn" href="/jobs">See current jobs</a></p></div>;
  return <form className="apply-form post-job-form" onSubmit={submit} noValidate>
    <div className="hp" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <h3 className="full">About you <small>(kept private)</small></h3>
    <label>Company or family name *<input name="company" required maxLength={120} placeholder="e.g. ABC Foods or Khan family"/></label>
    <label>Your name *<input name="contactName" required autoComplete="name" maxLength={80}/></label>
    <label>Phone / WhatsApp *<input name="phone" required type="tel" autoComplete="tel" placeholder="03XX XXXXXXX"/></label>
    <label>Email<input name="email" type="email" autoComplete="email" placeholder="Optional"/></label>
    <h3 className="full">The job</h3>
    <label className="full">Job title *<input name="title" required minLength={3} maxLength={120} placeholder="e.g. Live-in cook for a family of five"/></label>
    <label>Kind of work *<select name="jobType" required defaultValue=""><option value="" disabled>Choose…</option>{types.map(t=><option key={t.value} value={t.value}>{t.label}</option>)}</select></label>
    <label>City *<select name="city" required defaultValue=""><option value="" disabled>Choose…</option>{cities.map(c=><option key={c.value} value={c.value}>{c.label}</option>)}</select></label>
    <label>Area / sector<input name="area" maxLength={80} placeholder="e.g. DHA Phase 5"/></label>
    <label>Postal code<input name="postalCode" inputMode="numeric" maxLength={5} placeholder="Optional"/></label>
    <label>Employment type<select name="employmentType" defaultValue="FULL_TIME"><option value="FULL_TIME">Full-time</option><option value="PART_TIME">Part-time</option><option value="CONTRACTOR">Contract</option><option value="TEMPORARY">Temporary</option></select></label>
    <label>Closing date *<input type="date" name="validThrough" required defaultValue={in30} max={max}/></label>
    <label>Salary from (PKR / month)<input name="salaryMin" inputMode="numeric" placeholder="e.g. 35000"/></label>
    <label>Salary to (PKR / month)<input name="salaryMax" inputMode="numeric" placeholder="e.g. 45000"/></label>
    <label>Experience required<input name="experience" maxLength={160} placeholder="e.g. 2 years in a family home"/></label>
    <label>Experience in months<input name="expMonths" inputMode="numeric" placeholder="0 = freshers welcome"/></label>
    <label>Education level<select name="eduLevel" defaultValue="">{edu.map(e=><option key={e.value} value={e.value}>{e.label}</option>)}</select></label>
    <label>Education details<input name="education" maxLength={160} placeholder="e.g. Matric; LTV driving licence"/></label>
    <label className="check"><input type="checkbox" name="liveIn"/> Live-in job (accommodation provided)</label>
    <label className="check"><input type="checkbox" name="remote"/> Remote / work from home</label>
    <label className="full">Job description *<textarea name="description" required rows={5} minLength={60} maxLength={5000} placeholder="What the job is, working hours, days off, location (no exact address), and who the candidate will work with."/></label>
    <label>Duties (one per line)<textarea name="duties" rows={4}/></label>
    <label>Requirements (one per line)<textarea name="requirements" rows={4}/></label>
    <label className="full">Benefits (one per line)<textarea name="benefits" rows={2} placeholder="e.g. Meals and accommodation"/></label>
    <label className="full check"><input type="checkbox" name="real" value="yes" required/> This is a real, open vacancy, I am allowed to post it, and I will not ask job seekers for any fee.</label>
    <label className="full check"><input type="checkbox" name="consent" value="yes" required/> estaff.pk may contact me about this job and edit it for clarity before publishing.</label>
    {error&&<p className="full form-error" role="alert">{error}</p>}
    <button className="btn glow full" type="submit" disabled={state==='sending'}>{state==='sending'?'Sending…':'Submit job for approval'}</button>
  </form>;
}
