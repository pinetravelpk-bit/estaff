import {revalidatePath} from 'next/cache';
import type {Job} from './store';

// Refresh every public page that shows a job after it is created, edited or closed.
export function revalidateJob(job:Pick<Job,'id'|'city'|'jobType'>){
  for(const p of ['/','/jobs','/jobs/'+job.id,'/jobs/city/'+job.city,'/jobs/role/'+job.jobType,'/sitemap.xml'])revalidatePath(p);
}
