import {Header,Footer,PageHero} from '../../components/ui';
import {Breadcrumbs,StructuredData} from '../../components/seo';
import ReviewForm from '../../components/review-form';
import {ReviewSummary,ReviewList} from '../../components/reviews';
import {pageMetadata,faqSchema,webPageSchema} from '../../lib/seo';
import {listReviews} from '../../lib/reviews';
import {currentUser} from '../../lib/users';

export const dynamic='force-dynamic';
export const generateMetadata=()=>pageMetadata('estaff.pk Reviews – What Employers & Job Seekers Say','Read honest reviews of estaff.pk from families, businesses and job seekers across Pakistan, and share your own experience of hiring or finding work with us.','/reviews');
const faqs:[string,string][]=[
  ['Are these reviews real?','Every review comes from the form on this page. The team checks each one before it appears to remove spam, abuse and personal details, and publishes positive and negative reviews alike without editing them.'],
  ['Who can leave a review?','Anyone who hired staff, applied for a job or used another estaff.pk service. Reviews from people with an estaff.pk account are marked “Account holder”.'],
  ['How do I review an agency in the directory?','Open the agency’s page in the agency directory and use the review form there.'],
];

export default async function Reviews(){
  const rows=await listReviews({status:'approved',target:'estaff'});
  const cu=await currentUser();
  return <><Header/><main>
    <PageHero eyebrow="Reviews" title="What people say about estaff.pk" text="Honest feedback from families, businesses and job seekers. Every review is checked, never edited, and published whether it is good or bad."/>
    <section className="container page-content">
      <Breadcrumbs items={[{name:'Home',path:'/'},{name:'Reviews',path:'/reviews'}]}/>
      <div className="job-layout">
        <article>
          {rows.length?<><ReviewSummary rows={rows}/><ReviewList rows={rows}/></>:<div className="empty-jobs"><h3>No reviews yet</h3><p>Hired staff or found a job through estaff.pk? Be the first to share your experience.</p></div>}
          <h2 style={{marginTop:48}}>Questions about reviews</h2>
          <div className="faqs">{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
        </article>
        <aside className="apply-panel" id="write-review"><h2>Write a review</h2><ReviewForm me={cu?{name:cu.name,email:cu.email}:null}/></aside>
      </div>
    </section>
    <StructuredData data={[webPageSchema('estaff.pk reviews','Reviews of estaff.pk from employers and job seekers.','/reviews'),faqSchema(faqs)]}/>
  </main><Footer/></>;
}
