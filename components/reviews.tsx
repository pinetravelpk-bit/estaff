import {Star,BadgeCheck,MessageSquareReply} from 'lucide-react';
import {type Review,summary,publicName,KIND_LABEL} from '../lib/reviews';

export function Stars({value,size=16}:{value:number;size?:number}){
  return <span className="stars" role="img" aria-label={`${value} out of 5 stars`}>{[1,2,3,4,5].map(n=><Star key={n} size={size} className={n<=Math.round(value)?'on':''} aria-hidden="true"/>)}</span>;
}

export function ReviewSummary({rows}:{rows:Review[]}){
  const s=summary(rows);if(!s.count)return null;
  return <div className="review-summary">
    <div className="review-score"><strong>{s.average.toFixed(1)}</strong><Stars value={s.average} size={20}/><span>{s.count} {s.count===1?'review':'reviews'}</span></div>
    <ul className="review-bars">{s.dist.map(d=><li key={d.stars}><span>{d.stars} ★</span><i><b style={{width:`${s.count?Math.round(d.count/s.count*100):0}%`}}/></i><span>{d.count}</span></li>)}</ul>
  </div>;
}

export function ReviewList({rows,replyFrom='estaff.pk'}:{rows:Review[];replyFrom?:string}){
  return <div className="review-list">{rows.map(r=><article key={r.id} className="review-card">
    <header><Stars value={r.rating}/>{r.title&&<h3>{r.title}</h3>}</header>
    <p>{r.text}</p>
    <footer><strong>{publicName(r.name)}</strong>{r.city&&<> · {r.city}</>} · {KIND_LABEL[r.kind]} · <time dateTime={r.createdAt}>{new Date(r.createdAt).toLocaleDateString('en-PK',{dateStyle:'medium'})}</time>{r.userId&&<span className="review-verified"><BadgeCheck size={14}/> Account holder</span>}</footer>
    {r.reply&&<div className="review-reply"><MessageSquareReply size={15}/><div><strong>Reply from {replyFrom}</strong><p>{r.reply}</p></div></div>}
  </article>)}</div>;
}

// Third-party reviews of a directory agency can carry review markup; estaff.pk's own
// reviews of itself cannot (Google treats those as self-serving), so this is only used for agencies.
export function reviewSchemaParts(rows:Review[]){
  const s=summary(rows);if(!s.count)return {};
  return {aggregateRating:{'@type':'AggregateRating',ratingValue:s.average,reviewCount:s.count,bestRating:5,worstRating:1},review:rows.slice(0,10).map(r=>({'@type':'Review',reviewRating:{'@type':'Rating',ratingValue:r.rating,bestRating:5,worstRating:1},author:{'@type':'Person',name:publicName(r.name)},datePublished:r.createdAt.slice(0,10),...(r.title?{name:r.title}:{}),reviewBody:r.text}))};
}
