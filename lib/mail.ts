// Email sending. Works once SMTP settings are in the server environment:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS and MAIL_FROM (e.g. "estaff.pk <jobs@estaff.pk>").
// Until then, emails are skipped and recorded in the mail log so nothing breaks.
import nodemailer from 'nodemailer';
import {promises as fs} from 'fs';
import path from 'path';
import {DATA_DIR} from './store';
import {siteOrigin} from './seo';

export const mailConfigured=()=>Boolean(process.env.SMTP_HOST&&process.env.SMTP_USER&&process.env.SMTP_PASS);
let transport:nodemailer.Transporter|null=null;
const getTransport=()=>transport||(transport=nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||587),secure:Number(process.env.SMTP_PORT)===465,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}}));

const esc=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
// Branded HTML wrapper. `lines` are plain text paragraphs; `button` is an optional call to action.
export function emailHtml(title:string,lines:string[],button?:{label:string;href:string},footer?:string){
  return `<!doctype html><html><body style="margin:0;background:#f3f6f5;font-family:Arial,Helvetica,sans-serif;color:#142d35">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="100%" style="max-width:560px;background:#fff;border-radius:14px;overflow:hidden">
<tr><td style="background:#0d2730;padding:18px 24px"><img src="${siteOrigin}/brand/logo-white.png" alt="estaff.pk" height="36" style="display:block"></td></tr>
<tr><td style="padding:26px 24px"><h1 style="font-size:21px;margin:0 0 14px">${esc(title)}</h1>
${lines.map(l=>`<p style="font-size:15px;line-height:1.6;margin:0 0 12px;color:#3d5550">${esc(l)}</p>`).join('')}
${button?`<p style="margin:22px 0 6px"><a href="${esc(button.href)}" style="background:#007f65;color:#fff;text-decoration:none;font-weight:bold;padding:12px 20px;border-radius:8px;display:inline-block">${esc(button.label)}</a></p>`:''}
</td></tr><tr><td style="padding:16px 24px;background:#f7faf9;font-size:12px;color:#62757a">${esc(footer||'estaff.pk · Staffing and recruitment across Pakistan')}</td></tr>
</table></td></tr></table></body></html>`;
}

async function log(entry:Record<string,unknown>){try{await fs.mkdir(DATA_DIR,{recursive:true});await fs.appendFile(path.join(/*turbopackIgnore: true*/ DATA_DIR,'mail.log'),JSON.stringify({at:new Date().toISOString(),...entry})+'\n');}catch{}}

export async function sendMail(to:string,subject:string,html:string,text?:string){
  if(!to)return false;
  if(!mailConfigured()){await log({to,subject,sent:false,reason:'smtp-not-configured'});return false;}
  try{await getTransport().sendMail({from:process.env.MAIL_FROM||process.env.SMTP_USER,to,subject,html,text:text||subject});await log({to,subject,sent:true});return true;}
  catch(e){await log({to,subject,sent:false,reason:(e as Error).message.slice(0,200)});return false;}
}
export async function readMailLog(limit=50){try{const t=await fs.readFile(path.join(/*turbopackIgnore: true*/ DATA_DIR,'mail.log'),'utf8');return t.trim().split('\n').slice(-limit).reverse().map(l=>JSON.parse(l) as {at:string;to:string;subject:string;sent:boolean;reason?:string});}catch{return [];}}
