'use client';
import {useState} from 'react';
import {ArrowRight,MapPin} from 'lucide-react';
import {navCities,navRoles,navServices,navProvinces} from '../lib/nav-data';

const ORDER=['punjab','sindh','kp','balochistan','ajk','gb'];
const CORE=new Set(['islamabad','rawalpindi']);
const inProvince=(p:string)=>navCities.filter(c=>c[2]===p);

// Where each finder choice leads for a given city.
function destination(what:string,city:string){
  if(what==='jobs')return '/jobs/city/'+city;
  if(what.startsWith('svc:'))return `/services/${what.slice(4)}/${city}`;
  if(what.startsWith('role:')){const r=what.slice(5);return CORE.has(city)?`/services/domestic-staff/${r}`:`/areas/${city}/${r}`;}
  return '/areas/'+city;
}

export default function CitiesPanel({close}:{close:()=>void}){
  const [tab,setTab]=useState('punjab');
  const [what,setWhat]=useState('domestic');const [city,setCity]=useState('lahore');
  return <div className="cities-panel">
    <div className="city-tabs" role="tablist" aria-label="Provinces">
      <a className="city-tab-core" href="/areas/islamabad" onClick={close}>Islamabad</a>
      <a className="city-tab-core" href="/areas/rawalpindi" onClick={close}>Rawalpindi</a>
      {ORDER.map(p=><button key={p} role="tab" type="button" aria-selected={tab===p} className={tab===p?'on':''} onClick={()=>setTab(p)}>{navProvinces[p].short} <small>{inProvince(p).length}</small></button>)}
    </div>
    {ORDER.map(p=><ul key={p} role="tabpanel" className={'city-grid'+(tab===p?' on':'')} aria-label={navProvinces[p].name}>
      {inProvince(p).filter(c=>!CORE.has(c[0])).map(([slug,name])=><li key={slug}><a href={'/areas/'+slug} onClick={close}><MapPin size={12}/>{name}</a></li>)}
    </ul>)}
    <form className="city-finder" onSubmit={e=>{e.preventDefault();close();window.location.href=destination(what,city);}}>
      <strong>Quick finder</strong>
      <label><span className="sr-only">What do you need</span><select value={what} onChange={e=>setWhat(e.target.value)}>
        <option value="domestic">Domestic staff (all roles)</option>
        <optgroup label="Household roles">{navRoles.map(([s,n])=><option key={s} value={'role:'+s}>{n}</option>)}</optgroup>
        <optgroup label="Business services">{navServices.map(([s,n])=><option key={s} value={'svc:'+s}>{n}</option>)}</optgroup>
        <option value="jobs">Jobs</option>
      </select></label>
      <span className="finder-in">in</span>
      <label><span className="sr-only">City</span><select value={city} onChange={e=>setCity(e.target.value)}>{['ict',...ORDER].map(p=><optgroup key={p} label={navProvinces[p].name}>{inProvince(p).map(([s,n])=><option key={s} value={s}>{n}</option>)}</optgroup>)}</select></label>
      <button className="btn small" type="submit">Go <ArrowRight size={15}/></button>
    </form>
  </div>;
}
