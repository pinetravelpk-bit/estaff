import {readMedia} from '../../../lib/store';

// Serves images uploaded in the dashboard's media library.
const TYPES:Record<string,string>={jpg:'image/jpeg',png:'image/png',webp:'image/webp',gif:'image/gif'};
export async function GET(_req:Request,{params}:{params:Promise<{file:string}>}){
  const {file}=await params;const data=await readMedia(file);
  if(!data)return new Response('Not found',{status:404});
  return new Response(new Uint8Array(data),{headers:{'Content-Type':TYPES[file.split('.').pop()||'']||'application/octet-stream','Cache-Control':'public, max-age=31536000, immutable','X-Content-Type-Options':'nosniff'}});
}
