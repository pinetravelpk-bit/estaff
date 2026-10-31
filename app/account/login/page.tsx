import Link from 'next/link';
import {redirect} from 'next/navigation';
import {currentUser} from '../../../lib/users';

export const metadata={title:'Sign in'};
const ERR:Record<string,string>={'1':'Email or password is incorrect.',locked:'Too many attempts. Please wait 15 minutes and try again.',suspended:'This account has been suspended. Please contact estaff.pk.'};
const MSG:Record<string,string>={out:'You have signed out.',reset:'Your password has been changed. Please sign in.'};

export default async function Login({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  if(await currentUser())redirect('/account');
  const q=await searchParams;
  return <section className="acc-auth">
    <div className="acc-auth-card">
      <h1>Sign in to estaff.pk</h1>
      <p>For job seekers and agencies. Track your applications, manage your CV and get job alerts.</p>
      {q.error&&<p className="acc-flash bad">{ERR[q.error]||ERR['1']}</p>}
      {q.msg&&MSG[q.msg]&&<p className="acc-flash">{MSG[q.msg]}</p>}
      <form method="post" action="/api/account/login" className="acc-form">
        <input type="hidden" name="next" value={q.next||''}/>
        <label>Email<input type="email" name="email" required autoComplete="email" autoFocus/></label>
        <label>Password<input type="password" name="password" required autoComplete="current-password"/></label>
        <button className="btn glow" type="submit">Sign in</button>
      </form>
      <p className="acc-links"><Link href="/account/forgot">Forgot password?</Link></p>
      <div className="acc-split"><Link href="/account/register?type=seeker" className="acc-choice"><strong>New job seeker?</strong><span>Create a free account</span></Link><Link href="/account/register?type=agency" className="acc-choice"><strong>Staffing or recruitment agency?</strong><span>List your agency</span></Link></div>
    </div>
  </section>;
}
