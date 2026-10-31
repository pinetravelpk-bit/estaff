// Small, safe Markdown renderer for blog posts written in the dashboard.
// Supports: ## and ### headings, paragraphs, - and 1. lists, **bold**, *italic*,
// [links](url), ![images](url) and > quotes. All other HTML is escaped.
const esc=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const safeUrl=(u:string)=>/^(https?:\/\/|\/|#|mailto:|tel:)/i.test(u.trim())?u.trim():'#';
function inline(t:string){
  let s=esc(t);
  s=s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g,(_m,a,u)=>`<img src="${esc(safeUrl(u))}" alt="${a}" loading="lazy"/>`);
  s=s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(_m,a,u)=>{const url=safeUrl(u);const ext=/^https?:\/\//.test(url)&&!/^https?:\/\/(www\.)?estaff\.pk/.test(url);return `<a href="${esc(url)}"${ext?' target="_blank" rel="noopener"':''}>${a}</a>`;});
  s=s.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/(^|[^*])\*([^*]+)\*/g,'$1<em>$2</em>');
  return s;
}
export const slugId=(t:string)=>t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export function markdownToHtml(md:string){
  const out:string[]=[];let para:string[]=[];let list:{type:'ul'|'ol';items:string[]}|null=null;
  const flushP=()=>{if(para.length){out.push(`<p>${inline(para.join(' '))}</p>`);para=[];}};
  const flushL=()=>{if(list){out.push(`<${list.type}>${list.items.map(i=>`<li>${inline(i)}</li>`).join('')}</${list.type}>`);list=null;}};
  for(const raw of md.replace(/\r/g,'').split('\n')){
    const line=raw.trimEnd();let m:RegExpMatchArray|null;
    if(!line.trim()){flushP();flushL();continue;}
    if((m=line.match(/^(#{2,3})\s+(.*)$/))){flushP();flushL();const lvl=m[1].length;out.push(`<h${lvl} id="${slugId(m[2])}">${inline(m[2])}</h${lvl}>`);continue;}
    if((m=line.match(/^\s*[-*]\s+(.*)$/))){flushP();if(!list||list.type!=='ul'){flushL();list={type:'ul',items:[]};}list.items.push(m[1]);continue;}
    if((m=line.match(/^\s*\d+[.)]\s+(.*)$/))){flushP();if(!list||list.type!=='ol'){flushL();list={type:'ol',items:[]};}list.items.push(m[1]);continue;}
    if((m=line.match(/^>\s?(.*)$/))){flushP();flushL();out.push(`<blockquote>${inline(m[1])}</blockquote>`);continue;}
    flushL();para.push(line.trim());
  }
  flushP();flushL();return out.join('\n');
}
export const headingsOf=(md:string)=>[...md.matchAll(/^##\s+(.+)$/gm)].map(m=>({text:m[1].trim(),id:slugId(m[1])}));
export const readMinutes=(md:string)=>Math.max(2,Math.round(md.split(/\s+/).length/200));
