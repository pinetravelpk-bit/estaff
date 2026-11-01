import {NextResponse} from 'next/server';
import {rateLimited,clientIp} from '../../../lib/auth';
import {currentUser,getAgencyBySlug,stripLinks} from '../../../lib/users';
import {addReview,listReviews,type Review} from '../../../lib/reviews';
import {notifyNewReview} from '../../../lib/notify';

export const dynamic='force-dynamic';
const clean=(v:FormDataEntryValue|null,max=200)=>String(v??'').replace(/[\u0000-\u0008\u000b-\u001f]/g,' ').trim().slice(0,max);
const bad=(error:string,status=400)=>NextResponse.json({ok:false,error},{status});

// New reviews are saved as "pending" and shown only after the team approves them.
export async function POST(req:Request){
  if(rateLimited('review:'+clientIp(req),5,60*60*1000))return bad('Too many reviews from this connection. Please try again later.',429);
  let f:FormData;try{f=await req.formData();}catch{return bad('The form could not be read. Please try again.');}
  if(clean(f.get('website')))return NextResponse.json({ok:true});
  const name=clean(f.get('name'),80),email=clean(f.get('email'),120).toLowerCase(),city=clean(f.get('city'),60);
  const title=stripLinks(clean(f.get('title'),100)),text=stripLinks(clean(f.get('text'),2000));
  const rating=Number(f.get('rating'));const kind=clean(f.get('kind'),20) as Review['kind'];
  if(!Number.isInteger(rating)||rating<1||rating>5)return bad('Please choose a star rating.');
  if(name.length<2)return bad('Please enter your name.');
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return bad('Please enter a valid email address. It is never shown publicly.');
  if(text.length<20)return bad('Please write at least a sentence or two (20 characters or more).');
  if(!['employer','job-seeker','other'].includes(kind))return bad('Please tell us how you used the service.');
  if(f.get('honest')!=='yes')return bad('Please confirm that your review is about your own experience.');
  let target:Review['target']='estaff',agencyId='';
  const slug=clean(f.get('agency'),80);
  const user=await currentUser();
  if(slug){const a=await getAgencyBySlug(slug);if(!a||a.status!=='approved')return bad('This agency was not found.',404);if(user&&user.id===a.userId)return bad('Agencies cannot review themselves.',403);target='agency';agencyId=a.userId;}
  const existing=await listReviews({target});
  if(existing.some(r=>r.agencyId===agencyId&&r.status!=='rejected'&&(r.email===email||(user&&r.userId===user.id))))return bad('You have already reviewed this. Thank you!',409);
  const r=await addReview({target,agencyId,name,email,city,kind,rating,title,text,userId:user?.id||''});
  await notifyNewReview(r,slug);
  return NextResponse.json({ok:true});
}
