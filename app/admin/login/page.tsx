import {redirect} from 'next/navigation';
import {isAdmin,adminConfigured} from '../../../lib/auth';

export const dynamic='force-dynamic';
export const metadata={title:'Sign in'};

export default async function Login({searchParams}:{searchParams:Promise<{error?:string}>}){
  if(await isAdmin())redirect('/admin');
  const {error}=await searchParams;
  return <main className="adm-login">
    <div className="adm-login-card">
      <img src="/brand/logo.webp" alt="estaff.pk" width={170} height={46}/>
      <h1>Welcome back</h1><p>Sign in to manage estaff.pk.</p>
      {!adminConfigured()&&<p className="adm-flash bad">Admin access is not configured on this server yet.</p>}
      {error&&<p className="adm-flash bad">{error==='locked'?'Too many attempts. Please wait 15 minutes.':'Incorrect password. Please try again.'}</p>}
      <form method="post" action="/api/admin/login"><label>Password<input type="password" name="password" required autoComplete="current-password" autoFocus/></label><button className="adm-btn primary" type="submit">Sign in</button></form>
    </div>
  </main>;
}
