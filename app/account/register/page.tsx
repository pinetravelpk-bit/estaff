import Link from 'next/link';
import {redirect} from 'next/navigation';
import {currentUser} from '../../../lib/users';
import {allCities} from '../../../lib/pakistan';

export const metadata={title:'Create an account'};
const ERR:Record<string,string>={name:'Please enter your full name.',email:'Please enter a valid email address.',phone:'Please enter a valid phone number (e.g. 0300 1234567).',password:'Password must be at least 8 characters and include letters and a number.',match:'The two passwords do not match.',terms:'Please accept the terms to continue.',exists:'An account with this email already exists. Please sign in instead.',agency:'Please enter your agency’s name.',limit:'Too many sign-ups from this connection. Please try again later.'};

export default async function Register({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  if(await currentUser())redirect('/account');
  const q=await searchParams;const agency=q.type==='agency';
  return <section className="acc-auth">
    <div className="acc-auth-card wide">
      <div className="acc-toggle"><Link className={!agency?'on':''} href="/account/register?type=seeker">I’m looking for a job</Link><Link className={agency?'on':''} href="/account/register?type=agency">I’m an agency</Link></div>
      <h1>{agency?'List your staffing or recruitment agency':'Create your job seeker account'}</h1>
      <p>{agency?'Create an agency profile in the estaff.pk directory, post jobs and receive applications. New agencies are checked by our team before they appear publicly.':'Free for job seekers. Save your CV once, apply in one click, follow the status of every application and get job alerts by email.'}</p>
      {q.error&&<p className="acc-flash bad">{ERR[q.error]||'Please check the form and try again.'}</p>}
      <form method="post" action="/api/account/register" className="acc-form grid">
        <input type="hidden" name="role" value={agency?'agency':'seeker'}/>
        <div className="hp" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
        {agency&&<label className="full">Agency name<input name="agencyName" required minLength={3} maxLength={120} placeholder="e.g. Al-Noor Staffing Services"/></label>}
        <label>{agency?'Your name':'Full name'}<input name="name" required autoComplete="name"/></label>
        <label>Phone / WhatsApp<input name="phone" type="tel" required autoComplete="tel" placeholder="0300 1234567"/></label>
        <label>Email<input name="email" type="email" required autoComplete="email"/></label>
        {agency&&<label>Main city<select name="city" defaultValue=""><option value="">Choose…</option>{allCities.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>}
        <label>Password<input name="password" type="password" required minLength={8} autoComplete="new-password"/></label>
        <label>Confirm password<input name="password2" type="password" required minLength={8} autoComplete="new-password"/></label>
        <label className="full check"><input type="checkbox" name="terms" value="yes" required/> {agency?'I confirm this agency is genuine, will only post real vacancies and will never charge job seekers a fee to apply.':'I agree that estaff.pk may store my details and contact me about jobs.'}</label>
        <button className="btn glow full" type="submit">{agency?'Create agency account':'Create my account'}</button>
      </form>
      <p className="acc-links">Already have an account? <Link href="/account/login">Sign in</Link></p>
    </div>
  </section>;
}
