const fs=require('fs');
// Content audit: words of main content per page and how much text each page shares with
// sibling pages of the same type (5-word phrases). Usage: node scripts/content-audit.cjs [baseUrl]
const BASE=(process.argv[2]||'http://localhost:3999').replace(/\/$/,'');
const ORIGIN='https://estaff.pk';
const CITIES=new Set([...fs.readFileSync("lib/nav-data.ts","utf8").split("navCities")[1].split("navRoles")[0].matchAll(/\["([a-z-]+)","/g)].map(m=>m[1]));
const type=u=>{
  const s=u.split('/').filter(Boolean);
  if(!s.length)return 'home';
  if(s[0]==='jobs'&&s[1]?.startsWith('hiring-'))return 'job listing (ongoing)';
  if(s[0]==='jobs'&&s.length===2&&!['apply','city','role'].includes(s[1]))return 'job (real vacancy)';
  if(s[0]==='jobs'&&s[1]==='city')return 'jobs by city';
  if(s[0]==='jobs'&&s[1]==='role')return 'jobs by role';
  if(s[0]==='services'&&s.length===3)return CITIES.has(s[2])?'service×city':'service role';
  if(s[0]==='services'&&s.length===2)return 'service';
  if(s[0]==='areas'&&s.length===4)return 'area×service (ISB/RWP)';
  if(s[0]==='areas'&&s.length===3)return /^(cooks|drivers|maids|nannies|care|home-nurses|gardeners|watchmen|domestic|personal|office)/.test(s[2])?'city×role':'city×area';
  if(s[0]==='areas'&&s.length===2)return 'city hub';
  if(s[0]==='blog'&&s.length===2)return 'blog post';
  if(s[0]==='industries'&&s.length===2)return 'industry';
  if(s[0]==='agencies'&&s.length===2)return 'agency profile';
  return 'core page';
};
const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;};
const text=h=>{
  let b=h.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<style[\s\S]*?<\/style>/g,'');
  const m=b.match(/<main[\s\S]*<\/main>/);b=m?m[0]:b;
  b=b.replace(/<nav[\s\S]*?<\/nav>/g,' ').replace(/<section class="container final-cta"[\s\S]*?<\/section>/g,' ').replace(/<footer[\s\S]*?<\/footer>/g,' ');
  return b.replace(/<!-- -->/g,'').replace(/<[^>]+>/g,' ').replace(/&[a-z#0-9]+;/g,' ').replace(/\s+/g,' ').trim();
};
(async()=>{
  const sm=await (await fetch(BASE+'/sitemap.xml')).text();
  const urls=[...sm.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1].replace(ORIGIN,'')||'/');
  console.log('Pages in sitemap:',urls.length);
  const pages=[];let i=0,done=0;
  async function worker(){while(i<urls.length){const u=urls[i++];try{const h=await (await fetch(BASE+u)).text();const t=text(h);const w=t.toLowerCase().split(' ').filter(Boolean);
    const sh=new Set();for(let k=0;k+5<=w.length;k++)sh.add(hash(w.slice(k,k+5).join(' ')));pages.push({u,type:type(u),words:w.length,sh});}catch(e){}
    if(++done%500===0)console.log('  crawled',done);}}
  await Promise.all(Array.from({length:10},worker));
  // Uniqueness: share of a page's phrases that also appear on its most similar sibling (same type), sampled.
  const byType={};for(const p of pages)(byType[p.type]=byType[p.type]||[]).push(p);
  for(const list of Object.values(byType)){list.sort((a,b)=>a.u.localeCompare(b.u));
    list.forEach((p,idx)=>{let best=0;const sibs=[list[idx-1],list[idx+1],list[(idx+7)%list.length],list[(idx+31)%list.length],list[(idx+97)%list.length]].filter(x=>x&&x!==p);
      for(const q of sibs){let n=0;p.sh.forEach(x=>{if(q.sh.has(x))n++});best=Math.max(best,p.sh.size?n/p.sh.size:0);}p.shared=best;});}
  const rows=[];const pct=(a,b)=>Math.round(100*a/b);
  for(const [t,list] of Object.entries(byType)){const w=list.map(p=>p.words).sort((a,b)=>a-b);const s=list.map(p=>p.shared);
    rows.push({type:t,pages:list.length,minWords:w[0],medianWords:w[Math.floor(w.length/2)],maxWords:w[w.length-1],'≥1500 words':pct(list.filter(p=>p.words>=1500).length,list.length)+'%',avgShared:Math.round(100*s.reduce((a,b)=>a+b,0)/s.length)+'%',uniqueWordsMedian:Math.round(list.map(p=>p.words*(1-p.shared)).sort((a,b)=>a-b)[Math.floor(list.length/2)])});}
  rows.sort((a,b)=>b.pages-a.pages);console.table(rows);
  const total=pages.length,over=pages.filter(p=>p.words>=1500).length;
  console.log(`\nAll pages: ${total}, with 1500+ words: ${over} (${pct(over,total)}%), median words: ${pages.map(p=>p.words).sort((a,b)=>a-b)[Math.floor(total/2)]}`);
  fs.writeFileSync('.data/content-audit.json',JSON.stringify({rows,pages:pages.map(({u,type,words,shared})=>({u,type,words,shared:Math.round(shared*100)}))},null,1));
})();
