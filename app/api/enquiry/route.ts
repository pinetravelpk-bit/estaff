import {NextResponse} from 'next/server';
import {addEnquiry,newId,now} from '../../../lib/store';
import {rateLimited,clientIp} from '../../../lib/auth';

export const dynamic='force-dynamic';
const clean=(v:FormDataEntryValue|null,max=200)=>String(v??'').replace(/[\u0000-\u001f]/g,' ').trim().slice(0,max);

export async function POST(req:Request){
  if(rateLimited('enq:'+clientIp(req),8,60*60*1000))return NextResponse.json({ok:false,error:'Too many requests from this connection. Please try again later.'},{status:429});
  let f:FormData;try{f=await req.formData();}catch{return NextResponse.json({ok:false,error:'The form could not be read. Please try again.'},{status:400});}
  if(clean(f.get('website')))return NextResponse.json({ok:true});
  const name=clean(f.get('name'),100),phone=clean(f.get('phone'),30),email=clean(f.get('email'),120),details=clean(f.get('details'),3000),role=clean(f.get('role'),100);
  if(name.length<2||!/^[+0-9 ()-]{10,20}$/.test(phone))return NextResponse.json({ok:false,error:'Please enter your name and a valid phone number.'},{status:400});
  if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return NextResponse.json({ok:false,error:'Please enter a valid email address.'},{status:400});
  if(!role||details.length<10)return NextResponse.json({ok:false,error:'Please choose the staff you need and describe the work in a sentence or two.'},{status:400});
  await addEnquiry({id:newId('enq-'),name,company:clean(f.get('company'),120),email,phone,role,city:clean(f.get('city'),60),area:clean(f.get('area'),80),schedule:clean(f.get('schedule'),60),budget:clean(f.get('budget'),20),start:clean(f.get('start'),20),details,status:'new',createdAt:now()});
  return NextResponse.json({ok:true});
}
