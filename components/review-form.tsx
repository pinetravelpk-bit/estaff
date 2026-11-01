'use client';
import {useState} from 'react';
import {Star,CheckCircle2} from 'lucide-react';

type Me={name:string;email:string}|null;
export default function ReviewForm({agency,agencyName,me}:{agency?:string;agencyName?:string;me?:Me}){
  const [rating,setRating]=useState(0);const [hover,setHover]=useState(0);
  const [state,setState]=useState<'idle'|'sending'|'done'>('idle');const [error,setError]=useState('');
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();setError('');
    if(!rating){setError('Please choose a star rating.');return;}
    const data=new FormData(e.currentTarget);data.set('rating',String(rating));
    setState('sending');
    try{const r=await fetch('/api/reviews',{method:'POST',body:data});const j=await r.json().catch(()=>({ok:false}));if(!r.ok||!j.ok){setError(j.error||'Something went wrong. Please try again.');setState('idle');return;}setState('done');}
    catch{setError('Could not send. Check your internet connection and try again.');setState('idle');}
  }
  if(state==='done')return <div className="apply-done" role="status"><CheckCircle2 size={34}/><h3>Thank you for your review</h3><p>It will appear here after a quick check by the estaff.pk team, usually within one working day.</p></div>;
  const labels=['','Poor','Fair','Good','Very good','Excellent'];const shown=hover||rating;
  return <form className="apply-form review-form" onSubmit={submit} noValidate>
    {agency&&<input type="hidden" name="agency" value={agency}/>}
    <div className="hp" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <fieldset className="full star-input"><legend>Your rating{agencyName?` for ${agencyName}`:''} *</legend>
      <div onMouseLeave={()=>setHover(0)}>{[1,2,3,4,5].map(n=><button key={n} type="button" aria-label={`${n} star${n>1?'s':''}`} aria-pressed={rating===n} onMouseEnter={()=>setHover(n)} onFocus={()=>setHover(n)} onBlur={()=>setHover(0)} onClick={()=>setRating(n)}><Star size={30} className={n<=shown?'on':''}/></button>)}<span>{labels[shown]}</span></div>
    </fieldset>
    <label>Your name *<input name="name" required autoComplete="name" defaultValue={me?.name}/></label>
    <label>Email * <small>(never shown)</small><input name="email" type="email" required autoComplete="email" defaultValue={me?.email}/></label>
    <label>City<input name="city" autoComplete="address-level2" placeholder="e.g. Lahore"/></label>
    <label>You are *<select name="kind" required defaultValue=""><option value="" disabled>Choose…</option><option value="employer">An employer or family who hired staff</option><option value="job-seeker">A job seeker</option><option value="other">Other</option></select></label>
    <label className="full">Headline<input name="title" maxLength={100} placeholder="Sum up your experience"/></label>
    <label className="full">Your review *<textarea name="text" rows={5} required minLength={20} maxLength={2000} placeholder="What went well, what could be better, and would you recommend it?"/></label>
    <label className="full check"><input type="checkbox" name="honest" value="yes" required/> This review is about my own experience, and I have no business link that would make it unfair.</label>
    {error&&<p className="full form-error" role="alert">{error}</p>}
    <button className="btn glow full" type="submit" disabled={state==='sending'}>{state==='sending'?'Sending…':'Submit review'}</button>
    <p className="full muted-line">Reviews are checked before they appear. We publish positive and negative reviews alike, and never edit what you wrote. Website links are removed.</p>
  </form>;
}
