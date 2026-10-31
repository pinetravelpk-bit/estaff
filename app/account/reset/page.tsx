export const metadata={title:'Choose a new password'};
export default async function Reset({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  const q=await searchParams;
  return <section className="acc-auth"><div className="acc-auth-card">
    <h1>Choose a new password</h1>
    {q.error&&<p className="acc-flash bad">{q.error==='match'?'The two passwords do not match.':'Use at least 8 characters, with letters and a number.'}</p>}
    <form method="post" action="/api/account/reset" className="acc-form">
      <input type="hidden" name="token" value={q.token||''}/>
      <label>New password<input type="password" name="password" required minLength={8} autoComplete="new-password"/></label>
      <label>Confirm new password<input type="password" name="password2" required minLength={8} autoComplete="new-password"/></label>
      <button className="btn glow">Save new password</button>
    </form>
  </div></section>;
}
