import {denyIfNotAdmin} from '../../../../lib/admin-guard';
import {go} from '../../../../lib/http';
import {addMedia,updateMediaAlt,deleteMedia} from '../../../../lib/store';

export const dynamic='force-dynamic';
export async function POST(req:Request){
  const deny=await denyIfNotAdmin();if(deny)return deny;
  const f=await req.formData();const action=String(f.get('_action')||'');const alt=String(f.get('alt')||'').trim();
  if(action==='upload'){const file=f.get('file');if(!file||typeof file==='string'||!file.size)return go('/admin/media?msg=invalid');
    try{await addMedia(file,alt);}catch(e){return go('/admin/media?msg='+((e as Error).message==='size'?'size':'type'));}
    return go('/admin/media?msg=uploaded');}
  const file=String(f.get('file')||'');
  if(action==='alt'){await updateMediaAlt(file,alt);return go('/admin/media?msg=saved');}
  if(action==='delete'){await deleteMedia(file);return go('/admin/media?msg=deleted');}
  return go('/admin/media');
}
