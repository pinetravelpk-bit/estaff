import {requireAdmin} from '../../../lib/admin-guard';
import {mailConfigured,readMailLog} from '../../../lib/mail';
import {getSettings} from '../../../lib/settings';
import {PageHead,Flash,Empty,fmtDate} from '../../../components/admin-ui';

export const metadata={title:'Email'};
const MSG={saved:'Notification settings saved.',sent:'Test email sent. Check the inbox (and spam folder).',failed:'The test email could not be sent. See the log below for the reason.',invalid:'Please enter a valid email address.'};

export default async function EmailAdmin({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  await requireAdmin();const q=await searchParams;const n=getSettings().notify;const on=mailConfigured();const log=await readMailLog(60);
  return <>
    <PageHead title="Email" sub="Account confirmations, password resets, job alerts, application updates and notices to your team."/>
    <Flash msg={q.msg} map={MSG}/>
    <div className="adm-cols">
      <section className="adm-card"><header><h2>Sending status</h2></header>
        {on?<p className="adm-flash">Email sending is switched on ({process.env.SMTP_HOST}, from {process.env.MAIL_FROM||process.env.SMTP_USER}).</p>:
        <><p className="adm-flash bad">Email sending is not switched on yet. Accounts, alerts and forms still work, but no emails go out until it is connected.</p>
        <p className="adm-note">To switch it on, create a mailbox such as jobs@estaff.pk (Zoho Mail, Google Workspace or Brevo all work) and connect it on the server by running <code>estaff-set-email</code>. You will be asked for the mail server, username and password; nothing is shown on screen.</p></>}
        <form method="post" action="/api/admin/email" className="adm-form"><input type="hidden" name="_action" value="test"/><label>Send a test email to<input type="email" name="to" required defaultValue={n.email}/></label><button className="adm-btn" disabled={!on}>Send test email</button></form>
      </section>
      <form className="adm-card adm-form" method="post" action="/api/admin/email"><input type="hidden" name="_action" value="notify"/>
        <header><h2>Notify my team</h2></header>
        <label>Send notices to this email<input type="email" name="email" defaultValue={n.email} placeholder="you@estaff.pk"/></label>
        <label className="adm-check"><input type="checkbox" name="applications" defaultChecked={n.applications}/> New job applications and CVs</label>
        <label className="adm-check"><input type="checkbox" name="enquiries" defaultChecked={n.enquiries}/> New staff requests from employers</label>
        <label className="adm-check"><input type="checkbox" name="agencies" defaultChecked={n.agencies}/> New agencies waiting for approval</label>
        <label className="adm-check"><input type="checkbox" name="reviews" defaultChecked={n.reviews}/> New reviews waiting for approval</label>
        <footer><button className="adm-btn primary">Save</button></footer>
      </form>
    </div>
    <section className="adm-card"><header><h2>Recent emails</h2></header>
      {log.length===0?<Empty title="No emails yet"/>:<div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>When</th><th>To</th><th>Subject</th><th>Result</th></tr></thead><tbody>
        {log.map((l,i)=><tr key={i}><td>{fmtDate(l.at)}</td><td>{l.to}</td><td>{l.subject}</td><td>{l.sent?'Sent':<span className="adm-muted">Not sent{l.reason==='smtp-not-configured'?' (email not switched on)':': '+l.reason}</span>}</td></tr>)}
      </tbody></table></div>}
    </section>
  </>;
}
