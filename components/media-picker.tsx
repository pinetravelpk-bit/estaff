import type {Media} from '../lib/store';

// A pop-open grid of library images. Clicking one fills `target` (an input) and
// updates `preview` (an img). `insert` mode adds Markdown into a textarea instead.
export function MediaPicker({media,target,preview,insert=false,label='Choose from library'}:{media:Media[];target:string;preview?:string;insert?:boolean;label?:string}){
  if(!media.length)return <a className="adm-btn small" href="/admin/media" target="_blank">Upload images first</a>;
  return <details className="adm-picker"><summary className="adm-btn small">{label}</summary><div className="adm-picker-grid">
    {media.map(m=>{const url='/media/'+m.file;return insert
      ?<button type="button" key={m.file} data-insert={`\n![${m.alt||m.name}](${url})\n`} data-target={target} title={m.alt||m.name}><img src={url} alt=""/></button>
      :<button type="button" key={m.file} data-pick={url} data-target={target} data-preview={preview} title={m.alt||m.name}><img src={url} alt=""/></button>;})}
  </div></details>;
}
