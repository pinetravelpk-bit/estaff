import {MapPin} from 'lucide-react';
import {provinces,allCities,type Province} from '../lib/pakistan';

export function CityDirectory(){
  const order:Province[]=['ict','punjab','sindh','kp','balochistan','ajk','gb'];
  return <section className="city-directory" aria-labelledby="city-dir-title">
    <h2 id="city-dir-title">Domestic staff by city</h2>
    {order.map(p=>{const list=allCities.filter(c=>c.province===p);return list.length?<div className="province-block" key={p}><h3>{provinces[p].name} <small>{list.length} {list.length===1?'city':'cities'}</small></h3><div className="area-chips">{list.map(c=><a key={c.slug} href={'/areas/'+c.slug}><MapPin size={13}/> {c.name}</a>)}</div></div>:null})}
  </section>;
}
