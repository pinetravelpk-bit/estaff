import {isAdmin} from '../../../../../lib/auth';
import {readCv} from '../../../../../lib/store';

export const dynamic='force-dynamic';
const TYPES:Record<string,string>={pdf:'application/pdf',doc:'application/msword',docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',jpg:'image/jpeg',png:'image/png'};

export async function GET(_req:Request,{params}:{params:Promise<{file:string}>}){
  if(!(await isAdmin()))return new Response('Not found',{status:404});
  const {file}=await params;const data=await readCv(file);if(!data)return new Response('Not found',{status:404});
  const ext=file.split('.').pop()||'pdf';
  return new Response(new Uint8Array(data),{headers:{'Content-Type':TYPES[ext]||'application/octet-stream','Content-Disposition':`attachment; filename="${file}"`,'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
}
