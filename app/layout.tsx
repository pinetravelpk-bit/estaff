import type {Metadata,Viewport} from 'next';
import './globals.css';
import './motion.css';
import './visuals3d.css';
import './hero-slider.css';
import MotionLayer from '../components/motion';
import {preload} from 'react-dom';
import {siteOrigin,pageMetadata,organisationSchema,websiteSchema} from '../lib/seo';
import {StructuredData,BusinessDetails} from '../components/seo';
import {getSettings,publicSettings} from '../lib/settings';
import {SiteSettingsProvider,WhatsAppButton} from '../components/site-settings';
import AppShell from '../components/app-shell';
import './app-shell.css';

export function generateMetadata():Metadata{
  const s=getSettings().seo;
  return {...pageMetadata('Domestic Staff Agency & Recruitment Services in Pakistan','Domestic staff, corporate recruitment, HR outsourcing, payroll and remote staffing across Pakistan, from Islamabad and Rawalpindi to Lahore, Karachi and Peshawar.','/'),
    metadataBase:new URL(siteOrigin),
    title:{default:'Domestic Staff Agency & Recruitment in Pakistan | estaff.pk',template:'%s | '+(s.titleSuffix||'estaff.pk')},
    applicationName:'estaff.pk',appleWebApp:{capable:true,title:'estaff.pk',statusBarStyle:'default'},formatDetection:{telephone:false},category:'Staffing and recruitment',
    keywords:['domestic staff agency Pakistan','domestic staff agency Lahore','domestic staff agency Karachi','domestic staff Islamabad','maid in Islamabad','driver in Rawalpindi','cook in Islamabad','recruitment agency Islamabad','HR outsourcing Pakistan','payroll services Islamabad','remote staff Pakistan'],
    other:{'geo.region':'PK-IS','geo.placename':'Islamabad, Rawalpindi','geo.position':'33.6844;73.0479','ICBM':'33.6844, 73.0479'},
    icons:{icon:[{url:'/brand/favicon-48.png',sizes:'48x48',type:'image/png'},{url:'/brand/icon.png',sizes:'512x512',type:'image/png'}],apple:'/brand/apple-icon.png'},
    verification:{...(s.googleVerification?{google:s.googleVerification}:{}),...(s.bingVerification?{other:{'msvalidate.01':s.bingVerification}}:{})}};
}
export const viewport:Viewport={width:'device-width',initialScale:1,viewportFit:'cover',themeColor:'#00866c',colorScheme:'light'};

export default function RootLayout({children}:{children:React.ReactNode}){
  for(const f of ['manrope-800','dm-sans-400'])preload('/fonts/'+f+'.woff2',{as:'font',type:'font/woff2',crossOrigin:'anonymous'});
  return <html lang="en-PK"><body><SiteSettingsProvider value={publicSettings()}>
    <MotionLayer/><a className="skip-link" href="#main-content">Skip to content</a>
    <div id="main-content" tabIndex={-1}>{children}</div>
    <div className="container site-only"><BusinessDetails/></div>
    <WhatsAppButton/>
    <AppShell/>
    <StructuredData data={[organisationSchema(),websiteSchema()]}/>
  </SiteSettingsProvider></body></html>;
}
