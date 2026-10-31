import Link from 'next/link';

export const metadata={title:'Forgot password'};
export default async function Forgot({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  const q=await searchParams;
  return <section className="acc-auth"><div className="acc-auth-card">
    <h1>Forgot your password?</h1>
    <p>Enter the email you signed up with and we will send you a link to choose a new password.</p>
    {q.sent&&<p className="acc-flash">If an account exists for that email, a reset link is on its way. Check your inbox and spam folder.</p>}
    {q.error&&<p className="acc-flash bad">That reset link has expired or was already used. Please request a new one.</p>}
    <form method="post" action="/api/account/forgot" className="acc-form"><label>Email<input type="email" name="email" required autoComplete="email"/></label><button className="btn glow">Send reset link</button></form>
    <p className="acc-links"><Link href="/account/login">Back to sign in</Link></p>
  </div></section>;
}
