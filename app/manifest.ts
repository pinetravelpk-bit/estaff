import type {MetadataRoute} from 'next';

export default function manifest():MetadataRoute.Manifest{
  return {
    name:'estaff.pk – Staffing & Recruitment in Pakistan',short_name:'estaff.pk',
    description:'Domestic staff, recruitment, HR, payroll and jobs across Pakistan.',
    start_url:'/',scope:'/',display:'standalone',background_color:'#ffffff',theme_color:'#00866c',lang:'en-PK',
    categories:['business','productivity'],
    icons:[{src:'/brand/favicon-48.png',sizes:'48x48',type:'image/png'},{src:'/brand/apple-icon.png',sizes:'180x180',type:'image/png'},{src:'/brand/icon.png',sizes:'512x512',type:'image/png',purpose:'any'}],
    shortcuts:[{name:'Find jobs',url:'/jobs'},{name:'Request staff',url:'/hire'},{name:'My account',url:'/account'}],
  };
}
