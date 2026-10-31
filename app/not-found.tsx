import type {Metadata} from 'next';
import {Header,Footer,PageHero} from '../components/ui';
export const metadata:Metadata={title:'Page not found',robots:{index:false,follow:true}};
export default function NotFound(){return <><Header/><main><PageHero eyebrow="Page not found" title="Let’s get you back on track." text="This page is not available. Explore our services, local hiring areas or current jobs."/><div className="container page-content"><div className="area-chips"><a href="/">Home</a><a href="/jobs">Jobs</a><a href="/services">Services</a><a href="/areas">All cities</a><a href="/agencies">Agency directory</a><a href="/blog">Blog</a><a href="/contact">Contact</a></div></div></main><Footer/></>}
