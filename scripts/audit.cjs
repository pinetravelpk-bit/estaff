// Crawl-based SEO / technical audit of every URL in the sitemap.
// Usage: node scripts/audit.cjs [baseUrl]   (default https://estaff.pk)
const BASE=(process.argv[2]||'https://estaff.pk').replace(/\/$/,'');
const ORIGIN='https://estaff.pk';
const issues={};const add=(k,u,d='')=>{(issues[k]=issues[k]||[]).push(d?`${u} — ${d}`:u);};
const stats={pages:0,bytes:0,maxBytes:[0,''],words:[],jsonld:{}};
const linkTargets=new Set();const titles={},descs={},h1s={};
const strip=h=>h.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<style[\s\S]*?<\/style>/g,'');
(async()=>{
  const sm=await (await fetch(BASE+'/sitemap.xml')).text();
  const urls=[...sm.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1].replace(ORIGIN,''));
  const inSitemap=new Set(urls.map(u=>u||'/'));
  console.log('Sitemap URLs:',urls.length);
  let i=0;
  async function worker(){while(i<urls.length){const u=urls[i++]||'/';
    let r,h;try{r=await fetch(BASE+u,{redirect:'manual'});h=await r.text();}catch(e){add('fetch error',u,e.message);continue;}
    if(r.status!==200){add('non-200 in sitemap',u,String(r.status));continue;}
    stats.pages++;stats.bytes+=h.length;if(h.length>stats.maxBytes[0])stats.maxBytes=[h.length,u];
    const title=(h.match(/<title>([\s\S]*?)<\/title>/)||[])[1]||'';const desc=(h.match(/<meta name="description" content="([^"]*)"/)||[])[1]||'';
    const canon=(h.match(/<link rel="canonical" href="([^"]*)"/)||[])[1]||'';const robots=(h.match(/<meta name="robots" content="([^"]*)"/)||[])[1]||'';
    const t=title.replace(/&amp;/g,'&');
    if(!t)add('missing title',u);else{if(t.length>70)add('title > 70 chars',u,`${t.length}: ${t}`);if(t.length<25)add('title < 25 chars',u,t);(titles[t]=titles[t]||[]).push(u);}
    const d=desc.replace(/&amp;/g,'&');
    if(!d)add('missing meta description',u);else{if(d.length>170)add('description > 170',u,String(d.length));if(d.length<70)add('description < 70',u,`${d.length}: ${d}`);(descs[d]=descs[d]||[]).push(u);}
    const expect=ORIGIN+(u==='/'?'':u);
    if(!canon)add('missing canonical',u);else if(canon.replace(/\/$/,'')!==expect.replace(/\/$/,''))add('canonical mismatch',u,canon);
    if(/noindex/.test(robots))add('noindex page in sitemap',u);
    if(!/property="og:image"/.test(h))add('missing og:image',u);
    const body=strip(h);
    const H1=[...body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map(m=>m[1].replace(/<[^>]+>/g,'').trim());
    if(H1.length===0)add('no h1',u);if(H1.length>1)add('multiple h1',u,H1.join(' | '));if(H1[0])(h1s[H1[0]]=h1s[H1[0]]||[]).push(u);
    const heads=[...body.matchAll(/<h([1-6])[^>]*>/g)].map(m=>+m[1]);for(let k=1;k<heads.length;k++)if(heads[k]>heads[k-1]+1){add('heading level skipped',u,`h${heads[k-1]}→h${heads[k]}`);break;}
    for(const m of body.matchAll(/<img\b[^>]*>/g)){if(!/\balt=/.test(m[0]))add('img without alt',u,m[0].slice(0,90));}
    const main=(body.match(/<main[\s\S]*<\/main>/)||[body])[0].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');stats.words.push([main.split(' ').length,u]);
    for(const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){try{const j=JSON.parse(m[1]);for(const o of (Array.isArray(j)?j:[j]))stats.jsonld[o['@type']]=(stats.jsonld[o['@type']]||0)+1;}catch{add('invalid JSON-LD',u);}}
    if(!/<script type="application\/ld\+json">/.test(h))add('no structured data',u);
    for(const m of body.matchAll(/href="(\/[^"#?]*)/g)){const p=m[1].replace(/\/$/,'')||'/';if(!/^\/(_next|api|media|brand|images|fonts|admin|account)/.test(p)&&!/\.(png|jpg|webp|svg|txt|xml|pdf)$/.test(p))linkTargets.add(p);}
  }}
  await Promise.all(Array.from({length:12},worker));
  for(const [t,l] of Object.entries(titles))if(l.length>1)add('duplicate title',l.slice(0,3).join(', '),t);
  for(const [t,l] of Object.entries(descs))if(l.length>1)add('duplicate description',l.slice(0,3).join(', '),t.slice(0,60));
  for(const [t,l] of Object.entries(h1s))if(l.length>1)add('duplicate h1',l.slice(0,3).join(', '),t);
  // internal links pointing to pages not in the sitemap: check they resolve
  const extra=[...linkTargets].filter(p=>!inSitemap.has(p));let j=0;
  async function lw(){while(j<extra.length){const p=extra[j++];try{const r=await fetch(BASE+p,{redirect:'manual'});if(r.status>=400)add('broken internal link',p,String(r.status));else if(r.status>=300)add('internal link redirects',p,String(r.status)+' → '+r.headers.get('location'));else if(!['/hire','/jobs/apply'].includes(p))add('linked page missing from sitemap',p);}catch{add('broken internal link',p,'fetch error');}}}
  await Promise.all(Array.from({length:8},lw));
  // site-wide files
  const rb=await (await fetch(BASE+'/robots.txt')).text();if(!/Sitemap:/.test(rb))add('robots.txt has no Sitemap line','/robots.txt');
  for(const p of ['/llms.txt','/llms-full.txt','/brand/icon.png','/favicon.ico','/manifest.webmanifest']){const r=await fetch(BASE+p);if(r.status!==200)add('site file missing',p,String(r.status));}
  const home=await fetch(BASE+'/');for(const hd of ['strict-transport-security','x-frame-options','content-security-policy','permissions-policy'])if(!home.headers.get(hd))add('missing security header',hd);
  // report
  stats.words.sort((a,b)=>a[0]-b[0]);
  console.log(`Pages crawled: ${stats.pages}  avg HTML: ${(stats.bytes/stats.pages/1024).toFixed(0)} KB  largest: ${(stats.maxBytes[0]/1024).toFixed(0)} KB ${stats.maxBytes[1]}`);
  console.log('Thinnest pages (words in main):',stats.words.slice(0,5).map(w=>w[0]+' '+w[1]).join(' | '));
  console.log('Structured data types:',JSON.stringify(stats.jsonld));
  const keys=Object.keys(issues).sort((a,b)=>issues[b].length-issues[a].length);
  console.log('\nISSUES ('+keys.length+' kinds)');for(const k of keys){console.log(`\n[${issues[k].length}] ${k}`);issues[k].slice(0,6).forEach(x=>console.log('   ',x));}
  require('fs').writeFileSync('.data/audit.json',JSON.stringify(issues,null,1));
})();
