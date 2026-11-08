import {BadgeCheck,Building2,FileText,MapPin,ShieldCheck,ExternalLink,Star,Quote} from 'lucide-react';
import {company,feePolicy} from '../lib/company';
import {listReviews,publicName,summary,KIND_LABEL} from '../lib/reviews';

// "Registered & verified" section: company registration with links to the certificates
// and the SECP verification page, the fee policy, and real approved client reviews.
export async function TrustSection({id='company-registration',heading='A registered company you can verify'}:{id?:string;heading?:string}){
  const reviews=(await listReviews({status:'approved',target:'estaff'})).filter(r=>r.rating>=4);
  const all=await listReviews({status:'approved',target:'estaff'});const s=summary(all);
  return <section className="container trust-section" id={id} aria-labelledby={id+'-h'}>
    <div className="trust-head">
      <span className="eyebrow">REGISTERED & VERIFIED</span>
      <h2 id={id+'-h'}>{heading}</h2>
      <p>estaff.pk is operated by <strong>{company.legalName}</strong>, a company incorporated with the Securities and Exchange Commission of Pakistan and registered with the Federal Board of Revenue.</p>
    </div>
    <div className="trust-docs">
      <article className="trust-doc">
        <span className="trust-icon"><ShieldCheck size={24}/></span>
        <h3>SECP incorporated</h3>
        <dl><div><dt>Company</dt><dd>{company.legalName}</dd></div><div><dt>CUIN</dt><dd>{company.secpCuin}</dd></div><div><dt>Incorporated</dt><dd>{company.incorporatedText}, {company.incorporatedAt}</dd></div></dl>
        <div className="trust-links"><a href={company.secpVerifyUrl} target="_blank" rel="noopener">Verify on SECP <ExternalLink size={14}/></a><a href={company.secpCertificate} target="_blank" rel="noopener">Certificate (PDF) <FileText size={14}/></a></div>
      </article>
      <article className="trust-doc">
        <span className="trust-icon"><BadgeCheck size={24}/></span>
        <h3>FBR registered</h3>
        <dl><div><dt>Registration no.</dt><dd>{company.fbrRegNo}</dd></div><div><dt>Tax office</dt><dd>{company.fbrTaxOffice}</dd></div><div><dt>Registered</dt><dd>{company.incorporatedText}</dd></div></dl>
        <div className="trust-links"><a href={company.fbrCertificate} target="_blank" rel="noopener">Certificate (PDF) <FileText size={14}/></a></div>
      </article>
      <article className="trust-doc">
        <span className="trust-icon"><Building2 size={24}/></span>
        <h3>Registered office</h3>
        <p className="trust-address"><MapPin size={16}/> {company.addressText}</p>
        <p className="trust-small">Serving homes and businesses in Islamabad, Rawalpindi and across Pakistan.</p>
      </article>
    </div>
    <div className="trust-fees">
      <h3>Our fee policy</h3>
      <ul>{feePolicy.map(f=><li key={f.title}><BadgeCheck size={18}/><div><strong>{f.title}</strong><span>{f.text}</span></div></li>)}</ul>
    </div>
    <div className="trust-reviews">
      <div className="trust-reviews-head"><h3>What clients say</h3>{s.count>0&&<span className="trust-rating"><Star size={16} fill="currentColor"/> {s.average} from {s.count} verified review{s.count===1?'':'s'}</span>}</div>
      {reviews.length?<div className="trust-review-grid">{reviews.slice(0,3).map(r=><figure key={r.id} className="trust-review"><Quote size={20}/><div className="trust-stars" aria-label={`${r.rating} out of 5`}>{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>{r.title&&<strong>{r.title}</strong>}<blockquote>{r.text.length>260?r.text.slice(0,257).replace(/\s+\S*$/,'')+'…':r.text}</blockquote><figcaption>{publicName(r.name)}{r.city?', '+r.city:''} · {KIND_LABEL[r.kind]}{r.userId&&<span className="trust-verified"><BadgeCheck size={13}/> Verified account</span>}</figcaption></figure>)}</div>
      :<p className="trust-empty">Every review on estaff.pk comes from a real client or candidate and is checked by our team before it is published. We do not post sample or paid reviews.</p>}
      <a className="text-link" href="/reviews">{reviews.length?'Read all reviews':'Hired through us? Leave a review'} →</a>
    </div>
  </section>;
}

// Small badge row for sidebars and forms.
export function TrustMini(){
  return <div className="trust-mini">
    <a href={company.secpVerifyUrl} target="_blank" rel="noopener"><ShieldCheck size={15}/> SECP registered</a>
    <a href={company.fbrCertificate} target="_blank" rel="noopener"><BadgeCheck size={15}/> FBR registered</a>
    <a href="/faqs"><BadgeCheck size={15}/> 6-month free replacement</a>
  </div>;
}
