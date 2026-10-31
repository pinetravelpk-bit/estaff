import type {MetadataRoute} from 'next';
import {indexingEnabled,absolute} from '../lib/seo';

// Search engines and AI answer engines (ChatGPT, Claude, Perplexity, Gemini, Copilot…)
// may read every public page; private areas stay out of all indexes.
const PRIVATE=['/api/','/admin','/account'];
const AI_BOTS=['GPTBot','OAI-SearchBot','ChatGPT-User','ClaudeBot','Claude-SearchBot','Claude-User','anthropic-ai','PerplexityBot','Perplexity-User','Google-Extended','GoogleOther','Applebot','Applebot-Extended','Bingbot','CCBot','Meta-ExternalAgent','Amazonbot','DuckAssistBot','YouBot','cohere-ai','MistralAI-User'];

export default function robots():MetadataRoute.Robots{
  if(!indexingEnabled)return {rules:[{userAgent:'*',disallow:'/'}]};
  return {rules:[{userAgent:'*',allow:'/',disallow:PRIVATE},{userAgent:AI_BOTS,allow:['/','/llms.txt','/llms-full.txt'],disallow:PRIVATE}],sitemap:absolute('/sitemap.xml'),host:absolute('/')};
}
