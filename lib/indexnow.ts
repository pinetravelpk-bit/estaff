// IndexNow: tells Bing, Yandex, Seznam, Naver and others (and through Bing, ChatGPT search and
// Copilot) the moment a page is added or changed. The key file is served at /<key>.txt.
import {absolute,indexingEnabled} from './seo';

export const INDEXNOW_KEY='5f3c9a71e2b84d6fa0c1e8b7d29a4c63';
export async function pingIndexNow(paths:string[]){
  if(!indexingEnabled||!paths.length||process.env.NODE_ENV!=='production')return;
  try{await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'Content-Type':'application/json; charset=utf-8'},body:JSON.stringify({host:'estaff.pk',key:INDEXNOW_KEY,keyLocation:absolute('/'+INDEXNOW_KEY+'.txt'),urlList:paths.map(p=>absolute(p))}),signal:AbortSignal.timeout(5000)});}catch{}
}
