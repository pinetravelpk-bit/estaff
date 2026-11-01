import {NextResponse} from 'next/server';
import {revalidatePath} from 'next/cache';
import {listJobs,saveJob} from '../../../../lib/store';
import {revalidateJob} from '../../../../lib/revalidate';
import {sendJobAlerts} from '../../../../lib/notify';
import {listActive,saveActive} from '../../../../lib/pool-active';
import {poolRole} from '../../../../lib/pool';
import {pingIndexNow} from '../../../../lib/indexnow';
import {rateLimited,clientIp} from '../../../../lib/auth';

export const dynamic='force-dynamic';

// Called every few minutes by a server timer. Announces queued jobs whose release time has
// come: job alert emails, page refresh and IndexNow. Safe to call any time; it only acts on
// jobs that are already due, so it needs no secret.
export async function GET(req:Request){
  if(rateLimited('cron:'+clientIp(req),30,60*60*1000))return NextResponse.json({ok:false},{status:429});
  const now=new Date().toISOString();let jobs=0,listings=0;
  for(const j of await listJobs()){
    if(j.publishAt&&j.publishAt<=now&&j.announced===false){await saveJob({...j,announced:true});revalidateJob(j);await sendJobAlerts(j);jobs++;}
  }
  const rows=listActive();const due=rows.filter(r=>r.publishAt<=now&&!r.announced);
  if(due.length){
    const paths=new Set<string>(['/jobs','/sitemap.xml']);
    for(const r of due){paths.add('/jobs/'+r.id);if(r.city!=='pakistan')paths.add('/jobs/city/'+r.city);const role=poolRole(r.role);if(role)paths.add('/jobs/role/'+r.role);}
    for(const p of paths)revalidatePath(p);
    saveActive(rows.map(r=>due.includes(r)?{...r,announced:true}:r));
    await pingIndexNow([...paths].filter(p=>p!=='/sitemap.xml'));
    listings=due.length;
  }
  return NextResponse.json({ok:true,jobs,listings});
}
