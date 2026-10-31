import {NextResponse} from 'next/server';
// Relative 303 redirect. Behind nginx, req.url points at the internal address,
// so a relative Location keeps the browser on estaff.pk.
export const go=(path:string)=>new NextResponse(null,{status:303,headers:{Location:path}});
